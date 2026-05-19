#  EmmyLua for Zed

An [EmmyLua](https://github.com/EmmyLuaLs) language server extension for [Zed](https://zed.dev).

Planning to add support for EmmyLua Debugger too.

Currently available to be installed as a development extension to Zed.

## Development

To develop this extension, see the [Developing Extensions](https://zed.dev/docs/extensions/developing-extensions) section of the Zed docs. Also has offical instructions on installing a development extension

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/brendan-corrigan/zed-EmmyLua
   ```

2. **Install the Zed extension** (Development Extension):
   - Open Zed editor
   - Press `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Linux/Windows) to open the command palette
   - Type "zed: install dev extension" and select it
   - Navigate to and select the `zed-emmylua` folder in your cloned repository

3. **Configure Lua LSP**
   - Open zed settings and add the following line to add emmylua as the lsp for lua
   ```json
    "languages": { "Lua": { "language_servers": ["emmylua"] } }
   ```
