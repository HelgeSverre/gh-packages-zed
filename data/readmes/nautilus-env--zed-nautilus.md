# Nautilus Schema for Zed

[![CI](https://github.com/ndr-lmnc/zed-nautilus/actions/workflows/ci.yml/badge.svg)](https://github.com/ndr-lmnc/zed-nautilus/actions/workflows/ci.yml)

Language support for the Nautilus schema DSL (`*.nautilus`) in [Zed](zed.dev).

## Features

- Syntax highlighting (Tree-sitter based)
- Brackets and comments
- Snippets
- Language Server Protocol (LSP) integration via `nautilus-lsp` (diagnostics, completion, hover, go-to-definition, formatting)

## Requirements

- By default, the extension auto-downloads `nautilus-lsp` on first use.
- If you disable auto-download, you must either have `nautilus-lsp` on your `PATH` or configure `lspPath` in Zed settings (see below).

## Configuration

To override the LSP binary path, add the following to your Zed settings:

```/dev/null/zed-settings.json#L1-10
{
  "lsp": {
    "nautilus-lsp": {
      "settings": {
        "nautilus": {
          "lspPath": "/absolute/path/to/nautilus-lsp"
        }
      }
    }
  }
}
```

To disable auto-download and require a path or PATH-resolved binary:

```/dev/null/zed-settings.json#L1-12
{
  "lsp": {
    "nautilus-lsp": {
      "settings": {
        "nautilus": {
          "autoDownload": false
        }
      }
    }
  }
}
```



## Notes

- The grammar uses the `tree-sitter-nautilus` parser.
- Snippets are ported from the VS Code extension.
- When auto-downloaded, the `nautilus-lsp` binary is cached under the extension’s working directory in `cache/nautilus-lsp-<version>/`.
- The extension is licensed under MIT (see `LICENSE`).

## Development (local)

1. Open Zed.
2. Run **Install Dev Extension** and select the `nautilus-zed` directory.
3. Open a `.nautilus` file to verify highlighting and LSP behavior.
