# Framer Dark Theme for Zed

A port of the [Framer Dark](https://github.com/adamseckel/vsc-framer) VS Code theme to Zed. If you've used Framer's code editor and liked how it looked, this is that — but for Zed.

Every color was pulled directly from the original source and matched as closely as Zed's theming system allows. For the handful of spots where Zed handles things differently than VS Code, check out [DIFFERENCES.md](./DIFFERENCES.md).

## Color Palette

| Role | Hex |
|---|---|
| Background | `#1e1e1e` |
| Sidebar | `#141414` |
| Text | `#ffffff` |
| Muted / Comments | `#888888` |
| Accent | `#00AEFF` |
| Keywords | `#FFD14A` |
| Strings | `#91DD64` |
| Types | `#88DDFF` |
| Numbers | `#AA88FF` |
| Operators | `#FF66BB` |
| Errors | `#E27E8D` |

## Install

**From the extension store** (once published):

Open the command palette → `zed: extensions` → search "Framer Dark" → install.

**Manually:**

Drop `themes/framer-dark.json` into `~/.config/zed/themes/` on macOS/Linux or `%USERPROFILE%\AppData\Roaming\Zed\themes\` on Windows. Restart Zed, open the theme selector with `Cmd+K Cmd+T` / `Ctrl+K Ctrl+T`, and pick "Framer Dark".

**As a dev extension:**

Clone this repo, open the command palette in Zed, run `zed: install dev extension`, and point it to this folder.

## Credits

This wouldn't exist without the work of the people who built the original:

- [Vernon de Goede](https://github.com/vernondegoede/syntax-vsc) — created the original Framer Syntax theme for VS Code
- [Adam Seckel](https://github.com/adamseckel/vsc-framer) — forked it into Framer Dark with updated UI colors
- Zed port by [Anshu Meena](https://github.com/gxanshu)

## License

MIT — see [LICENSE](./LICENSE)
