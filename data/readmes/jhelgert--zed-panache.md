# panache extension for Zed

This extension adds support for [panache](https://github.com/jolars/panache) to Zed, a language server, formatter, and linter for Pandoc, Quarto, and R Markdown.


## Installation

### 1. Install panache

`panache` must be installed on your system and available in your `$PATH`in order to use in Zed.

You can install panache globally on your system using `cargo`:

```bash
cargo install panache
```

Alternatively, you can install pre-built binary packages from the [releases page](https://github.com/jolars/panache/releases).

### 2. Install the extension

Search for `panache` in the Zed extensions panel and click to install.

### 3. Configure

Then, you only need to enable the language server in your settings:

```json
{
  "languages": {
    "Markdown": {
      "language_servers": ["panache"]
    },
  }
}
```
