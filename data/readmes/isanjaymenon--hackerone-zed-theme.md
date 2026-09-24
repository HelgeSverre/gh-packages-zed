# HackerOne Zed Theme

First release of the HackerOne Theme extension for [Zed](https://zed.dev).

Dark and light themes in HackerOne’s pink, blue, and mint palette, ported from the official [HackerOne VS Code Theme](https://github.com/Hacker0x01/HackerOne-VS-Code-Theme).

> [!IMPORTANT]
> This is an unofficial port. It is not published or endorsed by HackerOne.

> [!NOTE]
> First public release (`v0.1.0`). Theme names in Zed are **HackerOne Dark** and **HackerOne Light**.

## Themes

- **HackerOne Dark** — high-contrast dark theme adapted from the official HackerOne VS Code theme
- **HackerOne Light** — light variant based on the HackerOne Design System (H1/U1)

Both variants include syntax highlighting, editor chrome, tabs, panels, status bar, and terminal colors. Zed can switch between them with system appearance.

## Install

### Extension gallery

> [!WARNING]
> The extension may not be in the Zed gallery yet. Until the registry PR is merged, install from this tag with `zed: install dev extension`.

Once the extension is listed:

1. Open Extensions (`cmd-shift-x` / `ctrl-shift-x`)
2. Search for **HackerOne Theme**
3. Install

### From this release

```sh
git clone https://github.com/isanjaymenon/hackerone-zed-theme.git
cd hackerone-zed-theme
git checkout v0.1.0
```

In Zed: Command Palette → `zed: install dev extension` → select the repo directory.

## Activate

Theme selector: `cmd-k cmd-t` / `ctrl-k ctrl-t`

Or in `settings.json`:

```json
{
  "theme": "HackerOne Dark"
}
```

Follow the system theme:

```json
{
  "theme": {
    "mode": "system",
    "dark": "HackerOne Dark",
    "light": "HackerOne Light"
  }
}
```

## How it was ported

The first conversion used [Zed’s theme importer](https://zed.dev/blog/user-themes-now-in-preview) on the official [HackerOne VS Code Theme](https://github.com/Hacker0x01/HackerOne-VS-Code-Theme). After import, UI tokens, syntax coverage, and dark/light contrast were edited by hand so the result fits Zed’s theme schema instead of a raw VS Code dump.

## Attribution

This is an unofficial Zed port. Colors come from the [HackerOne VS Code Theme](https://github.com/Hacker0x01/HackerOne-VS-Code-Theme) by [@Hacker0x01](https://github.com/Hacker0x01), then mapped and refined for Zed.

- **Original design:** [Brandon Morgan](https://brandonmorgan.design/)
- **Design system:** [HackerOne Design System (H1/U1)](https://brandonmorgan.design/hackerone-design-system.html)
- **Zed port:** [Sanjaymenon](https://github.com/isanjaymenon)

Not affiliated with or endorsed by HackerOne.

## License

[MIT License](LICENSE)

- Original theme: Copyright © 2022 HackerOne
- Zed conversion: Copyright © 2026 Sanjaymenon
