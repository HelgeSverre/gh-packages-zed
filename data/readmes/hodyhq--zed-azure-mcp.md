# Azure MCP for Zed

A [Zed](https://zed.dev) extension that wires [Microsoft's Azure MCP server](https://github.com/microsoft/mcp)
into Zed's Agent Panel. Your AI agent gets tools to manage and query Azure —
resource groups, storage, Key Vault, Functions, AKS, Cosmos DB, Monitor, and
dozens more services — authenticated with your existing Azure identity.

## Prerequisites

- **Azure sign-in**: the server uses `DefaultAzureCredential`. Run `az login`
  before using the agent, or provide a service principal via the standard
  `AZURE_TENANT_ID` / `AZURE_CLIENT_ID` / `AZURE_CLIENT_SECRET` environment
  variables. The extension never handles or stores credentials.
- Nothing else. The `@azure/mcp` server is installed automatically with Zed's
  managed Node.js runtime — you don't need Node, npm, or npx on your machine.

## Install

Zed → Extensions (`zed: extensions`) → search **Azure MCP** → Install.
Then open the Agent Panel, and under **Settings → Model Context Protocol**
confirm `azure-mcp` is running.

## Settings

All settings are optional — the extension works with zero configuration.
Configure in `settings.json` under `context_servers`:

```jsonc
{
  "context_servers": {
    "azure-mcp": {
      "settings": {
        // Limit which Azure services load (default: all).
        // The full tool set is large; narrowing it keeps the agent focused.
        "namespaces": ["storage", "functionapp", "keyvault"],

        // "namespace" (default) = one tool per service.
        // "consolidated" | "all" | "single" also supported.
        "mode": "namespace",

        // true = agent can only read Azure state, never modify it.
        // Default is false (full management access) — flip this on if you
        // want a safety net.
        "read_only": false,

        // Expose only specific tools by name (implies "all" mode).
        "tools": [],

        // "AzureCloud" (default), "AzureChinaCloud", "AzureUSGovernment".
        "cloud": "AzureCloud",

        // Verbose server logging to stderr.
        "debug": false,

        // "latest" (default) or an exact @azure/mcp version pin.
        "version": "latest"
      }
    }
  }
}
```

### Recommended presets

The full server exposes a *lot* of tools; these focused bundles work well in
practice. Drop one into `context_servers.azure-mcp.settings`:

**Serverless development** — Functions, their storage, and logs:

```jsonc
{ "namespaces": ["functionapp", "functions", "storage", "monitor"] }
```

**Data work** — databases plus the storage accounts around them:

```jsonc
{ "namespaces": ["cosmos", "sql", "postgres", "storage"] }
```

**Ops / SRE** — health, recommendations, capacity:

```jsonc
{ "namespaces": ["monitor", "resourcehealth", "advisor", "quota"] }
```

**Safe auditing** — read-only governance review; the agent can inspect but
never change anything:

```jsonc
{ "read_only": true, "namespaces": ["advisor", "resourcehealth", "policy"] }
```

## What the agent can do with it

- "List my Azure resource groups" / "What's in resource group X?"
- "Show the app settings of my function app"
- "Query my Log Analytics workspace for errors in the last hour"
- "Create a storage account with LRS in eastus" (requires `read_only: false`)

Deploys still happen through the CLI: the agent runs commands like
`func azure functionapp publish` or `azd deploy` in Zed's terminal — that part
needs the relevant CLI installed.

## Limitations & honesty notes

- Zed extensions cannot add buttons, panels, or palette commands — this is an
  agent-tools integration, not a VS Code-style Azure Tools UI.
- The extension itself runs in Zed's WASM sandbox, but the **spawned Azure MCP
  server is a native process** with the same access as your shell and your
  `az login` identity. `read_only: true` restricts which tools are exposed.
- With no `namespaces` filter the server exposes a very large tool list;
  filtering is recommended for focused work.

## Development

```sh
cargo test                                    # settings → args mapping tests
cargo build --release --target wasm32-wasip1  # the actual extension build
```

In Zed: `zed: install dev extension` → select this repo's directory.

## License

MIT © Hodahel Moinzadeh. Not affiliated with Microsoft. `@azure/mcp` is
Microsoft's package, licensed separately.
