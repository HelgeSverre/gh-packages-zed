<p align="center"><img src="assets/hero.png" alt="looot-zed: looot MCP in the Zed editor" width="100%"></p>

# looot for Zed

[![License](https://img.shields.io/github/license/loootai/looot-zed)](LICENSE) [![Docs](https://img.shields.io/badge/docs-docs.looot.ai-12A06A)](https://docs.looot.ai)

looot gives an AI agent one key and one prepaid balance for 2,500+ data API endpoints from 90+ providers: work emails, phone numbers, company and people search, Google results, web pages, news, LinkedIn profiles, local businesses. The agent sees the price before it runs, and a failed call costs nothing. Top up from $5.

## Install for agents

```bash
claude mcp add --transport http looot https://api.looot.ai/mcp
```

See also: [awesome-looot-use-cases](https://github.com/loootai/awesome-looot-use-cases) (copy-paste recipes) and [awesome-gtm](https://github.com/loootai/awesome-gtm) (open-source GTM tools).

Zed supports remote MCP servers with OAuth natively, so looot needs no extension. Zed's publishing docs also say MCP server extensions are heading toward deprecation in favour of a registry, and that submissions must be tested by hand at the submitted commit. We did not submit one.

## Setup

Settings | AI | MCP Servers | Add Server | Add Remote Server, or edit settings.json:

```json
{
  "context_servers": {
    "looot": {
      "url": "https://api.looot.ai/mcp"
    }
  }
}
```

With no Authorization header, Zed starts the standard MCP OAuth flow and opens a browser window to sign in to looot.

[looot.ai](https://looot.ai) | [Docs](https://docs.looot.ai) | [Support](https://looot.ai/contact)
