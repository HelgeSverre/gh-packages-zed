# HORIZONCODE

Horizon, faithfully - one palette, every editor, dark and bright.

A rebuild of the [Horizon](https://github.com/jolaleye/horizon-theme-vscode) theme:
hand-built, fully-scoped themes for [Zed](https://zed.dev) and
[Helix](https://helix-editor.com), a native iTerm2 scheme, and 30+ generated
terminal formats - all from one palette.

[xtrasmal.github.io/zed-theme-horizoncode](https://xtrasmal.github.io/zed-theme-horizoncode)

## Zed

Extensions -> search **HorizonCode**, or `zed: install dev extension` and pick
this folder. Then `HorizonCode Dark` / `HorizonCode Bright` in the theme picker.

Checked key-by-key against Zed's published theme schema and the colour struct in
Zed's current source, then machine-validated - no missing schema key, no stray
key, every value a legal `#RRGGBB` / `#RRGGBBAA`, every `font_style` and
`font_weight` inside the allowed enum.

| | |
|---|---|
| Colour keys | 167 - all 139 in the published schema, plus 28 newer ones current Zed reads |
| Syntax scopes | 108 - the 46 bundled themes ship, plus 62 dotted captures they leave undefined |
| Semantic tokens | LSP token styles resolve (`type.class`, `enumMember`, `typeParameter`, `macro`, ...) |
| Players | 8, each with cursor / background / selection |

Zed resolves tree-sitter captures right-to-left, so an undefined dotted scope
silently collapses onto its parent. HorizonCode defines the dotted scopes -
methods, builtins, macros and mutable bindings stay distinguishable.

## Helix

```sh
cp helix/horizon-code-*.toml ~/.config/helix/themes/
```

`:theme horizon-code-dark` / `:theme horizon-code-bright`. Self-contained (no
`inherits`), 158 scopes covered against the official theme's 68, zero warnings
on load in Helix 25.07. Both variants share one structure - only the `[palette]`
values differ - and two upstream bugs are fixed: the `diagnostics.*` scopes that
Helix never matched, and an undefined `yellow`.

## Terminals

`yaml/` holds the palette source of truth; `terminals/` holds the formats
generated from it by [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes)
- iTerm2, WezTerm, Kitty, Alacritty, Ghostty, Windows Terminal, Konsole, foot,
rio, and ~25 more. Drop the one you need into your terminal's colours directory.

Zed's `terminal.ansi.*` block is taken from those same YAML files, so the editor
terminal and your standalone terminal render identically.

## Layout

```
themes/horizoncode.json   Zed theme family (dark + bright)
helix/                    Helix themes
yaml/                     palette source of truth (16 ANSI + bg/fg/cursor/selection)
terminals/<app>/          generated terminal formats
docs/                     GitHub Pages site
extension.toml            Zed extension manifest
```

## Credit

Derived from [horizon-theme-vscode](https://github.com/jolaleye/horizon-theme-vscode)
by Jonathan Olaleye (MIT). Rebuilt, not converted.

## Pages

[xtrasmal.github.io/zed-theme-horizoncode](https://xtrasmal.github.io/zed-theme-horizoncode)

MIT licensed.
