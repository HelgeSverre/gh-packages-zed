# Code Runner MCP Server for Zed

A [Zed](https://zed.dev/) extension that provides code execution capabilities through the [Code Runner MCP Server](https://github.com/formulahendry/mcp-server-code-runner).

This extension wraps the `mcp-server-code-runner` npm package, making its `run-code` tool available in Zed's Agent Panel.

## Features

Run code snippets in **30+ programming languages** directly from Zed's Agent Panel:

JavaScript, TypeScript, Python, Go, Ruby, PHP, Perl, Shell/Bash, PowerShell, Java, C#, F#, Lua, Groovy, Scala, Swift, Julia, Crystal, OCaml, R, Clojure, Racket, Scheme, Haskell, Dart, Kotlin, and more.

## Installation

Install from: **Zed** > **Extensions** > Search "Code Runner MCP Server".

Or install as a dev extension for development:

```bash
git clone https://github.com/formulahendry/zed-code-runner-mcp-server.git
cd zed-code-runner-mcp-server
# In Zed: Extensions → Install Dev Extension → Select this directory
```

## Prerequisites

- Ensure the interpreter or compiler for any language you want to run is installed and available in your `PATH`.

## Usage

Once enabled, the `run-code` tool is available in Zed's Agent Panel. Try prompts like:

- "Run the JavaScript code: console.log(5+6)"
- "How many CPUs do I have? Use run-code tool"
- "Run this Python snippet: print('Hello from Zed!')"

## License

MIT
