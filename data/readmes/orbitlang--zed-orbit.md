<div align="center">

# Orbit for Zed

**The official [Zed](https://zed.dev) extension for the [Orbit](https://github.com/orbitlang/orbit) programming language.**

[![editor: Zed](https://img.shields.io/badge/editor-Zed-084CCF)](https://zed.dev)
[![grammar: tree--sitter](https://img.shields.io/badge/grammar-tree--sitter-green)](https://github.com/orbitlang/ts-orbit)
[![license: Apache 2.0](https://img.shields.io/badge/license-Apache--2.0-green)](LICENSE)

</div>

---

> ⚠️ **Early days.** The extension is functional and tracks the Orbit
> language as it stands today, but both Orbit and this extension are moving
> targets. Expect frequent updates as the language evolves.

## What is this?

This is the official Zed editor extension for **Orbit** programming language. 
It gives `.orb` files first-class treatment in Zed: syntax highlighting, smart indentation, and
bracket handling, all driven by a real [tree-sitter](https://tree-sitter.github.io/tree-sitter/)
grammar rather than regex heuristics.

Because it parses Orbit with the same kind of grammar the language tooling
itself uses, highlighting stays accurate through the whole surface of the
language — from atoms and raw strings to decorators, channels, and grouped
`native from` FFI blocks.

## Features

- **Full syntax highlighting** — every construct the language currently
  exposes:
  - Comments (`#`, `/* … */`) and **doc comments** (`/** … */`)
  - All literals — integers (dec/hex/oct/bin, signed & unsigned), floats,
    chars, strings, **raw** (`r"…"`) and **bytes** (`b"…"`) strings, atoms
    (`@name`), booleans, `nil`
  - Declarations — `func`, `class`, `trait`, `impl`, `init`/`cleanup`,
    `var`/`let`, `native`
  - Control flow — `if`/`elif`/`else`, `loop`, `for … in`, `switch`/`case`/
    `default`/`fallthrough`, `break`/`continue`, `defer`, `try`/`catch`/
    `finally`, `sync`
  - Concurrency & operators — `spawn`, `await`, channels (`<-`), pipelines
    (`|>`), null-safety (`?.`, `??`, `?:`), the full operator set
  - Visibility & modifiers — `pub`, `prot`, `weak`, `async`, `const`
  - Built-in types — `i8…i64`, `u8…u64`, `iSize`/`uSize`, `f32`/`f64`, `bool`,
    `byte`, `ptr`, `opaque`, `unit`
  - Decorators (`@[ … ]`), imports (`import`/`from`/`as`), and FFI declarations
    including the grouped `native from "lib" { … }` form
- **Smart indentation** — automatic indent/outdent for blocks, `switch` bodies,
  parameter and argument lists, list/set/dict literals, and `native` blocks.
- **Bracket matching & auto-close** — for `{}`, `[]`, `()`.
- **Comment toggling** — line (`#`) and block (`/* */`) comments.

## Installation

Orbit is not yet in the Zed extension registry, so install it as a **dev
extension**:

1. Clone this repository.
2. In Zed, open the command palette and run **`zed: install dev extension`**.
3. Select the cloned `zed-orbit` directory.

Zed compiles the tree-sitter grammar to WebAssembly on install (this downloads
a small toolchain the first time). Once done, any `.orb` file is recognised as
**Orbit** automatically.

## What it does *not* do (yet)

Highlighting and indentation are provided directly by this extension. Richer
editor features depend on tooling that Orbit does not ship yet:

| Feature | Status |
|---|---|
| Syntax highlighting | ✅ |
| Auto-indent / bracket handling | ✅ |
| **Format Document** | ❌ Needs an external formatter or an LSP |
| Autocomplete, diagnostics, go-to-definition | ❌ Needs an Orbit language server |

These will land as the Orbit toolchain grows a formatter and language server.

## How it's built

The extension is a thin Zed package around a dedicated tree-sitter grammar:

| Piece | Where |
|---|---|
| Extension manifest | [`extension.toml`](extension.toml) |
| Language config (`.orb`, comments, brackets) | [`languages/orbit/config.toml`](languages/orbit/config.toml) |
| Highlighting / indent / bracket queries | [`languages/orbit/*.scm`](languages/orbit/) |
| **The grammar itself** | [`orbitlang/ts-orbit`](https://github.com/orbitlang/ts-orbit) |

`extension.toml` pins an exact commit of the grammar repository; Zed clones and
compiles that commit at install time. See the grammar repo for how the parser
is defined and regenerated.

## Project status

The extension mirrors the Orbit language, which is in active alpha. As Orbit's
syntax moves, the grammar and these queries are updated to match. If you hit a
construct that isn't highlighted or indented correctly, it's most likely a
grammar gap worth reporting.

## Maintenance

This extension is **fully AI-managed**: the tree-sitter grammar, the Zed
queries, and this documentation are authored and kept in sync with the Orbit
language by an AI workflow. It aims to support every feature the language
currently offers, and to follow along as new ones land.

## License

Licensed under the **Apache License 2.0**. See [LICENSE](LICENSE).
