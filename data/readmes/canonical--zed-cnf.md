# zed-cnf

[cnf](https://github.com/canonical/cnf) language support for
[Zed](https://zed.dev), built on
[tree-sitter-cnf](https://github.com/canonical/tree-sitter-cnf).

Provides syntax highlighting, bracket matching, auto-indent, comment toggling
and an outline of keys for `*.cnf` files.

## Installing as a dev extension

1. Open the command palette and run `zed: install dev extension`.
2. Select this directory.

Zed fetches the grammar at the revision pinned in `extension.toml` and
compiles it to WebAssembly, which needs a Rust toolchain installed via
`rustup`.

## Updating the grammar

Change `rev` under `[grammars.cnf]` in `extension.toml` to the new
tree-sitter-cnf commit, then rebuild the dev extension from the extensions
page.
