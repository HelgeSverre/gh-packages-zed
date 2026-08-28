# Pale Fire for Zed

A faithful port of [Pale Fire](https://github.com/matklad/pale-fire), itself based on Zenburn, for the [Zed editor](https://zed.dev/).

Pale Fire keeps the original theme's restrained palette while providing broad syntax coverage across Ruby, Go, Python, Rust, JavaScript, TypeScript, HTML, CSS, data formats, markup, shells, SQL, and other Zed languages. Ruby, Rails, and ERB receive additional testing so classes, constants, methods, variables, symbols, interpolation, and embedded templates remain easy to distinguish.

## Variants

- Pale Fire
- Pale Fire Darker
- Pale Fire High Contrast
- Pale Fire Stealth

## Highlights

- User-defined types use violet, distinct from cyan functions and methods.
- Built-in types use teal, while interfaces and traits use italic teal.
- Symbols use muted amber, distinct from red strings and regular expressions.
- The theme includes comprehensive Tree-sitter and semantic-token mappings for consistent cross-language highlighting.
- Syntax highlighting does not use bold font weights.

## Installation

Open Zed's Extensions page, search for **Pale Fire**, and select **Install**. Then open the theme selector and choose one of the four Pale Fire variants.

To test the repository as a development extension, run `zed: install dev extension` from the command palette and select the repository directory.

## Development

```sh
npm run build
npm run check
```

The generated theme is located at `themes/pale-fire.json`.

## License and credits

Pale Fire for Zed is licensed under [GNU GPLv3](LICENSE). See [ATTRIBUTION.md](ATTRIBUTION.md) for Pale Fire and Zenburn credits.
