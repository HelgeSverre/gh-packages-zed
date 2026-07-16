# zed blurred macos

a collection of macos-inspired themes for the [zed](https://zed.dev) editor.
50 themes total: five palettes, light and dark, each shipped in five chrome
variants from fully solid to fully translucent.

## preview

live, interactive showcase: switch palettes, step through chrome variants,
inspect the syntax tokens. runs as a static page, no build step.

[open the preview](https://k6w.github.io/zed-blurred-macos/preview/)

to run it locally:

```sh
python main.py preview         # regenerate after edits
python -m http.server -d preview  # then visit http://localhost:8000
```

## palettes

| family    | light         | dark          |
| --------- | ------------- | ------------- |
| classic   | system blues  | true black    |
| graphite  | warm greys    | charcoal      |
| aqua      | cool sky      | deep ocean    |
| rose      | blush         | wine          |
| warm      | cream         | umber         |

## variants

every palette ships in five chrome variants. the editor and terminal stay
the same colors; only the surrounding chrome (title bar, status bar, tab
bar, sidebar, borders) changes how much of the desktop shows through.

| variant          | description                                                  |
| ---------------- | ------------------------------------------------------------ |
| normal           | fully solid. the macos look without any translucency.        |
| opaque           | solid editor and terminal; chrome gets the layered macos feel. |
| blurred light    | editor transparent; chrome mostly solid. easy on busy walls. |
| blurred          | editor transparent; chrome a soft tint. the default blur.    |
| blurred extra    | chrome almost vanishes. maximum wallpaper visibility.        |

in zed, set `background.appearance` is exported by `opaque` and the three
`blurred*` variants, so the editor itself goes translucent on supporting
platforms.

## install

zed installs extensions straight from github. add this to your zed
`settings.json`:

```json
{
  "extensions": {
    "macos-blurred-collection": { "github": { "repo": "k6w/zed-blurred-macos" } }
  }
}
```

or use the command palette: `zed extensions install macos-blurred-collection`.

the theme picker will list every theme as
`macOS <Palette> <Mode> <Variant>` (for example,
`macOS Classic Dark Blurred`).

## project structure

```
.
|-- extension.toml                  zed extension manifest
|-- main.py                         build entry point
|-- src/
|   |-- colors.py                   pure color utilities
|   |-- palettes.py                 palette definitions + overrides
|   |-- syntax.py                   min-theme syntax palettes (light, dark)
|   |-- variants.py                 blur / opacity profiles per variant
|   |-- builder.py                  theme assembly logic
|   |-- output.py                   writes the zed theme json
|   `-- preview.py                  writes the static html preview
|-- themes/
|   `-- macos-blurred-variants.json the generated theme collection
`-- preview/
    |-- index.html                  generated showcase page
    |-- styles.css                  generated stylesheet
    |-- preview.js                  generated interactivity
    `-- data.js                     generated theme data
```

the source is split by concern so each file owns exactly one thing. to
customize a theme, edit the file that matches what you want to change:

- want to retune a color?         edit `src/palettes.py`
- want a new chrome variant?      edit `src/variants.py`
- want to change syntax colors?   edit `src/syntax.py`
- want to add a new ui surface?   edit `src/builder.py`
- want to tweak the preview?      edit `src/preview.py`

after any change, run `python main.py` to regenerate.

## build

```sh
python main.py              # build everything
python main.py themes       # only the zed theme json
python main.py preview      # only the static html preview
python main.py check        # exit non-zero if the committed json is stale
```

no dependencies, no virtualenv, no toolchain. python 3.9+ is enough.

## license

mit. see [license](./LICENSE).
