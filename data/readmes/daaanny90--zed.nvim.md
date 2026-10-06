# zed.nvim

The [Zed editor](https://zed.dev) look for Neovim: two faithful ports of Zed's built-in themes, one port of a Zed extension theme, and three original palettes designed to sit next to them. All dark, all with matching **tmux** and **iTerm2** presets for a fully consistent terminal experience.

## Variants

| Variant | Background | Foreground | Accent | Origin |
|---------|------------|------------|--------|--------|
| `zed-one-dark` | ![#282c33](https://placehold.co/16x16/282c33/282c33) `#282c33` | ![#acb2be](https://placehold.co/16x16/acb2be/acb2be) `#acb2be` | ![#74ade8](https://placehold.co/16x16/74ade8/74ade8) `#74ade8` | Zed "One Dark" (exact hex from Zed's theme JSON) |
| `zed-ayu-mirage` | ![#242835](https://placehold.co/16x16/242835/242835) `#242835` | ![#cccac2](https://placehold.co/16x16/cccac2/cccac2) `#cccac2` | ![#72cffe](https://placehold.co/16x16/72cffe/72cffe) `#72cffe` | Zed "Ayu Mirage" (exact hex from Zed's theme JSON) |
| `zed-macos-classic-dark` | ![#131313](https://placehold.co/16x16/131313/131313) `#131313` | ![#dddddd](https://placehold.co/16x16/dddddd/dddddd) `#dddddd` | ![#fdd888](https://placehold.co/16x16/fdd888/fdd888) `#fdd888` | "macOS Classic Dark" from Zed's `macos-classic` extension |
| `zed-graph-paper` | ![#2a2a24](https://placehold.co/16x16/2a2a24/2a2a24) `#2a2a24` | ![#c5c2b0](https://placehold.co/16x16/c5c2b0/c5c2b0) `#c5c2b0` | ![#c2662f](https://placehold.co/16x16/c2662f/c2662f) `#c2662f` | Original: drafting-mat palette — olive-charcoal paper, sage grid, burnt-orange ruler |
| `zed-oscilloscope` | ![#1e1f1c](https://placehold.co/16x16/1e1f1c/1e1f1c) `#1e1f1c` | ![#c4c9bc](https://placehold.co/16x16/c4c9bc/c4c9bc) `#c4c9bc` | ![#8fd072](https://placehold.co/16x16/8fd072/8fd072) `#8fd072` | Original: neutral graphite + phosphor green, amber/cyan "channels" |
| `zed-blueprint` | ![#212b36](https://placehold.co/16x16/212b36/212b36) `#212b36` | ![#c3cfda](https://placehold.co/16x16/c3cfda/c3cfda) `#c3cfda` | ![#85b8d9](https://placehold.co/16x16/85b8d9/85b8d9) `#85b8d9` | Original: Prussian-blue cyanotype + ice cyan, pale brass and sea foam |

```lua
vim.cmd.colorscheme("zed-one-dark") -- or any variant above
```

The three originals were designed as a set: *graph-paper* matches a drafting-mat wallpaper, *oscilloscope* and *blueprint* are "tools on the workbench" companions with the same calm contrast.

> **Note on `zed-macos-classic-dark`:** two deliberate deviations from the extension's JSON, both commented in `palette.lua` — the extension's `players[0]` is an untouched template leftover (cursor/accent use the theme's gold instead), and its `terminal.ansi` black/white are swapped upstream (sanitized here so `:terminal` stays readable).

## Features

- Every variant defined over the same 54 semantic palette keys — highlight logic is variant-agnostic
- Treesitter and LSP semantic token highlights
- 20+ plugin integrations (Telescope, Neo-tree, nvim-cmp, blink.cmp, gitsigns, which-key, snacks.nvim, flash, trouble, noice, mini.nvim, dap, and more)
- Terminal ANSI colors
- Transparent background support
- Matching tmux theme and iTerm2 color preset per variant

## Installation

### [lazy.nvim](https://github.com/folke/lazy.nvim)

```lua
{
  "daaanny90/zed.nvim",
  lazy = false,
  priority = 1000,
  config = function()
    vim.cmd.colorscheme("zed-one-dark")
  end,
}
```

### [packer.nvim](https://github.com/wbthomason/packer.nvim)

```lua
use {
  "daaanny90/zed.nvim",
  config = function()
    vim.cmd.colorscheme("zed-one-dark")
  end,
}
```

### Manual

```bash
git clone https://github.com/daaanny90/zed.nvim \
  ~/.local/share/nvim/site/pack/plugins/start/zed.nvim
```

## Configuration

Optional — call before `colorscheme`. All options with their defaults:

```lua
require("zed").setup({
  variant = "one-dark",    -- used when loading via require("zed").load()
  transparent = false,     -- transparent background (requires terminal transparency)
  italic_comments = true,  -- italic style for comments (Zed default)
  bold_keywords = false,   -- keep keywords regular (Zed look)
  terminal_colors = true,  -- set terminal ANSI colors
})
```

Each `:colorscheme zed-<variant>` command selects its variant directly; `setup()` only changes styling options (and the default variant for programmatic loading).

## Extras

### iTerm2 Color Preset

1. Open **iTerm2** → Settings → Profiles → Colors
2. Click **Color Presets...** → **Import...**
3. Select `extras/zed-<variant>.itermcolors`
4. Pick it from the **Color Presets...** dropdown

### tmux Theme

Source the matching theme in your tmux config:

```tmux
source-file /path/to/zed.nvim/extras/zed-one-dark.tmux
```

## Credits

- [Zed Industries](https://zed.dev) for the One Dark and Ayu Mirage themes this started from
- The `macos-classic` Zed extension for the macOS Classic Dark palette

## License

MIT
