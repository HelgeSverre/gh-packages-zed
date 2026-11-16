# DynoTable for Zed

This extension connects Zed to [DynoTable](https://dynotable.com), the DynamoDB client. DynoTable
gives the language features for your DynoTable SQL and PartiQL files.

## What works

- Completion, diagnostics, hover and formatting.
- Rename of table aliases.
- Inlay hints, when you switch them on: set `"inlay_hints": {"enabled": true}` in your Zed
  settings.
- DynoTable SQL files: `.dtsql` and `.dynotable.sql`.
- PartiQL files: `.partiql`.

The extension does not attach to plain `.sql` files.

## What does not work

- There is no results grid. Run your queries in the DynoTable app or in the DynoTable extension for
  VS Code.
- OpenSearch files (`.opensearch`) are not supported yet.

## Requirements

- macOS on Apple silicon, Linux x64 or Windows x64. `dynotable-lsp` has no binary for other
  platforms yet.
- DynoTable 1.20.0 or later, with the Editor integration switched on.
- `dynotable-lsp` on your `PATH`, or nothing: when `dynotable-lsp` is not on your `PATH`, the
  extension installs the latest `dynotable-cli` from npm.

When DynoTable is not running, a start of the language server starts DynoTable with no
window.

## Pick a profile

Put a `.dynotable.json` file in the root of your project:

```json
{"profile": "dev"}
```

The value is a profile id or slug. With no `.dynotable.json`, DynoTable uses your profile when you
have exactly one.

## After you quit DynoTable

Zed shows the language server as stopped, and Zed does not start it again. To get the features
back:

1. Start DynoTable.
2. Run "editor: restart language server".

## License

MIT. The highlighting queries in `languages/*/highlights.scm` are copied from
[zed-extensions/sql](https://github.com/zed-extensions/sql) (MIT, Copyright (c) 2024 evrsen).
