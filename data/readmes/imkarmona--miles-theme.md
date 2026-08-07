# Miles

Dark red theme for [Zed](https://zed.dev), inspired by Spider-Man. Crimson accents on neutral dark, generous italics, no washed-out salmon.

Two variants:

| Variant | Background | Vibe |
| --- | --- | --- |
| **Miles OLED** | `#000000` | Pure black, high-contrast neon red. Made for OLED panels. |
| **Miles Night** | `#131313` | Neutral dark grey, softened neon syntax. Cozy-hacker, easy on long sessions. |

## Palette

### Miles OLED

| Role | Color |
| --- | --- |
| Accent (keyword, tag, operator) | `#ff2d52` |
| Deep accent (focus, borders) | `#a3162f` |
| Strings | `#6fcfc4` |
| Functions, types | `#7fa9e8` |
| Numbers, constants | `#e8b267` |
| Foreground | `#e6dcdf` |

### Miles Night

| Role | Color |
| --- | --- |
| Accent (keyword, tag, operator) | `#e63946` |
| Deep accent (focus, borders) | `#b3202f` |
| Strings | `#59cfae` |
| Functions, types | `#82b8e6` |
| Numbers, constants | `#cbd977` |
| Foreground | `#ded5c9` |

## Italics

Both variants italicize the same 18 scopes: `keyword`, `keyword.control`, `type.interface`, `string.escape`, `string.regex`, `constant`, `boolean`, `variable.special`, `variable.parameter`, `attribute`, `label`, `comment`, `comment.doc`, `emphasis`, `link_uri`, `predictive`, `hint`, `preproc`.

Best paired with a font that ships a real italic — JetBrains Mono, Maple Mono, Cascadia Code.

## Install

From the extension registry: `zed: extensions` → search **Miles**.

Local development:

```sh
git clone https://github.com/imkarmona/miles-theme.git
```

Then in Zed: `zed: install dev extension` → point at the cloned folder.

## License

MIT — see [LICENSE](LICENSE).
