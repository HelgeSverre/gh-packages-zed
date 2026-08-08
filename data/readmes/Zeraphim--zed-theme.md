![Zeraphim theme for Zed](assets/banner.svg)

[![License](https://img.shields.io/github/license/Zeraphim/zed-theme?colorA=0a0a0a&colorB=7fe9d6&style=for-the-badge)](LICENSE)
[![Stars](https://img.shields.io/github/stars/Zeraphim/zed-theme?colorA=0a0a0a&colorB=4dcab6&style=for-the-badge&logo=github)](https://github.com/Zeraphim/zed-theme/stargazers)

`Turquoise and teal. Light and dark. Same palette, everywhere I work.`

---

Most themes give you somebody else's colors. This one is the palette from my own
site — the "Faceted Clarity" design system behind
[jcdiamante.com](https://jcdiamante.com) — turned into an editor theme.

Deep navy canvas, turquoise accents, and a genuinely usable light variant that
isn't just the dark one with the lightness flipped. Every color role was
re-derived for a paper-white background instead of being reused, because a
turquoise that sings on `#060a13` is illegible on `#ffffff`.

## Themes

| Name | Appearance | Canvas |
| --- | --- | --- |
| **Zeraphim Dark** | dark | `#060a13` |
| **Zeraphim Light** | light | `#ffffff` |

## Palette

![Zeraphim color palette](assets/palette.svg)

## Install

### From the Zed extension store

1. Open Zed
2. `Cmd` `Shift` `P` → **zed: extensions**
3. Search for **Zeraphim**
4. Click **Install**

### As a dev extension

```sh
git clone https://github.com/Zeraphim/zed-theme.git
```

1. In Zed: `Cmd` `Shift` `P` → **zed: install dev extension**
2. Select the cloned directory
3. `Cmd` `Shift` `P` → **theme selector: toggle** → pick **Zeraphim Dark**

> Installing as a dev extension temporarily overrides the published version if
> you already have it installed. The extensions page will show
> "Overridden by dev extension".

## Switching

`Cmd` `K` `Cmd` `T` opens the theme selector, or `Cmd` `Shift` `P` →
**theme selector: toggle**. Arrow keys preview live; `Enter` commits.

To pin it, or to follow your system appearance, edit `settings.json`
(`Cmd` `,`):

```json
{
  "theme": {
    "mode": "system",
    "light": "Zeraphim Light",
    "dark": "Zeraphim Dark"
  }
}
```

Or set one and be done:

```json
{
  "theme": "Zeraphim Dark"
}
```

## What's in the box

- **Both appearances**, at full parity — 152 style keys each, no gaps between
  the variants
- **45 syntax captures**, covering everything Zed's built-in One theme styles,
  including `emphasis.strong`, `punctuation.list_marker` and `string.special.symbol`
- **24 terminal colors** — all 16 ANSI slots plus bright and dim variants, so
  the integrated terminal matches the editor instead of fighting it
- **8 player colors** for collaboration cursors, drawn from the brand hues
- **Italic comments, bold-italic keywords**, and weighted headings, echoing the
  Syne/Lexend split on the site
- **Contrast-checked** — every foreground was measured against the surface it
  actually lands on, not eyeballed

### About the light variant

Three brand colors don't survive a white background. `#c88813` amber reaches
only 2.6:1 as text, so warnings, numbers and constants use a corrected `#8f6410`
while the original amber stays for decoration. Same story for the faint inks.
The dark variant uses the brand tokens verbatim.

The terminal's white slots are deliberately inverted in the light theme —
programs assume ANSI 15 is a legible foreground, and literal white vanishes on
paper.

## Contributing

Something looks off? [Open an issue](https://github.com/Zeraphim/zed-theme/issues).
Include a screenshot and the language, if it's a syntax problem.

## License

[MIT](LICENSE)

---

Built by [@Zeraphim](https://github.com/Zeraphim).
