# Irodori

**Statistically-averaged dark themes for [Zed](https://zed.dev), generated from community color choices.**

Irodori (彩り — "coloring") analyzes nearly 1,000 community-contributed Zed themes, clusters them by background hue, and computes perceptual averages using CIEDE2000 color difference. The result is a set of harmonized themes that represent what the Zed community gravitates toward — not designed by a single person, but distilled from collective taste.

Each theme includes WCAG AA and AAA contrast-enforced variants for accessibility.

## Themes

### Neutral

| Theme | Description |
|-------|-------------|
| **Pure Black** | Near-true-black backgrounds for OLED and minimal distraction |
| **Dark Neutral** | Balanced achromatic dark with teal accents |

### Cool

| Theme | Description |
|-------|-------------|
| **Cool Blue** | Deep blue-gray tones — the most popular community choice by a wide margin |
| **Green Teal** | Dark with teal accent colors |
| **Purple** | Muted purple accents on a neutral dark base |

### Warm

| Theme | Description |
|-------|-------------|
| **Red** | Warm stone backgrounds with soft red accents |
| **Amber** | Dark warm tones with amber-tinted text |

Every theme has three variants:

- **Base** — the raw statistical average
- **AA** — adjusted to meet WCAG AA contrast (4.5:1 for text, 3:1 for UI)
- **AAA** — adjusted to meet WCAG AAA contrast (7:1 for text, 4.5:1 for UI)

## Install

Search for **Irodori** in Zed's extension panel (`zed: extensions`), or install manually:

```
Zed → Extensions → Search "Irodori" → Install
```

To try it locally before it's on the registry:

```
Zed → Extensions → Install Dev Extension → select this directory
```

## How It Works

These themes are produced by a tool that:

1. Collects community-contributed Zed themes found online
2. Converts colors to CIELAB and clusters by background hue/lightness
3. Computes trimmed-mean archetypes per cluster using CIEDE2000 perceptual distance
4. Snaps final colors to the nearest Tailwind CSS palette value for visual coherence
5. Adjusts contrast to meet WCAG AA/AAA requirements

## License

[MIT](LICENSE)
