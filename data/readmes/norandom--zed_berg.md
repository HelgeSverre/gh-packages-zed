# Berg for Zed

A port of [Berg Theme by jx22 / teehausamberg](https://marketplace.visualstudio.com/items?itemName=teehausamberg.berg), based on version 0.0.4. Original theme: https://github.com/jx22/berg. The original theme is MIT licensed; this port is Beerware. Both notices are in LICENSE.

Black editor, amber prose, green headings, cyan italics, red comments, and the original dark red title bar. UI and syntax colors come from the installed VS Code theme, including its intentionally subdued code colors.

![Berg in Zed: PowerShell in the black editor with the dark red title bar](docs/screenshot.png)

## Install

Run `./install.sh` (Linux, macOS) or `.\install.ps1` (Windows), or copy `themes/berg.json` into the Zed themes directory by hand:

- Windows: `%APPDATA%\Zed\themes\`
- macOS / Linux: `~/.config/zed/themes/`

Restart Zed, open the theme selector with `Ctrl+K Ctrl+T` (macOS: `Cmd+K Cmd+T`), and select **Berg**. Alternatively set `"theme": "Berg"` in Zed settings.

Fonts are separate from themes. Your existing font settings are preserved.

## Mapping and limitations

Zed uses Tree-sitter captures rather than VS Code's TextMate selectors. Shared categories use Berg's most specific applicable color; later duplicate rules win. Markdown headings, emphasis, strong emphasis, inline code, and list markers have explicit mappings. Language-specific distinctions, quote body coloring, selection foreground, and the active-line outline cannot all be represented by a Zed theme. Rendered Markdown previews may differ from source highlighting.

Zed-only surfaces, diagnostic colors, and terminal ANSI colors use colors from Berg's palette. Hover backgrounds use Berg's gray: Zed cannot pair the original pale-yellow list hover background with a separate dark hover foreground.

## Rebuild

Run `node scripts/build.mjs`. The original JSONC theme is preserved in `source/berg-vscode.jsonc`. The generated file follows [Zed's theme schema](https://zed.dev/schema/themes/v0.2.0.json).
