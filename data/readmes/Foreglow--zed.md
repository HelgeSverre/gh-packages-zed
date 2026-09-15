<p align="center"><img width="320" alt="foreglow-logo" src="https://github.com/user-attachments/assets/5b0f629b-9800-4c97-b23b-fa3f22681ea4" /></p>

<h3 align="center">Foreglow Theme for <a href="https://zed.dev/">Zed Editor</a></h3>

<p align="center">
  <a href="https://github.com/Foreglow/zed/stargazers"><img src="https://img.shields.io/github/stars/Foreglow/zed?style=for-the-badge&labelColor=313244&color=CB81E4" alt="Stars" /></a>
  <a href="https://github.com/Foreglow/zed/issues"><img src="https://img.shields.io/github/issues/Foreglow/zed?style=for-the-badge&labelColor=313244&color=8930A6" alt="Issues" /></a>
  <a href="https://github.com/Foreglow/zed/graphs/contributors"><img src="https://img.shields.io/github/contributors/Foreglow/zed?style=for-the-badge&labelColor=313244&color=FF6B8A" alt="Contributors" /></a>
  <a href="https://github.com/Foreglow/zed/blob/main/LICENSE"><img src="https://img.shields.io/github/license/Foreglow/zed?style=for-the-badge&labelColor=313244&color=2EE8C8" alt="License" /></a>
</p>

<p align="center"><img width="640" alt="foreglow-pack" src="https://github.com/user-attachments/assets/76249ab2-94c0-4477-ac7b-d485aa279abe" /></p>

## Previews

<details>
  <summary>🌃 Foreglow</summary>
  <img width="1460" height="1061" alt="foreglow" src="https://github.com/user-attachments/assets/0f451e59-a1a5-4d73-859a-56522a866e6d" />
</details>

<details>
  <summary>🌇 Afterglow</summary>
  <img width="1460" height="1061" alt="afterglow" src="https://github.com/user-attachments/assets/14ff88c6-5822-4beb-872a-7a6ebf07dd80" />
</details>

<details>
  <summary>🌉 Alpenglow</summary>
  <img width="1460" height="1061" alt="alpenglow" src="https://github.com/user-attachments/assets/67087c1c-df1a-4899-bf1b-185612a9e2ca" />
</details>

<details>
  <summary>🌌 Airglow</summary>
  <img width="1460" height="1061" alt="airglow" src="https://github.com/user-attachments/assets/142f498e-a0d9-461c-a693-c336dced38d7" />
</details>

A twilight-inspired theme family for the Zed editor, with four variants:
**Foreglow** (dark-dawn), **Afterglow** (light-dusk), **Alpenglow**
(rubescent), and **Airglow** (auroral).

## Repository Layout

```
.
├── extension.toml       # extension manifest (id, name, version, ...)
└── themes/
    └── foreglow.json     # theme family: all 4 variants in one file
```

This follows [Zed's extension format](https://zed.dev/docs/extensions/developing-extensions):
every extension needs an `extension.toml` manifest, and theme JSON files live
under `themes/`, each conforming to Zed's
[theme schema](https://zed.dev/schema/themes/v0.2.0.json) (a theme *family*
object containing one or more `themes` entries with `name`, `appearance`,
and a `style` map — not a flat list of color tokens).

## Try it locally (dev extension)

Zed doesn't have an in-app "paste theme JSON" flow — you install the whole
extension folder as a dev extension instead:

1. Clone this repo: `git clone https://github.com/Foreglow/zed.git`
2. In Zed, open the command palette (`Cmd+Shift+P` / `Ctrl+Shift+P`) and run
   **zed: install dev extension**
3. Select the cloned `zed` folder (the one containing `extension.toml`)
4. Open theme selection (`Cmd+K Cmd+T` / `Ctrl+K Ctrl+T`) and pick **Foreglow**,
   **Afterglow**, **Alpenglow**, or **Airglow**

If you already have the published extension installed, installing the dev
version will replace it. Check `~/.local/share/zed/logs/Zed.log` (or run
`zed --foreground` for verbose output) if something doesn't load.

## Publishing

Zed themes are distributed through the community
[zed-industries/extensions](https://github.com/zed-industries/extensions)
registry — there's no separate marketplace to upload to directly. To publish:

1. Read Zed's [publishing guidelines](https://zed.dev/docs/extensions/publishing/overview)
   (prerequisites and license requirements).
2. Fork [zed-industries/extensions](https://github.com/zed-industries/extensions)
   and clone it:
   ```bash
   git clone https://github.com/<your-username>/extensions
   cd extensions
   git submodule init
   git submodule update
   ```
3. Add this repo as a submodule (HTTPS, not SSH, and it must be publicly
   accessible):
   ```bash
   git submodule add https://github.com/Foreglow/zed.git extensions/foreglow-theme
   git add extensions/foreglow-theme
   ```
4. Add an entry to their `extensions.toml`:
   ```toml
   [foreglow-theme]
   submodule = "extensions/foreglow-theme"
   version = "0.1.0"
   ```
5. Run `pnpm sort-extensions`, commit, and open a PR against
   `zed-industries/extensions`.

Maintainers review every submission — respond to feedback within 3 weeks or
the PR gets closed. Once merged, Zed packages and publishes it automatically;
after that it's installable from Zed's built-in Extensions panel like any
other theme, no dev-extension step needed.

To ship an update later: bump `version` in `extension.toml` here, push, then
update the submodule commit and `version` in `extensions.toml` in a new PR
against `zed-industries/extensions` (see their
[updating an extension](https://zed.dev/docs/extensions/publishing/updating-and-maintenance)
guide).

## Color Palette

### Foreglow (Dark)

| Token | Hex | Usage |
|-------|-----|-------|
| Background | `#161221` | Main background |
| Current Line | `#281F3D` | Line highlight |
| Selection | `#3D2556` | Text selection |
| Foreground | `#E8E3F2` | Default text |
| Comment | `#736699` | Comments |
| Keyword | `#CB81E4` | Keywords |
| String | `#ED9F82` | Strings |
| Function | `#EC93BF` | Functions |
| Number | `#EFBF6C` | Numbers |
| Type | `#75C6D7` | Classes, types |
| Variable | `#C7BCE6` | Variables |
| Accent | `#F471C8` | Cursor, accent |

### Afterglow (Light)

| Token | Hex | Usage |
|-------|-----|-------|
| Background | `#F4EEE1` | Main background |
| Current Line | `#E6D6C1` | Line highlight |
| Selection | `#DFC2AA` | Text selection |
| Foreground | `#24163B` | Default text |
| Comment | `#7A6F9B` | Comments |
| Keyword | `#8930A6` | Keywords |
| String | `#B64820` | Strings |
| Function | `#AE296B` | Functions |
| Number | `#955F0F` | Numbers |
| Type | `#1D7187` | Classes, types |
| Variable | `#4D3781` | Variables |
| Accent | `#C3228E` | Cursor, accent |

### Alpenglow (Rubescent)

| Token | Hex | Usage |
|-------|-----|-------|
| Background | `#1A0505` | Main background |
| Current Line | `#3D1212` | Line highlight |
| Selection | `#5A1E1E` | Text selection |
| Foreground | `#F5E6DC` | Default text |
| Comment | `#8B6B6B` | Comments |
| Keyword | `#FF6B8A` | Keywords |
| String | `#FF9F6C` | Strings |
| Function | `#FFB3C6` | Functions |
| Number | `#FF7E67` | Numbers |
| Type | `#E85D75` | Classes, types |
| Variable | `#FFA07A` | Variables |
| Accent | `#FF6B9D` | Cursor, accent |

### Airglow (Auroral)

| Token | Hex | Usage |
|-------|-----|-------|
| Background | `#0A1A1F` | Main background |
| Current Line | `#0F2024` | Line highlight |
| Selection | `#162E34` | Text selection |
| Foreground | `#E0F0F5` | Default text |
| Comment | `#5A8A90` | Comments |
| Keyword | `#2EE8C8` | Keywords |
| String | `#7DD8A8` | Strings |
| Function | `#C8A0E8` | Functions |
| Number | `#D4B870` | Numbers |
| Type | `#4AA8D0` | Classes, types |
| Variable | `#8BC4D4` | Variables |
| Accent | `#2EE8C8` | Cursor, accent |

## License

MIT © [Foreglow](https://github.com/Foreglow)
