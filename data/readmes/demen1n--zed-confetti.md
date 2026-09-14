# zed-confetti

[Zed](https://zed.dev) extension adding language support for
[Confetti](https://confetti.hgs3.me), an unopinionated configuration
language.

## Features

- Syntax highlighting (`#`, `//` and `/* */` comments; quoted and
  triple-quoted arguments; directive names)
- Code folding and auto-indent for `{ }` blocks
- Outline view for nested block directives
- Auto-closing brackets and quotes

Powered by [tree-sitter-confetti](https://github.com/demen1n/tree-sitter-confetti).

## File types

This extension activates for `.conf` and `.confetti` files. Since `.conf`
is used by several other languages/extensions, if Zed doesn't pick
Confetti automatically for a given file, set it explicitly, either from
the language selector in the status bar, or in your `settings.json`:

```json
{
  "file_types": {
    "Confetti": ["your-file-name.conf"]
  }
}
```

## Development

This extension can be loaded from a local checkout via Zed's
`zed: install dev extension` command, pointed at this repository's
directory.

## License

MIT, see [LICENSE](LICENSE).
