# One Dark Noir

One Dark Pro's colors for Zed. The syntax palette is generated from the VS Code theme's `tokenColors` and mapped onto Zed's tree-sitter captures; the UI colors follow Zed's built-in One Dark, and the seven rainbow-bracket accents come from One Dark Pro's accent set.

## Install

- Marketplace: `zed: extensions` → **One Dark Noir** → **Install**.
- From source: `zed: extensions` → **Install Dev Extension** → pick this repository.

Then select it: `zed: theme selector` → **One Dark Noir**.

## Configuration

```json
{
  "theme": "One Dark Noir"
}
```

Any key from `themes/one-dark-noir.json` can be overridden without editing the theme file — copy the entry you want to change into `theme_overrides`:

```json
{
  "theme_overrides": {
    "One Dark Noir": {
      "syntax": {
        "comment": { "color": "#7f848e", "font_style": "italic" }
      }
    }
  }
}
```

`accents` (seven colors) supplies the rainbow-bracket colors when `"colorize_brackets": true`, and the same colors tint accent-colored UI.

## License

MIT; syntax colors derived from [One Dark Pro](https://github.com/Binaryify/OneDark-Pro) by Binaryify.
