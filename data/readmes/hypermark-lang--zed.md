# HML for Zed

A [Zed](https://zed.dev) extension that adds support for **HML**.

## Features

- HML language registration
- Tree-sitter grammar integration
- Syntax highlighting
- Bracket matching
- Indentation rules
- Outline support
- `//` line comments
- compiler-backed diagnostics via `hml lsp`

## Project structure

```text
.
├── extension.toml
├── grammars/
│   └── hml.wasm
└── languages/
    └── hml/
        ├── brackets.scm
        ├── config.toml
        ├── highlights.scm
        ├── indents.scm
        └── outline.scm
```

This repository currently contains the declarative language extension pieces:

- extension manifest
- Tree-sitter grammar registration
- language metadata
- Tree-sitter query files

The HML language server itself lives in the `hml` Rust project and is launched externally as `hml lsp`.

## Language configuration

The language is defined in `languages/hml/config.toml` and is associated with files ending in `.hml`.

Current behavior includes:

- language name: `HML`
- grammar name: `hml`
- file suffix: `hml`
- line comments: `// `
- language server registration: `HML LSP`

## Development setup

This extension can be developed in three parts:

1. the Zed extension in this repository
2. the HML Tree-sitter grammar repository
3. the HML compiler / language server repository

### Using a local grammar checkout

During local development, `extension.toml` can point at a local Tree-sitter grammar repository using a `file://` URL.

Example:

```toml
[grammars.hml]
repository = "file:///absolute/path/to/tree-sitter-hml"
rev = "HEAD"
```

This is useful when iterating on the grammar and extension at the same time.

### Language server wiring

The extension manifest also registers an HML language server:

```toml
[language_servers.hml-lsp]
name = "HML LSP"
languages = ["HML"]
```

This tells Zed that `.hml` files may be served by an LSP, but the actual command is provided by extension runtime code.

### Extension runtime requirement

To actually launch the language server, this extension also needs a Rust extension runtime:

```text
Cargo.toml
src/
  lib.rs
```

That runtime is responsible for returning the command Zed should execute for the registered server, typically:

- command: `hml`
- args: `["lsp"]`

Without that runtime code, the manifest only declares the server name and language mapping; it does not start the process by itself.

### Important note about grammar checkout paths

If Zed reports that the grammar directory already exists but does not match the configured repository, make sure your local setup is consistent:

- either point `repository` to the same Git remote the local grammar checkout was cloned from
- or remove the conflicting local grammar directory and let Zed fetch it again

## Installing as a dev extension

To test this extension locally in Zed:

1. Open Zed
2. Install the extension as a development extension from this repository
3. Make sure the `hml` executable is available on your `PATH`
4. Make sure that executable supports `hml lsp`
5. Open an `.hml` file
6. Confirm the active language is `HML`
7. Confirm diagnostics appear for invalid HML

If the language does not load immediately, reload or restart Zed.

## Troubleshooting

### HML appears in Zed, but highlighting does not work

Check the following:

- the file is actually using the `HML` language mode
- the grammar compiles successfully
- the query files under `languages/hml/` match the current Tree-sitter grammar node names

### Zed reports query errors

If Zed logs errors like invalid node types or impossible query patterns, the query files likely do not match the current grammar.

Common files to check:

- `languages/hml/highlights.scm`
- `languages/hml/brackets.scm`
- `languages/hml/outline.scm`
- `languages/hml/indents.scm`

### HML syntax works, but diagnostics do not appear

Check the following:

- the `hml` executable is installed and available on your `PATH`
- `hml lsp` starts successfully from a terminal
- the extension includes Rust runtime code that launches the registered `HML LSP`
- the language server registration in `extension.toml` matches the language name exactly: `HML`
- Zed logs do not show language-server startup errors

### Zed fails to compile the grammar

If Zed cannot compile the grammar, verify:

- the grammar repository path is correct
- the configured revision exists
- the local grammar checkout matches the configured repository URL
- there is no stale or conflicting grammar directory from a previous setup

## HML comment syntax

HML uses `//` for line comments.

Example:

```hml
# page title
Page {
  color: #fff
  title: "Hello"
}
```

## Contributing

When changing the grammar:

1. update the Tree-sitter grammar
2. rebuild or refresh the grammar artifacts as needed
3. verify the Zed query files still match the generated node types
4. reload the extension in Zed and test with real `.hml` files

When changing the language server wiring:

1. update the `hml` project implementation of `hml lsp`
2. update the Zed extension runtime command if needed
3. reinstall or reload the dev extension
4. verify that invalid `.hml` files produce diagnostics in Zed
