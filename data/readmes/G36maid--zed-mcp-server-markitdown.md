# MarkItDown MCP Server for Zed

> [!WARNING]  
> **Python 3.14+ / Arch-based Users:** If you encounter installation timeouts or `onnxruntime` dependency conflicts, please read the [🛠️ Python 3.14+ Quick Fix](#️-python-314-quick-fix) section below before installation.

This extension integrates [MarkItDown](https://github.com/microsoft/markitdown) as a Model Context Protocol (MCP) Server for for Zed's Assistant.

for upstream information, check [MarkItDown-MCP](https://github.com/microsoft/markitdown/tree/main/packages/markitdown-mcp)

## What This Extension Does

**Turn any Documents into AI Context** - Upload or reference any file, and this extension converts it to clean Markdown that AI can understand and work with without Multimodality.

### Supported File Types

It exposes one tool: `convert_to_markdown(uri)`, where uri can be any `http:`, `https:`, `file:`, or `data:` URI.

| Category | Formats | AI Use Cases |
|----------|---------|-------------|
| **Documents** | PDF, Word (.docx), Excel (.xlsx), PowerPoint (.pptx) | Analyze reports, summarize presentations, extract data |
| **Images** | JPG, PNG, GIF (with OCR) | Read text from screenshots, analyze charts, describe images |
| **Audio** | MP3, WAV (with transcription) | Transcribe meetings, analyze speech content |
| **Web** | HTTP/HTTPS URLs | Summarize articles, extract key information |
| **Data** | CSV, JSON, XML | Process structured data, generate insights |
| **Archives** | ZIP files | Analyze multiple files at once |

## Quick Start

### Installation (dev)

```bash
# Clone the repo
git clone [https://github.com/G36maid/zed-mcp-server-markitdown.git](https://github.com/G36maid/zed-mcp-server-markitdown.git)
cd zed-mcp-server-markitdown

# Build the extension
cargo build --release

# Add as a dev extension in Zed:
# In Zed, go to Extensions → Install Dev Extension → Select this directory
````

### Usage Examples

**Convert a PDF report:**

```
Please analyze this PDF report and summarize the key findings.
```

**Extract data from a spreadsheet:**

```
Convert this Excel file to markdown and show me the top 5 entries.
```

**Analyze a webpage:**

```
Summarize the main points from this article form link in README.
```

## Configuration

### Optional Settings

Access through Zed's settings or the Assistant configuration UI:

```json
{
  "context_servers": {
    "mcp-server-markitdown": {
      "settings": {
        "package_version": "latest"
      }
    }
  }
}
```

  - **`package_version`**: Specify npm package version (default: "latest")

### Prerequisites

  - **Node.js and npm** (automatically handled by Zed)
  - **Rust** (automatically handled by Zed)
  - **Internet connection** (for initial package installation and web calls)

### Local Development

```bash
# Clone the repo
git clone [https://github.com/G36maid/zed-mcp-server-markitdown.git](https://github.com/G36maid/zed-mcp-server-markitdown.git)
cd zed-mcp-server-markitdown

# Build the extension
cargo build --release

# Add as a dev extension in Zed:
# In Zed, go to Extensions → Install Dev Extension → Select this directory
```
## 🛠️ Python 3.14+ Quick Fix

If you encounter installation timeouts or dependency conflicts on Arch Linux or other systems that have updated to Python 3.14, it's recommended to configure **uvx** directly in Zed's `settings.json`. This uses an isolated Python 3.13 environment, bypassing upstream compatibility issues.

### 1. Prerequisites

Ensure [uv](https://astral.sh/uv/) is installed on your system.

### 2. Configure Zed

Open `settings.json` in Zed (Command Palette: type `settings`) and add the following configuration:

```json
{
  "context_servers": {
    "markitdown": {
      "command": "uvx",
      "args": [
        "--python",
        "3.13",
        "markitdown-mcp"
      ]
    }
  }
}
```

### 3. Warm Up the Environment (Important)

Since the first startup downloads Python 3.13 and related AI models (like Magika), it may exceed Zed's 60-second startup limit. Run it once in your terminal to ensure caching is complete:

```bash
uvx --python 3.13 markitdown-mcp
```

When you see `Connected to markitdown-mcp` or a similar startup success message, press `Ctrl+C` to stop it. Then reload Zed and it will work normally.

#### Benefits:

* **No Node.js needed**: Directly calls Python packages from Rust-written `uv`, shorter path.
* **Environment isolation**: `uvx` automatically handles the environment without messing up your system path.
* **Explicit version management**: Forces runtime environment with `--python 3.13`, perfectly resolving `onnxruntime` being stuck on 3.14.


-----

## Related Projects

  - **[Microsoft MarkItDown](https://github.com/microsoft/markitdown)** - The core conversion tool (Python)
  - **[MarkItDown MCP](https://github.com/microsoft/markitdown/tree/main/packages/markitdown-mcp)** - Official MCP server
  - **[markitdown-mcp-npx](https://www.npmjs.com/package/markitdown-mcp-npx)** - NPX wrapper used by this extension
  - **[Context7 MCP](https://github.com/akbxr/zed-mcp-server-context7)** - Similar Zed MCP extension example

## License

MIT License - see [LICENSE](https://www.google.com/search?q=LICENSE) file for details.

## Acknowledgments

  - **Microsoft AutoGen Team** for creating MarkItDown
  - **Zed Industries** for the excellent extension platform
  - **xkiranj** for create the npx wrapper for MarkItDown MCP

-----

**Transform your documents into AI-ready context with MarkItDown MCP Server for Zed.**

```
