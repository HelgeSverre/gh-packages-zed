# Code Translate

Offline Chinese translations for English identifiers in Zed Hover.

Native Rust LSP (`code-translate-lsp`) + Zed extension. No online translation; no source code leaves the machine.

## Support

Languages: Rust, Python, Go, JavaScript, TypeScript, Markdown.

Hover resolves the identifier under the cursor (camelCase / snake_case / etc.). Only dictionary hits are shown. Works alongside native language servers.

Not included: selection translation, settings UI, custom dictionaries, JSX/TSX, non-Zed editors, 32-bit hosts.

## Develop

```sh
cargo fmt --all -- --check
cargo clippy --workspace --all-targets --locked -- -D warnings
cargo test --workspace --locked
cargo check -p code-translate-zed --target wasm32-wasip2 --locked
python3 -m unittest tests.test_release
python3 scripts/release.py check-source
```

Dev extension: open the repo in Zed → `zed: install dev extension` → `extensions/code-translate`.  
The extension downloads the published server for the matching version from GitHub Releases.

## Attribution

- Dictionary shards are taken from [w88975/code-translate-vscode](https://github.com/w88975/code-translate-vscode) at commit `e280dbb1cad87c848f99c17fcd31d63050d395b4` (`src/dict`), MIT, Copyright (c) 2020 w88975.
- Identifier splitting was informed by [domchristie/humps](https://github.com/domchristie/humps), MIT, Copyright © 2012+ Dom Christie.
- The corpus follows the schema/lineage of [skywind3000/ECDICT](https://github.com/skywind3000/ECDICT), MIT, Copyright (c) 2025 Linwei. No ECDICT revision has been verified byte-for-byte against these shards.
