# Obsidian Theme for Zed

A faithful port of [Obsidian](https://obsidian.md)'s default theme for the [Zed](https://zed.dev) editor, in both dark and light variants.

Colors are derived from Obsidian's official CSS variables — the [base color palette](https://docs.obsidian.md/Reference/CSS+variables/Foundations/Colors), extended colors, and the default theme's syntax highlighting mapping:

| Obsidian variable | Zed syntax scope |
| --- | --- |
| `--code-keyword` (`--color-pink`) | `keyword` |
| `--code-string` (`--color-green`) | `string` |
| `--code-function` (`--color-yellow`) | `function` |
| `--code-value` (`--color-purple`) | `number`, `boolean`, `constant` |
| `--code-property` (`--color-cyan`) | `property`, `type` |
| `--code-operator` / `--code-tag` (`--color-red`) | `operator`, `tag` |
| `--code-important` (`--color-orange`) | `string.regex`, `preproc` |
| `--code-comment` (`--text-faint`) | `comment` |
| `--code-punctuation` (`--text-muted`) | `punctuation` |

## Themes

- **Obsidian Dark** — editor background `#1e1e1e`, text `#dcddde`, accent `hsl(254, 80%, 68%)`
- **Obsidian Light** — editor background `#ffffff`, text `#222222`, accent `hsl(254, 80%, 68%)`

## Install

### From the Zed extension registry

Once published, open the command palette (`cmd-shift-p`) → `zed: extensions` → search for "Obsidian Theme".

### As a dev extension

1. Clone this repository.
2. In Zed, open the command palette (`cmd-shift-p`) → `zed: install dev extension`.
3. Select this repository's directory.
4. Open the theme selector (`cmd-k cmd-t`) and choose **Obsidian Dark** or **Obsidian Light**.

## License

MIT
