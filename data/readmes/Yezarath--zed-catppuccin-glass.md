# Catppuccin Glass

A Zed theme pack: the [Catppuccin Blur](https://github.com/jenslys/zed-catppuccin-blur)
family (v0.3.4) with the window material switched from **frosted** to **clear**.

That is the entire change:

```diff
- "background.appearance": "blurred"
+ "background.appearance": "transparent"
```

Every colour, every alpha byte, every accent, and each variant's `light`/`dark`
`appearance` is byte-for-byte identical to the upstream theme. In Zed's own
source, `WindowBackgroundAppearance::Transparent` is documented as *"Plain alpha
transparency"* while `Blurred` is *"Transparency, but the contents behind the
window are blurred"* (`crates/gpui/src/platform.rs`) — so this trades the
frosted material for plain transparency and nothing else.

## Contents

| Path | What it is |
|---|---|
| `extension.toml` | Zed extension manifest (id `catppuccin-glass`) |
| `themes/catppuccin-glass.json` | The generated theme family — 18 variants |
| `generate.py` | Regenerates the theme file from the upstream source |
| `LICENSE` | MIT, preserving the upstream Catppuccin copyright notice |

18 variants = 3 opacity levels × 6 flavours (Iced Latte, Espresso, Latte,
Frappé, Macchiato, Mocha).

## Install as a dev extension

1. Open the extension page: run `zed: extensions` from the command palette.
2. Click **Install Dev Extension**.
3. Select this directory (the one containing `extension.toml`).

This is a theme-only extension, so no Rust or `wasm32-wasip2` build is
involved — `extension.toml` plus the JSON theme is the whole extension.

Then pick the theme (`theme selector: toggle` from the command palette):

| Slot | Theme name |
|---|---|
| Dark | `Catppuccin Glass Mocha (Transparent) [Light]` |
| Light | `Catppuccin Glass Iced Latte (Transparent) [Light]` |

Every variant carries the `Catppuccin Glass` prefix. This is deliberate: Zed's
theme registry is keyed by **variant name alone** and never prefixes the theme
family. Without the prefix the entries would read
`Catppuccin Mocha (Transparent) [Light]`, which is easy to confuse with
upstream's `Catppuccin Mocha (Blur) [Light]`. The same convention is used by
other multi-variant families such as Lucent Blur and Kanagawa Wave Blur.

The `name` field at the top of the JSON (`"Catppuccin Glass"`) is the family
name, not part of any variant name.

`[Light]` / `[Heavy]` are **not** light/dark mode — they are the opacity levels
inherited from upstream, named after their blur intensity. `[Light]` is the
least opaque (and the level this pack's README suggests for maximum wallpaper
visibility); plain (no bracket) is medium; `[Heavy]` is the most opaque. The
dark/light distinction is the separate `appearance` field.

If you already installed an earlier build of this extension, its theme names
have changed — re-run **Install Dev Extension** so the new names replace the old
ones in the selector.

If the theme does not show up, check the log with `zed: open log`; running
`zed --foreground` from a terminal gives verbose INFO-level output.

## Regenerating

The theme file is generated, so edit `generate.py` (not the JSON) if you want a
different transform, then re-run:

```sh
python3 generate.py
```

Source: **upstream only, pinned to an immutable commit** so the output is
reproducible and independent of anything installed on the machine running it.

```
jenslys/zed-catppuccin-blur @ v0.3.4
c8f493c54220ed6f6bbf722648a1de96f08a983b    themes/catppuccin-blur.json
```

That commit's JSON hashes `3576a8c9…`, which is the exact file the published
`catppuccin-blur` v0.3.4 extension ships. So the theme is derived from the same
bytes you would have installed — just fetched from the pinned commit rather than
discovered on disk. This is why the generator needs network access and has no
local-file flag: a fresh clone on any OS resolves the same input.

To adopt a newer upstream, bump `UPSTREAM_COMMIT` and `UPSTREAM_TAG` together,
re-run, and confirm the self-check still passes.

The generator self-checks (18 variants, 176 style keys each, all transparent,
all branded `Catppuccin Glass`, no `(Blur)` left) and validates against
`https://zed.dev/schema/themes/v0.2.0.json` when `jsonschema` is installed. That
schema is cached for 7 days (`.theme-schema-cache.json`) and the stale copy is
reused if the network is unavailable.

Note the theme JSON is committed, so it only changes when someone re-runs the
generator — there is no automatic sync.

## Color–alpha reference

| Variant level | `background` (chrome) | `surface.background` |
|---|---|---|
| `[Light]` | `#1e1e2e99` (60%) | `#1e1e2e8c` |
| (medium) | `#1e1e2ed7` (84%) | `#1e1e2ed0` |
| `[Heavy]` | `#1e1e2ee0` (88%) | `#1e1e2edb` |

(Mocha hex shown; other flavours use the same alpha bytes.)

The 7 keys whose alpha encodes the level are: `background`,
`surface.background`, `title_bar.background`, `status_bar.background`,
`tab.active_background`, `scrollbar.thumb.background`, `drop_target.background`.

Already fully clear (`#00000000`): `editor.background`, `panel.background`,
`tab_bar.background`, `terminal.background`, `toolbar.background`,
`editor.gutter.background`.

## If it still looks hazy

The material is now plain transparency, so any remaining haze comes from the
per-surface alpha above, not from blur:

- **More wallpaper:** lower the alpha bytes on those 7 keys in
  `themes/catppuccin-glass.json` (or switch to the `[Light]` variant, which this
  README already selects).
- **Less wallpaper:** use the medium or `[Heavy]` variant.

`experimental.theme_overrides` in your own `settings.json` (borders, line
numbers, indent guides, …) applies to every theme and carries over unchanged.

## Credits and license

This theme exists entirely on top of Catppuccin's work. The colour data — every
hex value and every alpha byte — is copied unchanged from:

- [Catppuccin](https://github.com/catppuccin/catppuccin) — the palette (MIT)
- [catppuccin/zed](https://github.com/catppuccin/zed) — the Zed port (MIT)
- [jenslys/zed-catppuccin-blur](https://github.com/jenslys/zed-catppuccin-blur) —
  the blurred variants this is derived from, by Jens Lystad (MIT)

The only original contribution here is the mechanical change of
`background.appearance` from `blurred` to `transparent`, plus the generator that
applies it. No colour was altered.

Licensed under the [MIT License](LICENSE). The upstream copyright notice
(`Copyright (c) 2024 Catppuccin`) is preserved in `LICENSE` as MIT requires.
