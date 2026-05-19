# zed-gremlins

A [Zed](https://zed.dev) extension that highlights invisible and ambiguous unicode characters in your source files — a port of the [VSCode Gremlins](https://github.com/nhoizey/vscode-gremlins) extension.

Flags characters that are visually identical (or invisible) but semantically different from what you probably intended: zero-width spaces, bidi override characters (Trojan Source attack vectors), curly quotes, ambiguous whitespace, and more.

## What it detects

| Severity | Examples |
|---|---|
| **Error** | Zero-width space, bidi marks (LRM/RLM), bidi embeddings/overrides/isolates (Trojan Source), line/paragraph separators |
| **Warning** | Soft hyphen, ZWJ/ZWNJ, curly quotes `''""`, en/em dashes `–—`, invisible operators, BOM |
| **Info** | No-break space, typographic spaces (en/em/thin/hair space, etc.), ideographic space |

Diagnostics appear as squiggles in the editor and in the Problems panel. Hover over a flagged character to see its Unicode name, codepoint, and an explanation of why it's suspicious.

## Installation

### From the Zed extension registry

Search for **Gremlins** in Zed → Extensions.

### Local / development install

**Prerequisites:** Rust toolchain + `wasm32-wasip1` target:

```bash
rustup target add wasm32-wasip1
```

**Build and install:**

```bash
git clone https://github.com/elysrum/zed-gremlins
cd zed-gremlins

# Build the LSP server binary
cargo build -p gremlins-lsp --release

# Put it on PATH (the Zed extension finds it via `which gremlins-lsp`)
cp target/release/gremlins-lsp ~/.local/bin/gremlins-lsp

# Install the extension into Zed as a dev extension:
# Zed → Extensions → Install Dev Extension → select this directory
```

Zed compiles the WASM extension automatically when you install it as a dev extension.

## How it works

The extension consists of two parts:

- **WASM extension** (`src/lib.rs`) — loaded by Zed, discovers the `gremlins-lsp` binary (via PATH or GitHub download) and registers it as a language server
- **LSP server** (`gremlins-lsp/`) — a lightweight synchronous LSP server that scans document text on open/change and publishes diagnostics; also handles hover requests

The LSP server uses full-document sync (`TextDocumentSyncKind::FULL`) and scans with correct UTF-16 column offsets as required by the LSP specification.

## Supported languages

The extension activates for 46 languages including Rust, Go, Python, JavaScript/TypeScript, Markdown, YAML, JSON, HTML, CSS, Shell Script, SQL, and Plain Text. See `extension.toml` for the full list.

## Releasing

Create a GitHub release tagged `v0.x.x` with the following binary assets (each a `.tar.gz` containing a single `gremlins-lsp` binary):

```
gremlins-lsp-aarch64-apple-darwin.tar.gz
gremlins-lsp-x86_64-apple-darwin.tar.gz
gremlins-lsp-x86_64-unknown-linux-musl.tar.gz
gremlins-lsp-aarch64-unknown-linux-musl.tar.gz
```

The WASM extension will download the appropriate asset automatically.

## License

MIT
