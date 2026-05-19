# Borderless Minimal for Zed

Borderless Minimal is a small Zed theme extension inspired by a custom Obsidian theme built around old CRT phosphor displays.

The package includes three dark variants:

- `Borderless Minimal Ice`
- `Borderless Minimal Green`
- `Borderless Minimal Amber`

## Design Notes

Zed themes can control colors, syntax colors, terminal colors, and editor chrome. They cannot inject custom CSS, overlays, scanlines, or animation like an Obsidian theme can.

This port keeps the parts Zed can express:

- low-luminance black and brown backgrounds
- monochrome phosphor foregrounds
- borderless surfaces separated by contrast only
- restrained glow-like accents via contrast and selection colors
- monochrome-leaning syntax with small hue shifts for readability

## Local Development

1. Keep this folder as the extension root.
2. Copy it into Zed's development extensions directory.
3. Run `node scripts/build-theme.mjs` after palette changes.
4. In Zed, run `zed: reload extensions`.

## Publishing Checklist

1. Commit the generated `themes/borderless-minimal.json`.
2. Keep an accepted license in the repo. This project uses MIT.
3. Push the repo to GitHub.
4. Submit the extension to the `zed-industries/extensions` index by adding your repository as a submodule and an entry in that repo's `extensions.toml`.

## Files

- `extension.toml`: extension metadata used by Zed.
- `scripts/build-theme.mjs`: small generator for the theme family.
- `themes/borderless-minimal.json`: generated Zed theme definition.
