# zed-toc

`zed-toc` is a small Rust CLI that generates and updates a managed Markdown table of contents block.

It is designed to work well with Zed: install the binary once, add a global Zed task, and run it on the currently active Markdown tab through `$ZED_FILE`.

## Features

- updates Markdown files in place
- ignores the first document H1
- includes H2-H6 headings
- skips fenced code blocks
- handles duplicate anchors in a GitHub-style way
- inserts the TOC after front matter and the first H1 when markers are missing

## Installation

Install it with Cargo:

```bash
cargo install --git https://github.com/anto6715/zed-toc.git
```

If the file already contains a managed TOC block, it is replaced. If not, `zed-toc` inserts one automatically.

After installation, you do not need to keep this repository open in Zed.

## Use in Zed

This is the recommended setup.

### 1. Install the binary

```bash
cargo install --git https://github.com/anto6715/zed-toc.git
```

If Zed does not find `zed-toc` after installation, restart Zed so it reloads your shell environment.

### 2. Add a global Zed task

In Zed, run `zed: open tasks` and paste the content of `docs/zed-tasks.global.json` into your global `tasks.json`:

```json
[
  {
    "label": "Update Markdown TOC",
    "command": "zed-toc \"$ZED_FILE\"",
    "cwd": "$ZED_WORKTREE_ROOT",
    "use_new_terminal": false,
    "allow_concurrent_runs": true,
    "reveal": "no_focus",
    "hide": "on_success",
    "save": "current"
  }
]
```

This setup is global: it works in any project and does not depend on this repo clone.

### 3. Add a shortcut

Open your Zed `keymap.json` and merge `docs/zed-keymap.example.json`:

```json
{
  "context": "Workspace",
  "bindings": {
    "alt-shift-t": ["task::Spawn", { "task_name": "Update Markdown TOC" }]
  }
}
```

### 4. Use it

Open any Markdown file in Zed and press `Alt-Shift-T`.

The task will:

- save the current buffer
- run `zed-toc` on the active file
- update or insert the managed TOC block
- hide the task terminal on success

## CLI usage

You can also run the tool directly:

```bash
zed-toc README.md
```

To verify a file without modifying it:

```bash
zed-toc --check README.md
```

`--check` exits with a non-zero status if the managed TOC would change.

Example managed block:

```md
<!-- toc:start -->
## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Use in Zed](#use-in-zed)
  - [1. Install the binary](#1-install-the-binary)
  - [2. Add a global Zed task](#2-add-a-global-zed-task)
  - [3. Add a shortcut](#3-add-a-shortcut)
  - [4. Use it](#4-use-it)
- [CLI usage](#cli-usage)
- [Development setup](#development-setup)
- [How it works](#how-it-works)
- [Development](#development)
- [Changelog](#changelog)
- [License](#license)
<!-- toc:end -->
```

## Development setup

If you are working on `zed-toc` itself, this repo also includes a local development task in `.zed/tasks.json` that runs:

```bash
cargo run --quiet -- "$ZED_FILE"
```

That local task is for contributors. Regular users should prefer the global `zed-toc "$ZED_FILE"` task above.

## How it works

`zed-toc` scans the Markdown document and:

- ignores the first H1, which is usually the README title
- collects H2-H6 headings
- removes punctuation from anchors
- collapses spaces into `-`
- appends `-1`, `-2`, and so on for duplicate headings

When markers are missing, it inserts the managed block:

- after YAML front matter, if present
- then after the first H1 and its following blank line
- otherwise near the top of the file

## Development

Run the checks locally:

```bash
cargo fmt --check
cargo test
```

## Changelog

This repo uses Towncrier for release notes. The configuration lives in `Cargo.toml`, the template lives in `changes.d/changelog_template.jinja`, and generated output is written to `CHANGES.md`.

Because the config is in `Cargo.toml`, always pass `--config Cargo.toml` when running Towncrier.

### Add a fragment

Create a fragment in `changes.d/` using one of the configured types:

- `changes.d/123.feat.md` for user-visible enhancements
- `changes.d/123.bugfix.md` for fixes
- `changes.d/123.break.md` for breaking changes

If there is no issue or PR number yet, use a descriptive orphan name such as `changes.d/+check.feat.md`.

Example:

```md
Add a `--check` mode so CI can verify whether a TOC is current without rewriting the file.
```

### Preview the next release notes

Render a draft without modifying `CHANGES.md`:

```bash
towncrier build --draft --config Cargo.toml --version 0.2.0 --date 2026-04-07
```

### Generate the final changelog entry

Write the release notes into `CHANGES.md`:

```bash
towncrier build --config Cargo.toml --version 0.2.0 --date 2026-04-07
```

Towncrier removes used fragments after a normal build. Use `--keep` if you want to inspect the generated output before deleting the fragment files.

## License

This project is released under the MIT License. See `LICENSE`.
