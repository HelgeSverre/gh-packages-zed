<p align="center">
  <img src="assets/preview-editor.png" alt="Fluent OLED preview" width="100%" />
</p>

<h1 align="center">Fluent OLED</h1>

<p align="center">
  <strong>A pure black, minimalist OLED theme for Zed.</strong>
</p>

---

## About

Fluent OLED strips the editor down to what matters: your code. Core surfaces are pure black (`#000000`) for OLED/AMOLED displays, with subtle grayscale chrome and a GitHub-inspired syntax palette.

---

## Features

- ⬛ **True OLED black UI** across editor, panels, tabs, title bar, status bar, and terminal
- 🎨 **GitHub-like syntax palette** with clear, low-noise contrast
- 🔘 **Monochrome chrome** so color emphasis stays in code and functional states
- 📉 **Minimal visual noise** with subdued borders and restrained highlights
- ⚡ **Power-friendly on OLED** by maximizing true black surfaces

---

## Install

### Local theme file

1. Create the Zed themes directory if needed:
   - macOS/Linux: `~/.config/zed/themes`
   - Windows: `%USERPROFILE%\AppData\Roaming\Zed\themes\`
2. Copy `themes/fluent-oled.json` into that directory.
3. Open Zed and run `theme selector: toggle`.
4. Select **Fluent OLED**.

### Install as a dev extension

1. Clone this repository.
2. In Zed, run `zed: install dev extension`.
3. Select this repository root (the folder containing `extension.toml`).
4. Select **Fluent OLED** from the theme selector.

---

## Project Structure

```text
fluent-oled-for-zed/
├── extension.toml          # Zed extension metadata
├── themes/
│   └── fluent-oled.json    # Zed theme family definition
├── assets/                 # Preview images/media
├── biome.jsonc             # Biome/Ultracite configuration
├── AGENTS.md               # AI agent guidelines
└── .agents/                # AI skills
```

---

## Color Palette

### UI

| Element    | Hex       |
| ---------- | --------- |
| Background | `#000000` |
| Surface    | `#0a0a0a` |
| Border     | `#111111` |
| Foreground | `#c9d1d9` |
| Secondary  | `#8b949e` |
| Muted      | `#6e7681` |

### Syntax

| Token      | Hex       |
| ---------- | --------- |
| Keyword    | `#ff7b72` |
| Function   | `#d2a8ff` |
| String     | `#a5d6ff` |
| Constant   | `#79c0ff` |
| Type       | `#ffa657` |
| Tag        | `#7ee787` |
| Comment    | `#8b949e` |
| Variable   | `#c9d1d9` |

---

## Development

```sh
bun install
bun run check
bun run fix
```

---

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT — see [LICENSE](LICENSE).
