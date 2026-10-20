# Periwinkle for Zed

A synthwave theme for [Zed](https://zed.dev). It has a deep plum base and
frosted, translucent panels. Syntax colors are complementary pairs, so color
carries meaning: in Frost, sky-blue keywords sit against peach strings and
orchid functions against green numbers.

![Periwinkle Frost with the project panel, Markdown preview, terminal, and threads sidebar](assets/periwinkle-frost-threads-sidebar.png)

This repo also includes the editor layout and extension kit it's used with,
so you can clone the whole setup, not just the colors.

| Variant | Accents | Feel |
| --- | --- | --- |
| **Periwinkle Frost** | sky `#82e2ff` · orchid `#f899ff` | softer, the daily driver (screenshots) |
| **Periwinkle Neon** | cyan `#36e0e6` · magenta `#ff3d9a` | punchier, higher contrast |

![Periwinkle Frost with the agent panel docked right](assets/periwinkle-frost-agent-panel.png)

## What's here

```text
extension.toml            Zed extension manifest
assets/                   screenshots
themes/periwinkle.json    both theme variants
settings/periwinkle.jsonc the full look + layout (tabs, panels, bars, terminal)
settings/extensions.jsonc the extension kit, as an auto_install_extensions block
```

## Install

### 1. The theme

Clone the repo, then in Zed run **`zed: install dev extension`** from the
command palette and pick the cloned folder. Then open the theme picker with
`cmd-k cmd-t` and choose **Periwinkle Frost**.

### 2. The layout (optional)

Open your settings with **`zed: open settings file`** and paste in the keys
from [`settings/periwinkle.jsonc`](settings/periwinkle.jsonc). Each section is
independent, so you can take only the parts you like. This sets:

- Theme, icon theme, and cursor animation.
- Comfortable line height, a 120-column soft wrap, and indent guides colored
  by depth.
- Inline diagnostics instead of hover popovers.
- Close buttons on the left that appear on hover, no file icons on tabs, git
  status colors on tabs, and pinned tabs in their own row.
- No title-bar menus, and the branch and path in the window title.
- Project and git panels docked left (git as a tree), agent and collab panels
  docked right, and the terminal at the bottom, open on launch.

### 3. Extensions (optional)

[`settings/extensions.jsonc`](settings/extensions.jsonc) holds an
`auto_install_extensions` block. Paste it into your settings and Zed installs
anything missing. Only **`fantasticons-icons-theme`** is needed for the look.
The rest is the full kit: 53 languages, dev tools, 21 snippet packs, plus other
themes and icon sets. Delete what you don't want before pasting.

## Fonts

Fonts aren't included. The original setup uses **Operator Mono** for the editor
and UI and **Input Mono** for the terminal; both are commercial. The fonts
section of `settings/periwinkle.jsonc` lists the exact sizes and weights,
commented out, if you have them or want to match the proportions with your own
font.

## Notes

- **Translucency:** both variants use `background.appearance: "blurred"`,
  so the desktop shows through the panels. That's most visible on macOS. If
  you'd rather have solid panels, set `"background.appearance": "opaque"` under
  `theme_overrides` → `"Periwinkle Frost"` in your settings.
- **Not included:** AI/agent configuration, MCP servers, language-server
  tuning, and keybindings. Those are tied to the original machine.

## License

[MIT](LICENSE)
