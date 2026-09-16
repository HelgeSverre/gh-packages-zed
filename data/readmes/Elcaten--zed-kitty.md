# Kitty for Zed

Syntax highlighting, formatting, completion and hover help for [kitty](https://sw.kovidgoyal.net/kitty/) configuration
files in [Zed](https://zed.dev/).

![Kitty syntax highlighting and option suggestions with descriptions and defaults in Zed](screenshots/SCR-20260909-rvvj.png)

## Features

- **Syntax highlighting** for comments, option names, includes, strings, numbers, colors and line continuations, plus
  Zed's line comment toggling.
- **Formatting** through **Format Document**, or on save if your Zed settings ask for it. One space is used after the
  directive name; values, comments, continuations and directive order are preserved.
- **Completion and hover** for option names. Typing `back` suggests `background`, `background_opacity` and
  `background_image`, each with a description, its defaults and a link to kitty's reference. Accepting a suggestion
  replaces only the name and keeps an existing value.

Completion and hover read an embedded kitty **0.48.2** option catalog, so they work offline and in unsaved or
incomplete files. Value completion and diagnostics are not provided yet.

## File detection

Files named `kitty.conf` are recognized automatically. For themes and included configurations, add file associations
to your Zed settings:

```json
{
  "file_types": {
    "Kitty": ["kitty.conf", "**/kitty/*.conf"]
  }
}
```

These are glob patterns, not regular expressions. The example also matches files such as `kitty/current-theme.conf`;
use `**/kitty/**/*.conf` to include subdirectories. You can also select **Kitty** from Zed's language menu for any
file. See Zed's [file association documentation](https://zed.dev/docs/configuring-languages#file-associations).

## Language server

Formatting, completion and hover come from `kitty-lsp`, a native server built from this repository. The extension
runs the binary from your `lsp.kitty-lsp.binary` settings, otherwise one found on `PATH`, otherwise it downloads the
pinned release for your platform, checked against a SHA-256 digest recorded in the extension before it is run.
Prebuilt binaries cover macOS (Intel and Apple Silicon), Linux (x86-64 and ARM64) and Windows (x86-64).

Mixed LF/CRLF documents are refused with no edits;
[`formatter/README.md`](formatter/README.md) lists the rest of the formatting contract.

## Contributing

[AGENTS.md](AGENTS.md) describes the repository layout, build commands and release process.

## License

[MIT](LICENSE).
