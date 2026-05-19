# Zed Cylc Extension

This extension adds support for `.cylc` and `suite.rc` workflow configuration files to the [Zed](https://github.com/zed-industries/zed) code editor.

> [Cylc](https://github.com/cylc/cylc-flow) (pronounced silk) is a general purpose workflow engine that also manages cycling systems very efficiently. It is used in production weather, climate, and environmental forecasting on HPC, but is not specialized to those domains.

It uses the grammar defined in [tree-sitter-cylc](https://github.com/elliotfontaine/tree-sitter-cylc).

## Demo

<img width="770" alt="Screenshot of Cylc extension in Zed showing syntax highlighting and outline view" src="https://github.com/elliotfontaine/zed-cylc/blob/main/demo.png">

## Features

|                                | **Description**                                                                                                                |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| 🌈 **Syntax Highlighting**     | Provides comprehensive highlighting for `.cylc` and `suite.rc` files.                                                          |
| 📜 **Hierarchical Outline**    | Displays a collapsible, structured view of your Cylc configuration file, making it easy to navigate large workflows.           |
| ⌨️ **Auto-Indentation**        | Automatically adjusts indentation as you write, ensuring your workflow configuration is consistently formatted.                |
| 📂 **Code Folding**            | Collapse or expand sections of your Cylc files for easier management of large blocks of code.                                  |
| 🖥️ **BASH Language Injection** | Embedded Shell syntax inside `script` settings and the `[[environment]]` section, for easier validation of your tasks scripts. |

## Installation

`zed-cylc` is available in the official [Zed Extension Gallery](https://zed.dev/docs/extensions/installing-extensions) and can be installed directly from the Editor.

For manual installation, follow these steps:

1. Download the [latest release](https://github.com/elliotfontaine/tree-sitter-cylc/releases/) or a specific commit from GitHub.
2. Unzip the downloaded file.
3. In Zed, open the Extensions manager (⇧⌘X on MacOS) and click on **_Install Dev Extension_**, then select the unzipped folder.

## Contributing

Contributions and bug reports are welcome! Please submit a pull request or file an issue on the [GitHub repository](https://github.com/elliotfontaine/zed-cylc).

## License

[MIT](LICENSE)
