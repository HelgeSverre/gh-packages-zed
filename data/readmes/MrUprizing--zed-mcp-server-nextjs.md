# Next.js DevTools MCP Extension for Zed

A Zed extension that integrates the Next.js DevTools MCP server for AI-powered development assistance.

## Features

- Access Next.js 16+ documentation and best practices
- Automated Next.js upgrade tools
- Cache Components setup and configuration
- Browser testing integration with Playwright
- Real-time Next.js runtime diagnostics (requires Next.js 16+)

## Installation

### From Zed Extensions

1. Open Zed
2. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Linux/Windows)
3. Type "extensions" and select "Extensions: Install Extensions"
4. Search for "Next.js DevTools MCP"
5. Click Install

### As Dev Extension (for development)

1. Clone this repository
2. Open Zed
3. Press `Cmd+Shift+P` and select "Extensions: Install Dev Extension"
4. Select the `zed-extension` directory

## Requirements

- Node.js v20.19 or newer
- npm or pnpm
- Next.js project (optional, but recommended for full features)

## Usage

Once installed, the MCP server will be available in Zed's Agent Panel.

### Example Prompts

```
Help me upgrade my Next.js app to version 16
```

```
What's the structure of my Next.js routes?
```

```
Enable Cache Components in my project
```

## MCP Server Features

This extension provides access to:

- **Documentation Search**: Query Next.js docs and knowledge base
- **Upgrade Tools**: Automated Next.js 16 upgrade with codemods
- **Cache Components Setup**: Complete setup with error detection
- **Browser Testing**: Playwright integration for automated testing
- **Runtime Diagnostics**: Real-time Next.js dev server insights (Next.js 16+)

## Development

```bash
# Install dependencies
cargo build --release --target wasm32-wasip1

# Test in Zed
# Install as dev extension and check logs with Cmd+Shift+P -> "Zed: Open Log"
```

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Links

- [Next.js DevTools MCP](https://www.npmjs.com/package/next-devtools-mcp)
- [Zed Extensions Documentation](https://zed.dev/docs/extensions)
- [Model Context Protocol](https://modelcontextprotocol.io/)