# Snapcode — 📸 Polaroid for your code, in Zed

Take beautiful, shareable screenshots of your code without leaving [Zed](https://zed.dev).
Inspired by [Polacode](https://github.com/octref/polacode) for VS Code.

![Snapcode preview](assets/preview.png)

Select some code → open code actions (`ctrl-.` / `cmd-.`) → **📸 Snapcode: snap selection as PNG** — and a polished, syntax-highlighted snapshot lands in your project root and opens right in Zed.

## Features

- 📸 **One action away** — snapshots via the code action menu, on the selection or the whole file
- 🖼 **PNG and SVG output** — crisp 2× PNGs for sharing, infinitely-scalable SVGs for docs
- 🎨 **Polacode-style framing** — gradient (or solid/transparent) backdrop, floating window with macOS traffic lights, drop shadow, window title, optional line numbers
- ✂️ **Smart cropping** — expands to full lines, strips common indentation, trims blank edges
- 🔤 **Bundled JetBrains Mono** — pixel-identical rendering on every machine (ligatures included)
- 🌈 **Any language** — syntax highlighting via [syntect](https://github.com/trishume/syntect), detected from the buffer's language, extension, or shebang

## How it works (and how it differs from Polacode)

Polacode renders your code in a VS Code **webview** and screenshots the DOM with
[dom-to-image](https://github.com/tsayen/dom-to-image). Zed extensions are Rust compiled to
WebAssembly with **no webview/DOM APIs**, so Snapcode rebuilds the same pipeline with
Zed-native technology:

| | Polacode (VS Code) | Snapcode (Zed) |
|---|---|---|
| UI entry point | Webview panel | LSP **code actions** on your selection |
| Highlighting | Editor's HTML clipboard | [syntect](https://github.com/trishume/syntect) |
| Window chrome | HTML + CSS | Generated SVG (gradient, shadow, traffic lights) |
| Image capture | dom-to-image | [resvg](https://github.com/linebender/resvg) rasterization |

Two components live in this repo:

```
snapcode/
├── extension.toml     # Zed extension manifest
├── src/lib.rs         # WASM extension: finds/downloads snapcode-ls
└── snapcode-ls/       # the engine: a tiny language server (native binary)
    └── src/           # LSP plumbing → syntect → SVG → resvg → PNG
```

The extension registers `snapcode-ls` for ~45 languages. The server offers two code actions
(`snap as PNG` / `snap as SVG`), renders the image, saves it, and asks Zed to open it
(`window/showDocument`) plus shows a toast with the path (`window/showMessage`).

## Installation

### As a dev extension (from source)

1. Install [rustup](https://rustup.rs) (Zed builds extensions with your Rust toolchain).
2. Build and install the rendering engine so it's on your `PATH`:

   ```sh
   cargo install --path snapcode-ls
   ```

3. In Zed: `zed: extensions` → **Install Dev Extension** → select this directory.
4. Open any source file, select some lines, hit `ctrl-.` (Linux) / `cmd-.` (macOS), and snap!

> If `snapcode-ls` isn't on your `PATH`, the extension tries to download a pre-built binary
> from this repo's GitHub releases (see *Releasing* below), or you can point it at a binary
> explicitly via settings:
>
> ```json
> { "lsp": { "snapcode-ls": { "binary": { "path": "/path/to/snapcode-ls" } } } }
> ```

### Where do images go?

Into your **workspace root** by default (so they appear in the project panel), named
`snapcode-<file>-<timestamp>.png`. Configure `output_dir` to change that.

## Configuration

All appearance options are passed as LSP initialization options in your Zed `settings.json`:

```json
{
  "lsp": {
    "snapcode-ls": {
      "initialization_options": {
        "theme": "base16-ocean.dark",
        "background": "#667eea,#764ba2",
        "padding": 48,
        "font_size": 14,
        "line_numbers": true,
        "window_controls": true,
        "window_title": null,
        "shadow": true,
        "corner_radius": 12,
        "scale": 2,
        "tab_width": 4,
        "output_dir": "~/Pictures/snapcode"
      }
    }
  }
}
```

| Option | Default | Description |
|---|---|---|
| `theme` | `"base16-ocean.dark"` | Highlighting theme. Run `snapcode-ls --themes` to list them (`base16-ocean.dark`, `base16-eighties.dark`, `base16-mocha.dark`, `base16-ocean.light`, `InspiredGitHub`, `Solarized (dark)`, `Solarized (light)`) |
| `background` | `"#667eea,#764ba2"` | Backdrop: one color = solid, comma-separated = gradient, `"transparent"` = none |
| `padding` | `48` | Space around the window, in px |
| `font_size` | `14` | Code font size, in px |
| `line_numbers` | `false` | Show a line-number gutter |
| `window_controls` | `true` | macOS-style traffic lights |
| `window_title` | file name | Fixed title text |
| `shadow` | `true` | Drop shadow under the window |
| `corner_radius` | `12` | Window corner radius, in px |
| `scale` | `2` | PNG supersampling (2 = retina-crisp) |
| `tab_width` | `4` | Spaces per hard tab |
| `output_dir` | workspace root | Save location, supports `~/` |

Changes take effect after restarting the language server
(`editor: restart language server` or reopening the project).

## Development

```sh
# Engine tests (includes an actual PNG render)
cd snapcode-ls && cargo test

# Preview the look without Zed — writes PNG + SVG into snapcode-ls/target/preview/
cd snapcode-ls && cargo run --example preview

# End-to-end LSP session against the release binary
cd snapcode-ls && cargo build --release
python3 scripts/lsp_smoke_test.py

# The WASM extension itself
cargo build --release --target wasm32-wasip2
```

## Releasing pre-built binaries

Tag a version and push — CI cross-builds `snapcode-ls` for Linux/macOS/Windows (x86_64 + aarch64)
and attaches the archives the extension expects:

```sh
git tag v0.1.0 && git push --tags
```

## Publishing to the Zed extension registry

1. Push this repo to GitHub (public).
2. Publish at least one release (previous section) so users get automatic binaries.
3. Fork [zed-industries/extensions](https://github.com/zed-industries/extensions), then:

   ```sh
   git submodule add https://github.com/mishaldotrs/snapcode.git extensions/snapcode
   ```

4. Add to the top-level `extensions.toml`:

   ```toml
   [snapcode]
   submodule = "extensions/snapcode"
   version = "0.1.0"
   ```

5. Run `pnpm sort-extensions` and open a PR.

## Credits

- [Polacode](https://github.com/octref/polacode) by @octref — the original 📸, and this project's namesake UX
- [Carbon](https://carbon.now.sh) — the aesthetic north star
- [syntect](https://github.com/trishume/syntect) & [resvg](https://github.com/linebender/resvg) — the rendering engine
- [JetBrains Mono](https://www.jetbrains.com/lp/mono/) — bundled under the [OFL](snapcode-ls/assets/fonts/OFL.txt)

## License

[MIT](LICENSE)
