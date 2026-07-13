# Sublime Text 4 Colorful — Zed theme

A dark theme for the [Zed](https://zed.dev) editor, adapted as closely as possible
from the VS Code theme
**[Sublime Text 4 Colorful Theme](https://marketplace.visualstudio.com/items?itemName=Enubia.sublime-text-4-colorful-theme)**
by Enubia — that VS Code theme is the basis for this port.

That VS Code theme is itself a fork of the original **Sublime Text 4 Theme** by
[@EmilijanMB](https://github.com/EmilijanMB), enhanced with a Colorful / Semantic
highlighting version.

The Zed syntax layer additionally leans on the *Mariana* palette to fill in
token roles that Zed exposes but the original theme did not map directly.

![Sublime Text 4 Colorful theme in Zed](images/screenshot.png)

## Install

Zed loads any theme placed in its user themes directory.

1. Copy `sublime-text-4-colorful-zed.json` into your Zed themes folder:
   - **Windows:** `%APPDATA%\Zed\themes\`
   - **macOS / Linux:** `~/.config/zed/themes/`
2. Open Zed and pick **Sublime Text 4 Colorful** via the theme selector
   (`Cmd/Ctrl+K Cmd/Ctrl+T`) or in `settings.json`:

   ```json
   {
     "theme": "Sublime Text 4 Colorful"
   }
   ```

## Notes on fidelity

Zed and VS Code use different theming models, so a few things are mapped rather
than copied 1:1:

- **Panels** use Zed's single `panel.background`, set to the VS Code sidebar
  color (`#22262a`); the terminal keeps its lighter `terminal.background`.
- **Types / classes** are teal italic (`#5FB4B4`), matching how VS Code renders
  them with semantic highlighting enabled.
- **Import module names** stay in Zed's generic `variable` color — Zed's Python
  grammar gives them no dedicated capture, so the theme cannot target them
  separately (unlike VS Code, where they pick up a namespace scope).

## Credits

- Original VS Code theme: **Sublime Text 4 Colorful Theme** by
  [Enubia](https://marketplace.visualstudio.com/items?itemName=Enubia.sublime-text-4-colorful-theme)
  — a fork of the original **Sublime Text 4 Theme** by
  [@EmilijanMB](https://github.com/EmilijanMB), enhanced with a Colorful /
  Semantic highlighting version.
- Zed adaptation in this repository.
