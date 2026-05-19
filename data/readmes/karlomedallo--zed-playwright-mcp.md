# Playwright MCP Server for Zed

A [Zed](https://zed.dev/) extension that provides browser automation capabilities through the [Playwright MCP](https://github.com/microsoft/playwright-mcp) server.

This extension wraps the official `@playwright/mcp` npm package, making all of its tools available in Zed's Agent Panel.

## Features

All tools provided by the Playwright MCP server are available, including:

- **Browser navigation** — navigate to URLs, go back/forward, reload
- **Interaction** — click, type, hover, drag, select options, upload files
- **Accessibility snapshots** — structured page snapshots for LLM consumption
- **Screenshots** — full-page or element-level visual captures (vision mode)
- **Tab management** — open, close, and switch between tabs
- **PDF generation** — save pages as PDFs
- **JavaScript execution** — run scripts in the browser console
- **Network monitoring** — intercept and inspect requests
- **File downloads** — trigger and manage downloads

## Requirements

- [Node.js](https://nodejs.org/) must be installed and available in your `PATH`

## Configuration

All settings are optional. Add them to your Zed `settings.json` under:

```json
{
  "context_servers": {
    "mcp-server-playwright": {
      "settings": {
        "browser": "chromium",
        "headless": false,
        "vision": false
      }
    }
  }
}
```

| Setting | Type | Description |
|---------|------|-------------|
| `browser` | `string` | `"chromium"`, `"firefox"`, `"webkit"`, or `"msedge"` |
| `headless` | `bool` | Run browser without a visible window |
| `vision` | `bool` | Use screenshots instead of accessibility snapshots |
| `device` | `string` | Device to emulate (e.g. `"iPhone 15"`) |
| `viewport_size` | `string` | Viewport dimensions (e.g. `"1280x720"`) |
| `user_data_dir` | `string` | Path to browser user data directory |
| `executable_path` | `string` | Path to a custom browser executable |
| `cdp_endpoint` | `string` | Chrome DevTools Protocol endpoint |
| `isolated` | `bool` | Keep browser profile in memory only |
| `storage_state` | `string` | Path to storage state file (cookies/localStorage) |
| `ignore_https_errors` | `bool` | Ignore HTTPS certificate errors |
| `output_dir` | `string` | Directory for output files (PDFs, traces) |

## License

MIT
