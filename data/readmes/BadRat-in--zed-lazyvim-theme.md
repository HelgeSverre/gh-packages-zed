# LazyVim Theme for Zed

A clean, elegant theme for Zed inspired by [LazyVim](https://www.lazyvim.org/) and [TokyoNight](https://github.com/folke/tokyonight.nvim). This theme brings the beautiful aesthetics of LazyVim's default color scheme to the Zed editor.

## Variants

This theme includes two variants:

- **LazyVim Moon** (Dark) - A dark theme with deep blue background and vibrant syntax highlighting
- **LazyVim Day** (Light) - A light theme with soft colors perfect for daytime coding

## Features

- Carefully crafted color palette based on TokyoNight
- Comprehensive syntax highlighting for all major languages
- Optimized editor UI colors (status bar, tabs, borders, etc.)
- Full terminal ANSI color support
- Git status colors (created, modified, deleted)
- Diagnostic colors (error, warning, info, hint)
- Multiple cursor colors for collaborative editing

## Installation

### Manual Installation

1. Clone or download this repository
2. Copy the `themes/lazyvim.json` file to your Zed themes directory:
   - **macOS/Linux**: `~/.config/zed/themes/`
   - **Windows**: `%APPDATA%\Zed\themes\`
3. Restart Zed or reload your configuration
4. Open Zed settings (Cmd/Ctrl + ,)
5. Search for "theme" and select either "LazyVim Moon" or "LazyVim Day"

### Via Zed Extensions (Coming Soon)

Once published to the Zed extension registry, you'll be able to install it directly from Zed:

1. Open the command palette (Cmd/Ctrl + Shift + P)
2. Type "zed: extensions"
3. Search for "LazyVim Theme"
4. Click Install

## Color Palette

### LazyVim Moon (Dark)

- Background: `#222436`
- Foreground: `#c8d3f5`
- Blue: `#82aaff`
- Cyan: `#86e1fc`
- Green: `#c3e88d`
- Yellow: `#ffc777`
- Orange: `#ff966c`
- Red: `#ff757f`
- Purple: `#c099ff`
- Magenta: `#fca7ea`

### LazyVim Day (Light)

- Background: `#e1e2e7`
- Foreground: `#3760bf`
- Blue: `#2e7de9`
- Cyan: `#007197`
- Green: `#587539`
- Yellow: `#8c6c3e`
- Orange: `#b15c00`
- Red: `#f52a65`
- Purple: `#9854f1`

## Development

This theme is structured as a Zed extension. The main theme definition is in `themes/lazyvim.json`, following the [Zed theme schema v0.2.0](https://zed.dev/schema/themes/v0.2.0.json).

### File Structure

```
zed-nvim-theme/
├── extension.toml       # Extension metadata
├── README.md           # This file
└── themes/
    └── lazyvim.json    # Theme definitions
```

## Credits

- Original TokyoNight theme by [folke](https://github.com/folke/tokyonight.nvim)
- LazyVim by [folke](https://github.com/LazyVim/LazyVim)
- Theme adapted for Zed by Ravindra

## License

GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## Contributing

Issues and pull requests are welcome! If you'd like to suggest improvements or report bugs, please open an issue on the repository.
