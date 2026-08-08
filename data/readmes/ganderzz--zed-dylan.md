# Open Dylan Zed Extension

A Zed extension for the [Open Dylan](https://opendylan.org) language: syntax
highlighting, bracket matching, comment toggling, and LSP features (hover,
diagnostics, go-to-definition, completion) via `dylan-lsp-server`.

## Prerequisites

The extension does not bundle the language server (per Zed publishing rules).
You need the **Open Dylan language server** (`dylan-lsp-server`) on your `PATH`.

### Installing `dylan-lsp-server`

1. Install [Open Dylan](https://opendylan.org) (2023.1 or newer).

2. Clone and build [`lsp-dylan`](https://github.com/dylan-lang/lsp-dylan):
   ```bash
   git clone --recursive https://github.com/dylan-lang/lsp-dylan
   cd lsp-dylan
   deft update
   make install
   ```

3. Confirm the install directory (typically `${DYLAN}/bin`, or `~/dylan/bin`
   if `DYLAN` is unset) is on your `PATH`:
   ```bash
   which dylan-lsp-server
   ```

## Features

### Syntax highlighting

Highlighting uses a tree-sitter grammar:
[`ganderzz/tree-sitter-dylan`](https://github.com/ganderzz/tree-sitter-dylan).
It is a lexical grammar whose token classes are derived from the official
[`dylan-lang/vscode-dylan`](https://github.com/dylan-lang/vscode-dylan)
TextMate grammar (DRM spec). It recognizes:

- Control-flow, definer, and modifier keywords
- DRM built-in functions
- Type names by the `<name>` convention
- Strings, raw strings (`#r"..."`), `#"symbols"`, characters
- `keyword:` arguments
- Numbers (decimal, `#x`/`#o`/`#b`)
- Booleans (`#t`/`#f`), `#rest`/`#key`/`#all-keys`/`#next`
- `\==` style operator references
- `//` line comments and `/* */` block comments

The grammar is lexical, not full-syntax. It parses the great majority of real
Dylan cleanly; macro-heavy and generated FFI files may show partial highlighting.

### Language server

With `dylan-lsp-server` on `PATH`, the extension provides:

- **Hover** — type information and argument lists
- **Go to definition / declaration**
- **Diagnostics** — compiler warnings inline
- **Completion**

### Editor behavior

- Line comments — `//`
- Block comments — `/* */`
- Auto-closing brackets — `{}`, `[]`, `()`, `""`

## File types

Recognized by extension:

- `.dylan` — Dylan source files
- `.lid` — Library Interchange Definition files

## Installing as a dev extension

1. Open Zed.
2. Command Palette (`Cmd+Shift+P`) → **Extensions: Install Dev Extension**.
3. Select this directory (`zed-open-dylan`).
4. Open a `.dylan` file — highlighting activates and the language server
   connects if `dylan-lsp-server` is on `PATH`.

If something goes wrong, check `~/Library/Logs/Zed/Zed.log` (macOS) for grammar
compilation or `failed to load language` errors.

## Contributing

- Keep the extension TOML-only (no Rust unless procedural behavior is needed).
- Pin tree-sitter grammar dependencies to a specific commit.
- Grammar changes live in
  [`ganderzz/tree-sitter-dylan`](https://github.com/ganderzz/tree-sitter-dylan).

## License

MIT — see [LICENSE](LICENSE). `dylan-lsp-server` is distributed separately under
its own license by the Dylan Hackers / dylan-lang project.
