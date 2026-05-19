# zed-huff

Huff language support for [Zed](https://zed.dev/) editor.

[Huff](https://docs.huff.sh/) is a low-level EVM assembly language for writing highly optimized smart contracts.

## Features

- Syntax highlighting for all Huff constructs
- Bracket matching and auto-closing
- Indentation support

## Installation

### From Zed Extensions (Recommended)

1. Open Zed
2. Press `Cmd+Shift+X` to open Extensions
3. Search for "huff"
4. Click Install

### Manual Installation

Clone this repository into your Zed extensions directory:

```bash
git clone https://github.com/niraj/zed-huff ~/.config/zed/extensions/huff
```

## Development

### Prerequisites

- [Zed](https://zed.dev/) editor
- [tree-sitter-huff](https://github.com/niraj/tree-sitter-huff) grammar

### Testing locally

1. Clone this repository
2. Symlink or copy to `~/.config/zed/extensions/`
3. Restart Zed
4. Open a `.huff` file

## License

MIT
