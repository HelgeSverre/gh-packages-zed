# gin-csv

Delimited files in [Zed](https://zed.dev), with a readable shape and a small set of operations that run where the file already is.

Columns are coloured by position, so one column is one colour down the whole file and a row that goes ragged shows it at a glance.
With the cursor in a column you can sort the file by it, or filter the file down to the rows matching the value under the cursor.
Columns can be aligned and compacted again, and a short row can be padded out to the header's width with one action.

## What it does

**Colours columns by position.** One column, one colour, the whole way down.
A header cell takes its own column's colour, so you can tell which column you are in without going back up to read the header.
Turn the palette on and the header is bold as well, which keeps it distinct from the body.

**Four delimiters.** Comma, tab, pipe and semicolon, each a separate language.
`.csv`, `.tsv`, `.tab` and `.psv` open in the matching one.
If you have another CSV extension installed it will claim `.csv` too, and which one wins is not defined; switch the language from the command palette when it picks the other.

**Sorts by the column under the cursor.** Ascending or descending, named after the column's header.
A column of numbers sorts numerically, so 9 comes before 10.
A column of ISO 8601 dates sorts chronologically.
Anything else sorts lexicographically.
Empty values group at the end, the header stays at the top, and equal values keep their original order so repeated sorts compose.

**Filters into a file beside the source.** The original is never touched.
With a selection, the filter keeps the rows whose field contains it; with no selection, the rows whose field equals the whole value under the cursor.
The result carries the header row and opens automatically, as an unsaved buffer: save it to write it to disk.
Filtering the same source again replaces that result, so save one you want to keep before narrowing further.
Filtering a result again narrows that same file rather than making another one, as an ordinary undoable edit.

**Aligns and compacts.** Align pads columns so they line up; compact puts the file back.

**Pads short rows.** One row, or every short row at once.

## Switching a file's dialect

A semicolon-delimited export usually arrives named `.csv` and opens as comma-delimited, which is wrong for it.

Open the command palette, run **language selector: toggle**, and pick `Delimited (semicolon)`.
The four dialects sit together in the list.

There is no delimiter setting and no auto-detection.
A tree-sitter parser has its delimiter compiled into it, so a dialect is an identity rather than a setting.

## The column palette

By default, colours come from whatever theme you run, which adapts to any theme but caps the cycle at five colours.

For eight exactly-specified colours instead, turn on semantic tokens for each dialect in your own `settings.json`:

```json
{
  "languages": {
    "Delimited (comma)": { "semantic_tokens": "full" },
    "Delimited (tab)": { "semantic_tokens": "full" },
    "Delimited (pipe)": { "semantic_tokens": "full" },
    "Delimited (semicolon)": { "semantic_tokens": "full" }
  }
}
```

It is four entries rather than one because `semantic_tokens` is a per-language setting, and an extension cannot write to your settings.
The colours themselves ship with gin-csv, in `languages/<dialect>/semantic_token_rules.json`, so there is nothing else to configure.

Use `"full"`, not `"combined"`.
`"full"` replaces the grammar's highlighting outright, so the five-colour cycle and the eight-colour palette never run at once.
The palette's colours are literal hex, resolved before any theme lookup, which means they cannot know whether your background is light or dark: they are one mid-luminance set chosen to stay readable on both.

## What it will not do

**It does not guess your delimiter.** `.csv` always opens as comma.

**Filter takes no typed input.** Zed gives a language server no way to ask for text, so there is no pattern syntax and no regex.
The filter value is what you have selected or the field under the cursor, always a literal.

**It does not report a ragged row as an error.** Ragged rows occur in valid files.
A ragged row shows in the colouring rather than in a marker of its own: a short row stops before its column's colour, a long row runs past the last one the header has, and both read at a glance.
The only thing gin-csv reports as an error is an unterminated quote, because it is the only condition under which the file cannot be read at all.

**It will not sort a file with a newline inside a quoted field.** Sort reorders whole raw lines and never rewrites a field, which is what keeps quoting, line endings, encoding and a byte-order mark untouched, so the diff shows only the rows that moved.
That is incompatible with one record spanning several lines, and gin-csv says so rather than sorting it wrongly.

**Aligned files are quote-heavy, deliberately.** Under RFC 4180 a leading or trailing space belongs to the value, so padding an unquoted field would change what that field means to every tool that reads the file afterwards.
gin-csv quotes every field it writes when aligning, which is what makes an aligned file safe to commit.
Compact removes the padding and the quoting, which means it drops quoting that was never required, whether align added it or you did.
A value that genuinely ended in spaces does not survive the round trip either, because align makes it indistinguishable from padding.

**Row 1 is the header, always.** gin-csv does not judge whether your file has one and offers no way to say it has none.
In a file whose first row is data, that row never moves under sort, is copied into every filter result, and sets the baseline for what counts as ragged.

**Colouring stops at 10 MB.** Above that, the file is too large to colour and gin-csv says so once.
Sort, filter, align, compact and pad keep working.

## Installing

gin-csv is not in Zed's extension registry yet.
To run it now:

```sh
git clone https://github.com/seahsky/gin-csv
cd gin-csv/server && cargo build --release
# put target/release/gin-csv-server somewhere on your PATH
```

Then in Zed: **zed: install dev extension**, and pick the repository root.

The extension looks for `gin-csv-server` on your `PATH` first and falls back to downloading a release.
The `PATH` branch is what makes working on the server possible without publishing anything.

## Working on it

```
server/     the language server, Rust
src/        the Zed extension, compiled to WebAssembly
languages/  one directory per dialect: its config and its highlight query
```

The grammars live in a separate repository, [gin-csv-grammars](https://github.com/seahsky/gin-csv-grammars), because a `[grammars.*]` entry in `extension.toml` takes only a repository and a revision, with no local-path form, and because Zed compiles a committed `src/parser.c` rather than running `tree-sitter generate`.

```sh
cd server
cargo test          # unit tests, the protocol tests, and the document property test
cargo clippy --all-targets -- -D warnings
```

Two things bite when testing a change inside Zed.

Zed runs whatever `gin-csv-server` your `PATH` finds, so a change to the server does nothing until `cargo build --release` has actually rebuilt it.
A stale binary shows up as wrong colours rather than as an error, because the token legend it sends no longer matches the colours the extension ships; there is a test for the source half of that mismatch, but nothing can catch a stale build but rebuilding.

Bumping a grammar `rev` needs **zed: install dev extension** again, not **zed: reload extensions**.
Only the install re-runs the grammar builder; a reload reuses the parser Zed compiled last time, so the old grammar keeps running and the change looks like it did nothing.

Tests sit at three seams and nowhere else:

- **The LSP protocol boundary**, where nearly all of them are.
  The server is driven in process with JSON-RPC messages and the assertions are on the responses and notifications a client would see.
- **The document store**, which has one property test: a random document and a random sequence of edits, applied incrementally, compared against a from-scratch rebuild.
  Incremental sync is the one place in this tool where a bug is silent, so it was written before the implementation.
- **The tree-sitter corpus**, in the grammar repository, run once per dialect.

`CONTEXT.md` is the vocabulary the code and these docs use.
