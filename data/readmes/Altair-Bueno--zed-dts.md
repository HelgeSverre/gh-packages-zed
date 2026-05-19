# zed-dts

Device Tree Source (DTS) language support for the [Zed](https://zed.dev) editor.

## Features

- Syntax highlighting for `.dts`, `.dtsi`, and `.overlay` files
- Full LSP support via [devicetree-language-server](https://github.com/kylebonnici/dts-lsp):
  - Diagnostics, completion, hover, go-to-definition, rename, formatting

## Installation

Install from the Zed Extensions panel (`Extensions: Install Extension`, search for "DTS").

The LSP is installed automatically via npm on first use. Node 20+ must be available on your PATH.

## LSP Configuration

All settings live under the `devicetree` key in `.zed/settings.json`. Paths are relative to the workspace root.

### Minimal — quick start with ad-hoc contexts

The LSP will automatically create a context for any file you open:

```json
{
  "lsp": {
    "dts-language-server": {
      "settings": {
        "devicetree": {
          "allowAdhocContexts": true
        }
      }
    }
  }
}
```

### Project context

Define an explicit context per board/target. The `dtsFile` is the root `.dts` — `.dtsi` and `.overlay` files included from it are covered automatically:

```json
{
  "lsp": {
    "dts-language-server": {
      "settings": {
        "devicetree": {
          "contexts": [
            {
              "ctxName": "my-board",
              "dtsFile": "boards/my-board.dts",
              "includePaths": ["boards/", "dts/include/"]
            }
          ]
        }
      }
    }
  }
}
```

### Zephyr project

```json
{
  "lsp": {
    "dts-language-server": {
      "settings": {
        "devicetree": {
          "cwd": "/path/to/zephyr",
          "defaultBindingType": "Zephyr",
          "defaultIncludePaths": ["./zephyr/dts", "./zephyr/dts/arm"],
          "defaultZephyrBindings": ["./zephyr/dts/bindings"],
          "contexts": [
            {
              "ctxName": "my-board",
              "dtsFile": "./zephyr/boards/vendor/my_board/my_board.dts",
              "overlays": ["./app/boards/my_board.overlay"]
            }
          ]
        }
      }
    }
  }
}
```

See the [dts-lsp documentation](https://github.com/kylebonnici/dts-lsp) for all available settings.
