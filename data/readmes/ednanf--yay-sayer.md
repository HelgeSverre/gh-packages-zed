# Yay Sayer

A theme pair for [Zed](https://zed.dev), inspired by Jonathan Blow's Emacs colors and matched to the author's Neovim and Ghostty setup.

**Yay Sayer Dark** uses a deep green-teal background, tan text and functions, white keywords, bright green comments, and turquoise strings. **Yay Sayer Light** pairs warm cream with brown text, forest green, and teal. Both include matching interface and terminal colors.

## Install

Clone this repository and copy the theme file into Zed's local themes directory:

```sh
git clone https://github.com/ednanf/yay-sayer.git
cd yay-sayer
mkdir -p ~/.config/zed/themes
cp themes/yay-sayer.json ~/.config/zed/themes/
```

On Windows, copy the same file to `%USERPROFILE%\AppData\Roaming\Zed\themes\` instead.

Restart Zed, open the command palette, and run `theme selector: toggle`. Choose **Yay Sayer Dark** or **Yay Sayer Light**.

To follow your system appearance, add this to Zed's settings, merging it with your existing settings:

```json
{
  "theme": {
    "mode": "system",
    "dark": "Yay Sayer Dark",
    "light": "Yay Sayer Light"
  }
}
```

You can also install the repository as a development extension: open Zed's Extensions page, choose **Install Dev Extension**, and select this directory. The theme contains no Rust code and needs no compilation. This repository is not yet listed in Zed's extension store.

## Colors

| Role | Dark | Light |
| --- | --- | --- |
| Editor background | `#062625` | `#f7f2e8` |
| Default text and variables | `#d0b892` | `#493e31` |
| Keywords | `#ffffff` | `#493e31` (bold) |
| Functions | `#d0b892` | `#265f87` |
| Comments | `#53d549` | `#287b3f` |
| Strings | `#3ad0b5` | `#087b72` |
| Numbers and booleans | `#87ffde` | `#176f78` |
| Named constants | `#d0b892` | `#176f78` |
| Types and macros | `#8cde94` | `#287b3f` |
| Active line | `#0b3335` | `#ede6d9` |
| Selection | `#0000ff` | `#c9ded7` |

Dark editor colors start from the installed [RostislavArts Neovim palette](https://github.com/RostislavArts/naysayer.nvim/blob/6c641ea0cfc5fbbc0777996320b2304c3811f246/lua/colors/naysayer.lua). Both 16-color ANSI palettes match the author's Ghostty themes. Stream screenshots supplied during development guide the syntax mapping: functions, variables, punctuation, and named constants stay tan; keywords are white; numbers and booleans are turquoise; types and preprocessor captures are light green. The cursor uses light green `#90ee90`. The dark status bar uses warm brown `#40362b`. Actual syntax captures depend on the language grammar and semantic highlighting.

The light variant follows the local Neovim and Ghostty companion palette. Its string color is slightly darker than the local `#087f75` (`#087b72`) and muted interface text uses `#6b6255` for readability. Syntax and primary editor text meet a 4.5:1 contrast target on the editor background. Primary and muted interface text meet the same target on main, panel, and elevated surfaces. The inherited blue selection, ANSI colors, inactive line numbers, disabled controls, and decorative guides are outside that target.

## Where the palette comes from

This is a Jonathan Blow-inspired theme, informed by supplied stream screenshots, not a verified copy of his current personal configuration. Public historical Emacs copies use different colors. The [Witness configuration](https://github.com/ryanpcmcquen/emacs_witness/blob/master/Witness.el), for example, sets a final background of `#072626`; another [2017 Emacs theme](https://github.com/pixlark/JonathanBlowEmacsTheme/blob/master/JonathanBlow-theme.el) uses gray and yellow comments.

Version 0.1.0 followed Nick Aversano's Emacs Naysayer palette. Version 0.2.0 uses the author's installed Neovim and Ghostty colors as a palette baseline, with syntax and cursor mapping revised against three supplied stream screenshots. The installed Neovim theme is named Naysayer too, but its palette differs from the Emacs package. See [palette research](docs/palette-research.md) for the comparison and limits of the evidence.

Zed already has a separate [Naysayer extension](https://zed.dev/extensions/naysayer-theme). Yay Sayer is an independent theme pair with its own interface styling and light variant.

## Development

Edit `themes/yay-sayer.json`, then copy it to your local themes directory again or reload the development extension.

To validate the theme:

```sh
python3 -m venv .venv
. .venv/bin/activate
python -m pip install -r requirements-dev.txt
python scripts/validate.py
```

Validation checks both appearances against the bundled [Zed theme schema v0.2.0](https://zed.dev/schema/themes/v0.2.0.json), rejects unknown style properties and malformed hex colors, and checks the contrast pairs described above. GitHub Actions runs the same checks on pushes and pull requests. The schema is bundled unchanged so validation does not depend on a live schema download.

Useful references: [local themes and appearance settings](https://zed.dev/docs/themes), [theme extensions](https://zed.dev/docs/extensions/themes), and [extension development](https://zed.dev/docs/extensions/developing-extensions).

## License and credits

GPL-3.0-or-later. See [LICENSE](LICENSE) and [COPYING](COPYING).

Dark palette follows **naysayer.nvim** by Rostislav Sobolevskiy, based on **naysayer-theme.el** by Nick Aversano and contributors; both are licensed GPL-3.0-or-later. Zed adaptation and light companion copyright 2026 Ednan R. Frizzera Filho. This project is not affiliated with Jonathan Blow or those theme authors.

The bundled Zed theme schema comes from [zed-industries/zed](https://github.com/zed-industries/zed), whose theme crate is licensed GPL-3.0-or-later. See [schemas/NOTICE.md](schemas/NOTICE.md).
