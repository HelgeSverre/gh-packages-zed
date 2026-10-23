<p align="center">
	<img src=".github/assets/preview.png" width="100%" alt="Vesper Plus — minimal Zed theme with warm orange accents" />
</p>

<p align="center">
	<a href="https://github.com/alvgaona/vesper-plus/stargazers"><img src="https://img.shields.io/github/stars/alvgaona/vesper-plus?colorA=101010&colorB=FFC799&style=for-the-badge"></a>
	<a href="https://github.com/alvgaona/vesper-plus/issues"><img src="https://img.shields.io/github/issues/alvgaona/vesper-plus?colorA=101010&colorB=99FFE4&style=for-the-badge"></a>
	<a href="https://github.com/alvgaona/vesper-plus/contributors"><img src="https://img.shields.io/github/contributors/alvgaona/vesper-plus?colorA=101010&colorB=A0A0A0&style=for-the-badge"></a>
</p>

Minimal theme for Zed with warm orange accents, in three variants: _Vesper_, _Vesper Light_ and _Vesper Blurred_.

## Usage

1. Open Zed.
2. Open the command palette (<kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>) and enter _zed: extensions_.
3. Search for the _Vesper Plus_ extension and install.
4. Enter _theme selector: toggle_ and pick a variant.

### Manual

Prefer not to use the extension store? Copy the files in [`themes/`](themes) into `~/.config/zed/themes/`, then run _theme selector: toggle_.

## Development

`themes/vesper-dark-blurred.json` is generated. Edit `themes/vesper-dark.json`, then run `bun run build` to regenerate Vesper Blurred, and `bun run check` to validate (`bun run format` fixes formatting). Run `bun install` once for the git hooks. Test with _zed: install dev extension_. See the [Zed docs](https://zed.dev/docs/extensions/developing-extensions). Commits follow [Conventional Commits](https://www.conventionalcommits.org).

&nbsp;

<p align="center">
	<a href="LICENSE"><img src="https://img.shields.io/static/v1.svg?style=for-the-badge&label=License&message=MIT&colorA=101010&colorB=FFC799"/></a>
</p>
