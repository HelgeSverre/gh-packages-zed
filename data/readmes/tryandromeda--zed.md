# Andromeda Zed Extension

A [Zed](https://zed.dev) extension for the [Andromeda](https://github.com/tryandromeda/andromeda) JavaScript and TypeScript language server.

## Features

- **Advanced Linting**: Real-time diagnostics and error detection as you type
- **Auto-completion**: Context-aware code completion for JavaScript/TypeScript
- **Code Formatting**: Integrated code formatting support
- **Quick Fix Actions**: Auto-fix common issues with code actions
- **Hover Documentation**: Rich documentation on hover
- **Web API Support**: Built-in support for Canvas, Crypto, and other web APIs

## Supported Languages

- JavaScript (`.js`, `.mjs`, `.cjs`)
- JSX (`.jsx`)
- TypeScript (`.ts`)
- TSX (`.tsx`)

## Installation

### From Zed Extensions

1. Open Zed
2. Open the command palette (`Cmd+Shift+P` / `Ctrl+Shift+P`)
3. Run `zed: extensions`
4. Search for "Andromeda"
5. Click "Install"

### Install as Dev Extension (for development)

1. Clone this repository
2. Install Rust via [rustup](https://rustup.rs/)
3. Open Zed and go to `zed: extensions`
4. Click "Install Dev Extension" and select this directory

## Configuration

To use the Andromeda Language Server with JavaScript and TypeScript files, add the following to your Zed settings (`~/.config/zed/settings.json` or `Cmd+,`):

```json
{
  "languages": {
    "JavaScript": {
      "language_servers": ["andromeda", "!typescript-language-server", "!vtsls", "!eslint"],
      "formatter": "language_server"
    },
    "TypeScript": {
      "language_servers": ["andromeda", "!typescript-language-server", "!vtsls", "!eslint"],
      "formatter": "language_server"
    },
    "JSX": {
      "language_servers": ["andromeda", "!typescript-language-server", "!vtsls", "!eslint"],
      "formatter": "language_server"
    },
    "TSX": {
      "language_servers": ["andromeda", "!typescript-language-server", "!vtsls", "!eslint"],
      "formatter": "language_server"
    }
  }
}
```

### Advanced Configuration

You can customize the Andromeda language server behavior through LSP settings:

```json
{
  "lsp": {
    "andromeda": {
      "settings": {
        "enable": true,
        "run": "onType",
        "format": {
          "enable": true
        },
        "codeAction": {
          "autoFix": {
            "enable": true
          }
        },
        "completion": {
          "enable": true
        },
        "hover": {
          "enable": true
        }
      }
    }
  }
}
```

### Using a Custom Binary

If you have Andromeda installed manually or want to use a specific version:

```json
{
  "lsp": {
    "andromeda": {
      "binary": {
        "path": "/path/to/andromeda",
        "arguments": ["lsp"]
      }
    }
  }
}
```

## How It Works

The extension will:

1. First check for a user-configured binary path in settings
2. Then look for `andromeda` in your system PATH
3. If not found, automatically download the appropriate binary from GitHub releases

Downloaded binaries are cached and automatically updated when new versions are available.

## Requirements

- Zed editor (latest version recommended)
- One of the following:
  - `andromeda` available in your PATH
  - Internet connection for automatic binary download
  - Custom binary path configured in settings

To install Andromeda manually, visit: <https://github.com/tryandromeda/andromeda#installation>

## Troubleshooting

### Language Server Not Starting

1. Check that Andromeda is installed: run `andromeda --version` in your terminal
2. View Zed logs: `zed: open log` from the command palette
3. For verbose output, start Zed from terminal with `zed --foreground`

### Diagnostics Not Appearing

Ensure Andromeda is configured as the language server for JavaScript/TypeScript files (see Configuration section above).

### Using with Other Language Servers

You can use Andromeda alongside other language servers. To disable conflicting servers, prefix them with `!`:

```json
{
  "languages": {
    "JavaScript": {
      "language_servers": ["andromeda", "!eslint"]
    }
  }
}
```

## Development

To develop this extension locally:

1. Clone this repository
2. Install Rust via [rustup](https://rustup.rs/)
3. Run `cargo check` to verify the code compiles
4. In Zed, use "Install Dev Extension" and select this directory

### Building

```bash
cargo build --release --target wasm32-wasip1
```

## Support

For issues and feature requests:

- Extension issues: <https://github.com/tryandromeda/zed/issues>
- Andromeda core issues: <https://github.com/tryandromeda/andromeda/issues>

## License
Mozilla Public License Version 2.0. See [LICENSE](LICENSE.md) for details.
