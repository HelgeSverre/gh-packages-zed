# Qdrant MCP for Zed

A Zed extension to access Qdrant vector database directly in Zed using the Model Context Protocol (MCP). Works with any OpenAI-compatible embedding server (llama.cpp, Ollama, vLLM, LM Studio, and more).

## Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [Compatible Embedding Servers](#compatible-embedding-servers)
- [Recommended Embedding Models](#recommended-embedding-models)
- [Available Tools](#available-tools)
- [Installing Extensions](#installing-extensions)
- [Installation Location](#installation-location)
- [Development](docs/DEVELOPMENT.md)
- [Resources](#resources)

## Prerequisites

### Qdrant

You need a running Qdrant instance. Options:

**Qdrant Cloud (recommended for production)**
1. Sign up at https://cloud.qdrant.io
2. Create a cluster
3. Copy URL and API key to settings (default port is added automatically: `:6334` for gRPC, `:6333` for REST)

**Local Qdrant with Docker**
```bash
# Quick start (data lost when container stops)
docker run -p 6333:6333 -p 6334:6334 qdrant/qdrant

# With persistent storage (recommended)
docker run -d --name qdrant \
  -p 6333:6333 -p 6334:6334 \
  -v qdrant_storage:/qdrant/storage \
  --restart unless-stopped \
  qdrant/qdrant
```

Manage the container:
```bash
docker stop qdrant    # stop
docker start qdrant   # start again (data persists)
docker logs qdrant    # view logs
```

**Local Qdrant binary on macOS (no Docker)**

Download the latest binary from [Qdrant releases](https://github.com/qdrant/qdrant/releases/latest):
- Apple Silicon (M1/M2/M3/M4): `qdrant-aarch64-apple-darwin.tar.gz`
- Intel: `qdrant-x86_64-apple-darwin.tar.gz`

```bash
# Extract and run
tar -xzf qdrant-*.tar.gz
./qdrant
```

Qdrant will start on the default ports (`6333` HTTP, `6334` gRPC).

### Embedding Server

You need any server that exposes an OpenAI-compatible `/v1/embeddings` endpoint. See [Compatible Embedding Servers](#compatible-embedding-servers) for options.

## Quick Start

1. Start Qdrant (cloud or local)
2. Start an embedding server (see [Compatible Embedding Servers](#compatible-embedding-servers))
3. Install this extension in Zed (see [Installing Extensions](#installing-extensions))
4. Add settings to `~/.config/zed/settings.json`:
   ```json
   {
     "context_servers": {
       "mcp-server-qdrant": {
         "settings": {
           "embedding_server_url": "http://localhost:8080",
           "embedding_model": "snowflake-arctic-embed2"
         }
       }
     }
   }
   ```
5. Use `qdrant-store` to save text and `qdrant-find` to search semantically

## Configuration

Configure in `~/.config/zed/settings.json`:

```json
{
  "context_servers": {
    "mcp-server-qdrant": {
      "settings": {
        "qdrant_url": "https://xxx.cloud.qdrant.io",
        "qdrant_api_key": "your-api-key",
        "collection_name": "zed_collection",
        "embedding_server_url": "http://localhost:8080",
        "embedding_api_key": "",
        "embedding_model": "snowflake-arctic-embed2",
        "transport_protocol": "grpc",
        "enabled_tool_groups": "core"
      }
    }
  }
}
```

| Setting | Default | Description |
|---------|---------|-------------|
| `qdrant_url` | — | Qdrant server URL |
| `qdrant_api_key` | — | API key for Qdrant Cloud |
| `collection_name` | — | Vector collection name (created automatically) |
| `embedding_server_url` | — | URL of any OpenAI-compatible embedding server |
| `embedding_api_key` | — | Optional API key for the embedding server |
| `embedding_model` | — | Model name passed to the embedding server |
| `transport_protocol` | `grpc` | Transport protocol: `"grpc"` (port 6334) or `"rest"` (port 6333) |
| `enabled_tool_groups` | `core` | Comma-separated list of tool groups to enable (see [Tool Groups](#tool-groups)) |

### Transport Protocol

The extension supports both gRPC and REST for communicating with Qdrant:

- **gRPC** (default) — Binary protocol, better performance for large data. Uses port `6334`.
- **REST** — JSON-based, easier to debug. Uses port `6333`.

When running Qdrant locally with Docker, expose both ports to allow switching:
```bash
docker run -p 6333:6333 -p 6334:6334 qdrant/qdrant
```

Set `"transport_protocol": "rest"` in your settings to use REST. The correct default port is applied automatically when `qdrant_url` doesn't specify one.

## Compatible Embedding Servers

Any server that exposes an OpenAI-compatible `/v1/embeddings` endpoint will work. Configure `embedding_server_url` and `embedding_model` accordingly.

| Server | Default URL | Example `embedding_model` | Start Command |
|--------|-------------|--------------------------|---------------|
| [llama.cpp](https://github.com/ggml-org/llama.cpp) | `http://localhost:8080` | `snowflake-arctic-embed2` | `llama-server -m model.gguf --embeddings --port 8080` |
| [Ollama](https://ollama.com) | `http://localhost:11434` | `nomic-embed-text` | `ollama serve` (then `ollama pull nomic-embed-text`) |
| [vLLM](https://github.com/vllm-project/vllm) | `http://localhost:8000` | `BAAI/bge-m3` | `vllm serve BAAI/bge-m3` |
| [LM Studio](https://lmstudio.ai) | `http://localhost:1234` | `nomic-embed-text` | Start server from LM Studio UI |
| [LocalAI](https://localai.io) | `http://localhost:8080` | `bert-cpp-minilm-v6` | `local-ai run bert-cpp-minilm-v6` |

## Recommended Embedding Models

| Model | Dimensions | Max Tokens | Best For |
|-------|-----------|------------|----------|
| [snowflake-arctic-embed2](https://huggingface.co/Snowflake/snowflake-arctic-embed-m-v2.0) | 768 | 8192 | General-purpose, multilingual retrieval |
| [nomic-embed-text v2](https://huggingface.co/nomic-ai/nomic-embed-text-v2-moe) | 768 | 8192 | Multilingual, MoE architecture |
| [nomic-embed-text v1.5](https://huggingface.co/nomic-ai/nomic-embed-text-v1.5-GGUF) | 768 | 8192 | Lightweight, GGUF-ready |
| [BAAI/bge-m3](https://huggingface.co/BAAI/bge-m3) | 1024 | 8192 | Multilingual, dense + sparse retrieval |
| [mxbai-embed-large](https://huggingface.co/mixedbread-ai/mxbai-embed-large-v1) | 1024 | 512 | High accuracy, English-focused |
| [jina-embeddings-v4](https://huggingface.co/jinaai/jina-embeddings-v4) | 2048 | 8192 | Multimodal (text + images) |

## Tool Groups

Tools are organized into groups to reduce context window usage. By default, only the **core** group is enabled (~450 tokens). Enabling all 27 tools consumes ~5,500 tokens of context.

| Group | Tools | Description |
|-------|-------|-------------|
| `core` | 3 | Semantic store, find, and list collections (default) |
| `collections` | 5 | Create, delete, info, exists, update collections |
| `points` | 5 | Upsert, get, delete, count, scroll points |
| `search` | 6 | Vector search, recommend, query, batch, groups, discover |
| `payload` | 4 | Set/delete payload, create/delete indexes |
| `admin` | 4 | Aliases and snapshots |

Enable groups in your settings with a comma-separated list:

```json
{
  "context_servers": {
    "mcp-server-qdrant": {
      "settings": {
        "enabled_tool_groups": "core,collections,search"
      }
    }
  }
}
```

Use `"all"` to enable every group:
```json
"enabled_tool_groups": "all"
```

## Available Tools

### Semantic Operations
- `qdrant-store` - Store text with automatically generated embeddings
- `qdrant-find` - Search for semantically similar texts

<details>
<summary><strong>Collection Management</strong> (6 tools)</summary>

- `qdrant-list-collections` - List all collections
- `qdrant-create-collection` - Create a new vector collection
- `qdrant-delete-collection` - Delete a collection
- `qdrant-get-collection-info` - Get collection details
- `qdrant-update-collection` - Update collection parameters (HNSW, optimizer, etc.)
- `qdrant-collection-exists` - Check if a collection exists

</details>

<details>
<summary><strong>Point Operations</strong> (5 tools)</summary>

- `qdrant-upsert-points` - Insert or update points with vectors and payloads
- `qdrant-get-points` - Retrieve points by ID
- `qdrant-delete-points` - Delete points by ID or filter
- `qdrant-count-points` - Count points in a collection
- `qdrant-scroll-points` - Paginate through points

</details>

<details>
<summary><strong>Search & Query</strong> (6 tools)</summary>

- `qdrant-search` - Raw vector similarity search
- `qdrant-recommend` - Find similar points by example IDs (no vector needed)
- `qdrant-query` - Universal query endpoint (fusion, re-ranking, nested prefetch)
- `qdrant-search-batch` - Execute multiple searches in one request
- `qdrant-search-groups` - Search with results grouped by a payload field
- `qdrant-discover` - Context-based exploration with positive/negative pairs

</details>

<details>
<summary><strong>Payload & Index Management</strong> (4 tools)</summary>

- `qdrant-set-payload` - Set or update payload fields on existing points
- `qdrant-delete-payload` - Delete specific payload keys from points
- `qdrant-create-index` - Create a payload field index for faster filtered searches
- `qdrant-delete-index` - Delete a payload field index

</details>

<details>
<summary><strong>Aliases</strong> (2 tools)</summary>

- `qdrant-list-aliases` - List all aliases or aliases for a specific collection
- `qdrant-update-aliases` - Create, rename, or delete collection aliases

</details>

<details>
<summary><strong>Snapshots</strong> (2 tools)</summary>

- `qdrant-list-snapshots` - List snapshots for a collection
- `qdrant-create-snapshot` - Create a snapshot for backup

</details>

## Installing Extensions

You can search for extensions by launching the Zed Extension Gallery by pressing cmd-shift-x, opening the command palette and selecting zed: extensions, or by selecting "Zed > Extensions" from the menu bar.

Here you can view the extensions that you currently have installed or search and install new ones.

## Installation Location

- On macOS, extensions are installed in ~/Library/Application Support/Zed/extensions.
- On Linux, they are installed in either $XDG_DATA_HOME/zed/extensions or ~/.local/share/zed/extensions.
- On Windows, the directory is %LOCALAPPDATA%\Zed\extensions.

This directory contains two subdirectories:

- installed, which contains the source code for each extension.
- work, which contains files created by the extension itself, such as downloaded language servers.

## Development

See [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) for build instructions, test setup, and dependency management.

## Resources

### Repository

- [Qdrant MCP Server Extension for Zed Repository on GitHub](https://github.com/hansdoebel/zed-mcp-qdrant)

### Zed

- [Zed Docs – Installing Extensions](https://zed.dev/docs/extensions/installing-extensions)
- [Zed Docs – Developing Extensions](https://zed.dev/docs/extensions/developing-extensions)
- [Zed Docs – MCP Server Extensions](https://zed.dev/docs/extensions/mcp-extensions)
- [Zed Docs – Model Context Protocol (MCP)](https://zed.dev/docs/ai/mcp)
- [Zed Industries/Extensions GitHub Repository](https://github.com/zed-industries/extensions)

### Qdrant

- [Qdrant API Reference](https://api.qdrant.tech/api-reference)
- [Qdrant API & SDK documentation](https://qdrant.tech/documentation/interfaces/)
- [Qdrant Rust client on GitHub](https://github.com/qdrant/rust-client)
- [Qdrant Open API definition on GitHub](https://github.com/qdrant/qdrant/blob/master/docs/redoc/master/openapi.json)
- [Qdrant protobuf definition on GitHub](https://github.com/qdrant/qdrant/tree/master/lib/api/src/grpc/proto)
- [Official Qdrant Model Context Protocol (MCP) server implementation](https://github.com/qdrant/mcp-server-qdrant)
- [qdrant-tech profile on npmjs](https://www.npmjs.com/~qdrant-tech)
- [Qdrant JavaScript SDK (REST + gRPC)](https://www.npmjs.com/package/@qdrant/qdrant-js)

### Embedding Servers

- [llama.cpp on GitHub](https://github.com/ggml-org/llama.cpp)
- [llama.cpp server documentation](https://github.com/ggml-org/llama.cpp/blob/master/tools/server/README.md)
- [Ollama](https://ollama.com)
- [vLLM](https://github.com/vllm-project/vllm)
- [LM Studio](https://lmstudio.ai)
- [LocalAI](https://localai.io)
