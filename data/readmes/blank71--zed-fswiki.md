# FreeStyleWiki for Zed

## Components

- Tree Sitter: [tree-sitter-fswiki](https://github.com/blank71/tree-sitter-fswiki)
- Language Server: [fswiki-lsp](https://github.com/blank71/fswiki-lsp)

## Development

```sh
cargo fmt --check
cargo test --locked
cargo check --locked --target wasm32-wasip1
```
