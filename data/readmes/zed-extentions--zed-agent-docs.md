# zed-agent-docs — AI Agent Instruction & Skill File Linter for Zed (`agent-docs-lsp`)

A real-time linter, validator, and standalone CLI for AI agent instruction and skill files (`AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `SKILL.md`, `copilot-instructions.md`, `.rules`, `.cursorrules`, `.windsurfrules`, `.clinerules`, and `.cursor/rules/*.mdc` / `.claude/*.instructions.md` / `.github/instructions/*.instructions.md`) in Zed, built with a zero-VSCode-dependency 3-Tier Rust/WASM (`wasm32-wasip2`) extension and the native `agent-docs-lsp` language server.

> `zed-agent-docs` only lints recognized AI agent instruction and skill files — regular `README.md` and project documentation are never spammed. It provides inline diagnostics, token-budget hover cards, go-to-definition for referenced local files, and one-keypress `Ctrl+.` autofixes and suppressions.

## Demo

Recorded in the real Zed editor (`v1.29.3`) in headless CI; JSON-RPC protocol traces (`protocol.jsonl`) verify the behavior shown in each recording.

### Diagnostics

Frontmatter errors, mismatched skill names, broken relative file references, circular `@import`s, hardcoded local paths, and empty sections are flagged live as you type and aggregated in the Project Diagnostics panel (`Ctrl+Shift+M` / `F8`).

![Diagnostics](https://github.com/zed-extentions/zed-agent-docs/releases/download/v0.1.0/lsp-diagnostics.gif)

### Hover

Hovering over a flagged item displays the rule title, rule ID, severity, estimated document token count, remediation guidance, and inline suppression instructions.

![Hover](https://github.com/zed-extentions/zed-agent-docs/releases/download/v0.1.0/lsp-hover.gif)

### Quick Fix

`Ctrl+.` offers machine-applicable autofixes (inserting starter `SKILL.md` YAML frontmatter or syncing `name:` to the parent directory) alongside `agent-docs-lsp:ignore-next-line` and inline `agent-docs-lsp:ignore` suppressions.

![Quick Fix](https://github.com/zed-extentions/zed-agent-docs/releases/download/v0.1.0/lsp-quick-fix.gif)

## Features

### Inline Diagnostics, Hover, Go-to-Definition & Code Actions
- [x] Selective file classification (`is_agent_doc`): only lints `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `SKILL.md`, `copilot-instructions.md`, `.rules`, `.cursorrules`, `.windsurfrules`, `.clinerules`, and `*.mdc` / `*.instructions.md` under `.cursor/rules/`, `.claude/`, or `.github/instructions/`
- [x] **11 built-in rules** covering `SKILL.md` YAML frontmatter, broken relative file links/backtick paths, circular `@import` chains, estimated token budgets (`~chars/4`), hardcoded machine-specific home paths, and empty Markdown sections
- [x] **Rich Markdown Hover cards** (`textDocument/hover`): rule title, rule ID, severity, estimated document token count, explanation, remediation guidance, and suppression syntax
- [x] **Go-to-Definition** (`textDocument/definition`): jump directly to existing local files referenced in Markdown links, backtick file paths, or `@import` directives
- [x] **Autofix & Suppression Quick Fixes** (`Ctrl+.` / `Cmd+.`): starter frontmatter insertion (`skill-missing-frontmatter`), parent-directory name sync (`skill-name-mismatch`), plus `agent-docs-lsp:ignore-next-line` and inline `agent-docs-lsp:ignore` comments (`<!-- ... -->` or `# ...`)
- [x] Live configuration reload (`workspace/didChangeConfiguration`) for `disabledRules`, `severity`, `ignorePaths`, `maxFileSize`, `maxTokens`, and `workspaceScan`

### Workspace Scanning, CLI & Binary Provisioning
- [x] Opt-in background workspace scanning on startup (`workspaceScan.enabled`) bounded by `workspaceScan.maxFiles`
- [x] Standalone CLI (`agent-docs-lsp check [--json] [--max-files N] [--max-tokens N] [PATH...]`) for terminals, `.zed/tasks.json`, and CI
- [x] Automatic binary resolution (`lsp.agent-docs-lsp.binary.path` -> `PATH` -> cached version dir -> exact-version GitHub Release download with offline cache fallback)

### Zed Extension API Boundaries
- [ ] Custom WebViews or sidebar token dashboards *(Blocked by Zed Extension API `0.7.0` — surfaced via Project Diagnostics `Ctrl+Shift+M`, Hover cards, and Code Action Palette `Ctrl+.`)*

## Prerequisites

For normal editor diagnostics, hover cards, go-to-definition, and `Ctrl+.` Quick Fixes, no manual installation is needed once releases are published: `zed-agent-docs` downloads the matching `agent-docs-lsp` server binary automatically from GitHub Releases (or uses a copy on `PATH` / `lsp.agent-docs-lsp.binary.path`).
To run `agent-docs-lsp check` from a terminal or `.zed/tasks.json`, install `agent-docs-lsp` on `PATH` (for example `cargo install --path crates/agent-docs-lsp`).

### Binary resolution order

`zed-agent-docs` locates `agent-docs-lsp` in this order:

1. **`lsp.agent-docs-lsp.binary.path`** in `.zed/settings.json` (explicit override, with optional `arguments` and `env`)
2. **`agent-docs-lsp` on `PATH`** (resolved via `worktree.which("agent-docs-lsp")`)
3. **Version-matched cached binary** in the extension work directory (`agent-docs-lsp-v<VERSION>/`)
4. **Automatic GitHub Release download** for tag `v<VERSION>` (`zed::github_release_by_tag_name` + `zed::download_file`), falling back to the newest previously cached version when offline (the download is retried on the next start). Linux binaries are statically linked (musl), and each release lists its checksums in `SHA256SUMS`
5. **Actionable installation error** if none of the above succeed

```json
{
  "lsp": {
    "agent-docs-lsp": {
      "binary": {
        "path": "/custom/path/to/agent-docs-lsp",
        "arguments": ["--stdio"]
      }
    }
  }
}
```

## Usage

### 1. Inline Diagnostics & Project Diagnostics (`Ctrl+Shift+M` / `F8`)

Open, edit, or save any recognized agent instruction or skill file. Issues are underlined inline and aggregated in the Project Diagnostics panel (`diagnostics: deploy`, `Ctrl+Shift+M`, next diagnostic `F8`).

### 2. Hover, Go-to-Definition & Code Action Palette (`Ctrl+.` / `Cmd+.`)

Hover over any flagged token (`editor: hover`) to read the rule details, estimated token count, and remediation guidance. Use Go-to-Definition (`F12` / `editor: go to definition`) on any existing local Markdown link, backtick path, or `@import` to jump straight to that file.

Place the cursor on a flagged line and press `Ctrl+.` (`editor: toggle code actions`) to apply a preferred autofix or insert a suppression comment:
- `agent-docs-lsp:ignore-next-line` (previous line)
- `agent-docs-lsp:ignore` (same line)

Supported comment formats: `<!-- ... -->` (Markdown) and `# ...` (`.rules` / `.cursorrules` / `.windsurfrules` / `.clinerules`).

### 3. CLI & Task Palette (`Alt+Shift+T`)

Run a one-shot check across files or directories from your terminal or CI:

```sh
agent-docs-lsp check
agent-docs-lsp check --json --max-tokens 2500 .
```

Exit codes: `0` = clean, `1` = findings detected, `2` = usage error / missing path.

Optionally bind it in `.zed/tasks.json` (when `agent-docs-lsp` is on `PATH`):

```json
[
  {
    "label": "agent-docs: Check workspace",
    "command": "agent-docs-lsp",
    "args": ["check", "$ZED_WORKTREE_ROOT"]
  },
  {
    "label": "agent-docs: Check current file",
    "command": "agent-docs-lsp",
    "args": ["check", "$ZED_FILE"]
  }
]
```

### 4. Built-in Rules

| Rule ID | Default Severity | Quick Fix | Description |
|---|---|---|---|
| `skill-missing-frontmatter` | `error` | Insert starter frontmatter | `SKILL.md` missing YAML frontmatter (`--- ... ---`) |
| `skill-invalid-frontmatter` | `error` | — | `SKILL.md` frontmatter is not valid YAML, or `name` / `description` is not a text value |
| `skill-missing-name` | `error` | — | `SKILL.md` frontmatter missing non-empty `name` |
| `skill-missing-description` | `error` | — | `SKILL.md` frontmatter missing non-empty `description` |
| `skill-name-mismatch` | `warning` | Sync `name:` to parent dir | `SKILL.md` `name` does not match its parent directory name |
| `skill-vague-description` | `warning` | — | `SKILL.md` `description` is shorter than 20 characters |
| `broken-file-ref` | `warning` | — | Relative Markdown link, backtick file path, or `@import` target does not exist |
| `circular-import` | `error` | — | `@relative/path.md` import points to itself or forms a cycle |
| `token-budget-exceeded` | `warning` | — | Estimated token count (`~chars/4`) exceeds `maxTokens` (default `3000`) |
| `local-absolute-path` | `warning` | — | Machine-specific home path (`C:\Users\...`, `/Users/...`, `/home/...`) hardcoded in shared docs (fenced code blocks excluded) |
| `empty-section` | `warning` | — | Markdown heading followed immediately by another heading or EOF with no body |

### 5. Workspace Configuration (`.zed/settings.json`)

```json
{
  "lsp": {
    "agent-docs-lsp": {
      "settings": {
        "disabledRules": [],
        "maxTokens": 3000,
        "ignorePaths": ["**/fixtures/**"],
        "maxFileSize": 1048576,
        "workspaceScan": {
          "enabled": false,
          "maxFiles": 5000
        }
      }
    }
  }
}
```

| Key | Type | Default | Description |
|---|---|---|---|
| `disabledRules` | `string[]` | `[]` | Rule IDs to suppress globally (e.g. `["empty-section", "token-budget-exceeded"]`) |
| `severity` | `"error"` \| `"warning"` \| `"information"` \| `"hint"` | *(per-rule default)* | Optional global severity override for all rules |
| `maxTokens` | `number` | `3000` | Estimated token threshold for `token-budget-exceeded` (`0` disables) |
| `ignorePaths` | `string[]` | `[]` | Extra glob patterns (relative to workspace root, or filename if no `/`) to skip |
| `maxFileSize` | `number` | `1048576` | Maximum file size in bytes (1 MiB default) |
| `workspaceScan.enabled` | `bool` | `false` | Scans non-ignored agent instruction files on startup and publishes diagnostics |
| `workspaceScan.maxFiles` | `number` | `5000` | Maximum files and directories visited during a workspace scan (symlinked directories are not followed) |

## Constraints

- **Static Analysis Only**: `agent-docs-lsp` validates instruction and skill files statically without invoking external LLMs or shell commands.
- **No Custom WebView / Global Commands**: `zed_extension_api = "0.7.0"` does not expose custom WebViews or arbitrary command registration; findings and quick fixes use standard LSP diagnostics, hover cards, go-to-definition, and `Ctrl+.` Code Actions.
- **WASI Sandbox (Tier 1/2)**: Extension host logic runs under `wasm32-wasip2` with `#![forbid(unsafe_code)]` and a single external parsing dependency (`saphyr-parser`, for YAML frontmatter) in `crates/agent-docs-core`.

## Installation (Dev Extension)

1. Build the local server binary (or place `agent-docs-lsp` on `PATH` / configure `lsp.agent-docs-lsp.binary.path` before the first release tag is published):
   ```sh
   cargo build --manifest-path crates/agent-docs-lsp/Cargo.toml --release
   ```
2. Open Zed Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) → **`zed: install dev extension`** → select this directory (`zed-agent-docs`).

## Development

```sh
cargo fmt --all -- --check                              # formatting check
cargo clippy --workspace --all-targets -- -D warnings   # lint check
cargo test --workspace                                  # unit & E2E tests
cargo build --target wasm32-wasip2 --release            # extension WASM build
```

- [`src/lib.rs`](src/lib.rs) — Tier 1 WASM boundary (`zed_extension_api::Extension` trait wiring).
- [`crates/agent-docs-core/`](crates/agent-docs-core/) — Tier 2 I/O-free linting engine and unit tests.
- [`crates/agent-docs-lsp/`](crates/agent-docs-lsp/) — Tier 3 native stdio LSP server, `check` CLI, and JSON-RPC E2E tests.

Architecture: [ARCHITECTURE.md](ARCHITECTURE.md) · Plan: [PLAN.md](PLAN.md) · Requirements: [REQUIREMENTS.md](REQUIREMENTS.md)

## License

MIT.
