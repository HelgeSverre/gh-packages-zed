# Zed Extension Safari

A searchable, browsable directory of every Zed editor extension and theme on GitHub — pulled from the [official zed-industries/extensions registry](https://github.com/zed-industries/extensions) plus topic-tagged repos, parsed from each project's `extension.toml`, and refreshed every 6 hours.

🌐 **Live site:** https://helgesverre.github.io/gh-packages-zed
🤖 **Auto-updated:** GitHub Action runs every 6 hours
🧩 **Source of truth:** Each repo's `extension.toml` — version, authors, capabilities (LSP / grammar / theme / slash command / context server / debug adapter / docs provider / snippets / icon theme)

## At a glance

| | Count |
|---|---|
| Total tracked | **1104** |
| In official registry | 687 |
| Discovered via topics | 417 |
| Last updated | 2026-05-19 21:56 UTC |

### By capability
| Type | Count |
|------|-------|
| Language Servers | 414 |
| Grammars | 403 |
| Themes | 393 |
| Context Servers | 116 |
| Slash Commands | 50 |
| Snippets | 45 |
| Debug Adapters | 30 |
| Docs Providers | 13 |

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
| [seekode/zed-js-snippets](https://github.com/seekode/zed-js-snippets) | 9 | A comprehensive collection of JavaScript snippets for Zed editor, designed to ac... |
| [alessandrobrunoh/zed-grammar-jdl](https://github.com/alessandrobrunoh/zed-grammar-jdl) | 0 | Extension Support for jdl files for Zed IDE |
| [sdawn29/jellybeans-theme](https://github.com/sdawn29/jellybeans-theme) | 0 | A colorful dark theme for Zed editor inspired by Jellybeans color scheme. |
| [rajerthat1/jellybeans.zed](https://github.com/rajerthat1/jellybeans.zed) | 5 | Zed port of nanotech's jellybeans.vim theme |
| [jeffscottbrown/jerry-zed](https://github.com/jeffscottbrown/jerry-zed) | 0 | Jerry language support for Zed — syntax highlighting, bracket matching, indentat... |
| [Bronya0/Jetbrains-Darcula-Zed-Theme](https://github.com/Bronya0/Jetbrains-Darcula-Zed-Theme) | 4 | Jetbrains-Darcula-Zed-Theme |
| [ziishaned/zed-jetbrains-icons](https://github.com/ziishaned/zed-jetbrains-icons) | 12 | JetBrains Icons for Zed |
| [NarmadaWeb/jetbrains-rider-zed](https://github.com/NarmadaWeb/jetbrains-rider-zed) | 3 | Jetbrains Rider Dark Theme |
| [artemevsevev/zed-theme-jetbrains](https://github.com/artemevsevev/zed-theme-jetbrains) | 30 | JetBrains Themes for Zed Editor |
| [ArcherHume/jinja2-support](https://github.com/ArcherHume/jinja2-support) | 19 | Highlighting and indentation for Jinja2 templates |
| [trbroyles1/jira-slash-command](https://github.com/trbroyles1/jira-slash-command) | 2 | Adds a 'jira' slash command to Zed Text Editor |
| [nilskch/zed-jj-lsp](https://github.com/nilskch/zed-jj-lsp) | 16 | Zed extension for the jj-lsp to resolve conflicts. |
| [dangh/zed-jq](https://github.com/dangh/zed-jq) | 2 | jq language for Zed |
| [ChunzhengLab/json5-zed-extension](https://github.com/ChunzhengLab/json5-zed-extension) | 4 | JSON5 syntax highlighting support to Zed using Joakker's Tree-sitter. |
| [vim-zz/jsonl-syntax-zed](https://github.com/vim-zz/jsonl-syntax-zed) | 3 | A Zed editor extension that provides syntax highlighting for JSON Lines (JSONL) ... |
| [narqo/zed-jsonnet](https://github.com/narqo/zed-jsonnet) | 14 | Jsonnet language support for Zed |
| [tartarughina/zed-jsp](https://github.com/tartarughina/zed-jsp) | 0 | JSP extension for Zed |
| [JuliaEditorSupport/zed-julia](https://github.com/JuliaEditorSupport/zed-julia) | 112 | Julia support for Zed. |
| [jackTabsCode/zed-just](https://github.com/jackTabsCode/zed-just) | 56 | Zed extension for Justfiles |
| [MartelleV/kaimandres-zed](https://github.com/MartelleV/kaimandres-zed) | 3 | The official Zed port for Kaimandres.nvim. |

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
| [maxleiko/zed-greycat-extension](https://github.com/maxleiko/zed-greycat-extension) | 0 | 2026-05-19 | GreyCat support for Zed |
| [vitallium/zed-modus-themes](https://github.com/vitallium/zed-modus-themes) | 47 | 2026-05-19 | Port of Modus Themes (https://protesilaos.com/emacs/modus-th... |
| [HelgeSverre/zed-applescript](https://github.com/HelgeSverre/zed-applescript) | 1 | 2026-05-19 | (WIP) AppleScript language support for Zed editor |
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
| [AineeJames/c3-zed](https://github.com/AineeJames/c3-zed) | 19 | 2026-05-18 | A Zed extension for the C3 programming language with LSP and... |

---

## Run history

| Run | New | Updated | Total |
|-----|-----|---------|-------|
| 2026-05-19T21:56 | 142 | 407 | 1348 |
| 2026-05-19T21:43 | 159 | 396 | 1206 |
| 2026-05-19T21:41 | 177 | 388 | 1047 |
| 2026-05-19T20:55 | 0 | 388 | 870 |
| 2026-05-19T20:52 | 20 | 368 | 870 |
| 2026-05-19T20:16 | 20 | 266 | 870 |
| 2026-05-19T20:16 | 20 | 368 | 870 |
| 2026-05-19T20:16 | 0 | 0 | 860 |
| 2026-05-19T20:14 | 0 | 0 | 860 |
| 2026-05-19T20:14 | 0 | 0 | 870 |

---

Source data lives in `data/extensions.json` (filtered, enriched) and `data/packages.json` (raw discovery). Cached extension.toml files in `data/extension-tomls/`, READMEs in `data/readmes/`.

Made by [Helge Sverre](https://helgesver.re). Not affiliated with [Zed Industries](https://zed.dev).
