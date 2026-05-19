# Arc Dark Theme for Zed

A dark theme for [Zed](https://zed.dev) based on the [IntelliJ Arc Dark Theme](https://gitlab.com/zlamalp/arc-theme-idea) by Pavel Zlámal.

| Header | Header |
|--------|--------|
| <img width="1496" height="932" alt="image" src="https://github.com/user-attachments/assets/d50ecdbb-8b9b-416e-a7fa-9622654e46fa" /> | <img width="1496" height="933" alt="image" src="https://github.com/user-attachments/assets/08ae4095-9652-4fe4-a02a-31ccec1ab5f0" /> | 

### Manual Installation

1. Copy `arc-dark.json` to your Zed themes directory:

```bash
mkdir -p ~/.config/zed/themes
cp themes/arc-dark.json ~/.config/zed/themes/
```

2. Open Zed settings (Cmd+, on macOS, Ctrl+, on Linux)

3. Select "Arc Dark" from the theme selector, or add to your settings:

```json
{
  "theme": "Arc Dark"
}
```

## Color Palette

- **Backgrounds**: `#383c4a`, `#404651`, `#474c5b`
- **Borders**: `#2b2e39`
- **Accent/Focus**: `#2679db` (Arc blue)
- **Text**: `#d3dae3`, `#ffffff`
- **Muted**: `#9ba2ab`
- **Keywords**: `#ffa833` (orange)
- **Strings**: `#c6ffa8` (green)
- **Comments**: `#a9a9a9` (gray)
- **Functions**: `#ffcf69` (yellow)
- **Types**: `#a8ebff` (cyan)

## Credits

- Original Arc Theme by horst3180
- IntelliJ Arc Dark Theme by Pavel Zlámal
- Adapted for Zed by wcygan ([zed-industries/extensions/pull/3873](https://github.com/zed-industries/extensions/pull/3873))
