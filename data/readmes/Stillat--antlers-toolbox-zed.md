# Antlers Toolbox for Zed

[![CI](https://github.com/Stillat/antlers-toolbox-zed/actions/workflows/ci.yml/badge.svg)](https://github.com/Stillat/antlers-toolbox-zed/actions/workflows/ci.yml)

Statamic Antlers language support for [Zed](https://zed.dev/), powered by the
[Antlers Language Server](https://github.com/Stillat/vscode-antlers-language-server) and
[tree-sitter-antlers](https://github.com/Stillat/tree-sitter-antlers).

## Features

- syntax highlighting for Antlers tags, variables, parameters, modifiers, expressions, comments,
  component directives, front matter, and embedded PHP
- HTML, CSS, and JavaScript highlighting across Antlers regions
- completions, hover information, go to definition, find references, document symbols, warnings,
  errors, and quick fixes
- formatting for whole files or selected ranges
- folding, code outlines, automatic indentation, bracket matching, and syntax-aware text selection
- optional inline field-type hints and semantic highlighting
- automatic hiding of sensitive parameter values during collaboration

The extension recognizes:

- `*.antlers.html`
- `*.antlers.php`
- `*.antlers.xml`

## Installation

The extension can currently be installed from source:

1. Install a current Zed build and [Rust through `rustup`](https://rustup.rs/). Zed downloads the
   additional build tools it needs automatically.
2. Clone or download this repository. You do not need a separate copy of `tree-sitter-antlers` or
   to run `npm install` for a normal installation.
3. Remove any earlier **Antlers** dev-extension installation, and uninstall or disable the
   existing **Statamic Antlers** gallery extension if it is installed. They use different extension
   IDs but recognize the same file extensions.
4. Open Zed's command palette and run **zed: install dev extension**.
5. Select the directory containing `extension.toml`.
6. Open an Antlers template and confirm that the language selector shows **Antlers**.

On first use, the extension installs the latest published `antlers-language-server` package with
Zed's managed Node.js runtime. Users who restrict extension capabilities must allow `npm:install`
for `antlers-language-server`.

## Configuration

Language-server settings can be supplied through Zed's `lsp` settings:

```json
{
  "lsp": {
    "antlers-language-server": {
      "settings": {
        "formatFrontMatter": false,
        "showGeneralSnippetCompletions": true,
        "formatterIgnoreExtensions": ["xml"],
        "inlayHints": {
          "showFieldTypes": true
        },
        "diagnostics": {
          "reportDiagnostics": true,
          "warnOnDynamicCssClassNames": true,
          "validateTagParameters": true
        },
        "html": {
          "format": {
            "wrapLineLength": 120
          }
        }
      }
    }
  }
}
```

Field-type hints also require Zed's `inlay_hints.enabled` editor setting. Semantic highlighting is
available when Zed's `semantic_tokens` setting is `combined` or `full`.

See the
[Antlers Language Server repository](https://github.com/Stillat/vscode-antlers-language-server)
for the available language-server behavior and settings.

## Troubleshooting

If highlighting and language features are both missing, check the language selector first. It
should show **Antlers**, not HTML or Plain Text. After rebuilding the extension, close and reopen
any affected Antlers tabs so Zed reloads its language support.

Zed stores cached copies of the parsers under this repository's ignored `grammars/` directory. If
you switched `extension.toml` between a local grammar and the released GitHub version, clear those
cached copies before reinstalling:

```shell
node scripts/clear-grammar-cache.mjs
```

Use **zed: open log** and the language-server status indicator to inspect startup errors or restart
the server. For additional extension output, close Zed and launch it from a terminal with
`zed --foreground`.

## Development

Prerequisites:

- a current Zed build
- Git, Node.js 20 or newer, and npm
- Rust installed through `rustup`
- a local copy of [tree-sitter-antlers](https://github.com/Stillat/tree-sitter-antlers)

Place the grammar beside this repository, or pass its location explicitly:

```shell
node scripts/verify.mjs --grammar-root ../tree-sitter-antlers
```

The verification script regenerates and tests the parser, checks the included Antlers examples and
editor behavior, checks formatting and Rust code, and builds the extension.

To also download and verify the published language server:

```shell
node scripts/verify.mjs --grammar-root ../tree-sitter-antlers --include-published-language-server
```

### Testing grammar changes

The checked-in `extension.toml` always points to a specific commit in the public grammar
repository. To test unpublished grammar changes, prepare a local copy before rebuilding the dev
extension:

```shell
node scripts/stage-local-grammar.mjs --grammar-root ../tree-sitter-antlers
```

This creates an ignored temporary copy, points `extension.toml` to it, and reports whether Zed needs
to rebuild the extension. Restore the public grammar URL and version before committing your
changes, then run `node scripts/clear-grammar-cache.mjs` before rebuilding against the public
grammar again.

Zed creates the ignored `grammars/` directory while building the extension. Its contents are
generated build files and should not be committed.

### Testing language-server changes

To make Zed use your local language-server build instead of the npm version, add a `binary`
override:

```json
{
  "lsp": {
    "antlers-language-server": {
      "binary": {
        "path": "C:\\path\\to\\vscode-antlers-language-server\\antlersls\\server.js",
        "arguments": ["--stdio"]
      }
    }
  }
}
```

Remove the `binary` block and restart the language server to return to the npm-published version.

## Support and contributing

See [SUPPORT.md](SUPPORT.md) for help choosing the right issue tracker and
[CONTRIBUTING.md](CONTRIBUTING.md) before proposing a change. Please report suspected
vulnerabilities as described in [SECURITY.md](SECURITY.md).

## License

Antlers Toolbox for Zed is open-source software licensed under the [MIT License](LICENSE).
