# zed-mcp-proxy

zed-mcp-proxy turns Zed into an MCP server. Any AI client that speaks the Model Context Protocol — Claude Desktop, local LLMs, or Cursor — can connect to it and work directly with your project files without leaving the editor open or switching contexts manually.

Most AI coding tools require you to paste code into a chat window or use a proprietary sync mechanism. zed-mcp-proxy instead exposes your workspace through a standard protocol, so any MCP-compatible client gains direct, sandboxed access to your actual project tree.

## Why this exists

Zed added an AI agent panel that consumes MCP servers. What was missing is the inverse: a way for external AI agents to reach into Zed's workspace. This project fills that gap. The server binary is self-contained, ~1.5 MB, has no runtime dependencies, and works with any client that implements MCP — not just Anthropic's tools.

## Architecture

```
AI client (Claude Desktop, local LLM, Cursor, ...)
        |  MCP / JSON-RPC 2.0 over stdio or HTTP
        v
  mcp-proxy-server          native Rust binary
        |
        +-- reads and writes files in workspace
        +-- launches Zed via system command
        +-- queries git for branch information
        |
  Zed Editor                 (optional, for open_file)

  mcp-proxy-extension        WASM extension inside Zed
        |
        +-- downloads mcp-proxy-server on first use
        +-- registers it as a Zed context server
```

The server supports two transports:

- **stdio** (default) — JSON-RPC 2.0 over stdin/stdout. Used by Claude Desktop and any client that spawns the process directly.
- **http** — MCP Streamable HTTP transport over a local TCP port. Used when you need a persistent server that multiple clients can reach over the network.

The server binary and the Zed extension are independent. You can use the binary standalone from Claude Desktop without installing the Zed extension at all. The extension is only needed if you want mcp-proxy-server to appear in Zed's own agent panel.

## Tools

| Tool                 | Arguments                         | Returns                      |
| -------------------- | --------------------------------- | ---------------------------- |
| `read_file`          | `path: string`                    | File contents as text        |
| `write_file`         | `path: string`, `content: string` | `{ "success": true }`        |
| `list_files`         | `directory?: string`              | Array of relative file paths |
| `open_file`          | `path: string`                    | `{ "success": true }`        |
| `get_workspace_info` | —                                 | `{ name, root, git_branch }` |

All paths are relative to the workspace root passed at startup. Absolute paths and `../` traversal are rejected before any filesystem operation is attempted.

## Installation

### Standalone binary

Download the binary for your platform from the [Releases page](https://github.com/denisfl/zed-mcp/releases/latest) and extract it:

```
macOS arm64   mcp-proxy-server-aarch64-apple-darwin.tar.gz
macOS x86_64  mcp-proxy-server-x86_64-apple-darwin.tar.gz
Linux x86_64  mcp-proxy-server-x86_64-unknown-linux-gnu.tar.gz
Windows       mcp-proxy-server-x86_64-pc-windows-msvc.zip
```

```bash
tar xzf mcp-proxy-server-aarch64-apple-darwin.tar.gz
chmod +x mcp-proxy-server
sudo mv mcp-proxy-server /usr/local/bin/
```

### Build from source

```bash
git clone https://github.com/denisfl/zed-mcp
cd zed-mcp
cargo build --release --package mcp-proxy-server
# binary is at target/release/mcp-proxy-server
```

### Zed extension

Install "MCP Proxy" from the Zed extension marketplace. The binary is downloaded automatically on first use and registered as a context server in Zed's agent panel. No manual configuration required.

## Usage

### Starting the server (stdio)

```bash
mcp-proxy-server --workspace /path/to/your/project
```

The server reads JSON-RPC 2.0 messages from stdin and writes responses to stdout. It runs until stdin is closed. Standard MCP clients handle this automatically.

### Starting the server (HTTP)

```bash
mcp-proxy-server \
  --transport http \
  --host 127.0.0.1 \
  --port 3100 \
  --workspace /path/to/your/project
```

The server listens for MCP Streamable HTTP requests at `http://127.0.0.1:3100/mcp`. Use `--host 0.0.0.0` to accept connections from other machines or containers on the network.

### Claude Desktop

Edit `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "zed-proxy": {
      "command": "/usr/local/bin/mcp-proxy-server",
      "args": ["--workspace", "/Users/you/projects/myapp"]
    }
  }
}
```

Restart Claude Desktop. The hammer icon in the toolbar confirms the server is connected.

Once connected, you can ask Claude natural language questions and it will call the tools automatically:

```
What files are in the src/ directory?
```

```
Read src/main.rs and explain what this program does.
```

```
Add a CHANGELOG.md entry for today's changes.
```

```
What git branch am I on?
```

```
Open the file with the most recent modification in Zed.
```

### Multiple workspaces

Run one server instance per project, each on its own stdio channel:

```json
{
  "mcpServers": {
    "frontend": {
      "command": "/usr/local/bin/mcp-proxy-server",
      "args": ["--workspace", "/Users/you/projects/frontend"]
    },
    "backend": {
      "command": "/usr/local/bin/mcp-proxy-server",
      "args": ["--workspace", "/Users/you/projects/backend"]
    }
  }
}
```

The AI client sees two separate tool namespaces and can address each workspace independently.

### Direct JSON-RPC usage

You can drive the server directly from a shell for scripting or debugging:

```bash
# Discover available tools
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}' \
  | mcp-proxy-server --workspace .

# Read a file
echo '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"read_file","arguments":{"path":"README.md"}}}' \
  | mcp-proxy-server --workspace .

# Write a file
echo '{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"write_file","arguments":{"path":"notes/scratch.md","content":"# Scratch\n"}}}' \
  | mcp-proxy-server --workspace .

# Get workspace metadata
echo '{"jsonrpc":"2.0","id":4,"method":"tools/call","params":{"name":"get_workspace_info","arguments":{}}}' \
  | mcp-proxy-server --workspace .
```

## Security

- File operations are confined to the directory passed via `--workspace`
- Absolute paths are rejected
- Path components that traverse upward (`../`) are normalized and the resulting path is verified to remain inside the workspace before any read or write occurs
- The stdio server has no network access of its own; it communicates only over stdin and stdout
- The HTTP server binds to `127.0.0.1` by default; binding to `0.0.0.0` must be explicitly requested via `--host`
- No credentials, tokens, or environment variables are read or forwarded

## Building the WASM extension

The Zed extension requires the `wasm32-wasip1` target:

```bash
rustup target add wasm32-wasip1
cargo build --release --package mcp-proxy-extension --target wasm32-wasip1
```

## License

MIT — see [LICENSE](LICENSE)

