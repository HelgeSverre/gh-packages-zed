# Vesper Blur

A blur/transparency variant of the [Vesper](https://github.com/raunofreiberg/vesper) dark theme for [Zed](https://zed.dev).

Peppermint and orange flavored dark theme with window blur effects at 72% opacity.

## Installation

### From Extensions

1. Open Zed
2. Open the Extensions panel (`cmd+shift+x`)
3. Search for "Vesper Blur"
4. Click Install

### Development Installation

1. Clone this repository
2. Open Zed
3. Open the Extensions panel (`cmd+shift+x`)
4. Click "Install Dev Extension"
5. Select the `vesper-blur` folder

## Platform Compatibility

The blur effect may not work on all operating systems. This is a limitation of Zed's window transparency implementation, not the theme itself.

**Known working:**
- macOS (with transparency enabled)

**May have issues:**
- Linux (depends on compositor)
- Windows (depends on system settings)

## Color Palette

Based on the original Vesper color scheme:

| Element | Color |
|---------|-------|
| Background | `#101010` |
| Foreground | `#FFFFFF` |
| Strings (Mint) | `#99FFE4` |
| Functions (Orange) | `#FFC799` |
| Keywords | `#A0A0A0` |
| Comments | `#8b8b8b` |
| Error | `#FF8080` |

## Credits

- Original [Vesper](https://github.com/raunofreiberg/vesper) theme by [Rauno Freiberg](https://rauno.me)
- [Vesper for Zed](https://github.com/vyorkin/vesper-zed) by Vasiliy Yorkin
- Blur implementation inspired by [Catppuccin Blur](https://github.com/jenslys/zed-catppuccin-blur)

## License

MIT License - see [LICENSE](LICENSE) file for details.
