# zeditor

My [Zed](https://zed.dev) editor configuration, set up to feel like a JetBrains IDE (CLion / PyCharm / RustRover), with Python, C/C++ and Rust support.

## What's inside

| File | Purpose |
|---|---|
| `settings.json` | Editor settings: JetBrains base keymap, JetBrains Mono Nerd Font everywhere, Python (ruff + basedpyright), C/C++ (clangd), and Rust (rust-analyzer + clippy) setup |
| `keymap.json` | Custom shortcuts on top of the JetBrains keymap |
| `snippets/python.json` | Snippets that insert `()` after common Python builtins |
| `themes/omazed*.json` | Omarchy's gruvbox theme (Omazed) in 5 background shades: Darkest, Darker, Dark, Soft, Lighter. Copy to `%APPDATA%\Zed\themes` on Windows or `~/.config/zed/themes` on Linux |

## Highlights

- **JetBrains-style keymap** (`base_keymap: JetBrains`) plus my own CLion shortcuts.
- All custom `alt` shortcuts are listed in [Alt shortcuts](#alt-shortcuts).
- **Python:** ruff format on save, organize imports and fix-all, 80-column ruler.
- **C/C++:** clangd with clang-tidy, background indexing and `cmake-build-debug` as the compile commands directory.
- **Rust:** rust-analyzer with clippy diagnostics, all features and targets, rustfmt via the language server on save, inlay hints, 100-column ruler.
- Toolbar (breadcrumbs and quick-action buttons) hidden for a cleaner editor.

## Alt shortcuts

| Key | Action |
|---|---|
| `alt-1` | Focus project panel (`enter` there opens the file in the editor) |
| `alt-5` | Focus debug panel |
| `alt-6` | Diagnostics |
| `alt-7` | Focus outline panel |
| `alt-9` | Focus git panel |
| `alt-c` | Close tab |
| `alt-d` | Delete line (also `ctrl-y`) |
| `alt-e` | Run a task |
| `alt-j` | Toggle workspace sidebar (threads and projects) |
| `alt-o` | Open recent projects |
| `alt-q` | Start debugger |
| `alt-w` | Toggle terminal |
| `alt-shift-w` | New terminal |
| `alt-up` / `alt-down` | Previous / next symbol |
| `alt-left` / `alt-right` | Previous / next tab |
| `alt--` / `alt-=` | Decrease / increase font size |

Also: `ctrl-shift-f12` closes all docks, `ctrl-f4` closes tab.

## Install

Copy the files to Zed's config folder:

- Linux / macOS: `~/.config/zed/`
- Windows: `%APPDATA%\Zed\`

```sh
git clone git@github.com:amiralirs/zeditor.git
cp zeditor/keymap.json ~/.config/zed/
cp -r zeditor/snippets ~/.config/zed/
# merge settings.json by hand: it is a template, see below
```

## Notes

- `settings.json` has a placeholder database password (`CHANGE_ME`) in the Postgres context server. Set your own or remove that block.
- Install the tools Zed expects: `clangd`, `clang-format`, `cmake`, `ninja`, `lldb`, `ruff`, `rustup` (with `rust-analyzer`, `clippy`, `rustfmt`).
- Install the "JetBrainsMono Nerd Font" font and the "VSCode Icons" icon theme extension.
- The `Omazed` theme is Omarchy-specific. Change `theme` if you are not on Omarchy.
