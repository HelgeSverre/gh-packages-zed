# TyranoScript for Zed

[日本語](README.ja.md)

Language support for [TyranoScript](https://tyrano.jp/) (`.ks` files) in the [Zed](https://zed.dev/) editor.

## Features

- Syntax highlighting (tags, attributes, comments, labels, text)
- Auto-closing brackets (`[]`, `""`)
- Comment toggling (`;`)
- Tag name and parameter completion (via Language Server)
- Asset file completion for `storage=""` (bgimage, fgimage, bgm, etc.)
- Label completion for `target=""`
- User-defined macro completion
- Hover documentation for tags and parameters
- Go to Definition — labels, JS label calls, macros, scenario files, and `tf.xxx`
- Find References — all usages of labels, JS label calls, macros, and `tf.xxx`
- Diagnostics
  - Missing required parameters (error)
  - Missing file references (warning)
  - Undefined tag/macro (warning)
  - Undefined label references (warning)
  - Unused labels (warning)
  - Per-line suppression via `; tyranoscript-disable-next-line`

## Installation

### From the Zed Extension Marketplace

Search for "TyranoScript" in Zed's Extensions panel.

### As a Dev Extension

1. Clone this repository
   ```bash
   git clone https://github.com/void2610/tyranoscript-zed.git
   ```
2. Open Zed → **Extensions** → **Install Dev Extension**
3. Select the cloned folder
4. Open a `.ks` file to verify highlighting

## Syntax Highlighting Example

```
; comment
*label_name

[bg storage="bg_room.png" time=1000]
[chara_show name="hero" pos=center]

春子「こんにちは！」[l]

[if exp="f.flag == 1"]
フラグが立っています。
[endif]
```

- **Tag names** (`bg`, `chara_show`) → function color
- **Control tags** (`if`, `endif`, `macro`) → keyword color
- **Attribute names** (`storage`, `time`) → property color
- **Attribute values** (`"bg_room.png"`, `1000`) → string color
- **Comments** (`; ...`) → comment color
- **Labels** (`*label_name`) → label color

## Architecture

- **Tree-sitter grammar**: parsed by [tree-sitter-tyranoscript](https://github.com/void2610/tree-sitter-tyranoscript)
- **Language Server**: [tyranoscript-lsp](https://github.com/void2610/tyranoscript-lsp) ([`@void2610/tyranoscript-lsp`](https://www.npmjs.com/package/@void2610/tyranoscript-lsp)) — editor-agnostic LSP server
- **Zed extension (WASM)**: Rust-compiled WASM binary manages LSP server installation and launch

## Acknowledgements

Tag dictionary data is based on `tyrano.Tooltip.json` from [orukRed/tyranosyntax](https://github.com/orukRed/tyranosyntax).

## Related Repositories

- [tyranoscript-lsp](https://github.com/void2610/tyranoscript-lsp) — Language Server (editor-agnostic)
- [tree-sitter-tyranoscript](https://github.com/void2610/tree-sitter-tyranoscript) — Tree-sitter grammar

## License

[MIT](LICENSE)
