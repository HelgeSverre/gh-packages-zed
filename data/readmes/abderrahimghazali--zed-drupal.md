# Drupal for Zed

Drupal development support for the Zed editor.

Pair with [Drupal Syntax Highlighting](https://github.com/abderrahimghazali/zed-drupal-syntax-highlighting)
to highlight `.module`, `.install`, `.theme`, `.inc`, `.profile`, `.engine`, and
`.test` files as PHP.

## Architecture

The extension is a thin Rust/WASM wrapper that launches
[`drupal-lsp`](https://github.com/abderrahimghazali/drupal-lsp), a separate
Rust binary that handles all the work over the Language Server Protocol.

## Planned features

- PHPCS diagnostics with `drupal/coder` rules
- PHPCBF formatter
- PHPStan diagnostics with `phpstan-drupal` (off by default)
- Hook name completion
- Twig template completion
- Service container completion
- Global variables completion
- Translation string completion (PHP, Twig, JS)
- YAML schema validation for Drupal config files
- Drupal API documentation search

## Development

1. Clone and build [`drupal-lsp`](https://github.com/abderrahimghazali/drupal-lsp):
   ```sh
   git clone https://github.com/abderrahimghazali/drupal-lsp
   cd drupal-lsp && cargo install --path .
   ```
   This puts `drupal-lsp` on your `PATH`.

2. In Zed, run `zed: install dev extension` and pick this folder.

3. Open a PHP file. Completions and diagnostics flow through `drupal-lsp`.

## Status

Pre-alpha scaffold. Not yet useful.

## License

Apache 2.0.
