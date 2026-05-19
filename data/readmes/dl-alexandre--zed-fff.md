# zed-fff

Thin Zed MCP extension for [`fff`](https://github.com/dmtrKovalenko/fff).

This extension does not implement file search. It registers an `fff` context server in Zed and launches the existing `fff-mcp` binary so Zed Agent Panel can use `fffind`, `ffgrep`, and `fff-multi-grep`.

## Scope

This extension intentionally does not implement file search.

It only teaches Zed how to launch `fff-mcp`. All ranking, indexing, fuzzy matching, git annotations, and grep behavior belong to upstream `fff`.

## Requirements

Install `fff-mcp` and make it available on Zed's PATH:

```sh
curl -fsSL https://raw.githubusercontent.com/dmtrKovalenko/fff.nvim/main/install-mcp.sh | bash
```

If the binary is installed elsewhere, configure its absolute path.

Install order:

1. Install fff / fff-mcp first.
2. Install zed-fff second.
3. Configure a command override only if fff-mcp is not on PATH.

This extension does not currently download or install `fff-mcp`.

## Zed Settings

Minimal configuration when `fff-mcp` is already on PATH:

```json
{
  "context_servers": {
    "fff": {
      "settings": {
        "fff_binary_path": "fff-mcp",
        "base_path": null,
        "frecency_db": null,
        "history_db": null,
        "log_file": null,
        "log_level": "info",
        "no_update_check": false,
        "no_warmup": false,
        "max_cached_files": null
      }
    }
  }
}
```

Absolute binary path through this extension's typed settings:

```json
{
  "context_servers": {
    "fff": {
      "settings": {
        "fff_binary_path": "/home/alexandre/.local/bin/fff-mcp"
      }
    }
  }
}
```

Zed's standard context server `command` override is also supported and takes precedence over `settings.fff_binary_path`:

```json
{
  "context_servers": {
    "fff": {
      "command": {
        "path": "/home/alexandre/.local/bin/fff-mcp"
      }
    }
  }
}
```

Explicit project root:

```json
{
  "context_servers": {
    "fff": {
      "settings": {
        "base_path": "/absolute/path/to/project"
      }
    }
  }
}
```

`base_path` is optional. Leave it `null` to let `fff-mcp` use its launch working directory, or set it to an absolute project path to force the indexed root.

See [examples/settings-on-path.json](examples/settings-on-path.json), [examples/settings-absolute-binary.json](examples/settings-absolute-binary.json), and [examples/settings-explicit-root.json](examples/settings-explicit-root.json) for copyable settings blocks.

## Project Root Behavior

As of `zed_extension_api` `0.7.0`, `context_server_command` receives a `Project`, but `Project` only exposes worktree IDs. The root path is available on `Worktree`, but this MCP hook does not receive `Worktree` handles.

That means this extension cannot currently derive the workspace root directly in Rust. In local dev-extension testing on Zed `0.233.7`, Zed launched `fff-mcp` with the project directory as the process working directory for a single-worktree project, so `fff-mcp` used that root implicitly. If that does not match your setup, or if you use multiple worktrees, set `settings.base_path` explicitly.

## Troubleshooting

| Symptom | Likely Cause | Fix |
| --- | --- | --- |
| Dev extension install fails with `failed to run rustup target add` | Rust was installed through the OS package manager, not `rustup` | Install Rust through `rustup`, add `wasm32-wasip2`, then restart Zed from an environment where `rustup` is on PATH |
| Zed reports `Could not run fff-mcp --version` | `fff-mcp` is not on Zed's PATH | Install `fff-mcp`, restart Zed, or set `settings.fff_binary_path` to an absolute path |
| Zed reports a `process:exec` capability error | Extension process execution is restricted | Allow this extension to run `* --version`, or remove custom `granted_extension_capabilities` restrictions |
| Search results come from the wrong directory | Zed launched the MCP server with an unexpected working directory | Set `settings.base_path` to the absolute project root |
| Git annotations are missing | `base_path` is not inside a Git repository, or Git metadata is unavailable | Point `base_path` at the repo root and run `fff-mcp --healthcheck /path/to/repo` |
| The server starts but tools are unavailable | Zed Agent Panel did not activate the context server | Check Agent Panel context server settings and Zed logs |

## Screenshots

Screenshots and GIFs should be captured after real Zed dev-extension testing and stored in [docs/assets](docs/assets/).

Required release evidence:

1. Agent Panel showing the active `FFF` context server.
2. Agent tool list showing `fffind`, `ffgrep`, and `fff-multi-grep`.
3. Successful file or grep lookup through the Zed Agent Panel.

## Development

```sh
rustup target add wasm32-wasip2
cargo check --target wasm32-wasip2
```

Then install this directory as a Zed dev extension with `zed: install dev extension`.

Use the full [dev extension acceptance checklist](docs/dev-extension-acceptance.md) before cutting a release.

Short manual acceptance test:

1. Run `fff-mcp --healthcheck /absolute/path/to/project`.
2. In Zed, run `zed: install dev extension` and select this repository.
3. Open Agent Panel settings and confirm the `FFF` context server is active.
4. Ask the agent to use `fffind`, `ffgrep`, or `fff-multi-grep`.
5. If activation fails, open `zed: open log` and compare the error with the troubleshooting table above.
