# Zed — Salam

[Salam](https://github.com/SalamLang/Salam) support for the [Zed](https://zed.dev) editor:
Tree-sitter syntax highlighting for English and Persian source, plus the compiler's
built-in language server (`salam lsp`) for diagnostics, completion, hover, navigation,
rename and formatting.

## Requirements

- Salam **0.5.9 or newer** installed and on your `PATH` (`salam --version` must work
  from a terminal — including from a GUI-launched Zed, which inherits the login shell
  environment on macOS/Linux).
- Zed 1.x.

## Features

- Syntax highlighting for both keyword languages (English and فارسی), including
  built-in types, keywords, operators, layout DSL tags and attributes.
- Bracket matching and rainbow brackets.
- Code outline for functions, structs, interfaces, enums, type aliases, components,
  fields, enum members and top-level constants.
- Comment toggling (`//` and `/* */`), auto-closing pairs, block-aware indentation.
- Language server: errors and warnings as you type, completion, hover, go to
  definition/type definition, find references, rename, document symbols, folding,
  semantic highlighting, code actions and formatting.

## Install (local development)

1. Clone this repository.
2. In Zed: `zed: extensions` → **Install Dev Extension** → pick the clone's root
   (the directory containing `extension.toml`).
3. Open any `.salam` file.

Zed compiles the vendored grammar and the Rust extension on install. If something
fails, run `zed --foreground` and check `zed: open log`.

## Layout

```
extension.toml              manifest: grammar + language server
src/lib.rs                  finds `salam` on PATH, runs `salam lsp`
languages/salam/config.toml language metadata, comments, indentation, brackets
languages/salam/*.scm       highlights, brackets, outline
grammar/                    vendored tree-sitter-salam, with generated src/parser.c
tests/                      sample .salam file and the query check run by CI
```

## Why the grammar is vendored

Upstream keeps the grammar at `extensions/tree-sitter-salam` inside the Salam
monorepo and does not commit the generated `src/parser.c`. Zed compiles
`src/parser.c` directly and cannot run `tree-sitter generate`, so the grammar is
vendored here with the generated parser committed. To refresh it:

```sh
cd grammar
npx tree-sitter-cli generate     # or: tree-sitter generate
```

`grammar.js`, `keywords.json`, `src/scanner.c` and `src/keywords.h` come from
upstream; `grammar.js` carries one local fix, described in `grammar/UPSTREAM.md`.
`src/parser.c`, `src/grammar.json`, `src/node-types.json` and `src/tree_sitter/`
are generated.

Then run the query check:

```sh
sh tests/check-queries.sh
```

It parses `tests/sample.salam` and fails if any query in `languages/salam/`
stops compiling or matching, so a grammar node rename cannot silently drop
highlighting.

## License

MIT. The vendored grammar keeps its upstream MIT license (`grammar/LICENSE`).
