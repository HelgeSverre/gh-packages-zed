# CSV Preview for Zed

`CSV Preview` is a Zed extension for making delimited text files like `.csv`, `.tsv`, and `.psv` easier to read inside the editor.

Because Zed's current public extension API is focused on languages, themes, debuggers, snippets, MCP servers, and assistant integrations, this project implements an editor-native approximation of a preview pane:

- tree-sitter based CSV language support
- TSV / pipe-separated file recognition through the same language entry
- alternating column tinting through semantic tokens
- cell type highlighting for numbers, booleans, dates, datetimes, null-like values, and quoted values
- row-width diagnostics for malformed CSV files

## What it looks like

Instead of rendering a custom webview panel, the extension turns the CSV buffer itself into a more readable table-like surface by combining:

- base Tree-sitter highlighting
- column-aware LSP semantic tokens
- type-aware semantic token modifiers

This stays inside the capabilities documented by Zed's official extension system while still improving scanability a lot for wide CSV files.

## Project layout

- `extension.toml`: Zed extension manifest
- `src/lib.rs`: Wasm extension entrypoint that launches the CSV LSP
- `languages/csv/`: language metadata, Tree-sitter highlights, semantic token defaults
- `crates/csv-preview-lsp/`: standalone Rust LSP server
- `examples/`: sample CSV / TSV / PSV files for local verification

## Installation

Published installs can use the extension directly from Zed's extension gallery. The bundled extension will automatically:

- use a user-specified `csv-preview-lsp` binary if configured
- otherwise use `csv-preview-lsp` from your `PATH`
- otherwise download a matching release asset from this repository

At the moment, automatic downloads are provided for:

- macOS Apple Silicon
- macOS Intel
- Linux x86_64
- Windows x86_64

## Local development

Prerequisites:

- Rust installed via `rustup`
- `wasm32-wasip2` target installed for Zed extension builds:

```bash
rustup target add wasm32-wasip2
```

1. Build the language server:

```bash
cargo build -p csv-preview-lsp --release
```

2. In Zed, run `zed: install dev extension` and choose this repository root.

3. Optionally point Zed to the built language server binary in your `settings.json`:

```json
{
  "semantic_tokens": "combined",
  "lsp": {
    "csv-preview-lsp": {
      "binary": {
        "path": "/absolute/path/to/zed_csv/target/release/csv-preview-lsp",
        "arguments": ["--stdio"]
      }
    }
  }
}
```

4. Open a `.csv` file and verify the semantic colors appear.

You can also open:

- `examples/showcase.csv`
- `examples/showcase.tsv`
- `examples/showcase.psv`

The LSP detects the active delimiter from content, so semantic coloring and row diagnostics work across those formats.

## Releases

Tagged releases publish prebuilt `csv-preview-lsp` binaries through GitHub Actions. The Zed extension uses those assets when no local override is configured.

## Notes

- Column colors are intentionally subtle and implemented as low-alpha cell backgrounds, so data type colors can remain the main signal.
- Header detection is heuristic-based. The first row is treated as a header when it looks like labels and later rows look more data-like.
- The bundled grammar is still CSV-first. For `.tsv` and `.psv`, the strongest readability improvements come from the LSP semantic tokens and diagnostics rather than perfect Tree-sitter structure.
- True visual column-width alignment is still limited by Zed's current public extension surface. This project improves readability inside the buffer, but it does not yet render a custom grid widget.
