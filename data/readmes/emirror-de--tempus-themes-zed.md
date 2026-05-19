# Tempus Themes for Zed

A full port of the **Tempus Themes** collection for the **Zed** editor.

Originally designed by [Protesilaos Stavrou](https://protesilaos.com), Tempus Themes are known for their careful contrast, semantic clarity, and long-session readability. This repository brings that same philosophy to Zed with complete UI, syntax, diagnostic, VCS, and terminal color support.

## Why Tempus?

Tempus Themes are not just colorful palettes. They are designed to help you read and write code comfortably for hours.

You can expect:

- balanced contrast without harsh glare
- clear semantic color groupings
- thoughtful light and dark variants
- restrained UI chrome so code remains the focus
- terminal palettes aligned with each theme
- accessibility-minded color choices inspired by the upstream collection

## Included Themes

This Zed port currently includes all 16 Vim variants from the Tempus collection:

### Light
- Tempus Fugit
- Tempus Dawn
- Tempus Day
- Tempus Past
- Tempus Totus

### Dark
- Tempus Autumn
- Tempus Classic
- Tempus Dusk
- Tempus Future
- Tempus Night
- Tempus Rift
- Tempus Spring
- Tempus Summer
- Tempus Tempest
- Tempus Warp
- Tempus Winter

## Installation

### Install as a development extension

1. Clone this repository:

   ```sh
   git clone https://github.com/emirror-de/tempus-themes-zed.git
   ```

2. Open Zed.
3. Open the command palette.
4. Run `Extensions: Install Dev Extension`.
5. Select the cloned `tempus-themes-zed` directory.

## Usage

### Set a single theme

Use your preferred theme directly in Zed settings:

```json
{
  "theme": "Tempus Dusk"
}
```

### Automatically switch between light and dark

```json
{
  "theme": {
    "mode": "system",
    "light": "Tempus Fugit",
    "dark": "Tempus Dusk"
  }
}
```

## Recommended Pairings

If you want a quick starting point:

- **Tempus Fugit** + **Tempus Dusk**
- **Tempus Totus** + **Tempus Winter**
- **Tempus Day** + **Tempus Summer**
- **Tempus Dawn** + **Tempus Autumn**

## What this port covers

Each theme includes:

- editor background and foreground
- syntax highlighting
- line numbers, guides, and active line styling
- panels, tabs, title bars, and status bars
- selection and search colors
- diagnostics and conflict states
- git-style created/modified/deleted colors
- terminal ANSI palette mappings

## Design Approach

This adaptation aims to stay close to the original Vim themes while making sensible choices for Zed-specific UI surfaces.

Where Zed requires colors that do not exist explicitly in the Vim themes, the values are derived from the original palette using the same overall intent:

- readable over decorative
- calm surfaces over noisy chrome
- syntax prominence over interface saturation
- clear state signaling for warnings, errors, diffs, and focus

## Customization

If you want to fine-tune the look, you can override specific syntax groups in your Zed settings.

Example:

```json
{
  "overrides": {
    "syntax": {
      "comment": {
        "color": "#6f5a68",
        "font_style": "italic"
      },
      "string": {
        "color": "#4450c8"
      }
    }
  }
}
```

A good rule of thumb: change accents carefully, but avoid shifting the main background and neutral surfaces too far if you want to preserve the Tempus feel.

## Contributing

Contributions are welcome, especially for:

- visual refinement of existing mappings
- screenshots and previews
- consistency improvements across variants
- documentation updates

If you propose palette changes, please try to keep them aligned with the upstream Tempus philosophy and explain the rationale clearly.

## Credits

- **Original themes:** Protesilaos Stavrou  
- **Original source:** https://github.com/protesilaos/tempus-themes
- **Zed adaptation:** Lewin Probst

## License

This project is distributed under the **GPL-3.0-or-later** license.

See [LICENSE](LICENSE) for details.

## Links

- Tempus Themes: https://github.com/protesilaos/tempus-themes
- Protesilaos Stavrou: https://protesilaos.com
- Zed Editor: https://zed.dev
