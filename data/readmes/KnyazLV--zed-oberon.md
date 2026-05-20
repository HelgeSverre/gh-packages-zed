# Oberon-07 for Zed

Unofficial Oberon-07 language support for [Zed editor](https://zed.dev).

Based on the Tree-sitter grammar by [geekstakulus/tree-sitter-oberon-07](https://github.com/geekstakulus/tree-sitter-oberon-07).

## Features

- Syntax highlighting (complete Oberon-07 support)
- Auto-indentation for blocks (`BEGIN`/`END`, `IF`, `WHILE`, etc.)
- Structural navigation (Outline view with procedure signatures)
- Language Server Protocol (LSP) support *[Planned]*

## Installation (Manual / Dev)

Currently, this extension is not in the official registry. To install it manually:

1. Clone this repository:
   ```bash
   git clone https://github.com/KnyazLV/zed-oberon.git ~/zed-oberon
   
2. Open Zed
3. Open Command Palette (Cmd+Shift+P) and search for "zed: install dev extension".
4. Select the cloned folder (~/zed-oberon).
5. Restart Zed

Contributing
- Grammar: The grammar sources are vendored in grammars/oberon07.
- Queries: Syntax highlighting and indents are in languages/oberon.
