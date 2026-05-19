# zed-mermaid-render

A [Zed](https://zed.dev) extension that renders [Mermaid](https://mermaid.js.org)
diagrams **inline inside the markdown source itself**, via an LSP code action.
The rendered SVG ends up in the file, so it shows up in any markdown viewer
(GitHub, GitLab, Obsidian, VS Code, Zed's built-in preview, …).

> Zed already renders Mermaid in its built-in markdown preview pane (≥ 0.225).
> This extension is for the case where you want the SVG embedded **in the
> source**, not just visualised in a side panel.

## Features

- **`Render Mermaid Diagram`** code action — replaces a `` ```mermaid `` block
  with the rendered SVG, surrounded by HTML markers so the round-trip stays
  reversible.
- **`Edit Mermaid Source`** code action — restores the original mermaid block
  from the saved source under `.mermaid/<id>.mmd`.
- **100% offline, pure Rust** — no Node.js, no headless Chromium. Uses
  [`mermaid-rs-renderer`](https://crates.io/crates/mermaid-rs-renderer).
- **23 diagram types** supported (flowchart, sequence, class, state, ER,
  gantt, pie, …).

## Status

Pre-release. The pipeline (extension → LSP → renderer) works end-to-end and
38 tests pass. Manual install is the dev-extension flow until the extension
is published to Zed's registry.

## Installation (development mode)

Until this extension is published to the official Zed registry, install it as
a dev extension:

```sh
git clone https://github.com/taciclei/zed-mermaid-render
cd zed-mermaid-render

# Build the LSP server and put it on PATH
cargo build --release -p zed-mermaid-lsp
ln -sf "$PWD/target/release/zed-mermaid-lsp" "$HOME/.cargo/bin/zed-mermaid-lsp"
```

Then in Zed:

1. `Cmd+Shift+P` (or `Ctrl+Shift+P` on Linux/Windows)
2. Run `zed: install dev extension`
3. Select the `extension/` folder from this repository

Zed will compile the WASM extension; this takes a few seconds the first time.

## Usage

1. Open any `.md` file containing a `` ```mermaid `` block.
2. Place the cursor inside the block.
3. Trigger the code action menu (`Cmd+.` / `Ctrl+.`).
4. Pick **Render Mermaid Diagram**.

The block is replaced with:

```markdown
<!-- mermaid-render id=a1b2c3d4 -->
<svg xmlns="http://www.w3.org/2000/svg" ...>...</svg>
<!-- /mermaid-render -->
```

The original mermaid source is preserved at `<workspace>/.mermaid/<id>.mmd`.
**Commit that directory to git** so collaborators can re-edit the diagrams.

To re-edit a rendered diagram, place the cursor on the SVG and trigger the
code action menu → **Edit Mermaid Source**. The block is restored from the
saved source.

## Examples

The `docs/examples/` directory contains a markdown file per diagram type that
you can use to exercise the extension. See
[`docs/examples/README.md`](docs/examples/README.md).

## How it works

The extension is a thin WASM wrapper that registers a Rust-native LSP server
with Zed for the Markdown language. The LSP advertises a code-action provider;
when the user invokes a code action inside a mermaid block, the server renders
the SVG via `mermaid-rs-renderer`, persists the source to disk, and returns a
`WorkspaceEdit` that replaces the block.

See [`docs/architecture.md`](docs/architecture.md) for the full design.

## Documentation

- [Architecture](docs/architecture.md)
- [Usage guide](docs/usage.md)
- [Development guide](docs/development.md)
- [Original plan](docs/plan.md)
- [Changelog](CHANGELOG.md)
- [Contributing](CONTRIBUTING.md)

## Repository layout

```
.
├── Cargo.toml              # Rust workspace
├── extension/              # Zed extension (compiled to wasm32-wasip1)
│   ├── Cargo.toml
│   ├── extension.toml      # Zed manifest
│   └── src/lib.rs
├── lsp-server/             # native LSP server (Markdown code actions)
│   ├── Cargo.toml
│   └── src/
│       ├── main.rs
│       ├── server.rs       # tower-lsp-server boilerplate
│       ├── document.rs     # markdown block parser
│       ├── code_actions.rs # Render / Edit Source actions
│       ├── renderer.rs     # mermaid-rs-renderer wrapper
│       └── source_store.rs # .mermaid/<id>.mmd persistence
├── docs/                   # documentation + examples
└── examples/               # demo markdown files
```

## License

Licensed under either of [Apache License, Version 2.0](LICENSE-APACHE) or
[MIT license](LICENSE-MIT) at your option.

Unless you explicitly state otherwise, any contribution intentionally
submitted for inclusion in the work by you, as defined in the Apache-2.0
license, shall be dual licensed as above, without any additional terms or
conditions.

## Acknowledgements

- [mermaid-rs-renderer](https://github.com/1jehuang/mermaid-rs-renderer) by 1jehuang — the pure-Rust mermaid renderer that makes this extension possible.
- [tower-lsp-server](https://github.com/tower-lsp-community/tower-lsp-server) — actively maintained community fork of `tower-lsp`.
- [wfukatsu/zed-mermaid-plugin](https://github.com/wfukatsu/zed-mermaid-plugin) — prior art that helped shape the code-action approach.
