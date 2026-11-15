# Zed Pixel Icon

Pixel-art file and folder icons for the [Zed](https://zed.dev) project panel.
A port of [Jerry's Pixel Icons](https://github.com/wolfsouldev/jerrys-pixel-icons)
(VS Code) to Zed's native icon theme format.

![Zed Pixel Icon preview](assets/preview.jpg)

## Highlights

- **190 pixel-art SVGs** drawn on a 16×16 grid — 88 file icons and 51 folder
  icon pairs (collapsed + expanded).
- **145 exact file names** and **124 suffixes** mapped, including compound
  suffixes such as `d.ts`, `tar.gz`, `tf.json` and `module.ts`.
- **Supports 50+ named folders** (`src`, `components`, `node_modules`, `.git`,
  `docs`, `tests`, …) with dedicated open/closed states.
- Framework config files get their own icons: Vite, Next.js, Nuxt, Astro,
  Tailwind, ESLint, Prettier, Vitest, Playwright, Prisma, Terraform, Kubernetes.
- Everything outside the map falls back to the pack's generic text-file icon,
  so the panel stays visually consistent.

## Installation

The extension targets **Zed 1.28 or newer**.

1. Clone this repository (or download and unpack the archive):

   ```sh
   git clone https://github.com/qwecold/zed-pixel-icon.git
   ```

2. In Zed, open the command palette (`Ctrl+Shift+P`) and run
   **`zed: extensions`**.
3. Click **Install Dev Extension** and select the `zed-pixel-icon` folder
   (the one containing `extension.toml`).
4. Select the theme in **Settings → Icon Theme → Zed Pixel Icon**, or add it to
   your settings:

   ```json
   {
     "icon_theme": {
       "mode": "dark",
       "light": "Zed Pixel Icon",
       "dark": "Zed Pixel Icon"
     }
   }
   ```

   A plain string works too:

   ```json
   { "icon_theme": "Zed Pixel Icon" }
   ```

## How it works

Zed icon themes are pure data: a JSON file in `icon_themes/` plus SVG assets
referenced relative to the extension root. The theme here is generated from
`catalog/icons.json`, the same catalog the upstream VS Code extension uses, so
icon additions can be ported with a single command:

```sh
node scripts/build-icon-theme.mjs
```

The script validates that every referenced SVG exists, resolves open/closed
folder pairs (`folder.svg` / `folder-open.svg`, plus explicit `expandedId`
entries), registers capitalized folder spellings for case-sensitive matching,
and writes `icon_themes/zed-pixel-icon.json`.

## Project layout

```
extension.toml                  Zed extension manifest
icon_themes/
  zed-pixel-icon.json           generated Zed icon theme
icons/
  files/                        88 file icons
  folders/                      51 folder icon pairs (open + closed)
catalog/
  icons.json                    source catalog (from Jerry's Pixel Icons)
  icons.schema.json             catalog schema
scripts/
  build-icon-theme.mjs          catalog → Zed icon theme generator
assets/
  preview.html                  local preview page
  preview.jpg                   rendered preview
LICENSE                         MIT license
ICON_NOTICES.txt                artwork attribution and license exceptions
```

## Adding icons

1. Drop a new SVG into `icons/files/` or `icons/folders/` (folder icons need a
   matching `-open.svg` variant).
2. Add an entry to `catalog/icons.json`, for example:

   ```json
   {
     "id": "elixir",
     "extensions": ["ex", "exs"],
     "label": "Elixir"
   }
   ```

   The `icon` field is optional and defaults to `id`. Folder entries also accept
   `expandedId` for a differently named open state.
3. Run `node scripts/build-icon-theme.mjs`.
4. Reinstall the dev extension in Zed (or restart Zed) to pick up the changes.

Extra associations that are not part of the upstream catalog (e.g. `Cargo.toml`,
`pyproject.toml`, `compose.yaml`) live in `EXTRA_FILE_STEMS` and
`EXTRA_FILE_SUFFIXES` at the top of the build script.

## Credits and license

- Icons: **Jerry's Pixel Icons** by Melissa Gutierrez
  ([@melisapo](https://www.linkedin.com/in/melisapo/)), maintained by
  [wolfsouldev](https://github.com/wolfsouldev/jerrys-pixel-icons), MIT licensed.
- Zed port: `zed-pixel-icon`, built on the upstream source catalog.
- Icon-specific attribution and license exceptions (Angular and Kubernetes
  artwork are CC BY 4.0) are documented in [`ICON_NOTICES.txt`](ICON_NOTICES.txt).
- The extension code and theme data are distributed under the MIT license; see
  [`LICENSE`](LICENSE).

Brand names and trademarks belong to their respective owners. This project is
not affiliated with or endorsed by them.
