
# Zarcula for Zed

Zarcula is a dark theme for the [Zed editor](https://zed.dev) inspired by JetBrains Darcula – but tuned specifically for Zed’s UI, terminal, and collaborative editing experience.

![Zarcula: Darcula’s sophisticated cousin, custom-built for Zed.](./assets/zarcula-preview.png)

[Git Panel & HTOP](assets/git-panel-python-htop.png) | [Project Panel & Python](assets/project-panel-python.png) | [Outline Panel & Json & MD](assets/outline-panel-json-md-logs.png)



## Features

Darcula’s sophisticated cousin, custom-built for Zed.


- **Carefully matched backgrounds and borders for**  
  - Editor and gutter
  - Panels and toolbars
  - Tabs, status bar, and title bar

- **Readable syntax colors**
  - Keywords & booleans: `#CC7832` (warm orange)
  - Strings & labels: `#6A8759` (muted green)
  - Numbers & numeric-like values: `#6897BB` (blue)
  - Functions: `#FFC66D` (soft yellow)
  - Types & selectors: `#8888C6` (violet)
  - Comments: `#808080` (neutral gray)
  - Doc comments: `#6A8759` (green, to stand out from regular comments)

- **Integrated terminal styling**
  - Dedicated ANSI palette matching the editor colors
  - Tuned normal, bright, and dim colors for long shell sessions

- **Rich diagnostics colors**
  - Error / warning / info / hint / success
  - created / modified / deleted / renamed

## Installation

You can install Zarcula directly from within Zed:

1. Open Zed.
2. Open the command palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) and enter _zed: extensions_.
3. Search for **"Zarcula"** or **`zed-zarcula-theme`** extension and install.
4. Click **Install**.

Or, if you’re using this repository locally during development:

1. Clone the repo:
   ```bash
   git clone https://github.com/igorgoroun/zed-zarcula-theme.git
2. Open the folder in Zed.
3. Zed will detect the extension manifest (`extension.toml`) and offer to load the theme.


## Activation

Once installed:

1. Open **Settings** → **Appearance** → **Theme**.
2. Choose **Zarcula – Dark** from the theme list.

You can also use the command palette:

1. Press `Ctrl+Shift+P` / `Cmd+Shift+P`.
2. Run **“Change Theme”**.
3. Select **Zarcula (Dark)**.


## Contributing

Feedback and contributions are welcome:

1. Fork the repo.
2. Make your changes to `themes/zed-zarcula-theme.json`.
3. Open a pull request on [GitHub](https://github.com/igorgoroun/zed-zarcula-theme)


## License

See the [LICENSE](./LICENSE) file in this repository for details.
