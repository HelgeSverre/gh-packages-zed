# After Sunset Theme for Zed

<p align="center">
    <img src="https://raw.githubusercontent.com/exler/after-sunset-zed/main/assets/banner.png" width="182">
    <p align="center">Minimal dark syntax theme for Zed</p>
    <p align="center">
      <img alt="MIT License" src="https://img.shields.io/github/license/exler/after-sunset-zed?color=yellow">
    </p>
</p>

A dark theme for [Zed](https://zed.dev/) with warm sunset-inspired colors.

![After Sunset Theme Preview](https://raw.githubusercontent.com/exler/after-sunset-zed/main/assets/screenshot-theme.png)

## Installation

1. Open Zed's configuration directory:
   - **macOS/Linux**: `~/.config/zed/`
   - **Windows**: `%APPDATA%\Zed\`

2. Create a `themes` directory if it doesn't exist:
   ```bash
   mkdir -p ~/.config/zed/themes
   ```

3. Copy `after-sunset.json` to the themes directory:
   ```bash
   cp after-sunset.json ~/.config/zed/themes/
   ```

4. Open Zed and select the theme:
   - Open the command palette (`Cmd+Shift+P` on macOS, `Ctrl+Shift+P` on Linux/Windows)
   - Type "theme selector: toggle"
   - Search for "After Sunset" and select it

## Color Palette

The theme uses a carefully selected color palette:

- **Background**: `#1c1c1c` - Deep charcoal
- **Foreground**: `#d4d4d4` - Light gray
- **Accent**: `#e5c100` - Golden yellow (primary highlight color)
- **Strings**: `#19f9d8` - Bright cyan
- **Keywords**: `#FF75B5` - Soft pink
- **Functions**: `#E5C100` - Golden yellow
- **Types**: `#19f9d8` - Cyan
- **Constants**: `#FFB86C` - Warm orange
- **Comments**: `#676B79` - Muted gray (italic)

## References

- [After Sunset VS Code Theme](https://github.com/exler/after-sunset-vscode) - Original theme for VSCode from which this Zed theme is adapted.
- [Zed Documentation on Themes](https://zed.dev/docs/extensions/themes)
- [Zed Theme Builder](https://zed.dev/theme-builder)

## License

`after-sunset-zed` is under the terms of the [MIT License](https://www.tldrlegal.com/l/mit), following all clarifications stated in the [license file](LICENSE).
