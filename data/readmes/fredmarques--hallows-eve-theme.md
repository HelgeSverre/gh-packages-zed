# Hallow's Eve

A Halloween-inspired theme family for [Zed](https://zed.dev), with pumpkin-orange keywords, witchy violet functions, and ghostly green strings.

- **Hallow's Eve** pairs warm charcoal surfaces with soft, luminous syntax colors.
- **Hallow's Eve Light** pairs warm ivory surfaces with deeper autumnal syntax colors.

![Hallow's Eve in Zed](assets/properties-dark.png)

![Hallow's Eve Light in Zed](assets/properties-light.png)

Actual Zed screenshots, cropped to show nested property highlighting.

## What's new in 0.2.0

- Violet functions, teal types, and candle-gold constants.
- More distinct active tabs, violet selections, amber search matches, and green matching brackets.
- Refined Git change and diagnostic backgrounds in both appearances.
- Coverage for built-in constants, enum variants, preprocessor directives, and Markdown list markers and literal text.

Themes color the syntax captures provided by each language. Install Zed's corresponding language extension when needed; a theme alone does not add PHP, Vue, or Dart language support.

### Property highlighting in 0.2.1

Object properties now reuse the existing harvest-gold accent: `#EDC47E` in dark mode and `#865B09` in light mode. This includes nested member access such as `store.state.accessManagement.appLocked`; every property uses the same color, while the base variable and punctuation retain their own styles. Booleans use pumpkin orange, keeping the main syntax palette focused on warm autumn colors. Exact highlighting depends on the language grammar and semantic tokens provided to Zed.

## Install

While the extension is awaiting catalog publication:

1. Clone this repository.
2. In Zed's command palette, run `zed: install dev extension` and select the cloned repository folder.
3. Run `theme selector: toggle` (`Cmd+K`, then `Cmd+T` on macOS) and select **Hallow's Eve** or **Hallow's Eve Light**.

You can also copy `themes/hallows-eve.json` to `~/.config/zed/themes/` on macOS or Linux, restart Zed, and select the theme.

Once accepted into Zed's extension catalog, search for **Hallow's Eve** in Extensions, install it, and select the theme.

To follow your system appearance, merge this setting into Zed's `settings.json`:

```json
{
  "theme": {
    "mode": "system",
    "dark": "Hallow's Eve",
    "light": "Hallow's Eve Light"
  }
}
```

## Palette

| Role | Dark | Light |
| --- | --- | --- |
| Editor background | `#17141C` | `#FBF6EF` |
| Text | `#F1E6D6` | `#3B293E` |
| Pumpkin orange | `#FFAA66` | `#A34A0C` |
| Witchy violet | `#C6A0F6` | `#74449C` |
| Ghostly green | `#B6D982` | `#476923` |
| Spectral teal | `#8DCED3` | `#286A70` |
| Comments | `#A194AA` | `#716071` |

Includes editor, panels, tabs, diagnostics, collaboration colors, and terminal ANSI colors. Checked syntax roles and comments exceed 4.5:1 contrast against the editor background, active line, primary selection, and search-match background in both appearances. These checks cover each background separately; overlapping highlights may differ.

Validated against Zed's v0.2.0 theme JSON schema. Visually checked TypeScript in both appearances and Dart in dark mode in Zed.

## License

[MIT](LICENSE) © 2026 Fred Marques.

