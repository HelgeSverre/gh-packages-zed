# Quietude

A calm, warm **monochrome** theme for [Zed](https://zed.dev), engineered to reduce
eye strain during long coding sessions. It ships two variants:

- **Quietude Dawn** — a warm, paper-like light theme
- **Quietude Dusk** — a warm charcoal dark theme

The design is monochrome first: code is differentiated primarily by *luminance*
and *font style*, while a small set of **muted, low-saturation accents** is
reserved for the few places where color genuinely helps you scan.

## Design principles (and the research behind them)

1. **No pure black or pure white.**
   Maximal contrast (pure `#000` on `#fff`, ~21:1) produces halation — a blur/glow
   around glyphs that is especially pronounced for readers with astigmatism, and
   is fatiguing for everyone ([Legge & Bigelow, 2011](https://doi.org/10.1167/11.5.8)).
   Quietude uses a warm off-white
   (`#f4efe4`) and a warm charcoal (`#201e1a`) instead, targeting a comfortable
   **~8.5–9:1** contrast — well above WCAG AAA (7:1) for legibility, but short of
   the harsh maximum.

2. **Warm color temperature to limit blue light.**
   Short-wavelength (blue) light suppresses melatonin and is linked to circadian
   disruption and digital eye strain, particularly during evening use
   ([Chang et al., 2015](https://doi.org/10.1073/pnas.1418490112);
   [Sheppard & Wolffsohn, 2018](https://doi.org/10.1136/bmjophth-2018-000146)).
   Every neutral in the palette
   is shifted slightly toward warm yellow rather than a cool blue-gray, reducing
   cumulative blue-light exposure without a jarring "night mode" tint.

3. **Muted, desaturated accents.**
   Highly saturated hues force the eye to constantly re-focus (chromatic
   aberration) and increase visual noise. Accents here are deliberately low in
   saturation — sage, terracotta, amber, dusty blue — so they read as gentle
   signals, not alarms.

4. **Monochrome reduces cognitive load.**
   A rainbow of syntax colors adds "color noise." Quietude keeps structural code
   (keywords, functions, types, variables, punctuation) in a warm grayscale ramp,
   using weight and italics for emphasis, and applies hue only at **sane,
   meaningful locations**:
   - **Strings / literal data** → muted sage green
   - **Numbers, booleans, constants** → muted amber
   - **Tags & links** → dusty blue
   - **Comments** → dimmed, italic
   - **Diagnostics** (error / warning / info / success) → the muted accent set
   - **Git status** → added = **blue**, modified = amber, deleted = terracotta,
     renamed = purple

5. **Color-vision accessible Git colors.**
   Git "added" is shown in **blue rather than the conventional green**, so the
   added/deleted pairing no longer relies on the red–green contrast that is
   hardest to distinguish for the most common forms of color-vision deficiency
   (deuteranopia/protanopia). Each Git state uses a distinct hue — added (blue),
   modified (amber), deleted (terracotta), renamed (purple) — so they stay
   tellable apart by hue *and* position. (Syntax strings keep their sage green;
   that is unrelated to Git and poses no red/green ambiguity.)

## Prior art & how Quietude differs

Quietude was designed from scratch, but the "calm, warm, easy-on-the-eyes"
space has some well-known neighbours. If you're choosing between them, here's an
honest comparison so you know exactly what makes Quietude different.

### Flexoki — the closest relative

[Flexoki](https://stephango.com/flexoki) by Steph Ango is an "inky" scheme
inspired by analog inks and warm shades of paper, and it is available for Zed.
It shares Quietude's *warm paper-and-ink* DNA and a warm-gray base ramp — but the
two execute that philosophy in opposite ways:

| | Flexoki | Quietude |
|---|---|---|
| Warm ink/paper feel | Yes | Yes |
| Syntax coloring | **Full 8-color** palette (red, orange, yellow, green, cyan, blue, purple, magenta) | **Monochrome-first**; hue only at a few semantic anchors |
| Contrast | Intentionally **high-contrast** | Intentionally **reduced** (~8.5–9:1) |
| Accent saturation | Vivid inks (e.g. `#AF3029`, `#205EA6`) | Heavily **muted** (e.g. `#a15a4d`, `#8aa4b0`) |
| Endpoints | paper `#FFFCF0` / black `#100F0F` | softer `#f4efe4` / `#201e1a` |

In short: Flexoki is a **high-contrast, fully-colored** warm scheme; Quietude is a
**low-contrast, monochrome** one. Any warm-gray theme naturally lands in a similar
gray ramp, but Quietude's endpoints are softer and its accents far more subdued.
If you want vivid syntax with warm paper, pick Flexoki; if you want the code to
stay quiet and grayscale, pick Quietude.

### Monosami — monochrome, opposite intent

[Monosami](https://github.com/borngraced/Monosami) is a near-pure black-and-white
monochrome theme for Zed. It is monochrome like Quietude, but it embraces the
**maximal-contrast** black/white look that Quietude deliberately avoids for
eye-comfort reasons (see the halation note above). It also has no warm tint and no
muted accents.

### Others in the "easy on the eyes" space

Themes like **Rosé Pine**, **Solarized**, **Smooth**, **Serendipity**,
**Modus**, **Ultimate Dark Neo**, and **Modest Dark** all aim for comfort, but do
so with full pastel/colored palettes rather than a monochrome base — so they read
quite differently from Quietude at a glance.

### What makes Quietude distinct

The specific combination Quietude targets — **warm neutral + monochrome-first +
deliberately-lowered contrast + sparse muted accents, in paired light/dark
variants** — does not match any of the themes above. That's the gap it's meant to
fill.

## Installing

This is a Zed theme extension. To develop or preview it locally:

1. Open Zed.
2. Open the command palette and run **`zed: install dev extension`**.
3. Select this folder.
4. Open **`theme selector: toggle`** and pick **Quietude Dawn** or **Quietude Dusk**.

## References

The design principles above draw on the following peer-reviewed research:

- Legge, G. E., & Bigelow, C. A. (2011). *Does print size matter for reading? A
  review of findings from vision science and typography.* Journal of Vision,
  11(5):8. https://doi.org/10.1167/11.5.8
- Chang, A.-M., Aeschbach, D., Duffy, J. F., & Czeisler, C. A. (2015). *Evening
  use of light-emitting eReaders negatively affects sleep, circadian timing, and
  next-morning alertness.* Proceedings of the National Academy of Sciences,
  112(4), 1232–1237. https://doi.org/10.1073/pnas.1418490112
- Sheppard, A. L., & Wolffsohn, J. S. (2018). *Digital eye strain: prevalence,
  measurement and amelioration.* BMJ Open Ophthalmology, 3(1):e000146.
  https://doi.org/10.1136/bmjophth-2018-000146

## License

See repository for license details.
