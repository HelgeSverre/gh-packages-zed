# heta - Zed extension

This package is a plugin for the [Zed editor](https://zed.dev/) that provides syntax highlighting for [Heta language](https://hetalang.github.io/) code.

It is part of the Heta ecosystem and is similar in purpose to the VS Code extension:
[heta-highlight-vscode](https://github.com/hetalang/heta-highlight-vscode).

## Why this package

Use this extension to improve readability of Heta model files in Zed by adding language-aware highlighting.

## Heta project links

- [Heta project website](https://hetalang.github.io/)
- [heta-highlight-vscode](https://github.com/hetalang/heta-highlight-vscode)
- [tree-sitter-heta grammar](https://github.com/hetalang/tree-sitter-heta)

This extension provides Zed integration, while parsing comes from the external [tree-sitter-heta](https://github.com/hetalang/tree-sitter-heta) grammar.

## Installation

1. Open Zed and go to the **Extensions** panel.
2. Search for **Heta**.
3. Click **Install**.

## Local installation (development)

1. Open the Zed command palette.
2. Run `zed: install dev extension`.
3. Select this directory:

```text
<folder>/zed-heta
```

The extension expects the local Tree-sitter grammar repository:

```text
<folder>/tree-sitter-heta
```

## Supported files

- `.heta`

## License

[MIT](LICENSE)
