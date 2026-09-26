# Zed × VS Code — dotfiles

> Make the **Zed** editor look and feel like **VS Code** — VS Code Dark Modern theme, Seti file icons, the VS Code keymap, VS Code editor defaults, and every AI feature turned off. Drop-in config, extensions installed automatically.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-macOS%20%7C%20Linux-lightgrey.svg)](#requirements)
[![Editor](https://img.shields.io/badge/editor-Zed-black.svg)](https://zed.dev)
[![For](https://img.shields.io/badge/made%20for-VS%20Code%20users-blueviolet.svg)](#why)

![Zed themed like VS Code](assets/preview.png)

---

## Why

Zed is fast, but it does not look or behave like VS Code out of the box. If you are a VS Code user who wants Zed's speed without relearning your editor, this repo gives you a **VS Code-shaped Zed** in one command:

- The **real VS Code Dark Modern** theme (and Light Modern), ported from Microsoft's palette.
- **Seti icons** — VS Code's default file icon set.
- The **VS Code default keymap**, plus the few bindings Zed's keymap misses.
- **Stock VS Code defaults** — minimap, breadcrumbs, sticky scroll, inlay hints, code lens, current-line highlight, `Shift+Alt` selection/copy-line, preview tabs, and more.
- **All AI disabled** — no agent panel, no inline chat, no ghost-text predictions.
- A curated set of **developer extensions**, installed automatically on first launch.

No manual settings hunting. No extension-by-extension setup.

---

## Requirements

- [Zed](https://zed.dev/download) (tested on **1.21.0**)
- macOS or Linux (Windows: copy the files manually — see [below](#windows))
- `git` and `bash`

---

## Quick start

```bash
# 1. Clone
git clone https://github.com/AhsanRiaz786/zed-vscode-dotfiles.git
cd zed-vscode-dotfiles

# 2. Install (symlinks settings.json + keymap.json into ~/.config/zed)
./install.sh

# 3. Restart Zed. Done — extensions install themselves on launch.
```

Prefer to **copy** the files instead of symlinking?

```bash
./install.sh --copy
```

If you already had a Zed config, `install.sh` backs it up to `settings.json.bak-<timestamp>` before touching anything.

---

## What you get

### Appearance

| Setting | Value |
|---|---|
| Theme | `VSCode Dark Modern` (dark) · `VSCode Light Modern` (light) |
| File icons | `Seti Icon Theme` (VS Code's default) |
| Editor font | Menlo (VS Code's macOS default) with cross-platform fallbacks |
| Font size | 14 px editor / 14 px UI |
| Line height | 1.5 |
| Minimap | On (120 columns, hover thumb) |
| Breadcrumbs, sticky scroll | On |
| Bracket colorization, indent guides | On |
| Current-line + selection highlight | On (VS Code defaults) |
| Project panel | Left side, VS Code Explorer style |
| Git panel | Tree view, coloured `M`/`A`/`U`/`D` status labels, change badge, click-to-diff |
| Terminal | Bottom dock, Menlo |

### Behaviour

- **Keymap:** VS Code (`base_keymap: VSCode`).
- **AI:** fully off (`disable_ai: true`).
- **Editor:** tab size 4, no autosave, no format-on-save, soft wrap off, `Alt` multi-cursor, bar cursor — all matching VS Code.
- **Files:** `.env`, `.mdx` and `.editorconfig` get proper language support; generated folders (`node_modules`, `.next`, `dist`, `target`, `__pycache__`, `.venv`, caches…) are excluded from the scanner.
- **Python:** Ruff formatting + organise-imports.
- **TypeScript:** the language server runs with 16 GB of memory (`vtsls`) so large repos do not fall over.

### Extensions (auto-installed)

Declared in `settings.json` under `auto_install_extensions`; Zed installs them on launch.

**VS Code look** — `vscode-dark-modern`, `vscode-light-modern`, `vscode-classic-themes` (all 19 built-in VS Code themes), `seti-icons`

**Languages & data** — `toml`, `sql`, `postgres-language-server`, `prisma`, `dockerfile`, `docker-compose`, `terraform`, `nginx`, `editorconfig`, `env`, `json5`, `xml`, `rainbow-csv`

**Docs & authoring** — `markdownlint`, `markdown-oxide`, `http`, `git-firefly`, `github-actions`, `gitignore-templates`, `just`, `make`, `npm-package-json-checker`, `color-highlight`, `todo-highlight-language-server`, `codebook`

**Snippets** — `python-requirements`, `python-refactoring`, `python-snippets`, `react-snippets`

> Zed already bundles ESLint, Prettier, TypeScript, Python, Rust, Go, C/C++, GraphQL, Tailwind and more — no extensions needed for those.

See **[docs/extensions.md](docs/extensions.md)** for the full breakdown and how to remove any of them.

---

## Keybindings

The VS Code keymap is applied via `base_keymap`. Your muscle memory mostly transfers:

| Action | Shortcut | Action | Shortcut |
|---|---|---|---|
| Command Palette | `⌘⇧P` | Find files | `⌘P` |
| Explorer | `⌘⇧E` | Project search | `⌘⇧F` |
| Source Control | `⌃⇧G` | Run & Debug | `⌘⇧D` |
| Extensions | `⌘⇧X` | Problems | `⌘⇧M` |
| Toggle sidebar | `⌘B` | Toggle panel | `⌘J` |
| Toggle terminal | `⌃\`` | Format document | `⇧⌥F` |
| Move line | `⌥↑` / `⌥↓` | Copy line | `⇧⌥↑` / `⇧⌥↓` |
| Expand / shrink selection | `⇧⌥→` / `⇧⌥←` | Toggle word wrap | `⌥Z` |
| Toggle theme | `⌘K ⌘T` | Comment line | `⌘/` |

Full list, plus the Zed-only extras: **[docs/keybindings.md](docs/keybindings.md)**.

---

## Customization

**Bigger text** — in `settings.json`:

```jsonc
"buffer_font_size": 16,
"ui_font_size": 16,
```

**A different VS Code theme** — open the theme selector with `⌘K ⌘T` and pick any of the 19 bundled themes (Dark+, Monokai, Solarized, High Contrast…).

**Different file icons** — install `material-icon-theme` or `vscode-icons` from `⌘⇧X`, then run *icon theme selector* from the Command Palette.

**Want AI back?** — set `"disable_ai": false` and remove `"show_edit_predictions": false`.

**Prefer tab size 2 (JS/web)?**

```jsonc
"tab_size": 2,
```

**Format on save?**

```jsonc
"format_on_save": "on",
```

---

## How this compares to VS Code

Everything VS Code has in its activity bar has a Zed equivalent:

| VS Code | Zed | Shortcut |
|---|---|---|
| Explorer | Project Panel | `⌘⇧E` |
| Search | Project Search | `⌘⇧F` |
| Source Control | Git Panel | `⌃⇧G` |
| Run and Debug | Debug Panel | `⌘⇧D` |
| Extensions | Extensions | `⌘⇧X` |
| Problems | Diagnostics | `⌘⇧M` |

**The one thing that cannot be replicated:** VS Code has a vertical **activity bar** (those icons on the far left). Zed's extension API cannot add one, and no extension provides it. Zed puts those toggles in the status bar instead.

Full honest write-up of the differences: **[docs/differences.md](docs/differences.md)**.

---

## Known limitations

| File type | Status |
|---|---|
| `.ipynb` notebooks | **Not supported.** Zed has no notebook renderer and no ipynb extension exists (it would require a custom-editor API Zed does not have). It opens as JSON. |
| `.mp3` / `.mp4` / audio / video | **No media player.** Opens as an unsupported binary. |
| `.pdf`, `.docx`, `.xlsx` | **No renderer.** |
| Images (`.png`, `.jpg`, `.gif`, `.webp`, `.svg`, `.bmp`, `.ico`, `.tiff`, `.avif`) | **Work** in Zed's built-in viewer. |

For anything Zed cannot render, use **`⌘⌥O`** (or `⌃⇧Enter` in the project panel) to open the file in your OS default app.

---

## Uninstall

```bash
./uninstall.sh
```

This removes the linked/copied config and restores the most recent backup. Installed extensions remain — remove them from the Extensions panel (`⌘⇧X`).

---

## Windows

`.sh` scripts are not used. Copy `settings.json` and `keymap.json` into:

```
%APPDATA%\Zed\
```

Then restart Zed.

---

## Repo structure

```
.
├── settings.json        # all Zed settings (theme, fonts, keymap, extensions…)
├── keymap.json          # the extra VS Code keybindings
├── install.sh           # symlink or copy the config into ~/.config/zed
├── uninstall.sh         # remove config, restore backup
├── assets/
│   └── preview.png
└── docs/
    ├── keybindings.md   # full keybinding reference + Zed-only extras
    ├── extensions.md    # every extension, what it does, how to remove it
    └── differences.md   # Zed vs VS Code: what maps, what can't
```

---

## Credits

- Themes ported from Microsoft's VS Code theme files.
- Theme/icon extensions by their respective authors on the [Zed extension registry](https://zed.dev/extensions).
- Settings validated against Zed's own `assets/settings/default.json` for v1.21.0.

## License

[MIT](LICENSE) © 2026 Ahsan Riaz
