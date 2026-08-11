# Artisan Theme

A clean, Laravel-inspired light theme for [Zed](https://zed.dev), VS Code and
[Ghostty](https://ghostty.org).

## Features

- Warm gray background (#F3F3F3) that's easy on the eyes
- Laravel red (#CA2606) accent for keywords, variables, and properties
- Blue (#2176D3) for functions, types, and namespaces
- Green (#007A4C) for strings
- Berry pink (#B23473) for numbers, booleans and constants
- Minimal borders for a flat, modern look

## Installation

**Zed** — search for "Artisan Theme" in the extension browser (`cmd+shift+x`).

**VS Code** — search for "Artisan Theme" in the Extensions view (`cmd+shift+x`).

**Ghostty** — copy `ghostty/artisan` into `~/.config/ghostty/themes/` and set
`theme = artisan` in your config.

## Development

Every color lives in [`src/palette.js`](src/palette.js). The theme files are
generated, so edit the palette and rebuild rather than touching them directly:

```sh
npm run build
```

That regenerates all three targets from the palette:

| Generated file | Editor |
| --- | --- |
| `themes/laravel-theme-color-theme.json` | VS Code |
| `zed/themes/artisan-theme.json` | Zed |
| `ghostty/artisan` | Ghostty |

Generated output is committed so the extensions work from a plain clone.

## Releasing

Bump the version in **both** `package.json` and `zed/extension.toml`, then push a
matching tag:

```sh
git tag v0.2.0 && git push origin v0.2.0
```

[The release workflow](.github/workflows/release.yml) verifies the tag matches
both manifests, publishes to the VS Code Marketplace, attaches the `.vsix` to a
GitHub Release, and opens a version-bump PR against
[zed-industries/extensions](https://github.com/zed-industries/extensions).

The run pauses on the `release` environment until it is approved in the Actions
tab, and only `v*` tags can reach it.

It needs two repository secrets:

- `VSCE_PAT` — an Azure DevOps token with **Marketplace → Manage** scope
- `ZED_PR_TOKEN` — a GitHub token with `repo` + `workflow` scope, used to fork
  the Zed registry and open the PR

## Screenshots

<!-- Add screenshots here -->

## License

MIT
