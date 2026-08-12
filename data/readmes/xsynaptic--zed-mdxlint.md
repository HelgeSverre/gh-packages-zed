# zed-mdxlint

Runs [`mdxlint-language-server`][server] so MDX files get lint diagnostics and formatting
from your `.mdxlintrc`. The server is downloaded from npm on first run unless you already
have it.

You also need the [MDX extension][mdx] for the `MDX` language itself. Hover, completion
and go-to-definition come from the [mdx-analyzer][analyzer] it bundles; this extension adds
diagnostics, formatting and `quickfix` code actions.

## Install

Open `zed: extensions`, search for `MDX Lint`, and install. To run from source, clone this
repository and use `zed: install dev extension`, which needs [`rustup`][rustup].

## Settings

Anything under `settings` is forwarded to the server, which supports `requireConfig`,
`ignorePath` and `ignorePathResolveFrom`:

```json
{
  "lsp": {
    "mdxlint": {
      "settings": { "requireConfig": true }
    }
  }
}
```

Select mdxlint as the formatter with:

```json
{
  "languages": {
    "MDX": {
      "formatter": { "language_server": { "name": "mdxlint" } }
    }
  }
}
```

The binary is resolved from `binary.path`, then `mdxlint-language-server` on your `PATH`,
then an npm download.

## Notes

Quickfixes come from an `expected` field on each message, so they appear only for plugins
that set one. Formatting is what normalises the rest.

Formatting is skipped entirely on a file that fails to parse, so a syntax error stays put
until you fix it by hand.

`.mdxlintrc.mjs` is loaded through `import()` and cached per process, so edits need a
language server restart. JSON and YAML configs are re-read every run.

## Development

Zed compiles the extension on `zed: install dev extension`, so trying a change only needs
a reinstall. To run what CI runs:

```sh
rustup target add wasm32-wasip2
cargo fmt --check
cargo clippy --target wasm32-wasip2 -- -D warnings
cargo build --release --target wasm32-wasip2
```

Clippy runs with `pedantic` denied. `pnpm format` covers the Markdown, YAML and JSON.
Releases bump `Cargo.toml` and `extension.toml` together, which CI enforces.

## License

MIT

[server]: https://github.com/remcohaszing/mdxlint-language-server
[mdx]: https://github.com/srazzak/zed-mdx
[analyzer]: https://github.com/mdx-js/mdx-analyzer
[rustup]: https://rustup.rs
