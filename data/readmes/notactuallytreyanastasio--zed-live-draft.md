# zed-live-draft

Zed extension that launches the [LiveDraftLSP](https://github.com/notactuallytreyanastasio/live_draft_lsp) language server for Markdown files. Together they stream what you type in Zed to a Phoenix blog in real time over a WebSocket.

## How it works

This extension is a thin shim — ~30 lines of Rust compiled to WASM. All it does is tell Zed to start `live_draft_lsp` whenever you open a Markdown file. The LSP handles the actual streaming.

```
You type in Zed
      |
      v
Zed sends textDocument/didChange to LiveDraftLSP
      |
      v
LSP pushes content over persistent WebSocket to Phoenix Channel
      |
      v
Phoenix broadcasts via PubSub -> LiveView re-renders with LIVE badge
```

## Install

### 1. Install the LSP binary

```bash
git clone https://github.com/notactuallytreyanastasio/live_draft_lsp.git
cd live_draft_lsp
mix deps.get
mix escript.build
cp live_draft_lsp ~/.local/bin/
```

Make sure `~/.local/bin` is on your PATH:

```bash
export PATH="$HOME/.local/bin:$PATH"
```

### 2. Install this extension in Zed

```bash
git clone https://github.com/notactuallytreyanastasio/zed-live-draft.git
```

In Zed:
1. Cmd+Shift+P
2. `zed: install dev extension`
3. Select the `zed-live-draft` folder

### 3. Configure your blog project

Create `.live-draft.json` in your blog repo root:

```json
{
  "url": "https://yourblog.com/api/live-draft",
  "token": "your-secret-token"
}
```

For local dev:

```json
{
  "url": "http://localhost:4000/api/live-draft",
  "token": "dev-live-draft-token"
}
```

### 4. Write

Open a post file like `2026-02-09-00-00-00-my-post.md`, start typing. Every space/period/newline pushes your content live. Save (Cmd+S) always syncs.

## What the extension does

The full source is in `src/lib.rs` — it implements one method:

- `language_server_command` — finds `live_draft_lsp` on your PATH via `worktree.which()` and returns it as the command to run

That's it. The LSP binary does all the real work (WebSocket connection, channel management, word-boundary detection).

## Requirements

- Zed editor
- `live_draft_lsp` binary on PATH (see [LiveDraftLSP](https://github.com/notactuallytreyanastasio/live_draft_lsp))
- A Phoenix blog with the live-draft channel set up

## License

MIT
