<h3 align="center">
    <img src="assets/logo.svg" width="80" alt="Logo"/><br/>
    Vibrant One Light for <a href="https://zed.dev/">Zed</a>
</h3>

<p align="center"><img src="assets/preview.png" width="100%"></p>

## Usage

> [!Note]
> For a couple of reasons, I did not register this as a Zed Extension!

1. Move your cwd to Zed local theme directory (`~/.config/zed/themes` on MacOS and Linux or
   `%USERPROFILE%\AppData\Roaming\Zed\themes\` on Windows). If the directory doesn't exist, create it yourself.
2. Directly fetch the theme configuration file from this repository:
```bash
curl -sSL https://raw.githubusercontent.com/namnkahn1607/vibrant-one-light/main/themes/vibrant-one-light.json
```
3. Open Zed theme selector (<kbd>Ctrl</kbd>+<kbd>K</kbd> <kbd>Ctrl</kbd>+<kbd>T</kbd>) and select **Vibrant One Light**.
4. Restart Zed.

## Customization

Use Zed's [theme overrides](https://zed.dev/docs/themes#theme-overrides) in `settings.json` to customize your own colors.
For example:
```json
{
  "theme_overrides": {
    "Vibrant One Light": {
      "syntax": {
        "variable": {
          "color": "#4078f2"
        }
      }
    }
  }
}
```

If a token does not change, focus on editor and run `dev: open highlights tree view` from command palette to identify
the capture name/syntactic rule it uses.

## Reference

This theme mixes some color from other popular themes, making it versatile as well!

- [ayu](https://github.com/ayu-theme/vscode-ayu) (version control, status color)
- [tokyo-night](https://github.com/tokyo-night/tokyo-night-vscode-theme) (terminal color)
