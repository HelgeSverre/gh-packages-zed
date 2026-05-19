# Quint for Zed

Quint language support for Zed, including:

- Tree-sitter syntax highlighting and editor queries
- File association for `*.qnt`
- LSP integration with automatic local install of `@informalsystems/quint-language-server`
- Vendored `tree-sitter-quint` grammar under `vendor/tree-sitter-quint`

## Prerequisites

No manual Quint LSP install is required. On first run, the extension installs
`@informalsystems/quint-language-server` locally and starts it via Node.

Optional fallback if local install fails:

```bash
npm i -g @informalsystems/quint-language-server
```

## Install As A Dev Extension

1. Open Zed.
2. Run `zed: install dev extension` from the command palette.
3. Select this directory (`tmp/quint-zed`).

## Files

- `extension.toml`: extension metadata, grammar source, and LSP registration
- `languages/quint/config.toml`: language metadata and editor behavior
- `languages/quint/*.scm`: tree-sitter queries for highlight, outline, indents, brackets, injections, and text objects
- `src/lib.rs`: extension runtime that installs/runs a local Quint LSP package and falls back to a global binary
- `vendor/tree-sitter-quint`: vendored grammar fork used by `zed-extension`

## Publishing Note

`extension.toml` points the grammar repository to this extension repo and uses `path = "vendor/tree-sitter-quint"`. Whenever you update the vendored grammar, bump `commit = "..."` to the latest repository commit SHA.
