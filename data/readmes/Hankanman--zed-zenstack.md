# Zed ZenStack

A [ZenStack](https://zenstack.dev) extension for [Zed](https://zed.dev) — syntax highlighting, outline, brackets, indentation, and language-server integration for `.zmodel` files.

## Status

**Pre-release / Phase 1.** The extension installs and provides syntax highlighting via the `tree-sitter-prisma` grammar, which parses most ZModel constructs correctly because ZModel is a near-superset of the Prisma schema language. A dedicated `tree-sitter-zmodel` grammar (in `grammar/`) and a standalone `zmodel-language-server` npm wrapper (in `lsp/`) are scaffolded but not yet published — see [`PLAN.md`](./PLAN.md) for the roadmap.

## Features (current)

- `.zmodel` file recognition
- Syntax highlighting (keywords, attributes, types, strings, numbers, comments)
- Outline view (models, views, types, enums, datasources, generators)
- Bracket matching and auto-indent
- Vim text-objects (class.around / class.inside / comment.around)
- Language server scaffolding (Phase 2 — currently no-op; will wire to `@zenstackhq/language` once `zmodel-language-server` is published)

## Features (planned)

- Triple-slash `///` doc-comment highlighting (currently parses as `//` line comment)
- `import "..."` statement parsing
- `plugin <name> { ... }` blocks
- `abstract` modifier and `extends` / `with` clauses on `model` and `type` blocks
- Diagnostics, completion, formatting, hover, and go-to-definition via the bundled LSP

## Local development

```bash
# 1. Install Rust via rustup (required by Zed dev extensions).
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# 2. In Zed, open the command palette and run `zed: install dev extension`,
#    then point it at this directory.
```

See the [Zed docs on developing extensions](https://zed.dev/docs/extensions/developing-extensions) for details.

## Testing the LSP locally (before npm publish)

`zmodel-language-server` is not yet published to npm. To test the LSP without publishing, build it locally and add a `binary` override to your Zed settings.json — `src/zenstack.rs` honors `lsp.zmodel-language-server.binary.{path,arguments}` and uses it instead of trying to install from npm.

```bash
# 1. Build the LSP
cd lsp
pnpm install
pnpm build           # produces dist/server.mjs

# 2. Note the absolute paths
which node                                          # → e.g. /home/you/.nvm/versions/node/v24/bin/node
echo "$(pwd)/dist/server.mjs"                       # → /abs/path/to/lsp/dist/server.mjs
```

Then open Zed settings (`Cmd/Ctrl+,`) and add:

```json
{
  "lsp": {
    "zmodel-language-server": {
      "binary": {
        "path": "/abs/path/to/node",
        "arguments": ["/abs/path/to/lsp/dist/server.mjs", "--stdio"]
      }
    }
  }
}
```

Rebuild the dev extension (`zed: rebuild dev extension`) and open a `.zmodel` file. You should now get diagnostics, completion, hover, formatting, and semantic tokens from the Langium-powered LSP.

## Repository layout

```
.
├── extension.toml              # Zed extension manifest
├── Cargo.toml                  # Rust crate compiled to WASM
├── src/zenstack.rs             # LSP launcher (Zed extension entry)
├── languages/zmodel/           # Language config + tree-sitter queries
│   ├── config.toml
│   ├── highlights.scm
│   ├── brackets.scm
│   ├── indents.scm
│   ├── outline.scm
│   ├── injections.scm
│   └── textobjects.scm
├── grammar/                    # tree-sitter-zmodel (Phase 2)
└── lsp/                        # zmodel-language-server npm package (Phase 2)
```

## License

Apache-2.0 — see [LICENSE](./LICENSE).
