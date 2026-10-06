# Blue Velvet

A deep blue color scheme for the Zed/Gram text editors featuring muted pastel highlights.

![Screen Shot](/screenshot.png)

## Installation

### Zed

As an extension:

```sh
git clone https://github.com/silenttwin/blue-velvet ~/.local/share/zed/extensions/blue-velvet
```

Or skip the extension and drop the theme in as a user theme:

```sh
cp "themes/Blue Velvet.json" ~/.config/zed/themes/
```

Then set `"theme": "Blue Velvet"` in Zed settings.

## Ports

### Ghostty

```sh
mkdir -p ~/.config/ghostty/themes
cp "ghostty/Blue Velvet" ~/.config/ghostty/themes/
```

Then in your Ghostty config:

```
theme = Blue Velvet
```

### Sublime Text

Sublime only lists a color scheme in the picker when it sits in a package folder that also contains a `.sublime-theme` file. Copy the scheme next to your own theme file, e.g.:

Linux:

```sh
git clone https://github.com/silenttwin/blue-velvet ~/.config/sublime-text/Packages/blue-velvet
```

macOS: use `~/Library/Application Support/Sublime Text/Packages` instead.

The scheme appears in the dropdown <kbd>cmd/ctrl+shift+p</kbd> -> <kbd>UI: Select Color Scheme</kbd> -> <kbd>Blue Velvet</kbd>.

### fish

Clone the repo or copy `fish/Blue Velvet.fish` locally, then:

```sh
source "fish/Blue Velvet.fish"
```

To make it permanent, add that line to `~/.config/fish/config.fish`, or copy the file into `~/.config/fish/functions` and source it there.
