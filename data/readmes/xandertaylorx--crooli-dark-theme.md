<h1 align="center">Crooli Dark</h1>
<p align="center">
  A near-black dark theme for <a href="https://zed.dev">Zed</a>.<br>
  Neutral greys, a soft blue accent, and the code colours you already know from VS Code Dark+.
</p>

---

## Why this theme

- **Calm UI.** Near-black `#0a0a0a` background with layered grey surfaces, so panels, tabs and the editor read as distinct without loud borders.
- **Familiar code colours.** Syntax uses the VS Code Dark+ palette, so switching from VS Code feels like the same editor.
- **One accent.** A single soft blue (`#52a8ff`) for focus, selection and links. Nothing else fights for attention.
- **Complete.** Covers the editor, panels, tabs, status bar, scrollbars, git status colours, diagnostics, search highlights, collaborator cursors and the full 16-colour terminal palette.

## Palette

| Role | Colour | Hex |
| --- | --- | --- |
| Background | ![](https://img.shields.io/badge/-%20%20%20-0a0a0a) | `#0a0a0a` |
| Panels / surfaces | ![](https://img.shields.io/badge/-%20%20%20-111111) | `#111111` |
| Elevated / hover | ![](https://img.shields.io/badge/-%20%20%20-1c1c1c) | `#1c1c1c` |
| Border | ![](https://img.shields.io/badge/-%20%20%20-1f1f1f) | `#1f1f1f` |
| Text | ![](https://img.shields.io/badge/-%20%20%20-ededed) | `#ededed` |
| Muted text | ![](https://img.shields.io/badge/-%20%20%20-a1a1a1) | `#a1a1a1` |
| Accent | ![](https://img.shields.io/badge/-%20%20%20-52a8ff) | `#52a8ff` |
| Error | ![](https://img.shields.io/badge/-%20%20%20-ff6b5e) | `#ff6b5e` |
| Success | ![](https://img.shields.io/badge/-%20%20%20-3fcf75) | `#3fcf75` |

### Syntax

| Element | Colour | Hex |
| --- | --- | --- |
| Keywords, tags | ![](https://img.shields.io/badge/-%20%20%20-569cd6) | `#569cd6` |
| Control flow, preprocessor | ![](https://img.shields.io/badge/-%20%20%20-c586c0) | `#c586c0` |
| Strings | ![](https://img.shields.io/badge/-%20%20%20-ce9178) | `#ce9178` |
| Numbers | ![](https://img.shields.io/badge/-%20%20%20-b5cea8) | `#b5cea8` |
| Comments | ![](https://img.shields.io/badge/-%20%20%20-6a9955) | `#6a9955` |
| Functions | ![](https://img.shields.io/badge/-%20%20%20-dcdcaa) | `#dcdcaa` |
| Types, classes | ![](https://img.shields.io/badge/-%20%20%20-4ec9b0) | `#4ec9b0` |
| Variables, properties | ![](https://img.shields.io/badge/-%20%20%20-9cdcfe) | `#9cdcfe` |
| Constants, enums | ![](https://img.shields.io/badge/-%20%20%20-4fc1ff) | `#4fc1ff` |

## Install

1. Open Zed's extensions page: `zed: extensions` from the command palette (`⌘ ⇧ P`).
2. Search for **Crooli Dark** and click **Install**.
3. Pick the theme: run `theme selector: toggle` and choose **Crooli Dark**.

Or set it directly in `settings.json` (`⌘ ,`):

```json
{
  "theme": "Crooli Dark"
}
```

### Manual install

```bash
git clone https://github.com/xandertaylorx/crooli-dark-theme.git
mkdir -p ~/.config/zed/themes
cp crooli-dark-theme/themes/crooli-dark.json ~/.config/zed/themes/
```

## Tweaking it

Copy `themes/crooli-dark.json` into `~/.config/zed/themes/` and edit it. Zed reloads theme files when you save. Colours are plain hex values, and syntax colours live under `"syntax"`. [Zed's theme builder](https://zed.dev/theme-builder) is handy for previewing changes.

## Contributing

Spotted a colour that's hard to read or a UI element that looks off? Open an issue or PR with the element and, if you can, a screenshot.

## Licence

[MIT](LICENSE)
