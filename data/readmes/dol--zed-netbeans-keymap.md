# Zed NetBeans Keymap

A Linux `keymap.json` for [Zed](https://zed.dev/) that brings over the most useful NetBeans-style shortcuts, using the VS Code NetBeans keybinding extension as the reference point.

This project is for developers moving to Zed who want familiar navigation and editing shortcuts without building a custom keymap from scratch.

## Who This Is For

- You used NetBeans for years and want Zed to feel less foreign.
- You use the VS Code NetBeans keybinding extension and want a similar setup in Zed.
- You want a practical, editable starting point instead of an all-or-nothing port.

## What You Get

- File search on `Ctrl+P`
- Go to symbol on `Ctrl+O`
- Project panel focus on `Ctrl+1`
- Outline panel focus on `Ctrl+7`
- Search and replace shortcuts in pane/search contexts
- Common editor actions such as format, rename, organize imports, duplicate line, move line, and toggle comments

This is a best-effort mapping, not a perfect NetBeans clone. Zed does not expose every command or context that NetBeans or VS Code support.

## Install

Clone the repository and symlink the keymap into Zed. This keeps the repo as your single source of truth:

```sh
git clone https://github.com/dol/zed-netbeans-keymap.git ~/.local/share/zed-netbeans-keymap
mkdir -p ~/.config/zed
ln -sf ~/.local/share/zed-netbeans-keymap/keymap.json ~/.config/zed/keymap.json
```

Or download just the file:

```sh
mkdir -p ~/.config/zed
curl -fsSL https://raw.githubusercontent.com/dol/zed-netbeans-keymap/main/keymap.json -o ~/.config/zed/keymap.json
```

With `wget` instead of `curl`:

```sh
mkdir -p ~/.config/zed
wget -O ~/.config/zed/keymap.json https://raw.githubusercontent.com/dol/zed-netbeans-keymap/main/keymap.json
```

Use the clone-and-symlink setup if you plan to keep editing the keymap.

## Included Mappings

| Shortcut | Zed action |
| --- | --- |
| `Ctrl+1` | `project_panel::ToggleFocus` |
| `Ctrl+Shift+1` | `tab_switcher::Toggle` |
| `Ctrl+7` | `outline_panel::ToggleFocus` |
| `Ctrl+O` | `project_symbols::Toggle` |
| `Ctrl+P` | `file_finder::Toggle` |
| `Alt+Shift+O` | `file_finder::Toggle` |
| `Alt+Left` | `pane::GoBack` |
| `Alt+Right` | `pane::GoForward` |
| `Ctrl+Shift+W` | `pane::CloseAllItems` |
| `Alt+Shift+F` | `editor::Format` |
| `Ctrl+Shift+C` | `editor::ToggleComments` |
| `Ctrl+E` | `editor::DeleteLine` |
| `Ctrl+Shift+Down` | `editor::DuplicateLineDown` |
| `Ctrl+Shift+Up` | `editor::DuplicateLineUp` |
| `Alt+Shift+Down` | `editor::MoveLineDown` |
| `Alt+Shift+Up` | `editor::MoveLineUp` |
| `Alt+Up` | `editor::AddSelectionAbove` |
| `Alt+Down` | `editor::AddSelectionBelow` |
| `Ctrl+Shift+I` | `editor::OrganizeImports` |
| `Ctrl+R` | `editor::Rename` |

## Known Gaps And Approximations

- `Ctrl+Shift+1` maps to `tab_switcher::Toggle` because Zed has no direct equivalent to VS Code's "Focus Open Editors View".
- `Ctrl+Shift+0` is not included because Zed has no direct action for focusing the active editor group.
- `Ctrl+U U` and `Ctrl+U L` are not included because Zed does not expose built-in uppercase/lowercase transform actions.
- Numpad folding shortcuts are intentionally omitted because Zed's public keymap assets do not document the numpad key token names clearly enough to ship them confidently.

## Sources

- NetBeans-style VS Code bindings: `vscode-nb-keybinding`
- Zed keymap file shipped by this repo: [`keymap.json`](./keymap.json)

## License

Apache-2.0. See [`LICENSE`](./LICENSE).
