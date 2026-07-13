# Logos Theme

Logos Theme is a coordinated four-theme family for Zed, designed for readable code, calm interface chrome, and clear semantic color.

## Included themes

- `Logos Light` — an opaque neutral light palette.
- `Logos Dark` — an opaque near-black palette with an off-white reading layer.
- `Logos Light Blur` — a light frosted variant that carries the window backdrop through the chrome, panels, editor, and terminal.
- `Logos Dark Blur` — a charcoal, black-biased frosted variant with the same full-window treatment.

All four variants use blue for focus, links, and selections; a broader semantic palette for syntax; and distinct colors for file and version-control states.

## Install as a development extension

1. Open Zed.
2. Run `zed: install dev extension` from the command palette.
3. Select the directory containing this `extension.toml`.
4. Choose one of the Logos variants in the theme picker.

## Blur behavior

`Logos Light Blur` and `Logos Dark Blur` request Zed's blurred window appearance and use alpha-backed theme surfaces so the system backdrop can show through.

The variants are visually tuned on macOS, but Zed and the operating-system compositor produce the final material. Its appearance can vary by platform, window state, and what is behind the window. If backdrop blur is unavailable or disabled, the blur variants may look flatter or more transparent than intended.

Use `Logos Light` or `Logos Dark` when you want fully opaque application, editor, and terminal backgrounds.

## Design principles

- Prioritize readable text before using color for meaning.
- Use blue for focus, links, selections, and primary editor accents.
- Preserve semantic syntax distinctions without excessive visual noise.
- Keep created, modified, deleted, renamed, conflicted, ignored, hidden, and unreachable states distinguishable.
- Give elevated surfaces such as menus and dialogs a stronger tint for legibility.

## Project contents

- `extension.toml` contains the Zed extension metadata.
- `themes/logos.json` contains all four theme variants.

The repository contains no runtime code, dependencies, bundled icons, fonts, images, generated assets, or third-party theme files.

## License

Logos Theme is available under the [MIT License](LICENSE).
