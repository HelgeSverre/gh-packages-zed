# Sobekneferu Zed Glory

A custom dark theme for the [Zed editor](https://zed.dev), built on top of the One Dark palette with hand-tuned modifications.

---

## Overview

**Sobekneferu Zed Glory** is a personalized Zed theme authored by [ramprasathmk](https://github.com/ramprasathmk). It extends the classic One Dark aesthetic using Zed's built-in Theme Builder, resulting in a polished dark coding environment with custom color adjustments.

- **Base:** One Dark
- **License:** MIT (open source)
- **Editor:** [Zed](https://zed.dev)
- **Repository:** [github.com/ramprasathmk/Sobekneferu-Zed-Glory](https://github.com/ramprasathmk/Sobekneferu-Zed-Glory)

---

## Repository Structure

```
Sobekneferu-Zed-Glory/
├── themes/               # Theme JSON file(s)
├── extension.toml        # Zed extension metadata
├── LICENSE               # MIT License
└── README.md
```

---

## Installation

### Option 1 — Manual (recommended for latest version)

1. Clone or download the repository:
   ```bash
   git clone https://github.com/ramprasathmk/Sobekneferu-Zed-Glory.git
   ```

2. Copy the theme file(s) to your Zed themes directory:
   ```bash
   cp themes/*.json ~/.config/zed/themes/
   ```
   > On macOS, the config path is typically `~/.config/zed/` or `~/Library/Application Support/Zed/`.

3. Open Zed and activate the theme:
   - Open the command palette: `Cmd+Shift+P` (macOS) / `Ctrl+Shift+P` (Linux)
   - Type `theme selector: toggle`
   - Search for **Sobekneferu** and select it

### Option 2 — Via Zed Extensions (if published)

1. Open the command palette and run `zed: extensions`
2. Search for **Sobekneferu Zed Glory**
3. Click **Install**
4. Activate via `theme selector: toggle`

---

## Usage

Once installed, switch to the theme at any time:

```
Command Palette → theme selector: toggle → Sobekneferu Zed Glory
```

Or set it permanently in your Zed `settings.json`:

```json
{
  "theme": "Sobekneferu Zed Glory"
}
```

---

## License

This project is released under the [MIT License](https://github.com/ramprasathmk/Sobekneferu-Zed-Glory/blob/main/LICENSE) — free to use, modify, and distribute.

---

## Contributing

Issues and pull requests are welcome via the [GitHub repository](https://github.com/ramprasathmk/Sobekneferu-Zed-Glory).

---

*Built with ❤️ using Zed's Theme Builder.*
