# Qlik for Zed

Syntax highlighting for **Qlik Sense** and **QlikView** script files (`.qvs`) in the [Zed](https://zed.dev) editor.

## Features

- Syntax highlighting for Qlik script language
- 430+ built-in function names recognized
- Comments: `//`, `/* */`, `REM ... ;`
- Strings: `'single'`, `"double"`, `[bracket fields]`
- Control flow: `IF/THEN/ELSE/END IF`, `FOR/NEXT`, `DO/LOOP`, `SUB/END SUB`, `SWITCH/CASE/END SWITCH`
- Script statements: `LOAD`, `SELECT`, `SET`, `LET`, `DROP`, `STORE`, etc.
- Prefixes: `MAPPING`, `CROSSTABLE`, `CONCATENATE`, `LEFT JOIN`, etc.
- Macros: `$(variable)`
- Operators: arithmetic, comparison, logical (`AND`, `OR`, `NOT`, `LIKE`)
- Auto-indentation for control blocks
- Bracket matching

## Installation

### From Zed Extension Registry (recommended)

1. Open Zed
2. Open Extensions panel (`Cmd+Shift+X` / `Ctrl+Shift+X`)
3. Search for "Qlik"
4. Click Install

### Manual (Dev Extension)

1. Clone this repository
2. In Zed: `Cmd+Shift+P` > "Install Dev Extension"
3. Select the cloned folder

## Tree-sitter Grammar

This extension uses the [zed-qlik-tree-sitter](https://github.com/bintocher/zed-qlik-tree-sitter) grammar.

## License

MIT
