# zed

Zed editor config and extensions, synced across machines.

## Contents

| File/Dir | What it is |
|---|---|
| `keymap.json` | Custom keybindings (symlinked from `~/.config/zed/keymap.json`) |
| `tasks.json` | Custom tasks (symlinked from `~/.config/zed/tasks.json`) |
| `settings.json` | Editor settings (symlinked from `~/.config/zed/settings.json`) |
| `i18n-jump.sh` | Shell script behind the `space t` task (symlinked from `~/.config/zed/scripts/find-translation`) |
| `i18n-lsp/` | Native Rust LSP binary — go-to-definition for i18n keys |
| `zed-i18n/` | WASM Zed extension that registers `i18n-lsp` |

## Keybindings

| Key | Action |
|---|---|
| `space f` | Project-wide search |
| `space t` | Jump to i18n translation definition (source → `en.json`), or find usages (inside `en.json`) |
| `gd` | Native go-to-definition via LSP (once extension is installed) |
| `gr` | Find all usages of a translation key (inside `en.json`) via LSP |

## Setting up on a new machine

### 1. Symlink the config files

```bash
ZEDCFG=~/.config/zed
TOOLS=~/Sync/tools/zed

mkdir -p "$ZEDCFG/scripts"
ln -sf "$TOOLS/keymap.json"   "$ZEDCFG/keymap.json"
ln -sf "$TOOLS/tasks.json"    "$ZEDCFG/tasks.json"
ln -sf "$TOOLS/settings.json" "$ZEDCFG/settings.json"
ln -sf "$TOOLS/i18n-jump.sh"  "$ZEDCFG/scripts/find-translation"
```

### 2. Build and install the LSP binary

```bash
cd ~/Sync/tools/zed
make install
```

> `make install` builds `i18n-lsp` in release mode and symlinks it to
> `~/.local/bin/i18n-lsp`. Make sure `~/.local/bin` is in your `PATH`.

### 3. Install the Zed extension

In Zed: `Cmd+Shift+P` → **"zed: install dev extension"** → select `~/Sync/tools/zed/zed-i18n/`

Restart Zed if prompted. The LSP activates automatically for TypeScript, TSX, and JSON files.

## Development

```bash
# Run all tests
make test

# Build everything (test + install binary + build WASM)
make all
```

Tests live in `i18n-lsp/src/i18n.rs` and cover the pure logic layer:
`key_at_col`, `scan_key_line`, `key_path_at_row`, `find_translation_file`.
