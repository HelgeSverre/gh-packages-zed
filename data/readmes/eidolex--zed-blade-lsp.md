# Laravel LSP

A Zed extension that provides Laravel and Blade language support by coordinating multiple child language servers behind a single LSP interface.

## How It Works

Blade files are split into virtual PHP and HTML shadow documents. Each shadow is forwarded to the appropriate child server, and responses are remapped back to the original Blade source positions. This gives you full PHP and HTML intelligence inside `.blade.php` files without any server needing to understand Blade syntax directly.

```
Zed --> Extension (WASM) --> laravel-lsp-server --> Parser --> Virtual Documents
                                                       |
                                          Intelephense (PHP)
                                          vscode-html-language-server
                                          emmet-ls (optional)
```

## Features

### Blade Templating

- Completions, hover, signature help, and go-to-definition across mixed PHP/HTML regions
- Blade directive completions (`@if`, `@foreach`, `@extends`, etc.) triggered by `@`
- Diagnostics from child servers remapped to Blade positions
- Tree-sitter grammar for syntax highlighting

### Laravel Intelligence

Works in both `.blade.php` and plain `.php` files:

| Helper | Completion | Hover | Go to Definition |
|---|---|---|---|
| `route('...')` | Named routes from `routes/` | Route details | Route definition |
| `view('...')` | Blade views | View path | View file |
| `config('...')` | Keys from `config/` | Config values | Config file |
| `__()` / `trans()` | Translation keys from `lang/` | Translation value | Lang file |
| `env('...')` | Keys from `.env` | Env value | `.env` file |
| `<x-component>` | Blade components | Component path | Component file |

The Laravel index auto-rescans when you save files in `routes/`, `config/`, `lang/`, `app/Models/`, or `.env`.

### PHP (via Intelephense)

- Completions, hover, signature help, and go-to-definition inside PHP regions (`{{ }}`, `@php` blocks, etc.)

### HTML (via vscode-html-language-server + emmet-ls)

- HTML tag and attribute completions
- Emmet abbreviation expansion (optional, degrades gracefully if `emmet-ls` is not installed)
- HTML element and attribute hover docs

## Requirements

The following must be on your PATH:

- **intelephense** - `npm install -g intelephense`
- **vscode-html-language-server** - `npm install -g vscode-langservers-extracted`
- **emmet-ls** (optional) - `npm install -g emmet-ls`

## Installation

Build the LSP server binary and place it on your PATH:

```bash
cargo build --release -p laravel-lsp-server
cp target/release/laravel-lsp-server ~/.local/bin/
```

Build the Zed WASM extension:

```bash
cargo build --release
```

## Environment Variables

- `LARAVEL_LSP_LOG=debug` - enable debug logging (output goes to stderr)
- `LARAVEL_LSP_SERVER=/path/to/binary` - override the server binary path
