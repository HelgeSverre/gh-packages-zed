# angular-switcher

> One keystroke to jump between an Angular component's `.ts`, template, style, and spec — from inside [Zed](https://zed.dev).

[![ci](https://github.com/danieljancar/angular-switcher/actions/workflows/ci.yml/badge.svg)](https://github.com/danieljancar/angular-switcher/actions/workflows/ci.yml)
[![crates.io](https://img.shields.io/crates/v/angular-switcher.svg)](https://crates.io/crates/angular-switcher)
[![license: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Open `foo.component.ts`, press `Alt+S` (Option+S on macOS), land in `foo.component.html`. Press again → `.scss`. Again → `.spec.ts`. Again → back to `.ts`. Or jump directly to a specific sibling with `Alt+{T, H, C, X}`.

## Why this exists

VS Code and WebStorm both ship Angular component switcher plugins. Zed doesn't have something like this.

Zed's extension API currently can't register editor commands ([zed#30873](https://github.com/zed-industries/zed/discussions/30873)), so the marketplace can't host this functionality directly. The workaround is clean: this CLI plugs into Zed's existing [task system](https://zed.dev/docs/tasks), which already supports keybinding-triggered commands with `$ZED_FILE` injected. Two small JSON snippets and you're done.

## Install

### Homebrew (macOS / Linux)

```bash
brew install danieljancar/tap/angular-switcher
```

### Shell installer (macOS / Linux)

```bash
curl --proto '=https' --tlsv1.2 -LsSf https://github.com/danieljancar/angular-switcher/releases/latest/download/angular-switcher-installer.sh | sh
```

### PowerShell installer (Windows)

```powershell
powershell -ExecutionPolicy Bypass -c "irm https://github.com/danieljancar/angular-switcher/releases/latest/download/angular-switcher-installer.ps1 | iex"
```

### From crates.io

```bash
cargo install --locked angular-switcher
```

### Manual prebuilt binary

Download the archive for your platform from the [latest release](https://github.com/danieljancar/angular-switcher/releases/latest), verify the `.sha256`, and put `angular-switcher` somewhere on your `$PATH`.

Verify:

```bash
angular-switcher --version
```

## Wire it into Zed

Copy the contents of [`templates/tasks.json`](templates/tasks.json) into either:

- `~/.config/zed/tasks.json` (global), or
- `.zed/tasks.json` (per-project)

Copy [`templates/keymap.json`](templates/keymap.json) into `~/.config/zed/keymap.json`. If you already have a keymap, merge the `bindings` block.

Defaults:

| Shortcut       | Action                          |
|----------------|---------------------------------|
| `alt-s`        | Cycle to next sibling           |
| `alt-shift-s`  | Cycle to previous sibling       |
| `alt-t`        | Switch to TypeScript (`.ts`)    |
| `alt-h`        | Switch to HTML template         |
| `alt-c`        | Switch to style (`.scss`/`.css`)|
| `alt-x`        | Switch to spec (`.spec.ts`)     |

> In Zed keymaps, `alt` is the Option key on macOS and the Alt key on Linux/Windows. `cmd` is the Command key (macOS-only); Zed's built-in Save As is `cmd-shift-s`, which does not conflict with anything here.

All shortcuts are fully customizable — edit your `keymap.json` and pick any combo Zed accepts.

## CLI usage

You normally don't invoke this by hand; Zed does. But for scripting or testing:

```
angular-switcher [OPTIONS] [<file>]

OPTIONS:
  -t, --to <TARGET>  Switch directly: ts | html | style | spec
  -c, --cycle        Cycle to next sibling (default)
  -r, --reverse      Cycle backwards
      --print        Print resolved path; do not launch Zed
      --no-launch    Resolve only; exit 0 on success
      --config <P>   Override config path
  -v, --verbose      Log resolution steps to stderr
```

Exit codes: `0` success · `1` input error · `2` no sibling found · `3` config error.

```bash
$ angular-switcher --print foo.component.ts
/abs/path/to/foo.component.html
```

## Configuration

Drop an `angular-switcher.toml` at your platform's per-user config directory (Linux: `~/.config/angular-switcher/config.toml`; macOS: `~/Library/Application Support/angular-switcher/config.toml`; Windows: `%APPDATA%\angular-switcher\config\config.toml`) for the global default, or `.angular-switcher.toml` at your project root to override it. See [`templates/angular-switcher.toml`](templates/angular-switcher.toml) for the annotated default and [docs/CONFIGURATION.md](docs/CONFIGURATION.md) for the full reference.

Common tweaks:

```toml
# Don't cycle through specs
[cycle]
order = ["ts", "html", "style"]

# Prefer .less over .scss in this project
[targets.style]
extensions = ["less", "scss", "css", "sass"]
preference = ["less", "scss", "css", "sass"]
```

## How it works

1. Zed task fires with `$ZED_FILE` set to the active editor path.
2. `angular-switcher` strips the recognised extension to find the component basename, identifies the current target, and computes the next sibling per config.
3. It invokes `zed <sibling>` — the Zed CLI opens the file in the running window.

No shell, no globbing, no PATH lookups in critical paths. Just a strict path resolver and a single `Command::spawn`. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the design and security posture.

## Security

- `#![forbid(unsafe_code)]`
- No shell invocation; the `zed` CLI is spawned directly
- Strict TOML schema (`deny_unknown_fields`) — typos fail loud
- CI runs `cargo audit` and `cargo deny` on every PR
- Reproducible builds (`Cargo.lock` committed, `--locked` everywhere)

If you find a vulnerability, please follow the disclosure process in [SECURITY.md](SECURITY.md) — use GitHub's private "Report a vulnerability" form rather than filing a public issue.

## Roadmap

- Optional Vue / React / Svelte file pair strategies
- Native Zed marketplace extension once [zed#30873](https://github.com/zed-industries/zed/discussions/30873) ships

## Contributing

PRs welcome. `cargo test`, `cargo clippy --all-targets -- -D warnings`, and `cargo fmt --check` must pass. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) before changing the resolver.

## Release secrets summary

Two automated workflows ship releases:

- [`.github/workflows/release-plz.yml`](.github/workflows/release-plz.yml) — version bumps, changelog, crates.io publish
- [`.github/workflows/release.yml`](.github/workflows/release.yml) — generated by [dist](https://opensource.axo.dev/cargo-dist/); cross-compiles, GitHub Release, Homebrew formula

Required repository secrets (*Settings → Secrets and variables → Actions*):

| Secret name              | Type                                    | Where used                                                                 |
|--------------------------|-----------------------------------------|----------------------------------------------------------------------------|
| `RELEASE_PLZ_TOKEN`      | GitHub Personal Access Token (classic, `repo` + `workflow` scopes) on the `angular-switcher` repo | `release-plz.yml` — needed because tags created with `GITHUB_TOKEN` do not trigger downstream workflows |
| `CARGO_REGISTRY_TOKEN`   | crates.io token from <https://crates.io/me/tokens> (`publish-new` + `publish-update` scopes) | `release-plz.yml` — `cargo publish` after the release PR merges            |
| `HOMEBREW_TAP_TOKEN`     | PAT with `repo` scope on the `danieljancar/homebrew-tap` repository       | `release.yml` (dist) — pushes the generated `angular-switcher.rb` Formula  |

`GITHUB_TOKEN` is provided automatically — nothing to configure.

See [docs/INSTALLATION.md#maintainer-release-pipeline](docs/INSTALLATION.md#maintainer-release-pipeline) for the operational flow.

## License

MIT — see [LICENSE](LICENSE).
