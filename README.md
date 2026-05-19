# Zed Extension Safari

A searchable, browsable directory of every Zed editor extension and theme on GitHub — pulled from the [official zed-industries/extensions registry](https://github.com/zed-industries/extensions) plus topic-tagged repos, parsed from each project's `extension.toml`, and refreshed every 6 hours.

🌐 **Live site:** https://helgesverre.github.io/gh-packages-zed
🤖 **Auto-updated:** GitHub Action runs every 6 hours
🧩 **Source of truth:** Each repo's `extension.toml` — version, authors, capabilities (LSP / grammar / theme / slash command / context server / debug adapter / docs provider / snippets / icon theme)

## At a glance

| | Count |
|---|---|
| Total tracked | **815** |
| In official registry | 410 |
| Discovered via topics | 405 |
| Last updated | 2026-05-19 21:41 UTC |

### By capability
| Type | Count |
|------|-------|
| Language Servers | 369 |
| Grammars | 309 |
| Themes | 248 |
| Context Servers | 88 |
| Slash Commands | 42 |
| Debug Adapters | 29 |
| Snippets | 25 |
| Docs Providers | 9 |

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
| [szymkab/a-touch-of-lilac-theme](https://github.com/szymkab/a-touch-of-lilac-theme) | 0 |  |
| [sachk/aw-watcher-zed](https://github.com/sachk/aw-watcher-zed) | 23 | Zed extension for time tracking with activitywatch |
| [ugi-dev/ad-astra-zed](https://github.com/ugi-dev/ad-astra-zed) | 1 | About 🌌 Ad Astra: Zed dark & light Theme |
| [wisn/zed-ada-language](https://github.com/wisn/zed-ada-language) | 11 | Ada language support for Zed |
| [adaltas/zed-adaltas-theme](https://github.com/adaltas/zed-adaltas-theme) | 1 | The Adaltas Zed theme is a Dark theme with decent contrast for the Zed editor. |
| [lodev09/adaptify-zed](https://github.com/lodev09/adaptify-zed) | 2 | A beautiful, adaptive theme for your Zed editor 🎨 |
| [AdventureX-RGE/zed-adventurex-theme](https://github.com/AdventureX-RGE/zed-adventurex-theme) | 0 |  |
| [Benjamin-Davies/zed-theme-adwaita](https://github.com/Benjamin-Davies/zed-theme-adwaita) | 17 | Adwaita (GNOME) theme for Zed with bold syntax highlighting borrowed from Catppu... |
| [mnojz/Aesthetic-zed-theme](https://github.com/mnojz/Aesthetic-zed-theme) | 6 |  |
| [haohanyang/agda-zed](https://github.com/haohanyang/agda-zed) | 6 | Agda language support for Zed editor |
| [aiken-lang/zed-aiken](https://github.com/aiken-lang/zed-aiken) | 4 | Aiken support for Zed |
| [talison-cardoso/aira-zed](https://github.com/talison-cardoso/aira-zed) | 3 |  |
| [vivy-company/zed-aizen-theme](https://github.com/vivy-company/zed-aizen-theme) | 0 |  |
| [aramb-dev/akhdar-by-aramb-dev-theme](https://github.com/aramb-dev/akhdar-by-aramb-dev-theme) | 1 | A green-accented dark and light theme for Zed, built around the aramb-dev brand ... |
| [tsimoshka/zed-theme-alabaster](https://github.com/tsimoshka/zed-theme-alabaster) | 39 |  |
| [ascarter/zed-alpental-theme](https://github.com/ascarter/zed-alpental-theme) | 1 |  |
| [A909M/zed-alpinejs-snippets](https://github.com/A909M/zed-alpinejs-snippets) | 4 | Alpine.js Snippets for Zed editor |
| [davccavalcante/amber-monochrome-monitor-crt-phosphor-theme-for-zed](https://github.com/davccavalcante/amber-monochrome-monitor-crt-phosphor-theme-for-zed) | 10 | Designed to replicate the classic CRT monitors, this theme features a black back... |
| [ChocolateNao/andromeda-zed](https://github.com/ChocolateNao/andromeda-zed) | 5 | 🌒 A popular VScode theme brought to Zed |
| [boycsuk/anthracite-theme](https://github.com/boycsuk/anthracite-theme) | 4 | Anthracite theme for Zed Editor. |

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
| [zed-extensions/ruby](https://github.com/zed-extensions/ruby) | 125 | The Ruby language support for Zed editor |
| [Gurvirr/zed-ultraViolet](https://github.com/Gurvirr/zed-ultraViolet) | 113 | A dark, violet-toned theme designed for quality & visual comfort ◡̈ |

## 🔥 Recently Active

| Package | ⭐ | Last Push | Description |
|---------|-----|-----------|-------------|
| [vitallium/zed-modus-themes](https://github.com/vitallium/zed-modus-themes) | 47 | 2026-05-19 | Port of Modus Themes (https://protesilaos.com/emacs/modus-th... |
| [HelgeSverre/zed-applescript](https://github.com/HelgeSverre/zed-applescript) | 1 | 2026-05-19 | (WIP) AppleScript language support for Zed editor |
| [clementGilardy/zed-aws-toolkit](https://github.com/clementGilardy/zed-aws-toolkit) | 0 | 2026-05-19 | AWS Toolkit extension for Zed editor — S3, Lambda, CloudWatc... |
| [oxc-project/oxc-zed](https://github.com/oxc-project/oxc-zed) | 256 | 2026-05-19 | Oxc extension for Zed |
| [spences10/zed-neon](https://github.com/spences10/zed-neon) | 0 | 2026-05-19 | Vivid neon themes for Zed. |
| [0xdea/zed-highlight](https://github.com/0xdea/zed-highlight) | 3 | 2026-05-19 | A Zed extension that allows to highlight all occurrences of ... |
| [zcuric/zed-wordpress](https://github.com/zcuric/zed-wordpress) | 0 | 2026-05-19 | Zed extension: WordPress and WooCommerce support for PHP — p... |
| [arrrrny/zuraffa-zed](https://github.com/arrrrny/zuraffa-zed) | 0 | 2026-05-19 | ZED Extension for Zuraffa 🦒 |
| [acakp/moondusttheme-zed](https://github.com/acakp/moondusttheme-zed) | 0 | 2026-05-19 | Handcrafted theme for those who have not found syntax highli... |
| [cfmleditor/zed-cfml](https://github.com/cfmleditor/zed-cfml) | 5 | 2026-05-19 |  |
| [GDQuest/zed-gdscript](https://github.com/GDQuest/zed-gdscript) | 165 | 2026-05-19 | Zed support for the Godot game engine and the GDScript langu... |
| [joshuadavidthomas/zed-django](https://github.com/joshuadavidthomas/zed-django) | 35 | 2026-05-19 | A Django extension for Zed |
| [Imgkl/the-dark-side](https://github.com/Imgkl/the-dark-side) | 82 | 2026-05-19 | True Dark Theme for Zed IDE |
| [openvanilla/mcbopomofo-zed-extension](https://github.com/openvanilla/mcbopomofo-zed-extension) | 0 | 2026-05-19 | McBopomofo Data Extension for Zed |
| [wakatime/zed-wakatime](https://github.com/wakatime/zed-wakatime) | 182 | 2026-05-19 | Zed plugin for automatic time tracking and metrics generated... |
| [harmony-contrib/oxk-zed](https://github.com/harmony-contrib/oxk-zed) | 0 | 2026-05-19 | ArkTS language support for Zed with tree-sitter highlighting... |
| [AineeJames/c3-zed](https://github.com/AineeJames/c3-zed) | 19 | 2026-05-18 | A Zed extension for the C3 programming language with LSP and... |
| [zed-extensions/pyrefly](https://github.com/zed-extensions/pyrefly) | 52 | 2026-05-18 | Support for the Pyrefly Python LSP in Zed |
| [zed-extensions/emmet](https://github.com/zed-extensions/emmet) | 27 | 2026-05-18 | Emmet support |
| [zed-extensions/perplexity](https://github.com/zed-extensions/perplexity) | 10 | 2026-05-18 |  |

---

## Run history

| Run | New | Updated | Total |
|-----|-----|---------|-------|
| 2026-05-19T21:41 | 177 | 388 | 1047 |
| 2026-05-19T20:55 | 0 | 388 | 870 |
| 2026-05-19T20:52 | 20 | 368 | 870 |
| 2026-05-19T20:16 | 20 | 266 | 870 |
| 2026-05-19T20:16 | 20 | 368 | 870 |
| 2026-05-19T20:16 | 0 | 0 | 860 |
| 2026-05-19T20:14 | 0 | 0 | 860 |
| 2026-05-19T20:14 | 0 | 0 | 870 |
| 2026-05-19T20:14 | 0 | 880 | 880 |
| 2026-05-19T20:11 | 426 | 454 | 880 |

---

Source data lives in `data/extensions.json` (filtered, enriched) and `data/packages.json` (raw discovery). Cached extension.toml files in `data/extension-tomls/`, READMEs in `data/readmes/`.

Made by [Helge Sverre](https://helgesver.re). Not affiliated with [Zed Industries](https://zed.dev).
