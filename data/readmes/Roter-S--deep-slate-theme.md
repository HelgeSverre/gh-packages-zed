# Deep Slate

A minimal dark Zed theme with a near-black background and vivid syntax colors. Designed for long coding sessions across multiple languages.

## Screenshots

![Deep Slate Theme](https://raw.githubusercontent.com/Roter-S/deep-slate-vscode/zed/images/screenshot.jpeg)
![Deep Slate Theme](https://raw.githubusercontent.com/Roter-S/deep-slate-vscode/zed/images/screenshot2.jpeg)

## Features

- Deep near-black background — easy on the eyes
- Vivid, high-contrast syntax palette
- Italic keywords with cursive variant
- Full support for: JavaScript, TypeScript, React/JSX, Svelte, Vue, Astro, PHP/Laravel/Blade, Java, Kotlin, Python, Go, Rust, CSS/SCSS, JSON, YAML, SQL, Markdown

## Installation

1. Open **Extensions** in Zed
2. Search for `Deep Slate`
3. Click **Install**
4. Open the theme selector (`cmd+k cmd+t` on Mac or `ctrl+k ctrl+t` on Windows/Linux) → select **Deep Slate**

## Color Palette

| Role         | Color     |
|--------------|-----------|
| Background   | `#0c0c10` |
| Variables    | `#dce4ff` |
| Keywords     | `#d0a0ff` |
| Functions    | `#82aaff` |
| Strings      | `#f2d185` |
| Numbers      | `#ffb86c` |
| Classes      | `#ffb86c` |
| HTML Tags    | `#ff7c9e` |
| Attributes   | `#7fd9cc` |
| Operators    | `#80d9ff` |
| Comments     | `#545c7e` |

## Recommended Settings

Add these to your `~/.config/zed/settings.json` for the full minimal experience:

```json
{
  "theme": "Deep Slate",
  "icon_theme": "Material Icon Theme",
  "ui_font_size": 16,
  "buffer_font_size": 15,
  "buffer_font_features": {
    "calt": true,
  },
  "terminal": {
    "font_family": "FiraCode Nerd Font",
    "dock": "right",
  },
  "project_panel": { "dock": "left" },
  "outline_panel": { "dock": "left" },
  "collaboration_panel": { "dock": "left" },
  "git_panel": { "dock": "left" },
  "telemetry": {
    "diagnostics": true,
    "metrics": false,
  },
}
```

## License

MIT © [Roter-S](https://github.com/Roter-S)
