# Zed Extension Safari

A searchable, browsable directory of every Zed editor extension and theme on GitHub — pulled from the [official zed-industries/extensions registry](https://github.com/zed-industries/extensions) plus topic-tagged repos, parsed from each project's `extension.toml`, and refreshed every 6 hours.

[![discover](https://img.shields.io/github/actions/workflow/status/HelgeSverre/gh-packages-zed/discover.yml?style=flat-square&labelColor=24292f&label=discover)](https://github.com/HelgeSverre/gh-packages-zed/actions/workflows/discover.yml)
[![extensions](https://img.shields.io/badge/extensions-1462-0969da?style=flat-square&labelColor=24292f)](https://helgesverre.github.io/gh-packages-zed/)
![astro](https://img.shields.io/badge/astro-6-8250df?style=flat-square&labelColor=24292f)
![updated](https://img.shields.io/badge/updated-every%206h-9a6700?style=flat-square&labelColor=24292f)
[![license](https://img.shields.io/badge/license-MIT-1a7f37?style=flat-square&labelColor=24292f)](./LICENSE)

[**Live site →**](https://helgesverre.github.io/gh-packages-zed/)

## At a glance

| | Count |
|---|---|
| Total tracked | **1462** |
| In official registry | 1027 |
| Discovered via topics | 435 |
| Last updated | 2026-05-20 05:54 UTC |

### By capability

| Type | Count |
|------|-------|
| Themes | 584 |
| Grammars | 526 |
| Language Servers | 491 |
| Context Servers | 123 |
| Snippets | 65 |
| Slash Commands | 53 |
| Debug Adapters | 32 |
| Docs Providers | 15 |

## How it works

1. **Pull the registry.** Every entry in [zed-industries/extensions](https://github.com/zed-industries/extensions) is a git submodule pointing to the extension's source repo. We follow each submodule to its source.
2. **Top up with GitHub search.** A handful of topic queries (`topic:zed-extension`, `topic:zed-theme`, etc.) pick up extensions that aren't yet in the official registry.
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

## Recently discovered

| Package | Stars | Description |
|---|---|---|
| [sweetppro/zed-xml](https://github.com/sweetppro/zed-xml) | 28 | XML syntax highlighting for Zed |
| [edgarkanyes/yaka](https://github.com/edgarkanyes/yaka) | 0 | A light theme for the Zed editor |
| [Yxmura/yamura-zed-theme](https://github.com/Yxmura/yamura-zed-theme) | 0 | A zed theme made by Yamura, and named after him. Consists of a Light & Dark them... |
| [egibs/yara.zed](https://github.com/egibs/yara.zed) | 1 | Yara language extension for Zed. |
| [Gael-Lopes-Da-Silva/YellowedZed](https://github.com/Gael-Lopes-Da-Silva/YellowedZed) | 1 | A yellow material theme for Zed |
| [TheAhumMaitra/Your-Name-Zed-theme](https://github.com/TheAhumMaitra/Your-Name-Zed-theme) | 2 | Your Name. theme for Zed |
| [mikaeladev/zed-yuck](https://github.com/mikaeladev/zed-yuck) | 0 | Syntax highlighting for Yuck files in Zed |
| [bIaqat/yue-theme-zed](https://github.com/bIaqat/yue-theme-zed) | 5 |  |
| [Frank-vdm/Yugen](https://github.com/Frank-vdm/Yugen) | 4 |  |
| [arne-fuchs/zabby](https://github.com/arne-fuchs/zabby) | 5 | Tabby Integration for Zed |
| [zed-extensions/legacy-themes](https://github.com/zed-extensions/legacy-themes) | 16 | Zed Legacy Themes |
| [slymax/zedokai](https://github.com/slymax/zedokai) | 145 | a theme for Zed based on the Monokai Pro color scheme |
| [tuzemec/zedokai-darkest-machine](https://github.com/tuzemec/zedokai-darkest-machine) | 7 | Zed theme based on Zedokai |
| [someone13574/zed-adwaita-theme](https://github.com/someone13574/zed-adwaita-theme) | 11 | Light and dark Adwaita theme for Zed |
| [0xORB/zeek-zed](https://github.com/0xORB/zeek-zed) | 0 | Syntax support for Zeek for Zed |
| [KevInCompile/ZenAbyssal](https://github.com/KevInCompile/ZenAbyssal) | 11 |  |
| [lvignoli/zed-ziggy](https://github.com/lvignoli/zed-ziggy) | 5 | Ziggy support for Zed |
| [srivtx/zk-zed](https://github.com/srivtx/zk-zed) | 0 |  |
| [nikitapashinsky/zoegi-theme](https://github.com/nikitapashinsky/zoegi-theme) | 6 | A port of Moegi theme for Zed |
| [threonyl/zed-zokrates](https://github.com/threonyl/zed-zokrates) | 0 | Zed support for ZoKrates language. |

## Top starred (under 500)

| Package | Stars | Description |
|---|---|---|
| [biomejs/biome-zed](https://github.com/biomejs/biome-zed) | 466 | Biome extension for Zed |
| [xhyrom/zed-discord-presence](https://github.com/xhyrom/zed-discord-presence) | 415 | extension for zed that adds support for discord rich presence using lsp |
| [jenslys/zed-catppuccin-blur](https://github.com/jenslys/zed-catppuccin-blur) | 319 | Catppuccin Theme but as blurred variants + custom ones |
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
| [slymax/zedokai](https://github.com/slymax/zedokai) | 145 | a theme for Zed based on the Monokai Pro color scheme |
| [nathansbradshaw/zed-angular](https://github.com/nathansbradshaw/zed-angular) | 144 |  |
| [zed-extensions/csharp](https://github.com/zed-extensions/csharp) | 139 | C# support |
| [cange/nightfox.zed](https://github.com/cange/nightfox.zed) | 136 | A port of the Neovim theme to Zed editor |
| [zed-extensions/swift](https://github.com/zed-extensions/swift) | 136 | Extension for Zed to support Swift |
| [rzukic/zed-latex](https://github.com/rzukic/zed-latex) | 132 |  |

## Recently active

| Package | Stars | Last push | Description |
|---|---|---|---|
| [HelgeSverre/zed-applescript](https://github.com/HelgeSverre/zed-applescript) | 1 | 2026-05-20 | AppleScript for Zed — syntax highlighting, outline, runnable... |
| [Imgkl/the-dark-side](https://github.com/Imgkl/the-dark-side) | 82 | 2026-05-20 | True Dark Theme for Zed IDE |
| [MiguelMachado-dev/ReactTypeKit](https://github.com/MiguelMachado-dev/ReactTypeKit) | 1 | 2026-05-20 | A comprehensive Zed snippet pack providing fast, type-safe t... |
| [vishnuroshan/zed-react-ts-snippets](https://github.com/vishnuroshan/zed-react-ts-snippets) | 35 | 2026-05-20 | Speed up your Typescript/React workflow in Zed with ready-to... |
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
| [openvanilla/mcbopomofo-zed-extension](https://github.com/openvanilla/mcbopomofo-zed-extension) | 0 | 2026-05-19 | McBopomofo Data Extension for Zed |

## Run history

| Run | New | Updated | Total |
|---|---|---|---|
| 2026-05-20T05:54 | 0 | 431 | 1730 |
| 2026-05-20T04:00 | 33 | 431 | 1730 |
| 2026-05-20T03:50 | 104 | 427 | 1697 |
| 2026-05-20T02:57 | 113 | 421 | 1593 |
| 2026-05-20T00:40 | 132 | 410 | 1480 |
| 2026-05-19T21:56 | 142 | 407 | 1348 |
| 2026-05-19T21:43 | 159 | 396 | 1206 |
| 2026-05-19T21:41 | 177 | 388 | 1047 |
| 2026-05-19T20:55 | 0 | 388 | 870 |
| 2026-05-19T20:52 | 20 | 368 | 870 |

---

Source data lives in `data/extensions.json` (filtered, enriched) and `data/packages.json` (raw discovery). Cached extension.toml files in `data/extension-tomls/`, READMEs in `data/readmes/`.

Made by [Helge Sverre](https://helgesver.re). Not affiliated with [Zed Industries](https://zed.dev).
