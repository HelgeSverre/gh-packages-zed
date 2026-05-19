# Keep a Changelog Snippets

Markdown snippets for writing changelogs in Zed using the [Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/) structure.

The snippets are intentionally small and predictable: they insert standard changelog headings, release sections, category sections, and GitHub reference links with editable tab stops for versions, dates, owners, and repository names.

## Installation

Install from the Zed Extension Gallery:

1. Open Zed.
2. Open the Extension Gallery with `Cmd+Shift+X` on macOS or `Ctrl+Shift+X` on Linux and Windows.
3. Search for `Keep a Changelog Snippets`.
4. Click Install.

You can also open the command palette and run `zed: extensions`, then search for the extension there.

## Install from GitHub

You can also install the extension directly from GitHub:

```sh
git clone https://github.com/ssh-den/zed-keep-a-changelog-snippets.git
```

Then open Zed, run `zed: install dev extension` from the command palette, and select the repository root.

You should select the folder that contains `extension.toml`.

## Usage

Open a Markdown file, type a `cl-` prefix, and accept the completion to expand the snippet.

For example:

- `cl-init` creates a complete `CHANGELOG.md` skeleton.
- `cl-version-full` creates a release section with all Keep a Changelog categories.
- `cl-fixed` creates a `Fixed` category section.
- `cl-link-compare` creates a GitHub compare reference link.

Before publishing a release, delete any empty category sections so the changelog stays concise.

## Snippets

| Prefix | Description |
| --- | --- |
| `cl-init` | Create a complete changelog skeleton with Keep a Changelog and Semantic Versioning links. |
| `cl-version` | Create a version heading. |
| `cl-version-full` | Create a version section with all Keep a Changelog categories. |
| `cl-entries` | Create all Keep a Changelog category sections. |
| `cl-added` | Create an `Added` section. |
| `cl-changed` | Create a `Changed` section. |
| `cl-deprecated` | Create a `Deprecated` section. |
| `cl-removed` | Create a `Removed` section. |
| `cl-fixed` | Create a `Fixed` section. |
| `cl-security` | Create a `Security` section. |
| `cl-link-first` | Create a reference link for the first release tag. |
| `cl-link-compare` | Create a reference link comparing two release tags. |

## License

MIT
