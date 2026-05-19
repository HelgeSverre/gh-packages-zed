# Freemarker Magnolia extension for Zed

Square-bracket-first FreeMarker support for Magnolia CMS projects in Zed.

## Features

- Tree-sitter syntax highlighting for FreeMarker (`.ftl`), optimized for square-bracket syntax:
  - directives: `[#if]`, `[/#if]`, `[@cms.component /]`
  - interpolation: `${...}` and `[= ... ]`
  - comments: `[#-- ... --]` and `<#-- ... -->`
- Magnolia-aware language server:
  - cmd-click / go-to-definition for:
    - `[#include "..."]` and `[#import "..."]`
    - Magnolia IDs such as `my-module:components/teaser` and `my-module:pages/home`
    - YAML `templateScript` paths
  - hover with resolved target path
  - completions for include/import resources and Magnolia IDs
  - mixed syntax diagnostic (square + angle tags in one template)

## Repository layout

- `extension.toml`, `Cargo.toml`, `src/lib.rs`: Zed extension host (WASM)
- `languages/freemarker/*`: Zed language config and tree-sitter queries
- `grammars/tree-sitter-freemarker`: grammar source + corpus tests
- `server`: Rust language server (`freemarker-magnolia-lsp`)
- `fixtures`: Magnolia sample workspaces (light modules + Maven resources)

## Local development

1. Build the server binary:

```bash
cargo build -p freemarker-magnolia-lsp --release
```

2. Install as a dev extension in Zed:

- Run `zed: install dev extension`
- Select this repository root.

3. Open a Magnolia project and verify:

- `.ftl` files detected as `Freemarker`
- cmd-click on include/import paths and Magnolia IDs

## Configuration (LSP settings)

```json
{
  "lsp": {
    "freemarker_magnolia": {
      "settings": {
        "definition_preference": "script_first",
        "magnolia_roots": [],
        "syntax_mode": "square_first_dual",
        "index_excludes": ["**/.git/**", "**/node_modules/**", "**/target/**"],
        "enable_mixed_syntax_diagnostic": true
      }
    }
  }
}
```

Optional explicit binary override:

```json
{
  "lsp": {
    "freemarker_magnolia": {
      "binary": {
        "path": "/absolute/path/to/freemarker-magnolia-lsp",
        "arguments": []
      }
    }
  }
}
```

## Release assets

The extension expects release assets named:

- `freemarker-magnolia-lsp-macos-aarch64.zip`
- `freemarker-magnolia-lsp-macos-x86_64.zip`
- `freemarker-magnolia-lsp-linux-aarch64.zip`
- `freemarker-magnolia-lsp-linux-x86_64.zip`
- `freemarker-magnolia-lsp-windows-aarch64.zip`
- `freemarker-magnolia-lsp-windows-x86_64.zip`

Each zip must contain the server executable at archive root.
