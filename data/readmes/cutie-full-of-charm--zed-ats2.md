# ATS2 for Zed
[RU README](README.ru.md)

Syntax highlighting for ATS2 (Applied Type System 2)
in the Zed editor

## Features

- ATS2 syntax highlighting
- `.dats`, `.sats`, `.hats` support
- Functions and variable declarations
- Static parameters and types
- Algebraic data types and constructors
- Pattern matching
- String escapes and literals
- Embedded C blocks

## Installation

1. Clone this repository:

   ```sh
   git clone https://github.com/cutie-full-of-charm/zed-ats2.git
   ```

2. Open Zed
3. Open Command Palette (`Ctrl+Shift+P`)
4. Run `zed: install dev extension`
5. Select the cloned `zed-ats2` directory

Open any `.dats` or `.sats` file, also you can open `test_highlight_here.dats` file in this repo for test

## Limitations

This extension currently provides syntax highlighting only

There is no LSP, type checking, or code completion

## License

Note that code is licensed under MPL 2.0, but i'm too lazy to copy license into each file right now
