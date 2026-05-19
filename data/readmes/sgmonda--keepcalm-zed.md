
![236014786-d399c38d-1017-453a-a7c8-ad023f05319b](https://github.com/user-attachments/assets/062fffc0-8d50-4a25-895e-f297b2658528)

# KeepCalm

A calm and focused dark theme for [Zed](https://zed.dev).

## Installation

1. Open Zed
2. Open the command palette (`Cmd+Shift+P`)
3. Search for "zed: extensions"
4. Search for "KeepCalm" and click Install

## Color Palette

| Element | Color |
|---------|-------|
| Background | `#1d191a` |
| Foreground | `#e7e8ea` |
| Keywords | `#e7809c` |
| Functions | `#d4c79a` |
| Strings | `#7fac82` |
| Types | `#efac71` |
| Comments | `#6e7681` |

## Local Development

To test the theme locally:

```bash
cp -r . ~/.config/zed/extensions/installed/keepcalm
```

Or use Zed's command palette: "zed: install dev extension"

## Publishing

### Initial Publication

1. Fork the [zed-industries/extensions](https://github.com/zed-industries/extensions) repository

2. Add this repository as a submodule (use HTTPS, not SSH):
   ```bash
   git submodule add https://github.com/sgmonda/keepcalm-zed.git extensions/keepcalm
   ```

3. Add an entry to `extensions.toml`:
   ```toml
   [keepcalm]
   submodule = "extensions/keepcalm"
   version = "1.0.0"
   ```

4. Sort the extensions:
   ```bash
   pnpm sort-extensions
   ```

5. Open a pull request to `zed-industries/extensions`

### Publishing Updates

When you have new changes to publish:

1. Update `version` in `extension.toml`

2. Commit and push changes to this repository

3. In your fork of `zed-industries/extensions`:
   ```bash
   git submodule update --remote extensions/keepcalm
   ```

4. Update the version in `extensions.toml` to match

5. Run `pnpm sort-extensions`

6. Open a pull request

Alternatively, use the [zed-extension-action](https://github.com/huacnlee/zed-extension-action) GitHub Action to automate updates.

## License

MIT
