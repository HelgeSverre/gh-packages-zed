# Monokai Vibrant for Zed

A Zed port of Dylan Marsh's [Monokai Vibrant](https://github.com/dylantmarsh/monokai-vibrant)
VS Code theme — a very dark, high-contrast Monokai variant with a vibrant red,
green, cyan, yellow, magenta, and orange syntax palette.

![Monokai Vibrant in Zed](./screenshot.png)

## Install

### From the Zed extension registry

1. Open Zed.
2. Open the command palette (`cmd-shift-p` / `ctrl-shift-p`) and run `zed: extensions`.
3. Search for **Monokai Vibrant** and click **Install**.
4. Open the theme picker (`cmd-k cmd-t` / `ctrl-k ctrl-t`) and choose **Monokai Vibrant**.

### As a dev extension (from source)

1. Clone this repository.
2. In Zed, run `zed: install dev extension` from the command palette.
3. Select the cloned folder.
4. Pick **Monokai Vibrant** from the theme picker.

## Differences from the VS Code original

Zed's theme schema doesn't map one-to-one to VS Code's, so a few things are
necessarily approximate:

- Semantic token colors are mapped onto Zed's syntax categories rather than
  TextMate scopes directly.
- Bracket-pair colorization, terminal ANSI colors, and some UI accents (status
  bar, title bar) have been chosen to harmonize with the original palette
  rather than copied verbatim.

Spot something off? Please open an issue.

## Credits

- Original theme by **[Dylan Marsh](https://github.com/dylantmarsh)** — based on
  Monokai Vibrant `0.5.3`.
- Zed port by **[Alexander Heffernan](https://github.com/AlexanderHeffernan)**.

## License

[MIT](./LICENSE) — same as the original theme.
