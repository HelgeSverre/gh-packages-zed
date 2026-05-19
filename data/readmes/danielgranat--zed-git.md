# zed-branch-diff

A Zed editor extension for comparing branches locally — like reviewing a PR, but without leaving your editor.

## Why

Zed's built-in git UI is minimal. When you're working on a feature branch and want to review your changes before opening a PR — see what files changed, read diffs file-by-file, and jot down notes — you're forced to leave Zed and use GitHub's PR interface or a separate diff tool.

This extension brings that workflow into Zed through slash commands in the assistant panel. You can compare your current branch against any base branch, browse diffs, see summary stats, and save review notes — all without context-switching.

## Features

### `/branch-diff` — Compare branches

```
/branch-diff main                  # Summary: stats + changed files list
/branch-diff main --file src/lib.rs  # Diff for a single file
/branch-diff main --all             # Full unified diff of all changes
```

**Summary view** shows:
- Files changed, insertions, deletions
- Commit log between the branches
- Changed files table with status indicators (A/M/D/R/C)

**File diff** and **all diff** views render syntax-highlighted unified diffs with automatic truncation at 50,000 characters for large diffs.

### `/branch-review` — Review notes

```
/branch-review main                          # Full review view (stats + diff + notes prompt)
/branch-review main note src/lib.rs:42 Fix this  # Save a note at file:line
/branch-review main list                     # List all notes for this base branch
/branch-review main clear                    # Clear notes for this base branch
```

Notes are persisted to `.zed-review/notes.json` in your project root, grouped by file and filtered by base branch.

## Installation

### Prerequisites

- [Zed editor](https://zed.dev) (latest)
- Rust toolchain via [rustup](https://rustup.rs)
- The `wasm32-wasip1` target: `rustup target add wasm32-wasip1`

### Install as dev extension

1. Open Zed
2. Open Extensions panel: **Cmd+Shift+X**
3. Click **Install Dev Extension**
4. Select this project directory

Zed builds and loads the extension automatically. The slash commands become available immediately in the assistant panel.

### Build manually

```bash
cargo build --target wasm32-wasip1 --release
```

### Run tests

```bash
cargo test
```

Unit tests cover NUL-delimited parsing, trait-backed backend behavior, truncation safety, notes serialization, and command argument handling.

## Project structure

```
├── extension.toml       # Zed extension manifest
├── Cargo.toml           # Rust crate config (cdylib for WASM)
├── src/
│   ├── lib.rs           # Extension entry point, command dispatch, tab completion
│   ├── git.rs           # Git interaction layer (spawns git processes)
│   ├── commands.rs      # Slash command handlers + MarkdownBuilder
│   └── notes.rs         # Review notes storage (JSON file-backed)
└── .gitignore
```

| Module | Responsibility |
|--------|---------------|
| `lib.rs` | Registers the extension, routes slash commands, provides static branch completion |
| `git.rs` | `GitRepo` trait, `CliGitRepo` backend, `CommandRunner` for centralized git execution, NUL-delimited parser |
| `commands.rs` | Builds markdown output for each command mode via `&dyn GitRepo`, handles argument parsing and validation |
| `notes.rs` | `NotesStore` with save/list/clear/format, persisted to `.zed-review/notes.json` |

## Design decisions

### Slash commands, not panels

Zed's extension API (v0.7.0) does not support custom UI panels, webviews, or custom rendering. The only way an extension can present rich output is through **slash commands** that return markdown into the assistant panel. This is a platform constraint, not a choice — when Zed adds a panel API, this extension is architected to support it (git logic and formatting are cleanly separated).

### Trait-based git backend

Git operations are defined by a `GitRepo` trait with methods like `current_branch()`, `diff_stats()`, `changed_files()`, etc. The production implementation (`CliGitRepo`) delegates to a centralized `CommandRunner` that owns the git binary path, environment, and working directory — standardizing command construction and error formatting in one place. This boundary makes the git layer testable via mock implementations without spawning subprocesses.

### Shelling out to git

The extension spawns `git` processes via `std::process::Command` through WASI. This works because Zed extensions compile to `wasm32-wasip2` which supports process spawning. The alternative — embedding a git library in WASM — would massively increase binary size for no practical benefit.

### NUL-safe parsing

Changed-file detection uses `git diff --name-status -z`, which outputs NUL-delimited records instead of newline-delimited text. This avoids fragile line/tab splitting and correctly handles unusual file names (spaces, tabs, newlines, unicode). The `parse_name_status_nul` parser handles normal entries (A/M/D), rename/copy triplets (R/C with old and new paths), and tolerates malformed records defensively.

### MarkdownBuilder

Rather than ad-hoc string concatenation, a `MarkdownBuilder` struct provides methods like `push_header`, `push_stats`, `push_commits`, `push_changed_files`, and `push_diff_block`. This ensures consistent formatting across all command outputs and makes it easy to compose views.

### UTF-8 safe truncation

Large diffs are truncated at 50,000 characters. The `safe_truncate` function walks backward from the cut point to find a valid UTF-8 character boundary, preventing panics on multi-byte characters.

### Notes stored as JSON

Review notes go to `.zed-review/notes.json` — a simple, human-readable format. Notes are filtered by base branch so switching between reviews doesn't mix comments. Add `.zed-review/` to your `.gitignore`.

### Static tab completion

`complete_slash_command_argument` doesn't receive a `Worktree` reference in the current API, so we can't query actual git branches for completion. The extension returns static suggestions (main, master, develop, staging). This is documented as a known limitation to revisit when the API evolves.

## Known limitations

- **Tab completion is static** — can't query real branches (API limitation)
- **No custom UI** — output goes to the assistant panel as markdown (API limitation)
- **No file locking on notes** — concurrent saves could corrupt the JSON file (unlikely in practice)
- **Branch validation is basic** — checks for empty, spaces, and `..` but not all git refspec edge cases

## Possible next steps

- **Dynamic branch completion** — when Zed's API passes `Worktree` to completion, query `git branch` for real branch names
- **Custom panel UI** — when Zed adds panel/webview support, build a dedicated diff viewer with side-by-side view, syntax highlighting, and inline commenting
- **Diff navigation** — jump-to-file from the changed files list
- **Hunk-level review** — split diffs into reviewable hunks with individual accept/reject
- **Export notes** — generate PR description or review comments from saved notes
- **Integration with GitHub/GitLab** — push notes as PR comments

## How this was built

This extension was built using **[Claude Code](https://claude.ai/code)** (Anthropic's CLI for Claude) with the **[Babysitter](https://github.com/a5c-ai/babysitter)** orchestration plugin.

### The process

1. **Interview phase** — Claude Code researched the Zed extension API, identified constraints (no panel API, WASM target, slash commands only), and discussed approach options with the developer
2. **Process creation** — Babysitter created a 6-phase orchestration process:
   - Phase 1: Project scaffolding (Cargo.toml, extension.toml, module structure)
   - Phase 2: Core git logic (GitContext, diff parsing, command execution)
   - Phase 3: Slash command handlers (argument parsing, markdown output)
   - Phase 4: Review notes system (persistence, filtering, formatting)
   - Phase 5: Quality convergence loop (iterative assessment and refinement)
   - Phase 6: Final build verification and review
3. **Quality convergence** — An automated quality loop ran 5 iterations, with an AI reviewer scoring the code and identifying issues at each step:
   - Iteration 1: **72/100** — Fixed empty validation, rename parsing, added truncation
   - Iteration 2: **80/100** — Fixed UTF-8 safety, added flag validation, wrote 28 tests
   - Iteration 3: **84/100** — Deduplicated parsing, extracted MarkdownBuilder, added Unknown status
   - Iteration 4: **86/100** — Shared diff stat parser, branch validation, encapsulation fixes
   - Iteration 5: **88/100** — Minor consistency and validation improvements
4. **Final review** — Comprehensive code review confirmed all features working, tests passing, clean WASM build
5. **Architecture refactor** — A follow-up refactor aligned the git layer with Zed's engineering philosophy: introduced `GitRepo` trait boundary, centralized `CommandRunner`, NUL-safe `-z` parsing, and expanded test coverage to 59 tests

### Tools

- **Claude Code** — AI-powered coding assistant that wrote and iteratively refined all source code
- **Babysitter SDK** — Event-sourced process orchestration that managed the multi-phase development workflow with quality gates
- **Rust + wasm32-wasip2** — Extension compiled to WebAssembly for the Zed runtime
- **zed_extension_api 0.7.0** — Zed's official extension SDK

## License

MIT
