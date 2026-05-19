# Kubernetes MCP Server Extension for Zed

This extension integrates [Kubernetes MCP Server](https://github.com/containers/kubernetes-mcp-server) as a context server for
[Zed](https://zed.dev)'s [Agent Panel](https://zed.dev/docs/ai/overview).

To install navigate to: **Zed** > **Extensions**. Or use the command palette to search `extensions`.

In order for the server to work, you need to point it to the **absolute** path of your Kubernetes configuration file:

```jsonc
"context_servers": {
  "mcp-server-kubernetes": {
    "source": "extension",
    "settings": {
      "kubeconfig": "/absolute/path/to/kubeconfig"
    }
  }
}
```

The complete set of possible configuration options and their default values look like this:

```jsonc
"context_servers": {
  "mcp-server-kubernetes": {
    "source": "extension",
    "settings": {
      /// Absolute path to the Kubernetes configuration file.
      "kubeconfig": "/absolute/path/to/kubeconfig",
      /// Output format for resource list operations (one of: yaml, table) (default "table").
      "list_output": "table",
      /// If set, the MCP server will run in read-only mode, meaning it will not allow any write operations (create, update, delete) on the Kubernetes cluster. This is useful for debugging or inspecting the cluster without making changes.
      "read_only": false,
      /// If set, the MCP server will disable all destructive operations (delete, update, etc.) on the Kubernetes cluster. This is useful for debugging or inspecting the cluster without accidentally making changes. This option has no effect when `read_only` is set.
      "disable_destructive": false,
      /// List of toolsets to enable. Check [🛠️ Tools and Functionalities](https://github.com/containers/kubernetes-mcp-server?tab=readme-ov-file#%EF%B8%8F-tools-and-functionalities-) for more information.
      "toolsets": ["config", "core", "helm"],
      /// If set, the MCP server will disable multi-cluster support and will only use the current context from the kubeconfig file. This is useful if you want to restrict the MCP server to a single cluster.
      "disable_multi_cluster": false
    }
  }
}
```
