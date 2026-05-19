# DM Language Support for Zed

DreamMaker (DM) language support for the [Zed](https://zed.dev) editor, powered by the [SpacemanDMM](https://github.com/SpaceManiac/SpacemanDMM) language server.

## Features

- Syntax highlighting (via Tree-sitter)
- Code completion
- Go-to-definition
- Hover information
- Diagnostics
- Find references
- Workspace symbol search
- Signature help
- Document symbols

## Installation

### From the Zed Extensions marketplace

Search for "DM" in the Extensions panel (`Ctrl+Shift+X`).

### Manual / Dev installation

1. Clone this repo
2. Open Zed → Extensions → Install Dev Extension
3. Select this directory

Or build from source:
```bash
cargo build --target wasm32-wasip1 --release
```

## Configuration

The language server will be downloaded automatically from the [SpacemanDMM releases](https://github.com/SpaceManiac/SpacemanDMM/releases) on first use.

### Manual binary path

If you built `dm-langserver` yourself, add to your `settings.json`:
```json
{
  "lsp": {
    "dm-langserver": {
      "binary": {
        "path": "/path/to/dm-langserver",
        "arguments": []
      }
    }
  }
}
```

### Semantic tokens (optional)

For enhanced highlighting via the language server:
```json
{
  "languages": {
    "DM": {
      "semantic_tokens": "combined"
    }
  }
}
```

## Requirements

- The language server needs a `.dme` file to provide full analysis. Open your project's `.dme` file in Zed to enable go-to-definition and other features.

## License

GPL-3.0
