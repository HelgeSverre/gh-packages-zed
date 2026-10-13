# Gruvbox Frameless for Zed

Six frameless Gruvbox themes for [Zed](https://zed.dev/) with warm syntax colors, continuous surfaces, transparent editor guides, and italic semantic captures that work with Maple Mono.

## Themes

| Theme | Appearance | Character |
|---|---|---|
| `Gruvbox Dark Hard` | Dark | `#1d2021` background and stronger contrast |
| `Gruvbox Dark Medium` | Dark | Classic `#282828` background |
| `Gruvbox Dark Soft` | Dark | `#32302f` background and softer transitions |
| `Gruvbox Material Deep` | Dark | `#141617` background with Gruvbox Material colors |
| `Gruvbox Mix Dark` | Dark | `#1b1b1b` background with a brighter Mix palette |
| `Gruvbox Material Soft` | Dark | Warm `#252423` background with reorganized syntax colors |

All variants keep panel borders, tab separators, scrollbar borders, editor indent guides, and wrap guides transparent so Zed does not draw the default editor lines.

The theme styles these captures as italic: `attribute`, `comment`, `comment.doc`, `emphasis`, `keyword`, `link_text`, `link_uri`, `predictive`, and `variable.parameter`.

## Theme preview

One layered composition with all six Gruvbox variants, inspired by the supplied Zed reference:

![Gruvbox variants](previews/gruvbox-variants.png)

## Installation

Install the extension from Zed's Extensions page after it is published. To test it locally:

1. Open the Command Palette.
2. Run `zed: install dev extension`.
3. Select the directory containing this `extension.toml`.
4. Open the Theme Selector with `Ctrl+K Ctrl+T` or `Cmd+K Cmd+T` on macOS.

You can also select a theme directly in Zed's `settings.json`:

```json
{
  "theme": "Gruvbox Dark Medium"
}
```

## Maple Mono italic support

The theme declares where italic syntax should be used; Zed's font family is configured globally. Install [Maple Mono](https://github.com/subframe7536/maple-font), including its italic face, and add this to your Zed `settings.json`:

```json
{
  "buffer_font_family": "Maple Mono NF",
  "buffer_font_fallbacks": ["Maple Mono", ".ZedMono"],
  "ui_font_family": "Maple Mono NF",
  "ui_font_fallbacks": ["Maple Mono"],
  "terminal": {
    "font_family": "Maple Mono NF",
    "font_fallbacks": ["Maple Mono", ".ZedMono"]
  }
}
```

If only the non-Nerd-Font package is installed, replace `Maple Mono NF` with `Maple Mono`.

## Credits and license

- Gruvbox colors are based on [morhetz/gruvbox](https://github.com/morhetz/gruvbox).
- Gruvbox Material and Mix colors are based on [sainnhe/gruvbox-material](https://github.com/sainnhe/gruvbox-material), licensed under MIT.
- The frameless surface treatment is inspired by [Vesper](https://github.com/raunofreiberg/vesper) by [Rauno Freiberg](https://rauno.me/).
- The Zed theme JSON follows the [official Zed theme schema](https://zed.dev/schema/themes/v0.2.0.json).

This extension's original work is available under the [MIT License](LICENSE).
