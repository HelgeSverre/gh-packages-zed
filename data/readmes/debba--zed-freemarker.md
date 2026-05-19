# Freemarker Extension for Zed

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-0.1.0-green.svg)](https://github.com/debba/zed-freemarker)
[![Discord](https://img.shields.io/discord/1470772941296894128?color=5865F2&logo=discord&logoColor=white)](https://discord.gg/YrZPHAwMSG)

Full-featured syntax highlighting and language support for Apache Freemarker Template Language (FTL) files in Zed editor, powered by a custom tree-sitter grammar.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Syntax Examples](#syntax-examples)
- [Development](#development)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Credits](#credits)
- [License](#license)

**Discord** - [Join our discord server](https://discord.gg/YrZPHAwMSG) and chat with the maintainers.

## Features

- **Full Syntax Highlighting**: Complete tree-sitter-based parser for accurate FTL syntax highlighting
- **Comment Support**: Both angle bracket (`<#-- -->`) and square bracket (`[#-- --]`) comment styles
- **Smart Bracket Matching**: Automatic closing and matching for all bracket types
- **HTML Integration**: Seamless HTML syntax highlighting within templates
- **Freemarker Directives**: Full support for:
  - Control structures (`if`, `else`, `elseif`, `switch`)
  - Loops (`list`, `foreach`)
  - Variable assignment and interpolation
  - Macros and functions
  - Built-in functions
  - Include and import statements
- **Lightweight**: Minimal overhead, fast parsing
- **Standards Compliant**: Follows Apache Freemarker 2.3+ syntax specification

## Installation

### From Zed Extensions Gallery (Recommended)

1. Open Zed editor
2. Press `Cmd+Shift+X` (macOS) or `Ctrl+Shift+X` (Linux/Windows) to open Extensions
3. Search for "Freemarker"
4. Click **Install**

### Manual Installation (Development)

For local development or testing unreleased versions:

```bash
# Clone the repository into your Zed extensions directory
git clone https://github.com/debba/zed-freemarker ~/.config/zed/extensions/freemarker

# Restart Zed or reload extensions
```

### Verify Installation

1. Open a `.ftl` file in Zed
2. Check the language indicator in the bottom-right corner
3. You should see "Freemarker" as the active language

## Usage

Once installed, the extension automatically activates for files with the `.ftl` extension. The editor will provide:

- Syntax highlighting for Freemarker directives and expressions
- Comment toggling with `Cmd+/` (macOS) or `Ctrl+/` (Linux/Windows)
- Automatic bracket pairing and closing
- HTML syntax within templates

## Syntax Examples

### Basic Variable Interpolation

```ftl
<#-- Variable assignment -->
<#assign userName = "John Doe">
<#assign userAge = 25>

<h1>Welcome ${userName}!</h1>
<p>Age: ${userAge}</p>
```

### Conditional Statements

```ftl
<#if userAge >= 18>
    <p>You are an adult.</p>
<#elseif userAge >= 13>
    <p>You are a teenager.</p>
<#else>
    <p>You are a child.</p>
</#if>
```

### List Iteration

```ftl
<#assign fruits = ["Apple", "Banana", "Cherry", "Date"]>

<h2>Fruit List:</h2>
<ul>
    <#list fruits as fruit>
        <li>${fruit}</li>
    </#list>
</ul>
```

### Hash/Map Operations

```ftl
<#assign user = {
    "name": "Jane Smith",
    "email": "jane@example.com",
    "role": "Administrator"
}>

<h2>User Information:</h2>
<dl>
    <dt>Name:</dt>
    <dd>${user.name}</dd>
    <dt>Email:</dt>
    <dd>${user.email}</dd>
</dl>
```

### Built-in Functions

```ftl
<p>Name in uppercase: ${user.name?upper_case}</p>
<p>Name length: ${user.name?length}</p>
<p>First fruit: ${fruits?first}</p>
<p>Capitalized: ${userName?cap_first}</p>
```

### Null Handling

```ftl
<#-- Check if variable exists -->
<#if optionalValue??>
    <p>Value: ${optionalValue}</p>
<#else>
    <p>Value is not set</p>
</#if>

<#-- Default value -->
<p>${pageTitle!"Default Title"}</p>
```

### Macros

```ftl
<#-- Macro definition -->
<#macro greet person>
    <p>Hello, ${person}! Nice to meet you.</p>
</#macro>

<#-- Macro usage -->
<@greet person="Alice" />
<@greet person="Bob" />
```

### Alternative Square Bracket Syntax

```ftl
[#assign name = "John Doe"]
<h1>Hello ${name}!</h1>

[#if user??]
    <p>Welcome, ${user.name}!</p>
[#else]
    <p>Please log in.</p>
[/#if]

[#list products as product]
    <li>${product.name} - ${product.price}</li>
[/#list]
```

### Include and Import

```ftl
<#-- Include another template -->
<#include "header.ftl">

<#-- Import macros from another file -->
<#import "lib/utils.ftl" as utils>
<@utils.formatDate date=.now />
```

## Development

### Prerequisites

- [Rust](https://rustup.rs/) (for building tree-sitter grammar)
- [Node.js](https://nodejs.org/) (for tree-sitter CLI)
- [Tree-sitter CLI](https://tree-sitter.github.io/tree-sitter/creating-parsers#installation)

### Building from Source

```bash
# Clone the repository
git clone https://github.com/debba/zed-freemarker.git
cd zed-freemarker

# Build the tree-sitter grammar
cd grammars/freemarker
npm install
npm run build

# Return to root and install in Zed
cd ../..
cp -r . ~/.config/zed/extensions/freemarker
```

### Testing the Grammar

```bash
cd grammars/freemarker

# Run tree-sitter tests
tree-sitter test

# Open the playground for interactive testing
tree-sitter playground
```

### Project Structure

```
zed-freemarker/
├── extension.toml              # Extension metadata
├── languages/
│   └── freemarker/
│       └── config.toml         # Language configuration
├── grammars/
│   └── freemarker/             # Tree-sitter grammar
│       ├── src/
│       │   ├── grammar.json
│       │   └── node-types.json
│       ├── bindings/
│       ├── Cargo.toml
│       └── package.json
├── example.ftl                 # Example template file
└── README.md
```

## Roadmap

- [ ] Language Server Protocol (LSP) support for:
  - Code completion
  - Go to definition
  - Find references
  - Hover documentation
- [ ] Snippet library for common Freemarker patterns
- [ ] Auto-formatting support
- [ ] Template validation and error checking
- [ ] Integration with Freemarker documentation
- [ ] Support for custom directives
- [ ] Theme customization for better highlighting

## Contributing

Contributions are welcome and appreciated! Here's how you can help:

### Reporting Issues

If you find a bug or have a feature request:

1. Check if the issue already exists in [GitHub Issues](https://github.com/debba/zed-freemarker/issues)
2. If not, create a new issue with:
   - Clear description of the problem or feature
   - Steps to reproduce (for bugs)
   - Example code that demonstrates the issue
   - Your Zed version and operating system

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly with various `.ftl` files
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request with a clear description of your changes

### Development Guidelines

- Follow existing code style and conventions
- Add tests for new features when applicable
- Update documentation for user-facing changes
- Keep commits focused and atomic
- Write clear commit messages

## Credits

- Inspired by the VS Code [vs-freemarker](https://github.com/dcortes92/vs-freemarker) extension
- Built with [Tree-sitter](https://tree-sitter.github.io/)
- Developed for [Zed](https://zed.dev/) editor
- [Apache Freemarker](https://freemarker.apache.org/) project

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2026 Andrea Debernardi

## Support

- **Issues**: [GitHub Issues](https://github.com/debba/zed-freemarker/issues)
- **Repository**: [GitHub](https://github.com/debba/zed-freemarker)
- **Tree-sitter Grammar**: [tree-sitter-freemarker](https://github.com/debba/tree-sitter-freemarker)
- **Freemarker Documentation**: [Official Docs](https://freemarker.apache.org/docs/)

---

Made with care for the Zed community
