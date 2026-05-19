# Zed Salesforce Extension

Apex, SOQL, SOSL, and Salesforce Log support for [Zed](https://zed.dev) via the [Apex Language Server](https://github.com/forcedotcom/salesforcedx-vscode) (`apex-jorje-lsp`).

The LSP JAR is downloaded automatically from the latest `salesforcedx-vscode` GitHub release on first launch.

## Prerequisites

- **Java 11+** — available via `JAVA_HOME`, `JDK_HOME`, or `PATH`
- **[Salesforce CLI](https://developer.salesforce.com/tools/salesforcecli)** (`sf`) — for org authentication and SObject stub generation

## Zed Settings

Configure the LSP under the `apex-lsp` key in your Zed settings:

```json
{
  "lsp": {
    "apex-lsp": {
      "settings": {
        "java_home": "/path/to/java/home",
        "javaMemory": 4096,
        "enableSemanticErrors": false,
        "enableEmbeddedSoqlCompletion": true,
        "logLevel": "ERROR"
      }
    }
  }
}
```

### Settings Reference

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `java_home` | string | — | Path to Java installation (falls back to `JAVA_HOME`/`JDK_HOME`/`PATH`) |
| `javaMemory` | number | — | Max JVM heap size in MB (e.g. `4096` for `-Xmx4096M`) |
| `logLevel` | string | `"ERROR"` | LSP log level (`ERROR`, `WARN`, `INFO`, `DEBUG`, `TRACE`) |
| `enableSemanticErrors` | bool | `false` | Report semantic errors in Apex code |
| `enableEmbeddedSoqlCompletion` | bool | `true` | Inline SOQL completion support |
| `enableSynchronizedInitJobs` | bool | `true` | Synchronize LSP initialization jobs |
| `enableCompletionStatistics` | bool | `false` | Emit completion statistics for debugging |
| `traceProtocol` | bool | `false` | Log LSP protocol messages |

## Project Setup

Your workspace root needs a `sfdx-project.json`:

```json
{
  "packageDirectories": [
    { "path": "force-app", "default": true }
  ],
  "namespace": "",
  "sfdcLoginUrl": "https://login.salesforce.com",
  "sourceApiVersion": "62.0"
}
```

`sfdcLoginUrl` is the default login URL used when authenticating without `--instance-url`. Set it to whichever org you use most.

## Multiple Environments

Environment management is handled by the Salesforce CLI, not the project file. Authenticate each org with an alias:

```sh
sf org login web --alias dev --instance-url https://your-dev-instance.salesforce.com
sf org login web --alias stage --instance-url https://your-stage-instance.salesforce.com
sf org login web --alias prod --instance-url https://login.salesforce.com
```

Set your default target org:

```sh
sf config set target-org dev
```

Then pass `--target-org` to any command to target a specific environment:

```sh
sf project deploy start --target-org stage
sf project deploy start --target-org prod
```

## Custom SObject Support

The Apex LSP knows standard SObjects (`Account`, `Contact`, etc.) out of the box. Custom objects (`__c`), platform events (`__e`), big objects (`__b`), and custom metadata types (`__mdt`) require generated type stubs.

### Generating SObject Stubs

This extension provides a `/sf-generate-sobjects` slash command in the Assistant panel that generates the faux Apex class stubs the LSP needs.

1. Open the **Assistant panel**
2. Type `/sf-generate-sobjects` and select your org alias from the completions
3. Select a scope: `custom` (default), `standard`, or `all`
4. The command fetches object metadata from your org's REST API and writes `.cls` stubs to `.sf/tools/sobjects/`
5. Restart the Apex Language Server to pick up the new types

The stubs are org-specific and generated — add `.sf/` to your `.gitignore`.

### What it does

The slash command:

1. Runs `sf org display` to get your org's access token and instance URL
2. Calls the Salesforce REST API to list and describe SObjects
3. Generates faux Apex class files matching the format the LSP expects
4. Writes them to `.sf/tools/sobjects/customObjects/` or `standardObjects/`

Re-run this whenever custom objects or fields change in your org.