# Turbo Log Snippets (Zed)

A minimum, snippet-only take on [turbo-console-log](https://github.com/Chakroun-Anas/turbo-console-log) for the Zed editor.

## Install (dev extension)

1. Open Zed → Command Palette (`Cmd/Ctrl-Shift-P`) → `zed: extensions`.
2. Click **Install Dev Extension** and select this `turbo-log-snippets` folder.
3. Open any `.js`, `.ts`, `.tsx`, `.py`, or `.php` file and start typing a prefix from the table below, then hit `Tab`.

No build step, no Rust — this is a pure declarative snippets extension (`extension.toml` + JSON snippet files), so nothing needs to be compiled.

## Usage

| Language      | Prefix                          | Inserts                              |
| ------------- | ------------------------------- | ------------------------------------ |
| JS/TS/TSX/JSX | `tlog`                          | `console.log("🚀 ~ value:", value);` |
| JS/TS/TSX/JSX | `terr`                          | `console.error(...)`                 |
| JS/TS/TSX/JSX | `twarn`                         | `console.warn(...)`                  |
| JS/TS/TSX/JSX | `tinfo`                         | `console.info(...)`                  |
| JS/TS/TSX/JSX | `tdebug`                        | `console.debug(...)`                 |
| JS/TS/TSX/JSX | `ttable`                        | `console.table(value);`              |
| Python        | `tprint`                        | `print(f"🚀 ~ {value=}")`            |
| Python        | `tdebug`/`tinfo`/`twarn`/`terr` | matching `logging.*` call            |
| PHP           | `tdump`                         | `var_dump(...)`                      |
| PHP           | `tprint`                        | `print_r(...)`                       |
| PHP           | `terrlog`                       | `error_log(...)`                     |

Type the variable name once at the tab stop — it's linked, so it fills both the label and the value in the same snippet expansion.

## What this does NOT do (unlike the real VS Code extension)

Zed's extension API (as of mid-2026) has no buffer-editing/command API for extensions — only languages, themes, snippets, debuggers, and MCP/context servers. So this snippet-only version can't replicate:

- **AST-aware insertion** — it can't detect the enclosing variable/function/line under your cursor; you type the name yourself at the tab stop.
- **File name / line number context** — Turbo's `🚀 ~ file.ts:42 ~ value:` format needs dynamic buffer info that Zed snippets don't expose.
- **Comment all / Uncomment all / Delete all logs** — these require scanning and rewriting the whole buffer, not just inserting text at the cursor.
- **Dedicated keybindings per command** — snippets trigger by typing the prefix + Tab, not a bound shortcut like `⌘K ⌘L`. You can bind a key to Zed's generic `editor::ExpandSnippet` action if you want, but it's not per-prefix.

There's an open feature request for a real editor-aware extension API in Zed
(`zed-industries/zed` discussions #46272 and #53131) — once/if that ships, a true AST-aware port becomes possible.
