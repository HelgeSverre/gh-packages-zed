# Tbilisi Night for Zed

A beautiful dark, light, and storm theme family for [Zed](https://zed.dev), inspired by the warm, atmospheric nights of Tbilisi. Port of the [Tbilisi Night VS Code / Cursor theme](https://github.com/IosebKoplatadze/tbilisi-night).

Three variants ship in one extension:

- **Tbilisi Night** — dark, warm purple-orange palette for night coding
- **Tbilisi Night Light** — light variant with the same accent palette
- **Tbilisi Night Storm** — Monokai Pro–style vibrant variant

## Install

### From Zed Extensions (once published)

1. Open Zed
2. `cmd-shift-p` → **zed: extensions**
3. Search for **Tbilisi Night**
4. Click **Install**
5. `cmd-k cmd-t` → pick a variant

### Local install (development)

```bash
git clone https://github.com/IosebKoplatadze/tbilisi-night-zed
```

Then in Zed: `cmd-shift-p` → **zed: install dev extension** → select the cloned folder.

Reload via `cmd-shift-p` → **zed: reload extensions** after editing theme JSON.

### Drop-in (theme only, no extension)

Copy `themes/tbilisi-night.json` into Zed's user themes directory:

```bash
cp themes/tbilisi-night.json ~/.config/zed/themes/
```

Restart Zed. The variants will appear in the theme picker.

## Activation

`cmd-k cmd-t` opens the theme selector. Pick:

- **Tbilisi Night**
- **Tbilisi Night Light**
- **Tbilisi Night Storm**

## Palette

### Tbilisi Night (dark)

| Role | Color |
|---|---|
| Background | `#1a1625` |
| Foreground | `#e8e3f0` |
| Accent | `#ff8c42` |
| Strings | `#7fb069` |
| Keywords | `#b88bc7` |
| Functions | `#6b9bd1` |
| Types | `#5fb3b3` |

### Tbilisi Night Light

| Role | Color |
|---|---|
| Background | `#faf8fc` |
| Foreground | `#2d1f3d` |
| Accent | `#ff8c42` |
| Strings | `#5fa069` |
| Keywords | `#8b4c7a` |
| Functions | `#4b7bb1` |
| Types | `#3fa3a3` |

### Tbilisi Night Storm

| Role | Color |
|---|---|
| Background | `#2d2a2e` |
| Foreground | `#fcfcfa` |
| Accent | `#ffd866` |
| Strings | `#ffd866` |
| Keywords | `#ff6188` |
| Functions | `#a9dc76` |
| Types | `#78dce8` |

## License

MIT — see [LICENSE](./LICENSE).
