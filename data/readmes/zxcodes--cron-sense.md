# Cron Sense

Translate cron-like schedules into human-readable English inside [Zed](https://zed.dev).

**Extension ID:** `cron-sense-lsp`  
**Marketplace:** [zed.dev/extensions/cron-sense-lsp](https://zed.dev/extensions/cron-sense-lsp)

**Inspired by** the VS Code extension
**[Cron Explained](https://github.com/tumido/cron-explained)** by
[Tom Coufal (@tumido)](https://github.com/tumido)
([VS Marketplace](https://marketplace.visualstudio.com/items?itemName=tumido.cron-explained),
[Open VSX](https://open-vsx.org/extension/tumido/cron-explained)).

This is an independent, from-scratch reimplementation for Zed. It is **not** a
fork of the original source and is not affiliated with the original author beyond
credit for the concept and UX.

## Install

### From the Zed extension marketplace

1. Open the [Cron Sense extension page](https://zed.dev/extensions/cron-sense-lsp), or in Zed open **Extensions** (`zed: extensions` from the command palette) and search for **Cron Sense**.
2. Click **Install** (or use [Install in Zed](zed://extension/cron-sense-lsp) from the marketplace page).

On first use, the extension installs the language server from npm as
[`cron-sense-lsp`](https://www.npmjs.com/package/cron-sense-lsp). That package
includes the server script and its dependencies (`cronstrue`,
`vscode-languageserver`, …).

### Dev extension (local development)

1. Clone or open this repository.
2. In Zed: **Extensions** → **Install Dev Extension…**
3. Select the `cron-sense` directory.

## Features

### Hover tooltips

Hover a cron expression in supported languages and get a plain-English explanation powered by [`cronstrue`](https://www.npmjs.com/package/cronstrue).

Supported language contexts include Shell Script, YAML, TOML, JSON, Dockerfile, JavaScript/TypeScript, Python, Ruby, Go, Rust, Markdown, and Plain Text.

### Code action: insert as comment

Open the code actions menu on a cron expression (default: `cmd-.` / `ctrl-.`) and choose **Insert cron explanation** to append a comment on that line. Running it again replaces the previous explanation (no stacked comments).

## Settings

Optional LSP settings in your Zed `settings.json`:

```json
{
  "lsp": {
    "cron-sense-lsp": {
      "settings": {
        "use24HourTimeFormat": true,
        "verbose": true,
        "dayOfWeekStartIndexZero": true,
        "monthStartIndexZero": false,
        "locale": "en"
      }
    }
  }
}
```

| Setting                   | Description                                                     | Default |
| ------------------------- | --------------------------------------------------------------- | ------- |
| `use24HourTimeFormat`     | Use 24-hour clock in descriptions                               | `true`  |
| `verbose`                 | Prefer verbose descriptions                                     | `true`  |
| `dayOfWeekStartIndexZero` | Day-of-week `1` = Monday (`true`) or Sunday (`false`, e.g. AWS) | `true`  |
| `monthStartIndexZero`     | January as `0` vs `1`                                           | `false` |
| `locale`                  | Force a cronstrue locale                                        | (unset) |

## How it works

| Piece            | Implementation                                                 |
| ---------------- | -------------------------------------------------------------- |
| Extension (Wasm) | Resolves Node, installs `cron-sense-lsp` from npm via Zed APIs |
| Language server  | Node package `cron-sense-lsp` (`server/server.cjs` + deps)     |

The language server is **not** embedded in the extension package (Zed publishing
requirement). Source lives in `server/` and is published to the public npm
registry.

## Development

Requirements: Rust (with `wasm32-wasip2` via rustup), Node, Zed.

```sh
# Typecheck / test the extension crate
cargo test --lib
cargo check --target wasm32-wasip2

# Smoke-test the language server locally
cd server && npm install && npm test
# or speak LSP over stdio:
npm start
```

### Publishing the language server (npm)

```sh
cd server
npm login          # once
npm version patch  # or set version in package.json
npm publish --access public
```

Keep `server/package.json` `version` aligned with the extension when cutting a
release that depends on new server behavior.

### Cutting an extension release

1. Bump `version` in `extension.toml` and `Cargo.toml` (keep them equal).
2. Ensure the matching `cron-sense-lsp` version is on npm (or rely on latest).
3. Tag `vX.Y.Z` on this repo.
4. Open/update a PR on `zed-industries/extensions` with submodule
   `extensions/cron-sense-lsp` and matching `version` in `extensions.toml`.

## Credits & acknowledgements

### Inspiration

**[Cron Explained](https://github.com/tumido/cron-explained)** for VS Code / Open VSX  
Author: **Tom Coufal ([@tumido](https://github.com/tumido))**  
License: [GPL-3.0-or-later](https://github.com/tumido/cron-explained/blob/master/LICENSE)

Please support and star the original if you find the concept useful.

### Libraries

- Translations: [`cronstrue`](https://github.com/bradymholt/cRonstrue) by Brady Holt
- LSP stack: [`vscode-languageserver`](https://github.com/microsoft/vscode-languageserver-node)

## License

This repository is licensed under the [MIT License](./LICENSE).

That applies to **this** project’s code only. The original
[tumido/cron-explained](https://github.com/tumido/cron-explained) project remains
GPL-3.0-or-later under its own license.
