# Seaglass

A soft-pastel **frosted glass** theme for [Zed](https://zed.dev), built from an
original palette. The editor, panels, tabs and bars stay transparent over a
blurred window, while every floating surface (command palette, completions,
hovers, menus, tooltips) is fully opaque so nothing bleeds through and stays
readable.

It ships in three transparency levels, for both dark and light (six variants):

| Level | Dark | Light |
|---|---|---|
| Very transparent | **Seaglass Airy** | **Seaglass Light Airy** |
| Medium | **Seaglass** | **Seaglass Light** |
| Least transparent | **Seaglass Deep** | **Seaglass Light Deep** |

Blur is always on; the level scales how much tint sits behind the editor,
the chrome (panels/bars) and the whole window. "Airy" keeps the editor fully
clear; "Deep" adds the most tint for readability over busy wallpapers.

## Transparency & blur

Seaglass sets `background.appearance: "blurred"` and keeps the editor
transparent, so the look relies on your OS window compositor supporting
transparency/blur. On macOS this works out of the box. If you use an opaque
window/titlebar override, the glass effect won't show.

## How it's built

The palette and an explicit role map for every UI, syntax, terminal and player
color are generated into `themes/seaglass.json`. Every supported theme key is
assigned in all six variants, so nothing falls back to a Zed default. To tweak a
color, edit `themes/seaglass.json` directly.

## Install locally (dev extension)

1. Open Zed.
2. Command palette → **`zed: install dev extension`**.
3. Select this folder (`seaglass-theme/`).
4. Open the theme selector (**`theme selector: toggle`**) and pick
   **Seaglass** (or **Seaglass Light**).

To point your settings at it directly:

```jsonc
"theme": {
  "mode": "system",
  "light": "Seaglass Light Airy", // pick your level: Airy / (none) / Deep
  "dark": "Seaglass Airy"
}
```

No `experimental.theme_overrides` needed — everything is baked into the theme.

## Publish to the Zed extension registry

1. Push this repo to GitHub (keep `repository` in `extension.toml` in sync).
2. Fork [`zed-industries/extensions`](https://github.com/zed-industries/extensions).
3. Add this repo as a submodule in your fork:
   ```sh
   git submodule add https://github.com/mrcoolbay/seaglass-theme.git extensions/seaglass-theme
   ```
4. Add an entry to `extensions.toml`:
   ```toml
   [seaglass-theme]
   submodule = "extensions/seaglass-theme"
   version = "0.1.0"
   ```
5. Run `pnpm sort-extensions`, commit, and open a pull request.

## License

[MIT](./LICENSE) © MrCoolBay
