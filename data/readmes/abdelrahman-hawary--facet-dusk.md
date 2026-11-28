# Facet Dusk

A dark color system for terminals and editors. Crimson and emerald distinguish deletions from additions. Copper takes the yellow ANSI slot. Periwinkle text and indigo line numbers keep long stretches of ordinary code quieter than the syntax around them.

![Python source, a two-line Git diff, and JSON output rendered in a Facet Dusk Konsole session](docs/images/terminal.png)

## Try it

From a full Git checkout, generate the themes and open the ANSI inspector. These commands write only to the checkout.

```bash
python3 -B -m facet_dusk build
./build/bin/facet-dusk-palette
```

The inspector pairs each indexed swatch with its truecolor equivalent. A difference shows how your current terminal interprets that ANSI slot. For a standalone editor theme, copy `build/zed/facet-dusk.json` to Zed’s themes directory and select **Facet Dusk**.

<details>
<summary>See the same source in Zed</summary>

![Python in Zed with copper decorators, turquoise functions, periwinkle text and an indigo gutter](docs/images/editor.png)

</details>

## Install on Linux

Close Konsole, preview the destinations, then install into your own account. Start a new interactive Bash session to load the prompt and tool colors.

```bash
python3 -B -m facet_dusk install --dry-run
python3 -B -m facet_dusk install
python3 -B -m facet_dusk audit
```

| Integration | What changes |
| --- | --- |
| Konsole | Installs a named profile and colorscheme. Pass `--set-default-konsole` to select it. |
| Bash and Readline | Adds marked includes for the prompt, file types, completion, grep, jq, and less/man text attributes. |
| Git and tmux | Includes generated settings for diffs, status, pane borders, and the status bar. |
| bat and ripgrep | Installs syntax highlighting and search colors, with indexed output when truecolor is unavailable. An explicit `BAT_THEME` takes precedence. |
| fastfetch | Installs a standalone preset. Pass `--fastfetch-default` to use it as the default when that path is free. |
| IntelliJ IDEA | With IDEA closed, `--with-jetbrains` updates terminal and console colors in the selected writable scheme. Editor syntax keeps its own theme. |
| Zed | `--zed-theme PATH` writes a standalone theme file. Theme selection stays in Zed. |

Set `FACET_DUSK_DISABLE=1` before sourcing Bash to opt out. Set `FACET_DUSK_GIT=0` to omit branch status or `FACET_DUSK_FRAME=0` to remove the prompt frame.

```bash
python3 -B -m facet_dusk uninstall
```

Removal clears managed includes and runtime files. It restores the previous Konsole default if Facet Dusk is still selected, and retains a profile you subsequently customized. The explicit IntelliJ scheme edit and Zed export remain yours.

## Verify and develop

The exercised environment is Fedora 44 KDE, x86-64, Python 3.14 and Bash 5.3. The Python tooling uses the standard library. The full suite also exercises installed applications and requires Git, bat, ripgrep, tree, tmux, fastfetch and util-linux `script`. The native previews were checked in Konsole 26.08, Zed 1.30 and IntelliJ IDEA 2026.3.

```bash
python3 -B -m facet_dusk verify
python3 -B -m facet_dusk docs
python3 -B -m facet_dusk version
```

Edit [the palette](palette/facet-dusk.json) to change a color or its semantic role. The [generated reference](docs/PALETTE.md) lists the ANSI mappings, surface blends and measured contrast.

After deployment and visual acceptance, maintainers run `python3 -B -m facet_dusk release` in a clean, fully tagged checkout. It verifies the installation and records an annotated local tag. Versions follow `YYYY.MM.N`, starting at 1 each month. Build counts official releases across months. Building, testing and reinstalling leave both numbers alone.

[MIT license](LICENSE)
