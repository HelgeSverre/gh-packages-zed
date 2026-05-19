# Fortitude extension for Zed

This extension adds support for [fortitude](https://github.com/PlasmaFAIR/fortitude), a Fortran linter, to Zed.


## Installation

### 1. Install Fortitude

`fortitude` must be installed on your system and available in your `$PATH`in order to use in Zed.

You can install Fortitude globally on your system using [`uv`](https://docs.astral.sh/uv/)

```bash
uv tool install fortitude-lint>0.8.0
```

### 2. Install the extension

Search for `fortitude` in the Zed extensions panel and click to install.

### 3. Configure

Currently, fortitudes language server is intended to be used alongside another Fortran Language Server such as `fortls` in order to support features like navigation and autocompletion. It is included in the [`zed-fortran`](https://github.com/Xavier-Maruff/zed-fortran) extension).
Then, you only need to enable both language server in your settings:

```json
{
  "languages": {
    "Fortran": {
      "language_servers": ["fortls", "fortitude"]
    },
  }
}
```
