# zed-remote-open

[![demo](https://raw.githubusercontent.com/McNull/zed-remote-open/refs/heads/main/demo.gif)](https://raw.githubusercontent.com/McNull/zed-remote-open/refs/heads/main/demo.gif)

```sh
ssh myhost
cd /some/project
zed-open .
```

A small tool to open Zed from a remote SSH session, similar to VS Code's remote terminal open flow.
It runs a localhost REST service on your local machine, receives a request through SSH reverse forwarding, and launches Zed locally with a native `ssh://...` URL.

This is a workaround for the VS Code-style remote-terminal-open flow, not a Zed extension and not a replacement for Zed's built-in remote development.

## Installation

### Linux/macOS

Install via the provided script:

```sh
curl -fsSL https://raw.githubusercontent.com/McNull/zed-remote-open/main/scripts/install.sh | bash
```

### Go

If you already have Go installed, build and install it directly:

```sh
go install github.com/mcnull/zed-remote-open/cmd/zed-remote-open@latest
```

Then make sure your Go bin directory is on `PATH`, for example:

```sh
export PATH="$(go env GOPATH)/bin:$PATH"
```

Or run it without installing globally:

```sh
go run github.com/mcnull/zed-remote-open/cmd/zed-remote-open@latest --help
```

## How it works

1. A local user service runs `zed-remote-open serve` on `127.0.0.1:17342` by default.
2. Your SSH config adds a `RemoteForward` back to that local port.
3. A remote shell function named `zed-open()` posts JSON to `http://127.0.0.1:17342/api/open` through the tunnel.
4. The local service validates the request and runs Zed with the requested `ssh://user@host/abs/path` URL.

## Commands

```sh
zed-remote-open serve [--host/-H <host>] [--port/-p <port>] [--ssh-config <path>] [--zed <path-or-command>]
zed-remote-open add [--port/-p <port>] [--ssh-config <path>] <remote-ssh>
zed-remote-open install [--host/-H <host>] [--port/-p <port>] [--ssh-config <path>] [--zed <path-or-command>]
zed-remote-open uninstall [--ssh-config <path>]
zed-remote-open print-shell [--host/-H <host>] [--port/-p <port>]
```

Help is shown for `-h`, `--help`, missing commands, unknown commands, and invalid args.

## Zed executable lookup

The service resolves Zed at startup unless `--zed` is supplied.

Supported lookup order:
- explicit `--zed <path-or-command>`
- `zed`
- `zeditor`
- `zed.exe` on Windows

If nothing is found, the service fails fast with a clear error.

## SSH config strategy

The SSH config manager lives in `internal/sshcfg` and is intentionally small.

It uses a conservative line-based rewrite strategy:
- preserves unrelated config as much as practical
- adds a managed block with clear markers
- updates only the managed forward for the target host
- removes only blocks it owns
- is idempotent

Example managed config:

```sshconfig
Host myhost
  User me
  # zed-remote-open: begin
  # zed-remote-open: reverse forward for local REST opener
  RemoteForward 127.0.0.1:17342 127.0.0.1:17342
  # zed-remote-open: end
```

### Library evaluation

I looked at the common Go SSH config parsers first, including:
- `github.com/kevinburke/ssh_config`
- `github.com/petems/go-sshconfig`
- `github.com/jamesits/sshconf`

For this tool, a tiny purpose-built editor was the lazy choice:
- the task needs conservative writes, comments preserved, and idempotent updates
- a full parser/normalizer is more code than needed here
- the managed block format is simple and easy to test

So the implementation uses a small internal package instead of an extra dependency.

## Install

`install` writes a user-level startup artifact for the current platform.

### macOS

Writes a LaunchAgent plist under:

```text
~/Library/LaunchAgents/com.mcnull.zed-remote-open.plist
```

Example generated command:

```sh
zed-remote-open serve --host 127.0.0.1 --port 17342
```

### Linux

Writes a user systemd unit under:

```text
~/.config/systemd/user/zed-remote-open.service
```

Example unit:

```ini
[Unit]
Description=zed-remote-open
After=network.target

[Service]
ExecStart=/path/to/zed-remote-open serve --host 127.0.0.1 --port 17342
Restart=on-failure

[Install]
WantedBy=default.target
```

### Windows

Writes a user Startup-folder `.cmd` file under the roaming AppData Startup path.

Example:

```bat
@echo off
start "zed-remote-open" /min "C:\path\to\zed-remote-open.exe" serve --host 127.0.0.1 --port 17342
```

## Shell snippet

`print-shell` prints snippets for bash, zsh, and PowerShell.

Example bash/zsh flow:

```sh
zed-open() {
  local target="${1:-.}"
  local abs=""
  if command -v realpath >/dev/null 2>&1; then
    abs="$(realpath "$target" 2>/dev/null || realpath -m "$target" 2>/dev/null)"
  fi
  if [ -z "$abs" ]; then
    if [ -d "$target" ]; then
      abs="$(cd "$target" 2>/dev/null && pwd -P)"
    else
      abs="$(cd "$(dirname "$target")" 2>/dev/null && printf '%s/%s' "$(pwd -P)" "$(basename "$target")")"
    fi
  fi
  local ssh_host="${ZED_SSH_HOST:-}"
  if [ -z "$ssh_host" ]; then
    ssh_host="$(hostname -f 2>/dev/null || hostname 2>/dev/null || printf '%s' "$HOSTNAME")"
  fi
  local ssh_user="${ZED_SSH_USER:-$(whoami)}"
  local url="ssh://${ssh_user}@${ssh_host}${abs}"
  url=${url//\\/\\\\}
  url=${url//\"/\\\"}
  curl -fsS -H 'Content-Type: application/json' --data "{\"url\":\"$url\"}" "http://127.0.0.1:17342/api/open"
}
```

## Typical setup

### 1. Install the local service

```sh
zed-remote-open install
```

### 2. Add the SSH reverse forward

```sh
zed-remote-open add myhost
# or: zed-remote-open add me@myhost
```

### 3. Print the shell snippet and paste it into your remote shell profile

```sh
zed-remote-open print-shell
```

### 4. SSH in and open a path

```sh
ssh myhost
cd ~/src/project
zed-open .
```

## REST API

All endpoints are under `/api`.

### `GET /api/healthz`

```json
{ "ok": true }
```

### `POST /api/open`

Request:

```json
{ "url": "ssh://user@host/abs/path" }
```

Success:

```json
{ "ok": true, "message": "opened", "url": "ssh://user@host/abs/path" }
```

Errors use structured codes such as:
- `invalid_json`
- `missing_url`
- `invalid_url_scheme`
- `zed_not_found`
- `launch_failed`
- `internal_error`

## Security notes

- binds to `127.0.0.1` by default
- accepts only `ssh://` URLs
- limits request size
- uses direct process execution, not `sh -c`
- logs invalid requests conservatively

## Troubleshooting

- **No Zed executable found**: install Zed or pass `--zed /full/path/to/zed`
- **Remote shell cannot reach the API**: check the SSH `RemoteForward`
- **Open fails with launch error**: verify the local Zed command works from a terminal
- **Config not updated**: use `--ssh-config <path>` to point at a test file first

## Known limitations

- This is intentionally a small workaround, not a full remote-development system.
- SSH include-tree rewriting is conservative and does not try to normalize arbitrary config layouts.
- Windows startup support is user-scoped and intentionally simple.

## Development

Tests are written and run with the standard library only.

```sh
go test ./...
```

## License

Not set in this repo yet.
