# zeditor

My [Zed](https://zed.dev) editor configuration, set up to feel like a JetBrains IDE (CLion / PyCharm / RustRover), with Python, C/C++ and Rust support.

## What's inside

| File | Purpose |
|---|---|
| `settings.json` | Editor settings: JetBrains base keymap, JetBrains Mono Nerd Font everywhere, Python (ruff + basedpyright), C/C++ (clangd), and Rust (rust-analyzer + clippy) setup |
| `keymap.json` | Custom shortcuts on top of the JetBrains keymap |
| `snippets/python.json` | Snippets that insert `()` after common Python builtins |

## Highlights

- **JetBrains-style keymap** (`base_keymap: JetBrains`) plus my own CLion shortcuts.
- `alt-up` / `alt-down`: previous / next symbol.
- `alt-left` / `alt-right`: previous / next tab.
- `alt-1`: focus the project panel; `enter` there opens the file in the editor.
- `alt-e`: run a task; `alt-q`: start the debugger.
- `alt-w`: toggle terminal; `alt-c`: close tab; `alt-d` / `ctrl-y`: delete line.
- `alt--` / `alt-=`: change font size.
- **Python:** ruff format on save, organize imports and fix-all, 80-column ruler.
- **C/C++:** clangd with clang-tidy, background indexing and `cmake-build-debug` as the compile commands directory.
- **Rust:** rust-analyzer with clippy diagnostics, all features and targets, rustfmt via the language server on save, inlay hints, 100-column ruler.
- Toolbar (breadcrumbs and quick-action buttons) hidden for a cleaner editor.

## Install

Copy the files to Zed's config folder:

- Linux / macOS: `~/.config/zed/`
- Windows: `%APPDATA%\Zed\`

```sh
git clone git@github.com:amiraliverse/zeditor.git
cp zeditor/keymap.json ~/.config/zed/
cp -r zeditor/snippets ~/.config/zed/
# merge settings.json by hand: it is a template, see below
```

## Notes

- `settings.json` has a placeholder database password (`CHANGE_ME`) in the Postgres context server. Set your own or remove that block.
- Install the tools Zed expects: `clangd`, `clang-format`, `cmake`, `ninja`, `lldb`, `ruff`, `rustup` (with `rust-analyzer`, `clippy`, `rustfmt`).
- Install the "JetBrainsMono Nerd Font" font and the "VSCode Icons" icon theme extension.
- The `Omazed` theme is Omarchy-specific. Change `theme` if you are not on Omarchy.
