# Elixir Hex Lens LSP server

[![CI](https://github.com/jotaviobiondo/elixir-hex-lens-lsp/actions/workflows/ci.yml/badge.svg)](https://github.com/jotaviobiondo/elixir-hex-lens-lsp/actions/workflows/ci.yml)

An LSP server that provides hover information and autocompletion for [Hex](https://hex.pm) packages
in Elixir `mix.exs` files.

## Features

- **Hover**: shows package name, description, latest version with publish date, and links to hex.pm,
  hexdocs and repository
- **Autocompletion**: suggests Hex packages as you type `{:` in a `mix.exs` file

### Examples

**Hover:** \
<img width="656" height="400" alt="hover" src="https://github.com/user-attachments/assets/bbf016ac-6f74-424d-b4fb-2b7f029f1587" />

**Autocomplete:** \
<img width="1040" height="400" alt="autocomplete" src="https://github.com/user-attachments/assets/472f2417-8c89-427e-9f07-197f2b5a3a40" />

## Editor Setup

### Zed

Install the [elixir-hex-lens-zed](https://github.com/jotaviobiondo/elixir-hex-lens-zed) extension,
which handles downloading and registering the LSP server automatically.

1. Open **Zed → Extensions** (or press `Cmd+Shift+X`)
2. Search for **Elixir Hex Lens** and click **Install**

### Neovim (via nvim-lspconfig)

1. Download the latest binary and place it somewhere on your `$PATH`
2. Register the server in your config:

```lua
   vim.api.nvim_create_autocmd("FileType", {
     pattern = "elixir",
     callback = function()
       vim.lsp.start({
         name = "elixir-hex-lens",
         cmd = { "elixir-hex-lens-lsp" },
         root_dir = vim.fs.dirname(vim.fs.find("mix.exs", { upward = true })[1]),
       })
     end,
   })
```

### Helix

1. Download the latest binary and place it somewhere on your `$PATH`
2. Add the following to your `~/.config/helix/languages.toml`:

```toml
   [[language]]
   name = "elixir"
   language-servers = ["elixir-ls", "elixir-hex-lens"]  # keep your existing servers

   [language-server.elixir-hex-lens]
   command = "elixir-hex-lens-lsp"
```

### Emacs (via lsp-mode)

1. Download the latest binary and place it somewhere on your `$PATH`
2. Register the server:

```emacs-lisp
   (with-eval-after-load 'lsp-mode
     (lsp-register-client
      (make-lsp-client
       :new-connection (lsp-stdio-connection "elixir-hex-lens-lsp")
       :activation-fn (lsp-activate-on "elixir")
       :server-id 'elixir-hex-lens)))
```

### Other editors

Any editor that supports LSP can use this server. Point it at the `elixir-hex-lens-lsp` binary with `stdio`
transport and activate it for `elixir` / `mix.exs` files.

## Architecture

| File         | Purpose                                               |
| ------------ | ----------------------------------------------------- |
| `main.rs`    | LSP server (tower-lsp), hover and completion handlers |
| `parser.rs`  | Extracts `{:dep_name, ...}` from `mix.exs` lines      |
| `fetcher.rs` | Hex.pm API client with in-memory caching              |

## How it works

1. On `textDocument/didOpen` and `textDocument/didChange`, the server stores the contents of `mix.exs` files in memory.
2. On `textDocument/hover`, the server uses a regex to detect `{:package_name, ...}` tuples at the cursor position,
   queries `https://hex.pm/api/packages/{name}` (with caching), and returns a Markdown hover with the package details.
3. On `textDocument/completion`, the server detects a `{:` prefix at the cursor and
   queries `https://hex.pm/api/packages?search=name:{query}*` to return a ranked list of matching packages.

## Building

```sh
cargo build --release
```

The binary is output at `target/release/elixir-hex-lens-lsp`.

### Usage

The server communicates over **stdio** and speaks the [Language Server Protocol](https://microsoft.github.io/language-server-protocol/):

```sh
./elixir-hex-lens-lsp
```

Check the version:

```sh
./elixir-hex-lens-lsp --version
```

## Running tests

```sh
cargo test
```

## License

Apache-2.0
