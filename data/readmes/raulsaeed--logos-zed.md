# logos-zed

[Logos](https://theos.dev/docs/logos) language support for [Zed](https://zed.dev), including syntax highlighting and a built-in language server with completions and hover documentation.

Logos is a preprocessor used in iOS/macOS jailbreak tweak development (via [Theos](https://theos.dev)) that simplifies Objective-C method hooking with `%hook`, `%orig`, and related directives.

> Inspired by the [logos-vscode](https://github.com/tale/logos-vscode) extension for VS Code.

## Features

- Syntax highlighting for `.x`, `.xm`, `.xi`, and `.xmi` files
- Completions for all Logos directives (`%hook`, `%end`, `%orig`, `%new`, `%ctor`, `%dtor`, `%group`, `%subclass`, `%property`, `%init`, `%log`, `%c`)
- Hover documentation for every directive
- Full Objective-C syntax highlighting inherited from the `objc` grammar

## Installation

Search for **Logos** in the Zed extension marketplace (`Cmd+Shift+X`) and install it.

## Logos Directives

| Directive | Description |
|-----------|-------------|
| `%hook ClassName` | Open a hook block for an Objective-C class |
| `%end` | Close a `%hook`, `%group`, or `%subclass` block |
| `%orig` | Call the original hooked method |
| `%new` | Add a new method to a hooked class |
| `%ctor` | Anonymous constructor, runs on binary load |
| `%dtor` | Anonymous destructor, runs on binary unload |
| `%group GroupName` | Define a named hook group |
| `%subclass ClassName : SuperClass` | Generate a runtime subclass |
| `%property` | Add a property to a hooked class or subclass |
| `%init` | Initialize a group's hooks |
| `%log` | Dump method arguments to syslog |
| `%c(ClassName)` | Evaluate a class by name at runtime |

## Development

```sh
# Clone the repo
git clone https://github.com/raulsaeed/logos-zed.git
cd logos-zed

# Install the extension as a dev symlink in Zed
ln -s $(pwd) ~/Library/Application\ Support/Zed/extensions/installed/logos

# Build the language server
cd logos-lsp && cargo build --release

# Copy the binary to Zed's extension work directory
mkdir -p ~/Library/Application\ Support/Zed/extensions/work/logos
cp ../target/release/logos-lsp ~/Library/Application\ Support/Zed/extensions/work/logos/logos-lsp
```

Then reload the extension in Zed via `Cmd+Shift+P` → `zed: reload extensions`.

After making changes to the language server, rebuild and copy the binary again:

```sh
cargo build --release --manifest-path logos-lsp/Cargo.toml && \
  cp target/release/logos-lsp ~/Library/Application\ Support/Zed/extensions/work/logos/logos-lsp
```

## License

MIT
# logos-zed
