# Selection Context to AI Agent

A Zed extension that sends your current selection to **agents running in a
different terminal** — Claude Code and Codex.

It works with `claude` or `codex` in Ghostty, iTerm, or anywhere else. Zed's
built-in terminal is not required, and Zed's own agent panel is not involved.

日本語版: [README.ja.md](README.ja.md) · 開発者向け: [CONTRIBUTING.md](CONTRIBUTING.md)

```
select code in Zed → cmd+. → "Send to Claude Code"
                                    ↓
                  the claude in Ghostty receives an @ reference
```

## Requirements

- macOS or Linux
- Zed
- **A Rust toolchain.** The bridge is a native binary you build yourself; there
  are no prebuilt downloads yet
- Claude Code CLI and/or Codex CLI

## Install

### 1. The binary

```bash
cd server
cargo install --path .
```

The extension looks in `settings.json`, then `$PATH`, then `$HOME/.cargo/bin`.
A Zed launched from the GUI does not inherit your full login-shell `$PATH`, so
`cargo install` alone is not always enough to be found.

### 2. The extension

In Zed: `cmd+shift+p` → `zed: install dev extension` → pick this repo's
`extension/` directory.

Restart Zed afterwards.

## Use it

### Claude Code

In your terminal, `cd` into the project, start `claude`, and run `/ide`. It must
be the same directory as the worktree open in Zed — that is how the CLI works
out which editor to attach to. `Connected to Zed.` means it worked.

Then in Zed: select code, press `cmd+.`, choose **Send to Claude Code**.

Zed shows `Sent to Claude Code — main.rs:12-30` when it lands, and warns you
instead when nothing is attached, so a send never fails silently.

Two things reach Claude Code, and they are not the same:

| | Trigger | What it does |
|---|---|---|
| Live selection | automatic, whenever the selection changes | ambient context the agent can consult |
| Explicit send | `cmd+.` → send | inserts `@file#L15-16` into the prompt |

The automatic one lets the agent answer "what am I looking at". The explicit one
puts the code into the instruction.

### Codex

In your terminal, `cd` into the project, start `codex`, and run `/ide`.
`Connected to your IDE.` means it worked.

From then on your selection and open files ride along with each message you
send. **Codex has no explicit send** — the CLI decides when to ask, so there is
no menu entry for it.

## Configuration

### Point at a specific binary

Useful while developing:

```json
{
  "lsp": {
    "selection-bridge": {
      "binary": {
        "path": "/path/to/repo/server/target/release/zed-selection-bridge"
      }
    }
  }
}
```

### Turn off Codex support

Codex's socket lives at one fixed path, and whoever holds it routes traffic for
every other editor on it. If you would rather we stayed out of that:

```json
{
  "lsp": {
    "selection-bridge": {
      "settings": { "codex": { "enabled": false } }
    }
  }
}
```

Claude Code support is unaffected.

## If it does not work

Zed's `dev: open language server logs` → **Selection Bridge** shows what the
bridge is doing. Common causes:

| Symptom | Cause |
|---|---|
| No **Send to Claude Code** in the `cmd+.` menu | Zed cannot find the binary — set `binary.path` as above |
| `Failed to connect to Zed.` from `claude` | A stale lock file, or the bridge is not running. Check the log |
| Codex says `no-client-found` | Whoever owns the socket has no client for this workspace root. Make sure `codex` was started in the same directory Zed has open |
| A Codex thread opens in Zed instead | That is Zed's own `cmd+>` (`agent::AddSelectionToThread`), right next to `cmd+.`. Rebind it in `keymap.json` if it gets in the way |

## Caveats

Neither protocol is published. This was built by reading
[claudecode.nvim](https://github.com/coder/claudecode.nvim), Codex's
open-source CLI, and the router inside Codex's VS Code extension. **An update to
either CLI could break it.**

Codex's socket has no authentication — any process running as you can ask for
your selection. That is Codex's design, not ours, and we do not widen it.

Requires macOS or Linux: both agents use paths and transports that assume a
Unix-like system.

## License

[MIT](LICENSE) © Yusei Toyoshima
