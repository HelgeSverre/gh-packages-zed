<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/banner.svg">
    <img src="assets/banner.svg" alt="LLVM IR Studio Banner" width="100%">
  </picture>
</p>

<p align="center">
  <a href="https://github.com/SohamTilekar/llvm-ir-studio/releases"><img src="https://img.shields.io/github/v/release/SohamTilekar/llvm-ir-studio?color=%23ff3d00&label=Release" alt="Release"></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=SohamTilekar.llvm-ir-studio"><img src="https://img.shields.io/visual-studio-marketplace/v/SohamTilekar.llvm-ir-studio?color=%2300e5ff&label=VS%20Marketplace" alt="VS Code Marketplace"></a>
  <a href="https://open-vsx.org/extension/sohamtilekar/llvm-ir-advance"><img src="https://img.shields.io/open-vsx/v/sohamtilekar/llvm-ir-advance?color=%23a855f7&label=Open%20VSX" alt="Open VSX"></a>
  <a href="https://github.com/SohamTilekar/llvm-ir-studio/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
  <img src="https://img.shields.io/badge/LLVM-14%20to%2021%2B-orange.svg" alt="LLVM Versions">
  <img src="https://img.shields.io/badge/Language%20Server-Pure%20Rust-red.svg" alt="Pure Rust">
</p>

# LLVM IR Studio (`llvm-ir-ls`)

**LLVM IR Language Server with editor integration & visualizer.**

`llvm-ir-ls` is a lightweight, version-aware, native LLVM IR Language Server & Visualizer written in Rust.

---

## Editor Support

`llvm-ir-ls` acts as a universal language server supporting any editor with LSP capabilities.

> 📌 Track publishing and marketplace distribution status across all editors in [`DISTRIBUTION_TRACKER.md`](DISTRIBUTION_TRACKER.md).

| Editor | Support Type | Folder / Config |
| --- | --- | --- |
| **VS Code & Cursor** | Full Extension (`.vsix`) | [`editors/vscode`](editors/vscode) |
| **Zed** | Native Extension (`.wasm`) | [`editors/zed`](editors/zed) |
| **Neovim / Vim** | Native `vim.lsp.start` & `nvim-lspconfig` | [`editors/neovim`](editors/neovim) |
| **Helix** | Native `languages.toml` | [`editors/helix`](editors/helix) |
| **Sublime Text** | Sublime `LSP` package | [`editors/sublime`](editors/sublime) |
| **GNU Emacs** | `eglot` (built-in) & `lsp-mode` | [`editors/emacs`](editors/emacs) |
| **JetBrains (CLion / Fleet)** | LSP4IJ & Fleet settings | [`editors/jetbrains`](editors/jetbrains) |
| **Kate** | Built-in LSP Client | [`editors/kate`](editors/kate) |

---

### 1. Visual Studio Code, Cursor & VSCodium

The extension is available on both official registries:
- **Visual Studio Marketplace**: [Install LLVM IR Studio](https://marketplace.visualstudio.com/items?itemName=SohamTilekar.llvm-ir-studio) (`SohamTilekar.llvm-ir-studio`)
- **Open VSX Registry** (Cursor, VSCodium, Gitpod): [Install LLVM IR Advance](https://open-vsx.org/extension/sohamtilekar/llvm-ir-advance) (`sohamtilekar/llvm-ir-advance`)

#### Key Capabilities
- **Full LSP Support**: Diagnostics, hover definitions, code completions, symbol rename, and document symbols.
- **Smart Prefix Completion**: Eliminates prefix duplication when completing `@globals`, `%registers`, and `.labels`.
- **Interactive CFG Webview**: Right-click or run `LLVM IR: Show Function CFG` to view and pan/zoom the function's control flow graph in a side panel.
- **Automatic Language Server Provisioning**: Detects local `llvm-ir-ls` binaries or downloads the matching pre-built release automatically from GitHub Releases.

#### Manual Installation (.vsix)
```bash
code --install-extension dist/llvm-ir-advance-0.1.1.vsix
```

---

### 2. Zed (`llvm-ir-advance`)

The Zed extension is located in [`editors/zed`](editors/zed).

#### Key Capabilities
- Tree-sitter powered syntax highlighting for `.ll` files.
- Real-time version checking and diagnostics.
- Go to Definition & Find References across SSA registers and basic block labels.
- Auto-downloading binary installer powered by Zed's Extension API.

#### Installation
1. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS) in Zed.
2. Run `zed: install dev extension`.
3. Choose the [`editors/zed`](editors/zed) folder.

---

### 3. Neovim & Standalone Installation Guide

For editors without an integrated marketplace store (or for command-line setups), follow this simple 2-step setup.

#### Step 1: Install the `llvm-ir-ls` Binary

Choose one of the following methods to install `llvm-ir-ls` on your system `$PATH`:

- **Option A: Pre-built Binary from GitHub Releases (Recommended)**:
  Download the latest release archive for your OS from [GitHub Releases](https://github.com/SohamTilekar/llvm-ir-studio/releases):
  ```bash
  # Linux (x86_64)
  curl -sL https://github.com/SohamTilekar/llvm-ir-studio/releases/download/v0.1.0/llvm-ir-ls-v0.1.0-x86_64-unknown-linux-gnu.tar.gz | tar -xz
  sudo mv llvm-ir-ls /usr/local/bin/

  # macOS (Apple Silicon)
  curl -sL https://github.com/SohamTilekar/llvm-ir-studio/releases/download/v0.1.0/llvm-ir-ls-v0.1.0-aarch64-apple-darwin.tar.gz | tar -xz
  sudo mv llvm-ir-ls /usr/local/bin/
  ```

- **Option B: Install via Cargo (Rust toolchain)**:
  ```bash
  cargo install --git https://github.com/SohamTilekar/llvm-ir-studio.git llvm-ir-ls
  # or from local clone:
  cargo install --path crates/llvm-ir-ls
  ```

Verify the installation:
```bash
llvm-ir-ls --version
```

---

#### Step 2: Configure Neovim

##### Option A: Native Neovim (v0.10+ / v0.11+) — Zero External Plugins!
Simply copy [`editors/neovim/ftplugin/llvm.lua`](editors/neovim/ftplugin/llvm.lua) to your Neovim config:
```bash
mkdir -p ~/.config/nvim/ftplugin
cp editors/neovim/ftplugin/llvm.lua ~/.config/nvim/ftplugin/llvm.lua
```
Whenever you open any `.ll` file:
- Neovim automatically attaches `llvm-ir-ls`.
- Pre-wires LSP keymaps: `gd` (definition), `gr` (references), `K` (hover), `<leader>rn` (rename), `<leader>ca` (code actions).
- Adds `:LLVMCheck` and `:LLVMCFG` commands to preview Control Flow Graphs in your browser.

##### Option B: `nvim-lspconfig`
Add to your `init.lua`:
```lua
local lspconfig = require('lspconfig')
local configs = require('lspconfig.configs')

if not configs.llvm_ir_ls then
  configs.llvm_ir_ls = {
    default_config = {
      cmd = { 'llvm-ir-ls', 'lsp' },
      filetypes = { 'llvm' },
      root_dir = lspconfig.util.root_pattern('.llvm-ir-ls.toml', '.git', '.'),
      settings = {},
    },
  }
end

lspconfig.llvm_ir_ls.setup{}
```

##### Option C: Quick Test Without Modifying Your Config
Run Neovim using the included test config directly against any test fixture:
```bash
nvim -u editors/neovim/test-init.lua tests/fixtures/syntax_broken.ll
```

---

### 4. Helix

Drop-in configuration is available in [`editors/helix/languages.toml`](editors/helix/languages.toml). Add to `~/.config/helix/languages.toml`:

```toml
[[language]]
name = "llvm"
scope = "source.llvm"
injection-regex = "llvm"
file-types = ["ll"]
roots = [".llvm-ir-ls.toml", ".git"]
language-servers = ["llvm-ir-ls"]
indent = { tab-width = 2, unit = "  " }

[language-server.llvm-ir-ls]
command = "llvm-ir-ls"
args = ["lsp"]
```

Verify with:
```bash
hx --health llvm
```

---

### 5. Sublime Text 3 & 4

See [`editors/sublime`](editors/sublime) for details.

1. Install the `LSP` package via Package Control.
2. Add the following to `Preferences: LSP Settings` (`LSP.sublime-settings`):

```json
{
  "clients": {
    "llvm-ir-ls": {
      "enabled": true,
      "command": ["llvm-ir-ls", "lsp"],
      "selector": "source.llvm",
      "schemes": ["file"]
    }
  }
}
```

---

### 6. GNU Emacs

See [`editors/emacs`](editors/emacs) for details and helper package [`llvm-ir-ls.el`](editors/emacs/llvm-ir-ls.el).

#### Eglot (Emacs 29+)
```elisp
(require 'eglot)
(add-to-list 'auto-mode-alist '("\\.ll\\'" . llvm-mode))
(add-to-list 'eglot-server-programs '(llvm-mode . ("llvm-ir-ls" "lsp")))
(add-hook 'llvm-mode-hook #'eglot-ensure)
```

#### `lsp-mode`
```elisp
(lsp-register-client
 (make-lsp-client :new-connection (lsp-stdio-connection '("llvm-ir-ls" "lsp"))
                  :major-modes '(llvm-mode)
                  :server-id 'llvm-ir-ls))
(add-hook 'llvm-mode-hook #'lsp-deferred)
```

---

### 7. JetBrains IDEs (CLion, RustRover, Fleet, IntelliJ)

See [`editors/jetbrains`](editors/jetbrains) for details.

- **CLion / RustRover / IntelliJ IDEA**: Install the official **LSP4IJ** plugin, then go to **Settings** -> **Languages & Frameworks** -> **Language Servers** -> add `llvm-ir-ls lsp` matching `*.ll` files.
- **JetBrains Fleet**: Add to `.fleet/settings.json`:
  ```json
  {
    "lsp": {
      "llvm-ir-ls": {
        "command": ["llvm-ir-ls", "lsp"],
        "filePatterns": ["*.ll"]
      }
    }
  }
  ```

---

### 8. Kate (KDE Text Editor)

See [`editors/kate`](editors/kate) for details. Enable the built-in **LSP Client** plugin and add to **Settings** -> **Configure Kate...** -> **LSP Client** -> **User Server Settings**:

```json
{
  "servers": {
    "llvm": {
      "command": ["llvm-ir-ls", "lsp"],
      "rootIndicationFileNames": [".llvm-ir-ls.toml", ".git"],
      "url": "https://github.com/SohamTilekar/llvm-ir-studio",
      "highlightingModeRegex": "^LLVM.*$"
    }
  }
}
```

---

## Architecture & Core Features

`llvm-ir-ls` brings first-class developer tooling for LLVM Intermediate Representation (`.ll`) files:
- **Zero `libLLVM` C++ linking**: Pure Rust implementation with instantaneous startup and tiny memory footprint.
- **LLVM Version Awareness**: Tracks syntax evolution across LLVM 14 to 21+ (opaque `ptr` vs typed pointers `i32*`, explicit `getelementptr` types, deprecated attributes like `readnone` → `memory(...)`).
- **Incremental & Error-Tolerant**: Powered by Tree-sitter for uninterrupted syntax parsing even on partially written or broken IR files.
- **SSA Def-Use Analysis**: Instant Go-to-Definition, Find All References, and in-function SSA register/basic block renaming.
- **Control Flow Graph (CFG) Visualizer**: Interactive flowcharts rendered directly inside VS Code or exported to Mermaid, Graphviz DOT, and standalone HTML/SVG.
- **AI Coding Agent Ready**: Machine-readable diagnostic codes (`LLVM-SYNTAX-001`, `LLVM-VER-001`, `LLVM-SSA-001`, `LLVM-CFG-001`), related information spans, and quick-fix code actions.

---

## Workspace Layout

```text
llvm-ir-studio/
├── Cargo.toml
├── crates/
│   ├── ir-core/          # Incremental Tree-sitter parser, document store, UTF-16 position mapper
│   ├── ir-version/       # Version profiles (LLVM 14–21+), compatibility rules, heuristic detection
│   ├── ir-analysis/      # Syntax & semantic analysis, symbol table, SSA def-use chains, CFG builder
│   ├── ir-docs/          # LLVM LangRef instruction hover documentation
│   ├── ir-viz/           # CFG visualizer (Mermaid, Graphviz DOT, interactive HTML)
│   ├── ir-lsp/           # tower-lsp implementation (diagnostics, semantic tokens, actions, completions)
│   └── llvm-ir-ls/       # Unified CLI binary (`lsp`, `check`, `cfg`)
├── editors/
│   ├── vscode/           # VS Code extension (TypeScript LSP client, TextMate grammar, Webview CFG)
│   ├── zed/              # Zed Rust/WASM extension with auto-downloader
│   ├── neovim/           # Neovim plugin, ftplugin, and lspconfig integration
│   ├── helix/            # Helix languages.toml configuration
│   ├── sublime/          # Sublime Text LSP package configuration
│   ├── emacs/            # Emacs eglot and lsp-mode integration (llvm-ir-ls.el)
│   ├── jetbrains/        # JetBrains CLion/RustRover/IntelliJ (LSP4IJ) & Fleet settings
│   └── kate/             # KDE Kate editor LSP client configuration
└── tests/
    └── fixtures/         # Multi-version LLVM IR fixtures
```

---

## CLI Usage

### 1. Launch Language Server (LSP Mode)

```bash
llvm-ir-ls lsp
# or simply
llvm-ir-ls
```

### 2. IR Validation & Diagnostics

Human-readable terminal output:
```bash
llvm-ir-ls check file.ll --version 18
```

Machine-readable JSON output for AI coding agents and CI:
```bash
llvm-ir-ls check file.ll --format json
```

### 3. CFG Visualization

Export Mermaid diagram:
```bash
llvm-ir-ls cfg file.ll --fn @main --format mermaid
```

Export Graphviz DOT file:
```bash
llvm-ir-ls cfg file.ll --fn @main --format dot -o cfg.dot
```

Generate interactive HTML viewer:
```bash
llvm-ir-ls cfg file.ll --fn @main --format html -o cfg.html
```

---

## Building from Source

Prerequisites: Rust stable toolchain (`cargo`).

```bash
# Clone the repository
git clone https://github.com/SohamTilekar/llvm-ir-studio.git
cd llvm-ir-studio

# Build optimized binary
cargo build --release --bin llvm-ir-ls

# Install binary to ~/.cargo/bin or ~/.local/bin
cargo install --path crates/llvm-ir-ls
```

Run test suite:
```bash
cargo test
```
