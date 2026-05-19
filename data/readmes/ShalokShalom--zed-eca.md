# zed-eca

First-class [ECA (Editor Code Assistant)](https://eca.dev) protocol integration for the [Zed](https://zed.dev) editor, implemented by forking Zed's LSP core architecture.

## What This Is

ECA is a JSON-RPC 2.0 protocol for AI coding assistants, using identical wire framing to LSP (`Content-Length` headers + UTF-8 JSON body). Rather than wrapping ECA inside a fake LSP server, this integration adds ECA as a **first-class protocol** alongside LSP inside Zed's core.

## Features Targeted

- **Chat** — streaming `chat/prompt` / `chat/contentReceived` wired into Zed's assistant panel
- **Rewrite** — `rewrite/prompt` with streaming diff applied to editor selections
- **Tool call approval** — `toolCallRun` with `manualApproval: true` gated on user confirmation
- **Reverse requests** — `editor/getDiagnostics` responded from Zed's live LSP diagnostic cache
- **Config tracking** — `config/updated` for active model/provider display

Inline completion is intentionally **not** implemented.

## Architecture

```
crates/eca/                          ← protocol layer (mirrors crates/lsp/)
  src/protocol.rs                    ← all ECA message types
  src/eca.rs                         ← EcaServer struct, JSON-RPC session manager
crates/project/src/eca_store.rs      ← lifecycle + event routing (mirrors lsp_store.rs)
crates/proto/proto/eca.proto         ← remote/SSH support
crates/assistant2/                   ← subscribe to EcaEvent, render streaming chat
```

## Crate Dependency Map

```
crates/eca          (no Zed deps)
    ↓
crates/project      (EcaStore, EcaEvent)
    ↓
crates/assistant2   (subscribe to EcaEvent, show chat/rewrite UI)
```

## Integration Points in Zed Core

1. Add `eca_store: Model<EcaStore>` to `Project` struct alongside `lsp_store`
2. Bridge LSP diagnostics → `EcaStore::diagnostics_cache` for `editor/getDiagnostics`
3. Subscribe to `EcaEvent` in the assistant panel for streaming rendering
4. Tool approval prompt in assistant panel UI

## Build Order

1. `crates/eca/` — standalone, builds first
2. `crates/project/` — add `eca` dependency
3. `crates/assistant2/` — add `EcaEvent` subscriptions
4. Proto: `cargo run -p proto -- generate` after editing `eca.proto`

## Protocol Reference

- [ECA Protocol Spec](https://eca.dev/protocol/)
- [ECA GitHub](https://github.com/editor-code-assistant/eca)

## Status

Work in progress. This repo contains the architectural scaffold and full implementation plan. PRs welcome.
