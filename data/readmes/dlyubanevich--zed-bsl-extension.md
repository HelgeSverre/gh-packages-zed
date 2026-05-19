# zed-bsl-extension
(1C) BSL extension for Zed editor

---

**Tree-sitter** - https://github.com/alkoleft/tree-sitter-bsl

**LSP** - https://github.com/itrous/bsl-analyzer

## LSP configuration

The extension downloads and runs `bsl-analyzer` automatically.

To configure the language server, add settings to Zed's `settings.json` under
the `lsp.bsl.settings` key:

```json
{
  "lsp": {
    "bsl": {
      "settings": {}
    }
  }
}
```

The extension passes the contents of `lsp.bsl.settings` to `bsl-analyzer` as the
`bsl` workspace configuration section.
