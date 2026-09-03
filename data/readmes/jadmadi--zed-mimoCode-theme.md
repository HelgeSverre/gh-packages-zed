# MimoCode-theme

A warm theme pair for [Zed](https://zed.dev) with signature orange accents.

- **Mimocode** — warm-black surfaces, vivid orange / indigo / teal / amber syntax
- **Mimocode Light** — warm cream surfaces, same accent families

by **Jad Madi** — [X / @jadmadi](https://x.com/jadmadi) · [GitHub / jadmadi](https://github.com/jadmadi)

## Install

### From the marketplace

Open the theme selector (`cmd-k cmd-t` on macOS / `ctrl-k ctrl-t` elsewhere) → **Get Themes**, search **MimoCode-theme**, install, and pick **Mimocode** or **Mimocode Light**.

### Automatic light / dark switching

Zed follows your system appearance when both themes are set in `settings.json`:

```json
{
  "theme": { "light": "Mimocode Light", "dark": "Mimocode" }
}
```

### Manual copy

Copy `themes/mimocode.json` into `~/.config/zed/themes/` and select **Mimocode** or **Mimocode Light** in the theme picker. On Linux:

```sh
mkdir -p ~/.config/zed/themes
cp themes/mimocode.json ~/.config/zed/themes/
```

## License

MIT — see [LICENSE](LICENSE).