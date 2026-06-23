# zed-holocron

[Zed](https://zed.dev) editor extension for
[Holocron](https://github.com/holocron-lang/holocron) — a declarative schema
and query compiler.

Registers `holocron-lsp` as a language server for `*.holocron.yaml` files, so
schema errors (unknown columns, duplicate aliases, unknown types, etc.) show
as live red squiggles in the editor — pointing at the exact YAML token at
fault, with the same rustc-style diagnostics you get from the CLI.

## Install

### 1. Install the LSP binary (one of):

```sh
cargo install holocron-lsp
# or
brew install holocron-lang/holocron/holocron-lsp
```

### 2. Install the Zed extension

Open Zed → **`zed: extensions`** (command palette) → search for **Holocron** →
**Install**.

## What you get

- Syntax highlighting (the YAML tree-sitter grammar — same as any other YAML).
- Live diagnostics from `holocron-lsp` on every keystroke.
- Diagnostics include source spans + "did you mean" / "available items" notes.

## How it works

This extension declares a new "Holocron" language whose `path_suffixes` cover
`*.holocron.yaml` and `*.holocron.yml`. The language uses the built-in YAML
tree-sitter grammar for highlighting, and the extension wires up `holocron-lsp`
(resolved from your `PATH`) as its language server.

## Troubleshooting

> `\`holocron-lsp\` not found on PATH`

Install the binary using one of the commands in **Install** above, then
restart Zed (so the extension re-runs the binary lookup).

## Development

```sh
rustup target add wasm32-wasip1
cargo build --target wasm32-wasip1 --release
# Then in Zed: zed: install dev extension → point at this directory
```

## License

[MPL-2.0](LICENSE) — matches the parent project.