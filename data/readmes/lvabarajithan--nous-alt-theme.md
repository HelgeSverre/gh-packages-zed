# Nous Alt Theme

A whole-editor theme for [Zed](https://zed.dev) matching Hermes' **Nous Alt** palette: glass neutrals with brand blue in light mode, and cream on mission-blue in dark mode.

Both variants style the **entire interface**, not just the editor pane — title bar, tab bar, status bar, panels, toolbars, scrollbars, search highlights, pane borders, terminal, and syntax highlighting.

## Design

- **Brand blue** `#0053FD` — light-mode primary, focus rings, pane borders, editor accents
- **Mission blue** `#0D2F86` — dark-mode background, already used for the editor and terminal
- **Cream** `#FFE6CB` — dark-mode text, keywords, active line numbers, and focus borders
- **Glass neutrals** — light surfaces stay near-white with restrained blue-tinted borders

## Palette mapping

Derived from Hermes' `nousAltTheme` (`apps/desktop/src/themes/presets.ts`):

| Hermes token | Light | Dark |
| --- | --- | --- |
| `background` | `#F8FAFF` | `#0D2F86` |
| `foreground` | `#17171A` | `#FFE6CB` |
| `card` / elevated surface | `#FFFFFF` | `#12378F` |
| `primary` | `#0053FD` | `#FFE6CB` |
| `secondary` | blue 7% on white | `#1B45A4` |
| `accent` | blue 10% on white | `#1540B1` |
| `border` | blue 22% alpha | `#3158AD` |
| `muted` | blue 5% on white | `#183F9A` |
| `mutedForeground` | `#666678` | `#B5C7F3` |
| `destructive` | `#C72E4D` | `#C0473A` |
| `sidebarBackground` | `#F3F7FF` | `#09286F` |
| `sidebarBorder` | blue 18% alpha | `#234A9C` |
| `ring` / `composerRing` | `#0053FD` | `#FFE6CB` |

Every style property in the [Zed theme schema v0.2.0](https://zed.dev/schema/themes/v0.2.0.json) is set explicitly for both appearances, so no surface falls back to a default.

## Variants

- **Nous Alt Light**
- **Nous Alt Dark**

## Install

1. Open Zed's Extensions panel.
2. Search for **Nous Alt Theme**.
3. Install it and pick **Nous Alt Light** or **Nous Alt Dark** in the theme picker.

For local development, use **Install Dev Extension** and select this repository's directory.

## License

MIT. See [LICENSE](LICENSE).
