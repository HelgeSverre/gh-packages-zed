# Grok Themes for Zed

Two restrained themes for [Zed](https://zed.dev), built around a graphite and
ivory base with a single desaturated steel accent. The family is inspired by the
Grok interface but is not an official xAI theme.

- **Grok Obsidian** — dark graphite surfaces, warm ivory text, muted botanical
  syntax colors.
- **Grok Parchment** — neutral paper light theme with the same syntax palette and
  mirrored contrast.

## Installation

The extension is submitted to the Zed extension registry as `grok-theme`
([PR #8273](https://github.com/zed-industries/extensions/pull/8273)). Once that
PR is merged:

1. Open **Extensions** (`Ctrl+Shift+X` / `Cmd+Shift+X`).
2. Search for **Grok Theme** and install it.
3. Open `theme selector: toggle` and choose **Grok Obsidian** or **Grok
   Parchment**.

Until then, install the repository as a dev extension:

1. Clone this repository.
2. Run `zed: install dev extension` from the command palette.
3. Select the repository directory.

The extension provides themes only; it has no language, grammar, or runtime code.

## Design

The reference UI is almost entirely monochrome. This theme keeps it that way:

| Role | Obsidian | Parchment |
| --- | --- | --- |
| App / editor | `#121212` / `#101010` | `#F4F3F0` / `#FBFBF9` |
| Raised surface | `#1E1E1E` | `#FFFFFF` |
| Text / muted | `#E6E4DF` / `#9A9892` | `#242422` / `#686866` |
| Accent (focus, links, selection) | `#A9BCCB` | `#4C6478` |
| Keyword | `#A6B8C6` | `#4C6478` |
| Function | `#D4C8B4` | `#4E6A5A` |
| String | `#AEBE9C` | `#5C6B3F` |
| Type | `#9DBFB6` | `#2F5F5A` |
| Number | `#C7A9A0` | `#8A5A52` |

Syntax uses five muted hues over a neutral ground. The accent is reserved for
interactive state; it never appears in tabs, borders, gutters, or syntax. The
terminal palette in the theme follows the same logic.

## Validation

- Validated against Zed's theme schema `v0.2.0`.
- Both variants load and render in Zed on Windows 11.
- The extension package contains only `themes/grok.json` and the manifest.

## Repository Layout

```text
extension.toml                  Zed extension manifest
themes/grok.json                Grok theme family
README.md
LICENSE
```

## Development

Install the repository as a dev extension with `zed: install dev extension`.
Changes to `themes/grok.json` trigger a reload in the theme selector.

## License

MIT. Independent and unofficial; not affiliated with xAI.
