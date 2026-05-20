# Zed Extension Safari

A searchable, browsable directory of every Zed editor extension and theme on GitHub — pulled from the [official zed-industries/extensions registry](https://github.com/zed-industries/extensions) plus topic-tagged repos, parsed from each project's `extension.toml`, and refreshed every 6 hours.

🌐 **Live site:** https://helgesverre.github.io/gh-packages-zed
🤖 **Auto-updated:** GitHub Action runs every 6 hours
🧩 **Source of truth:** Each repo's `extension.toml` — version, authors, capabilities (LSP / grammar / theme / slash command / context server / debug adapter / docs provider / snippets / icon theme)

## At a glance

| | Count |
|---|---|
| Total tracked | **1228** |
| In official registry | 802 |
| Discovered via topics | 426 |
| Last updated | 2026-05-20 00:40 UTC |

### By capability
| Type | Count |
|------|-------|
| Themes | 466 |
| Grammars | 440 |
| Language Servers | 438 |
| Context Servers | 119 |
| Slash Commands | 52 |
| Snippets | 48 |
| Debug Adapters | 31 |
| Docs Providers | 14 |

## How it works

1. **Pull the registry.** Every entry in [zed-industries/extensions](https://github.com/zed-industries/extensions) is a git submodule pointing to the extension's source repo. We follow each submodule to its source.
2. **Top up with GitHub search.** A handful of topic queries (`topic:zed-extension`, `topic:zed-theme`, etc.) pick up extensions that aren't (yet) in the official registry.
3. **Fetch each `extension.toml`.** Parsed to extract `id`, `name`, `description`, `version`, `schema_version`, `authors`, and which TOML sections are present (`[grammars]`, `[language_servers]`, `[themes]`, `[slash_commands]`, `[context_servers]`, `[icon_themes]`, `[debug_adapters]`, `[indexed_docs_providers]`).
4. **Bail without a toml.** Repos that don't have an `extension.toml` aren't Zed extensions — they're filtered out of the listing entirely.
5. **Cache READMEs** for each extension so the website can render full detail pages without hitting GitHub at view time.

## Running locally

```bash
# Full run: discovery + registry pull + toml/readme sync
GITHUB_TOKEN=$(gh auth token) node scripts/fetch-packages.js

# Sync-only (skip GitHub search, just chew through the toml/readme queue)
GITHUB_TOKEN=$(gh auth token) SKIP_DISCOVERY=1 node scripts/fetch-packages.js

# Smaller batches per run (default 250)
SYNC_LIMIT=100 node scripts/fetch-packages.js
```

The website lives in `website/` — Astro + Svelte 5 + Tailwind v4:

```bash
cd website && npm install && npm run dev
```

## 📦 Recently Discovered

| Package | ⭐ | Description |
|---------|-----|-------------|
| [napalmpapalam/napalm-theme-zed](https://github.com/napalmpapalam/napalm-theme-zed) | 8 | A minimalistic dark theme, mix of GitHub Dark UI theme and VSCode Dark+ theme sy... |
| [darzaccaro/naysayer-theme-zed](https://github.com/darzaccaro/naysayer-theme-zed) | 1 | A greenish color theme for Zed based on Jonathan Blow's emacs theme |
| [foxoman/nebula-pulse-zed-theme](https://github.com/foxoman/nebula-pulse-zed-theme) | 3 | Nebula Pulse Theme for Zed Editor |
| [vishnuroshan/zed-neo-brutalism](https://github.com/vishnuroshan/zed-neo-brutalism) | 1 | A raw, high-contrast neo-brutalist theme for the Zed editor |
| [k0tran/zed_neocmake](https://github.com/k0tran/zed_neocmake) | 50 | CMake grammar and neocmakelsp for Zed editor |
| [guustavocl/zed-neon-comfy-soft-themes](https://github.com/guustavocl/zed-neon-comfy-soft-themes) | 6 |  |
| [carlocaione/NeoSolarized.zed](https://github.com/carlocaione/NeoSolarized.zed) | 5 |  |
| [KimNorgaard/zed-neovim-default](https://github.com/KimNorgaard/zed-neovim-default) | 9 | Neovim default themes for the Zed editor |
| [dustinbturner/neutral-theme](https://github.com/dustinbturner/neutral-theme) | 0 |  |
| [e-simpson/new-darcula-z](https://github.com/e-simpson/new-darcula-z) | 31 | Modern take on the Darcula theme, now for Zed. |
| [Konstantinos-Ps/zed-nextjs-react-snippets](https://github.com/Konstantinos-Ps/zed-nextjs-react-snippets) | 6 |  |
| [zed-extensions/nginx](https://github.com/zed-extensions/nginx) | 10 |  |
| [norpadon/zed-nickel-extension](https://github.com/norpadon/zed-nickel-extension) | 0 | An extension for the Zed text editor that provides a support for the Nickel conf... |
| [elGusto/night-owlz](https://github.com/elGusto/night-owlz) | 11 | Night Owl theme for Zed |
| [ssaunderss/zed-nightfox](https://github.com/ssaunderss/zed-nightfox) | 14 | Nightfox Themes for the Zed IDE |
| [mpopadic/nightfox_m-zed](https://github.com/mpopadic/nightfox_m-zed) | 0 |  |
| [xeind/nightingale-zed](https://github.com/xeind/nightingale-zed) | 0 |  |
| [gavr123456789/zed-niva](https://github.com/gavr123456789/zed-niva) | 1 | Extension with LSP for niva new programming language |
| [zed-extensions/nix](https://github.com/zed-extensions/nix) | 112 | Nix language support in Zed |
| [NobinKhan/zed-themes](https://github.com/NobinKhan/zed-themes) | 2 | Theme for zed IDE |

## 🌟 Top Starred (Under 500)

| Package | ⭐ | Description |
|---------|-----|-------------|
| [biomejs/biome-zed](https://github.com/biomejs/biome-zed) | 466 | Biome extension for Zed |
| [xhyrom/zed-discord-presence](https://github.com/xhyrom/zed-discord-presence) | 415 | extension for zed that adds support for discord rich presence using lsp |
| [jenslys/zed-catppuccin-blur](https://github.com/jenslys/zed-catppuccin-blur) | 318 | Catppuccin Theme but as blurred variants + custom ones |
| [oxc-project/oxc-zed](https://github.com/oxc-project/oxc-zed) | 256 | Oxc extension for Zed |
| [catppuccin/zed-icons](https://github.com/catppuccin/zed-icons) | 240 | 🦊 Soothing pastel icons for Zed |
| [zed-extensions/tsgo](https://github.com/zed-extensions/tsgo) | 207 | Extension for Zed to support TypeScript Native |
| [zed-extensions/postgres-context-server](https://github.com/zed-extensions/postgres-context-server) | 198 | An extension providing a Model Context Server extension for PostgreSQL |
| [zed-extensions/java](https://github.com/zed-extensions/java) | 188 | Extension for Zed to support Java |
| [zed-extensions/vue](https://github.com/zed-extensions/vue) | 187 | Vue support |
| [wakatime/zed-wakatime](https://github.com/wakatime/zed-wakatime) | 182 | Zed plugin for automatic time tracking and metrics generated from your programmi... |
| [GDQuest/zed-gdscript](https://github.com/GDQuest/zed-gdscript) | 165 | Zed support for the Godot game engine and the GDScript language |
| [zed-extensions/typst](https://github.com/zed-extensions/typst) | 165 | Typst extension for zed |
| [huacnlee/zed-theme-macos-classic](https://github.com/huacnlee/zed-theme-macos-classic) | 159 | A macOS native style theme for Zed, let it same like native app in macOS. |
| [thedadams/zed-comment](https://github.com/thedadams/zed-comment) | 148 | A comment extension for the Zed editor |
| [nathansbradshaw/zed-angular](https://github.com/nathansbradshaw/zed-angular) | 144 |  |
| [zed-extensions/csharp](https://github.com/zed-extensions/csharp) | 139 | C# support |
| [cange/nightfox.zed](https://github.com/cange/nightfox.zed) | 136 | A port of the Neovim theme to Zed editor |
| [zed-extensions/swift](https://github.com/zed-extensions/swift) | 136 | Extension for Zed to support Swift |
| [rzukic/zed-latex](https://github.com/rzukic/zed-latex) | 132 |  |
| [zed-extensions/ruby](https://github.com/zed-extensions/ruby) | 125 | The Ruby language support for Zed editor |

## 🔥 Recently Active

| Package | ⭐ | Last Push | Description |
|---------|-----|-----------|-------------|
| [HelgeSverre/zed-applescript](https://github.com/HelgeSverre/zed-applescript) | 1 | 2026-05-20 | (WIP) AppleScript language support for Zed editor |
| [emirror-de/clearsight-zed](https://github.com/emirror-de/clearsight-zed) | 0 | 2026-05-19 | A scientifically-backed, accessibility-focused theme optimiz... |
| [maxleiko/zed-greycat-extension](https://github.com/maxleiko/zed-greycat-extension) | 0 | 2026-05-19 | GreyCat support for Zed |
| [vitallium/zed-modus-themes](https://github.com/vitallium/zed-modus-themes) | 47 | 2026-05-19 | Port of Modus Themes (https://protesilaos.com/emacs/modus-th... |
| [clementGilardy/zed-aws-toolkit](https://github.com/clementGilardy/zed-aws-toolkit) | 0 | 2026-05-19 | AWS Toolkit extension for Zed editor — S3, Lambda, CloudWatc... |
| [oxc-project/oxc-zed](https://github.com/oxc-project/oxc-zed) | 256 | 2026-05-19 | Oxc extension for Zed |
| [himattm/zed-islands-theme](https://github.com/himattm/zed-islands-theme) | 4 | 2026-05-19 | A Zed theme inspired by JetBrains' Islands design system, wi... |
| [spences10/zed-neon](https://github.com/spences10/zed-neon) | 0 | 2026-05-19 | Vivid neon themes for Zed. |
| [0xdea/zed-highlight](https://github.com/0xdea/zed-highlight) | 3 | 2026-05-19 | A Zed extension that allows to highlight all occurrences of ... |
| [zcuric/zed-wordpress](https://github.com/zcuric/zed-wordpress) | 0 | 2026-05-19 | Zed extension: WordPress and WooCommerce support for PHP — p... |
| [arrrrny/zuraffa-zed](https://github.com/arrrrny/zuraffa-zed) | 0 | 2026-05-19 | ZED Extension for Zuraffa 🦒 |
| [acakp/moondusttheme-zed](https://github.com/acakp/moondusttheme-zed) | 0 | 2026-05-19 | Handcrafted theme for those who have not found syntax highli... |
| [cfmleditor/zed-cfml](https://github.com/cfmleditor/zed-cfml) | 5 | 2026-05-19 |  |
| [aliaksei-loi/zed-loi-paper-theme](https://github.com/aliaksei-loi/zed-loi-paper-theme) | 0 | 2026-05-19 | A Zed theme inspired by Claude.ai and Claude Code — warm cre... |
| [GDQuest/zed-gdscript](https://github.com/GDQuest/zed-gdscript) | 165 | 2026-05-19 | Zed support for the Godot game engine and the GDScript langu... |
| [joshuadavidthomas/zed-django](https://github.com/joshuadavidthomas/zed-django) | 35 | 2026-05-19 | A Django extension for Zed |
| [Imgkl/the-dark-side](https://github.com/Imgkl/the-dark-side) | 82 | 2026-05-19 | True Dark Theme for Zed IDE |
| [openvanilla/mcbopomofo-zed-extension](https://github.com/openvanilla/mcbopomofo-zed-extension) | 0 | 2026-05-19 | McBopomofo Data Extension for Zed |
| [wakatime/zed-wakatime](https://github.com/wakatime/zed-wakatime) | 182 | 2026-05-19 | Zed plugin for automatic time tracking and metrics generated... |
| [harmony-contrib/oxk-zed](https://github.com/harmony-contrib/oxk-zed) | 0 | 2026-05-19 | ArkTS language support for Zed with tree-sitter highlighting... |

---

## Run history

| Run | New | Updated | Total |
|-----|-----|---------|-------|
| 2026-05-20T00:40 | 132 | 410 | 1480 |
| 2026-05-19T21:56 | 142 | 407 | 1348 |
| 2026-05-19T21:43 | 159 | 396 | 1206 |
| 2026-05-19T21:41 | 177 | 388 | 1047 |
| 2026-05-19T20:55 | 0 | 388 | 870 |
| 2026-05-19T20:52 | 20 | 368 | 870 |
| 2026-05-19T20:16 | 20 | 266 | 870 |
| 2026-05-19T20:16 | 20 | 368 | 870 |
| 2026-05-19T20:16 | 0 | 0 | 860 |
| 2026-05-19T20:14 | 0 | 0 | 860 |

---

Source data lives in `data/extensions.json` (filtered, enriched) and `data/packages.json` (raw discovery). Cached extension.toml files in `data/extension-tomls/`, READMEs in `data/readmes/`.

Made by [Helge Sverre](https://helgesver.re). Not affiliated with [Zed Industries](https://zed.dev).
