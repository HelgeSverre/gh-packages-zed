# Coding in the Sun

A high-contrast light theme for [Zed](https://zed.dev), designed to keep code readable in bright environments and direct sunlight.

This is a Zed port of Michael Fasani's [Coding in the Sun](https://github.com/Fasani/coding-in-the-sun) theme for Visual Studio Code.

## Installation

Once published, open Zed's Extensions view, search for **Coding in the Sun**, and select **Install**.

To install this repository during development:

1. Clone the repository.
2. In Zed, run `zed: install dev extension` from the command palette.
3. Select the cloned repository directory.
4. Open the theme selector and choose **Coding in the Sun**.

## Development

The extension is data-only and has no build step:

- `extension.toml` contains the extension metadata.
- `themes/coding-in-the-sun.json` contains the Zed theme definition.

After changing the theme, reinstall or reload the development extension in Zed and verify the theme in the languages you use.

## Attribution

The original Coding in the Sun theme was created by Michael Fasani and released under the MIT License. This repository adapts that theme for Zed.

## License

MIT. See [LICENSE](LICENSE).
