# Rotom for Zed

Language support for [Rotom](https://github.com/KalaayPT/rotom) — a scripting language for Pokémon Generation 4 field scripts.

## Prerequisites

This extension provides syntax highlighting, language configuration, and LSP integration. It does **not** bundle the `rotom-lsp` binary. You must install it separately so Zed can find it on `PATH`.

## Text Archives

Rotom text archives are currently unsupported. They are regular JSON files, but
Zed extensions cannot safely reuse Zed's built-in JSON grammar for a separate
language. Support is pending a dedicated Rotom JSON Tree-sitter grammar fork.

## Development

Build the extension with:

```sh
cargo build --target wasm32-wasip1 --locked
```

Then install as a dev extension: in Zed, run `zed: install dev extension` and select this directory.
