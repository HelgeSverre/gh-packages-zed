# Logos for Zed

Syntax highlighting for Theos Logos files in Zed.

Supported file suffixes:

- `.x`
- `.xm`

The extension is intentionally small:

- no Rust/WASM extension code;
- no bundled VS Code extension assets;
- a local Tree-sitter grammar for Logos syntax and Objective-C/C-style tokens.

## Local Testing

1. Open Zed.
2. Run `zed: install dev extension`.
3. Select this directory.
4. Open `examples/Tweak.xm`.
5. Confirm the language selector shows `Logos` and the Logos directives are highlighted.

If Zed cannot load the grammar, open `zed: open log` and search for `logos`.

## Publishing Notes

Before submitting to `zed-industries/extensions`:

1. Create a public GitHub repository for this project.
2. Update `extension.toml`:
   - confirm `authors` is set to `Great Love (nobottomline)`;
   - set the top-level `repository` to the public extension repository;
   - set `[grammars.logos].repository` to the public grammar repository;
   - set `[grammars.logos].rev` to a real commit SHA.
3. Keep `LICENSE` in the repository root. Zed requires a recognized license for extension submissions.

For a single-repository setup, the grammar repository can be this same repository if `grammar.js` and `src/parser.c` stay at the repository root.
