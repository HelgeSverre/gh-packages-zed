<p align="center">
  <img src="assets/logo-dark.svg#gh-dark-mode-only" alt="lila" width="300">
  <img src="assets/logo-light.svg#gh-light-mode-only" alt="lila" width="300">
</p>

<h3 align="center">Lilac, with the contrast to read code all day.<br>Dusk for the dark, Petal for the light.</h3>

<p align="center">
  <a href="https://github.com/irwinarruda/lila-theme/actions/workflows/check.yml"><img src="https://img.shields.io/github/actions/workflow/status/irwinarruda/lila-theme/check.yml?branch=main&label=contrast%20check&labelColor=0E0D11" alt="Contrast check status"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-7A58CE?labelColor=0E0D11" alt="MIT license"></a>
  <img src="https://img.shields.io/badge/Neovim%20%C2%B7%20Vim%20%C2%B7%20VS%20Code%20%C2%B7%20Cursor%20%C2%B7%20Zed%20%C2%B7%20Ghostty%20%C2%B7%20OpenCode%20%C2%B7%20T3%20Code%20%C2%B7%20Herdr%20%C2%B7%20favo-EDECF2?labelColor=0E0D11" alt="Neovim, Vim, VS Code, Cursor, Zed, Ghostty, OpenCode, T3 Code, Herdr and favo">
</p>

<p align="center">
  <a href="#install">Install</a> ·
  <a href="#why-lila">Why Lila</a> ·
  <a href="SPEC.md">The spec</a> ·
  <a href="https://github.com/irwinarruda/irwin-ui">Design system</a> ·
  <a href="APPS.md">For apps</a> ·
  <a href="CREDITS.md">Credits</a>
</p>

<p align="center">
  <img src="assets/preview-dusk.png#gh-dark-mode-only" alt="TypeScript code in Lila Dusk, with lilac keywords, sky functions, teal types and sage strings on a near-black background" width="820">
  <img src="assets/preview-petal.png#gh-light-mode-only" alt="TypeScript code in Lila Petal, with the same color roles on an off-white background" width="820">
</p>

<p align="center">
  <img src="assets/palette-dusk.svg#gh-dark-mode-only" alt="Lila Dusk code colors" width="820">
  <img src="assets/palette-petal.svg#gh-light-mode-only" alt="Lila Petal code colors" width="820">
</p>

Lila is lilac, in Portuguese, and the short name of a flower. It started as the color of Prô Cris, the app a teacher has used for years to run her lessons and her students' payments, and grew into a theme for everything around it: your editor, your terminal and your coding agents. It is also one of the themes of [irwin-ui](https://github.com/irwinarruda/irwin-ui), [Irwin Arruda](https://www.irwinarruda.com)'s design system, with a palette for apps and websites. Its siblings are [Favo](https://github.com/irwinarruda/favo-theme) and [Barro](https://github.com/irwinarruda/barro-theme), built the same way. Switch GitHub between dark and light to see both variants.

## Why Lila

**Lilac on quiet grays.** A vivid lilac on grays that keep only a trace of its hue, as faint as the blue in Barro's slate. The surfaces stay out of the way, and lilac is rare enough to mean something. Dusk is the violet hour after sunset, and a petal is the pale inside of the flower, so each variant is named after its own surfaces.

| Variant          | Mode  | Surfaces         |
| ---------------- | ----- | ---------------- |
| **Lila Dusk**  | dark  | Near-black, a trace of violet |
| **Lila Petal** | light | Off-white, a trace of lilac   |

**Lilac leads.** Keywords carry the lilac, so a file has a shape before you read a word of it.

**Each color has one job.** Sky is what runs, teal is the shape of data, sage is text, apricot is a fixed value, gold is what was passed in, and rose is a pattern. Errors get a red of their own, and warnings share apricot, so gold stays free as the brand's second color in apps. Variables and properties stay in the plain text color, so color marks structure rather than everything.

**Tags and components never blur.** In JSX, `<section>` is lilac and `<PetalList>` is teal italic, so you can see what is markup and what is yours.

**Italic means "from somewhere else".** Parameters, type parameters, attributes and components are italic, because they arrive from outside the line you are reading.

**One lilac, white text.** Buttons are the lilac `#7A58CE` with white text, the same in both variants. It is the color of the flower in the logo too.

**Contrast is a contract, not a feeling.** These numbers are checked on every commit:

|                                      | Dusk   | Petal  |
| ------------------------------------ | ------ | ------ |
| Weakest code color on the background | 8.02:1 | 4.54:1 |
| Comments on the background           | 7.91:1 | 5.96:1 |
| Weakest code color on a selection    | 5.53:1 | 3.67:1 |
| Closest two code colors (OKLab)      | 0.11   | 0.11   |
| Errors on the background             | 5.92:1 | 5.58:1 |
| White on the lilac                   | 5.10:1 | 5.10:1 |

Dusk clears WCAG AAA, and Petal clears AA, for all code. Everything else is in [SPEC.md](SPEC.md): every color, every token rule and every interface rule, written so you can port Lila to anything.

## Install

Clone this repository for any app below that copies files, or run `bun run install-themes` from a clone to copy the Ghostty, Zed, OpenCode, T3 Code, Herdr and favo files and install the VS Code and Cursor extension at once.

### Neovim

Written in Lua, and tested on Neovim 0.12. With [lazy.nvim](https://github.com/folke/lazy.nvim):

```lua
{
  "irwinarruda/lila-theme",
  name = "lila",
  lazy = false,
  priority = 1000,
  config = function()
    require("lila").setup({ transparent = false, italics = true })
    vim.cmd.colorscheme("lila-dusk")
  end,
}
```

Use `lila-petal` for the light variant. It covers tree-sitter, LSP semantic tokens, diagnostics and popular plugins: gitsigns, Telescope, nvim-cmp, blink.cmp, which-key, noice, nvim-notify, indent-blankline, rainbow-delimiters, neo-tree, nvim-tree, Trouble, nvim-dap, lazy.nvim, mason, alpha-nvim and fzf-lua.

For lualine, set `theme = "lila"`.

### Vim

With [vim-plug](https://github.com/junegunn/vim-plug):

```vim
Plug 'irwinarruda/lila-theme', { 'rtp': 'vim' }

set termguicolors
colorscheme lila-dusk
```

The light variant is `lila-petal`.

Without a plugin manager, copy `vim/colors/*.vim` to `~/.vim/colors/`. Colors are approximated in 256-color terminals, so use `termguicolors` when you can.

### VS Code and Cursor

In VS Code, search for **Lila** in Extensions, install it from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=irwinarruda.lila-theme), or run:

```sh
code --install-extension irwinarruda.lila-theme
```

Cursor gets its extensions from [Open VSX](https://open-vsx.org/extension/irwinarruda/lila-theme) and scans each one before listing it, so Lila can take a while to reach its search. To install it now, download the `.vsix` from the [latest release](https://github.com/irwinarruda/lila-theme/releases/latest), then run:

```sh
cursor --install-extension lila-theme-*.vsix
```

Then pick a Lila variant with `Preferences: Color Theme`.

It covers language server highlighting, rainbow brackets, diffs, the terminal and the whole interface. In `settings.json`, the theme ids are `lila-dusk` and `lila-petal`.

### Zed

Copy [`zed/themes/lila.json`](zed/themes/lila.json) to `~/.config/zed/themes/`, then pick a Lila variant from the theme selector.

For the full effect, add [`zed/semantic-tokens.jsonc`](zed/semantic-tokens.jsonc) to your Zed settings. It turns on language server highlighting and maps it to Lila, including read-only variables, which a Zed theme can't do alone.

### Ghostty

Copy the files in `ghostty/` to `~/.config/ghostty/themes/`, then set one in your config, or a pair that follows your system:

```
theme = light:lila-petal,dark:lila-dusk
```

### OpenCode

Copy `opencode/*.json` to `~/.config/opencode/themes/`, then run `/theme` to pick one.

### T3 Code

Copy `t3code/*.json` to `~/.t3/userdata/themes/`, then run `t3 theme set lila-dusk`. These have to be real files, because T3 Code ignores symlinks there.

### Herdr

Paste the contents of `herdr/lila-dusk.toml`, or `herdr/lila-petal.toml`, into `~/.config/herdr/config.toml`, replacing any `[theme]` section, then run `herdr server reload-config`.

### favo

Copy `favo/*.json` to `~/.favo/themes/`, then run `favo theme lila-dusk`, or press `t` in [favo](https://github.com/irwinarruda/favo-cli) to pick one.

## Apps and websites

Lila has a palette for websites and apps too: mauve, twelve steps for every Lila color, and tokens with one job each, ready as CSS, Tailwind and JSON. [APPS.md](APPS.md) has it all.

Lila is one of the themes of [irwin-ui](https://github.com/irwinarruda/irwin-ui), the design system behind [irwinarruda.com](https://www.irwinarruda.com) and The Chatbot. Type, brand marks and patterns live there. Lila stays complete by itself: [SPEC.md](SPEC.md) and [APPS.md](APPS.md) are all you need to use it.

## Port it

Lila is one [`palette.json`](palette.json) and one [spec](SPEC.md). If your favorite app is missing, the spec has everything you need, and [CONTRIBUTING.md](CONTRIBUTING.md) explains how to add it here.

## Credits

Lila is the youngest of Favo and Barro, and like them it is inspired by how [Dracula](https://draculatheme.com) handles contrast and syntax highlighting, especially in TypeScript projects. The full story, including Lila's closest relatives, is in [CREDITS.md](CREDITS.md).

## License

[MIT](LICENSE)
