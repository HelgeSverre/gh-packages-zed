<h3 align="center">
  Neon Theme
</h3>

<p align="center">
  Vivid neon themes for <a href="https://zed.dev/">Zed</a>.
</p>

## Themes

- Neon Afterglow
- Neon Afterglow No Italics
- Neon Arctic
- Neon Arctic No Italics
- Neon Cyberwave
- Neon Cyberwave No Italics
- Neon Noir
- Neon Noir No Italics
- Neon Sunset
- Neon Sunset No Italics
- Neon Toxic
- Neon Toxic No Italics

## Usage

### Dev extension

1. Open Zed.
2. Open the command palette and run `zed: install dev extension`.
3. Select this repository.
4. Run `theme selector: toggle` and select a Neon theme.
5. After changes, run `zed: reload extensions`; `workspace: reload` may be needed if themes do not refresh.

### Local theme smoke test

```sh
mkdir -p ~/.config/zed/themes
cp themes/*.json ~/.config/zed/themes/
```

Then restart Zed and run `theme selector: toggle`.

## Development

Each theme lives in its own `themes/*.json` file.

If a theme does not load, run `zed: open log` and inspect `Zed.log`.
