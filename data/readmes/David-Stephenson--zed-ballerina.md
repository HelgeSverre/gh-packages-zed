# Ballerina Swan Lake (Zed)

This extension targets **Ballerina Swan Lake** only (the current `2201.x` line). It starts the **Swan Lake language server** the same way as the VS Code extension’s CLI path — `bal start-language-server` (see `getServerOptionsUsingCLI` in `workspaces/ballerina/ballerina-extension/src/utils/server/server.ts`) — and relies on the language server’s **LSP semantic tokens** for syntax colors. No tree-sitter grammar is shipped.

Legacy pre–Swan Lake toolchains are out of scope.

## Prerequisites

- A **Swan Lake** install (for example from [ballerina.io](https://ballerina.io/downloads/)) so `bal` on your `PATH` resolves to that distribution.
- Parity with the VS Code extension’s version gate: **Swan Lake Beta 3 or newer** (see `SWAN_LAKE_REGEX` / version checks in `workspaces/ballerina/ballerina-extension/src/core/extension.ts`).

## Install (local / dev)

1. Install [Rust with **rustup**](https://rustup.rs/) (Zed’s extension builder expects `rustup` + `cargo`; a Homebrew-only `rustc` is a common cause of broken dev installs).
2. From a terminal, run once in this directory so `rust-toolchain.toml` can apply:  
   `rustup show` (rustup should use **stable** from `rust-toolchain.toml` and target **`wasm32-wasip2`** if missing).  
   Optional check: `cargo build --target wasm32-wasip2` — if that succeeds, Zed’s compile step should too.
3. In Zed: **Extensions → Install Dev Extension** and select the `zed/ballerina` folder (the one that contains `extension.toml`).

### “Failed to compile Rust extension”

Zed runs `cargo build --target wasm32-wasip2` in the extension folder (see [Zed’s `extension_builder`](https://github.com/zed-industries/zed/blob/main/crates/extension/src/extension_builder.rs)). Typical fixes:

| Cause | What to do |
|--------|------------|
| **`rustc` too old** | `zed_extension_api` needs **Rust edition 2024** (and current deps need **1.86+**). This repo’s `rust-toolchain.toml` uses **stable**; run `rustup update` then retry. |
| **Wrong Rust install** | Use `rustup`, not only `brew install rust`. |
| **Need the real error** | In a terminal: `cd zed/ballerina && cargo build --target wasm32-wasip2` and read the full stderr. |
| **`rustup target add` failed** | Run manually: `rustup target add wasm32-wasip2`. |

## Optional: custom `bal` path

If `bal` is not on `PATH`, point Zed at it (the exact `lsp` key may match the language server id `ballerina` — confirm in Zed’s LSP settings docs for your version):

```json
{
  "lsp": {
    "ballerina": {
      "binary": {
        "path": "/absolute/path/to/bal",
        "arguments": ["start-language-server"]
      }
    }
  }
}
```

Override `arguments` only if you need the same extra flags you would pass after `bal` (for example `--classpath` as in the VS Code extension’s CLI path).

## Scope

- **In scope:** Swan Lake LSP over stdio, with syntax colors driven by the language server’s LSP semantic tokens.
- **Out of scope:** pre–Swan Lake releases, VS Code–only features (visualizers, debugger, notebooks, Choreo/BI panels, etc.).

The language server is the single source of truth for syntax and semantics.

## Syntax colors & diagnostics vs VS Code

- **Colors come from the LSP** — VS Code uses the Ballerina language server’s semantic tokens layered on top of a TextMate grammar; Zed does not support TextMate grammars in extensions, so this extension uses **only** the LSP semantic-token layer. The extension sets `enableSemanticHighlighting: true` as an initialization option by default.
- **LSP `languageId`** — The server expects `ballerina` (same as VS Code). This extension sets `language_ids` in `extension.toml` so diagnostics, completions, etc. match VS Code.
- **Disabling semantic tokens** — If you want to turn the LSP color layer off:

  ```json
  {
    "lsp": {
      "ballerina": {
        "initialization_options": {
          "enableSemanticHighlighting": false
        }
      }
    }
  }
  ```

- **`bal` not found from the app** — If the language server never starts, GUI‑launched Zed often has a minimal `PATH`. Set `"lsp": { "ballerina": { "binary": { "path": "/full/path/to/bal", "arguments": ["start-language-server"] } } }`.
- **Language server shows “stopped” / restart does nothing** — Older builds of this extension passed an **empty environment** to `bal`, so the process exited instantly (no `PATH`, no `JAVA_HOME`). **Reinstall the dev extension** after updating so you get **`0.0.1` or newer**, which injects `worktree.shell_env()` like a normal login shell.
- **Trust** — If Zed asks to trust the folder, accept it; the LS may not start until the worktree is trusted.
- **Project context** — Open the folder that contains **`Ballerina.toml`** so the Swan Lake LS can analyze the package (same as VS Code).

## Disclaimer

This project is an independent community extension for Zed. It is **not affiliated with, endorsed by, or sponsored by WSO2** or the official Ballerina maintainers. *Ballerina*, *Swan Lake*, and related names may be trademarks of their respective owners.
