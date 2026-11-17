<p align="center"><img src="assets/banner.svg" alt="Mixtape, a Zed theme family with 65 themes" width="100%"></p>

<p align="center">Mixtape ships 65 themes across 8 families, with 55 dark and 10 light variants.</p>

<p align="center"><a href="#install">Install</a> · <a href="#8-styles">Styles</a> · <a href="#screenshots">Screenshots</a></p>

<p align="center"><a href="#optional-theme-overrides">Theme overrides</a> · <a href="#recommended-fonts">Fonts</a> · <a href="#license">License</a></p>

When I tried Zed a few years ago, most themes fell short of the ones in VS Code. That was one of my major complaints.

At some point I decided to build my own, port some of my favorite themes, and fine-tune them to my liking.

Mixtape is a high-contrast theme collection for [Zed IDE](https://zed.dev). It ships 65 palettes in eight theme families. Every palette uses the same semantic token map with its own pairing system, and keeps a strong, cohesive look and feel.

It works great for people who like dark mode in general, or for developers with astigmatism (like me!) who enjoy working with high-contrast light themes.

<p align="center"><em>The last theme collection standing, for the people who still read the code.</em></p>

<img src="assets/palette-strip.svg" alt="65 Mixtape themes represented by 53 accent colors across eight families" width="100%">

## 8 Styles

The order below groups the dark families first, then the light families. The screenshot gallery below uses the same order.

| Family | Look | Themes | Theme names |
| --- | --- | ---: | --- |
| **Dark Classic** | Familiar dark editors with a warmer pulse | 10 | Electric Avenue, Night Train, Tangerine Dream, Mothership Connection, Buffalo Soldier, Black Cow, Black and Yellow, Indigo Nights, Tokyo Blues, Computer Love |
| **Dark Glass** | Smoked surfaces with colored light behind them | 8 | Chocolate City, Brown Sugar, Green Earrings, Wild Cherry, Ruby My Dear, Blue Magic, Purple Haze, Purple Rain |
| **Dark Groove** | Earthy, funky, and a little dusty | 6 | Kaleidoscope, Voodoo, Foxy Brown, Soylent Green, Africa Unite, Coffy is the Color |
| **Dark Lightboard** | Stage light, chrome, and late-night synths | 8 | Chromatic Fantasy, Rainbow Seeker, Automaton, Stranger Something, Minneapolis, Computer Blue, Dillatronic, First Avenue |
| **Dark Neon** | Saturated nightlife, hot accents on deep ink | 5 | Black and Gold, Cold Blooded, Neon Lights, Green Light, Cold as Ice |
| **Dark Vaporwave** | Six moods, each in solid, blurred, and transparent form | 18 | Oneohtrix, Eco Virtual, 2814, Blank Banshee, Macintosh +, Macintosh ++ |
| **Light Pastel** | Soft paper, low contrast, calm | 4 | Sunday Morning, White Rabbit, Purple Snowflakes, Pink Cashmere |
| **Light Brutalist** | Flat, loud, and unapologetic | 6 | Channel Orange, Peach, Cream, Yellow Submarine, Watermelon Man, Mint Condition |

- Every family carries its own UI colors, editor colors, and semantic syntax colors.
- Full 16-color ANSI terminal palette matching every theme.
- The five Neon themes use syntax background highlighting that emulates the look and feel of the SynthWave '84 theme (not yet possible via CSS in Zed).
- The six Vaporwave themes have three variations each (solid, blurred, and transparent).

## Screenshots

| | |
|:--:|:--:|
| <img src="assets/screenshots/classic-tangerine-dream.png" alt="Mixtape Dark Classic 03 Tangerine Dream in Zed" width="100%"> <br><sub><b>Dark Classic 03</b> · Tangerine Dream</sub> | <img src="assets/screenshots/glass-chocolate-city.png" alt="Mixtape Dark Glass 01 Chocolate City in Zed" width="100%"> <br><sub><b>Dark Glass 01</b> · Chocolate City</sub> |
| <img src="assets/screenshots/groove-voodoo.png" alt="Mixtape Dark Groove 02 Voodoo in Zed" width="100%"> <br><sub><b>Dark Groove 02</b> · Voodoo</sub> | <img src="assets/screenshots/lightboard-chromatic-fantasy.png" alt="Mixtape Dark Lightboard 01 Chromatic Fantasy in Zed" width="100%"> <br><sub><b>Dark Lightboard 01</b> · Chromatic Fantasy</sub> |
| <img src="assets/screenshots/neon-cold-blooded.png" alt="Mixtape Dark Neon 02 Cold Blooded in Zed" width="100%"> <br><sub><b>Dark Neon 02</b> · Cold Blooded</sub> | <img src="assets/screenshots/vaporwave-macintosh-plus-plus-transparent.png" alt="Mixtape Dark Vaporwave 06 Macintosh ++ Transparent in Zed" width="100%"> <br><sub><b>Dark Vaporwave 06</b> · Macintosh ++</sub> |
| <img src="assets/screenshots/pastel-purple-snowflakes.png" alt="Mixtape Light Pastel 03 Purple Snowflakes in Zed" width="100%"> <br><sub><b>Light Pastel 03</b> · Purple Snowflakes</sub> | <img src="assets/screenshots/brutalist-mint-condition.png" alt="Mixtape Light Brutalist 06 Mint Condition in Zed" width="100%"> <br><sub><b>Light Brutalist 06</b> · Mint Condition</sub> |

These eight shots are a sample. The [HTML gallery](https://datarip.github.io/mixtape-theme-zed/) shows all 53 themes on real code, with larger previews, so you can judge the syntax highlighting before you install.

## Install

Pick one of the install paths below.

### From the Zed extension registry

1. Open the Extensions panel with `Cmd+Shift+X` on macOS or `Ctrl+Shift+X` on Linux and Windows.
2. Search for **Mixtape** and press Install.
3. Open the theme picker with `Cmd+K Cmd+T` on macOS or `Ctrl+K Ctrl+T` on Linux and Windows.
4. Pick one of the 65 variants.

### As a dev extension

```sh
git clone https://github.com/datarip/mixtape-theme-zed.git
```

In Zed, open the Extensions panel, choose **Install Dev Extension**, and select the cloned folder. Zed reads `extension.toml` and loads every theme in `themes/`.

### As a single user theme

```sh
mkdir -p ~/.config/zed/themes
cp themes/mixtape.json ~/.config/zed/themes/mixtape.json
```

Then set the theme in `settings.json`:

```json
{
  "theme": "Mixtape Dark Neon - 01 - Black and Gold"
}
```

## Optional theme overrides

[`theme-overrides.json`](theme-overrides.json) is an optional file for applying further styling to the 65 theme variants. Daily driven by yours truly. It's not part of `themes/mixtape.json`, and the extension does not ship it.

This theme override fixes the type rhythm of the syntax tokens:

- Keywords and types lean italic (when the font supports it).
- Functions and properties sit at weight 500.
- Strings sit lighter at 300.
- Comments stay italic at 500 (when the font supports it).

To use it:

1. Open `theme-overrides.json`.
2. Copy the full file into your Zed `settings.json`, or merge the `theme_overrides` object into the file.
3. Keep the theme names exactly as they appear in `themes/mixtape.json`.

A shortened example:

```json
{
  "theme_overrides": {
    "Mixtape Dark Neon - 01 - Black and Gold": {
      "syntax": {
        "keyword": { "font_style": "italic", "font_weight": 500 },
        "string": { "font_weight": 300 },
        "comment": { "font_style": "italic", "font_weight": 500 }
      }
    }
  }
}
```

The full file is 262 KB because it covers every variant. Delete the keys for themes you do not use if you want a smaller settings file. See the [Zed theme overrides documentation](https://zed.dev/docs/themes#theme-overrides) for the general mechanism.

## Recommended Fonts

Mixtape does not bundle any fonts. These are the fonts I use and recommend at 13 to 15 px with a 1.6 line height.

### Markdown and Notes

| Font | Link | Note |
| --- | --- | --- |
| **Ioskeley Mono** | [github.com/ahatem/IoskeleyMono](https://github.com/ahatem/IoskeleyMono) | A humanist mono that holds up in long Markdown files |

### Code

| Font | Link | Note |
| --- | --- | --- |
| **Maple Mono** | [github.com/subframe7536/maple-font](https://github.com/subframe7536/maple-font) | Rounded, soft, and very legible at small sizes |
| **Fantasque Sans Mono** | [github.com/belluzj/fantasque-sans](https://github.com/belluzj/fantasque-sans) | Quirky and warm, good for long sessions |
| **Julia Mono** | [github.com/cormullion/juliamono](https://github.com/cormullion/juliamono) | Wide coverage, clear punctuation, strong italics |
| **Victor Mono** | [github.com/rubjo/victor-mono](https://github.com/rubjo/victor-mono) | Cursive italics that pair well with the keyword overrides |
| **Kibernetyk Mono** | [github.com/PavloKilko/KibernetykMono](https://github.com/PavloKilko/KibernetykMono) | Technical, compact, and a little retro |
| **JetBrains Mono** | [github.com/JetBrains/JetBrainsMono](https://github.com/JetBrains/JetBrainsMono) | The safe default, with a large x-height |
| **Fira Code** | [github.com/tonsky/firacode](https://github.com/tonsky/firacode) | Ligatures and a familiar texture |

### Terminal

| Font | Link | Note |
| --- | --- | --- |
| **Meslo LG L Nerd Font** | [github.com/ryanoasis/nerd-fonts](https://github.com/ryanoasis/nerd-fonts) | Patched for Powerline and Nerd Font glyphs |

## Palette Notes

- `themes/mixtape.json` is the single source of truth. `extension.toml` loads the `themes/` folder, and the gallery is generated from the same JSON.
- Every theme defines UI colors, editor colors, semantic syntax colors, and terminal ANSI colors. The syntax map covers 60 token keys, including `function.method`, `variable.parameter`, `punctuation.bracket`, and `string.escape`.
- The 18 Vaporwave variants share six base moods. Each mood has a solid, blurred, and transparent form. The transparent forms use an alpha channel in the editor and terminal background.
- The gallery cards use the real theme colors for the code preview. The palette bar under each card reads the same syntax tokens.
- The download in the gallery points at this repository. Replace it if you fork the project.

## Repository Layout

```text
.
├── extension.toml              # Zed manifest, id = "mixtape-theme"
├── themes/
│   └── mixtape.json            # 65 themes, eight families
├── theme-overrides.json        # optional settings.json snippet
├── assets/
│   ├── banner.svg
│   ├── palette-strip.svg
│   └── screenshots/            # images used by this README
├── docs/
│   ├── index.html              # 53-variant gallery (GitHub Pages)
│   ├── screens/
│   │   ├── full/               # full-size WebP screenshots, the source
│   │   └── thumb/              # generated card thumbnails
│   └── PUBLISHING.md           # GitHub and Zed submission plan
└── mixtape-toolkit/            # gallery builder and source HTML
```

## HTML Theme Gallery Builder Script

The full WebP screenshots in `docs/screens/full` are the source. The build regenerates the 800 px card thumbnails in `docs/screens/thumb` and the gallery at `docs/index.html`.

```sh
python3 mixtape-toolkit/build.py
```

The script:

1. Reads `themes/mixtape.json`.
2. Maps each full WebP to a theme by its filename slug.
3. Regenerates the card thumbnails.
4. Injects the 53 gallery themes, 53 screenshot paths, and the 65-theme family stats into the source HTML.
5. Writes `docs/index.html`.

Only themes with a full image appear in the gallery, so the 12 Vaporwave variants without screenshots stay out. The build needs Pillow for the thumbnails. Install it in a virtual environment:

```sh
python3 -m venv .venv
. .venv/bin/activate
python3 -m pip install Pillow
```

## Credits

Each theme from this collection is like a track in a mixtape: each is named after a song or an artist name that represents a color. Some tracks are originals, some are reimagined remixes. All the references, inspiration, and credits are listed below.

### Theme Inspiration

The table lists the themes this collection borrows from, with their authors and sources.

| Theme | Author |
| --- | --- |
| [Atom One Dark](https://github.com/atom/one-dark-syntax) | Simurai |
| [Ayu](https://github.com/ayu-theme/ayu-colors) | Ike Ku |
| [Dark Plus Chocolate](https://github.com/AaBbdev29/Dark-Plus-Chocolate) | Moondevaa |
| [Dark Vaporwave](https://github.com/felipetesc/vapor-theme) | felipetesc, SigmaSD |
| [Dracula](https://github.com/dracula/dracula-theme) | Zeno Rocha |
| [Fleet](https://www.jetbrains.com/fleet/) | JetBrains |
| [GitHub Dark](https://github.com/primer/github-vscode-theme) | GitHub |
| [Guttenbergovitz](https://github.com/guttenbergovitz/guttenbergovitz) | Guttenbergovitz |
| [Hack The Box](https://github.com/silofy/hackthebox) | Silofy |
| [Jellybeans](https://github.com/nanotech/jellybeans.vim) | Andrew Wong |
| [KDE Plasma Vapor Theme](https://aur.archlinux.org/packages/plasma6-themes-vapor-steamos) | Valve (SteamOS) |
| [Marine Dark](https://github.com/MarineDark/marine-dark.zed) | ProDeSquare |
| [Material](https://material-theme.com) | Mattia Astorino |
| [Materialize](https://github.com/saadq/Materialize) | Saad Quadri |
| [Midnight Marina](https://github.com/Muddyblack/midnight-marina-zed) | Muddyblack |
| [Monokai](https://monokai.com) | Wimer Hazenberg |
| [NvChad Chocolate](https://github.com/NvChad/base46) | NvChad |
| [One Dark Pro](https://github.com/Binaryify/OneDark-Pro) | Jerry Wang |
| [Outrun](https://github.com/samrap/outrun-theme-vscode) | Sam Rapaport |
| [Pink as Heck](https://github.com/shoobah/pinkasheck) | Shoobah |
| [Solarized](https://github.com/altercation/solarized) | Ethan Schoonover |
| [Synesthesia Synthwave](https://github.com/stackmason1/synesthesia-theme) | Stackmason1 |
| [SynthWave '84](https://github.com/robb0wen/synthwave-vscode) | Robb Owen |
| [Tokyo Night](https://github.com/enkia/tokyo-night-vscode-theme) | Enkia |
| [Underground](https://github.com/i-amdroid/zed-underground-theme) | i-amdroid |
| [Winter is Coming](https://github.com/johnpapa/vscode-winteriscoming) | John Papa |
| [Yamura Dark](https://github.com/Yxmura/yamura-zed-theme) | Yxmura |
| [Zmito Light](https://github.com/zmito/zmitoLinght) | Zmito |

#### Dark Classic

| Theme | Inspired by |
| --- | --- |
| 01 · Electric Avenue | Synesthesia Synthwave, GitHub Dark |
| 02 · Night Train | Fleet, Atom One Dark, One Dark Pro |
| 04 · Tangerine Dream | Ayu |
| 05 · Buffalo Soldier | Jellybeans, Monokai, Ayu, Underground, Materialize |
| 06 · Black Cow | Atom One Dark, One Dark Pro, Material |
| 08 · Indigo Nights | Yamura Dark, Tokyo Night |
| 09 · Tokyo Blues | Tokyo Night |
| 10 · Computer Love | Hack The Box |

#### Dark Glass

| Theme | Inspired by |
| --- | --- |
| 01 · Chocolate City | Dark Plus Chocolate, Ayu, Materialize |
| 02 · Brown Sugar | Jellybeans, Ayu, Materialize |
| 03 · Green Earrings | Solarized, Marine Dark |
| 04 · Wild Cherry | Marine Dark |
| 05 · Ruby My Dear | Pink as Heck, Marine Dark |
| 06 · Blue Magic | Midnight Marina, Marine Dark |
| 07 · Purple Haze | Marine Dark |
| 08 · Purple Rain | Marine Dark |

#### Dark Groove

| Theme | Inspired by |
| --- | --- |
| 02 · Voodoo | Guttenbergovitz |
| 05 · Africa Unite | NvChad Chocolate |

#### Dark Neon

| Theme | Inspired by |
| --- | --- |
| 01 · Black and Gold | Dark Plus Chocolate, Ayu, Materialize |
| 02 · Cold Blooded | Pink as Heck |
| 03 · Neon Lights | SynthWave '84, Synesthesia Synthwave, Outrun, Dracula |
| 04 · Green Light | Solarized, Marine Dark |
| 05 · Cold as Ice | Winter is Coming, Midnight Marina, SynthWave '84 |

#### Dark Vaporwave

| Theme | Inspired by |
| --- | --- |
| 06 · Macintosh ++ | KDE Plasma Vapor Theme, Dark Vaporwave |

#### Light Brutalist & Light Pastel

These families are mostly inspired by Zmito Light and the Post-it palette from 3M.

### Originals

These themes are originals by yours truly. I particularly like the **Lightboard Theme**, which, as the name implies, emulates coding on a lightboard.

| Family | Original themes |
| --- | --- |
| Dark Classic | Mothership Connection, Black and Yellow |
| Dark Groove | Kaleidoscope, Foxy Brown, Soylent Green, Coffy is the Color |
| Dark Lightboard | Chromatic Fantasy, Rainbow Seeker, Automaton, Stranger Something, Minneapolis, Computer Blue, Dillatronic, First Avenue |
| Dark Vaporwave | Oneohtrix, Eco Virtual, 2814, Blank Banshee, Macintosh +, Macintosh ++. Each mood has a solid, blurred, and transparent form. |

### Music Playlist

The playlist follows the remixes and the originals named after a record or a film. Each track names the song that shaped the palette and links to the version in the source notes. Themes without a chosen song stay out of the tables. The other original themes are listed in [Originals](#originals).

#### Dark Classic

| Theme | Song | Listen |
| --- | --- | --- |
| 01 · Electric Avenue | Electric Avenue by Eddy Grant | [listen](https://youtu.be/Yxep-9BQ6Uo) |
| 02 · Night Train | Night Train by James Brown | [listen](https://youtu.be/l0hcjUkXUmQ) |
| 03 · Tangerine Dream | Love On a Real Train by Tangerine Dream | [listen](https://youtu.be/sBhB9gAM1J4) |
| 05 · Buffalo Soldier | Buffalo Soldier by Bob Marley & The Wailers | [listen](https://youtu.be/uMUQMSXLlHM) |
| 06 · Black Cow | Black Cow by Steely Dan | [listen](https://youtu.be/XRj0Ohg-y1A) |
| 08 · Indigo Nights | Indigo Nights/Live Sessions by Prince | [listen](https://youtube.com/playlist?list=PLH_QLWlQVieXe47NXfF1rlRB_udBe8lpX) |
| 09 · Tokyo Blues | Tokyo Blues by Horace Silver | [listen](https://youtu.be/XvsdNDOdpbc) |
| 10 · Computer Love | Computer Love by Kraftwerk | [listen](https://youtu.be/ZtWTUt2RZh0) |

#### Dark Glass

| Theme | Song | Listen |
| --- | --- | --- |
| 01 · Chocolate City | Chocolate City by Parliament | [listen](https://youtube.com/playlist?list=OLAK5uy_kC0bc1SWWh-532dA0VIv70r-Ay-o-60JQ) |
| 02 · Brown Sugar | Brown Sugar by D'Angelo | [listen](https://youtu.be/Uon7iKGqqaA) |
| 03 · Green Earrings | Green Earrings by Steely Dan | [listen](https://youtu.be/IeezKJsCkmU) |
| 04 · Wild Cherry | Play That Funky Music by Wild Cherry | [listen](https://youtu.be/JTvlujbJ5vg) |
| 05 · Ruby My Dear | Ruby, My Dear by Thelonious Monk | [listen](https://youtu.be/u1O9YuXNbLs) |
| 06 · Blue Magic | Sideshow by Blue Magic | [listen](https://youtu.be/7HJ-QcPhC68) |
| 07 · Purple Haze | Purple Haze by The Jimi Hendrix Experience | [listen](https://youtu.be/WGoDaYjdfSg) |
| 08 · Purple Rain | Purple Rain by Prince and the Revolution | [listen](https://youtu.be/6lsueAsCTnM) |

#### Dark Groove

| Theme | Song | Listen |
| --- | --- | --- |
| 01 · Kaleidoscope | Kaleidoscope (album) by Kelis | [listen](https://youtube.com/playlist?list=OLAK5uy_m0BRplzzuZKfjc6Q7m8sC3xXsi98zNXWM) |
| 02 · Voodoo | Voodoo (album) by D'Angelo | [listen](https://youtu.be/MlYypG5NGIc) |
| 03 · Foxy Brown | Theme From Foxy Brown by Willie Hutch | [listen](https://youtu.be/e4xOv2AU95s) |
| 04 · Soylent Green | Soylent Green by Fred Myrow | [listen](https://youtu.be/X2fXWg4ymzg) |
| 05 · Africa Unite | Africa Unite by Bob Marley & The Wailers | [listen](https://youtu.be/psm68xZPZTA) |
| 06 · Coffy is the Color | Coffy Is the Color by Roy Ayers | [listen](https://youtu.be/XiD0772uRNg) |

#### Dark Neon

| Theme | Song | Listen |
| --- | --- | --- |
| 01 · Black and Gold | Black and Gold by Sam Sparro | [listen](https://youtu.be/eHuebHTD-lY) |
| 02 · Cold Blooded | Cold Blooded by Rick James | [listen](https://youtu.be/_5dXbKvtVDg) |
| 03 · Neon Lights | Neon Lights by Kraftwerk | [listen](https://youtu.be/7Mz2UuLS6oM) |
| 04 · Green Light | Green Light by Jamie Lidell | [listen](https://youtu.be/ISaFuSP60oU) |
| 05 · Cold as Ice | Cold as Ice by M.O.P. (Foreigner) | [listen](https://youtu.be/9270o2_vQg0) |

#### Light Pastel

| Theme | Song | Listen |
| --- | --- | --- |
| 01 · Sunday Morning | Sunday Morning by The Velvet Underground | [listen](https://youtu.be/Xhbyj8pqUao) |
| 02 · White Rabbit | White Rabbit by Jefferson Airplane | [listen](https://youtu.be/pnJM_jC7j_4) |
| 03 · Purple Snowflakes | Purple Snowflakes by Marvin Gaye | [listen](https://youtu.be/xpVBJ6lRSf4) |
| 04 · Pink Cashmere | Pink Cashmere by Prince | [listen](https://youtu.be/ms86DXkrNHI) |

#### Light Brutalist

| Theme | Song | Listen |
| --- | --- | --- |
| 01 · Channel Orange | Channel Orange by Frank Ocean | [listen](https://youtube.com/playlist?list=OLAK5uy_mAGTQmYeosOR-Pp17OnnzkKHPeEbzSFOg) |
| 02 · Peach | Peach by Prince | [listen](https://youtu.be/WFP4JoUx_2w) |
| 03 · Cream | Cream by Prince | [listen](https://youtu.be/rrbFQEcpJ3A) |
| 04 · Yellow Submarine | Yellow Submarine by The Beatles | [listen](https://youtu.be/m2uTFF_3MaA) |
| 05 · Watermelon Man | Watermelon Man by Herbie Hancock | [listen](https://youtu.be/ppJQKfqhFfE) |
| 06 · Mint Condition | Funky Weekend by Mint Condition | [listen](https://youtu.be/SgS2B4o9Vt4) |

## License

This project is released under the [MIT License](LICENSE).
