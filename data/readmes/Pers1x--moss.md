# Moss

Moss is a professional multi-editor theme collection built around deep forest surfaces, warm mineral accents, and restrained contrast. The project currently ships a polished Zed implementation and a full Visual Studio Code port with matching dark and light variants.

Core anchors:

- Racing Green: `#060D08`
- Seaweed: `#1D2A10`
- Costa Del Sol: `#595D2B`
- Raw Sienna: `#CD8A39`
- Oregon: `#A24502`

Shared palette references live in [palette/palette.json](palette/palette.json) and [palette/colors.md](palette/colors.md).

## Supported Editors

- Zed
- Visual Studio Code

Editor-specific packages live in:

- [zed/](zed/)
- [vscode/](vscode/)

## Screenshots

Zed Dark:
![Zed Dark](docs/screenshots/zed-dark.png)

Zed Light:
![Zed Light](docs/screenshots/zed-light.png)

VS Code Dark:
![VS Code Dark](docs/screenshots/vscode-dark.png)

VS Code Light:
![VS Code Light](docs/screenshots/vscode-light.png)

## Installation

### Zed

1. Open Zed.
2. Open the Extensions page.
3. Click `Install Dev Extension`.
4. Select the local `zed` folder from this repository.
5. Choose `Moss` or `Moss Light` from the theme picker.

Additional Zed instructions are in [zed/README.md](zed/README.md).

### Visual Studio Code

Marketplace install:

1. Open Extensions.
2. Search for `Moss`.
3. Install the theme package.
4. Run `Preferences: Color Theme`.
5. Choose `Moss Dark` or `Moss Light`.

Local development install:

1. Open the local `vscode` folder from this repository in VS Code.
2. Run `npm install -g @vscode/vsce` if needed.
3. Run `vsce package`.
4. In VS Code, run `Extensions: Install from VSIX...` and select the generated package.

Additional VS Code instructions are in [vscode/README.md](vscode/README.md).

## Development

Repository layout:

```text
moss/
├── docs/
├── palette/
├── zed/
└── vscode/
```

Development conventions:

- Keep the palette shared across editors.
- Port changes faithfully instead of redesigning per editor.
- Avoid editor defaults for important UI surfaces.
- Validate package metadata before publishing.

## Roadmap

- Capture final editor screenshots for release assets.
- Publish the Zed package to the Zed extension registry.
- Publish the VS Code package to the Visual Studio Marketplace.
- Add automated validation for JSON manifests and theme payloads.
- Expand support notes for JetBrains and additional editors if the palette is ported later.

## Contributing

Contributions are welcome if they preserve the Moss design language.

Before opening a pull request:

1. Keep dark and light variants visually aligned.
2. Test readability in Python, Rust, TypeScript, Go, C++, JSON, Markdown, YAML, and TOML.
3. Avoid introducing neon accents or default-looking UI fallbacks.
4. Update the relevant changelog and documentation.

## License

Moss is released under the [MIT License](LICENSE).
