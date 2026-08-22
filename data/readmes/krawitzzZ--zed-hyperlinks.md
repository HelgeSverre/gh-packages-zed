# Hyperlinks (Zed extension)

Automatically turn text into clickable links based on regex patterns, inspired by
the VS Code extension [dlevs/vscode-pattern-links](https://github.com/dlevs/vscode-pattern-links).

For example, turn `ISSUE-123` into a link to your issue tracker, or `#42` into a
link to a GitHub issue.

## How it works

Zed renders links returned by language servers via the LSP `textDocument/documentLink`
request (supported by Zed since mid-2026, enabled by default). This extension runs a
small language server that scans open documents for your configured regex rules and
returns a link for each match.

The language server lives in a separate repository,
[krawitzzZ/zed-hyperlinks-server](https://github.com/krawitzzZ/zed-hyperlinks-server),
and is published to npm as [`hyperlinks-lsp`](https://www.npmjs.com/package/hyperlinks-lsp).
On first use the extension installs the latest package version via Zed's npm APIs and
runs it with Zed's bundled Node.

Cmd-click (macOS) / Ctrl-click (Linux/Windows) a match to open the link.

The server also reports a custom `hyperlink` semantic token for every match, which
you can style to make matches visually stand out. See [Highlighting](#highlighting)
below.

## Requirements

- A recent version of Zed with LSP document link support.
- Network access on first use (to install the language server from npm); afterwards it is cached.

## Installation (dev extension)

1. Clone this repository.
2. In Zed, open the command palette and run `zed: install dev extension`
   (or use the `Install Dev Extension` button on the Extensions page), then select
   this directory.

Zed compiles the Rust/WASM part automatically.

## Configuration

There is no per-extension settings UI in Zed, so rules are configured through the
language server's **workspace settings** in your `settings.json`, under the
`hyperlinkRules` array:

```json
{
  "lsp": {
    "hyperlinks": {
      "settings": {
        "hyperlinkRules": [
          {
            "linkPattern": "ISSUE-\\d+",
            "linkTarget": "https://myorg.atlassian.net/browse/$0"
          },
          {
            "linkPattern": "#(\\d+)",
            "linkTarget": "https://github.com/my-org/my-repo/issues/$1",
            "languages": ["markdown", "plaintext"]
          }
        ]
      }
    }
  }
}
```

These are forwarded via `language_server_workspace_configuration` (and then
`workspace/didChangeConfiguration`). Optional `initialization_options` under the
same `lsp.hyperlinks` key are forwarded separately if you ever need them.

### Rule fields

| Field              | Required | Description                                                                                                                              |
| ------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `linkPattern`      | yes      | A regular expression used to find text to turn into links, e.g. `ISSUE-\\d+`.                                                             |
| `linkTarget`       | yes      | The link template. `$0` is the whole match, `$1`, `$2`, ... are capture groups. Use `\$` for a literal `$`.                              |
| `linkPatternFlags` | no       | Extra JavaScript regex flags, e.g. `i` (case-insensitive) or `s` (dot matches newlines). The `g` flag is always applied.                 |
| `languages`        | no       | List of LSP `languageId` strings to restrict the rule to (e.g. `["markdown", "plaintext"]`). If omitted/empty, the rule applies to all. |

## Highlighting

Zed does not visually style document links on its own, so by default a match is
clickable but looks like ordinary text. To make matches stand out, the language
server emits an LSP semantic token of the custom type `hyperlink` for every match
(multi-line matches are split into one token per line, as LSP requires).

Zed styles semantic tokens through
[`semantic_token_rules`](https://zed.dev/docs/semantic-tokens). To highlight
hyperlinks, do two things in your `settings.json`:

1. Enable semantic tokens (they are **off by default**) by setting
   `semantic_tokens` to `"combined"` (keep tree-sitter highlighting and overlay
   semantic tokens) or `"full"`. You can set this globally or per-language.
2. Add a rule matching the `hyperlink` token type under
   `global_lsp_settings.semantic_token_rules`.

```json
{
  "semantic_tokens": "combined",
  "global_lsp_settings": {
    "semantic_token_rules": [
      {
        "token_type": "hyperlink",
        "underline": true,
        "foreground_color": "#4c9df3"
      }
    ]
  }
}
```

Instead of a hardcoded color you can reference theme styles, e.g.
`"style": ["link_uri", "link_text"]`; the first style found in your theme is used.
See the [rule structure](https://zed.dev/docs/semantic-tokens#rule-structure) for
all available properties (`background_color`, `font_weight`, `strikethrough`, ...).

> Changing the `semantic_tokens` mode may require restarting the language server
> (`editor: restart language server`) to take effect.

## Supported languages

Zed requires extension language servers to declare the languages they attach to
(there is no "all files" wildcard). The languages are enumerated in
[`extension.toml`](extension.toml) and currently cover Plain Text, Markdown, and a
range of common programming languages. Add more entries there if you need others.

## License

[MIT](LICENSE)
