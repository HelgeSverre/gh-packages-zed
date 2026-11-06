# Maya React Theme Pack for Zed

A sleek, modern theme suite ported to the [Zed code editor](https://zed.dev), featuring the flagship **Maya** theme alongside **Maya Light**, **Maya Black**, **Pure**, and **Winter**.

Inspired by One Dark Pro and Monokai, **Maya** blends calming workspace tones with carefully balanced syntax highlighting to enhance readability and reduce eye fatigue.

---

## 🎨 Themes Included

| Theme                 | Background            | Description                                                                                                         |
| :-------------------- | :-------------------- | :------------------------------------------------------------------------------------------------------------------ |
| **Maya** _(Flagship)_ | `#161a26`             | Deep midnight navy-slate workspace with warm golden amber (`#e6b450`) accents and pastel Monokai code highlighting. |
| **Maya Light**        | `#f5f7fa` / `#ffffff` | Clean porcelain slate light workspace with warm golden amber (`#d97706`) accents and vivid, high-contrast syntax.  |
| **Maya Black**        | `#0b0e14`             | Deep obsidian black variation with crisp slate borders and the signature Maya syntax palette.                       |
| **Pure**              | `#1b1d22`             | Minimalist charcoal dark theme with cool monochrome accents.                                                        |
| **Winter**            | `#011627`             | Deep ocean blue background with icy cyan and electric blue syntax colors.                                           |

---

## 🔍 Maya Color Palette Highlights

### Workbench & UI

- **Editor Background**: `#161a26`
- **Surface / Panel Background**: `#171B26`
- **Dropdown & Input Background**: `#141722`
- **Active Line Highlight**: `#131721`
- **Borders & Separators**: `#343B4D`
- **Primary Accent / Cursor**: `#e6b450` (Golden Amber)
- **Selection Highlight**: `#409fff4d` (Translucent Sky Blue)
- **Search Match**: `#6c598080` (Muted Violet)

### Syntax Highlighting (Tree-sitter)

- **Keywords / Control Flow**: `#B38CFF` (Lavender Purple)
- **Functions & Methods**: `#F29D79` (Soft Peach / Coral)
- **Types & Classes**: `#F0D8FF` (Pastel Lilac)
- **Strings & Literals**: `#82D99F` (Mint Green)
- **Numbers & Units**: `#F48CCA` (Soft Rose / Pink)
- **Booleans & Constants**: `#80BBFF` (Sky Blue)
- **Variables & Parameters**: `#DED47E` (Soft Golden Olive)
- **Properties & Object Keys**: `#E0E3EE` (Ice Off-White)
- **HTML / JSX Tags**: `#F2858C` (Pastel Coral Red)
- **Comments**: `#737780` (_Italic_ Slate)
- **Operators & Punctuation**: `#D5D8E0` (Soft Ash Gray)

---

## 🚀 Installation & Local Development in Zed

You can install and use this extension in Zed immediately during development:

1. Open **Zed**.
2. Press `Cmd + Shift + P` (macOS) or `Ctrl + Shift + P` (Linux/Windows) to open the Command Palette.
3. Type and select: **`zed: install dev extension`**.
4. Browse to and select this directory:
   ```
   /Users/yathink/projects/carbon-react-color-theme-zed
   ```
5. Open the theme switcher with `Cmd + K, Cmd + T` (or command `theme selector: toggle`).
6. Select **Maya** or any of the other variants (**Maya Light**, **Maya Black**, **Pure**, **Winter**).

---

## 🔤 Recommended Font Settings

For the optimal coding experience with the Maya theme, pair it with **JetBrains Mono** or **Fira Code**:

In your Zed `settings.json` (`Cmd + ,`):

```json
{
  "theme": "Maya",
  "buffer_font_family": "JetBrains Mono",
  "buffer_font_size": 12.5,
  "buffer_line_height": { "custom": 1.5 },
  "colorize_brackets": true,
  "cursor_blink": true,
  "ui_font_size": 14.0,
  "ui_font_weight": 400.0,
  "ui_font_family": "JetBrains Mono"
}
```

---

## 📁 Repository Structure

```
carbon-react-color-theme-zed/
├── extension.toml          # Zed extension manifest
├── themes/
│   ├── maya.json           # Flagship Maya dark theme
│   ├── maya-light.json     # Clean Maya light theme
│   ├── maya-black.json     # Maya Black OLED theme
│   ├── pure.json           # Minimalist Pure dark theme
│   └── winter.json         # Deep Winter dark theme
├── README.md               # Documentation & usage guide
├── LICENSE                 # MIT License
└── .gitignore
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
Author: **Yathin K** <yathink3@gmail.com>
Original VS Code Theme: [carbon-react-color-theme](https://github.com/yathink3/carbon-react-color-theme)
