# RAGE Theme

A dark, high-contrast theme for [Zed](https://zed.dev) and NeoVim designed with bold syntax colors and a focused coding aesthetic.

### Zed Preview
![RAGE Theme Preview](./theme.png)

### NeoVim Preview
![RAGE Theme NeoVim Preview](./nvim-theme.png)

## 📦 Installation

### Zed

1. Open Zed
2. Go to **Settings → Themes**
3. Add the theme manually or place it in your themes directory:

```bash
~/.config/zed/themes/
```

### Neovim

Works with any Neovim setup (LazyVim included) — no plugin manager required, since it's a single `colors/rage.lua` file.

1. Copy `rage.lua` into your Neovim colors folder:

```bash
mkdir -p ~/.config/nvim/colors
cp rage.lua ~/.config/nvim/colors/rage.lua
```

> Make sure it lands in `~/.config/nvim/colors/`, **not** `~/.config/nvim/lua/colors/` — Neovim only auto-discovers colorschemes from the top-level `colors/` directory.

2. Test it:

```
:colorscheme rage
```

3. Make it permanent. **LazyVim** users, create `~/.config/nvim/lua/plugins/colorscheme.lua`:

```lua
return {
  { "LazyVim/LazyVim", opts = { colorscheme = "rage" } },
}
```

For a **plain Neovim** config (no LazyVim), add this to your `init.lua` instead:

```lua
vim.cmd.colorscheme("rage")
```

4. Restart Neovim — the theme now loads automatically on startup.

The Neovim version includes highlight groups for Treesitter, LSP diagnostics, GitSigns, Telescope, WhichKey, nvim-cmp, and nvim-tree.
