# HFST for Zed

[Zed](https://zed.dev) extension providing syntax highlighting for HFST (Helsinki Finite-State Toolkit) language files:

- **TWOL** (`.twol`) — Two-Level Morphology rules
- **LEXC** (`.lexc`) — Lexicon Compiler format

## Features

- Syntax highlighting for TWOL and LEXC files
- Powered by [tree-sitter-twol](https://github.com/tachyons/tree-sitter-twol) and [tree-sitter-lexc](https://github.com/tachyons/tree-sitter-lexc)

## Installation

Search for **HFST** in the Zed Extensions marketplace, or install via the command palette:

```
zed: extensions
```

## TWOL Highlighting

Highlights section keywords (`Alphabet`, `Sets`, `Definitions`, `Rules`), rule operators (`=>`, `<=`, `<=>`), symbol pairs (`a:b`), wildcards, epsilon (`0`), word boundary (`.#.`), set and definition names, regex operators, and comments.

## LEXC Highlighting

Highlights section keywords (`LEXICON`, `Multichar_Symbols`), lexicon names, continuation references, entry forms (`upper:lower`), multichar symbols, and comments.

## License

MIT
