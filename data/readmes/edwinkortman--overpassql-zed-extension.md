# OverpassQL Language Support for Zed

Adds [OverpassQL](https://wiki.openstreetmap.org/wiki/Overpass_API/Overpass_QL) (the query language of the OpenStreetMap [Overpass API](https://overpass-api.de/)) syntax highlighting to the [Zed](https://zed.dev) code editor.

## Features

- Syntax highlighting for query types (`node`, `way`, `relation`, `nwr`, `area`, …)
- Tag filters (`[k=v]`, `[k~"re"]`, `[!k]`, `["k"="v"]`) and spatial filters (`(bbox)`, `around:`, `area`, `poly:`, `id:`, …)
- Unions, differences, recursion (`>`, `<`, `>>`, `<<`), settings blocks, and set assignment (`->.name`)
- `//` line and `/* … */` block comments, with bracket matching and indentation
- Automatically activated for `.overpassql`, `.overpass`, `.osm3s`, and `.oql` files

## Install (dev)

1. Open Zed → command palette → **zed: install dev extension**.
2. Select this directory. Zed fetches and compiles the Tree-sitter grammar pinned in `extension.toml`.

## Grammar

Syntax is provided by [tree-sitter-overpassql](https://github.com/edwinkortman/tree-sitter-overpassql), pinned by `rev` in `extension.toml`. To pick up grammar changes, bump that `rev` to the desired commit.

## Credits

Structured after [@ChunzhengLab](https://github.com/ChunzhengLab)'s [json5-zed-extension](https://github.com/ChunzhengLab/json5-zed-extension).

## License

[MIT](LICENSE)
