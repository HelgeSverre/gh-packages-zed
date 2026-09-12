# Fennel for Zed

[Zed](https://zed.dev) Extension for Fennel language support for powered by:

- [alexmozaidze/tree-sitter-fennel](https://github.com/alexmozaidze/tree-sitter-fennel)
- [sr.ht/~xerool/fennel-ls](https://git.sr.ht/~xerool/fennel-ls/)

## Screenshot

<img width="767" height="310" alt="Screenshot 2026-07-27 at 09 38 26" src="https://github.com/user-attachments/assets/77f29bc4-6896-406b-b9b1-c172b2f3f8f5" />

## Features

- Syntax highlighting for Fennel forms, literals, bindings, reader macros, and calls
- Automatic indentation and bracket matching
- Code outline entries for named functions, lambdas, macros, and function bindings
- Comment toggling and `.fnl` file detection
- Completions, diagnostics, navigation, and formatting through `fennel-ls`

## Language server

This extension does not download `fennel-ls`. It looks for a `fennel-ls`
executable in the worktree's `PATH` and reports an error if it cannot find one.

On macOS, install it with Homebrew:

```sh
brew install fennel-ls
```

For other installation methods, see the
[fennel-ls installation guide](https://git.sr.ht/~xerool/fennel-ls/tree/HEAD/docs/installation.md).

## Development installation

1. Open Zed's Extensions page.
2. Select **Install Dev Extension**.
3. Choose this repository's directory.

## License

MIT
