# shadcn/ui MCP Extension for Zed

A Zed extension that integrates the shadcn MCP server for AI-powered component management and registry browsing.

## Features

- Browse and search shadcn/ui components from any registry
- Install components using natural language prompts
- Support for multiple registries and namespaces
- Private registry authentication via environment variables
- Works with any shadcn-compatible registry

## Installation

### From Zed Extensions

1. Open Zed
2. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Linux/Windows)
3. Type "extensions" and select "Extensions: Install Extensions"
4. Search for "shadcn/ui MCP"
5. Click Install

### As Dev Extension (for development)

1. Clone this repository
2. Open Zed
3. Press `Cmd+Shift+P` and select "Extensions: Install Dev Extension"
4. Select the extension directory

## Requirements

- Node.js v18 or newer
- npm or pnpm
- Project with `components.json` (created via `npx shadcn@latest init`)

## Usage

Once installed, the MCP server will be available in Zed's Agent Panel.

### Example Prompts

```
Show me all available components in the shadcn registry
```

```
Add the button, dialog and card components to my project
```

```
Find me a login form from the shadcn registry
```

## MCP Server Features

This extension provides access to:

- **Component Browsing**: List and search components from shadcn registries
- **Natural Language Installation**: Install components using conversational prompts
- **Multi-Registry Support**: Access public, private, and third-party registries
- **Authentication**: Use environment variables for private registry access

## Development

```bash
# Build the extension
cargo build --release --target wasm32-wasip1

# Test in Zed
# Install as dev extension and check logs with Cmd+Shift+P -> "Zed: Open Log"
```

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Links

- [shadcn/ui MCP Documentation](https://ui.shadcn.com/docs/mcp)
- [Zed Extensions Documentation](https://zed.dev/docs/extensions)
- [Model Context Protocol](https://modelcontextprotocol.io/)
