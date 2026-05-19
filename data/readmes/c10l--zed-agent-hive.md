# Agent Hive - Zed Extension

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

**From Vibe Coding to Hive Coding** — Plan-first AI development workflow for Zed.

## Overview

This Zed extension integrates [Agent Hive](https://github.com/c10l/hive-mcp) into Zed's AI Assistant Panel via MCP (Model Context Protocol). It enables:

- **Plan-first development** — AI writes plans, you review, then it executes
- **Task isolation** — Each task runs in its own git worktree
- **Context persistence** — Research and decisions saved across sessions
- **18 MCP tools** — Features, plans, tasks, worktrees, merges, skills

## Components

This repository contains the **Zed extension** (compiled to WebAssembly). The MCP server is a separate project:

| Component | Repository | Purpose |
|-----------|------------|---------|
| **Zed Extension** | `c10l/zed-agent-hive` (this repo) | WASM shim: context server registration + slash commands |
| **MCP Server** | [`c10l/hive-mcp`](https://github.com/c10l/hive-mcp) | Native binary: 18 tools, filesystem I/O, git operations |

## Installation

### Prerequisites

1. Build and install the [hive-mcp](https://github.com/c10l/hive-mcp) server binary
2. Ensure `hive-mcp` is on your `PATH`

### From Zed Extensions (when published)

1. Open Zed
2. Run `zed: extensions` command
3. Search for "Agent Hive"
4. Click Install

### Dev Extension (development)

```bash
# Clone and build
git clone https://github.com/c10l/zed-agent-hive.git
cd zed-agent-hive

# Build WASM extension (requires wasm32-wasip2 target)
rustup target add wasm32-wasip2
cargo build --release --target wasm32-wasip2

# Install as dev extension in Zed
# In Zed: zed: install dev extension → select this directory
```

## Features

### Slash Commands

Quick actions in Zed's Assistant Panel:

```
/hive-status                Show all features and progress
/hive-feature <name>        Create a new feature
/hive-plan <read|approve>   Read or approve current plan
/hive-task <list|sync>      Manage tasks
```

### MCP Tools (via hive-mcp server)

The extension launches [hive-mcp](https://github.com/c10l/hive-mcp) as a context server, providing 18 tools to the AI assistant:

#### Feature Management
| Tool | Description |
|------|-------------|
| `hive_feature_create` | Create a new feature workspace |
| `hive_feature_complete` | Mark feature as completed |

#### Plan Management
| Tool | Description |
|------|-------------|
| `hive_plan_write` | Write/update plan.md |
| `hive_plan_read` | Read plan and comments |
| `hive_plan_approve` | Approve plan for execution |

#### Task Management
| Tool | Description |
|------|-------------|
| `hive_tasks_sync` | Generate tasks from plan |
| `hive_task_create` | Create manual task |
| `hive_task_update` | Update task status |

#### Worktree Operations
| Tool | Description |
|------|-------------|
| `hive_worktree_start` | Create isolated worktree |
| `hive_worktree_create` | Resume blocked task |
| `hive_worktree_commit` | Commit changes |
| `hive_worktree_discard` | Discard worktree |

#### Integration
| Tool | Description |
|------|-------------|
| `hive_merge` | Merge task branch |
| `hive_context_write` | Write context file |
| `hive_status` | Get feature status |
| `hive_skill` | Load skill instructions |
| `hive_agents_md` | Manage AGENTS.md |

## Usage

### Quick Start

1. **Create a feature**: `/hive-feature my-feature`
2. **Write a plan**: AI uses `hive_plan_write` tool
3. **Review**: Open `.hive/features/my-feature/plan.md`
4. **Approve**: `/hive-plan approve`
5. **Execute**: AI uses worktree tools for task isolation

## Project Structure

```
zed-agent-hive/
├── extension.toml      # Zed extension manifest
├── Cargo.toml          # Rust dependencies (zed_extension_api only)
├── extension/
│   └── src/
│       └── lib.rs      # WASM extension: context_server_command + slash commands
├── icon.svg            # Honeycomb icon
├── LICENSE             # AGPL-3.0
└── README.md
```

## Requirements

- **Zed** v0.160.0 or later
- **Rust** with `wasm32-wasip2` target (for building)
- **hive-mcp** binary on PATH (runtime dependency)
- **Git** (for worktree operations)

## Publishing

To publish to the Zed extension registry:

1. Fork [zed-industries/extensions](https://github.com/zed-industries/extensions)
2. Add as submodule: `git submodule add https://github.com/c10l/zed-agent-hive.git extensions/agent-hive`
3. Update `extensions.toml`
4. Open a pull request

## Related Projects

- [hive-mcp](https://github.com/c10l/hive-mcp) — MCP server with 18 tools
- [Agent Hive](https://github.com/tctinh/agent-hive) — Main project with VS Code extension
- [Zed](https://zed.dev) — High-performance code editor

## License

AGPL-3.0 — See [LICENSE](LICENSE) for details.
