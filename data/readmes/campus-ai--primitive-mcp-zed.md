# Primitive MCP for Zed

A Zed extension that connects to [Primitive](https://getprimitive.ai)'s MCP server, enabling AI-assisted task management and spec tracking directly in your editor.

## Features

- Task management (create, list, update tasks)
- Context/spec document management
- Spec delegation workflow for AI-assisted implementation
- OAuth 2.0 authentication with automatic token refresh

## Installation (Developer Extension)

### Prerequisites

- [Zed](https://zed.dev) installed
- [Rust](https://rustup.rs) with the WASM target:
  ```bash
  rustup target add wasm32-wasip1
  ```
- A [Primitive](https://app.getprimitive.ai) account

### Step 1: Clone and Build

```bash
git clone https://github.com/campus-ai/primitive-mcp-zed.git
cd primitive-mcp-zed

# Build the WASM extension
cargo build --release --target wasm32-wasip1
cp target/wasm32-wasip1/release/primitive_mcp.wasm extension.wasm
```

### Step 2: Pre-Authenticate

Before installing in Zed, authenticate to avoid startup timeout issues:

```bash
# The bridge binary is downloaded automatically, or build locally:
cd bridge && cargo build --release && cd ..

# Login (opens browser for OAuth)
./bridge/target/release/primitive-mcp-bridge auth login

# Verify authentication
./bridge/target/release/primitive-mcp-bridge auth status
```

### Step 3: Install in Zed

1. Open Zed
2. Open command palette: `Cmd+Shift+P`
3. Run: **"zed: install dev extension"**
4. Select the `primitive-mcp-zed` directory

### Step 4: Configure Zed Settings

Add to your Zed settings (`Cmd+,`):

```json
{
  "context_servers": {
    "primitive": {
      "enabled": true,
      "settings": {}
    }
  }
}
```

### Step 5: Restart Zed

Restart Zed to load the extension with your authenticated session.

## Usage

Open the Assistant panel (`Cmd+?`) and the Primitive MCP tools will be available:

- `tasks_list` - List your tasks
- `tasks_create` - Create new tasks
- `tasks_update` - Update task status
- `contexts_list` - List specs and documents
- `contexts_get` - Read spec content
- `contexts_update` - Update spec content
- `say_hello` - Verify connection

### Example

Ask the assistant:
```
Use the say_hello tool to verify the Primitive MCP connection is working.
```

## Troubleshooting

### "Waiting for Context Server" hangs

A previous bridge process may be blocking port 8001:

```bash
lsof -i :8001  # Find the process
kill <PID>     # Kill it
```

Then restart Zed.

### Context server timeout

Pre-authenticate before starting Zed:

```bash
./bridge/target/release/primitive-mcp-bridge auth login
```

### Token issues

Clear and re-authenticate:

```bash
./bridge/target/release/primitive-mcp-bridge auth logout
./bridge/target/release/primitive-mcp-bridge auth login
```

## Configuration

Optional settings in Zed:

```json
{
  "context_servers": {
    "primitive": {
      "enabled": true,
      "settings": {
        "base_url": "https://app.getprimitive.ai/mcp"
      }
    }
  }
}
```

## License

MIT
