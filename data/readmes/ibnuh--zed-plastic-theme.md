# Plastic Theme for Zed

A port of [Will Stone's Plastic theme](https://github.com/will-stone/plastic) for the [Zed editor](https://zed.dev).

![Plastic Theme](https://img.shields.io/badge/theme-dark-21252B)

## Variants

- **Plastic** - Punctuation blends with editor foreground
- **Plastic - Deprioritised Punctuation** - Punctuation dimmed to match comment color

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| ![#21252B](https://placehold.co/16x16/21252B/21252B) | `#21252B` | Editor background |
| ![#181A1F](https://placehold.co/16x16/181A1F/181A1F) | `#181A1F` | Sidebar, panels |
| ![#0D1117](https://placehold.co/16x16/0D1117/0D1117) | `#0D1117` | Borders |
| ![#A9B2C3](https://placehold.co/16x16/A9B2C3/A9B2C3) | `#A9B2C3` | Editor foreground |
| ![#E06C75](https://placehold.co/16x16/E06C75/E06C75) | `#E06C75` | Keywords |
| ![#B57EDC](https://placehold.co/16x16/B57EDC/B57EDC) | `#B57EDC` | Functions |
| ![#61AFEF](https://placehold.co/16x16/61AFEF/61AFEF) | `#61AFEF` | Classes, storage |
| ![#98C379](https://placehold.co/16x16/98C379/98C379) | `#98C379` | Strings |
| ![#E5C07B](https://placehold.co/16x16/E5C07B/E5C07B) | `#E5C07B` | Types, tags |
| ![#56B6C2](https://placehold.co/16x16/56B6C2/56B6C2) | `#56B6C2` | Constants |
| ![#D19A66](https://placehold.co/16x16/D19A66/D19A66) | `#D19A66` | Attributes, entities |

## Installation

### From Zed Extensions (coming soon)

1. Open Zed
2. Open the command palette (`Cmd+Shift+P`)
3. Search for "zed: extensions"
4. Search for "Plastic Theme" and install

### Manual Installation

Copy the theme file to your Zed themes directory:

```bash
mkdir -p ~/.config/zed/themes
cp themes/plastic.json ~/.config/zed/themes/plastic.json
```

Then set the theme in your Zed settings (`~/.config/zed/settings.json`):

```json
{
  "theme": "Plastic"
}
```

## Credits

- Original theme by [Will Stone](https://github.com/will-stone/plastic)
- Ported for Zed by [Muhammad Ibnuh](https://github.com/ibnuh)

## License

MIT
