# Zed VS Code Keymap

[![Zed](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/zed-industries/zed/main/assets/badge/v0.json)](https://zed.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

Bring your VS Code muscle memory to Zed — without fighting the editor.

Covers **30+ shortcuts** across editing, navigation, panels, and pane management. Drop-in ready.

### Why this exists

Zed is fast, clean, and built for the future 📈. But switching from VS Code means re-learning dozens of key combinations you've spent years 😉 burning into muscle memory.

This keymap bridges that gap. It maps the VS Code shortcuts you use every single day onto their Zed equivalents, handles all the conflict unbinding so you don't have to debug why things break, and organizes everything in a way that's easy to extend.

---

### Installation

**1. Open your Zed keymap**

```
Ctrl+Shift+P → "zed: open keymap"
```

**2. Paste the contents of [`keymap.json`](./keymap.json)**

Replace everything in your keymap file, or merge the entries manually if you have existing customizations.

**3. Save** — changes apply instantly, no restart needed.

### Requirements

**Your `settings.json` must have:**

```json
{
  "base_keymap": "VSCode"
}
```

This repo is built on top of Zed's built-in VS Code base keymap. Without it, some shortcuts will be missing or incorrect.

Open settings with `Ctrl+Shift+P → "zed: open settings"`.

### Files

| File | Purpose |
|---|---|
| `keymap.json` | Clean, paste-ready keymap (no comments) |
| `keymap.jsonc` | Annotated keymap with section comments |
| `reference.settings` | Example `settings.json` to pair with this keymap |

Use `keymap.jsonc` if you want to understand what each section does or extend it yourself.

&nbsp;

## What's covered

### Editor

| Shortcut | Action |
|---|---|
| `Ctrl+Shift+Enter` | New line above |
| `Ctrl+D` | Add next occurrence to selection |
| `Ctrl+Shift+L` | Select all occurrences |
| `F12` | Go to definition |
| `Shift+F12` | Find all references |
| `F8` | Go to next diagnostic (error/warning) |
| `Shift+F8` | Go to previous diagnostic |
| `Ctrl+Shift+[` | Fold region |
| `Ctrl+Shift+]` | Unfold region |

### Workspace & Panes

| Shortcut | Action |
|---|---|
| `Ctrl+1` – `Ctrl+9` | Switch to pane 1–9 |
| `Ctrl+Tab` | Next tab |
| `Ctrl+Shift+Tab` | Previous tab |
| `Ctrl+Shift+T` | Reopen closed tab |
| `Ctrl+\` | Split editor right |
| `Ctrl+Alt+Left/Right/Up/Down` | Move editor to adjacent pane |

### Panels & Navigation

| Shortcut | Action |
|---|---|
| `Ctrl+B` | Toggle sidebar |
| `` Ctrl+` `` | Toggle terminal |
| `Ctrl+J` | Toggle bottom panel |
| `Ctrl+Shift+E` | Focus file explorer |
| `Ctrl+Shift+M` | Open diagnostics panel |
| `Ctrl+Shift+O` | Go to symbol in file |
| `Ctrl+T` | Go to symbol in project |
| `Ctrl+K G` | Open Git Graph |

### File Explorer

| Shortcut | Action |
|---|---|
| `Enter` | Open file |
| `Space` | Rename file |

&nbsp;
---

### Notes

- Overrides `Alt+1–9` pane switching in favor of `Ctrl+1–9`
- `Ctrl+B` toggles the sidebar in workspace context — if you use bold in markdown files inside Zed, be aware of this
- AI / agent panel shortcuts that conflicted with common keys have been unbound
- Pane index assumes a left-to-right layout
