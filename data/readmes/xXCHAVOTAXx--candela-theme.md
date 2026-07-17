# Candela

A warm, low-fatigue theme for [Zed](https://zed.dev) — **dark + light**, built on real color math instead of eyeballing.

- **Perceptual coherence** — accents derived in OKLCH at a fixed lightness (L=0.80) and chroma (C=0.115), 8 hues equally spaced around the wheel. No single color vibrates or dominates.
- **Verified contrast** — body text hits WCAG **AAA** (≥7:1); every accent clears **AA+** (≥4.5:1). Measured, not guessed.
- **Colorblind-aware** — meaning never rides on red/green alone; red is reserved for errors (with background + border).
- **Warm foundation** — warm background reduces eye strain; cool accents on frequent roles (functions, types, variables), warm accents on values (numbers, strings). Calm structure, warm attention.
- **Color = identifier, gray = operator** — identifiers are colored, operators and punctuation are neutral gray, so your eye follows the content.

## Screenshots

See the [showcase page](https://xxchavotaxx.github.io/candela-theme/).

## Install

### From the Zed extension store
Open the command palette → `zed: extensions` → search **Candela** → install. Then `theme selector: toggle` (`Ctrl+K Ctrl+T`) and pick **Candela Dark** or **Candela Light**.

### Manual (local)
Copy `themes/candela.json` into your Zed themes directory:

- **Windows:** `%APPDATA%\Zed\themes\`
- **macOS:** `~/.config/zed/themes/`
- **Linux:** `~/.config/zed/themes/`

Then open the theme picker (`Ctrl+K Ctrl+T`).

## Palette (dark)

| Role | Hex | Contrast vs bg |
|---|---|---|
| Background | `#1c1915` | — |
| Text | `#e8e4df` | 14:1 (AAA) |
| Variable / property | `#8ac1ff` blue | ≥8.9:1 (AAA) |
| Function | `#d5bd62` gold | ≥8.9:1 (AAA) |
| Type / tag | `#4dd4db` cyan | ≥8.9:1 (AAA) |
| Keyword | `#c9adfd` purple | ≥8.9:1 (AAA) |
| Number / constant | `#f4ac6f` orange | ≥8.9:1 (AAA) |
| String | `#86d396` green | ≥8.9:1 (AAA) |
| Operator / punctuation | `#b0aca6` gray | — |

## License

MIT — see [LICENSE](LICENSE).
