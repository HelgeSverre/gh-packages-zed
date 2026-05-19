# ForgeZed — ForgeScript for Zed

Language support for [ForgeScript](https://github.com/EdexLabs/ForgeLSP) in the [Zed](https://zed.dev) editor.

## Features

- **Syntax highlighting** via Tree-sitter (`.forge` files)
- **ForgeScript in JS/TS** — highlights ForgeScript inside template literals tagged `code: \`...\`` or `forge\`...\``
- **Language Server** — completions, hover docs, signature help, go-to-definition via ForgeLSP
- **Auto-download** of the ForgeLSP binary from GitHub Releases
- **`forgeconfig.json`** support — extensions, custom functions, custom colors

## Installation

Install from the Zed Extensions panel (`zed: extensions`) — search for **ForgeScript**.

Or install from source:

```bash
git clone https://github.com/EdexLabs/ForgeLSP
cd forgezed
cargo build --target wasm32-wasi --release
```

## Configuration

Create a `forgeconfig.json` in your workspace root:

```json
{
  "$schema": "https://raw.githubusercontent.com/EdexLabs/ForgeLSP/main/forgeconfig.schema.json",
  "extensions": [
    "github:tryforge/forgescript#dev"
  ],
  "custom_functions_path": "./my-functions"
}
```

### forgeconfig.json fields

| Field | Type | Description |
|---|---|---|
| `extensions` | `string[]` \| `object[]` | GitHub shorthands (`github:user/repo#branch`) or explicit metadata URL objects |
| `custom_functions_path` | `string` \| `string[]` | Path(s) to folders with custom function definitions |
| `custom_functions_json` | `string` | Path to a custom functions JSON file |
| `custom_colors` | `string[]` | Hex color strings for semantic token coloring |

### Custom Binary

Set the `FORGELSP_BINARY` environment variable to point to a local ForgeLSP binary:

```sh
export FORGELSP_BINARY=/path/to/ForgeLSP
```

## ForgeScript in JS/TS Files

ForgeScript syntax is highlighted inside template literals matching these patterns:

```js
// Object property named "code"
const cmd = { code: `$sendMessage[$channelId;Hello!]` };

// Variable named "code"
const code = `$ban[$userId;Reason]`;

// Tagged template literal
forge`$kick[$userId]`;
```

## Development

### Project Layout

```
forgezed/
├── extension.toml              # Zed extension manifest
├── Cargo.toml                  # Rust crate
├── src/
│   └── lib.rs                  # WASM extension: binary lifecycle + LSP init
├── syntaxes/
│   └── grammar.js              # Tree-sitter grammar (source, for reference)
├── languages/
│   ├── forge/
│   │   └── queries/
│   │       ├── highlights.scm  # Syntax token mapping
│   │       ├── injections.scm  # $djsEval[...] → JS embedding
│   │       ├── folds.scm       # Foldable regions
│   │       └── indents.scm     # Auto-indent rules
│   ├── javascript/
│   │   └── queries/
│   │       └── injections.scm  # ForgeScript in JS template literals
│   └── typescript/
│       └── queries/
│           └── injections.scm  # ForgeScript in TS template literals
└── README.md
```

### tree-sitter-forge

The grammar must be compiled and published to a separate repository:
`https://github.com/EdexLabs/tree-sitter-forge`

Then update `extension.toml` with the correct `rev`:

```toml
[grammars.forge]
repository = "https://github.com/EdexLabs/tree-sitter-forge"
rev = "<commit-sha-or-tag>"
```

## License

GPL-3.0 — same as ForgeLSP.
