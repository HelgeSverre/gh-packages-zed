# Zed Textproto Extension

Language support for Protocol Buffers text format (textproto) in the [Zed](https://zed.dev) editor.

## Features

- Syntax highlighting for `.textproto`, `.txtpb`, `.textpb`, and `.pbtxt` files
- Bracket matching for `{}`, `<>`, and `[]` pairs
- Auto-indentation for nested messages
- Code outline navigation for fields
- Comment support (`#` style line comments)

## Installation

### From Zed Extensions (Coming Soon)

Once published, you'll be able to install directly from Zed:
1. Open Zed
2. Go to Extensions (cmd+shift+x / ctrl+shift+x)
3. Search for "Textproto"
4. Click Install

### Development Installation

To install the development version:

1. Clone this repository:
   ```bash
   git clone https://github.com/mikn/zed-textproto.git
   cd zed-textproto
   ```

2. Build the extension:
   ```bash
   cargo build --release
   ```

3. In Zed, open the command palette (cmd+shift+p / ctrl+shift+p)
4. Run "zed: install dev extension"
5. Select the cloned repository directory

## Supported Syntax

The extension supports all Protocol Buffers text format features:

- **Field assignments**: `name: "value"`
- **Nested messages**: `field { nested: "value" }` or `field < nested: "value" >`
- **Repeated fields**: `values: [1, 2, 3]`
- **Comments**: `# This is a comment`
- **Numbers**: Decimal, hexadecimal (`0xFF`), octal (`0755`), floating point
- **Strings**: With escape sequences
- **Extension fields**: `[com.example.extension]: "value"`
- **Any type fields**: `[type.googleapis.com/package.Type] { ... }`

## Example

```textproto
# Example configuration
name: "MyService"
timeout_seconds: 30

server_config {
  host: "localhost"
  port: 8080
  features: ["auth", "logging", "metrics"]
}

[com.example.custom_option]: true
```

## Development

### Requirements

- [Rust](https://rustup.rs/) (for building the extension)
- [Zed](https://zed.dev) editor

### Building from Source

```bash
# Clone the repository
git clone https://github.com/mikn/zed-textproto.git
cd zed-textproto

# Build the extension
cargo build --release
```

### Project Structure

```
zed-textproto/
├── extension.toml          # Extension manifest
├── Cargo.toml             # Rust dependencies
├── src/
│   └── lib.rs            # Extension implementation
└── languages/
    └── textproto/
        ├── config.toml    # Language configuration
        ├── highlights.scm # Syntax highlighting queries
        ├── brackets.scm   # Bracket matching rules
        ├── indents.scm    # Indentation rules
        └── outline.scm    # Symbol outline queries
```

## Grammar

This extension uses the [tree-sitter-textproto](https://github.com/PorterAtGoogle/tree-sitter-textproto) grammar for parsing.

## License

MIT License - see [LICENSE](LICENSE) file for details

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## Acknowledgments

- Tree-sitter grammar by [PorterAtGoogle](https://github.com/PorterAtGoogle/tree-sitter-textproto)
- Protocol Buffers text format [specification](https://protobuf.dev/reference/protobuf/textformat-spec/)