# mcp-server-powerdrill

Zed extension that wraps the [`@powerdrillai/powerdrill-mcp`](https://www.npmjs.com/package/@powerdrillai/powerdrill-mcp) MCP server.

## Configuration

This MCP server requires your Powerdrill credentials. Follow the official [Powerdrill MCP prerequisites guide](https://github.com/powerdrillai/powerdrill-mcp?tab=readme-ov-file#prerequisites) to sign up and obtain the necessary information.

1. Create or join a [Powerdrill team](https://powerdrill.ai)
2. Navigate to the team settings to locate your **User ID**
3. Generate or copy your **Project API Key**

In your Zed settings:

```json
{
    "context_servers": {
        "mcp-server-powerdrill": {
          "settings": {
              "powerdrill_user_id": "YOUR_USER_ID",
              "powerdrill_project_api_key": "YOUR_PROJECT_API_KEY"
          }
        }
    }
}

```

