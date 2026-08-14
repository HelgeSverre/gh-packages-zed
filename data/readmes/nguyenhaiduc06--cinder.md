# Cinder

A terminal-native dark theme for [Zed](https://zed.dev). Near-black surfaces, hairline rules,
one ember accent (`#e0632a`), and a deliberately quiet seven-color syntax palette.

## Install

Once published: `zed: extensions` → search **Cinder**.

**Manually (single theme file):**

```sh
mkdir -p ~/.config/zed/themes
curl -o ~/.config/zed/themes/cinder.json \
  https://raw.githubusercontent.com/nguyenhaiduc06/cinder/main/themes/cinder.json
```

Then pick `Cinder Dark` via `cmd-k cmd-t`.

**As a dev extension:** clone this repo, then `zed: install dev extension` from the command
palette and point it at the directory.

## Palette

| Role | Hex | Used for |
| --- | --- | --- |
| Chrome | `#070708` | title bar, window background |
| Sidebar / panels | `#0b0b0d` | project panel, terminal panel surface |
| Editor | `#0a0a0b` | editor + gutter background |
| Tab bar / status bar | `#0c0c0e` | inactive tabs, status bar, terminal |
| Popover | `#101013` | elevated surfaces, pickers, inputs |
| Selected row | `#17171a` | element.selected / active |
| Border | `#1c1c20` | hairline rules |
| Widget border | `#26262b` | inputs, popovers, scrollbar thumb |
| Text | `#e8e6e3` → `#c8c6c3` → `#8a8a92` → `#5a5a62` → `#3a3a40` | never pure white |
| Ember | `#e0632a` / `#f0834f` | cursor, focus, accents, active line number |
| Green | `#4ea672` | created / success |
| Red | `#d1495b` | deleted / error |
| Yellow | `#e0c07a` | modified / warning |
| Blue | `#7fb3e0` | info, selection tint (22%) |
| Purple | `#c98cd9` | conflict, keywords |

## Syntax scope map

Seven colors, no more:

| Color | Zed keys |
| --- | --- |
| `#c98cd9` | `keyword`, `variable.special`, `preproc` |
| `#e0c07a` | `function*`, `type*`, `constructor`, `enum`, `variant`, `tag`, `title` |
| `#7fb3e0` | `variable`, `property`, `attribute`, `label`, `link_*` |
| `#8fbf7f` | `string*`, `text.literal` |
| `#e0632a` | `number`, `boolean`, `constant`, `string.escape`, `punctuation.special` |
| `#6b6b74` | `punctuation*`, `operator` |
| `#5a5a62` | `comment` (italic), `hint` |

Identifiers stay near-foreground — only callables and keywords earn hue. Numbers borrow the
accent. No bold anywhere; comments are the only italic (plus `emphasis` / `link_text`).

## Design notes

- **Brackets** — matching-bracket highlights stay a neutral `#26262b` rather than a color cycle.
  Zed's `accents` key (used for indent-guide/bracket cycling) is set to the same seven-color
  syntax palette, but the muted highlight is a deliberate choice to keep brackets quiet.
- **Scrollbar / minimap** — untinted on purpose: `#26262b` at 40 / 60 / 80% for rest / hover /
  active. Ember there reads as an error.
- **`terminal.ansi.cyan`** is `#8fbf7f` (the string green), keeping the terminal inside the
  seven-color budget instead of introducing an eighth hue.

## License

MIT
