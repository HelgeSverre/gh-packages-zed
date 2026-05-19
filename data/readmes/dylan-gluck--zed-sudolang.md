# zed-sudolang

A [Zed](https://zed.dev) extension that adds [SudoLang](https://github.com/paralleldrive/sudolang-llm-support) language support: syntax highlighting, outline navigation, bracket matching, indentation, code injections, and — when [`sudolang-lsp`](https://github.com/dylan-gluck/sudolang-lsp) is on `$PATH` — diagnostics and format-on-save.

- Source: <https://github.com/dylan-gluck/zed-sudolang>
- Grammar: <https://github.com/dylan-gluck/tree-sitter-sudolang>
- Language server: <https://github.com/dylan-gluck/sudolang-lsp>

## File types

Registers `.sudo` files as SudoLang. Markdown files (`.md`, `.sudo.md`, `.mdc`) are still handled by Zed's built-in Markdown extension; SudoLang code fences inside them (` ```sudo ` / ` ```SudoLang `) are highlighted via Markdown's code-block injection once this extension is installed.

## Install

### From the Zed extension picker

1. Open the command palette (`cmd-shift-P`).
2. Run **`zed: extensions`**.
3. Search for **SudoLang** and click **Install**.

That's it — open any `.sudo` file to see highlighting, outline, and bracket matching.

### Dev install (for contributors)

To work against a local checkout of this repo:

1. Clone this repository.
2. In Zed, open the command palette and run **`zed: install dev extension`**.
3. Select the cloned directory.

Zed builds the parser from the SHA pinned in `extension.toml` and installs the extension. Edits to local query files take effect after a restart.

## Features

- Syntax highlighting for interfaces, functions, constraints, commands, pipes, modifiers, strings, and section headings.
- Outline panel populated with interfaces, functions, constraints, commands, and `# heading` markers.
- Bracket pair matching for `{}`, `[]`, `()`, `""`, and `` `` ``.
- Indent-on-newline after `{` and `[`.
- Vim-mode text objects for function / class / parameter / comment scopes.
- **Diagnostics, formatting, hover, completion, and goto-definition via
  `sudolang-lsp`** (opt-in — see below).

## Language server

The extension registers a language server named **SudoLang LSP** and
launches it on demand. It does not bundle a binary; install
[`sudolang-lsp`](https://github.com/dylan-gluck/sudolang-lsp) yourself
and ensure it's on `$PATH`:

```sh
git clone https://github.com/dylan-gluck/sudolang-lsp
cd sudolang-lsp
cargo install --path .
```

Once installed, Zed picks it up automatically when you open a `.sudo`
file. Enable format-on-save in your Zed settings to use the formatter:

```json
{
  "languages": {
    "SudoLang": {
      "format_on_save": "on"
    }
  }
}
```

The server provides:

- **Diagnostics** — unbalanced braces, missing tokens, malformed
  modifier lists (`:foo=bar;`), broken `${}` interpolations.
- **Formatting** — deterministic, AST-driven re-indent. Never reorders
  tokens or rewrites content; never touches the inside of multi-line
  strings or comments.
- **Hover** — Markdown blurbs for keywords, in-document identifiers
  (function / interface / property / variable / parameter / constraint),
  and `/command` invocations.
- **Completion** — keyword list plus every named declaration in the
  current document. Trigger characters: `.`, `/`, `$`.
- **Go to definition** — jumps from an identifier or `/command`
  invocation to its declaration in the same file.

If `sudolang-lsp` isn't on `$PATH` the extension fails the language-server
launch with an actionable error pointing here. The rest of the extension
(highlighting, outline, brackets) keeps working.

## License

MIT.
