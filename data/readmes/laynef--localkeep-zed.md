<p align="center">
  <img src="https://raw.githubusercontent.com/laynef/localkeep-cursor/main/media/lk-logo.png" width="96" alt="Local Keep AI" />
</p>

# Local Keep AI — Zed Extension

Local-first AI coding assistant for Zed — 1,000+ free models, no API key
needed for local models.

This extension provides a **context server (MCP)** for Zed's Agent Panel: it
launches `lk mcp` from the Local Keep AI CLI and exposes Local Keep AI as
tools the agent can call.

## Requires

The [Local Keep AI CLI](https://localkeep.ai) (v1.21.45 or later):

```bash
pip install local-keep-ai-cli
lk login
```

## Install

Submitted to the Zed extension registry and awaiting review
([zed-industries/extensions#7170](https://github.com/zed-industries/extensions/pull/7170)).
Once merged: search **"Local Keep AI"** in Zed Extensions (`zed: extensions`),
then enable the **Local Keep AI** context server in the Agent Panel settings.

Until then, install it as a dev extension — clone this repo, open
`zed: install dev extension` from the command palette, and pick the clone:

```bash
git clone https://github.com/laynef/localkeep-zed
```

`lk` is resolved from your shell environment. If it lives somewhere Zed's PATH
does not reach, set the server's `command` in your Zed `settings.json` — the
extension reads it (path, arguments, env) and uses it as-is:

```json
{
  "context_servers": {
    "mcp-server-local-keep-ai": {
      "command": {
        "path": "/absolute/path/to/lk",
        "arguments": ["mcp"]
      }
    }
  }
}
```

## Tools

| Tool | Description |
|---|---|
| `ask` | Ask Local Keep AI a question or one-shot coding task |
| `list_models` | List the model IDs available on this machine |

The server runs against your configured model — cloud, Ollama, OpenRouter, or
local GGUF — and never requires an API key for local models.

## Build from source

```bash
rustup target add wasm32-wasip2
cargo build --target wasm32-wasip2 --release
```

Install it as a dev extension via `zed: install dev extension`.

## License

MIT
