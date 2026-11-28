<p align="center"><img src="logo/fox_c.png" width="120" alt="Foxberry logo"></p>

<h1 align="center">Foxberry</h1>

<p align="center">A light <a href="https://www.nordtheme.com">Nord</a> theme, consistent across the terminal, editors, prompt and slides.<br>
Nord's accents, darkened by role for a light background, plus one accent from outside Nord: the muted pink <b>foxberry</b>.<br>
<i>The deeper meaning of the foxberry color shall remain a secret.</i></p>

<p align="center"><img src="docs/img/showcase.png" width="100%" alt="Foxberry showcase: terminal, Zed and Neovim"></p>

## Why

Nord has no official light variant. Most community attempts either flip the background and keep the pastel accents (which drop below 2:1 contrast on a light background) or darken the accents by eye, losing Nord's character.

Foxberry uses one rule instead: **the role of a color decides its shade.** Every accent comes in three versions:

| Role       | Used for                                   | Target on the background          |
|------------|--------------------------------------------|-----------------------------------|
| **text**   | words, icons and syntax                    | ≥ 3:1, darkened Nord accent       |
| **bright** | bars, borders, git markers, charts         | ≥ 2.5:1                           |
| **badge**  | label backgrounds with dark `#2E3440` text | ≥ 4.5:1, the original Nord pastel |

<p align="center"><img src="docs/img/palette.png" width="100%" alt="Foxberry palette: text, bright and badge versions of every accent, and the 16 ANSI colors"></p>

The full specification, with every value, contrast tables and the reasoning behind each choice, is in [`docs/PALETTE.md`](docs/PALETTE.md).

For editors at small font sizes, VS Code, Zed and Neovim also have **Foxberry Contrast**, with syntax colors darkened to 5:1 ([comparison](docs/img/contrast.png), [details](docs/PALETTE.md#contrast-variant-for-editors)).

## Screenshots

<p align="center"><img src="docs/img/desktop.jpg" width="100%" alt="Foxberry on a desktop: yazi and btop in kitty, with Zed"></p>

|                                                                                                              |                                                                             |
|--------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| <img src="docs/img/neovim.png" alt="Neovim with lualine"><br>**Neovim** · lualine                            | <img src="docs/img/bat.png" alt="bat"><br>**bat**                           |
| <img src="docs/img/zed.png" alt="Zed"><br>**Zed**                                                            | <img src="docs/img/vscode.png" alt="VS Code"><br>**VS Code**                |
| <img src="docs/img/terminal.png" alt="kitty with the Starship prompt and eza"><br>**kitty** · Starship · eza | <img src="docs/img/yazi.png" alt="yazi with yatline"><br>**yazi** · yatline |

Terminal screenshots are taken in kitty. Font: JetBrains Mono.

Wallpaper: [Silhouette of trees covered by fog](https://unsplash.com/photos/KT3WlrL_bsg) by [Paul Pastourmatzis](https://unsplash.com/@paulpastourmatzis) on Unsplash ([Unsplash License](https://unsplash.com/license)), not covered by this repository's MIT license.

## Install

Copy the files you need from `themes/`. Paths below are the usual defaults on macOS and Linux.

<details><summary><b>Ghostty</b></summary>

```sh
cp themes/ghostty/Foxberry ~/.config/ghostty/themes/
```
In `~/.config/ghostty/config`: `theme = Foxberry`
</details>

<details><summary><b>kitty</b></summary>

```sh
cp themes/kitty/foxberry.conf ~/.config/kitty/
```
In `kitty.conf`: `include foxberry.conf`
</details>

<details><summary><b>Zed</b></summary>

```sh
cp themes/zed/foxberry.json ~/.config/zed/themes/
```
In `settings.json`: `"theme": "Foxberry"`, or `"Foxberry Contrast"` for darker syntax colors at small font sizes (see [Contrast variant](docs/PALETTE.md#contrast-variant-for-editors)).
</details>

<details><summary><b>VS Code</b></summary>

```sh
cp -r themes/vscode ~/.vscode/extensions/foxberry
```
Restart VS Code and pick **Foxberry** in *Preferences: Color Theme*. **Foxberry Contrast** has darker syntax colors (5:1) for small editor fonts; see [Contrast variant](docs/PALETTE.md#contrast-variant-for-editors).
</details>

<details><summary><b>Neovim</b> (with <a href="https://github.com/gbprod/nord.nvim">nord.nvim</a> and lualine)</summary>

Copy `themes/neovim/lua/` into `~/.config/nvim/lua/`. With lazy.nvim:

```lua
{
  "gbprod/nord.nvim",
  opts = {
    on_colors = function() require("foxberry").on_colors() end,
    on_highlights = function(hl) require("foxberry").on_highlights(hl) end,
  },
},
{ "nvim-lualine/lualine.nvim", opts = { options = { theme = "foxberry" } } },
```
Foxberry is applied when `background` is `light`, which Neovim sets from the terminal.
For darker syntax colors (5:1) at small font sizes, set `vim.g.foxberry_contrast = true` before the color scheme loads (see [Contrast variant](docs/PALETTE.md#contrast-variant-for-editors)).
</details>

<details><summary><b>Vim</b></summary>

```sh
mkdir -p ~/.vim/colors
cp themes/vim/colors/foxberry.vim ~/.vim/colors/
```

In `~/.vimrc`:

```vim
set termguicolors
set background=light
colorscheme foxberry
```

- Set `termguicolors` before `colorscheme` (if you toggle it later, run `:colorscheme foxberry` again).
- Without `termguicolors`, Vim falls back to the terminal's ANSI palette, so use a terminal with the Foxberry colors.

</details>

<details><summary><b>bat</b></summary>

```sh
mkdir -p "$(bat --config-dir)/themes"
cp themes/bat/Foxberry.tmTheme "$(bat --config-dir)/themes/"
bat cache --build
export BAT_THEME=Foxberry
```
</details>

<details><summary><b>Codex CLI</b></summary>

```sh
cp themes/codex/foxberry.tmTheme ~/.codex/themes/
```
In `~/.codex/config.toml`, section `[tui]`: `theme = "foxberry"`
</details>

<details><summary><b>yazi</b></summary>

```sh
cp -r themes/yazi/foxberry.yazi ~/.config/yazi/flavors/
```
In `~/.config/yazi/theme.toml`:
```toml
[flavor]
dark = "foxberry"
light = "foxberry"
```
For [yatline.yazi](https://github.com/imsi32/yatline.yazi), copy `themes/yazi/yatline-foxberry.yazi` to `~/.config/yazi/plugins/` and use `theme = require("yatline-foxberry"):setup()` with `show_background = true`.
</details>

<details><summary><b>Starship</b></summary>

Two prompts: `foxberry.toml` (grey-blue) and `foxberry-pastel.toml` (one badge color per segment). Both use a [Nerd Font](https://www.nerdfonts.com).
```sh
cp themes/starship/foxberry.toml ~/.config/starship.toml
```
</details>

<details><summary><b>Shell</b>: eza / ls, fzf, zsh-autosuggestions, fast-syntax-highlighting, htop</summary>

In `~/.zshrc`, after your plugins:
```sh
source /path/to/foxberry/themes/shell/foxberry.zsh
```
It sets `LS_COLORS`, `EZA_COLORS`, fzf colors and the autosuggestion color, loads the fast-syntax-highlighting styles, and wraps `htop` (htop has no themes; its bars are black text on cyan, which is unreadable on a light background, so the wrapper lightens ANSI 0 while htop runs).
</details>

<details><summary><b>btop</b></summary>

```sh
cp themes/btop/foxberry.theme ~/.config/btop/themes/
```
In `btop.conf`: `color_theme = "foxberry"`
</details>

<details><summary><b>Claude Code</b></summary>

```sh
cp themes/claude-code/foxberry.json ~/.claude/themes/
```
Then pick it with `/theme`.
</details>

<details><summary><b>Reveal.js / Quarto slides</b></summary>

Copy `reveal/foxberry.scss` and `reveal/foxberry.theme` next to your presentation:
```yaml
format:
  revealjs:
    theme: foxberry.scss
    highlight-style: foxberry.theme
```
Layout classes and color rules for slide authors: [`reveal/FOXBERRY-REVEAL.md`](reveal/FOXBERRY-REVEAL.md) (Polish).
</details>

## Layout

```
themes/        ready-to-use theme files, one folder per program
reveal/        Reveal.js theme for Quarto and a guide for slide authors
site/          showcase page (index.html)
docs/          palette specification and screenshot
logo/          the fox
```

## Credits

Foxberry builds on [Nord](https://www.nordtheme.com) by Arctic Ice Studio and on several community ports. See [CREDITS.md](CREDITS.md) and [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

Built with [Claude Code](https://claude.com/claude-code), Anthropic's AI coding assistant. The palette, the role rule and every visual decision are the author's; Claude Code did a large part of the implementation: the generators that map dark themes to light ones by role, the contrast calculations, the per-app ports and the showcase page. Every color was reviewed by eye in daily use.

## License

MIT, see [LICENSE](LICENSE). Third-party parts keep their own notices (see THIRD_PARTY_NOTICES.md).
