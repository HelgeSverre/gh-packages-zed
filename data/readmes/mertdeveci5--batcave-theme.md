# Batcave Theme

A dark theme inspired by the Batcomputer's iconic cyan glow. Deep cave darkness with tech-forward cyan accents.

![Batcave Theme](vscode/icon.png)

## Available For

- **VS Code / Cursor** - Full editor theme with syntax highlighting
- **Ghostty** - Terminal color scheme
- **Zed** - Full editor, UI, and integrated terminal theme

## Color Palette

| Role | Color | Hex |
|------|-------|-----|
| Background | ![#0a0a0f](https://via.placeholder.com/12/0a0a0f/0a0a0f.png) | `#0a0a0f` |
| Foreground | ![#c5d0e6](https://via.placeholder.com/12/c5d0e6/c5d0e6.png) | `#c5d0e6` |
| Cyan (Primary) | ![#00d9ff](https://via.placeholder.com/12/00d9ff/00d9ff.png) | `#00d9ff` |
| Teal | ![#0a8a8a](https://via.placeholder.com/12/0a8a8a/0a8a8a.png) | `#0a8a8a` |
| Green | ![#00ff88](https://via.placeholder.com/12/00ff88/00ff88.png) | `#00ff88` |
| Amber | ![#ffb000](https://via.placeholder.com/12/ffb000/ffb000.png) | `#ffb000` |
| Red | ![#ff3333](https://via.placeholder.com/12/ff3333/ff3333.png) | `#ff3333` |
| Purple | ![#a855f7](https://via.placeholder.com/12/a855f7/a855f7.png) | `#a855f7` |

## Installation

### VS Code / Cursor

**From Marketplace:**
1. Open Extensions (`Cmd+Shift+X`)
2. Search "Batcave"
3. Install
4. `Cmd+K Cmd+T` → Select **Batcave**

**Manual:**
```bash
# VS Code
cp -r vscode ~/.vscode/extensions/batcave-theme

# Cursor
cp -r vscode ~/.cursor/extensions/batcave-theme
```

### Ghostty

```bash
# Copy theme
cp ghostty/batcave ~/.config/ghostty/themes/

# Set in config (~/.config/ghostty/config)
theme = batcave
```

Restart Ghostty to apply.

### Zed

**Local theme:**

```bash
mkdir -p ~/.config/zed/themes
cp zed/themes/batcave.json ~/.config/zed/themes/
```

Then select **Batcave** with `Cmd+K Cmd+T`, or set it in
`~/.config/zed/settings.json`:

```json
{
  "theme": {
    "mode": "dark",
    "light": "One Light",
    "dark": "Batcave"
  }
}
```

Restart Zed after adding the local theme for the first time.

**Development extension:** Run `zed: install dev extension` from the command
palette and select this repository's `zed` directory.

## Links

- [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=mertdeveci.batcave-theme)

## License

MIT
