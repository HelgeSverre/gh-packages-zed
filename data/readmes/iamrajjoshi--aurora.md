# Aurora

A dark theme for [Zed](https://zed.dev) with blue, green, and cyan tones inspired by the northern lights.

## Preview

| Color | Hex | Usage |
|-------|-----|-------|
| Blue | `#49baff` | Keywords, labels |
| Green | `#50fb7b` | Functions, attributes |
| Cyan | `#8be9fd` | Types, properties, parameters |
| Yellow | `#f0fb8c` | Strings |
| Magenta | `#fc4cb4` | Constants, numbers, booleans |
| Orange | `#ffb86c` | Variables, modules |
| Background | `#131318` | Editor background |
| Foreground | `#ebece6` | Default text |

## Installation

### From Zed Extensions (Coming Soon)

1. Open Zed
2. Open the extensions panel (`Cmd+Shift+X`)
3. Search for "Aurora"
4. Click Install

### Manual Installation

1. Clone this repo:
   ```bash
   git clone https://github.com/rajjoshi/aurora.git ~/.config/zed/extensions/aurora
   ```

2. Or copy the theme file directly:
   ```bash
   mkdir -p ~/.config/zed/themes
   cp themes/aurora.json ~/.config/zed/themes/
   ```

3. Open Zed settings (`Cmd+,`) and set:
   ```json
   {
     "theme": "Aurora"
   }
   ```

## Recommended Font

This theme pairs well with [JetBrains Mono](https://www.jetbrains.com/lp/mono/):

```bash
brew install --cask font-jetbrains-mono
```

Or for the Nerd Font version (with icons):

```bash
brew install --cask font-jetbrains-mono-nerd-font
```

## Color Palette

Based on a custom terminal color scheme with these ANSI colors:

```
Black:   #000000 / #555555
Red:     #fc4346
Green:   #50fb7b
Yellow:  #f0fb8c
Blue:    #49baff
Magenta: #fc4cb4
Cyan:    #8be9fd
White:   #ededec
```

## License

MIT
