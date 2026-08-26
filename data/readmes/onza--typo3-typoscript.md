# TYPO3 TypoScript for Zed

TypoScript (`.typoscript`) and TSconfig (`.tsconfig`) in Zed.

<br>

## What it does

Tree-sitter grammar for highlighting, outline, brackets, and indents. A few snippets. A small keyword LSP (cObjects, stdWrap, modifiers, TSconfig keys) — downloaded from this repo’s GitHub release as `typoscript-lsp.js`.

No project awareness: no import resolution, constants, hover, or site-specific diagnostics. Fine for editing; not full IntelliSense. Community LSP work ([ide-companion](https://github.com/Teddytrombone/ide-companion)) has focused on Fluid, not TypoScript.

<br>

## If a community LSP appears

Grammar and snippets stay in this extension. Point `typoscript-lsp` at another stdio binary (e.g. `vendor/bin/typo3 …` in a Composer project) — see below. Until then, the keyword server is the default.

<br>

## Development

```bash
npm install
npx tree-sitter generate
npx tree-sitter test
cd server && npm install && npm run build && cd ..
```

**Extensions → Install Dev Extension** → this folder. Node 18+. Release flow: [PUBLISHING.md](PUBLISHING.md).

Local or alternate LSP via settings:

```json
{
  "lsp": {
    "typoscript-lsp": {
      "binary": {
        "path": "/path/to/node",
        "arguments": ["/path/to/typo3-typoscript/server/dist/server.js", "--stdio"]
      }
    }
  }
}
```

Swap `path`/`arguments` for any other stdio server; keep the id `typoscript-lsp`.

<br>

## Keywords

Generated in `server/scripts/generate-keywords.js` → `server/data/keywords.json`. Semantics: [TypoScript Explained](https://docs.typo3.org/m/typo3/reference-typoscript/main/en-us/).

```bash
cd server && npm run generate:keywords && npm run build
```

<br>

## Snippets

TypoScript: `page`, `pageview`, `text`, `coa`, `fluid`, `hmenu`, `cond`, `import`, `copy`, `ref`, `ml`, `wrap`  
TSconfig: `tceform`, `tcemain`, `tcadefaults`, `mod`, `options`, `rte`, `cond`, `import`

<br>

## Contributing

[github.com/onza/typo3-typoscript](https://github.com/onza/typo3-typoscript) — issues and PRs welcome.

<br>

## License

[MIT](LICENSE.md)

Copyright (C) 2026-present, Martin Farkas.
