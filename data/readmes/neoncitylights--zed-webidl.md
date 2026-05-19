# zed-webidl
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)

WebIDL syntax highlighting support for [Zed](https://github.com/zed-industries/zed).

- Tree-sitter: [neoncitylights/tree-sitter-webidl](https://github.com/neoncitylights/tree-sitter-webidl)
- GitHub repository: [whatwg/webidl](https://github.com/whatwg/webidl)
- Specification: [webidl.spec.whatwg.org](https://webidl.spec.whatwg.org)

## Developing
1. Clone repository
2. Open Zed editor
3. Open Command Palette (<kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> on MacOS, <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> on Linux)
4. Type "zed: install dev extension" and press <kbd>enter</kbd>
5. Select this repository directory, then start testing

### Tips
- To rebuild the extension, press "Rebuild" on the page from "zed: extensions" (Command Palette).
- To see the generated Tree-Sitter Query AST, open "dev: open syntax tree view" (Command Palette).
- You can test syntax highlighting with files in the `tests` directory.

> [!NOTE]
> If you rebuilt and uninstalled the extension, then tried to reinstall it, you may see an error.
> This can happen if a generated `grammars` directory already exists; delete it and try again.

## License
This software is licensed under the MIT license ([`LICENSE`](./LICENSE) or <https://opensource.org/license/mit/>).

### Contribution
Unless you explicitly state otherwise, any contribution intentionally submitted for inclusion in the work by you, as defined in the MIT license, shall be licensed as above, without any additional terms or conditions.
