# zed-quint

A [Zed](https://zed.dev) extension for the [Quint](https://quint-lang.org)
specification language. Port of the official
[VS Code Quint extension](https://marketplace.visualstudio.com/items?itemName=informal.quint-vscode).

Activates on `.qnt` files and inside ```` ```quint ```` fenced code blocks
in markdown.

## Features

- **Syntax highlighting** — keywords, storage modifiers, builtin types,
  constants, operators, strings, numbers, comments. Plus capitalized
  identifiers (`OCR`, `IdentSuccess`, `Camera`) highlighted as types /
  sum constructors, prime-suffixed identifiers (`x'`), the `match`
  keyword, the `Map` type, and the `->` operator (all missing from the
  upstream TextMate grammar).
- **Diagnostics, hover, go-to-definition, completions, rename** — via
  [`@informalsystems/quint-language-server`](https://www.npmjs.com/package/@informalsystems/quint-language-server),
  the same LSP server the VS Code extension uses. If
  `quint-language-server` is on your `PATH` (e.g. via
  `npm install -g @informalsystems/quint-language-server`), that copy
  is used. Otherwise the extension installs the latest version into its
  own working directory on first open and launches it via Node.
- **Markdown injection** — highlighting inside ```` ```quint ```` fenced
  code blocks, including literate specs using
  [`lmt`](https://github.com/driusan/lmt)-style info strings like
  ```` ```quint digger.qnt += ```` (Zed matches the first word).

The Tree-sitter grammar driving the highlighter is intentionally
[shallow](https://github.com/zdavison/tree-sitter-quint) (token-level only);
deeper editor features (folding, outline) come from the LSP.

## Install

Once published to the Zed extension registry: `cmd-shift-p` →
`zed: extensions` → search for "Quint" → install.

## Install (dev)

```sh
git clone https://github.com/zdavison/zed-quint.git
cd zed-quint
```

Then in Zed: `cmd-shift-p` → `zed: install dev extension` → pick the
`zed-quint` directory. Zed will:

- clone the [grammar](https://github.com/zdavison/tree-sitter-quint) at
  the `rev` pinned in `extension.toml` and compile it to wasm,
- compile the Rust extension shim (`src/quint.rs`) to wasm, and
- on first open of a `.qnt` file, install
  `@informalsystems/quint-language-server` via npm (skipped if the
  binary is already on your `PATH`).

## Layout

```
extension.toml                       # extension manifest, grammar pin, language server registration
Cargo.toml                           # Rust extension crate (cdylib targeting wasm32-wasip1)
src/quint.rs                         # launches quint-language-server (PATH first, npm fallback)
languages/quint/config.toml          # path_suffixes, comment markers, brackets, autoclose
languages/quint/highlights.scm       # tree-sitter highlight queries
```

## Iterating locally

- Edits to `languages/quint/*.scm` or `config.toml` →
  `cmd-shift-p` → `zed: reload extensions`.
- Edits to `src/quint.rs` or `Cargo.toml` → reload extensions (Zed
  rebuilds the wasm).
- Edits to the grammar → push a new commit to `tree-sitter-quint`, bump
  the `rev` in `extension.toml`, then reload. If you change the grammar
  repository URL, delete `grammars/` first — Zed refuses to repoint an
  existing clone.

## License

MIT. See [LICENSE](LICENSE).
