# Quasarized.Zed

A modified color scheme extension for [Zed editor](https://github.com/zed-industries/zed) based on Solarized with 4 additional colors for better readability.

## Features

### Four more colors

**Quasarized** is a simple extension of the Solarized color scheme. It adds 4 colors to main tones for better readability and UI components.

- ![badge](https://img.shields.io/badge/Dark4-002b36) (`002b36`) was `base03` in Solarized
- ![badge](https://img.shields.io/badge/Dark3-073642) (`073642`) was `base02` in Solarized
- ![badge](https://img.shields.io/badge/Dark3c-421307) (`421307`) **NEW** (compliment color of Dark3)
- ![badge](https://img.shields.io/badge/Dark2-30525c) (`30525c`) **NEW**
- ![badge](https://img.shields.io/badge/Dark1-586e75) (`586e75`) was `base01` in Solarized
- ![badge](https://img.shields.io/badge/Dark0-657b83) (`657b83`) was `base00` in Solarized
- ![badge](https://img.shields.io/badge/Light0-839496) (`839496`) was `base0` in Solarized
- ![badge](https://img.shields.io/badge/Light1-93a1a1) (`93a1a1`) was `base1` in Solarized
- ![badge](https://img.shields.io/badge/Light2-c1c5bb) (`c1c5bb`) **NEW**
- ![badge](https://img.shields.io/badge/Light3-eee8d5) (`eee8d5`) was `base2` in Solarized
- ![badge](https://img.shields.io/badge/Light3c-d4daee) (`d4daee`) **NEW** (compliment color of Light3)
- ![badge](https://img.shields.io/badge/Light4-fdf6e3) (`fdf6e3`) was `base3` in Solarized

### Dark and light modes are completely symmetric

Flipping assigned colors in main tones gets the other mode. The color assignments are identical between modes.

### Color assignments for syntax highlighting

Types in Orange, Functions in Violet, and Variables in Cyan. The other elements are assigned to quiet colors. This suits strongly typed languages.

- ![badge](https://img.shields.io/badge/Yellow-b58900) (`b58900`) namespace, label, constant, attribute, macro
- ![badge](https://img.shields.io/badge/Orange-cb4b16) (`cb4b16`) class, type, struct
- ![badge](https://img.shields.io/badge/Red-dc322f) (`dc322f`) enum variant
- ![badge](https://img.shields.io/badge/Magenta-d33682) (`d33682`) type parameter
- ![badge](https://img.shields.io/badge/Violet-6c71c4) (`6c71c4`) function
- ![badge](https://img.shields.io/badge/Blue-268bd2) (`268bd2`) operator
- ![badge](https://img.shields.io/badge/Cyan-2aa198) (`2aa198`) variable
- ![badge](https://img.shields.io/badge/Green-859900) (`859900`) keyword, special

## Installation

1. Open Zed editor
2. Open the extensions view (Cmd+Shift+X on macOS, Ctrl+Shift+X on Linux/Windows)
3. Search for "Quasarized"
4. Click Install

Or install from source:
```bash
git clone https://github.com/shnarazk/Quasarized.Zed
cd Quasarized.Zed
# Follow Zed extension development instructions
```

## Usage

1. Open Zed settings (Cmd+, on macOS, Ctrl+, on Linux/Windows)
2. Select "Quasarized Dark" or "Quasarized Light" from the theme dropdown

## Credits

- Based on [Solarized](https://ethanschoonover.com/solarized/) by Ethan Schoonover
- Inspired by [Zed Legacy Themes](https://github.com/zed-extensions/legacy-themes)
- Adapted from [Quasarized for Helix](https://github.com/shnarazk/quasarized-for-helix)

## License

CC0 1.0 Universal - See LICENSE file for details
