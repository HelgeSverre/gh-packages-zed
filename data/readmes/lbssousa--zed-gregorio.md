# Gregorio GABC — Zed Extension

> [!NOTE]
> **AI-Assisted Development**
>
> This project is developed, fully or in part, with LLM/generative AI assistance.
> All LLM-proposed changes go through human review and local testing before being committed.
>
> If you object to software built with generative AI assistance, we respect your opinion
> and regret we cannot meet your expectations. In that case, we kindly recommend exploring
> alternative solutions. If you know of any, feel free to open an issue — we'll be happy
> to include them in our documentation.

Adds support for **GABC/NABC** (Gregorian chant notation) files to [Zed](https://zed.dev).

## Features

- **Syntax Highlighting** — Full highlighting for GABC headers, pitches, clefs, neumes, bars, alterations, style tags, NABC notation, and comments.
- **LaTeX Injection** — TeX code inside `<v>…</v>` tags and verbatim attributes (`[nv:…]`, `[gv:…]`, `[ev:…]`) gets LaTeX highlighting.
- **Bracket Matching** — Auto-matching for `()`, `[]`, `{}`, and `<>`.
- **Code Outline** — Headers appear in the document outline/symbols panel.
- **Language Server** — Diagnostics, hover, completion, and document symbols via [gregorio-lsp](https://github.com/AISCGre-BR/gregorio-lsp).
- **Document Formatting** — Format `.gabc` files via **Format Document** (`Alt+Shift+F` / `⌥⇧F`) or on save, powered by [grefmt](https://github.com/AISCGre-BR/gregorio-lsp) (part of `gregorio-lsp ≥ 0.9.0`).

## Prerequisites

For **Language Server** features (diagnostics, hover, completions, **formatting**):

Install `gregorio-lsp` via Cargo (v0.9.0 or later includes the `grefmt` formatter):
```sh
cargo install --git https://github.com/aiscgre-br/gregorio-lsp \
  --tag v0.9.0 --bin gregorio-lsp
```

Make sure `~/.cargo/bin` is in your PATH. Syntax highlighting works without any prerequisites.

## Installation

### From Zed Extensions Marketplace

Search for "Gregorio" in **Zed → Extensions**.

### As Dev Extension

1. Clone this repository
2. In Zed, run **`zed: install dev extension`** and select the cloned directory

## Grammar

This extension uses [tree-sitter-gregorio](https://github.com/AISCGre-BR/tree-sitter-gregorio) (v0.5.2, commit `c9034de8`), a complete tree-sitter grammar for GABC+NABC notation compatible with Gregorio 6.2.0.

## Formatting

Formatting is provided by the `gregorio-lsp` language server (which embeds `grefmt`). No additional binary is required beyond the `gregorio-lsp` server already installed for diagnostics.

### Using the formatter

- **Format Document**: `Alt+Shift+F` (Linux/Windows) or `⌥⇧F` (macOS)
- **Format on save**: add to your Zed `settings.json`:
  ```json
  {
    "languages": {
      "GABC": {
        "format_on_save": "on"
      }
    }
  }
  ```

### Formatter options

Configure via the `formatting` key in Zed's LSP settings (`settings.json`):

```json
{
  "lsp": {
    "gregorio-lsp": {
      "initialization_options": {},
      "settings": {
        "formatting": {
          "maxLineWidth": 80,
          "breakAfterClef": false,
          "breakAfterBar": false
        }
      }
    }
  }
}
```

| Option | Type | Default | Description |
|---|---|---|---|
| `maxLineWidth` | integer | `80` | Maximum characters per notation line |
| `breakAfterClef` | boolean | `false` | Insert a blank line after each clef token |
| `breakAfterBar` | boolean | `false` | Insert a blank line after each bar token |

## License

MIT — Copyright (c) 2026 AISCGre Brasil. See [LICENSE](LICENSE).