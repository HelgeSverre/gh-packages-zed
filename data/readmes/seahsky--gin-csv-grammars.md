# gin-csv-grammars

Tree-sitter grammars for the four delimited-text dialects that [gin-csv](https://github.com/seahsky/gin-csv) registers with Zed.

One repository, four subdirectories, one grammar.

| Directory    | Grammar name         | Delimiter |
| ------------ | -------------------- | --------- |
| `comma/`     | `gin_csv_comma`      | `,`       |
| `tab/`       | `gin_csv_tab`        | tab       |
| `pipe/`      | `gin_csv_pipe`       | `\|`      |
| `semicolon/` | `gin_csv_semicolon`  | `;`       |

The four parsers differ only by their delimiter constant.
They are generated from the single factory in `factory.js`, and each dialect's `grammar.js` is a one-line call into it.

This repository is separate from gin-csv because Zed's `[grammars.*]` manifest entry accepts only a `repository` and a `rev`, with no local-path or vendored-source form, and because Zed compiles a committed `src/parser.c` rather than running `tree-sitter generate`.
See ADR 0006 in the gin-csv repository.

## What the grammar does

RFC 4180: quoted fields, doubled `""` inside them, delimiters and newlines inside them.

The first record of a file is the header row unconditionally, and its cells are `header_field`.
Body fields are aliased by column index to `column_1` through `column_5`, cycling, so column 6 is `column_1` again.
This is what gives one column one colour down the whole file.

An empty field is the absence of a field node between two delimiters, so an empty cell never shifts the columns after it.

## Working on it

```sh
npm install
node generate-corpus.js            # regenerate the four corpora from the shared cases
npm test                           # generate + corpus-test all four dialects
```

Changing the grammar is a four-step chore, in this order:

1. Edit `factory.js`.
2. Regenerate all four parsers: `npm run generate`.
3. Commit and push here.
4. Bump `rev` in gin-csv's `extension.toml` to the new full 40-character SHA.

A short SHA fails Zed's shallow fetch, and a branch name lands in `FETCH_HEAD` without a checkoutable ref.

## Tests

The corpus cases live in `generate-corpus.js` and are emitted once per dialect into `<dialect>/test/corpus/dialect.txt`.
Edit the cases there, not in the generated files.

Empty fields get explicit cases because the published prior-art grammars break on them and shift neighbouring rows' colours.
