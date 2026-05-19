# alpine-ls

A language server for [Alpine.js](https://alpinejs.dev/) that provides:

- ✅ **Directive completions** — `x-data`, `x-show`, `x-for`, `x-model`, etc.
- ✅ **Magic completions** — `$store`, `$el`, `$refs`, `$watch`, `$dispatch`, etc.
- ✅ **Hover docs** — documentation for every Alpine directive on hover
- ✅ **Full JS intellisense** inside `x-data`, `@click`, `:class`, `x-init`, and all other Alpine attribute values — powered by `typescript-language-server`

## How it works

`alpine-ls` acts as a **proxy** between your editor and `typescript-language-server`. For each HTML file, it builds a "virtual JS document" that preserves the exact line/column structure of the original file, replacing non-Alpine content with whitespace and keeping Alpine attribute values in place. This means cursor positions translate 1:1 between the real file and the virtual JS file.

```
Editor ←LSP→ alpine-ls ←LSP→ typescript-language-server
                  ↕
           virtual .alpine.js doc
```

## Installation

```bash
npm install -g alpine-ls
```

## Usage with Zed

Install the `alpine-syntax` Zed extension (see the companion repo). It will automatically find and launch `alpine-ls`.

## Usage with Neovim (nvim-lspconfig)

```lua
require("lspconfig").alpine_ls = {
  default_config = {
    cmd = { "alpine-ls", "--stdio" },
    filetypes = { "html" },
    root_dir = require("lspconfig.util").root_pattern("package.json", ".git"),
  }
}
```

## Supported Alpine attributes

All official Alpine.js v3 directives:

| Directive | Shorthand | Kind |
|-----------|-----------|------|
| `x-data` | — | JS object |
| `x-init` | — | JS expression |
| `x-show` | — | JS boolean |
| `x-if` | — | JS boolean |
| `x-for` | — | JS iteration |
| `x-model` | — | property name |
| `x-bind:attr` | `:attr` | JS expression |
| `x-on:event` | `@event` | JS expression |
| `x-effect` | — | JS expression |
| `x-text` | — | JS expression |
| `x-html` | — | JS expression |
| `x-ref` | — | string |
| `x-transition` | — | modifier |
| `x-teleport` | — | CSS selector |
| `x-modelable` | — | property name |
| `x-intersect` | — | JS expression |

## License

MIT
