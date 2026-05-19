# Newo DSL for Zed

Language support for [Newo DSL](https://github.com/newo-ai/newo-nsl-lsp) templates in the [Zed](https://zed.dev) editor. Reuses the same language server (`newo-dsl-lsp`) that powers the Newo VS Code / Cursor extension, so diagnostics and completions behave identically across editors.

## Features

- **Diagnostics** - action names, parameters, skill references (LSP-backed, same engine as `newo lint` in CI)
- **Completions** - 76 built-in NSL actions, 80+ Jinja builtins, project skills, variables
- **Hover** documentation for actions and builtins
- **Go-to-definition** for skill references
- **Snippets** for common Jinja and Guidance patterns
- **Bracket matching** / auto-closing for `{{ }}`, `{% %}`, `{# #}`
- **File-type detection** for `.jinja`, `.guidance`, `.nsl`, `.nslg`

## Status: LSP-only (v1.0.0)

Tree-sitter-backed **syntax highlighting** is planned for a subsequent release. For now, files render as plain text but all LSP features (diagnostics, completions, hover, go-to-def) and editor ergonomics (brackets, comments, snippets) work.

## Requirements

- **Node.js** on `$PATH` (Zed falls back to its bundled node via `zed::node_binary_path()`).
- First activation downloads [`newo-dsl-lsp`](https://www.npmjs.com/package/newo-dsl-lsp) from npm into Zed's extension cache.

## Architecture

```
 ┌────────────┐    stdio    ┌───────────────────────────┐
 │    Zed     │ ◄─────────► │ newo-lsp (Node process)   │
 └────────────┘             │ newo-dsl-lsp (npm)        │
                            └───────────────────────────┘
                                        ▲
                                        │ depends on
                            ┌───────────────────────────┐
                            │ newo-dsl-analyzer         │
                            │ newo-dsl-data             │
                            │ newo-dsl-core             │
                            └───────────────────────────┘
```

On first activation the extension runs `npm install newo-dsl-lsp` into its extension work directory, then spawns `node node_modules/newo-dsl-lsp/dist/server.js --stdio` per workspace.

## Configuration

Workspace settings under `lsp.newo-dsl.settings.*` map onto the same server settings used by the VS Code extension:

```json
{
  "lsp": {
    "newo-dsl": {
      "settings": {
        "schemasPath": "",
        "enableDiagnostics": true,
        "enableCompletions": true,
        "enableHover": true,
        "validateOnStartup": false
      }
    }
  }
}
```

## Development

```bash
# In Zed command palette:
zed: install dev extension   → select this directory

# Iterate:
zed: rebuild extension
zed: open log                → inspect LSP stdout/stderr
```

## Publishing

1. Bump `version` in `extension.toml` and `Cargo.toml`.
2. Tag the release: `git tag v1.0.0 && git push origin v1.0.0`.
3. Open a PR against [`zed-industries/extensions`](https://github.com/zed-industries/extensions):
   - Add this repo as a Git submodule under `extensions/newo-dsl/`.
   - Add a matching entry to `extensions.toml`.
   - Run `pnpm sort-extensions`.

## Relationship to other Newo surfaces

| Asset | VS Code | Zed | CLI (`newo lint`) |
|------|---------|-----|-------------------|
| Language server | `dist/server.js` bundled in VSIX | `npm install newo-dsl-lsp` per workspace | n/a (in-process) |
| Analysis engine | `newo-dsl-analyzer` (bundled) | `newo-dsl-analyzer` (via LSP) | `newo-dsl-analyzer` (direct dep) |
| Config | `newo-dsl.*` VS Code settings | `lsp.newo-dsl.settings.*` | `.neworc.yaml` |
| Snippets | VS Code JSON snippets | Same JSON, verbatim | n/a |

All three surfaces consume the same npm packages. Diagnostics are byte-for-byte identical.

## License

MIT - see [LICENSE](./LICENSE).
