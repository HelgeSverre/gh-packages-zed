# JTE Extension for Zed

Java Template Engine ([JTE](https://jte.gg/)) language extension for the [Zed](https://zed.dev/) code editor.

## Features

- **Grammar & Syntax Highlighting**: Tree-sitter parser for `.jte` and `.kte` files.
  - Directives: `@param`, `@import`, `@template`, `@raw`.
  - Control structures: `@if`, `@elseif`, `@else`, `@endif`, `@for`, `@endfor`.
  - Expressions: Output `${...}`, unescaped `$unsafe{...}`, local declarations `!{...}`.
  - Template calls with named arguments and content blocks (``@`...` ``).
  - JTE comments (`<%-- ... --%>`).
- **Language Injections**:
  - Embedded Java syntax highlighting for expressions, conditions, and parameters.
  - Embedded HTML markup across template body.
  - Embedded CSS inside `<style>` tags.
  - Embedded JavaScript inside `<script>` tags.
- **Language Server Protocol (LSP)**:
  - Automatically provisions and configures `vscode-html-language-server`.
  - Full autocomplete and formatting for HTML, embedded CSS, and embedded JS.
- **Editor Integration**:
  - Bracket pair matching.
  - Indentation rules for control structures and expressions.
  - Comment toggle (<kbd>Ctrl+/</kbd> / <kbd>Cmd+/</kbd>).

## Installation

### Development Mode

1. Open Zed.
2. Open the Command Palette (<kbd>Ctrl+Shift+P</kbd> on Linux/Windows, <kbd>Cmd+Shift+P</kbd> on macOS).
3. Run `zed: install dev extension`.
4. Select the repository root directory.

## Repository Structure

- [`extension.toml`](file:///home/diego/Proyectos/jte-zed-extension/extension.toml): Extension manifest and grammar registration.
- [`languages/jte/`](file:///home/diego/Proyectos/jte-zed-extension/languages/jte): Language metadata (`config.toml`) and Tree-sitter queries (`highlights.scm`, `injections.scm`, `brackets.scm`, `indents.scm`).
- [`tree-sitter-jte/`](file:///home/diego/Proyectos/jte-zed-extension/tree-sitter-jte): Tree-sitter grammar specification and generated C parser source.
- [`src/lib.rs`](file:///home/diego/Proyectos/jte-zed-extension/src/lib.rs): Rust WebAssembly extension module managing `vscode-html-language-server`.
