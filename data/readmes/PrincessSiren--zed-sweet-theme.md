# Sweet for Zed

Sweet Dark and Sweet Light themes for [Zed](https://zed.dev), matched to the `sweet` theme in claude-desktop-extra: deep plum with hot pink in the dark variant, and blush with lavender in the light one.

## Build and install

```fish
python3 build.py --install   # writes themes/sweet.json, copies it to ~/.config/zed/themes/
```

In Zed, open the command palette and run `theme selector: toggle`, then pick **Sweet Dark** or **Sweet Light**.

`build.py` uses only the Python standard library. Every color is defined in the `DARK`, `LIGHT` and `SYNTAX_BASE` dicts at the top of the file, so edit those and rebuild. Each build prints a WCAG contrast report against the editor background.

## Where the colors come from

- **UI colors** (surfaces, text, accent, status colors) come straight from `claude-desktop-extra/themes/sweet/claude-desktop-extra.json`.
- **Syntax colors** use the hues from [EliverLara/sweet-vscode](https://github.com/EliverLara/sweet-vscode) (MIT, see `LICENSE.sweet-vscode`), with two exceptions:
  - Strings use the desktop theme's lavender instead of `#9700be`.
  - Comments use a plum gray.
- If a syntax color falls below 4.5:1 contrast (4.0:1 for comments), `fit()` adjusts its lightness until it passes. The light variant gets its syntax colors this way, from the same hues.
- Terminal blue is mapped to lavender, because Sweet has no blue.

Upstream Sweet is by [Eliver Lara](https://github.com/EliverLara/Sweet).

## License

Copyright (C) 2026 PrincessSiren. Licensed under the GNU General Public License v3.0 or later; see [`LICENSE`](LICENSE).

Portions derive from MIT-licensed work, whose notices are preserved as the MIT license requires:

- [`LICENSE.claude-desktop-extra`](LICENSE.claude-desktop-extra): claude-desktop-extra, © 2026 Patrick Jaja (UI palette)
- [`LICENSE.sweet-vscode`](LICENSE.sweet-vscode): sweet-vscode, © 2018 Eliver Lara (syntax hues)
