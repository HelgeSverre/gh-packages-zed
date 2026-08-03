# Dark Dracula for Zed

A darker Dracula theme for Zed with deep backgrounds, balanced contrast
and refined syntax highlighting.

![Dark Dracula in the Zed editor](assets/screenshot.png)

## Installation

### From the Zed extension catalog

Coming soon. The theme is not published in the Zed extension catalog
yet. Once published, it will be installable directly from the Extensions
view in Zed.

### As a dev extension

1. Clone this repository:

   ```bash
   git clone https://github.com/everton-dgn/zed-dark-dracula.git
   ```

2. In Zed, open the command palette and run `zed: install dev extension`.
3. Select the cloned directory.
4. Open the theme selector from the command palette
   (`theme selector: toggle`) and pick **Dark Dracula**.

## Recommended icon theme

The screenshot above uses **JetBrains Icons Dark**, from the
[JetBrains Icons](https://github.com/ziishaned/zed-jetbrains-icons)
extension. It is optional, but its muted colors sit well against the
darker background.

1. Open the Extensions view in Zed and install **JetBrains Icons**.
2. Run `icon theme selector: toggle` from the command palette and pick
   **JetBrains Icons Dark**, or set it directly in `settings.json`:

   ```json
   {
     "icon_theme": "JetBrains Icons Dark"
   }
   ```

## Project structure

```text
zed-dark-dracula/
├── extension.toml
├── themes/
│   └── dark-dracula.json
├── assets/
│   └── screenshot.png
├── README.md
├── LICENSE
└── THIRD_PARTY_NOTICES.md
```

## License

Released under the MIT License. See [LICENSE](LICENSE).

This theme builds on work by third parties; see
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for the required
attributions. It is not an official Dracula theme.
