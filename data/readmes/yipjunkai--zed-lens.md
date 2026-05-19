# Zed Lens

Git blame annotations and commit metadata for the [Zed](https://zed.dev) editor.

Zed Lens surfaces git authorship data directly in the editor via a custom LSP server. It displays inline blame annotations as inlay hints and commit details on hover — no custom UI APIs required.

## Features

**Inline blame** — see who last modified each line, right in the editor:

```
fn main() {                          Jane Doe, 3 days ago
    println!("hello, world");        Alex Kim, 2 months ago
}                                    Jane Doe, 3 days ago
```

**Commit hover** — hover any line to see full commit metadata:

> **Jane Doe** (jane@example.com)
>
> `abc1234` - 3 days ago
>
> > Fix the widget rendering bug
>
> ---
>
> _src/main.rs_

**Configurable** — customize blame format, date display, and toggle features on/off through Zed's `settings.json`.

## How It Works

Zed's extension API doesn't support editor decorations or custom panels. Zed Lens works around this by running a custom language server (`zed-lens-server`) that:

1. Runs `git blame --line-porcelain` when you open a file
2. Caches blame data in memory
3. Returns blame as [LSP inlay hints](https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/#textDocument_inlayHint)
4. Returns commit details as [LSP hover](https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/#textDocument_hover) responses
5. Re-blames on save to keep annotations current

```
┌──────────────┐       stdio        ┌──────────────────┐
│ Zed Editor   │◄──────────────────►│ zed-lens-server  │
│              │   LSP JSON-RPC     │                  │
│ WASM shim    │                    │ git blame parser │
│ (extension/) │                    │ blame cache      │
└──────────────┘                    │ inlay hints      │
                                    │ hover provider   │
                                    └──────────────────┘
```

## Installation

### Prerequisites

- [Rust](https://rustup.rs/) toolchain
- Git
- Zed editor

### Build and install

```sh
# Clone the repo
git clone https://github.com/junkai/zed-lens.git
cd zed-lens

# Install the language server binary
cargo install --path server

# Verify it's on your PATH
zed-lens-server --help
```

### Install the extension in Zed

1. Open Zed
2. Open the Command Palette (`Cmd+Shift+P`)
3. Run **"Extensions: Install Dev Extension"**
4. Select the `extension/` directory from this repo

The extension will activate automatically for supported languages.

## Configuration

Add settings to your Zed `settings.json`:

```json
{
  "lsp": {
    "zed-lens-server": {
      "settings": {
        "blame": {
          "enabled": true,
          "format": "{author}, {time}",
          "dateFormat": "relative"
        },
        "hover": {
          "enabled": true,
          "showEmail": true,
          "showSha": true,
          "showFilename": true
        }
      }
    }
  }
}
```

### Blame options

| Key                | Type     | Default              | Description                                                  |
| ------------------ | -------- | -------------------- | ------------------------------------------------------------ |
| `blame.enabled`    | `bool`   | `true`               | Show inline blame annotations                                |
| `blame.format`     | `string` | `"{author}, {time}"` | Format template for blame text                               |
| `blame.dateFormat` | `string` | `"relative"`         | `"relative"` (3 days ago) or `"absolute"` (2026-03-01 14:30) |

### Format template placeholders

| Placeholder | Example          |
| ----------- | ---------------- |
| `{author}`  | Jane Doe         |
| `{email}`   | jane@example.com |
| `{time}`    | 3 days ago       |
| `{sha}`     | abc1234          |
| `{summary}` | Fix the widget   |

### Hover options

| Key                  | Type   | Default | Description                  |
| -------------------- | ------ | ------- | ---------------------------- |
| `hover.enabled`      | `bool` | `true`  | Show commit details on hover |
| `hover.showEmail`    | `bool` | `true`  | Include author email         |
| `hover.showSha`      | `bool` | `true`  | Include commit SHA           |
| `hover.showFilename` | `bool` | `true`  | Include filename             |

## Supported Languages

Blame annotations work for: Rust, Python, TypeScript, TSX, JavaScript, Go, C, C++, Java, Ruby, Swift, Kotlin, Zig, Lua, TOML, YAML, JSON, Markdown, HTML, CSS, Shell Script, Elixir, Haskell, OCaml, Dart, and PHP.

## Project Structure

```
zed-lens/
├── extension/              # Zed WASM extension (thin shim)
│   ├── extension.toml      # Extension manifest
│   └── src/lib.rs          # Finds and launches the LSP server
└── server/                 # Native LSP server
    └── src/
        ├── main.rs         # Entry point (stdio transport)
        ├── server.rs       # LSP handler (inlay hints, hover)
        ├── config.rs       # Configuration parsing
        ├── cache.rs        # In-memory blame cache
        └── git/
            ├── blame.rs    # git blame parser
            └── types.rs    # BlameEntry type + time formatting
```

## Limitations

Zed's extension API is still maturing. Current constraints:

- **Inlay hint styling** — blame text renders in Zed's default hint style, not as dimmed text like GitLens. No way to customize this from an extension.
- **Hover stacking** — blame hover appears alongside language hovers (e.g., type info). Zed shows all hover providers stacked.
- **No custom panels** — file history, commit graphs, and branch comparison views are not possible until Zed adds a panel/sidebar extension API ([extensions#1288](https://github.com/zed-industries/extensions/issues/1288)).
- **No Code Lens** — Zed doesn't implement the LSP Code Lens spec ([#11565](https://github.com/zed-industries/zed/issues/11565)), so per-function authorship summaries aren't possible.
- **Language list is explicit** — there's no "all languages" wildcard in Zed's extension manifest. New languages must be added to `extension.toml`.

## Roadmap

- [ ] Slash commands for file history, commit search, and branch diff
- [ ] `--ignore-revs-file` support for ignoring bulk reformats
- [ ] MCP context server for AI-assisted git queries
- [ ] Blame age heatmap via Unicode block characters
- [ ] Per-language enable/disable
- [ ] Auto-download server binary from GitHub releases
- [ ] Custom panels and views (blocked on Zed extension API)

## License

MIT
