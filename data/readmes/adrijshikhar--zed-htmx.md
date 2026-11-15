# Zed HTMX Extension

[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](LICENSE)

[HTMX](https://htmx.org/) language server extension for [Zed](https://zed.dev), powered by [`adrijshikhar/htmx-analyzer`](https://github.com/adrijshikhar/htmx-analyzer).

Provides intelligent completion, rich hover documentation, static analysis diagnostics, and quick-fixes for HTMX 2.0 and HTMX 1.x in HTML templates.

---

## Features

- **HTMX 2.0 Native Support:** Full schema coverage for all 33 HTMX 2.0 attributes, including `hx-on:<event>` inline event handlers.
- **Diagnostics & Static Analysis:** Real-time diagnostics for deprecated attributes (`HTMX001`), invalid swap styles (`HTMX002`), malformed trigger durations (`HTMX003`), and unresolvable DOM target IDs (`HTMX004`).
- **Quick-Fix Code Actions:** Automated migration actions upgrading deprecated HTMX 1.x features (such as `hx-ws` and `hx-sse`) to modern HTMX 2.0 extensions (`hx-ext="ws"` / `hx-ext="sse"`).
- **Attribute Autocompletion:** Smart autocompletions for all core HTMX attributes (`hx-get`, `hx-post`, `hx-target`, `hx-swap`, `hx-trigger`, `hx-on:*`, `hx-ext`, etc.) and their `data-hx-*` equivalents.
- **Attribute Value Suggestions:** Contextual values for swap styles (`innerHTML`, `outerHTML`, `textContent`), target selectors (`#id`, `closest`, `find`, `this`), trigger events, and modifiers (`transition:true`, `swap:`, `settle:`).
- **Hover Documentation:** Rich Markdown documentation, attribute summaries, parameter details, and official HTMX documentation links on hover.
- **Zero Configuration:** Automatically downloads the appropriate prebuilt `htmx-analyzer` binary for your operating system and architecture on first use.
- **Seamless Coexistence:** Runs concurrently alongside Zed's built-in HTML language server, Emmet, and Tailwind CSS.
- **Offline / Custom Binary Fallback:** Detects `htmx-analyzer` (or `htmx-lsp`) on your system `PATH` if installed locally.

---

## Supported Platforms

Prebuilt binaries are automatically fetched from GitHub releases for:
- **macOS:** Apple Silicon (`arm64`) and Intel (`x86_64`)
- **Linux:** `x86_64` musl (for Linux `arm64`, install `htmx-analyzer` on your `PATH`)
- **Windows:** `x86_64`

---

## Configuration

The extension works out of the box with zero configuration required.

If you want to customize the language server (e.g., provide a custom binary path, custom arguments, or change log levels), you can configure it in your Zed `settings.json`:

```json
{
  "lsp": {
    "htmx-lsp": {
      "binary": {
        "path": "/usr/local/bin/htmx-analyzer",
        "arguments": ["--verbose"]
      }
    }
  }
}
```

---

## Development

### Prerequisites

- [Rust](https://rustup.rs/) (edition 2021)
- `wasm32-wasip1` target:
  ```bash
  rustup target add wasm32-wasip1
  ```

### Building the Extension

Using `wasm-tools` (Zed 0.130+ component format):
```bash
cargo build --target wasm32-wasip1 --release
wasm-tools component new ./target/wasm32-wasip1/release/zed_htmx.wasm \
  --adapt wasi_snapshot_preview1=wasi_snapshot_preview1.reactor.wasm \
  -o extension.wasm
```

Alternatively, you can load the extension directly into Zed without manual wasm conversion:
```bash
zed --install-dev /path/to/zed-htmx
```

### Local Dev Installation in Zed

1. Open Zed.
2. Open the Command Palette (`Cmd+Shift+P` on macOS, `Ctrl+Shift+P` on Linux/Windows).
3. Run `zed: install dev extension`.
4. Select the `zed-htmx` repository directory.

---

## Credits

- Language server implementation: [adrijshikhar/htmx-analyzer](https://github.com/adrijshikhar/htmx-analyzer).
- Created for the [Zed](https://zed.dev) editor community.

---

## License

This project is licensed under the [Apache-2.0 License](LICENSE).
