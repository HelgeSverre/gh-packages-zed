# Prism Night / Prism Spectrum

A family of vivid dark [Zed](https://zed.dev) themes — dark, near-black backgrounds with saturated, colorful syntax highlighting instead of a muted/desaturated palette. Related tokens (e.g. `keyword`/`tag`, `number`/`boolean`/`constant`) share a hue family but each gets a distinct shade, not an identical color.

## Themes included

| Theme | File | Description |
|---|---|---|
| **Prism Night** | `prism-night.json` | The original hand-tuned version. |
| **Prism Night Backup** | `prism-night-backup.json` | Frozen snapshot of Prism Night from before later edits. |
| **Prism Spectrum {0,45,90,...,315}deg** | `prism-spectrum-*deg.json` | 8 variants, hues evenly spaced 36° apart across 10 semantic groups (keywords, strings, functions, types, etc.), at full HSL saturation. Each angle rotates the whole wheel. |
| **Prism Spectrum OKLCH {0,45,...,315}deg** | `prism-spectrum-oklch-*deg.json` | Same 8 angles, but saturation is computed properly: each hue is pushed to its true maximum in-gamut chroma in OKLCH space (the perceptual gamut "cusp"), not a naive `S=100%` HSL value. Some hues (yellow/green) land lighter as a result — that's the real, physically-accurate shape of the sRGB gamut, not a bug. |
| **Prism Matugen** | `prism-matugen.json` | Single theme, no variants. Seeded from your **live** [Matugen](https://github.com/InioX/matugen) wallpaper colors (reads `~/.config/matugen/generated/dusky_tui.json`) — the rotation hue and background come from your current wallpaper's extracted palette. Auto-regenerates via `generate_matugen_theme.py`, wired into Matugen's `config.toml` as a `post_hook`. |

## Install

Copy or symlink whichever `themes/*.json` file(s) you want into `~/.config/zed/themes/`, then set the theme name in `~/.config/zed/settings.json`:

```json
"theme": "Prism Spectrum 90deg"
```

(Theme names are inside each file's `"name"` field — matches the filename minus `.json`, capitalized, e.g. `prism-spectrum-90deg.json` → `"Prism Spectrum 90deg"`.)

**Important:** Zed does not reliably live-reload theme *file content* changes, even with "reload window." If you edit a theme file yourself, restart Zed fully to see it. (Zed does live-apply *which* theme is selected in `settings.json` without a restart — it's specifically re-reading a given theme's file content that's unreliable.)

## Prism Matugen auto-update (optional)

If you use Matugen for wallpaper-based system theming and want `Prism Matugen` to track it automatically:

1. Symlink `themes/prism-matugen.json` into `~/.config/zed/themes/prism-matugen.json`.
2. Set `"theme": "Prism Matugen"` in Zed settings.
3. Add a `post_hook` to a Matugen template that already regenerates on every wallpaper change (e.g. any small JSON/text template) pointing at `generate_matugen_theme.py`:
   ```toml
   post_hook = '''
     python3 "/path/to/prism-night-theme/generate_matugen_theme.py" || :
   '''
   ```
4. `generate_matugen_theme.py` expects a small palette file at `~/.config/matugen/generated/dusky_tui.json` with `bg`/`accent` keys — adjust `SOURCE` in the script if your Matugen setup names things differently.

The script regenerates the theme file *and* removes/recreates the Zed themes symlink plus briefly toggles the active theme in `settings.json` — that combination is what actually forces Zed to pick up the new colors live, without a manual restart. (A plain content rewrite or a settings-toggle alone were not enough — tested and confirmed only the file remove/recreate + toggle combo works reliably.)
