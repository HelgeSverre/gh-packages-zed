# JDL Language Support for Zed

This repository provides language support for the JHipster Domain Language (JDL) within the Zed editor.

## Features

*   **Syntax Highlighting** for `.jdl` files.
*   A foundation for future features like code folding, symbol navigation, and code analysis.

## Development

This project consists of two main parts:

*   `zed-jdl`: Contains the Zed-specific extension configuration.
*   `tree-sitter-jdl`: Contains the Tree-sitter grammar that parses JDL code.

### Prerequisites

To modify the grammar, you must have the `tree-sitter` CLI installed:

```sh
npm install -g tree-sitter-cli
