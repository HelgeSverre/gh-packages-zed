# Zed Latte Extension

Latte language support for the Zed code editor.

- Syntax highlighting, brackets, outline, and indentation for `.latte` files.
- Arguments and PHP blocks are passed to tree-sitter-php for highlighting.
- Emmet / Tailwind language server support
- Powered by [tree-sitter-latte](https://github.com/josbeir/tree-sitter-latte).

## Installation

Install from the zed extensions list.

### Enabling tailwindCSS support

To use TailwindCSS you need to inform the LSP of the Latte filetype. Additionally, you need to add `tailwindcss-language-server` to your `language_servers` list for Latte.

```json
{
    "languages": {
        "Latte": {
          "language_servers": ["tailwindcss-language-server", "emmet"]
        }
    },
    "lsp": {
        "tailwindcss-language-server": {
            "settings": {
                "tailwindCSS.includeLanguages": {
                    "latte": "html"
                }
            }
        }
    }
}
```

This example above configures zed to use `tailwindcss-language-server` + the `emmet` language server when working with Latte files.²

## Installation (from source)

1. Open Zed.
2. Go to **Extensions > Install Dev Extension** and select this folder.

## Contributing

Pull requests and issues are welcome!

## License

MIT License. See [LICENSE](LICENSE) for details.
