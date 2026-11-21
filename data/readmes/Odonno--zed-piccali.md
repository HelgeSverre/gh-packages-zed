# zed-piccali

[Piccali](https://github.com/Odonno/piccali-cli) support for [Zed](https://zed.dev): Gherkin (`.feature`) syntax highlighting, lint warnings, and format-on-save.

Published in the Zed extension registry as **`piccali`**.

## What it does

- **Syntax highlighting** for Gherkin via [tree-sitter-gherkin](https://github.com/binhtddev/tree-sitter-gherkin), plus outline (Feature/Rule/Scenario tree) and auto-indent rules that match `piccali-cli format`.
- **Warnings in the editor** from `piccali-cli check` (swallowed steps, misspelled keywords) via the `piccali-cli lsp` language server.
- **Format on save** via the same language server. Enable it:

  ```json
  "languages": {
    "Gherkin": {
      "formatter": "language_server",
      "format_on_save": "on"
    }
  }
  ```

Formatting style follows your `.editorconfig` (`[*.feature]` sections), exactly like the CLI.

## The language server binary

The extension launches `piccali-cli lsp` and finds the binary in this order:

1. An explicit override in your settings:

   ```json
   "lsp": {
     "piccali": { "binary": { "path": "/path/to/piccali-cli" } }
   }
   ```

2. An existing install on your `PATH` (`piccali-cli` or `piccali` — mise/cargo/npm installs are picked up automatically).
3. Otherwise it downloads the latest release from [piccali-cli releases](https://github.com/Odonno/piccali-cli/releases) and caches it inside the extension's data directory.

Requires a piccali-cli version that ships the `lsp` subcommand.

## Development

Install as a dev extension: Zed command palette → `zed: install dev extension` → select this repository's root. Rust must be installed via [rustup](https://rustup.rs) (Zed compiles the extension to WASM itself).

Grammar updates: bump `rev` under `[grammars.gherkin]` in `extension.toml`.

## License

MIT
