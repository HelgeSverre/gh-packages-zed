# CharmMono Theme for Zed

[![Zed Extension](https://img.shields.io/badge/-Zed_Extension-blue?style=flat&logo=zedindustries&logoColor=%23FFFFFF&logoSize=auto&labelColor=%23111111&color=%23084CCF)](https://zed.dev/extensions/charm-mono)

A beautiful dark theme for [Zed](https://zed.dev) with purple accents and excellent syntax highlighting.

## Features

- **Dark Mode**: Carefully crafted dark theme with a soothing color palette
- **Purple Accents**: Eye-catching purple highlights throughout the UI
- **Optimized Syntax Highlighting**: Distinct colors for different code elements
- **Terminal Support**: Full ANSI color support for terminal usage

## Screenshot

![CharmMono Theme Screenshot](screenshot.png)

*Note: Add your screenshot here showing the theme in action*

## Installation

1. Open Zed editor
2. Open the Extensions view (`cmd+shift+x`)
3. Search for "CharmMono"
4. Click Install

## Usage

After installation, you can activate the theme:

1. Open Command Palette (`cmd+shift+p`)
2. Type "theme"
3. Select "CharmMono Dark"

Or configure it in your settings file (`~/.config/zed/settings.json`):

```json
{
  "theme": "CharmMono Dark"
}
```

## Color Palette

The theme uses a carefully selected color palette:

- **Background**: `#171f2b` - Deep blue-gray for comfortable reading
- **Surface**: `#10151d` - Darker blue-gray for contrast
- **Accent**: `#a87ffb` - Vibrant purple for highlights
- **Syntax Colors**:
  - Keywords: `#fd8da3` (Pink)
  - Strings: `#77d5a3` (Green)
  - Functions: `#708fff` (Blue)
  - Numbers: `#ffa23e` (Orange)
  - Variables: `#ffd395` (Light orange)
  - Comments: `#7f8d9f` (Muted gray)

## Publishing

To publish this extension to the Zed extension registry:

1. Fork the [zed-industries/extensions](https://github.com/zed-industries/extensions) repository
2. Add this extension as a submodule in your fork
3. Update the `extensions.toml` file
4. Open a PR to the official repository

For detailed instructions, see the [DEVELOPMENT](./DEVELOPMENT) file or the [official Zed extension documentation](https://zed.dev/docs/extensions/developing-extensions).

## License

MIT
