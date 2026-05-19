# Jina AI MCP Server for Zed

A [Zed](https://zed.dev) extension that integrates the [Jina AI MCP Server](https://github.com/jina-ai/MCP) into your editor, providing 19 AI-powered tools for web search, URL reading, academic paper search, reranking, and more.

## Installation

1. Open Zed
2. Go to **Extensions** (Command Palette > "Extensions: Install Extension")
3. Search for **"Jina AI MCP Server"** and install it

## Configuration

Add your Jina AI API key in Zed's `settings.json`:

```json
{
  "context_servers": {
    "mcp-server-jina": {
      "settings": {
        "jina_api_key": "jina_xxxx"
      }
    }
  }
}
```

Get a free API key at [jina.ai](https://jina.ai) > [API Dashboard](https://jina.ai/api-dashboard).

Some tools (like `read_url`) work without an API key but with rate limits.

## Tool Filtering

To reduce context window token usage, you can filter which tools are registered:

```json
{
  "context_servers": {
    "mcp-server-jina": {
      "settings": {
        "jina_api_key": "jina_xxxx",
        "include_tools": "read_url,search_web",
        "exclude_tags": "parallel"
      }
    }
  }
}
```

Available filter settings:
- `exclude_tools` / `include_tools` - comma-separated tool names
- `exclude_tags` / `include_tags` - comma-separated tags (`search`, `parallel`, `read`, `utility`, `rerank`)

## Available Tools

| Category | Description |
|----------|-------------|
| Web Reading | Extract clean markdown from any URL |
| Web Search | Search the web for current information |
| Academic Search | Search arXiv and SSRN papers |
| Image Search | Search for images across the web |
| Screenshot Capture | Capture screenshots of web pages |
| Document Reranking | Rerank documents by relevance |
| Semantic Deduplication | Deduplicate strings and images |
| PDF Extraction | Extract figures, tables, and equations from PDFs |
| Query Expansion | Expand and rewrite search queries |

## License

MIT
