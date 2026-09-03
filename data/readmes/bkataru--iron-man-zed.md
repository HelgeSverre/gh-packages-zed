<p align="center">
  <img src="icon.png" width="128" alt="Iron Man theme icon"><br>
  <strong>Iron Man</strong> is a theme for the
  <a href="https://zed.dev">Zed</a> editor.<br>
  The colors are arc-reactor gold, repulsor blue, and crimson red on near-black chrome.
</p>

<p align="center">
  <img src="assets/preview.png" alt="Iron Man Dark in Zed" width="900">
</p>

## Variants

Iron Man Dark is the primary theme.

The syntax colors are:

- Repulsor blue `#67C7EB` is for types, constructors, and enums.
- Bright repulsor `#9ADCF5` is for builtin primitives (`i32`, `str`).
- Arc gold `#FBCA03` is for values: numbers, booleans, constants, and variants.
- Bright gold `#FCE154` is for functions and macros.
- Bronze `#B97D10` is for strings.
- Mid gold `#D7BB2B` is for properties and parameters.
- Crimson `#DA1F28` is for keywords and HTML tags.
- Copper-orange `#FF8A1A` is for `self`.
- HUD magenta `#E04080` is for Rust lifetimes (`'a`, `'static`).

HUD magenta is near suit crimson. It is not type-blue and not copper. As a result, `&'a HashMap` and `&'a self` stay distinct.

Iron Man Light uses the same layout. The golds and blues are darker for white backgrounds.

Each documented Tree-sitter capture has an explicit style. Grammars also emit dotted children (`keyword.control`, `type.builtin`, `function.method`). Each variant has 65 keys.

### Contrast

Most syntax tokens meet WCAG AA (4.5:1 or more) against the editor background.

There is one known exception. The dark keyword crimson `#DA1F28` measures 3.97:1 (AA large). Red cannot meet 4.5:1 on near-black without a salmon hue. The theme keeps this color and uses font weight 600.

## Install

### From the Zed extension registry

If the extension is in the registry:

1. Open Zed.
2. Open Extensions (`ctrl-shift-x`).
3. Search for "Iron Man".

### Manual

The user-themes directory is:

- Windows: `%APPDATA%\Zed\themes\`
- macOS and Linux: `~/.config/zed/themes`.

1. Copy `themes/ironman.json` to the user-themes directory.
2. Select "Iron Man Dark" or "Iron Man Light" from the command palette.

## Publish

This repository is a [Zed theme extension](https://zed.dev/docs/extensions/themes).

The files are:

```
iron-man-zed/
├── extension.toml
├── themes/
│   └── ironman.json
```

`extension.toml` is the extension manifest. The `themes` key points at the JSON file. `ironman.json` holds both variants.

If you add this theme to the official registry of Zed:

1. Open a pull request against [zed-industries/extensions](https://github.com/zed-industries/extensions).
2. Add `"iron-man-theme"` to `extensions.toml`.

## License

MIT
