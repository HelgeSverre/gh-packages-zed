# Brass Lasers

Void-purple chrome. Brass-gold hardware. Hot-pink lasers cutting the fog.

A family of neon synthwave color themes, built for that stretch of night when the playlist goes Griz → Pretty Lights → Big G and the only responsible adult left in the room is your syntax highlighter. Funky EDM energy. Still readable. Still slap. **Every color is contrast-checked against WCAG on every commit.**

> Not affiliated with Griz, Pretty Lights, Big G, T3 Tools, or anyone's light show. Just vibes + hex codes.

![Brass Lasers](https://raw.githubusercontent.com/heyoub/brass-lasers/master/media/social-preview.png)

**[Take the tour → heyoub.github.io/brass-lasers](https://heyoub.github.io/brass-lasers/)**: scroll through a day at the festival and watch the sky change with every set.

![Brass Lasers 4AM — TypeScript / React](https://raw.githubusercontent.com/heyoub/brass-lasers/master/media/screenshots/tsx.png)

![Brass Lasers 4AM — Rust](https://raw.githubusercontent.com/heyoub/brass-lasers/master/media/screenshots/rust.png)

![Brass Lasers 4AM — full window with terminal](https://raw.githubusercontent.com/heyoub/brass-lasers/master/media/screenshots/full-window.png)

---

## The lineup: a day at the festival

Nine sets, starting where it all began, at 4AM, and running the clock forward through dawn, the afternoon, golden hour, dusk, the headliner and back into the night. Each has its own room, its own light, its own reason to exist.

| Time | Set | Room | |
|---|---|---|---|
| 4AM | **4AM** · the original | The Main Stage. Void purple, brass, hot-pink lasers. | ![4AM](https://raw.githubusercontent.com/heyoub/brass-lasers/master/media/swatches/4am.png) |
| 5AM | **Atrium 5AM** | The Greenhouse. A biophilic sci-fi workspace: forest-charcoal, lagoon holograms, moss, orchid displays, lantern light. Soft but legible. | ![Atrium 5AM](https://raw.githubusercontent.com/heyoub/brass-lasers/master/media/swatches/atrium.png) |
| 6AM | **Daybreak** · light | The Sunrise Walk. Porcelain mist, indigo ink, dawn-rose keywords, dew-green strings. | ![Daybreak](https://raw.githubusercontent.com/heyoub/brass-lasers/master/media/swatches/daybreak.png) |
| 12PM | **Soundcheck** · matte | The Matte Stage. Built from the [heyoub.dev](https://heyoub.dev) brand palette with the shine sanded off: gaffer-tape charcoal, muted pink, cyan, amber and green. | ![Soundcheck](https://raw.githubusercontent.com/heyoub/brass-lasers/master/media/swatches/soundcheck.png) |
| 5PM | **Golden Hour** · light | The Lagoon Stage. Solarized-subtropical daylight: papaya-cream paper, lagoon ink, hibiscus, palm and mango. | ![Golden Hour](https://raw.githubusercontent.com/heyoub/brass-lasers/master/media/swatches/golden-hour.png) |
| 8PM | **Afterglow** | The Dusk Set. Wine-plum sky, coral clouds, mint grass, blue-hour light. | ![Afterglow](https://raw.githubusercontent.com/heyoub/brass-lasers/master/media/swatches/afterglow.png) |
| 10PM | **Liquid Metal** | The Chrome Stage. Built from the Free Battery Factory brand tokens: graphite, chrome text, champagne strings, and the yellow-cyan-purple spark spectrum of an oil slick. | ![Liquid Metal](https://raw.githubusercontent.com/heyoub/brass-lasers/master/media/swatches/liquid-metal.png) |
| 12AM | **Midnight** | The Night Market. Navy ink, moonlight text, sodium-orange streetlights. | ![Midnight](https://raw.githubusercontent.com/heyoub/brass-lasers/master/media/swatches/midnight.png) |
| 2AM | **Strobe** · high contrast | The Warehouse. Pure black, UV magenta, electric cyan, every syntax color at WCAG **AAA** (7:1). | ![Strobe](https://raw.githubusercontent.com/heyoub/brass-lasers/master/media/swatches/strobe.png) |

Every set also ships a **No Italics** flavor, for people who'd rather not see comments and keywords lean. That's 18 themes in the picker.

![All nine sets](https://raw.githubusercontent.com/heyoub/brass-lasers/master/media/previews/lineup.png)

<details>
<summary><b>Every set in a real editor</b> (Cursor, semantic highlighting on)</summary>

| | |
|---|---|
| **Atrium 5AM** ![Atrium 5AM](https://raw.githubusercontent.com/heyoub/brass-lasers/master/media/screenshots/sets/atrium.png) | **Daybreak** ![Daybreak](https://raw.githubusercontent.com/heyoub/brass-lasers/master/media/screenshots/sets/daybreak.png) |
| **Soundcheck** ![Soundcheck](https://raw.githubusercontent.com/heyoub/brass-lasers/master/media/screenshots/sets/soundcheck.png) | **Golden Hour** ![Golden Hour](https://raw.githubusercontent.com/heyoub/brass-lasers/master/media/screenshots/sets/golden-hour.png) |
| **Afterglow** ![Afterglow](https://raw.githubusercontent.com/heyoub/brass-lasers/master/media/screenshots/sets/afterglow.png) | **Liquid Metal** ![Liquid Metal](https://raw.githubusercontent.com/heyoub/brass-lasers/master/media/screenshots/sets/liquid-metal.png) |
| **Midnight** ![Midnight](https://raw.githubusercontent.com/heyoub/brass-lasers/master/media/screenshots/sets/midnight.png) | **Strobe** ![Strobe](https://raw.githubusercontent.com/heyoub/brass-lasers/master/media/screenshots/sets/strobe.png) |

</details>

---

## Install

**VS Code:** the Marketplace listing is on its way. Until then, grab `brass-lasers-4am-<version>.vsix` from the [latest release](https://github.com/heyoub/brass-lasers/releases/latest), then:

```bash
code --install-extension brass-lasers-4am-0.5.0.vsix
```

**Cursor / VSCodium:** these pull from [Open VSX](https://open-vsx.org/extension/heyoub/brass-lasers-4am). Search **Brass Lasers 4AM** in Extensions.

**Zed:** submitted to the Zed extension registry ([zed-industries/extensions#8369](https://github.com/zed-industries/extensions/pull/8369), all checks passing, awaiting review). Once it merges, search **Brass Lasers** in `zed: extensions`. Until then, run `zed: install dev extension` and pick this repo's [`zed/`](zed/README.md) folder.

**From a VSIX:** grab it from the [latest release](https://github.com/heyoub/brass-lasers/releases/latest) → Extensions → `…` → **Install from VSIX…**

Then `Ctrl+K Ctrl+T` (Mac: `Cmd+K Cmd+T`) and pick any **Brass Lasers** set. Let the void purple settle in. Hydrate. Maybe stretch.

### Follow the sun

Let the editor swap between a night set and a day set with your OS light/dark mode (any pair works; Atrium 5AM + Daybreak is lovely too):

```json
{
  "window.autoDetectColorScheme": true,
  "workbench.preferredDarkColorTheme": "Brass Lasers 4AM",
  "workbench.preferredLightColorTheme": "Brass Lasers Golden Hour"
}
```

### Recommended settings

The theme looks good with anything. These make it look its best:

```json
{
  "editor.fontFamily": "'Cascadia Code', 'JetBrains Mono', 'Fira Code', monospace",
  "editor.fontLigatures": true,
  "editor.fontSize": 15,
  "editor.lineHeight": 1.6,
  "editor.cursorBlinking": "phase",
  "editor.cursorSmoothCaretAnimation": "on",
  "editor.bracketPairColorization.enabled": true,
  "editor.guides.bracketPairs": "active",
  "editor.semanticHighlighting.enabled": true,
  "terminal.integrated.minimumContrastRatio": 1
}
```

`minimumContrastRatio: 1` keeps the terminal's lime exactly lime. The palette already passes contrast on its own.

---

## Brass Lasers Icons

A full file and folder icon theme ships in the same extension. Pick it with **Preferences → File Icon Theme → Brass Lasers Icons**.

- **Files: Enamel Edge.** Every icon from [Material Icon Theme](https://github.com/material-extensions/vscode-material-icon-theme) (1,391 extensions, 2,156 file names), with shapes untouched, recolored from the palette, and finished with a soft light falloff, a top sheen, a darker rim and a small cut shadow.
- **Folders: Resin.** [Catppuccin](https://github.com/catppuccin/vscode-icons)'s line folders in brass, each with a tinted glass body (421 folder names).
- **Light sets:** each icon is lifted to the brightest tone that still keeps 3:1 contrast against the sidebar.
- **Classic badges:** the original typographic badges are still there as **Brass Lasers Icons (Classic)**.

![Brass Lasers Icons in VS Code, 4AM and Daybreak, 2x](https://raw.githubusercontent.com/heyoub/brass-lasers/master/media/screenshots/icons/sidebar-2x.png)

Both source sets are MIT; their notices ship in `icons/THIRD-PARTY-NOTICES.txt`. Every icon is checked in CI: each one must resolve, render, and not swell past its source shape.

---

## Everywhere else

All nine sets are ported to **25+ apps**, all generated from one palette, so they always match.

| | |
|---|---|
| **Editors** | VS Code, Cursor, VSCodium, [Zed](zed/README.md), Neovim, Helix, Sublime Text, JetBrains IDEs, T3 Code |
| **Terminals** | Windows Terminal, Ghostty, WezTerm, Kitty, Alacritty, iTerm2 |
| **CLI** | bat, delta, fzf, Starship, plus a truecolor boot banner for bash/zsh/PowerShell |
| **Apps** | Obsidian, Discord (Vencord / BetterDiscord), Firefox, Slack, Raycast |

Install steps for each: **[ports/README.md](ports/README.md)**.

**Neovim** in one line (lazy.nvim):

```lua
{ "heyoub/brass-lasers", lazy = false, priority = 1000, config = function() vim.cmd.colorscheme("brass-lasers-4am") end }
```

---

## Neon Glow (experimental, opt-in)

Want the lasers to actually glow? **[Brass Lasers Neon Glow](https://open-vsx.org/extension/heyoub/brass-lasers-glow)** ([source](extensions/glow/README.md)) is a separate extension, on Open VSX as `heyoub.brass-lasers-glow`, that adds a soft neon halo to keywords, strings, functions and types. It works by patching the editor's own files, so VS Code will complain that the install is "corrupt". That's expected, and the extension explains it before doing anything. One command turns it on, one turns it off.

---

## Wallpapers

One for every stage of the day, for desktop (4K) and phone (composed for the tall frame, not cropped), in [`media/wallpapers/`](media/wallpapers/). Each world uses the same materials as the icons: enamel, resin glass and matte.

| | | |
|---|---|---|
| **4AM** · the original synthwave sunset ![4AM](https://raw.githubusercontent.com/heyoub/brass-lasers/master/media/wallpapers/thumbs/4am.png) | **Atrium 5AM** · a brass-and-glass greenhouse over a lagoon ![Atrium 5AM](https://raw.githubusercontent.com/heyoub/brass-lasers/master/media/wallpapers/thumbs/atrium.png) | **Daybreak** · porcelain ridges in morning mist ![Daybreak](https://raw.githubusercontent.com/heyoub/brass-lasers/master/media/wallpapers/thumbs/daybreak.png) |
| **Soundcheck** · the matte stage, house lights at half ![Soundcheck](https://raw.githubusercontent.com/heyoub/brass-lasers/master/media/wallpapers/thumbs/soundcheck.png) | **Golden Hour** · palms over a glittering lagoon ![Golden Hour](https://raw.githubusercontent.com/heyoub/brass-lasers/master/media/wallpapers/thumbs/golden-hour.png) | **Afterglow** · a coral sun behind plum hills ![Afterglow](https://raw.githubusercontent.com/heyoub/brass-lasers/master/media/wallpapers/thumbs/afterglow.png) |
| **Liquid Metal** · a chrome ring over a mercury sea ![Liquid Metal](https://raw.githubusercontent.com/heyoub/brass-lasers/master/media/wallpapers/thumbs/liquid-metal.png) | **Midnight** · moon, skyline, sodium streetlights ![Midnight](https://raw.githubusercontent.com/heyoub/brass-lasers/master/media/wallpapers/thumbs/midnight.png) | **Strobe** · UV beams crossing in a warehouse ![Strobe](https://raw.githubusercontent.com/heyoub/brass-lasers/master/media/wallpapers/thumbs/strobe.png) |

---

## The 4AM playlist

🎺 **Coming soon.** The official Brass Lasers soundtrack is being assembled: brass stabs, glitch-hop, laser fog, one-more-song energy.

<!-- PLAYLIST: replace this line with the Spotify / Apple Music / SoundCloud link -->

---

## Palette map: 4AM (the useful part)

| Role | 4AM hex | What it does |
|------|-----|--------------|
| Void canvas | `#0e0a17` | Editor / deep background |
| Lot chrome | `#0a0711` | Sidebar, activity bar, terminal chrome |
| Brass gold | `#ffb627` | Types, accents, active line numbers, find matches |
| Hot pink laser | `#ff3d9a` | Keywords, focus rings, cursor, send-button energy |
| Laser lime | `#b6ff5c` | Terminal text, git added, "this is good" green |
| Afterglow lime | `#a6e85f` | Strings: a notch calmer so big JSON files don't strobe |
| Cyan beam | `#3df2e0` | Functions, links, info |
| Pale gold | `#ffd27a` | Parameters (italic) |
| Peach fuzz | `#ffb98a` | Generic type parameters (italic) |
| Ultraviolet | `#b18cff` | Namespaces, attributes, decorators |
| Sunset | `#ff8a3d` | Numbers, constants, lifetimes |
| Soft cream | `#efe6d5` | UI text that doesn't fight the purple |

**Selection:** magenta-purple haze, so you can still see what you highlighted after three hours of bass music.

**Errors:** `#ff4d6d`, the friend who lost the rail and needs a water.

Every set lives in [`palette/`](palette/). 4AM is hand-written in full; the other sets are short specs (a canvas, an ink, and one color per syntax role) that `scripts/expand.js` grows into the full ~70-color palette in OKLCH, keeping 4AM's proportions between surfaces, borders, selections and dim text.

---

## How it's built

```
palette/*.json  ──►  scripts/expand.js  ──►  templates/**  ──►  themes/, zed/, t3/, icons/, colors/, ports/
 (specs + 4AM)      (OKLCH + contrast      (one per app)        (generated: never edit by hand)
                     repair)
```

- `npm run build` renders every palette through every template.
- `npm run check` fails if any generated file is stale, or if any palette drops below its contrast floor (52 WCAG pairs × 9 sets; Strobe holds syntax to AAA).
- `npm run art` redraws swatches, wallpapers and the social card from the palettes.
- Tag a release (`git tag v0.3.0 && git push origin v0.3.0`) and CI publishes to Open VSX, the VS Marketplace and GitHub Releases.

Want a tweak? Change a hex in `palette/`, run `npm run build`, and every app updates together.

---

## Contributing

PRs welcome if you find a token that still looks sober. Keep the chaos; keep the contrast.

- **A color looks wrong?** Open an issue with the *Developer: Inspect Editor Tokens and Scopes* output. The issue template walks you through it.
- **Want another app?** Add a template under `templates/ports/` and a line in `templates/ports/ports.json`, or open a port request.

---

## Influence

Late-night funky EDM: brass stabs, laser fog, and that "one more song" optimism. Griz / Pretty Lights / Big G energy as *palette inspiration*, not samples, logos, or official merch. Your mileage (and hydration) may vary.

- Extension ID: `heyoub.brass-lasers-4am`
- GitHub: [heyoub/brass-lasers](https://github.com/heyoub/brass-lasers)
- License: [MIT](LICENSE)

Stay weird. Ship code. Respect the lasers.
