# SurpassOne Theme for Zed

A flat, monochrome color theme built on coral tonal hierarchy and grayscale. No rainbow — just shades of coral and gray. Dark and Light variants included.

This is the [Zed](https://zed.dev) port of the [SurpassOne Theme for VS Code / Cursor](https://github.com/aitit-inc/vscode-surpassone-theme).

## Design principles

- **One color** — the only hue used for syntax is coral; everything else is built from shades of gray.
- **Flat** — borders and shadows are minimized; regions are separated by background tone alone.
- **Readability** — fewer colors, more tonal steps to keep code legible.

## Installation

Open the command palette, run `zed: extensions`, search for **SurpassOne**, and install. Then select the theme via `theme selector: toggle` (or Settings → Theme) and pick **SurpassOne Dark** or **SurpassOne Light**.

## Local development

To work on the theme without publishing:

1. Run `zed: install dev extension` from the command palette.
2. Select this repository's directory.
3. Edit `themes/surpassone.json`; Zed reloads the theme on save.

Run `zed --foreground` for verbose logs, or `zed: open log` to troubleshoot.

## License

[MIT](LICENSE)
