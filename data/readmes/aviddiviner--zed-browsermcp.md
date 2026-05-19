# zed-browsermcp

Zed extension for [BrowserMCP](https://browsermcp.io) — automate your browser with AI directly from Zed.

## Prerequisites

1. **Chromium-based browser** (Chrome, Edge, Brave, Arc, etc.) with the [BrowserMCP Chrome extension](https://browsermcp.io) installed and enabled.
2. **Node.js** installed on your system (for running the MCP server).

## Installation

Install the **BrowserMCP Server** extension from the Zed extension marketplace.

## Usage

Once installed, the extension will automatically manage the `@browsermcp/mcp` npm package and start the MCP server when needed.

No configuration is required — BrowserMCP connects to the Chrome extension automatically via WebSocket on your local machine.

Make sure the BrowserMCP Chrome extension is running in your browser before starting a session.

## How It Works

This extension:

1. Installs the [`@browsermcp/mcp`](https://www.npmjs.com/package/@browsermcp/mcp) npm package
2. Spawns it as a stdio-based MCP server
3. The MCP server connects to the BrowserMCP Chrome extension via local WebSocket
4. AI tools in Zed can then automate your browser (navigate, click, type, take screenshots, etc.)

## Troubleshooting

- **Tools not appearing?** Make sure the BrowserMCP Chrome extension is installed and enabled in your browser.
- **Connection issues?** Try refreshing the Chrome extension and restarting the MCP server in Zed.
- **Node not found?** Ensure Node.js is installed and available on your system PATH.

## License

MIT
