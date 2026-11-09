# Gruvbox AMOLED

Pure-black Gruvbox themes: one family of three contrast levels for [Zed](https://zed.dev), plus the matching theme for [OMP](https://omp.sh).

Every variant keeps `#000000` as the editor background, so a black OLED panel is actually off where there is no text. The palette is canonical Gruvbox Dark — red `#fb4934`, green `#b8bb26`, yellow `#fabd2f`, blue `#83a598`, purple `#d3869b`, aqua `#8ec07c`, orange `#fe8019`, foreground `#ebdbb2` — with the three variants differing only in the raised surfaces.

## Variants

| Zed theme name | Background | Active line / element | Border |
|---|---|---|---|
| Gruvbox AMOLED Hard | `#000000` | `#1d2021` | `#3c3836` |
| Gruvbox AMOLED Medium | `#000000` | `#282828` | `#504945` |
| Gruvbox AMOLED Soft | `#000000` | `#32302f` | `#504945` |

## Install — Zed

As a dev extension: `zed: extensions` → **Install Dev Extension** → pick this repository.

Or manually:

```bash
cp themes/gruvbox.json ~/.config/zed/themes/
```

Restart Zed (the theme picker only rescans on start), then choose a variant under `theme.dark`:

```json
{ "theme": { "mode": "dark", "dark": "Gruvbox AMOLED Hard" } }
```

The extension manifest (`extension.toml`) is included, so the repository can also be submitted to the Zed extension registry.

## Install — OMP

```bash
mkdir -p ~/.omp/agent/themes
cp omp/gruvbox-amoled.json ~/.omp/agent/themes/
```

Select it in `/settings` → Appearance → Dark Theme, or set it in `~/.omp/agent/config.yml`:

```yaml
theme:
  dark: gruvbox-amoled
```

## Files

| File | For | Contents |
|---|---|---|
| `themes/gruvbox.json` | Zed | theme family, three variants |
| `omp/gruvbox-amoled.json` | OMP | one theme, 68 color tokens, terminal ANSI palette |

## Credits

Palette: [morhetz/gruvbox](https://github.com/morhetz/gruvbox) (MIT). Theme definitions: Benjamin Steimer.

## License

MIT — see [LICENSE](LICENSE).
