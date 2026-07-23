# Hubbamax for Zed

A dark [Zed](https://zed.dev) theme based on Vim's **habamax**, ported from
[`alexpasmantier/hubbamax.nvim`](https://github.com/alexpasmantier/hubbamax.nvim).

Low-saturation, easy on the eyes, with a `#1c1c1c` background and a muted accent palette
(green strings, purple keywords, blue types, pink constants, cyan functions).

## Personal tweaks

This port carries over a couple of personal adjustments from my Neovim config:

- **Variables and brackets** use the plain foreground (`#bcbcbc`) instead of cyan, so only
  the more meaningful tokens (keywords, types, strings, constants) carry color.

> Note: hubbamax.nvim uses different cursor colors per Vim mode (normal/visual/insert/replace).
> Zed themes expose only a single cursor color, so the cursor is set to the normal-mode color
> `#dadada`. Per-mode cursor coloring isn't currently themeable in Zed.

## Install

### As a dev extension (local)

1. Clone/keep this folder somewhere on disk.
2. In Zed, open the command palette and run **`zed: install dev extension`**.
3. Select this directory.
4. Open the theme picker (`cmd-k cmd-t`) and choose **Hubbamax**.

To activate it in `settings.json` (Hubbamax is a dark-only theme):

```json
"theme": "Hubbamax"
```

## Credits

- Original colorscheme: [hubbamax.nvim](https://github.com/alexpasmantier/hubbamax.nvim) by Alexandre Pasmantier
- Based on [vim-habamax](https://github.com/habamax/vim-habamax) by habamax

## License

MIT — see [LICENSE](./LICENSE).
