# sBPF Assembly for Zed

Phase 1 MVP for Solana sBPF Assembly syntax highlighting in Zed.

## Features

- Language name: `sBPF Assembly`
- File suffixes: `.s`, `.sbpf`
- Tree-sitter grammar for `#` comments, labels, instructions, registers, numbers, symbols, strings, directives, and memory operands
- Zed highlight queries for comments, labels, opcodes, registers, numbers, symbols, and memory operands
- Bracket and comment configuration

## Local development

Generate the Tree-sitter parser sources before installing the extension:

```sh
cd tree-sitter-sbpf-asm
npm install
npm run generate
npm test
```

Install this directory as a Zed dev extension:

```sh
zed: install dev extension
```

Select the local clone of this repository.

## Phase 2

Add a small language server for completions and hover docs once syntax highlighting is verified.
