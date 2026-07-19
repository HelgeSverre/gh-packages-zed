# zed-rune-lsp

[Zed](https://zed.dev) extension for the [Rune](https://github.com/rune-rs/rune) programming language.

- Syntax highlighting, outline, indentation, bracket matching, vim-mode text objects, and
  screen-share redactions for `.rn` files, via
  [zhuhaow/tree-sitter-rune](https://github.com/zhuhaow/tree-sitter-rune)
- [`rune-languageserver`](https://crates.io/crates/rune-languageserver) integration
  (diagnostics, go to definition, completions)

## Installation

Not published to the Zed extension registry yet, install as a dev extension:

1. Clone this repository.
2. In Zed, run `zed: install dev extension` and select the repository root.

## Language server

The extension resolves `rune-languageserver` in this order:

1. A `binary` override in your Zed settings (see below).
2. `rune-languageserver` on your `PATH` (`cargo install rune-languageserver`).
3. A prebuilt nightly binary downloaded from the
   [rune-rs/rune releases](https://github.com/rune-rs/rune/releases/tag/nightly).
   Prebuilt binaries exist for macOS (aarch64), Linux (x86_64), and Windows (x86_64);
   on other platforms install the server with `cargo install rune-languageserver`.

To override the binary, pass extra arguments, or set environment variables (the server's
logging is controlled by `RUNE_LOG` and `RUNE_LOG_FILE`):

```json
{
  "lsp": {
    "rune-languageserver": {
      "binary": {
        "path": "/path/to/rune-languageserver",
        "arguments": [],
        "env": { "RUNE_LOG": "debug", "RUNE_LOG_FILE": "/tmp/rune-lsp.log" }
      }
    }
  }
}
```

`initialization_options` and `settings` under the same key are forwarded to the server as-is.

## Development

`cargo test` compiles the tree-sitter grammar at the commit pinned in `extension.toml` and
validates every query in `languages/rune/` against it, then checks that `tests/sample.rn`
parses without errors. Run it after touching any `.scm` file or bumping the grammar.
