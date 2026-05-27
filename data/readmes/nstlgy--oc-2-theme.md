# OC-2 Theme for Zed

![OC-2 Theme preview inside Zed](assets/oc-2-preview.png)

OC-2 is a warm, expressive theme for [Zed](https://zed.dev), adapted from the original [OpenCode](https://opencode.ai/) OC-2 color palette. It pairs soft neutral surfaces with vivid syntax accents, keeping the editor calm without making code feel muted.

<p>
  <img alt="Zed" src="https://img.shields.io/badge/Zed-theme-1f1f1f?style=flat-square&labelColor=1c1c1c&color=fab283">
  <img alt="Variants" src="https://img.shields.io/badge/variants-light%20%2B%20dark-1f1f1f?style=flat-square&labelColor=1c1c1c&color=edb2f1">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-1f1f1f?style=flat-square&labelColor=1c1c1c&color=00ceb9">
</p>

## Variants

- `OC-2 Dark`
- `OC-2 Light`

## Palette

<p>
  <img alt="#fab283" src="https://placehold.co/88x28/fab283/1f1f1f?text=%23fab283">
  <img alt="#edb2f1" src="https://placehold.co/88x28/edb2f1/1f1f1f?text=%23edb2f1">
  <img alt="#00ceb9" src="https://placehold.co/88x28/00ceb9/1f1f1f?text=%2300ceb9">
  <img alt="#8cb0ff" src="https://placehold.co/88x28/8cb0ff/1f1f1f?text=%238cb0ff">
  <img alt="#fcd53a" src="https://placehold.co/88x28/fcd53a/1f1f1f?text=%23fcd53a">
  <img alt="#fc533a" src="https://placehold.co/88x28/fc533a/1f1f1f?text=%23fc533a">
</p>

## Install

Once published in the Zed extension registry, install it from Zed's Extensions view by searching for `OC-2 Theme`.

For local development or manual testing:

1. Clone this repository.
2. Open Zed.
3. Run `zed: install dev extension` from the command palette.
4. Select this repository directory.
5. Choose `OC-2 Dark` or `OC-2 Light` from the theme picker.

## Manual Theme File

You can also copy the theme JSON directly into Zed's user themes directory:

```sh
mkdir -p ~/.config/zed/themes
cp themes/oc-2.json ~/.config/zed/themes/oc-2.json
```

Then reload Zed and select one of the OC-2 themes.

## Credits

The original OC-2 theme and color palette were created by [OpenCode](https://opencode.ai/). This repository is an unofficial Zed editor adaptation by [nstlgy](https://github.com/nstlgy).

## License

MIT
