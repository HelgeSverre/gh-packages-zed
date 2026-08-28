# Neytone for Zed

**Neytone** is an ergonomic, warm light theme for [Zed](https://zed.dev) crafted specifically to eliminate eye strain, reduce visual fatigue, and provide crystal-clear legibility during extended programming sessions.

Built on principles of visual ergonomics and positive contrast, **Neytone** swaps harsh, glaring pure-white surfaces with a soothing **Warm Paper (`#E8E2D5`)** canvas while maintaining razor-sharp typography and vibrant syntax accents.

---

## ✨ Features

- **Ergonomic Warm Paper Canvas (`#E8E2D5`):** Eliminates harsh blue-light glare and eye fatigue without losing the optical acuity of light mode.
- **Deep Pure Black Typography (`#000000`):** Provides a contrast ratio > 16:1 for perfectly defined, crisp glyph contours.
- **Vibrant Syntax Palette:** Carefully calibrated semantic tokens (vivid ruby, emerald, sapphire, amber, and purple) that remain distinct and easily readable.
- **Balanced Surfaces & Dividers:** Subtle parchment tones (`#DDD6C7`) for sidebars, tabs, and status bars, with calm borders (`#C5BBAA`) and focused sapphire accents (`#1363B4`).
- **Engineered for Visual Health:** Ideal for developers experiencing astigmatism, hyperopia, or general light sensitivity in standard IDE themes.

---

## 🎨 Color Palette Overview

| Element | Color | Hex | Purpose |
| :--- | :--- | :--- | :--- |
| **Canvas / Editor** | Warm Paper | `#E8E2D5` | Primary background, low-glare |
| **Panels & Bars** | Muted Parchment | `#DDD6C7` | Sidebars, tab bars, status bars |
| **Text Primary** | Deep Ink | `#000000` | Code, main text, commands |
| **Text Secondary** | Charcoal Muted | `#2E2A25` | Line numbers, comments, metadata |
| **Selection / Active** | Warm Tint | `#CFC6B4` | Selection highlight |
| **Accent / Focus** | Sapphire Blue | `#1363B4` | Active borders, functions, links |
| **Success / String** | Emerald Green | `#107C35` | Strings, additions, success status |
| **Error / Deletion** | Ruby Red | `#C71F1F` | Errors, deletions, regex |
| **Warning / Bronze** | Warm Bronze | `#703800` | Constants, numbers, operators |
| **Keywords** | Royal Purple | `#8E24AA` | Keywords, statements, tags |

---

## 🚀 Installation

### Via Zed Extensions Gallery
1. Open Zed.
2. Open the Extensions manager (`zed: extensions` via the command palette <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>).
3. Search for **Neytone** and click **Install**.

### Manual / Local Development Installation
To test or use the theme locally:

1. Clone or copy the theme into your local Zed themes directory:
   ```bash
   mkdir -p ~/.config/zed/themes
   cp themes/neytone.json ~/.config/zed/themes/
   ```
2. Or install directly as a dev extension in Zed:
   - Press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>
   - Run `zed: install dev extension`
   - Select the repository folder (`/home/neylonsantos/repos/neylon/neytone-zed`)

---

## ⚙️ Configuration

Set **Neytone Light** in your Zed `settings.json` (<kbd>Ctrl</kbd> + <kbd>,</kbd>):

```json
{
  "theme": {
    "mode": "light",
    "light": "Neytone Light",
    "dark": "Neytone Light"
  },
  "buffer_font_family": "JetBrainsMono Nerd Font Mono",
  "buffer_font_weight": 500.0,
  "buffer_font_size": 18.0
}
```

---

## 📄 License

[MIT](LICENSE) © [Neylon Santos](https://github.com/neylonsantos)
