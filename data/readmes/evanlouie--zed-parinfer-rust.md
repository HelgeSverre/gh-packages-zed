# Parinfer for Zed

A [Zed](https://zed.dev) extension that brings [parinfer](https://shaunlebron.github.io/parinfer/) support to Lisp-like languages through a dedicated Language Server Protocol (LSP) server wrapping [parinfer-rust](https://github.com/eraserhd/parinfer-rust).

Parinfer automatically infers and balances parentheses based on indentation, enabling structural editing for languages like Clojure, Common Lisp, Scheme, Racket, Fennel, Janet, and Hy.

## Features

- **Smart Mode** (default): Automatically decides between indent and paren mode based on context and cursor position. Best for everyday editing.
- **Indent Mode**: Adjusts closing parentheses based on indentation. Edit code by changing indentation and let parinfer fix the parens.
- **Paren Mode**: Adjusts indentation based on parenthesis structure. Useful when pasting code or making manual paren edits.
- **On-Type Formatting**: Runs parinfer after each keystroke for a seamless structural editing experience.
- **Format on Save**: Run parinfer as a standard formatter via Zed's format-on-save feature.
- **Diagnostics**: Surfaces parinfer errors (unmatched parens, unclosed quotes, etc.) as editor diagnostics.
- **Multi-Language Support**: Configured for Clojure, Common Lisp, Scheme, Racket, Fennel, Janet, Hy, and other Lisp dialects with language-specific parsing options.

## Architecture

The extension consists of two components:

1. **Zed Extension (WASM)** — The `zed-parinfer` crate compiles to WebAssembly and runs inside Zed's extension sandbox. It manages downloading and launching the LSP server binary.

2. **Parinfer LSP Server** — The `parinfer-lsp` crate is a standalone Rust binary that implements the Language Server Protocol. It wraps the parinfer-rust algorithm and communicates with Zed over stdio.

```
zed-parinfer-rust/
├── Cargo.toml              # WASM extension crate (cdylib)
├── extension.toml          # Zed extension manifest
├── src/
│   └── lib.rs              # Extension: binary management + LSP config
└── parinfer-lsp/
    ├── Cargo.toml           # LSP server binary crate
    └── src/
        └── main.rs          # LSP server: parinfer + formatting + diagnostics
```

## Installation

### From Zed Extensions (once published)

1. Open Zed
2. Open the Extensions panel (`Cmd+Shift+X` on macOS)
3. Search for "Parinfer"
4. Click **Install**

The extension will automatically download the appropriate `parinfer-lsp` binary for your platform from [GitHub Releases](https://github.com/evanlouie/zed-parinfer-rust/releases).

### Manual Binary Install (optional)

If you prefer to manage the binary yourself, you can install it with Cargo. The extension will find it on your PATH and use it instead of downloading a release binary.

```sh
cargo install --git https://github.com/evanlouie/zed-parinfer-rust.git parinfer-lsp
```

### As a Dev Extension (for development)

1. Clone this repository:
   ```sh
   git clone https://github.com/evanlouie/zed-parinfer-rust.git
   ```

2. Build the LSP server binary:
   ```sh
   cd zed-parinfer-rust
   cargo install --path parinfer-lsp
   ```

3. In Zed, run the command **"zed: install dev extension"** and select the `zed-parinfer-rust` directory.

## Configuration

Configure parinfer through Zed's `settings.json`:

```json
{
  "lsp": {
    "parinfer": {
      "initialization_options": {
        "mode": "smart",
        "formatOnType": true
      }
    }
  }
}
```

### Language Server Priority

If you're using another language server (e.g. `clojure-lsp`), you must list `parinfer` **before** it in the `language_servers` array. Otherwise, the other LSP will take precedence for formatting and on-type actions.

```json
{
  "languages": {
    "Clojure": {
      "language_servers": ["parinfer", "clojure-lsp", "..."]
    }
  }
}
```

### Options

| Option         | Type    | Default   | Description                                                                 |
|----------------|---------|-----------|-----------------------------------------------------------------------------|
| `mode`         | string  | `"smart"` | Parinfer mode: `"smart"`, `"indent"`, or `"paren"`.                         |
| `formatOnType` | boolean | `true`    | Enable on-type formatting (runs parinfer after each keystroke).             |

### Parinfer Modes

- **`smart`** — The recommended mode. Uses indent mode with smart change tracking. Automatically handles cursor-holding behavior and adapts between indent and paren logic based on context.

- **`indent`** — Pure indent mode. Adjusts closing delimiters to match indentation. Best when you want to control structure purely through indentation changes.

- **`paren`** — Pure paren mode. Adjusts indentation to match parenthesis structure. Useful after pasting code or when manually editing delimiters.

### Format on Save

To run parinfer automatically when saving, enable format-on-save for Clojure files in your `settings.json`:

```json
{
  "languages": {
    "Clojure": {
      "format_on_save": "on"
    }
  }
}
```

## Supported Languages

| Language     | Language ID      | Special Features                              |
|--------------|------------------|-----------------------------------------------|
| Clojure      | `clojure`        | Standard Lisp parsing                         |
| ClojureScript| `clojurescript`  | Standard Lisp parsing                         |
| Common Lisp  | `commonlisp`     | `\|` symbols, `#\|...\|#` block comments      |
| Scheme       | `scheme`         | `\|` symbols, block comments, `#;` sexp comments |
| Racket       | `racket`         | Same as Scheme                                |
| Fennel       | `fennel`         | Standard Lisp parsing                         |
| Janet        | `janet`          | `#` comments, backtick long strings           |
| Hy           | `hy`             | `#[tag[...]]` bracket strings                 |

## Development

### Prerequisites

- [Rust](https://www.rust-lang.org/tools/install) (via rustup)
- [Zed](https://zed.dev) editor

### Building the LSP Server

```sh
cd parinfer-lsp
cargo build --release
```

The binary will be at `target/release/parinfer-lsp`.

### Running Tests

```sh
cd parinfer-lsp
cargo test
```

### Testing the LSP Server Manually

You can test the server directly using JSON-RPC over stdio:

```sh
echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"capabilities":{}}}' | ./target/release/parinfer-lsp --stdio
```

### Building the Zed Extension

The WASM extension is built automatically by Zed when you install it as a dev extension. To build it manually:

```sh
cargo build --release --target wasm32-wasip1
```

### Debugging

Run Zed from the terminal to see extension logs:

```sh
zed --foreground
```

Set `RUST_LOG=debug` for verbose LSP server output:

```json
{
  "lsp": {
    "parinfer": {
      "initialization_options": {
        "mode": "smart"
      }
    }
  }
}
```

The LSP server writes logs to stderr, which Zed captures and displays in its log output.

## Releasing

### Building Release Binaries

Build binaries for each target platform:

```sh
# macOS (Apple Silicon)
cargo build --release --target aarch64-apple-darwin

# macOS (Intel)
cargo build --release --target x86_64-apple-darwin

# Linux (x86_64)
cargo build --release --target x86_64-unknown-linux-gnu

# Linux (ARM64)
cargo build --release --target aarch64-unknown-linux-gnu
```

### Release Asset Naming

The extension expects release assets named:

```
parinfer-lsp-darwin-aarch64
parinfer-lsp-darwin-x86_64
parinfer-lsp-linux-aarch64
parinfer-lsp-linux-x86_64
parinfer-lsp-windows-x86_64.exe
```

Create a GitHub release with these binaries attached. The extension will automatically download the appropriate binary for the user's platform.

## How It Works

1. When you open a supported file in Zed, the extension launches the `parinfer-lsp` binary.
2. The LSP server tracks the full text of each open document.
3. On formatting requests (manual or on-save), it runs the parinfer algorithm on the document text.
4. On each keystroke (if `formatOnType` is enabled), it runs parinfer with cursor position tracking for optimal results.
5. The server computes minimal line-level text edits and returns them to Zed.
6. If parinfer detects structural errors (unmatched parens, unclosed quotes), they appear as diagnostics in the editor.

## Credits

- [parinfer](https://shaunlebron.github.io/parinfer/) by Shaun Lebron — the original algorithm
- [parinfer-rust](https://github.com/eraserhd/parinfer-rust) by Jason Felice — the Rust implementation
- [Zed](https://zed.dev) — the editor
- [tower-lsp](https://github.com/ebkalderon/tower-lsp) — the LSP framework

## License

MIT