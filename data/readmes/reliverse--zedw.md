# zedw

Zed Workspaces: a private TS DSL compiled into portable v0 IR and executed through the Zed CLI.

`zedw` resolves host-specific locations, opens projects/presets, records receipts, and generates Linux Cinnamon or Windows launchers without moving domain logic into shell scripts.

## Validate the workspace

```bash
bun run check
```

The root shortcut for the CLI is:

```bash
bun run zedw -- <command>
```

After installing globally, use `zedw <command>` directly.

## Core commands

```bash
zedw list projects
zedw list presets
zedw plan preset main
zedw open preset main
zedw open api web
zedw open @main
zedw doctor
zedw compile
```

`plan` and `--dry-run` never launch Zed or create receipts.

Host-scoped projects that are unavailable on the current machine are reported as structured skips. For example, a Linux preset can open all remote projects while reporting a Windows-only project as unavailable. A partial receipt containing only expected `NO_LOCATION_FOR_HOST` skips exits successfully; real launch failures and cancellations return a failing process code.

## Private SOT

The default is the repository-relative directory:

```text
<cwd>/.private/zedw
```

Resolution precedence:

1. `--sot` or `--home`
2. `ZEDW_SOT`
3. `~/.config/zedw/config.json` on Linux, or the matching AppData config on Windows
4. upward discovery of `.private/zedw/zedw.ts`
5. `<cwd>/.private/zedw`

Persist an override:

```bash
zedw config set-sot /absolute/path/to/.private/zedw
```

Recommended layout:

```text
.private/zedw/
├── zedw.ts
├── hosts/
├── roots/
├── projects/
├── presets/
├── sessions/       # machine-local
├── receipts/       # machine-local
└── generated/      # launchers and compiled IR
```

## Terminal UI

```bash
zedw ui
zedw ui --show-hidden
zedw ui --session <session-id>
```

Inside the picker:

```text
:recent   show recent receipts
:receipt  inspect a receipt
:retry    retry failed projects
:hidden   show or hide hidden projects
:session  inspect the active session
:cleanup  apply retention cleanup
:help     show picker help
:quit     close the picker
```

Selections accept numeric keys, project ids, comma/space-separated groups, or `@preset`.

## Guards and sessions

- `normal`: opens without confirmation.
- `careful`: confirms once per session in the terminal UI.
- `danger`: confirms for every open in the terminal UI.
- `hidden`: requires a typed unlock once per session in the terminal UI, independently of its risk level.

Direct CLI `open` and `retry` commands approve guards by default, so scripts and one-line launches do not stop for prompts. Pass `--confirm` when you explicitly want the CLI to ask. `--yes` remains an explicit prompt bypass and wins over `--confirm`. Guard decisions and hidden unlocks remain visible in session state and receipts.

```bash
zedw open api web                  # no prompts
zedw open api --confirm            # asks interactively
zedw sessions recent
zedw open docs --session <session-id>
```

## Receipts, failures, and retry

Every real open attempt writes `zedw.receipt.v0` under `receipts/`. Process exits, spawn failures, guard cancellations, and host-unavailable projects use structured failure codes.

```bash
zedw recent
zedw receipt latest
zedw receipt <receipt-id>
zedw retry latest
zedw retry <receipt-id>
zedw retry --interactive
```

Retry opens only failed projects. Successful and host-skipped operations are not repeated.

Runtime JSON writes are atomic. Corrupt or interrupted local state files are ignored by history listing and reported by `doctor` instead of crashing the UI.

## Retention

```bash
zedw cleanup
zedw cleanup --interactive
zedw cleanup --max-receipts 100 --max-sessions 50 --max-age-days 30
```

Default retention keeps 100 receipts, 50 unreferenced sessions, and state not older than 30 days. Sessions referenced by retained receipts are preserved. Cleanup launched inside the terminal UI also preserves its active session.

## Linux Mint Cinnamon

Install the main picker and one launcher per preset:

```bash
zedw install desktop
```

Install only preset launchers:

```bash
zedw install presets
```

The default destination is `${XDG_DATA_HOME:-~/.local/share}/applications`.

The main Cinnamon launcher includes actions for recent receipts, interactive retry, and cleanup. These actions remain inside the session-aware terminal UI, so their output does not flash and disappear. Generated launchers delegate to the portable TypeScript core and are independent of X11 versus Wayland.

Overrides:

```bash
zedw install desktop \
  --desktop-dir /custom/applications \
  --launcher-command /absolute/path/to/zedw
```

Without `--launcher-command`, `zedw` materializes a local executable wrapper under `.private/zedw/generated/bin/zedw`.

## Windows bridge

```bash
zedw install windows
zedw install windows --output-dir .private/zedw/generated/windows
```

The generated bridge contains:

- `zedw.cmd`, which launches the portable Bun/TypeScript CLI;
- `zedw.vbs`, which opens the terminal UI without an extra console window;
- `install-shortcuts.ps1`, which creates the main and preset `.lnk` shortcuts;
- `windows-install.json`, the materialization manifest.

# Contributing

Thanks for your interest in contributing to zedw.

## Development

Install dependencies with Bun, then run the full check suite:

```bash
bun install
bun check
```

Useful shortcuts:

```bash
bun typecheck
bun lint
bun test
```

## Workspace rules

- Bun workspaces and Bun catalogs.
- No root `tsconfig.json`.
- Reusable TypeScript configuration lives in `packages/tsconfig`.
- Default private SOT: `<cwd>/.private/zedw`.
- Active schemas stay on `v0` while `zedw` is pre-1.0.

## Pull requests

- Keep changes focused and small when possible.
- Add or update tests for behavior changes.
- Do not commit private SOT data, local receipts, generated launchers, or machine-specific configuration.
- Run `bun run check` before opening a pull request.
