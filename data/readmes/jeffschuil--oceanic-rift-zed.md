# Oceanic Rift for Zed

A deep-ocean dark theme for the [Zed](https://zed.dev) editor — calm blue
surfaces with a warm, high-contrast syntax palette. The Zed sibling of the
[Oceanic Rift VS Code theme][vscode].

## Install

From the published Zed extension registry: open **Extensions** in Zed, search
**Oceanic Rift**, install, then pick it from the theme selector
(`cmd-k cmd-t`).

### Local / development

Either copy the theme into your Zed config:

```sh
cp themes/oceanic-rift.json ~/.config/zed/themes/
```

…or install this repo as a dev extension: Zed command palette →
**zed: install dev extension** → select this folder.

## Notes

This Zed theme is a faithful adaptation of the VS Code theme's feel rather than
a 1:1 match (some fine-grained distinctions, like storage vs. control keywords,
collapse into a single capture in Zed). The palette is shared — see
[PALETTE.md][palette] in the VS Code repo.

## Credits

Part of a lineage of ocean themes:

- **Oceanic Rift** (this, for Zed) and the [VS Code edition][vscode] — adapted from
- **[Oceanic Reef][reef]** — the author's Atom syntax theme, itself based off
- **[Oceanic][oceanic]** — the original Textmate/Sublime color scheme by [memco][memco].

## License

[MIT](LICENSE) © Jeff Schuil

[vscode]: https://marketplace.visualstudio.com/items?itemName=jeffschuil.oceanic-rift
[palette]: https://github.com/jeffschuil/oceanic-rift/blob/main/PALETTE.md
[reef]: https://github.com/jeffschuil/oceanic-reef-syntax
[oceanic]: https://github.com/memco/Oceanic-tmTheme
[memco]: https://github.com/memco
