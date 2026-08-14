# 0 Protan Prism

`0 Protan Prism` is a dark/light Zed theme family designed for strong protan color vision. It uses a blue/yellow perceptual structure, deliberate lightness differences, code context, and restrained font weight instead of relying on red/green separation.

## Variants

- `0 Protan Prism` — neutral `#111111` dark canvas
- `0 Protan Prism Light` — bright `#FAFAFC` editor and sidebar with visibly separated gray chrome

Both variants preserve the same semantic roles. Functions, types, keywords, control flow, strings, values, properties, attributes, and brackets remain recognizable when the operating system changes appearance.
The sidebar uses the editor canvas in both variants so the workspace reads as one continuous surface.

## Design principles

- Yellow/ochre brackets provide the strongest structural landmark.
- Semantic green is avoided; success uses cyan.
- Important roles differ through lightness, grammar position, punctuation, spelling, and modest weight—not hue alone.
- Function definitions use `600`; calls, types, constructors, and component identities use `500`; ordinary syntax stays regular.
- Member properties remain visibly separate from base identifiers without added boldness.
- Matching bracket pairs receive a subtle yellow/ochre background.

## Install from the Zed marketplace

1. Open the Zed extension gallery with `cmd-shift-x` on macOS or `ctrl-shift-x` on Linux and Windows.
2. Search for `0 Protan Prism`.
3. Select **Install**.
4. Choose `0 Protan Prism` or `0 Protan Prism Light` from the theme selector.

Until the first marketplace release is approved, install this repository using the `zed: install dev extension` action.

## Files

- `src/0.tokens.json` — dark and light palettes plus shared semantic aliases
- `src/0.tokens.schema.json` — source validation
- `scripts/build.mjs` — generator, installer, and contrast checks
- `DESIGN.md` — palette and accessibility contract
- `extension.toml` — Zed extension metadata
- `themes/0.json` — generated Zed theme family containing both variants
- `~/.config/zed/themes/0.json` — installed copy used by Zed

## Commands

```bash
npm run build
npm run install:local
npm run check
npm run check:marketplace
```

`install:local` writes the generated family atomically to Zed. `check` verifies that the source, marketplace file, installed file, required UI states, syntax weights, semantic-token rules, and contrast floors agree. `check:marketplace` validates the committed marketplace artifact without depending on personal Zed settings.

Zed should select the variants automatically:

```json
{
  "theme": {
    "mode": "system",
    "dark": "0 Protan Prism",
    "light": "0 Protan Prism Light"
  }
}
```

Brian's perception in real code is authoritative; simulation and numeric contrast are safeguards, not substitutes for direct use.
