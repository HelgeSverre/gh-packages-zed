# Sonokai Zed

A port of the [Sonokai](https://github.com/sainnhe/sonokai) Neovim theme to Zed.
Includes 7 variants:

- **Default** - The classic Sonokai look
- **Default Darker** - Darker version of Default
- **Shusia** - Warm, purple-toned
- **Andromeda** - Deep blue-purple
- **Atlantis** - Teal-green tones
- **Maia** - Muted teal
- **Espresso** - Warm brown tones

## Installation

### Dev Extension (for development)

1. Open Zed and go to the **Extensions** panel (`Ctrl+Shift+X` on Windows/Linux,
   `Cmd+Shift+X` on macOS)
2. Click **"Install Dev Extension"**
3. Navigate to and select this repository's directory

Zed will load the extension directly from the source directory, so any changes
you make are reflected after reloading.

### Zed Extension directories

- **Windows:** `$env:LOCALAPPDATA\Zed\extensions\installed`
- **macOS / Linux:** `~/.local/share/zed/extensions/installed`

## Development

The theme is generated from `generate.ts`. After editing it, run:

```sh
deno run --allow-write=themes/sonokai.json generate.ts
```

This writes `themes/sonokai.json` directly. Zed will pick up the changes
automatically when using the dev extension.

### Resources

- [Zed Theme Extensions docs](https://zed.dev/docs/extensions/themes)
- [Zed Theme Schema v0.2.0](https://zed.dev/schema/themes/v0.2.0.json)
- [Zed Theme Builder](https://zed.dev/theme-builder) — interactive preview tool

## Credits

Original theme by [sainnhe](https://github.com/sainnhe/sonokai).
