# zed-workspace

Portable, named, version-controlled **workspace manifests for Zed** — plus an
MCP server that hands that workspace context to MCP-capable AI tools.

Zed already supports multi-root projects natively (`File > Add Folder to
Project`). What Zed has *no* equivalent of is VSCode's `.code-workspace` file:
a single, committable, shareable definition of a named multi-root workspace
with its settings, tasks, debug configs, and environment. That gap is what this
project fills.

---

## What this is — and is not

- **Is:** a `.zworkspace.toml` manifest format + a launcher (`zw`) that
  materializes it into Zed's per-root `.zed/` config, and an MCP server that
  exposes the manifest to AI tools.
- **Is not:** "multi-root support for Zed" — Zed has that. This adds the
  *persistent, on-disk, version-controlled* workspace definition Zed lacks.

### MCP vs ACP — they are different things

This project's server speaks **MCP** (Model Context Protocol — the agent↔tools
protocol). It is **not** an **ACP** (Agent Client Protocol — the editor↔agent
protocol) implementation. Zed's ACP layer *forwards* MCP servers configured in
`context_servers` to external agents; that is how an ACP-driven agent in Zed
ends up able to call this server's tools. But the server itself is a plain MCP
stdio server — usable by any MCP-capable client, not just Zed.

---

## Parity with VSCode `.code-workspace` — honest scorecard

| Capability | Status |
|---|---|
| Multi-root folder list, paths anywhere on disk | ✅ |
| Portable relative paths (`~`, `$VAR` expansion) | ✅ |
| Workspace-level settings overlay | ✅ |
| Per-folder settings (override workspace) | ✅ |
| Workspace tasks + per-folder tasks | ✅ |
| Debug launch configs (`.zed/debug.json`) | ✅ |
| Extension recommendations | ✅ (advisory — see below) |
| Workspace environment variables | ✅ |
| Cross-root search (for AI tools, via MCP) | ✅ |
| **UI-state persistence** (open files, layout restored per workspace) | ❌ Zed-owned — no API |
| **Per-workspace extension enable/disable** | ❌ Zed has no such concept |

**Realistic ceiling is ~90%.** The last ~10% (UI-state persistence,
per-workspace extension toggling) is managed internally by Zed with no file or
API a third-party tool can drive. Extension *recommendations* are emitted as
Zed's `auto_install_extensions` — that recommends installation, it does not
enforce per-workspace enable/disable.

---

## Components

| Crate | Binary | Role |
|---|---|---|
| `zworkspace-core` | — | Shared manifest schema + loader (one source of truth) |
| `zw-cli` | `zw` | Launcher — reads manifest, writes `.zed/` config, opens Zed |
| `zed-workspace-mcp` | `zed-workspace-mcp` | MCP server exposing workspace context |

---

## Install

```bash
git clone https://github.com/GQAdonis/zed-workspace
cd zed-workspace
./install.sh
```

Installs `zw` and `zed-workspace-mcp` to `~/.cargo/bin/`.

---

## Quick start

```bash
zw init                 # scaffold a .zworkspace.toml in the current directory
$EDITOR .zworkspace.toml
zw check .              # validate
zw open .               # write .zed/ config and open Zed
zw list                 # list workspaces in ~/.config/zed/workspaces/
```

---

## Workspace manifest (`.zworkspace.toml`)

```toml
[workspace]
name        = "prometheus-core"
description = "UAR · Flint Gate · Identity"
icon        = "🔥"

[[roots]]
path = "~/Projects/prometheus-uar"
name = "UAR"

[[roots.tasks]]                       # per-folder task — only in this root
label   = "test UAR"
command = "cargo test -p uar"

[[roots]]
path = "~/Projects/flint-gate"
name = "Flint Gate"

[zed]
theme          = "One Dark"
tab_size       = 4
format_on_save = "on"

[extensions]                          # advisory — emitted as auto_install_extensions
recommendations = ["tamasfe.even-better-toml"]

[[tasks]]                             # workspace-level task — written to every root
label   = "build all"
command = "cargo build --workspace"

[[debug]]                             # debug launch config — written to .zed/debug.json
label   = "Debug zw"
adapter = "lldb"
program = "$ZED_WORKTREE_ROOT/target/debug/zw"

[env]
RUST_LOG = "debug"

[mcp]
auto_start = true    # emit a context_servers stanza so Zed launches the MCP server
```

See `docs/WORKSPACE_FORMAT.md` for the full schema.

---

## What `zw open` does

1. Parses and validates `.zworkspace.toml`.
2. Resolves all root paths.
3. For **every** existing root, writes (deep-merged, never clobbering):
   - `.zed/settings.json` — workspace settings + that root's `[roots.zed]`
     override + a `context_servers` stanza for `zed-workspace-mcp`.
   - `.zed/tasks.json` — workspace tasks + that root's `[[roots.tasks]]`,
     merged by label so hand-written tasks survive.
   - `.zed/debug.json` — debug launch configs (if any).
4. Calls `zed --new-window <root1> <root2> ... <rootN>`.

The `zed-workspace-mcp` server is **not** spawned by `zw`. Zed owns its
lifecycle: it reads the `context_servers` stanza and launches the server over
stdio itself.

---

## MCP tools exposed by `zed-workspace-mcp`

| Tool | What it does |
|---|---|
| `workspace_info` | Manifest: name, roots, task count, env keys |
| `list_roots` | Resolved paths + existence for all roots |
| `find_files` | Cross-root glob search (respects `.gitignore`) |
| `read_file` | Read a file — **jailed to declared roots** |
| `grep` | Cross-root regex search (skips binaries, size-capped) |
| `list_tasks` | Workspace tasks |

### MCP resources

| URI | Content |
|---|---|
| `workspace://manifest` | Full manifest as JSON |
| `workspace://roots` | Resolved roots list |
| `workspace://tasks` | Task definitions |

These are **read-on-demand snapshots**. The server does not emit
`notifications/resources/updated` — clients should not assume live updates.

---

## Compatibility

`zed-workspace-mcp` speaks the MCP 2024-11-05 protocol over stdio. Any
MCP-capable client can use it:

- **Zed** — via `context_servers` in `.zed/settings.json` (written by `zw`).
  Zed forwards it to ACP-driven agents (Claude Agent, Codex, Gemini) in the
  session.
- **Claude Code** — add to `~/.claude/settings.json` → `mcpServers`.
- **Cursor / Windsurf / Codex** — any tool that reads a `.mcp.json` or
  equivalent MCP server config.

### Claude Code integration

```json
// ~/.claude/settings.json
{
  "mcpServers": {
    "zed-workspace-mcp": {
      "command": "zed-workspace-mcp",
      "args": ["--workspace", "prometheus-core",
               "--manifest", "/abs/path/to/prometheus-core.zworkspace.toml"]
    }
  }
}
```

`--manifest` is optional: when omitted, the server resolves the manifest by
`--workspace` name from `~/.config/zed/workspaces/`.

---

## Agent skill — `setup-zed-workspace`

This repo also ships an Agent Skill that bootstraps multi-tool workspace
support in *any* project: it scaffolds `.zworkspace.toml`, runs `zw` to write
`.zed/` config, and wires `zed-workspace-mcp` into Claude Code, OpenCode, and
generic `.mcp.json` clients, plus updates `AGENTS.md`.

- **Skill:** `skills/setup-zed-workspace/` (agentskills.io compliant)
- **Claude Code commands:** `/zw-setup`, `/zw-debug-config`, `/zw-debug-start`
- **OpenCode commands:** `.opencode/command/`
- **Plugin/marketplace:** `.claude-plugin/`

Install as a Claude Code plugin:

```
/plugin marketplace add GQAdonis/zed-workspace
/plugin install zed-workspace@zed-workspace
```

Honest scope: native slash commands for **Claude Code and OpenCode**; every
other MCP-capable tool (Cursor, Windsurf, Codex) gets the workspace via
`.mcp.json` and `AGENTS.md`. There is no universal slash-command standard.

See `skills/setup-zed-workspace/REGISTERING.md` for publishing instructions.

---

## Shell integration (optional)

```bash
# ~/.bashrc — jump to a named workspace
zwo() { zw open ~/.config/zed/workspaces/"${1}".zworkspace.toml; }

_zw_completions() {
    local ws_dir="$HOME/.config/zed/workspaces"
    COMPREPLY=($(compgen -W "$(ls "$ws_dir"/*.zworkspace.toml 2>/dev/null \
        | xargs -I{} basename {} .zworkspace.toml)" -- "${COMP_WORDS[COMP_CWORD]}"))
}
complete -F _zw_completions zwo
```
