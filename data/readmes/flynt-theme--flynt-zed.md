# Flynt for Zed

Warm tones. Zero visual noise. - [Flynt](https://flynt-theme.github.io/flynt) for [Zed](https://zed.dev).

## Install

> Pending approval in the Zed extension marketplace.

### Manual

The built theme files are in [`themes/`](themes/).

```sh
mkdir -p ~/.config/zed/themes
cp themes/flynt-dark.json ~/.config/zed/themes/
cp themes/flynt-light.json ~/.config/zed/themes/
```

Then select it via `zed: open theme selector`.

## Building from source

Themes are generated from [`theme.json.tmpl`](theme.json.tmpl) using [strike](https://github.com/flynt-theme/strike).

```sh
brew tap flynt-theme/tap && brew install strike
strike build theme.json.tmpl --out themes/
```

## License

MIT - [Flynt Theme](https://github.com/flynt-theme)
