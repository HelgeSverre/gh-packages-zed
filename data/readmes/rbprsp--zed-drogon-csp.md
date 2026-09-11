# Drogon CSP for Zed

Syntax highlighting for [Drogon CSP](https://github.com/drogonframework/drogon) (`.csp`) files in [Zed](https://zed.dev).

## Highlights

| Construct | |
| --- | --- |
| `<%c++ ... %>` | C++ block (injected as `cpp`) |
| `<%inc ... %>` | Include block (injected as `cpp`) |
| `{% EXPR %}` | Expression (injected as `cpp`) |
| `<%view NAME %>` | View include |
| `<%layout NAME %>` | Layout include |
| `[[ NAME ]]` | Variable interpolation |
| Surrounding markup | Injected as `html` |

## Install

Clone, then in Zed: command palette → `zed: install dev extension` → pick the cloned directory.

## Credits

[marty1885/drogon-csp-language](https://github.com/marty1885/drogon-csp-language) (VS Code extension).

## License

MIT
