# zed-mnemodoc

[![CI](https://github.com/mnemodoc/zed-mnemodoc/actions/workflows/ci.yml/badge.svg)](https://github.com/mnemodoc/zed-mnemodoc/actions/workflows/ci.yml)
[![Docs](https://github.com/mnemodoc/zed-mnemodoc/actions/workflows/docs.yml/badge.svg)](https://github.com/mnemodoc/zed-mnemodoc/actions/workflows/docs.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A [Zed](https://zed.dev) extension that connects `mcp-server` as a context server,
giving Zed's AI assistant access to your project's indexed documentation.

## Installation

Open Zed → `zed: install extension` → search for **Mnemodoc**.

## Prerequisites

- [Ollama](https://ollama.com) running locally with `nomic-embed-text` pulled:

  ```sh
  ollama pull nomic-embed-text
  ollama serve
  ```

- `mnemodoc-server` — installed automatically from GitHub Releases, or manually:

  ```sh
  # macOS
  brew install mnemodoc/tap/mnemodoc-server

  # Linux — download from the releases page:
  # https://github.com/mnemodoc/mcp-server/releases
  ```

## How it works

1. On project open, the extension looks for `.mnemodoc.yml` at the project root.
2. If found, it starts `mcp-server serve --stdio --config <project>/.mnemodoc.yml` automatically.
3. If not found, it reads settings from Zed, writes a generated config to its work directory, and points the server at that file instead.

## Configuration

### Option A — `.mnemodoc.yml` (recommended)

Place a `.mnemodoc.yml` at your project root. No Zed settings needed.

```yaml
paths:
  - doc/

ollama:
  host: http://localhost:11434
  model: nomic-embed-text

search:
  top_k: 5
```

Index your docs once:

```sh
mcp-server index doc/ --config .mnemodoc.yml
```

### Option B — inline Zed settings

In your project's Zed settings (`zed: open project settings`):

```json
{
  "context_servers": {
    "mnemodoc": {
      "settings": {
        "paths": ["doc/"],
        "ollama_host": "http://localhost:11434",
        "ollama_model": "nomic-embed-text",
        "top_k": 5
      }
    }
  }
}
```

## Development

Requires: [mise](https://mise.jdx.dev) (installs the Rust toolchain) and the
`wasm32-wasip2` target, which `rustup` must add separately:

```sh
rustup target add wasm32-wasip2
mise dev:check    # clippy + tests (run after every change)
mise dev:build    # WASM build
mise dev:format   # cargo fmt
mise dev:doc      # generate and open API docs
```

## License

MIT
