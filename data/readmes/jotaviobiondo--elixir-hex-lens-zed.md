# Elixir Hex Lens

[![Zed Extensions](https://img.shields.io/badge/Zed-Extensions-blue?logo=zedindustries)](https://zed.dev/extensions/elixir-hex-lens)
[![CI](https://github.com/jotaviobiondo/elixir-hex-lens-zed/actions/workflows/ci.yml/badge.svg)](https://github.com/jotaviobiondo/elixir-hex-lens-zed/actions/workflows/ci.yml)

A [Zed](https://zed.dev) extension that shows hover information and autocompletion for [Hex](https://hex.pm) packages in
Elixir `mix.exs` files.

## Features

- **Hover**: shows package name, description, latest version with publish date, and links to hex.pm,
  hexdocs and repository
- **Autocompletion**: suggests Hex packages as you type `{:` in a `mix.exs` file

### Examples

**Hover:** \
<img width="656" height="400" alt="hover" src="https://github.com/user-attachments/assets/bbf016ac-6f74-424d-b4fb-2b7f029f1587" />

**Autocomplete:** \
<img width="1040" height="400" alt="autocomplete" src="https://github.com/user-attachments/assets/472f2417-8c89-427e-9f07-197f2b5a3a40" />

## Installation

Install **Elixir Hex Lens** from the Zed extension marketplace (`zed: extensions` in the command palette).

## Configuration

### Custom server binary path

By default, the extension downloads the [LSP server](https://github.com/jotaviobiondo/elixir-hex-lens-lsp) binary
from GitHub releases. To use a custom binary (e.g. a local build), add this to your Zed `settings.json`:

```json
{
  "lsp": {
    "elixir-hex-lens": {
      "binary": {
        "path": "/path/to/elixir-hex-lens-lsp"
      }
    }
  }
}
```

The extension resolves the server binary in this order:

1. Custom path from Zed settings (as shown above)
2. Cached path from a previous invocation
3. System `PATH` lookup
4. Download from [GitHub releases](https://github.com/jotaviobiondo/elixir-hex-lens-lsp/releases)

## License

Apache-2.0
