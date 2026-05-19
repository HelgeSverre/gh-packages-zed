# Cassette Futurism Theme

Analog Dream themes for Zed, ported from the Cassette Futurism palette:

- `Analog Dream: Magnetic Night` - dark CRT console colors with amber and phosphor accents.
- `Analog Dream: Beige Terminal` - light vintage workstation colors with deep retro accents.

## Install Locally

1. Open the Zed command palette.
2. Run `zed: install dev extension`.
3. Select this repository directory.
4. Select either Cassette Futurism theme from Zed's theme picker.

## Marketplace Readiness

This repository is structured as a standalone Zed theme extension:

- `extension.toml` is at the repository root.
- Theme JSON lives in `themes/cassette-futurism.json`.
- The theme file declares the official `https://zed.dev/schema/themes/v0.2.0.json` schema.
- The extension id is `cassette-futurism-theme`, which is suitable for the Zed extensions registry.
- `LICENSE` is present at the repository root.

To publish it in the Zed extension marketplace after the public GitHub repository exists, add it to `zed-industries/extensions`:

```bash
git clone https://github.com/zed-industries/extensions
cd extensions
git submodule add https://github.com/taotao7/cassette-futurism-theme extensions/cassette-futurism-theme
```

Then add this entry to `extensions.toml`:

```toml
[cassette-futurism-theme]
submodule = "extensions/cassette-futurism-theme"
version = "0.0.1"
```

Run `pnpm sort-extensions`, commit the change, and open a pull request.

## Development

The source palette is `palette.toml`. Regenerate the Zed theme file after changing colors:

```bash
python scripts/generate_theme.py
python scripts/generate_theme.py --check
python -m json.tool themes/cassette-futurism.json > /tmp/cassette-futurism.json
```

## Attribution

Based on the palette and theme direction from `taotao7/cassette-futurism`.

## License

MIT

