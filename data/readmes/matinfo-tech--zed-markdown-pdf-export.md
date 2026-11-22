# Markdown PDF Export for Zed

[![CI](https://github.com/matinfo-tech/zed-markdown-pdf-export/actions/workflows/ci.yml/badge.svg)](https://github.com/matinfo-tech/zed-markdown-pdf-export/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/markdown-pdf-export?label=markdown-pdf-export)](https://www.npmjs.com/package/markdown-pdf-export)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Export Markdown to PDF from Zed's Agent, with your header, footer, page numbers and logo.

This extension adds the [markdown-pdf-export](https://markdown-pdf.matinfo.tech) MCP server to
Zed. Install it and ask the Agent:

> Export this file to PDF.

## Features

- **No setup.** Zed downloads the exporter from npm, keeps it up to date and runs it with its own
  Node. No terminal, no Node install, no `settings.json` editing.
- **Real page design.** Page styles, fonts, headers and footers with page numbers, logos, table of
  contents, maths (KaTeX) and code highlighting.
- **Studio.** Ask the Agent to *open Studio* to design your pages with a live PDF preview.
- **One settings file** shared with the command line and the other editors (VS Code, Cursor,
  Claude...). Design once, same PDFs everywhere.
- **Local export.** The exporter runs on your computer and sends nothing anywhere; the PDF is drawn
  by your own Chrome or Edge. (What the Agent shares with its AI provider is up to your Zed setup.)

## Requirements

- Zed with the **Agent** set up with an AI provider. The extension adds tools for the Agent; it does
  not add a menu item or a keyboard shortcut (Zed extensions cannot), so without the Agent there is
  nothing to call them. Without an AI provider, use the
  [keyboard shortcut](#keyboard-shortcut-no-ai-needed) instead.
- Google Chrome or Microsoft Edge. If neither is installed, ask the Agent to install the PDF
  browser: it downloads Chromium once (about 200 MB).

## Install

> **Not in the Zed extension list yet.** Zed has paused new MCP server extensions while it moves to
> the [official MCP registry](https://registry.modelcontextprotocol.io/)
> ([zed-industries/zed#59351](https://github.com/zed-industries/zed/issues/59351)). The server is
> already there as `io.github.matinfo-tech/markdown-pdf-export`. Until Zed lists it, use one of the
> two ways below.

**As a dev extension** (needs [Rust](https://rustup.rs); Zed builds it for you):

1. `git clone https://github.com/matinfo-tech/zed-markdown-pdf-export`
2. In Zed, open the Command Palette and run `zed: install dev extension`, then choose the folder.
3. Check **Settings → AI → MCP Servers**: the `markdown-pdf` dot turns green after the first start
   (the first one takes a few seconds while Zed downloads the exporter).

**Without the extension** (needs [Node.js](https://nodejs.org) 20 or later): run
`npx -y markdown-pdf-export setup zed`. It adds the Agent tools, an export task and a keyboard
shortcut to your Zed files. See [the Zed instructions](https://markdown-pdf.matinfo.tech/editors).

Already added the server by hand (a `context_servers.markdown-pdf` entry with a `command`)? Remove
that entry before installing the extension, or it keeps replacing the extension's server.

## Use

Ask the Agent in plain words. Examples:

```text
Export this file to PDF.
Export docs/guide.md to PDF in landscape on Letter paper, with a table of contents.
Export report.md with "Page {page} of {pages}" in the footer.
Open Studio so I can design my pages.
Open Studio with report.md as the preview, for this project only.
Install the PDF browser.
Run the Markdown PDF doctor.
```

| Tool | What it does |
|---|---|
| `export_markdown_pdf` | Exports one Markdown file to PDF. Any setting can be changed for one export. |
| `open_studio_markdown_pdf` | Opens Studio in your browser. Saved choices apply to the next export. |
| `install_browser_markdown_pdf` | Downloads Chromium when no Chrome or Edge is found. Asks first. |
| `doctor_markdown_pdf` | Reports the browser in use and the settings files loaded. |

Zed asks before the Agent runs a tool, unless you allowed it in `agent.tool_permissions`.

## Keyboard shortcut (no AI needed)

A Zed extension cannot add a command or a key, but the exporter's own setup can. With
[Node.js](https://nodejs.org) 20 or later installed, run this once in a terminal:

```sh
npx -y markdown-pdf-export setup zed
```

Then, in a Markdown file, press **⌘K ⌘E** on a Mac or **Ctrl+K Ctrl+E** on Windows and Linux to
export it to PDF. The same export is in the Command Palette: `task: spawn` → *Markdown: Export to
PDF*.

Setup adds one task to `tasks.json` and one key to `keymap.json`, leaves everything else in those
files as it was (comments included) and keeps a copy of each as `<file>.markdown-pdf.bak`. With this
extension installed it does not touch `settings.json`: the extension already provides the Agent
tools. Needs markdown-pdf-export 2.3.0 or later.

## Settings

Page design (look, fonts, header, footer, logo, paper size...) lives in the markdown-pdf-export
settings file, not in Zed. The easiest way to edit it is Studio. The file is:

- macOS and Linux: `~/.config/markdown-pdf-export/settings.json`
- Windows: `%APPDATA%\markdown-pdf-export\settings.json`

A `.markdown-pdf.json` file in a project folder changes the settings for the documents in that
folder only. See [the settings reference](https://markdown-pdf.matinfo.tech/advanced/settings-file).

The extension itself has three optional settings. Set them in **Settings → AI → MCP Servers →
markdown-pdf → Configure**, which writes them to Zed's `settings.json`:

```json
{
  "context_servers": {
    "markdown-pdf": {
      "settings": {
        "browser": "msedge"
      }
    }
  }
}
```

| Setting | Value |
|---|---|
| `browser` | `chrome`, `msedge`, `chromium`, a preview channel such as `chrome-beta`, or the full path to a browser program. Default: Chrome, then Edge, then the downloaded Chromium. |
| `settings_file` | Full path to another settings file, used instead of the shared one. Studio always edits the shared file. |
| `debug` | `true` writes a log to `markdown-pdf-debug.log` in the temp folder. |

## Troubleshooting

- **The server dot stays red.** Open the log with `zed: open log` and look for `markdown-pdf`. The
  first start needs internet access to download the exporter from npm.
- **"No usable Chrome/Chromium browser found".** Ask the Agent to install the PDF browser, or set
  `browser` to the path of a Chromium-based browser.
- **Studio changes do not show up.** Check that `settings_file` is empty: when it is set, the server
  reads that file and not the one Studio edits.
- More help: <https://markdown-pdf.matinfo.tech/help>.

## How it works

The extension is a small WebAssembly module. When Zed starts the `markdown-pdf` context server, it:

1. installs or updates the [`markdown-pdf-export`](https://www.npmjs.com/package/markdown-pdf-export)
   npm package in the extension's folder (version 2.2.0 or later; an installed copy is used when
   offline);
2. runs `cli.mjs mcp` from that package with Zed's Node;
3. passes the settings above as `MARKDOWN_PDF_BROWSER`, `MARKDOWN_PDF_SETTINGS` and
   `MARKDOWN_PDF_DEBUG`.

All the exporting is done by the npm package; its code and issue tracker are at
[matinfo-tech/markdown-pdf-export](https://github.com/matinfo-tech/markdown-pdf-export).

## Development

Requirements: [Rust](https://rustup.rs) with the `wasm32-wasip2` target.

```sh
rustup target add wasm32-wasip2
cargo test                                         # unit tests (native)
cargo clippy --target wasm32-wasip2 -- -D warnings
cargo build --release --target wasm32-wasip2
```

To try it in Zed: Command Palette → `zed: install dev extension` → choose this folder. After a
change, click **Rebuild** on the extension in `zed: extensions`.

## License

[MIT](LICENSE)
