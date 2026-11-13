# Vault Terminal

Monochrome phosphor-terminal themes for [Zed](https://zed.dev), inspired by retro-futurist wrist-computer screens.

Each theme uses a single hue. Syntax is told apart by brightness, saturation, weight and italics, so code stays readable without leaving the monochrome look.

| Variant | |
|---|---|
| Vault Terminal Green | ![Vault Terminal Green](assets/green.png) |
| Vault Terminal Amber | ![Vault Terminal Amber](assets/amber.png) |
| Vault Terminal Blue | ![Vault Terminal Blue](assets/blue.png) |

## How the syntax reads

| Token | Treatment |
|---|---|
| Functions | brightest, italic |
| Numbers, booleans, constants | near-white |
| Keywords | vivid, bold |
| Types | pale, italic |
| Strings | washed-out, greyish |
| Variables | darker body text |
| Properties | a step darker than variables |
| Punctuation, operators | dim |
| Comments | dimmest, italic |

Template-string interpolation (`${…}`) and escape sequences get a faint highlight behind them.

## Install

Open the extensions page in Zed (`zed: extensions`), search for **Vault Terminal**, and install. Then pick a variant with `theme selector: toggle`.

## Tips

- A retro monospace font completes the look, for example [VT323](https://fonts.google.com/specimen/VT323) or [Share Tech Mono](https://fonts.google.com/specimen/Share+Tech+Mono). Set it with `buffer_font_family` in your settings.
- A monochrome icon theme keeps the file tree on-palette.

## Tweaking

The theme file is generated. Edit the hue (`VARIANTS`) or the brightness and saturation levels (`LEVELS`, `TONES`) in `scripts/build.py`, then run:

```sh
python3 scripts/build.py
```

This rewrites `themes/vault-terminal.json`.

## License

[MIT](LICENSE)
