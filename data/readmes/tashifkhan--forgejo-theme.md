# Forgejo Theme

Forgejo Dark and Forgejo Light for Zed and VS Code. Both ports use the CSS
tokens and Chroma syntax colors from Forgejo, including the steel surfaces,
orange controls, diff colors, and Actions console palette.

| Theme | Appearance | Forgejo source |
| --- | --- | --- |
| Forgejo Dark | dark | [`theme-forgejo-dark.css`](https://codeberg.org/forgejo/forgejo/src/branch/forgejo/web_src/css/themes/theme-forgejo-dark.css) and [`chroma/dark.css`](https://codeberg.org/forgejo/forgejo/src/branch/forgejo/web_src/css/chroma/dark.css) |
| Forgejo Light | light | [`theme-forgejo-light.css`](https://codeberg.org/forgejo/forgejo/src/branch/forgejo/web_src/css/themes/theme-forgejo-light.css) and [`chroma/light.css`](https://codeberg.org/forgejo/forgejo/src/branch/forgejo/web_src/css/chroma/light.css) |

## Layout

```
zed/       Zed extension and theme
vscode/    VS Code extension and themes
```

## Install locally

### Zed

```bash
mkdir -p ~/.config/zed/themes
cp zed/themes/forgejo.json ~/.config/zed/themes/
```

Restart Zed, then run `theme selector: toggle` with `cmd-k cmd-t` and choose
Forgejo Dark or Forgejo Light.

To load the extension during development, run `zed: install dev extension`
from Zed's command palette and select the `zed` directory.

### VS Code

```bash
cd vscode
npx --yes @vscode/vsce@latest package
code --install-extension forgejo-theme-0.1.1.vsix --force
```

Then run `Preferences: Color Theme` and choose Forgejo Dark or Forgejo Light.

## Validation

The Zed theme targets the official v0.2 theme schema. The VS Code package can
be checked and built with `@vscode/vsce`:

```bash
jq empty zed/themes/forgejo.json vscode/themes/*.json
cd vscode && npx --yes @vscode/vsce@latest package
```

## License

MIT. Forgejo's source files are also MIT licensed.
