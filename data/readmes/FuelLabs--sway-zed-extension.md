# Sway Extension for Zed

Official Zed extension for the Sway programming language, providing comprehensive language support for Fuel smart contracts.

## Features

- **Language Server Protocol (LSP)** integration with `forc-lsp`
- **Syntax highlighting** via Tree-sitter grammar
- **Code completion** and IntelliSense
- **Error diagnostics** and warnings
- **Go to definition** and symbol navigation
- **Hover documentation** and type information
- **Inlay hints** for types and parameters

## Prerequisites

Before using this extension, you need to install the Fuel toolchain:

### Installing the Fuel Toolchain

```bash
# Install fuelup (Fuel toolchain installer)
curl https://install.fuel.network | sh

# Install the latest Fuel toolchain
fuelup toolchain install latest
fuelup default latest

# Verify installation
fuelup --version  
forc --version  
forc-lsp --version
```

This will install:
- `forc` - The Fuel Orchestrator (Sway compiler)
- `forc-lsp` - The Sway Language Server
- `forc-fmt` - Sway code formatter
- `forc-doc` - Sway documentation generator
- `fuel-core` - The Fuel node implementation
- Other Fuel development tools

### Verify Installation

```bash
# Verify forc-lsp is available
forc-lsp --version
```

## Installation

### From Zed Extension Marketplace

1. Open Zed
2. Press `Cmd/Ctrl + Shift + P` to open the command palette
3. Type "zed: extensions" and select it
4. Search for "Sway"
5. Click "Install" on the Sway extension

That's it! The extension is automatically available through Zed's built-in extension registry.

### Manual Installation (Development Only)

1. Clone this repository:
   ```bash
   git clone https://github.com/FuelLabs/sway-zed-extension.git
   cd sway-zed-extension
   ```

2. Install the extension in development mode:
   ```bash
   # In Zed, open the command palette and run:
   # "zed: install dev extension"
   # Then select this extension directory
   ```

## Usage

Once installed, the extension will automatically activate for `.sw` files. The language server will start automatically when you open a Sway project.

### Supported File Types

- `.sw` - Sway source files

## Project Structure

This extension includes:

- `extension.toml` - Extension metadata and configuration
- `src/lib.rs` - WebAssembly extension logic
- `languages/sway/config.toml` - Language configuration
- `languages/sway/highlights.scm` - Syntax highlighting rules

## Troubleshooting

### Language Server Not Starting

If the language server isn't working:

1. **Check forc-lsp installation**:
   ```bash
   which forc-lsp
   forc-lsp --version
   ```

2. **Verify PATH**: Ensure `forc-lsp` is in your system PATH

3. **Check Zed logs**: Open Zed logs to see any error messages:
   - Open command palette (`Cmd/Ctrl + Shift + P`)
   - Run "zed: open log file"

4. **Restart Zed**: Sometimes restarting Zed resolves LSP issues

### Extension Not Loading

If the extension isn't loading:

1. Check the Zed extensions panel for any error messages
2. Verify the extension is enabled
3. Try disabling and re-enabling the extension
4. Restart Zed

## Links

- [Sway Documentation](https://fuellabs.github.io/sway/)
- [Fuel Documentation](https://docs.fuel.network/)
- [Sway GitHub Repository](https://github.com/FuelLabs/sway)
- [Zed Extensions Documentation](https://zed.dev/docs/extensions)

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.
