# Duso Extension for Zed

A comprehensive Zed editor extension for the [Duso](https://duso.rocks) programming language - Scripted Intelligence for AI agents and automation.

## Features

### Syntax Highlighting
- Full support for Duso 1.6.21 language syntax
- Keywords: `if/then/else/elseif/end`, `while`, `for`, `function`, `return`, `try/catch`
- 80+ built-in functions including parallel, spawn, fetch, datastore, image processing, cryptography, and more
- String templates with `{{ expr }}` syntax
- Comments: `//` line and `/* */` block comments
- Regular expressions with `~ pattern ~` syntax

### Language Server Protocol (LSP)
- Real-time language features
- Error checking and diagnostics
- Auto-completion
- Code navigation
- Hover information
- Document symbols and outline

### Code Snippet
- Quick insertion of common patterns
- Functions, loops, conditionals
- Parallel execution blocks
- Try/catch error handling
- Module imports and Claude integration

### Smart Editing
- Auto-closing brackets
- Proper indentation for code blocks
- Bracket matching
- Code outline

## Installation

### From Zed Extensions
1. Open Zed
2. Go to Extensions
3. Search for "duso"
4. Click Install

### From Source
```bash
cd ~/.zed/extensions
git clone https://github.com/duso-org/duso-zed.git
```

## Requirements

- **Duso** must be installed on your system. Get it from:
  - [Duso Homepage](https://duso.rocks): Download and install binary
  - [Homebrew](https://brew.sh): `brew tap duso-org/homebrew-duso && brew install duso`
  - [GitHub Releases](https://github.com/duso-org/duso/releases)

The extension uses Duso's built-in LSP server (`duso -lsp`) for all language features.

## Configuration

The extension works out of the box with no configuration needed. It automatically:
- Recognizes `.du` files as Duso scripts
- Launches the LSP server when needed
- Applies syntax highlighting and smart indentation

## Getting Started

1. Create a `.du` file:
```bash
touch hello.du
```

2. Write some Duso:
```duso
// Your first Duso script
print("Hello, Duso!")

// Use snippets for quick coding
// Type 'fn' and press Tab to create a function
```

3. Open the file in Zed - syntax highlighting and LSP features are automatically enabled.

## Snippets

| Trigger | Expansion |
|---------|-----------|
| `fn` | function declaration |
| `if` | if statement |
| `ifelse` | if/else statement |
| `for` | for loop (range) |
| `forin` | for-in loop (iteration) |
| `while` | while loop |
| `try` | try/catch block |
| `parallel` | parallel execution block |
| `spawn` | spawn process |
| `require` | module import |
| `fetch` | HTTP fetch |

## Commands

The extension provides access to Duso's built-in documentation:
- Right-click on any function name
- Hover for information via LSP
- Check the Duso documentation: `duso -doc` or `duso -docserver`

## Learn Duso

- **Official Docs**: `duso -read` (guides and reference)
- **Examples**: `duso -read examples/`
- **Reference**: `duso -doc` (built-in function reference)
- **Website**: [duso.rocks](https://duso.rocks)

## Troubleshooting

### "Duso not found" error
Make sure Duso is installed and available in your PATH:
```bash
which duso
duso -version
```

### Syntax highlighting not working
- Verify the file has a `.du` extension
- Check that the Duso extension is enabled in Zed
- Reload Zed (Cmd+Shift+P → "Revert to auto-saved copy" or restart)

### LSP not responding
- Check that Duso LSP works: `duso -lsp` (should start without errors, press Ctrl+C to stop)
- Check Zed logs: View → Toggle Developer Console

## Contributing

We'd love your contributions!

## Related Projects

- [Duso Language](https://github.com/duso-org/duso) - The main Duso repository

## License

Copyright 2026 Ludonode LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
