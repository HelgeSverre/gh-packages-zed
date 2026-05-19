# zed-crowdcontrol

[![CI](https://github.com/mikemackintosh/zed-crowdcontrol/actions/workflows/ci.yml/badge.svg)](https://github.com/mikemackintosh/zed-crowdcontrol/actions/workflows/ci.yml)

A [Zed](https://zed.dev) editor extension for the
[CrowdControl](https://github.com/mikemackintosh/crowdcontrol) policy
language.

Provides:

- **Tree-sitter syntax highlighting** via
  [`tree-sitter-crowdcontrol`](https://github.com/mikemackintosh/tree-sitter-crowdcontrol) —
  forbid/warn/permit rule kinds, operators, strings, comments,
  function calls, and field paths all get semantic highlights.
- **LSP integration** — live diagnostics (parse errors), hover
  documentation, and completion via the `cc-lsp` language server
  that ships with the reference CrowdControl distribution.
- **Smart brackets and comments** — auto-close for `{` `[` `(` `"`,
  line comment toggle for both `#` and `//`.

## Install

### 1. Install the `cc-lsp` language server

```bash
go install github.com/mikemackintosh/crowdcontrol/cmd/cc-lsp@latest
```

Or grab a pre-built binary from the
[crowdcontrol releases](https://github.com/mikemackintosh/crowdcontrol/releases).

Make sure the binary is on your PATH (Zed inherits PATH from its
launch environment, so `$(go env GOPATH)/bin` may need to be added
to your shell config). The extension also falls back to well-known
locations — `$GOPATH/bin`, `$HOME/go/bin`, `/usr/local/bin`,
`/opt/homebrew/bin` — if PATH lookup fails.

### 2. Install the extension

**Option A — Zed's built-in extension registry** *(coming once the
extension is accepted into
[zed-industries/extensions](https://github.com/zed-industries/extensions))*:

```
Cmd+Shift+P → "zed: extensions" → search "CrowdControl" → Install
```

**Option B — dev install from source** *(works today)*:

Prerequisites:

- [Rustup](https://rustup.rs) with the `wasm32-wasip1` target
  (the install script adds it automatically if missing)
- Zed

```bash
git clone https://github.com/mikemackintosh/zed-crowdcontrol
cd zed-crowdcontrol
./scripts/install-dev-extension.sh
```

Then in Zed:

1. `Cmd+Shift+P` → `zed: install dev extension`
2. Browse to the `.dev-extension/` directory the script printed
3. Open any `.cc` file — you should see syntax highlighting and
   live parse-error diagnostics.

## File extension conflict with C++

`.cc` is also a common C++ source extension, and Zed ships with
built-in C++ support that claims it. Extension load order
determines which one wins. If you work with both C++ and
CrowdControl in the same project:

- Per-file: `Cmd+Shift+P` → `zed: select language` → `CrowdControl`
- Globally: add this to `~/.config/zed/settings.json`:

  ```json
  {
    "file_types": {
      "CrowdControl": ["cc"]
    }
  }
  ```

## Troubleshooting

**"cc-lsp not found"** — the extension's error message tells you
exactly what to do. Run `which cc-lsp` to verify. If you installed
via `go install`, make sure `$(go env GOPATH)/bin` is on your PATH.

**Grammar fails to load** — check Zed's log at
`~/Library/Logs/Zed/Zed.log`. The grammar is fetched from
[`tree-sitter-crowdcontrol`](https://github.com/mikemackintosh/tree-sitter-crowdcontrol)
at the commit pinned in `extension.toml`; Zed caches the clone so
reinstalls are fast.

**Highlighting works but diagnostics don't** — means the grammar
loaded fine but the LSP server couldn't start. Run `cc-lsp` manually
to confirm the binary works, then re-check the log for the LSP
error.

## Repository layout

```
zed-crowdcontrol/
├── extension.toml           # Zed manifest — LSP + grammar references
├── Cargo.toml               # Rust crate for extension.wasm
├── Cargo.lock
├── src/
│   └── crowdcontrol.rs      # Extension trait impl, cc-lsp lookup
├── languages/
│   └── crowdcontrol/
│       ├── config.toml      # file extensions, brackets, comments
│       └── highlights.scm   # tree-sitter highlight queries
├── scripts/
│   └── install-dev-extension.sh
└── .github/workflows/ci.yml
```

## Related repositories

| Repo | Role |
| --- | --- |
| [crowdcontrol](https://github.com/mikemackintosh/crowdcontrol) | The language itself — parser, evaluator, `cc` CLI, `cc-lsp`, SDKs in 6 languages |
| [tree-sitter-crowdcontrol](https://github.com/mikemackintosh/tree-sitter-crowdcontrol) | The tree-sitter grammar this extension references |
| [vscode-crowdcontrol](https://github.com/mikemackintosh/vscode-crowdcontrol) | The equivalent extension for VS Code |

## License

[MIT](LICENSE)
