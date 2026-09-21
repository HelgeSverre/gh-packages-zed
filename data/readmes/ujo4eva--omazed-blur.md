# omazed-blur

A translucent **Omazed Blur** companion to [omazed](https://github.com/aps6/omazed)'s
opaque Zed theme — theme hooks keep working while your windows stay translucent.

omazed generates `~/.config/zed/themes/omazed.json` from your Omarchy palette on
every theme switch. This hook runs right after omazed's own hook and appends a
second `Omazed Blur` theme to the same file, following the Catppuccin Blur
recipe: `background.appearance: blurred`, transparent editor/gutter/terminal/
tab-bar/panel surfaces, and alpha-blended chrome.

## Install

```bash
git clone https://github.com/ujo4eva/omazed-blur.git
cd omazed-blur
./install.sh
```

Then in Zed open the theme selector (<kbd>Ctrl</kbd>+<kbd>K</kbd>
<kbd>Ctrl</kbd>+<kbd>T</kbd>) and pick **Omazed Blur** once. Every Omarchy
theme switch regenerates both variants and never overrides your selection.

Requirements: `omazed` installed and set up (`omazed setup`), plus `python3`
for the theme post-processing step.

## Uninstall

```bash
./uninstall.sh
```

This removes the hook only; your generated Zed themes are left untouched.

## How it works

- **Omarchy v4**: installs `99-omazed-blur` into `~/.config/omarchy/hooks/theme-set.d/`
  (the `99-` prefix keeps it after omazed's own `omazed` hook).
- **Omarchy v3**: installs `~/.local/bin/omazed-blur` and appends a marked block
  to the single `~/.config/omarchy/hooks/theme-set` file.
- The hook is idempotent (re-running replaces the Blur entry) and never fails
  the hook chain — all error paths exit 0.
