# wkey

[![CI](https://github.com/jonaprieto/zed-wkey/actions/workflows/ci.yml/badge.svg)](https://github.com/jonaprieto/zed-wkey/actions/workflows/ci.yml)
[![Rust](https://img.shields.io/badge/rust-stable-orange.svg)](https://www.rust-lang.org/)
[![License: GPL-3.0-or-later](https://img.shields.io/badge/license-GPL--3.0--or--later-blue.svg)](LICENSE)

Which-key for Zed's vim mode. A terminal panel beside or below the editor
lists every key you can press next in the vim state at your cursor, in
folding sections colored by kind. Vim's come first: edits, operators,
motions, text objects, mode switches, prefixes and scrolling (folded at
start). Zed's own commands follow by task: files, search, code, git, panes,
text, selection, cursor, AI and the app. The sections flow top to bottom into
columns; a short, wide panel, as the bottom dock makes, shows one section at a
time under a row of tabs. After an operator such as `d` the view turns to the
motions, after `d i` to the text objects, and a finished command reads in
full, `d i w → delete inner word`. On macOS modifiers read as the menus draw
them, so `alt-cmd-g` is `⌥⌘G`.

![wkey in the bottom panel of Zed, after typing d in a Lean file](assets/screenshot.png)

It reads the same keymaps Zed does (Zed's defaults and vim keymap, then your
`~/.config/zed/keymap.json`) and picks the winning binding with Zed's own
rules: the deepest matching context wins, then the later binding, and `null`
disables a key.

## Install

Download the `wkey` binary for your machine from the
[latest release](https://github.com/jonaprieto/zed-wkey/releases/latest)
and put it on your `PATH`. Builds are there for macOS and Linux on Apple
silicon or arm64 (`aarch64`) and Intel or AMD (`x86_64`). On an Apple silicon
Mac:

```sh
curl -L https://github.com/jonaprieto/zed-wkey/releases/latest/download/wkey-aarch64-apple-darwin.tar.gz | tar -xz -C ~/.local/bin
```

Use `wkey-x86_64-apple-darwin`, `wkey-x86_64-unknown-linux-gnu` or
`wkey-aarch64-unknown-linux-gnu` for the others. To build from source
instead, run `cargo install --path crates/wkey`.

Then in Zed run `zed: install dev extension` and pick this directory. The
extension starts `wkey lsp` next to the Lean language server, in Lean 4 files
only. It answers nothing; it only watches the cursor. To use a binary that is
not on `PATH`, set both its path and its argument, since Zed then runs it as
is:

```json
"lsp": { "wkey": { "binary": { "path": "/path/to/wkey", "arguments": ["lsp"] } } }
```

On macOS wkey follows the keys you type into Zed. It only listens and never
changes a key. The first run asks macOS to let Zed watch the keyboard: allow
Zed under System Settings > Privacy & Security > Input Monitoring and restart
Zed.

Open the view from a Zed terminal with `wkey`. Extensions cannot ship global
tasks or keybindings, so to open it with one key instead, add a task to
`~/.config/zed/tasks.json`:

```json
[
  {
    "label": "wkey",
    "command": "wkey",
    "use_new_terminal": false,
    "allow_concurrent_runs": true,
    "reveal": "no_focus",
    "hide": "on_success",
    "show_summary": false,
    "show_command": false
  }
]
```

and a binding to `~/.config/zed/keymap.json`:

```json
{ "context": "Workspace", "bindings": { "alt-shift-k": ["task::Spawn", { "task_name": "wkey" }] } }
```

The key opens the view without taking focus from the editor; pressing it
again restarts the view in the same terminal, and `ctrl-c` in the view closes
it. In the bottom dock each section gets a tab; `"terminal": { "dock":
"right" }` puts the view beside the code with the sections stacked.

## Use

Keep typing in the editor and the view follows: the file, the cursor, the
vim mode and the keys typed so far, so after `d` it lists only what can
follow `d`. Focus the terminal to explore: keys go to a simulated vim, so `g`
opens the `g` group, `d` shows what can follow the delete operator, and a
finished command such as `d i w` shows its action and the context that
enabled it at the bottom.

| Key | Does |
| --- | --- |
| `tab`, `shift-tab`, `up`, `down` | next or previous section (or tab) |
| `enter` | fold or unfold the selected section |
| `f3`, `shift-f3` | cycle the vim mode by hand (normal, insert, visual, replace) |
| `f2` | follow Zed's mode again |
| `j`, `k` | page through the selected section's columns, unless a prefix or operator waits |
| `backspace` | undo the last pending key or operator |
| `ctrl-c` | quit |

Everything else, including `esc`, goes to the simulated vim.

## Limits

Without Input Monitoring, and on Linux, wkey guesses the mode from your edits
and can get it wrong; pick it with `f3`. Outside Lean 4 files wkey does not
see the cursor or the file, only the keys. Keys typed into Zed's command
palette, file finder or panels also reach the simulated vim; `esc` puts it
right. Keys held with ctrl, alt or cmd are read on a US layout. Only a plain
focused editor is modeled, so bindings for menus, completions and panels do
not show, and only the default `base_keymap` is supported.

When the view gets the mode or a key wrong, `events.log` beside the cursor
file (`$XDG_RUNTIME_DIR/wkey/` or `~/.cache/wkey/`) has what it saw: each key
macOS reported, each key typed with what the simulated vim did, and every
cursor update. It starts over once it passes 1 MB.

## Development

```sh
cargo test --workspace
```

Zed's own commands get their sections from `crates/wkey/src/groups.json`,
which maps each action in the bundled keymaps to a task. Actions missing
from it go to Text (`editor::`) or App (the rest).

The bundled keymaps in `crates/wkey/keymaps` are Zed v1.28.1's
`assets/keymaps`, which are GPL-3.0-or-later, and so is wkey.
