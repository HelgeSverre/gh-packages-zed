# KoLmafia ASH for Zed

Native language support for [KoLmafia](https://github.com/kolmafia/kolmafia)'s
[ASH scripting language](https://www.loathers.net/scripting/ash-overview/) in
[Zed](https://zed.dev/). The extension ships its own
[Tree-sitter](https://tree-sitter.github.io/tree-sitter/) grammar, an offline
snapshot of KoLmafia's runtime library and game constants, and a purpose-built
language server.

This repository can be cloned and installed as a development extension on any
supported Zed workstation. It does not download code or data at runtime.

## Features

- Syntax highlighting for declarations, control flow, operators, typed
  constants, templates, directives, comments, and CLI blocks.
- Bracket matching, indentation, outline navigation, text objects, and `main`
  runnable detection.
- Snippets for common ASH declarations and control-flow forms.
- Live syntax, unknown-symbol, unknown-type, duplicate-declaration,
  initializer-type, and invalid-control-flow diagnostics.
- Catalog-backed completion and hover documentation for KoLmafia built-ins.
- Completion for [typed constants](https://wiki.kolmafia.us/index.php/Data_Types)
  such as `$item[...]` and `$skill[...]`.
- Signature help for overloaded runtime-library functions.
- Go to definition, find references, document highlights, document symbols,
  workspace symbols, and guarded rename for user-defined symbols.
- Semantic tokens for functions, types, records, fields, parameters, and
  variables.
- Case-insensitive name resolution, matching ASH itself.
- Incremental LSP document synchronization with correct UTF-16 position
  handling.

## Local installation

Prerequisites:

- Zed with support for
  [development extensions](https://zed.dev/docs/extensions/developing-extensions).
- A current stable Rust toolchain managed by
  [rustup](https://rust-lang.github.io/rustup/installation/), with the
  [`wasm32-wasip2`](https://doc.rust-lang.org/rustc/platform-support/wasm32-wasip2.html)
  target installed.
- [Node.js](https://nodejs.org/en/download) and npm when developing or
  regenerating the parser.

Install the native language-server executable:

```sh
rustup target add wasm32-wasip2
tools/install-language-server.sh
```

Clone the repository on the target workstation. Then open Zed's command
palette, run `zed: install dev extension`, and select the cloned repository's
root directory. Open any `.ash` file; the language shown in Zed should be
`KoLmafia ASH`.

The extension and Tree-sitter grammar manifests use their canonical HTTPS
GitHub URL and contain no workstation-specific paths. For optional registry
publication, follow [Zed's extension publishing instructions](https://zed.dev/docs/extensions/developing-extensions#publishing-your-extension).

The extension discovers `kolmafia-ash-language-server` from Zed's worktree
shell environment. If Cargo's bin directory is not visible there, configure an
absolute path in [Zed settings](https://zed.dev/docs/configuring-languages#configuring-language-servers):

```json
{
  "lsp": {
    "kolmafia-ash": {
      "binary": {
        "path": "/absolute/path/to/kolmafia-ash-language-server"
      }
    }
  }
}
```

`binary.arguments`, `binary.env`, `initialization_options`, and `settings` are
also forwarded by the extension adapter.

## Running ASH scripts

Script execution remains under KoLmafia's control and can affect the logged-in
character. The extension therefore does not launch or remotely control
KoLmafia. Its [`ash-main` runnable tag](https://zed.dev/docs/tasks#binding-runnable-tags-to-task-templates)
can be bound to a user-owned runner that sends `call <script>` to the intended
KoLmafia session. See
[`examples/zed-tasks.json`](examples/zed-tasks.json) for the task shape.

## Development

Install JavaScript dependencies and run the complete verification suite:

```sh
npm ci
tools/verify.sh
```

Build the Zed WebAssembly adapter:

```sh
rustup target add wasm32-wasip2
cargo build -p zed-kolmafia-ash --target wasm32-wasip2 --release
```

The repository routes Cargo's compiler and documentation-compiler invocations
through rustup so Zed's development-extension builder and the test suite use
the same target-enabled stable toolchain, even when another Cargo or Rust
installation appears earlier on `PATH`.

The repository contains four layers:

- `grammar/`: Tree-sitter grammar, generated parser, corpus, and real fixture.
- `languages/ash/`: Zed language metadata and query files.
- `crates/ash-analysis/`: parser-backed semantic model and embedded catalog.
- `crates/ash-lsp/`: native
  [Language Server Protocol](https://microsoft.github.io/language-server-protocol/)
  executable.

See [`docs/architecture.md`](docs/architecture.md) for the data flow and
[`docs/development.md`](docs/development.md) for regeneration and release
details.

## Function catalog

The extension includes a catalog generated from
[KoLmafia revision r29158](https://github.com/kolmafia/kolmafia/tree/r29158). It
covers 897 built-in function overloads, 27 ASH types, and the enum values
available in that revision.

Hover and completion text comes from 425 dedicated
[KoLmafia Wiki function pages](https://wiki.kolmafia.us/index.php/Ash_Functions),
plus one shared page for a redirected function name. Another 183 functions are
documented from the pinned KoLmafia source. All 609 catalog functions have
completion and hover documentation. Function signatures use consistent ASH
formatting, and each imported entry links back to its source.

The catalog is compiled into the extension, so normal editing does not require
a local KoLmafia installation.

## Current boundaries

- Workspace indexing is in-memory and refreshed when the language server
  starts; files added externally during a session are discovered when opened or
  after restarting the server.
- ASH has no canonical formatter exposed here, so format-on-save is not
  advertised.
- The catalog describes the bundled KoLmafia revision; run the sync process
  when KoLmafia adds or changes functions, types, or constants.

## License

The extension and grammar are BSD-3-Clause licensed. Imported and generated
data attribution is recorded in [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md).
