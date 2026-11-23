<p align="center">
  <img src="./assets/icon-512.png" width="76" alt="Gotham Noir emblem"><br>
  <img src="./packages/vscode/images/palette-preview.png" width="100%" alt="Gotham Noir 4 dark-only nocturnal variants specimen">
</p>

# Gotham Noir

[![Validate Gotham Noir](https://github.com/thezaynahmed/gotham-noir/actions/workflows/validate.yml/badge.svg)](https://github.com/thezaynahmed/gotham-noir/actions/workflows/validate.yml)
[![MIT License](https://img.shields.io/badge/license-MIT-15171A?style=flat-square&labelColor=101215&color=F0C946)](LICENSE)
[![4 Dark Variants](https://img.shields.io/badge/variants-4_dark_only-15171A?style=flat-square&labelColor=101215&color=63C794)](#the-4-dark-variants)
[![15+ Targets](https://img.shields.io/badge/targets-15%2B_editors_%26_terminals-15171A?style=flat-square&labelColor=101215&color=74AEEB)](#supported-targets)

Dark themes that won't fry your eyes at 3 AM, bury functions in muddy navy, or break `git diff`. Built for developers, AI coding agents, MLOps, and DevOps engineers: **Gotham Noir** compiles 4 dark-only variants from one canonical palette source with OKLCH perceptual balance and APCA contrast across **15+ editors and terminals**.

<details>
  <summary>Table of Contents</summary>

- [Why Gotham Noir](#why-gotham-noir)
- [Quick Start](#quick-start)
- [The 4 Dark Variants](#the-4-dark-variants)
- [Palette and Color Architecture](#palette-and-color-architecture)
- [Supported Targets](#supported-targets)
- [Build and Contribute](#build-and-contribute)

</details>

---

## Why Gotham Noir

Classic nocturnal dark themes looked great in screenshots, then broke down during real engineering work: `#000000`/`#FFFFFF` halation fatigued eyes, `2.8:1` navy functions disappeared on dark gray, and yellow-on-yellow ANSI schemes turned `git diff` and Kubernetes logs into guesswork.

I engineered **Gotham Noir** from color science first: anti-halation matte canvases, equalized OKLCH syntax lightness, and an automated WCAG 2.1 + APCA contrast gate in CI. Each palette translates raw optical clarity into classic 1930s-to-modern detective noir atmosphere: matte Kevlar charcoal, rooftop signal gold, sub-level mainframe emerald, and rain-slicked crimson flare.

| Pain Point in Legacy Dark Themes | Gotham Noir Engineering Fix |
| :--- | :--- |
| `#000000` / `#FFFFFF` screen halation and eye shimmer | Softened charcoal canvases (`#101215` to `#1D1F21`) paired with warm parchment (`#D8D6CF` to `#DCE0E5`) |
| Functions and types buried at `< 3:1` contrast | `11.28:1` to `14.15:1` primary WCAG contrast (`Lc 79.2` to `87.0` APCA) across every variant |
| Muddy ANSI red/green collisions in `git diff` | >= 110 degree circular hue separation between crimson alerts and emerald additions |

---

## Quick Start

Sync every supported terminal and editor in one command via companion repo [`thezaynahmed/ghostty-config`](https://github.com/thezaynahmed/ghostty-config), or install your target directly:

**One-line universal setup (macOS & Linux):**

`curl -fsSL https://raw.githubusercontent.com/thezaynahmed/ghostty-config/main/install.sh | bash -s -- --all`

```bash
# Switch all synced terminals and IDEs at once:
theme-sync year-one --all
```

**Install with an AI Agent:** Paste this into Claude Code, Cursor, Antigravity, Codex, Windsurf, or Superset:

```text
Clone https://github.com/thezaynahmed/gotham-noir.git, read AGENTS.md, build and install the VS Code/Cursor/Zed themes, and verify all contrast gates with python3 -m unittest discover -s tests -v.
```

<details>
  <summary>Manual install for VS Code, Cursor, Windsurf, Antigravity IDE, and Zed</summary>

```bash
git clone https://github.com/thezaynahmed/gotham-noir.git
cd gotham-noir/packages/vscode
npx --yes @vscode/vsce package -o gotham-noir-1.0.0.vsix
code --install-extension gotham-noir-1.0.0.vsix        # or: cursor / windsurf / antigravity-ide

# Zed:
mkdir -p ~/.config/zed/themes
cp ../zed/themes/gotham-noir.json ~/.config/zed/themes/
```

</details>

---

## The 4 Dark Variants

| Variant | Canvas | Text | Accent | WCAG / APCA Lc | Best For |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`Gotham Noir - Year One`** *(Flagship)* | `#15171A` | `#D8D6CF` | `#F0C946` | `12.35:1` / `Lc 80.7` | Balanced matte Kevlar + rooftop signal gold for all-day coding |
| **`Gotham Noir - Batcomputer`** | `#101215` | `#DCE0E5` | `#F5D042` + `#56CCA0` | `14.15:1` / `Lc 87.0` | OLED obsidian control plane for AI agents, K8s, and MLOps logs |
| **`Gotham Noir - Arkham Slate`** | `#1D1F21` | `#DAD5C7` | `#E6C15A` | `11.28:1` / `Lc 79.2` | Weathered warm slate + antique gold for 3 AM zero-glare focus |
| **`Gotham Noir - Vengeance`** | `#151417` | `#DDD8D5` | `#E5535C` | `12.98:1` / `Lc 82.7` | Rain-soaked dark chrome + crimson flare for high-focus nights |

---

## Palette and Color Architecture

Reference swatches from the flagship **Year One** palette (all 4 canonical palettes live in [`palettes/`](palettes/)):

| Swatch | Role | Semantic Assignment |
| :--- | :--- | :--- |
| ![](https://img.shields.io/badge/-%2315171A-15171A?style=flat-square) | **Nomex Kevlar** | Matte anti-halation editor and terminal canvas |
| ![](https://img.shields.io/badge/-%23D8D6CF-D8D6CF?style=flat-square) | **Parchment** | Primary identifiers and warm neutral body text |
| ![](https://img.shields.io/badge/-%23F0C946-F0C946?style=flat-square) | **Signal Gold** | Classes, types, interfaces, active cursor, active line number |
| ![](https://img.shields.io/badge/-%2374AEEB-74AEEB?style=flat-square) | **Detective Blue** | Functions, methods, HTML/JSX tags, and IaC resources |
| ![](https://img.shields.io/badge/-%2363C794-63C794?style=flat-square) | **Oracle Emerald** | Strings, `git diff` additions, and passing test checks |
| ![](https://img.shields.io/badge/-%2368C5CE-68C5CE?style=flat-square) | **Cryo Sonar Cyan** | Operators, regex escapes, YAML/JSON keys, and builtins |
| ![](https://img.shields.io/badge/-%23E29754-E29754?style=flat-square) | **Utility Brass** | Numbers, booleans, constants, and function parameters |
| ![](https://img.shields.io/badge/-%23B695E8-B695E8?style=flat-square) | **Noir Violet** | Control keywords (`async`, `return`, `import`) and decorators |
| ![](https://img.shields.io/badge/-%23E86A74-E86A74?style=flat-square) | **Alert Crimson** | Errors, `git diff` deletions, and mismatched brackets |

- **2027 AI Agent & IDE Tokens:** Native styling for `inlineChat`, `chat`, `agentsChatInput`, `editorGhostText`, `editorStickyScroll`, `editorInlayHint`, 6-level bracket colorization, and `terminalCommandDecoration`.
- **Dyslexia & Readability Font Stack** ([`ports/ide-settings/font-presets.json`](ports/ide-settings/font-presets.json)): **Monaspace Neon + Radon** (default Texture Healing), **Monaspace Argon**, **Intel One Mono**, **Atkinson Hyperlegible Mono**, and **Commit Mono**.

---

## Supported Targets

| Target | Location | Format |
| :--- | :--- | :--- |
| **VS Code / Cursor / Windsurf / Antigravity IDE** | [`packages/vscode/`](packages/vscode/) | Publishable `.vsix` extension (all 4 variants) |
| **Zed** | [`packages/zed/`](packages/zed/) | Official `v0.2.0` theme family JSON + `extension.toml` |
| **Regular Antigravity (Native Appearance)** | [`ports/antigravity-app/`](ports/antigravity-app/) | Native 3-color presets (`Background`, `Foreground`, `Accent`, `Contrast`) |
| **Ghostty** (macOS & Linux) | [`ports/ghostty/`](ports/ghostty/) | Native themes (`ghostty +validate-config` verified) |
| **Warp / Alacritty / WezTerm / Kitty** | [`ports/warp/`](ports/warp/), [`ports/alacritty/`](ports/alacritty/), [`ports/wezterm/`](ports/wezterm/), [`ports/kitty/`](ports/kitty/) | YAML, TOML, Lua, and metadata `.conf` ports |
| **iTerm2 / macOS Terminal.app / Windows Terminal** | [`ports/iterm2/`](ports/iterm2/), [`ports/macos-terminal/`](ports/macos-terminal/), [`ports/windows-terminal/`](ports/windows-terminal/) | `.itermcolors`, XML `.terminal` plists, JSON schemes |
| **tmux / Zsh / Fontconfig / Paradev** | [`ports/tmux/`](ports/tmux/), [`ports/zsh/`](ports/zsh/), [`ports/linux-fontconfig/`](ports/linux-fontconfig/), [`ports/paradev/`](ports/paradev/) | Split dimming, `LS_COLORS`, hinting rules, Paradev JSON |

---

## Build and Contribute

Regenerate every port from [`palettes/`](palettes/), run the contrast + E2E test suite, and build the `.vsix` locally:

```bash
python3 scripts/build.py
python3 -m unittest discover -s tests -v
cd packages/vscode && npx --yes @vscode/vsce package -o gotham-noir-1.0.0.vsix
```

- Maintainer: [`@thezaynahmed`](https://github.com/thezaynahmed)
- Contributing & Publishing: See [`CONTRIBUTING.md`](CONTRIBUTING.md), [`PUBLISH.md`](PUBLISH.md), or open an issue on [GitHub Issues](https://github.com/thezaynahmed/gotham-noir/issues).
- Independent Project Notice: Gotham Noir is an independent, original open-source color system created by Zain Ahmed and is not affiliated with or endorsed by any studio or publisher.
- License: [MIT](LICENSE)
