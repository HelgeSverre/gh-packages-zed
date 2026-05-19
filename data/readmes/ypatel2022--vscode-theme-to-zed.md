# VS Code Theme to Zed

Convert a VS Code color theme exported from your current settings into a Zed theme JSON file.

## Export your current VS Code theme

1. Open VS Code.
2. Open the Command Palette.
3. Run:

```text
Developer: Generate Color Theme From Current Settings
```

4. Save the generated theme as `vscode-theme.jsonc` in this folder.

## Run the converter

Generate a Zed theme from the exported VS Code theme:

```sh
uv run python convert_theme.py
```

This writes `zed-theme.json` and validates the generated file against `valid_schema.json`.

## Optional arguments

```sh
uv run python convert_theme.py --input my-theme.jsonc --output my-zed-theme.json --name "My Theme" --author "Your Name"
```

## Use the generated theme in Zed

Copy the generated JSON file into your Zed themes directory:

- macOS/Linux: `~/.config/zed/themes/`
- Windows: `%USERPROFILE%\\AppData\\Roaming\\Zed\\themes\\`

Then restart Zed or reload your themes and select the generated theme.
