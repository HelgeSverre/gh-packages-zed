# zed-factor

A [Zed](https://zed.dev) extension scaffold for the [Factor](https://factorcode.org) language.

## Included scaffold

- `extension.toml` with `tree-sitter-factor` grammar wiring
- Rust extension entrypoint (`src/lib.rs`)
- Factor language config (`languages/factor/config.toml`)
- Starter highlighting query (`languages/factor/highlights.scm`)

## Grammar source

This scaffold uses:

- Repository: <https://github.com/razetime/tree-sitter-factor>
- Commit: `d58ec1abcced8be976845c58138cf395a9675c64`

## Build check

```sh
cargo check
```
