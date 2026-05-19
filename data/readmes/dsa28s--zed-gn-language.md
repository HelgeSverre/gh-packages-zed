# GN for Zed

GN language support for Zed, backed by `google/gn-language-server` and
`tree-sitter-grammars/tree-sitter-gn`.

## Features

- `.gn`, `BUILD.gn`, and `.gni` language detection
- Tree-sitter highlighting, brackets, indentation, and outline queries
- `gn-language-server` integration
- PATH or user-configured binary support before automatic download
- Automatic binary download for macOS arm64/x64 and Windows x64

## Local Development

Install it from Zed with `zed: install dev extension`, then select this
directory.

The extension first checks Zed settings, then `PATH`, then downloads a matching
binary from the latest `google/gn-language-server` release.

```json
{
  "lsp": {
    "gn-language-server": {
      "binary": {
        "path": "/absolute/path/to/gn-language-server",
        "arguments": ["--stdio"]
      },
      "settings": {
        "backgroundIndexing": true,
        "errorReporting": true,
        "parallelIndexing": true,
        "targetLens": true,
        "workspaceCompletion": true
      }
    }
  }
}
```

Zed does not expose the VS Code custom commands used by the upstream extension,
so this extension initializes the language server with `vscode_extension: false`.

## License

Apache-2.0
