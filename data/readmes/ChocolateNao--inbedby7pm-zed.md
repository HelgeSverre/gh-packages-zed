# In Bed By 7pm Theme for Zed

A port of a popular [theme](https://marketplace.visualstudio.com/items?itemName=sdras.inbedby7pm) for [Zed](https://zed.dev/) with some minor adjustments.

<details>
<summary>Preview</summary>
Icons come from <a href="https://github.com/catppuccin/zed-icons"><i>Catppuccin Icons</i></a> extension

<img src="assets/inbedby7pm-showcase.png"/>
</details>

## Usage

### Manual Installation

1. Download the `.json` file with the theme variant of your choice from the [latest release](https://github.com/ChocolateNao/inbedby7pm-zed/releases/latest)
2. Navigate to `~/.config/zed/themes/` and place the file inside
3. Enter _theme selector: toggle_ in the command palette (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>) and select your variant of __In Bed By 7pm__ theme in the dropdown

### Zed Extensions

1. Open Zed
2. Press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>X</kbd> to open Zed extensions menu (alternatively, you can open the menu by typing _zed: extensions_ in the command palette (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>))
3. Search for the __In Bed By 7pm__ extension and install it

> [!TIP]
> After installation, you can switch to another theme at any time by entering _theme selector: toggle_ in the command palette and selecting the new theme in the dropdown

## Development

Variants may be developed in a separate file with the same top level `name` field.

To start off, simply clone the repository. The theme is at `themes` folder. For local development, there is a cool feature called `Install Dev Extension` in `zed: extensions` tab, although at the moment it does not support hot-reload, you will tave to manually click `Rebuild` button every time you make a change. It is also advised to check logs if something does not work.

```bash
# check Zed logs
tail -f /home/[username]/.local/share/zed/logs/Zed.log

# commit as you normally would
git add .
git commit -m "feat: my significant contribution"
```

## License

[MIT](https://github.com/ChocolateNao/inbedby7pm-zed/blob/master/LICENSE)
