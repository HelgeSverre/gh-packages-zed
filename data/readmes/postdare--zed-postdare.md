# Postdare for Zed

**Postdare Light** and **Postdare Dark** — a warm, low-contrast theme family for the [Zed](https://zed.dev) editor.

## Installation

1. Open the command palette with `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Linux/Windows).
2. Run `zed: extensions` and search for **Postdare**.
3. Click **Install**.

Then select the theme:

- Press `Cmd+K Cmd+T` (macOS) / `Ctrl+K Ctrl+T` (Linux/Windows), or run `theme selector` from the command palette.
- Pick **Postdare** — the light and dark variants are grouped under a single family.

## Themes

**Postdare** is a single theme family that contains a light and a dark variant. Keeping both variants
in one family lets Zed switch between them automatically when `theme.mode` is set to `system`.

| Variant | Appearance |
| --- | --- |
| Postdare Light | Light |
| Postdare Dark | Dark |

Both variants are defined in [`themes/postdare.json`](./themes/postdare.json).

## Development

This repository is a Zed theme extension. To try local changes, install it as a dev extension:

1. Open the command palette and run `zed: install dev extension`.
2. Select the root of this repository (the directory containing `extension.toml`).

Zed will report the upstream extension as "Overridden by dev extension" if you also have the published version installed.

## License

[MIT](./LICENSE)
