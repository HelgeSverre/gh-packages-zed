# CodeTime for Zed

Track your coding time with [codetime.dev](https://codetime.dev) directly inside [Zed](https://zed.dev).

This extension is a port of the official [VS Code CodeTime extension](https://github.com/datreks/codetime-vscode).  
It uses a native Rust Language Server (`codetime-lsp`) to receive file-change notifications from Zed and forward them to the codetime.dev API.

---

## How it works

```
Zed  ──LSP notifications──►  codetime-lsp  ──HTTP POST──►  codetime.dev API
     (didOpen/didChange/       (native binary,               /v3/users/event-log
      didSave)                  runs locally)
```

1. Zed starts `codetime-lsp` as a language server for every supported language.
2. `codetime-lsp` receives `textDocument/didOpen`, `textDocument/didChange`, and `textDocument/didSave` LSP notifications.
3. Each notification is translated into a coding-activity event and POSTed to the codetime.dev REST API.
4. Debouncing mirrors the VS Code extension: writes are always sent; read events are rate-limited to once per 2 minutes per file (with 10 % random sampling of intermediate edits).

---

## Installation (development / local)

> **Prerequisites:** [Rust](https://rustup.rs) (via `rustup`) and [Zed](https://zed.dev).

### 1 – Clone and build the LSP binary

```sh
git clone https://github.com/StarlightV-org/zed-codetime.dev
cd zed-codetime

# Build the native language server binary
cargo install --path D:\Dev\EXTENTIONS\zed-codetime\codetime-lsp
```

The binary will be at `target/release/codetime-lsp` (or `target\release\codetime-lsp.exe` on Windows).

### 2 – Install as a dev extension in Zed

1. Open Zed.
2. Open the **Extensions** panel (`Cmd+Shift+X` / `Ctrl+Shift+X`).
3. Click **Install Dev Extension** and select the `zed-codetime` directory.
4. Zed will compile the WASM extension and start the LSP server automatically.

> **Tip:** To see logs from the language server, open Zed's log (`zed: open log`) and filter for `codetime`.

---

## Token configuration

Your codetime.dev API token can be supplied in **one of three ways** (highest priority first):

### Option A – Zed settings (recommended)

Add to your Zed `settings.json` (`Cmd+,` → open JSON):

```json
{
  "lsp": {
    "codetime": {
      "initialization_options": {
        "token": "YOUR_CODETIME_TOKEN",
        "projectName": "zed-codetime",
      }
    }
  }
}
```

### Option B – Environment variable

```sh
export CODETIME_TOKEN="YOUR_CODETIME_TOKEN"
```

Make sure this is set in the environment Zed is launched from.

### Option C – Config file

Create the file `~/.config/codetime/token` (or `~/.codetime/token` as a fallback) with your token as plain text:

```sh
mkdir -p ~/.config/codetime
echo "YOUR_CODETIME_TOKEN" > ~/.config/codetime/token
```

---

## Custom server / self-hosted instance

If you run a self-hosted codetime instance, point the extension at it:

```json
{
  "lsp": {
    "codetime": {
      "initialization_options": {
        "token": "YOUR_TOKEN",
        "serverEntrypoint": "https://my-codetime.example.com"
      }
    }
  }
}
```

---

## What data is sent

Each event POSTs this JSON body to `https://api.codetime.dev/v3/users/event-log`:

| Field | Example |
|---|---|
| `project` | `"zed-codetime"` |
| `language` | `"Rust"` |
| `relativeFile` | `"src/lib.rs"` |
| `absoluteFile` | `"/home/user/projects/zed-codetime/src/lib.rs"` |
| `editor` | `"Zed"` |
| `platform` | `"Linux (x86_64)"` |
| `eventTime` | `1718000000000` |
| `eventType` | `"fileSaved"` |
| `platformArch` | `"x86_64"` |
| `gitOrigin` | `"https://github.com/user/zed-codetime"` |
| `gitBranch` | `"main"` |
| `operationType` | `"write"` |

Event types: `activateFileChanged`, `fileEdited`, `fileAddedLine`, `fileSaved`.

---

## Project structure

```
zed-codetime/
├── extension.toml          Extension manifest (language list, etc.)
├── Cargo.toml              Workspace root + WASM extension package
├── src/
│   └── lib.rs              WASM shim compiled by Zed (finds & launches the LSP binary)
├── codetime-lsp/
│   ├── Cargo.toml
│   └── src/
│       └── main.rs         Native LSP server – the real tracking logic
├── LICENSE
└── README.md
```

---

## License

MIT – see [LICENSE](LICENSE).
