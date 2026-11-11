> [!IMPORTANT]
> Remove this line to confirm you've reviewed this PR before submitting.

# Zed (Custom Build with Ollama & Prompt Caching Fixes)

[![Release](https://img.shields.io/github/v/release/0xra0/zed?style=flat-square&color=blue)](https://github.com/0xra0/zed/releases)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg?style=flat-square)](./LICENSE-GPL)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg?style=flat-square)](./LICENSE-APACHE)
[![Platform](https://img.shields.io/badge/platform-Linux%20x86__64-orange?style=flat-square)](https://github.com/0xra0/zed/releases)
[![Rust](https://img.shields.io/badge/rustc-1.85%2B-lightgrey?style=flat-square&logo=rust)](https://www.rust-lang.org)

A high-performance, multiplayer code editor based on **Zed 1.27.0**, featuring custom enhancements for **local LLM / Ollama agent execution** and **prompt-prefix caching optimization** during thread context summarization and title generation.

---

## 🚀 Key Modifications & Features

This repository includes custom improvements on top of upstream Zed to enhance AI agent reliability when using local models (e.g. Ollama, Qwen, Mistral, Llama 3) and reduce token costs / latency via prompt-prefix caching:

### 1. Robust Ollama & Local Model Agent Support (`cd` Fallback)
* **Problem**: Upstream Zed requires the `cd` (working directory) parameter to be provided by the LLM for `terminal` and `sandboxed_terminal` tool invocations. Smaller and local models (such as those running via Ollama) frequently omit this parameter when executing commands in the workspace root, causing JSON deserialization errors and failing the agent turn.
* **Solution**:
  - Made the `cd` parameter optional via `#[serde(default)]` in both `TerminalToolInput` and `SandboxedTerminalToolInput`.
  - Updated tool descriptions to instruct models that `cd` is optional and defaults to the project root in a single-root workspace.
  - Added unit tests verifying default fallback behavior when `cd` is omitted.
* **Files modified**: [`crates/agent/src/tools/terminal_tool.rs`](file:///mnt/sata/zed/crates/agent/src/tools/terminal_tool.rs).

### 2. Prompt Prefix Caching for Thread Summarization & Title Generation
* **Problem**: When generating thread titles or compacting thread history, stock Zed constructs fresh requests without the active turn's system prompt or tool signatures. This breaks prompt prefix alignment and invalidates KV / prompt caches on LLM providers (such as Anthropic, Ollama, DeepSeek, and OpenAI-compatible gateways).
* **Solution**:
  - Implemented `Thread::build_title_request` and modularized `Thread::request_tools` so title generation and summarization preserve the active turn's system prompt prefix and tool definitions.
  - Prefix-caching inference servers only need to evaluate the brief summarization instruction rather than reprocessing the entire conversation history from scratch.
  - Added test coverage in [`crates/agent/src/tests/mod.rs`](file:///mnt/sata/zed/crates/agent/src/tests/mod.rs) (`test_title_request_keeps_turn_prefix`).
* **Files modified**: [`crates/agent/src/thread.rs`](file:///mnt/sata/zed/crates/agent/src/thread.rs), [`crates/agent/src/tests/mod.rs`](file:///mnt/sata/zed/crates/agent/src/tests/mod.rs).

### 3. Included Patches
The exact diffs applied to stock Zed are preserved as standalone patch files in the repository root:
* [`zed-local-changes.patch`](file:///mnt/sata/zed/zed-local-changes.patch) — Combined changes for prompt prefix caching and terminal tool fixes.
* [`zed-ollama-missing-cd.patch`](file:///mnt/sata/zed/zed-ollama-missing-cd.patch) — Standalone patch for the Ollama missing `cd` parameter fix.

---

## 📥 Installation

Pre-built x86_64 Linux releases are available under [Releases](https://github.com/0xra0/zed/releases).

### Method 1: Quick Install (User Directory)

You can extract the release bundle directly into `~/.local`:

```bash
# Download latest release bundle
curl -LO https://github.com/0xra0/zed/releases/download/v1.27.0/zed-linux-x86_64.tar.gz

# Extract to ~/.local
tar -xzf zed-linux-x86_64.tar.gz -C ~/.local --strip-components=1

# Ensure ~/.local/bin is in your PATH
export PATH="$HOME/.local/bin:$PATH"

# Verify installation
zed --version
```

### Method 2: System-wide Install

```bash
sudo tar -xzf zed-linux-x86_64.tar.gz -C /usr/local --strip-components=1
sudo update-desktop-database
```

### Method 3: Desktop Environment & Icon Integration

If you extract to a custom directory (e.g. `/opt/zed` or `~/.local/share/zed`), register the desktop launcher and icons:

```bash
# Copy desktop launcher
mkdir -p ~/.local/share/applications
cp share/applications/dev.zed.Zed.desktop ~/.local/share/applications/

# Copy icons
mkdir -p ~/.local/share/icons/hicolor/512x512/apps
cp share/icons/hicolor/512x512/apps/zed.png ~/.local/share/icons/hicolor/512x512/apps/zed.png

# Update desktop & icon caches
update-desktop-database ~/.local/share/applications/
gtk-update-icon-cache -f ~/.local/share/icons/hicolor/
```

### Method 4: Shell Completions

Zed CLI includes auto-completion for popular shells:

* **Bash**:
  ```bash
  mkdir -p ~/.local/share/bash-completion/completions
  cp share/bash-completion/completions/zed ~/.local/share/bash-completion/completions/
  ```
* **Zsh**:
  ```bash
  mkdir -p ~/.zsh/completion
  cp share/zsh/site-functions/_zed ~/.zsh/completion/
  # Ensure ~/.zsh/completion is in your $fpath
  ```
* **Fish**:
  ```bash
  mkdir -p ~/.config/fish/completions
  cp share/fish/vendor_completions.d/zed.fish ~/.config/fish/completions/
  ```

---

## ⚙️ Configuration for Ollama & Local LLMs

To take full advantage of the Ollama agent fixes, configure Zed's language model settings:

1. Open Zed settings: `Ctrl-,` (or click Zed > Preferences > Open Settings).
2. Edit `~/.config/zed/settings.json` to configure Ollama as an assistant provider:

```json
{
  "assistant": {
    "default_model": {
      "provider": "ollama",
      "model": "qwen2.5-coder:14b"
    },
    "version": "2"
  },
  "language_models": {
    "ollama": {
      "api_url": "http://localhost:11434",
      "available_models": [
        {
          "name": "qwen2.5-coder:14b",
          "display_name": "Qwen 2.5 Coder 14B",
          "max_tokens": 32768
        },
        {
          "name": "qwen2.5-coder:7b",
          "display_name": "Qwen 2.5 Coder 7B",
          "max_tokens": 32768
        },
        {
          "name": "llama3.1:8b",
          "display_name": "Llama 3.1 8B",
          "max_tokens": 16384
        }
      ]
    }
  }
}
```

3. Ensure Ollama is running locally:
```bash
ollama run qwen2.5-coder:14b
```
4. Open the Assistant Panel with `Ctrl-?` (or `Ctrl-Alt-B` / toggle panel) and select your Ollama model. The agent can now execute terminal commands and inspect files without failing on missing `cd` parameters!

---

## 🛠️ Building from Source

### Prerequisites

* **Rust toolchain** (compatible with `rust-toolchain.toml` or Rust 1.85+)
* **C/C++ compiler**: `clang` and `lld` (LLD 12+)
* **Linux development dependencies**:
  - Ubuntu/Debian:
    ```bash
    sudo apt-get update && sudo apt-get install -y \
        build-essential clang lld libssl-dev libx11-dev libxkbcommon-dev \
        libxkbcommon-x11-dev libxcb1-dev libxcb-render0-dev libxcb-shape0-dev \
        libxcb-xfixes0-dev libasound2-dev libfontconfig1-dev
    ```
  - Arch Linux:
    ```bash
    sudo pacman -S base-devel clang lld openssl libx11 libxkbcommon libxcb alsa-lib fontconfig
    ```

### Compilation

```bash
# Clone the repository
git clone https://github.com/0xra0/zed.git
cd zed

# Build in release mode
cargo build --release --package zed --package cli

# The compiled binaries will be in target/release:
# - target/release/zed (the GUI editor)
# - target/release/cli (the CLI launcher)
```

### Running

```bash
# Launch via CLI
./target/release/cli .

# Or run directly in foreground for debug logs
./target/release/cli --foreground .
```

---

## 📄 License & Attribution

* Zed source code is licensed primarily under **GPL-3.0-or-later** ([`LICENSE-GPL`](./LICENSE-GPL)), with designated components under **Apache-2.0** ([`LICENSE-APACHE`](./LICENSE-APACHE)).
* Zed is originally created by **Zed Industries, Inc.** (https://zed.dev).
* Third-party dependency licenses are compiled in [`assets/licenses.md`](./assets/licenses.md).
