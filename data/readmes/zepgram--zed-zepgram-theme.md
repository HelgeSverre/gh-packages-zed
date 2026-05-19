# Zepgram for Zed

A bold, high-contrast dark theme for [Zed](https://zed.dev), ported from the **Zepgram** PhpStorm color scheme.
Tuned for polyglot workspaces: PHP (Magento, Symfony, Laravel), TypeScript/Vue (Nuxt), Terraform, Go templates and YAML.

![Zepgram preview](assets/preview.png)

## Highlights

- **Magenta keywords** (`#ff0066`) — `class`, `function`, `use`, `extends`, `if`, `return`…
- **Bright-green methods** (`#56d635`) — user-defined method calls and function names
- **Salmon-red builtins** (`#ff5572`) — PHP language constructs (`empty`, `isset`, `unset`)
- **Orange members & parameters** (`#d59021`) — `$this->property`, function parameters
- **White locals** (`#eeeeee`) — local variables in function bodies
- **Pale-yellow strings** (`#ece388`), **cyan constants** (`#20d0d3`), **muted dark-gray comments** (`#4a5356`)
- **True-black editor surface** (`#131313`) with slightly darker side panels (`#0f0f10`) — keeps focus on the code

## Installation

### From the Zed extension registry

1. Open the command palette (`cmd+shift+p` / `ctrl+shift+p`)
2. Run `zed: extensions`
3. Search for **Zepgram**
4. Click **Install**
5. Run `theme selector: toggle` (`cmd+k cmd+t`) and pick **Zepgram**

### Manual / dev install

```bash
git clone https://github.com/zepgram/zed-zepgram-theme.git
```

Then in Zed:

1. `cmd+shift+p` → `zed: install dev extension`
2. Select the cloned folder
3. `theme selector: toggle` → **Zepgram**

To reload after editing the theme file: `zed: reload extensions`.

## Auto light/dark

Zepgram ships as a single dark variant. To keep it as your dark theme and fall back to a light theme when macOS/Linux is in light mode:

```json
{
  "theme": {
    "mode": "system",
    "light": "Ayu Light",
    "dark": "Zepgram"
  }
}
```

## Recommended companion settings

For the closest feel to the PhpStorm Zepgram setup:

```json
{
  "buffer_font_family": "DejaVu Sans Mono",
  "buffer_font_fallbacks": ["JetBrainsMono Nerd Font Mono"],
  "buffer_font_size": 13,
  "buffer_line_height": "comfortable",
  "icon_theme": "Material Icon Theme",
  "minimap": { "show": "always" },
  "scrollbar": { "show": "always" },
  "indent_guides": { "enabled": true, "coloring": "indent_aware" }
}
```

## Language support

The theme is tuned and tested against:

- **PHP** (Magento 2, Symfony, Laravel) via `phpactor` or `intelephense` — enable `semantic_tokens: "combined"` with Intelephense to distinguish locals from parameters
- **TypeScript / TSX / Vue** (Nuxt 3/4, React)
- **Terraform / HCL**
- **YAML**, **GraphQL**, **Dockerfile**, **Helm templates**
- **Markdown**, **JSON**, **TOML**

Tree-sitter tokens fall back gracefully for unsupported languages.

## Development

Clone the repo, edit `themes/zepgram.json`, then reload the extension:

```bash
git clone https://github.com/zepgram/zed-zepgram-theme.git
cd zed-zepgram-theme
```

In Zed:
- `zed: install dev extension` → select this folder
- After edits: `zed: reload extensions`

The theme JSON follows the [Zed theme schema v0.2.0](https://zed.dev/schema/themes/v0.2.0.json).

## Contributing

Contributions welcome. Open an issue or a pull request:

- **Bugs** — include a minimal code sample screenshot and the file language.
- **Language tweaks** — propose a tree-sitter token override (e.g. `function.builtin`, `variable.parameter`) with before/after screenshots.
- **New variants** — a lighter or higher-contrast variant can be added under `themes/` in the same JSON file as an additional entry in the `themes[]` array.

## Credits

- Original PhpStorm **Zepgram** color scheme by [Benjamin Calef](https://github.com/zepgram)
- Palenight/Material Theme community for the UI-color reference palette

## License

[MIT](LICENSE)
