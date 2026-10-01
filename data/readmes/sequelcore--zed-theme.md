# Sequel Theme for Zed

Two dark themes built from the Sequel palette. Both keep the syntax quiet and
mostly monochrome, so one accent color carries hierarchy.

## Sequel Ink

The original Sequel palette: warm neutrals with a gold accent.

| Token    | Hex       | Use                          |
|----------|-----------|------------------------------|
| Ink      | `#080808` | Editor, panels, title bar    |
| Lifted   | `#0D0D0C` | Sidebar, popovers, inputs    |
| Graphite | `#2A2723` | Borders, guides              |
| Muted    | `#5F594F` | Line numbers                 |
| Gold     | `#B3A58E` | Accent, numbers, focus       |
| Paper    | `#F4F1E9` | Primary text, cursor         |

## Sequel Void

The current Sequel palette: green-tinted neutrals with an emerald accent.

| Token          | Hex       | Use                          |
|----------------|-----------|------------------------------|
| Void           | `#070908` | Editor, panels, title bar    |
| Lifted void    | `#0D100E` | Sidebar, popovers, inputs    |
| Dark rule      | `#252B27` | Borders, guides              |
| Jade deep      | `#213F30` | Selection hue                |
| Emerald        | `#55A77A` | UI accent, focus             |
| Emerald bright | `#76C694` | Numbers, constants           |
| Warm white     | `#F1F3ED` | Primary text, cursor         |

## Accessibility

`scripts/audit.mjs` checks both variants on every change.

- **Text contrast (WCAG 2.2 SC 1.4.3).** Every text, syntax, status and terminal
  color reaches 4.5:1 on every surface. Comments and punctuation sit near 6:1, so
  they stay quiet without dropping below the threshold.
- **Readable highlights.** Selection, search matches, diff hunks, word diffs, merge
  markers and the debugger line are dark tints at a fixed OKLCH lightness. They
  differ from each other by hue and chroma, not brightness, so every syntax color
  keeps 4.5:1 on top of them.
- **UI indicators (WCAG 2.2 SC 1.4.11).** Focus borders, icons and the active line
  number reach 3:1.
- **Color-vision deficiency.** Git and diagnostic colors were chosen in OKLCH and
  checked with the Machado, Oliveira & Fernandes (2009) simulation for
  protanopia, deuteranopia and tritanopia. Added and deleted stay at least
  15 OKLab ΔE apart under every type, because they differ in lightness as well
  as hue.
- **More than color.** Vim and Helix mode badges show the mode name, and deleted
  lines use a different gutter marker from added and modified lines.

## Development

```sh
node scripts/build.mjs                              # writes themes/sequel.json
node scripts/audit.mjs scripts/zed-theme-keys.txt   # contrast, CVD and key coverage
```

Edit colors in `scripts/build.mjs`, not in `themes/sequel.json`.

## Install

Search for **Sequel** in `zed: extensions`, then pick **Sequel Ink** or
**Sequel Void** in `theme selector: toggle`.

For local development, run `zed: install dev extension` and select this folder.

## License

MIT
