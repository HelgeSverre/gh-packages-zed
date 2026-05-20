# Resonance with Hatsune Miku

A dark theme for [Zed](https://zed.dev) inspired by Hatsune Miku's iconic color palette — deep charcoal backgrounds with teal and cyan accents.

![Preview](images/preview.png)

## Color Palette

| Role | Color |
| --- | --- |
| Editor background | ![#1d2021](https://img.shields.io/badge/-%231d2021-1d2021?style=flat-square)|
| Sidebar / Panel background | ![#232627](https://img.shields.io/badge/-%23232627-232627?style=flat-square)|
| Cursor | ![#39c5bb](https://img.shields.io/badge/-%2339c5bb-39c5bb?style=flat-square)|
| Foreground (text) | ![#add6d7](https://img.shields.io/badge/-%23add6d7-add6d7?style=flat-square)|
| Muted foreground | ![#5b666f](https://img.shields.io/badge/-%235b666f-5b666f?style=flat-square)|
| Accent | ![#458588](https://img.shields.io/badge/-%23458588-458588?style=flat-square)/ ![#83a598](https://img.shields.io/badge/-%2383a598-83a598?style=flat-square) |
| Keywords / Operators | ![#f92672](https://img.shields.io/badge/-%23f92672-f92672?style=flat-square)|
| Strings | ![#91f697](https://img.shields.io/badge/-%2391f697-91f697?style=flat-square)|
| Variables / Properties | ![#aefffa](https://img.shields.io/badge/-%23aefffa-aefffa?style=flat-square)|
| Types / Constants | ![#b7f3db](https://img.shields.io/badge/-%23b7f3db-b7f3db?style=flat-square)|
| Numbers / Booleans | ![#dba5c8](https://img.shields.io/badge/-%23dba5c8-dba5c8?style=flat-square)|
| Functions | ![#00cabc](https://img.shields.io/badge/-%2300cabc-00cabc?style=flat-square)|
| **Git Status** | |
| New file | ![#b8ff89](https://img.shields.io/badge/-%23b8ff89-b8ff89?style=flat-square)|
| Modified file | ![#74cde6](https://img.shields.io/badge/-%2374cde6-74cde6?style=flat-square)|
| Deleted file | ![#ff7a2ca2](https://img.shields.io/badge/-%23ff7a2ca2-ff7a2ca2?style=flat-square)|
| Error | ![#ff0000](https://img.shields.io/badge/-%23ff0000-ff0000?style=flat-square)|

## Installation

### Via Zed Extension Marketplace

Search for **"Resonance with Hatsune Miku"** in Zed's extension browser (`cmd-shift-x`) and install it.

### Manual

Copy the theme JSON to Zed's themes directory, then select it with `cmd-k cmd-t`:

```sh
mkdir -p ~/.config/zed/themes
cp themes/resonance-with-hatsune-miku.json ~/.config/zed/themes/
```

### Dev Extension (for customization)

Use `zed: install dev extension` from the command palette and point it at this directory.

Or symlink for live editing:

```sh
ln -sf "$PWD/themes/resonance-with-hatsune-miku.json" \
       ~/.config/zed/themes/resonance-with-hatsune-miku.json
```

## Theme Attribute Reference

See [THEME_REFERENCE.md](./THEME_REFERENCE.md) for a full mapping of color keys to Zed UI elements.

## License

[MIT](./LICENSE)
