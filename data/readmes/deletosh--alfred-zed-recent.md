# Alfred Zed Recent Projects

Open your recently used [Zed](https://zed.dev) projects instantly from Alfred.

```
zr my-proj  →  fuzzy-matches recent Zed workspaces → ↵ opens in Zed
```

## Install

1. Download `Alfred Zed Recent.alfredworkflow` from [Releases](../../releases)
2. Double-click to install into Alfred 5

## Usage

1. Open Alfred with `⌘ Space`
2. Type `zr` — your recent Zed projects appear immediately
3. Keep typing to fuzzy-filter by project name or path
4. Press `↵` to open

Type `zn` to open a new empty Zed window.

### Modifiers (on a recent project)

- `↵` — Open project in Zed
- `⌘↵` — Open in a **new** Zed window
- `⌥↵` — Reveal folder in Finder

### Open a folder that isn't in recents

Type `zr` followed by a path that starts with `/`, `~`, `./`, or `../` — e.g.
`zr ~/code/scratch`. If the path exists, a fallback item opens it in Zed even
though it isn't in the recents list.

## Requirements

- Alfred 5 with Powerpack
- [Zed](https://zed.dev) editor (Stable channel)
- macOS 12+, Apple Silicon or Intel

## Configuration

Alfred Preferences → Workflows → Zed Recent Projects → **Configure Workflow**:

- `ZED_CHANNEL` (default `0-stable`) — switch to `0-preview` or `0-nightly` if needed
- `ZED_LIMIT` (default `50`) — max projects shown

## Build from source

```bash
git clone https://github.com/deletosh/alfred-zed-recent
cd alfred-zed-recent
go mod tidy
bash scripts/build.sh
# → dist/Alfred Zed Recent.alfredworkflow
```

Requires Go 1.22+ and Xcode Command Line Tools (for `lipo`).

## Releasing

Releases are automated via [semantic-release](https://semantic-release.gitbook.io/) on every push to `main`. Use [Conventional Commits](https://www.conventionalcommits.org/) so the right version is chosen:

- `fix: …` → patch bump
- `feat: …` → minor bump
- `feat!: …` or a `BREAKING CHANGE:` footer → major bump
- `chore: …`, `docs: …`, `ci: …` → no release

The GitHub Actions workflow (`.github/workflows/release.yml`) builds the universal binary, stamps the computed version into `info.plist`, and attaches `Alfred Zed Recent.alfredworkflow` to the GitHub Release.

## How it works

Zed stores recent workspaces in a SQLite database at:

```
~/Library/Application Support/Zed/db/0-stable/db.sqlite
```

The workflow reads the `workspaces` table (ordered by `timestamp DESC`) using a
pure-Go SQLite driver with `immutable=1` — safe to query while Zed is running,
with no locking overhead. The compiled universal binary starts in ~15 ms, well
within Alfred's per-keystroke budget.

## License

MIT — © Dele Tosh
