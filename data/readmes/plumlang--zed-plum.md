# Plumlang for Zed

[Plumlang](https://plum.elixpo.com) support for the [Zed](https://zed.dev)
editor, for `.plum` files.

- **Syntax highlighting** from the
  [Tree-sitter grammar](https://github.com/plumlang/tree-sitter-plum):
  keywords, functions and methods, trees, traits and kinds with their cases,
  types, parameters, fields, strings with `{interpolation}` and
  `{value:format}`, numbers, comments.
- **Outline** (the outline panel and `cmd-shift-o` / `ctrl-shift-o`):
  functions, trees, traits and kinds with their fields, methods and cases,
  and top-level constants.
- **Brackets and indentation**: matching and rainbow brackets, auto-closed
  `()`, `[]`, `{}`, `"..."` and `"""..."""`, and indentation inside every
  bracket pair, four spaces to a level.
- **Comments**: toggle line comments (`#`) with `cmd-/` / `ctrl-/`.
- **Vim text objects**: `af` / `if` for functions and methods, `ac` / `ic`
  for trees, traits and kinds, `gc` for comments.
- **Language server**: `plum lsp`, built into the `plum` binary, gives
  diagnostics as you type, hover, go to definition, completion, document
  symbols and formatting (used by format on save).
- **Tasks**: `plum run`, `plum check` and `plum fmt` on the current file,
  from `task: spawn`.

## Requirements

The language server is the `plum` binary itself, so `plum` must be on your
`PATH` (the extension does not download it). Install Plumlang with one of:

```sh
# macOS and Linux
curl -fsSL https://plum.elixpo.com/install.sh | sh

# Windows (PowerShell)
irm https://plum.elixpo.com/install.ps1 | iex

# Homebrew
brew install plumlang/tap/plum
```

Check it with `plum version`, then restart Zed. Highlighting, the outline and
the rest work without `plum`; only the language server features need it.

To use a `plum` that is not on your `PATH`, set its path in Zed's
`settings.json`:

```json
{
  "lsp": {
    "plum-lsp": {
      "binary": { "path": "/path/to/plum" }
    }
  }
}
```

`binary.arguments` (default `["lsp"]`) and `binary.env` are honoured too.

## Install

**From Zed's extension gallery** (once it is published): open the
Extensions page (`zed: extensions`), search for "Plumlang" and click
Install.

**As a dev extension**, from a clone of this repository:

1. Install Rust with [rustup](https://rustup.rs) (Zed compiles the
   extension to WebAssembly and adds the `wasm32-wasip2` target itself).
2. In Zed, run `zed: install dev extension` from the command palette, or
   click "Install Dev Extension" on the Extensions page, and pick the folder
   of this repository.
3. Open a `.plum` file. If something does not work, `zed: open log` shows
   what happened.

## Layout

```
extension.toml              id, grammar and language server
Cargo.toml, src/lib.rs      starts `plum lsp` for the language server
languages/plum/
  config.toml               file suffix, comments, brackets, tab size
  highlights.scm            syntax highlighting
  brackets.scm              bracket matching
  indents.scm               auto-indentation
  outline.scm               the outline panel and symbol search
  textobjects.scm           Vim text objects
  overrides.scm             string and comment scopes for auto-closing
  tasks.json                plum run / check / fmt
```

The queries are adapted from the ones in
[tree-sitter-plum](https://github.com/plumlang/tree-sitter-plum) to Zed's
capture names. CI checks every query against the grammar and the Plumlang
examples.

## Links

- Plumlang: <https://plum.elixpo.com>
- Docs: <https://plum.elixpo.com/docs/>
- The language server: <https://plum.elixpo.com/docs/tools/lsp/>
- Grammar: <https://github.com/plumlang/tree-sitter-plum>

## Licence

The code in this repository is under the [MIT licence](LICENSE). The
Plumlang name and logo are trademarks of Elixpo and are not licensed by it;
see [NOTICE](NOTICE).
