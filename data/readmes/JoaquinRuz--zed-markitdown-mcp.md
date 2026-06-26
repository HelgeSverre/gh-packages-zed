# zed-markitdown-mcp

Give your AI agent a `convert_to_markdown` tool so it can **read PDF, DOCX, XLSX, PPTX, and images** — and read them **cheaply**. Wires up Microsoft's [`markitdown`](https://github.com/microsoft/markitdown) as a [Model Context Protocol](https://modelcontextprotocol.io) (MCP) context server for [Zed](https://zed.dev), with a self-healing health check so you can prove it works.

## What it does

Zed's agent works with text. On its own it can't read binary documents — a PDF or Word file is opaque to it. This registers `markitdown` as an MCP **context server**, which hands the agent a `convert_to_markdown` tool. Point it at a **file path or URL** and it gets back clean Markdown:

- **PDF**, **DOCX**, **XLSX**, **PPTX**
- **images** (PNG / JPG)
- HTML, CSV, JSON, and more

The agent reads documents **by path** — you give it the path, it converts and reads. See [Usage](#usage).

## Why it's worth it: token savings

The point isn't only "the agent can read a PDF" — it's *how cheaply*. When an agent reads a PDF the native way, **each page is sent to the model as extracted text *plus* a rendered image of the page** (~1,500–3,000 tokens per page). `markitdown` extracts **only the text** and skips the image layer entirely.

For a text-heavy PDF that's roughly **10–18× fewer tokens**:

> A 15-page text PDF ≈ **22,000–45,000 tokens** read natively vs. ≈ **2,000–2,500 tokens** via markitdown.

**The trade-off — text only.** Skipping the image layer means you lose the visuals. For **scanned PDFs, charts, diagrams, or layout-heavy pages**, let the agent read natively instead — that's exactly when the page images carry the information.

| Document | Use markitdown | Read it natively |
|---|:---:|:---:|
| Text PDF, reports, contracts, email threads | ✅ big token savings | |
| DOCX / XLSX / PPTX | ✅ clean Markdown + tables | |
| Scanned PDF, charts, diagrams, screenshots | | ✅ needs the image layer |

```
agent ──stdio MCP──▶ uvx markitdown-mcp ──▶ markitdown ──▶ Markdown text
```

## Requirements

- [Zed](https://zed.dev) (or any MCP client — see the note under Install)
- [`uv`](https://docs.astral.sh/uv/), which provides `uvx`:
  ```bash
  curl -LsSf https://astral.sh/uv/install.sh | sh   # macOS / Linux
  ```
  `uv` manages its own Python, so you do **not** need a separate Python 3.10+ install.

## Install

### 1. Warm the cache and verify (do this first)

```bash
./install.sh
```

This locates `uvx`, downloads `markitdown-mcp` once, runs the health check against generated sample files, and prints the exact settings snippet — with the correct **absolute** `uvx` path for your machine.

### 2. Add the context server to Zed

Open your Zed `settings.json` (`cmd`/`ctrl` + `,`) and add a `context_servers` block:

```jsonc
{
  "context_servers": {
    "markitdown": {
      "command": "uvx",
      "args": ["markitdown-mcp"],
      "env": {}
    }
  }
}
```

> **macOS tip:** Zed launched from the Dock doesn't always inherit your shell `PATH`, so a bare `uvx` may be "not found". Use the **absolute** path instead (e.g. `/opt/homebrew/bin/uvx`). `install.sh` prints the right one for you.

Settings location:

| OS | Path |
|----|------|
| macOS / Linux | `~/.config/zed/settings.json` |
| Windows | `%APPDATA%\Zed\settings.json` |

Zed hot-reloads settings; the `markitdown` server should appear in the Agent panel. Restart Zed or open a new agent thread if it doesn't show up.

> **Using Claude Code (or another MCP client)?** `context_servers` only feeds Zed's *native* agent — external agents (e.g. Claude Code via ACP) don't see it. Register the same server with that client instead. For Claude Code:
> ```bash
> claude mcp add markitdown -s user -- uvx markitdown-mcp
> ```

## Usage

1. Get the file's path — in Zed, right-click it in the project tree → **Copy Path** (or use any absolute path / URL).
2. In an **agent** thread, paste the path and ask: *"read this document with markitdown"*.
3. The agent calls `convert_to_markdown` and reads it.

To force the cheap text path on a PDF, say *"use markitdown"*. For a scanned or visual PDF, ask the agent to read it natively instead.

> **This is path-based, not drag-and-drop.** Dropping a binary into Zed's chat won't attach it — Zed's chat only accepts text, so it rejects PDFs/DOCX with *"Binary files are not supported"*. That's a Zed limitation this tool doesn't change; the workflow is to give the agent the **path** and let it convert.

## Verify

Re-run the health check any time:

```bash
python3 verify_markitdown_mcp.py                     # self-test (auto-generated samples)
python3 verify_markitdown_mcp.py mydoc.pdf file.docx # test your own files
```

`RESULT: PASS` means the MCP server is healthy and actually converts files. What the checker does:

- drives the full MCP stdio handshake (`initialize` → `tools/list` → `tools/call`),
- actually converts files and asserts non-empty Markdown comes back,
- with no arguments, generates a throwaway sample PDF and DOCX (no third-party deps, no personal data),
- retries the whole sweep with backoff if it fails because of a **transient network** hiccup.

## Troubleshooting

| Symptom | Cause / fix |
|---------|-------------|
| Server shows as errored | Almost always `PATH`. Use the absolute `uvx` path in your config. |
| First launch is slow | First run downloads packages (once). Later launches use the `uv` cache. |
| `uvx: command not found` | Install `uv` (see Requirements) and reopen the client. |
| Health check fails with a network error | The script auto-retries; if it persists, check connectivity to `pypi.org`. |
| Agent reads a PDF "the expensive way" | It won't auto-prefer markitdown — tell it *"use markitdown"* to force the text path. |

## Credits

- [microsoft/markitdown](https://github.com/microsoft/markitdown) — the conversion engine and the `markitdown-mcp` server.
- [Model Context Protocol](https://modelcontextprotocol.io)
- [Zed](https://zed.dev)

## License

MIT — see [LICENSE](LICENSE).
