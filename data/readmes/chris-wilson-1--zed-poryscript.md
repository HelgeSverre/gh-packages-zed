# zed-poryscript

A [Zed](https://zed.dev) extension for **Poryscript**, the scripting
language used by the pokeemerald / pokeruby / pokefirered decomp
communities for Pokemon ROM hacks.

## What you get

- **Syntax highlighting** via
  [`tree-sitter-poryscript`](https://github.com/chris-wilson-1/tree-sitter-poryscript)
  (full language coverage: control flow, labels, text/movement/mart
  blocks, `poryswitch`, typed strings, `const`, everything).
- **Full LSP support** via
  [`poryscript-ls`](https://github.com/chris-wilson-1/poryscript-ls),
  a native Rust language server:
  - Diagnostics (parse errors)
  - Completions (commands, constants, symbols, keywords)
  - Hover documentation (command docs from `.inc` files, constant values)
  - Go to definition (same-file and cross-file)
  - Find references and rename (workspace-wide)
  - Document symbols / outline
  - Signature help for command parameters
  - Semantic tokens highlighting
  - Code formatting
  - Code actions ("did you mean?" suggestions)
  - Inlay hints (autovar results, parameter names)
  - Folding ranges
- **Zero-config install**: the extension downloads `poryscript-ls`
  from GitHub releases on first load. Nothing to build, nothing to
  put on your `PATH`.

## Install

### From the Zed Extension Gallery

(Not yet published — will appear after the extension is accepted into
[`zed-industries/extensions`](https://github.com/zed-industries/extensions).)

### As a dev extension (until then)

```bash
git clone https://github.com/chris-wilson-1/zed-poryscript
```

In Zed:

1. Open the command palette (`cmd-shift-p` / `ctrl-shift-p`).
2. Run **`zed: install dev extension`**.
3. Pick the cloned `zed-poryscript` directory.

Open any `.pory` file. You should see:

- "Poryscript" in the status bar.
- Keywords, strings, and commands highlighted.
- A language-server process starting (look in `zed: open log`).

## How it works

```
Zed  ──(LSP over stdio)──>  poryscript-ls
```

The extension downloads a single `poryscript-ls` binary and launches
it over stdio. The language server reads the filesystem directly and
gets the workspace root from the standard LSP `initialize` request —
no shims or proxies needed.

## Configuration

The extension provides default configuration for standard decomp
project layouts:

```json
{
  "CommandIncludes": [
    "asm/macros/event.inc",
    "asm/macros/movement.inc"
  ],
  "CommandConfigFilepath": "tools/poryscript/command_config.json",
  "FontConfigFilepath": "tools/poryscript/font_config.json"
}
```

## Known limitations

- **x86 (32-bit) not supported.** Linux/macOS/Windows on x86_64 and
  arm64 are.
- **First-run latency.** The first `.pory` file you open triggers a
  GitHub download. Subsequent opens are cached.

## License

MIT.
