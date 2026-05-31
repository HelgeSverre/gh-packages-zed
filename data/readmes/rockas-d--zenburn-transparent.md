# Zenburn Transparent

A [Zed](https://zed.dev) theme: the classic low-contrast **Zenburn** palette with a
transparent / blurred UI.

Editor, panels, tabs, and terminal are translucent so the window blurs your wallpaper
behind a soft Zenburn-grey glass; menus and popovers stay solid for legibility.

## Install

Once published: open the Zed extension store (`zed: extensions`), search
**Zenburn Transparent**, install.

Manual / local:

```
cp themes/zenburn-transparent.json ~/.config/zed/themes/
```

then pick **Zenburn Transparent** in the theme selector (`cmd-k cmd-t`), or pin it:

```jsonc
// settings.json
"theme": "Zenburn Transparent"
```

## ⚠️ Transparency is platform-dependent

The blur/transparency is driven by the theme key `"background.appearance": "blurred"`.
This relies on Zed's window-transparency support, which is **most reliable on macOS**
and may not render on some Linux/Windows setups or older Zed builds — this is a Zed
limitation, not a theme bug. See
[zed-industries/zed#38995](https://github.com/zed-industries/zed/issues/38995).

If the window stays opaque, the colors still work; you just lose the see-through effect.

## Tuning the tint

The window tint is `#3f3f3f99` (Zenburn `bg` at ~60% alpha). To make it
darker/lighter, change the alpha on these keys together so they stay in sync:

- `background`
- `status_bar.background`
- `title_bar.background`
- `title_bar.inactive_background`

Menus / popovers / pickers are solid `#383838` (`surface.background`,
`elevated_surface.background`). The editor, panels, and tab bar are fully transparent
(`#00000000`) and inherit the window tint. Neutral borders are `#00000000` so a
translucent border doesn't composite into a darker seam over the translucent surface.

## Syntax colors

Mapped to the VSCode Zenburn theme's effective (token-inspector) values — e.g. `const`
/ `function` (`storage.type`) = `#dfdfbf`, function names = `#dedede`, strings =
`#cc9393`, numbers = `#8cd0d3`, comments = `#7f9f7f`. See [PALETTE.md](./PALETTE.md).

Two things VSCode does that Zed's tree-sitter grammar can't (it emits coarser captures,
not a theme limitation): coloring `{}` vs `()` differently, and `from` differently from
`import`. Those render with a single color each in Zed.

## Credits

Syntax palette matched to [VSCode Zenburn](https://github.com/ryanolsonx/vscode-zenburn-theme)
by **Ryan Olson** (MIT) — itself derived from Jani Nurminen's original Vim
[Zenburn](https://github.com/jnurmine/Zenburn) and Bozhidar Batsov's
[zenburn-emacs](https://github.com/bbatsov/zenburn-emacs).
Transparent UI structuring for Zed by Demetrios Rockas.

## License

[MIT](./LICENSE) — matching the upstream VSCode Zenburn theme the palette is taken from.
