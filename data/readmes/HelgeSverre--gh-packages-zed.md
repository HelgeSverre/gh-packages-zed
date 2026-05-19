# Zed Extension Safari

A searchable, browsable directory of every Zed editor extension and theme on GitHub — pulled from the [official zed-industries/extensions registry](https://github.com/zed-industries/extensions) plus topic-tagged repos, parsed from each project's `extension.toml`, and refreshed every 6 hours.

🌐 **Live site:** https://helgesverre.github.io/gh-packages-zed
🤖 **Auto-updated:** GitHub Action runs every 6 hours
🧩 **Source of truth:** Each repo's `extension.toml` — version, authors, capabilities (LSP / grammar / theme / slash command / context server / debug adapter / docs provider / snippets / icon theme)

## At a glance

| | Count |
|---|---|
| Total tracked | **648** |
| In official registry | 0 |
| Discovered via topics | 648 |
| Last updated | 2026-05-19 20:55 UTC |

### By capability
| Type | Count |
|------|-------|
| Language Servers | 328 |
| Grammars | 256 |
| Themes | 146 |
| Context Servers | 81 |
| Slash Commands | 37 |
| Debug Adapters | 29 |
| Snippets | 23 |
| Docs Providers | 5 |

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
| [MrFish1604/Zed-VHDL](https://github.com/MrFish1604/Zed-VHDL) | 1 | VHDL support for Zed |
| [Abilityai/jina-reader-extension](https://github.com/Abilityai/jina-reader-extension) | 0 | Fetches content from a URL using r.jina.ai and inserts it into the chat. |
| [hugginsio/zed-edi](https://github.com/hugginsio/zed-edi) | 4 | An EDI X12 plugin for Zed leveraging tree-sitter. |
| [danielgrbacbravo/oxocarbon-zed](https://github.com/danielgrbacbravo/oxocarbon-zed) | 7 | The Oxocarbon extension is a Zed theme inspired by IBM Carbon, offering a harmon... |
| [zarifpour/zed-env](https://github.com/zarifpour/zed-env) | 47 | 🔐 env support for Zed. |
| [simplificare-org/cypher](https://github.com/simplificare-org/cypher) | 5 | Cypher Extension for Zed |
| [artivilla/zed-ariake-theme](https://github.com/artivilla/zed-ariake-theme) | 3 | Zed IDE Ariake themes inspired by Japanese traditional colors and ancient poetry |
| [Codextor/zed-material-theme](https://github.com/Codextor/zed-material-theme) | 26 | Material Theme for Zed |
| [ossfellow/zed-mcp-server-basic-memory](https://github.com/ossfellow/zed-mcp-server-basic-memory) | 2 | Basic Memory MCP server integration, for Zed Editor's Assistant. |
| [rmoraes92/zedburn](https://github.com/rmoraes92/zedburn) | 4 | Zenburn for Zed Editor |
| [pierrenel/mosel](https://github.com/pierrenel/mosel) | 0 | A zed port of Domeee's neovim theme |
| [kartikvashistha/zed-gosum](https://github.com/kartikvashistha/zed-gosum) | 2 | Highlighting extension for Go Checksum files in the Zed editor |
| [tera-language/teralang-zed](https://github.com/tera-language/teralang-zed) | 0 | Zed extension for TeraLang |
| [loosheng/zed-cursor-dark-theme](https://github.com/loosheng/zed-cursor-dark-theme) | 0 | Cursor Dark Theme for Zed |
| [gabeins/zed-d2](https://github.com/gabeins/zed-d2) | 21 | D2 support for Zed |
| [ayberkgezer/flask-snippets](https://github.com/ayberkgezer/flask-snippets) | 1 | Flask snippets extension Zed IDE |
| [ayberkgezer/ultralytics-zed-snippets](https://github.com/ayberkgezer/ultralytics-zed-snippets) | 1 | Ultralytics snippets for Zed IDE |
| [ayberkgezer/nestjs-snippets](https://github.com/ayberkgezer/nestjs-snippets) | 6 | NestJS snippets for Zed IDE. |
| [madebygrant/noirtech-zed-theme](https://github.com/madebygrant/noirtech-zed-theme) | 0 | A dark theme  for the Zed code editor. It envelops your code in an inky blacknes... |
| [skarline/zed-fleet-themes](https://github.com/skarline/zed-fleet-themes) | 83 | 🚢 Transform Zed with Fleet's sleek, modern aesthetic for a sublime coding exper... |

## 🌟 Top Starred (Under 500)

| Package | ⭐ | Description |
|---------|-----|-------------|
| [biomejs/biome-zed](https://github.com/biomejs/biome-zed) | 466 | Biome extension for Zed |
| [xhyrom/zed-discord-presence](https://github.com/xhyrom/zed-discord-presence) | 415 | extension for zed that adds support for discord rich presence using lsp |
| [jenslys/zed-catppuccin-blur](https://github.com/jenslys/zed-catppuccin-blur) | 318 | Catppuccin Theme but as blurred variants + custom ones |
| [oxc-project/oxc-zed](https://github.com/oxc-project/oxc-zed) | 256 | Oxc extension for Zed |
| [zed-extensions/tsgo](https://github.com/zed-extensions/tsgo) | 207 | Extension for Zed to support TypeScript Native |
| [zed-extensions/postgres-context-server](https://github.com/zed-extensions/postgres-context-server) | 198 | An extension providing a Model Context Server extension for PostgreSQL |
| [zed-extensions/java](https://github.com/zed-extensions/java) | 188 | Extension for Zed to support Java |
| [zed-extensions/vue](https://github.com/zed-extensions/vue) | 187 | Vue support |
| [wakatime/zed-wakatime](https://github.com/wakatime/zed-wakatime) | 182 | Zed plugin for automatic time tracking and metrics generated from your programmi... |
| [GDQuest/zed-gdscript](https://github.com/GDQuest/zed-gdscript) | 165 | Zed support for the Godot game engine and the GDScript language |
| [zed-extensions/typst](https://github.com/zed-extensions/typst) | 165 | Typst extension for zed |
| [huacnlee/zed-theme-macos-classic](https://github.com/huacnlee/zed-theme-macos-classic) | 159 | A macOS native style theme for Zed, let it same like native app in macOS. |
| [nathansbradshaw/zed-angular](https://github.com/nathansbradshaw/zed-angular) | 144 |  |
| [zed-extensions/csharp](https://github.com/zed-extensions/csharp) | 139 | C# support |
| [cange/nightfox.zed](https://github.com/cange/nightfox.zed) | 136 | A port of the Neovim theme to Zed editor |
| [zed-extensions/swift](https://github.com/zed-extensions/swift) | 136 | Extension for Zed to support Swift |
| [zed-extensions/ruby](https://github.com/zed-extensions/ruby) | 125 | The Ruby language support for Zed editor |
| [Gurvirr/zed-ultraViolet](https://github.com/Gurvirr/zed-ultraViolet) | 113 | A dark, violet-toned theme designed for quality & visual comfort ◡̈ |
| [scalameta/metals-zed](https://github.com/scalameta/metals-zed) | 104 | Zed plugin for Metals |
| [zed-extensions/harper](https://github.com/zed-extensions/harper) | 90 | Harper LS extension for the Zed editor |

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
| [GDQuest/zed-gdscript](https://github.com/GDQuest/zed-gdscript) | 165 | 2026-05-19 | Zed support for the Godot game engine and the GDScript langu... |
| [joshuadavidthomas/zed-django](https://github.com/joshuadavidthomas/zed-django) | 35 | 2026-05-19 | A Django extension for Zed |
| [Imgkl/the-dark-side](https://github.com/Imgkl/the-dark-side) | 82 | 2026-05-19 | True Dark Theme for Zed IDE |
| [openvanilla/mcbopomofo-zed-extension](https://github.com/openvanilla/mcbopomofo-zed-extension) | 0 | 2026-05-19 | McBopomofo Data Extension for Zed |
| [wakatime/zed-wakatime](https://github.com/wakatime/zed-wakatime) | 182 | 2026-05-19 | Zed plugin for automatic time tracking and metrics generated... |
| [harmony-contrib/oxk-zed](https://github.com/harmony-contrib/oxk-zed) | 0 | 2026-05-19 | ArkTS language support for Zed with tree-sitter highlighting... |
| [zed-extensions/pyrefly](https://github.com/zed-extensions/pyrefly) | 52 | 2026-05-18 | Support for the Pyrefly Python LSP in Zed |
| [zed-extensions/emmet](https://github.com/zed-extensions/emmet) | 27 | 2026-05-18 | Emmet support |
| [zed-extensions/perplexity](https://github.com/zed-extensions/perplexity) | 10 | 2026-05-18 |  |
| [zed-extensions/mcp-server-puppeteer](https://github.com/zed-extensions/mcp-server-puppeteer) | 23 | 2026-05-18 | An MCP server for Puppeteer |
| [zed-extensions/tsgo](https://github.com/zed-extensions/tsgo) | 207 | 2026-05-18 | Extension for Zed to support TypeScript Native |

---

## Run history

| Run | New | Updated | Total |
|-----|-----|---------|-------|
| 2026-05-19T20:55 | 0 | 388 | 870 |
| 2026-05-19T20:52 | 20 | 368 | 870 |
| 2026-05-19T20:16 | 20 | 266 | 870 |
| 2026-05-19T20:16 | 20 | 368 | 870 |
| 2026-05-19T20:16 | 0 | 0 | 860 |
| 2026-05-19T20:14 | 0 | 0 | 860 |
| 2026-05-19T20:14 | 0 | 0 | 870 |
| 2026-05-19T20:14 | 0 | 880 | 880 |
| 2026-05-19T20:11 | 426 | 454 | 880 |
| 2026-05-19T19:57 | 168 | 286 | 454 |

---

Source data lives in `data/extensions.json` (filtered, enriched) and `data/packages.json` (raw discovery). Cached extension.toml files in `data/extension-tomls/`, READMEs in `data/readmes/`.

Made by [Helge Sverre](https://helgesver.re). Not affiliated with [Zed Industries](https://zed.dev).
