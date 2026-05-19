# zed-plantuml

PlantUML language extension for Zed with:

- tree-sitter syntax highlighting
- `plantuml-lsp` integration for completion and other LSP features

## Prerequisites

- Zed

## Install as a dev extension

1. Open Zed.
2. Run `zed: install dev extension`.
3. Select this directory (`zed-plantuml`).

## Configure the language server

The extension uses this launch strategy:

1. `lsp.plantuml-lsp.binary.path` from your Zed settings
2. fallback to `plantuml-lsp` in `PATH`
3. fallback to auto-downloading a platform binary from
   `https://github.com/nicoladen05/zed-plantuml` releases

Example Zed settings:

```json
{
  "lsp": {
    "plantuml-lsp": {
      "binary": {
        "path": "/home/nico/dev/plantuml-lsp/plantuml-lsp",
        "arguments": [
          "--stdlib-path=/path/to/plantuml-stdlib",
          "--exec-path=plantuml"
        ]
      }
    }
  }
}
```

Notes:

- Use only one of `--exec-path` or `--jar-path`.
- `--stdlib-path` is optional but recommended for richer completions.

## File types

This extension associates PlantUML with:

- `.puml`
- `.plantuml`
- `.iuml`
- `.pu`
- `.wsd`
