# Better Comments for Zed

[![CI](https://github.com/fireseasonnow/zed-better-comments/workflows/CI/badge.svg)](https://github.com/fireseasonnow/zed-better-comments/actions?query=workflow%3ACI+branch%3Amain)

![Comments Highlighter on the left, this fork on the right. The //*, //!, //# and ////* lines, plus #*, --* and ** block continuations, are plain grey in the left panel and coloured in the right one.](assets/hero.png)

<sub>Colours as they resolve in a One Dark-style theme — they come from your theme, not from this extension. Regenerate with `assets/hero.html`.</sub>

Better Comments syntax in Zed. A fork of [Comments Highlighter](https://zed.dev/extensions/comment) (`thedadams/zed-comment`) that fixes the reason its advertised `*`, `!`, and `#` markers never fired.

## Why this exists

Comments Highlighter declares support for `*`, `!`, `?`, and `#` in its `highlights.scm`, but three of the four are unreachable. Its grammar's external scanner has two overlapping character sets:

```c
is_possible_start_of_tag = { / # * ; + - ! | < [ % }   // comment-prefix punctuation
is_special_tag           = { * ! ? # }                 // marker characters
                             ▲ ▲ ▲ ▲
                             │ │ │ └─ in both → eaten as prefix → never tags
                             │ │ └─── NOT in the prefix set → the only one that worked
                             └─┴───── in both → eaten as prefix → never tags
```

`parse_tagprefix()` greedily consumed every punctuation character, so in `//* text` the `*` was swallowed before the tag-name scanner ran. `?` is absent from the prefix set, which is exactly why `//?` was the single adjacent-marker form that worked.

This fork marks the token end before each marker, so the last one falls outside the prefix. `//*` becomes prefix `//` plus name `*`.

## What changed

| Form | Comments Highlighter | This fork |
| --- | --- | --- |
| `//* highlighted note` | not highlighted | highlighted |
| `//! alert` | not highlighted | highlighted |
| `//# warning` | not highlighted | highlighted |
| `////* repeated delimiters` | not highlighted | highlighted |
| `#* hash delimiter` | not highlighted | highlighted |
| `--* sql delimiter` | not highlighted | highlighted |
| ` ** block continuation` | not highlighted | highlighted |
| `//?`, `// *`, `// !`, `// ?` | highlighted | unchanged |
| all 20 word tags | highlighted | unchanged |
| ` * @param` JSDoc | not highlighted | unchanged — still not highlighted |

Trailing comments (`const x = 3; //* note`) highlight too, in every delimiter family. That needed no change: Zed injects only the comment node's own range, so the scanner sees column 0 no matter what precedes the comment on the line.

Lower-case prose after a symbol marker works, which it has to: `//* returns the flat story` is how the syntax is actually written. The all-caps requirement still applies to word tags, because dropping it there would tag every capitalised sentence.

## Installation

This installs as a dev extension. It is not on the Zed registry and cannot be: registry ids are unique, and the `comment` id belongs to the extension this replaces — see the note below on why sharing that id is the point.

```bash
git clone https://github.com/fireseasonnow/zed-better-comments.git
```

Then run `zed: install dev extension` from the command palette and select the repository root. Nothing needs editing first — `[grammars.comment]` in `extension.toml` points at this repository's GitHub URL, and `path = "tree-sitter-comment"` selects the grammar subdirectory, so Zed fetches the grammar itself.

Zed compiles the grammar to wasm on install; the first build takes a few seconds.

**Installing this uninstalls Comments Highlighter.** That is deliberate, not a side effect. Zed core hardcodes `(#set! injection.language "comment")` in the `injections.scm` of 60+ languages, so exactly one extension can occupy the language named `comment`. Sharing the extension id `comment` makes Zed swap them atomically. Giving this fork a *different* id would let both install and contend for that one slot with undefined resolution order — the intuitive way to avoid a collision is the only way to cause one.

Nothing is lost in the swap: every tag and every capture name the incumbent emits is preserved.

**Rollback:** uninstall the dev extension and reinstall Comments Highlighter from the Extensions panel. No settings or files need reverting.

## Tags

Colours come from your theme, resolved through Zed's longest-dotted-prefix fallback (`string.comment.info.text` → `string.comment.info` → `string.comment` → `string`). Every mainstream theme defines these, so it is readable in light and dark with no configuration.

| Markers and tags | Capture family |
| --- | --- |
| `TODO` `WIP` `MAYBE` `QUESTION` `?` | `constant.comment.todo` |
| `NOTE` `XXX` `INFO` `DOCS` `PERF` `TEST` `*` `**` | `string.comment.info` |
| `FIXME` `FIX` `BUG` `ERROR` `DELETE` `!` | `property.comment.error` |
| `HACK` `WARNING` `WARN` `SAFETY` `IMPORTANT` `#` | `keyword.comment.warn` |

Each family also emits `.prefix`, `.bracket`, `.user`, and `.text` sub-captures. They partition the whole span from delimiter to end of line, so setting them to one colour reproduces upstream Better Comments' whole-line decoration.

### Block comments

Use a doubled marker for an intentional highlight block, and a single `*` stays ordinary JSDoc:

```js
/**
 ** Knowledge base search URL contract:      ← highlighted
 ** - q: search query (omitted when empty)   ← highlighted
 */

/**
 * @param cardIndex - zero-based index       ← plain, by design
 */
```

This is not a house convention layered on top of Better Comments — it is what upstream does. Its `FindJSDocComments` prefix group is `([ \t]*\*[ \t]*)`, consuming exactly one `*` before requiring a tag. So `** text` is upstream's way of tagging a JSDoc line, and ` * @param` finds no tag after the prefix and is left alone.

### Consecutive lines merge

Consecutive tagged lines become one run in the first line's colour, and only the first name is recognised. A blank line resets it. Inherited behaviour, unchanged:

```js
// TODO: recognised, colours the whole run
// FIXME: absorbed as text, not its own tag
```

## Official Better Comments colours

Upstream's palette is tuned for a dark background, so it is not baked in. To opt in, add this under your theme name — note that upstream gives `todo` (`#FF8C00`) and `?` (`#3498DB`) different colours while both map to `constant.comment.todo` here, so pick one:

```json
{
  "experimental.theme_overrides": {
    "syntax": {
      "constant.comment.todo": { "color": "#FF8C00" },
      "string.comment.info": { "color": "#98C379" },
      "property.comment.error": { "color": "#FF2D00" },
      "keyword.comment.warn": { "color": "#FF8C00" }
    }
  }
}
```

## On italic comments

Side by side with VS Code, the one visual difference is italic. That is a theme
difference, not something this extension drops. Zed's Ayu Dark and One Light both
define `comment` with no `font_style`, so comments are upright there whether or
not they carry a tag — and so are `string`, `property`, `constant`, and `keyword`,
which is where tag colours resolve. Many VS Code themes italicise comments, and
Better Comments only layers colour on top, so the italic survives there.

If you want that look, italicise **all** comments rather than only tagged ones.
Styling just the four families leaves tagged comments italic among upright plain
ones, which is not what VS Code does:

```json
"theme_overrides": {
  "Ayu Dark": {
    "syntax": {
      "comment": { "font_style": "italic" },
      "comment.doc": { "font_style": "italic" },
      "string.comment.info": { "font_style": "italic" },
      "property.comment.error": { "font_style": "italic" },
      "constant.comment.todo": { "font_style": "italic" },
      "keyword.comment.warn": { "font_style": "italic" }
    }
  }
}
```

Use the theme-name-keyed form, not `experimental.theme_overrides`, if you switch
between a light and a dark theme — the experimental key only applies to whichever
is currently active. Merge with the palette block above where they overlap:
`{ "color": "#98C379", "font_style": "italic" }`.

## Known limitations

**No strikethrough for the `//` commented-out-code tag.** Unreachable on this rail. `HighlightStyleContent`, the deserialisation target for theme syntax styles, carries only `color`, `background_color`, `font_style`, and `font_weight`. `strikethrough` exists on the semantic-token rail (`global_lsp_settings.semantic_token_rules`), which a grammar extension does not use. A language server emitting semantic tokens would unlock it, at the cost of a shipped binary, a per-language opt-in (`semantic_tokens` defaults to `"off"`), and unverified token-merge behaviour alongside `vtsls`.

**Same-line block tags are highlighted, where upstream leaves them plain.** `/* NOTE: … */` tags here; upstream's block matcher anchors the tag to line start and requires whitespace after `/*`, so it does not. This is inherited Comments Highlighter behaviour, kept because replacement is automatic and silent and the superset guarantee outranks strict parity.

Each such tag keeps its own colour family — `/* TODO: */` purple, `/* FIXME: */` blue — because a marker inside a block-comment *opener* is treated as delimiter rather than tag. Without that, the star of `/*` would be read as the marker and every block word tag would collapse into one colour. CSS and SCSS have no other comment form, so that would have been widely visible. A marker directly against the opener, `/*!`, produces no tag, matching upstream.

## Development

```bash
cd tree-sitter-comment
npm install
npx tree-sitter generate
npx tree-sitter test                                    # 51 fixtures
npx tree-sitter query ../languages/comment/highlights.scm FILE   # check captures, not just structure
```

`tree-sitter test` compares structure only, so it cannot tell which *name* matched. Use `tree-sitter query` against `highlights.scm` when the capture family matters — it is also the closest offline proxy for what Zed renders.

Iteration loop after any edit to `src/scanner.c` or `grammar.js`:

```bash
cd tree-sitter-comment && npx tree-sitter generate && npx tree-sitter test && cd ..
git add -A && git commit -m "..."
./scripts/stamp-grammar-rev.sh      # writes HEAD into `rev` in extension.toml
git commit -am "Stamp grammar rev"
git push
# zed: install dev extension
```

The commit and push are not optional. `[grammars.comment]` resolves by `repository` + `rev`, and `ExtensionBuilder::checkout_repo` shells out to `git fetch` + `git checkout`, so an unpushed grammar change is invisible to Zed. Committing the generated `src/parser.c` is likewise required — Zed builds the grammar but never runs `tree-sitter generate`.

To iterate without pushing, point `repository` under `[grammars.comment]` at your local absolute checkout path; a filesystem path is a valid git remote, and then only the local commit is needed. Do not push that value.

Zed clones the grammar into `grammars/` (gitignored) and skips recompiling when the wasm is newer than the sources. `stamp-grammar-rev.sh` deletes that clone so the next install refetches; it also goes stale whenever `repository` changes, which is when `checkout_repo` reports "already exists, but is not a git clone of".

## Credits

- [thedadams/zed-comment](https://github.com/thedadams/zed-comment) and [thedadams/tree-sitter-comment](https://github.com/thedadams/tree-sitter-comment) — the extension and grammar this forks, MIT.
- [stsewd/tree-sitter-comment](https://github.com/stsewd/tree-sitter-comment) — the original grammar, MIT.
- [aaron-bond/better-comments](https://github.com/aaron-bond/better-comments) — the VS Code extension whose `src/parser.ts` this fork's behaviour is specified against, MIT.

Licensing and provenance are set out in [LICENSE](LICENSE) and [NOTICE](NOTICE).
