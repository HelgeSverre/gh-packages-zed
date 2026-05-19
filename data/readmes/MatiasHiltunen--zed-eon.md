# Eon for Zed

[Eon](https://github.com/emilk/eon) language support for the [Zed](https://zed.dev) editor.

Eon is a simple and friendly config format designed for human editing, created by [emilk](https://github.com/emilk). See the [Eon repository](https://github.com/emilk/eon) for the full language specification and reference implementation.

## Features

- Syntax highlighting via [tree-sitter-eon](https://github.com/MatiasHiltunen/tree-sitter-eon)
- Bracket matching, auto-indentation, and outline navigation
- Formatting via the Eon language server
- Diagnostics for parse errors
- Completions for keywords (`null`, `true`, `false`, `+nan`, `+inf`, `-inf`) and map keys

## Installation

Install from the Zed extension registry, or as a dev extension:

1. Build `eon-lsp` (or ensure it is on `PATH`).
2. In Zed, run `zed: Install Dev Extension`.
3. Select this directory.

## Language server resolution

The extension resolves the `eon-lsp` binary in this order:

1. User-configured binary path in Zed LSP settings
2. `eon-lsp` or `eon_lsp` found on `PATH`
3. Workspace-local build at `target/debug` or `target/release`
4. `cargo run -p eon_lsp` (when inside the Eon workspace)
5. Download from the latest GitHub release of [`emilk/eon`](https://github.com/emilk/eon)

## License

Licensed under either of [MIT](LICENSE-MIT) or [Apache-2.0](LICENSE-APACHE) at your option.
