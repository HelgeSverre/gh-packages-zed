# zed-guile

A [Zed](https://zed.dev) extension that wires [guile-lsp-server](https://codeberg.org/rgherdt/scheme-lsp-server) into the editor for Scheme development.

## What it is

A thin Rust/Wasm bridge whose job is to tell Zed: when you open a Scheme file, launch `guile-lsp-server` with the correct environment variables. The actual work (completions, hover documentation, diagnostics) comes from `guile-lsp-server`, which uses [Geiser](https://www.nongnu.org/geiser/) under the hood to introspect a live Guile 3 runtime.

```
Zed editor
  └── zed-guile (this extension, Rust/Wasm)
        └── guile-lsp-server
              └── Geiser
                    └── Guile 3 runtime
```

## Features

- Autocomplete for Guile builtins and project symbols
- Hover documentation with procedure signatures
- Inline diagnostics via the Guile compiler
- Jump to definition for project-local symbols

## Requirements

- Guile 3.0+
- `guile-lsp-server` installed at `/usr/local/bin/guile-lsp-server`

Follow the [installation instructions](https://codeberg.org/rgherdt/scheme-lsp-server#guile) for `guile-lsp-server`. The recommended approach is building from source using the provided autotools build system.

## Installation

Install as a dev extension in Zed:

1. Clone this repo
2. Open Zed's command palette and run `zed: install dev extension`
3. Point it at the cloned directory

## Notes

This extension sets `GUILE_LOAD_PATH` and `GUILE_LOAD_COMPILED_PATH` to `/usr/local` so that Guile can find modules installed there. If you installed `guile-lsp-server` to a different prefix, update `src/lib.rs` accordingly.
