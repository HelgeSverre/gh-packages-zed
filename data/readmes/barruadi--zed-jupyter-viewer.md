# Jupyter Notebook for Zed

Language support for Jupyter Notebook (`.ipynb`) files in the [Zed editor](https://zed.dev).
The purpose is just to see Notebook overview and make a quick edit

## Features

- **Syntax highlighting** — Notebook-aware coloring that distinguishes cell types (`code`, `markdown`, `raw`), structural keys (`source`, `outputs`), and metadata
- **Cell navigation** — Cells appear in the Outline panel (`Cmd+Shift+O`) for quick jumping between cells
- **Folding** — Collapse individual cells, outputs, and metadata sections
- **Python injection** — Python syntax highlighting inside code cell `source` arrays (experimental)

## Limitations

- This is **not a notebook renderer** — `.ipynb` files are displayed as structured JSON text
- Code injection defaults to Python; other kernel languages (R, Julia) are not auto-detected
- Combined injection support is experimental and depends on Zed's `injection.combined` implementation

## Installation

### From Extensions Marketplace

Search for "Jupyter Notebook" in Zed's Extensions panel.

### As Dev Extension

1. Clone repository
2. In Zed, open the Extensions panel
3. Click "Install Dev Extension"
4. Select the cloned directory

## How It Works

The extension reuses the [`tree-sitter-json`](https://github.com/tree-sitter/tree-sitter-json) grammar and applies specialized tree-sitter queries that pattern-match Jupyter notebook structures within the JSON AST. For example, `cell_type` values are identified by matching `(pair key: (string (string_content) @k) (#eq? @k "cell_type"))` and styled accordingly.

## Future

### Notebook-style cell rendering

Zed's extension API currently does not support custom editors or custom rendering (unlike VS Code's Custom Editor API). There are a few paths to getting actual notebook-style views:

- **Zed's built-in notebook support** — The Zed team is actively working on Jupyter notebook support ([#9778](https://github.com/zed-industries/zed/issues/9778)). Once landed, this extension could complement it or become unnecessary.
- **Custom editor API** — Community discussions ([#37270](https://github.com/zed-industries/zed/discussions/37270), [#33756](https://github.com/zed-industries/zed/discussions/33756)) have requested a custom rendering API for extensions. If Zed adds this, this could render cells as visual blocks with borders, rendered markdown, and output display.
- **Contribute to Zed core** — Fork [zed-industries/zed](https://github.com/zed-industries/zed) and implement notebook rendering directly in the editor. This is the most ambitious path but gives full control.

### Other planned improvements

- **Multi-kernel language detection** — Read `metadata.kernelspec.language` to inject the correct language (R, Julia, etc.) instead of defaulting to Python
- **Runnables** — Add `runnables.scm` to enable "Run Cell" actions if Zed adds support for custom run targets
- **LSP integration** — Add Rust code (`src/lib.rs`) to integrate a notebook-aware language server for code completion and diagnostics inside cells
- **Snippets** — Common notebook cell templates for quick insertion
- **Output rendering** — If Zed adds rich content rendering, display cell outputs (text, images, tables) inline


## License

MIT
