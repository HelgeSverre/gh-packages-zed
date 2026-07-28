# zed_odin_template

A starting point for Odin projects in the Zed editor. One task to compile and
run, clickable compiler errors, autocomplete via OLS, and a debugger.

## Requirements

- [Odin](https://odin-lang.org/docs/install/) on your `PATH`
- Zed with the **Odin** extension installed

The extension is a manual step and nothing in this repo can install it for you.
Open the command palette, run `zed: extensions`, search for Odin, install it.
It pulls down OLS automatically, so you do not need to build OLS yourself.

Without the extension there is no autocomplete, no go-to-definition, and no
syntax highlighting. The build still works.

## Quick start

```sh
./build.sh          # debug build
./build.sh release  # optimized build
./build/debug/app
```

In Zed, open the command palette and run `task: spawn`, then pick
**odin: build & run**.

## Tasks

| Task | What it does |
| --- | --- |
| `odin: build & run` | debug build, then runs the binary |
| `odin: build (debug)` | `-debug -o:none` |
| `odin: build (release)` | `-o:speed -no-bounds-check` |
| `odin: check` | type check without producing a binary |
| `odin: test` | runs every `@(test)` proc in `src` |

To bind the first one to a key, add this to your own
`~/.config/zed/keymap.json`. It does not belong in this repo.

```json
[
    {
        "context": "Workspace",
        "bindings": {
            "cmd-b": ["task::Spawn", { "task_name": "odin: build & run" }]
        }
    }
]
```

## Debugging

`.zed/debug.json` defines a CodeLLDB launch config pointing at
`build/debug/app`.

**Run a debug build first.** The config has no build step wired to it, so it
launches whatever binary is currently at that path. On a fresh clone that path
does not exist yet and the debugger will fail to start.

## Layout

```
build.sh            build script, rewrites compiler errors for Zed
ols.json            language server settings
odinfmt.json        formatter settings, applied on save
src/                your code
.zed/tasks.json     build and run tasks
.zed/settings.json  editor and LSP settings for this project
.zed/debug.json     debugger launch config
```

`build/` is generated and gitignored.

## Why build.sh exists

Odin reports errors as `path/main.odin(12:5)`. Zed's terminal only turns
`path/file.odin:12:5` into a clickable link. `build.sh` pipes the compiler
through `sed` to rewrite the first form into the second. That is the whole
reason it is not just a bare `odin build` in the task.

## Making it yours

- `src/main.odin` declares `package main`. Odin does not require the package
  name to match the directory, so you can rename it or leave it.
- The output binary is named `app`, and that name appears in `build.sh`,
  `.zed/tasks.json`, and `.zed/debug.json`. Change all three together or the
  debugger will launch a stale binary.
- `src/main_test.odin` is an example test showing how the `odin: test` task is
  wired. Delete it once you have real tests.

## Versions

Built and verified against:

| | |
| --- | --- |
| Odin | `dev-2026-07:301c287de` |
| Zed | 1.12.1 |
| Zed Odin extension | 0.3.15 |

Odin dev builds move quickly. If something breaks on a much newer compiler,
that is the first thing to check.
