# inference.sh for Zed

A [Zed](https://zed.dev) extension that adds [inference.sh](https://inference.sh) as an MCP context server. Run 250+ AI apps — image, video, audio, LLMs, 3D and more — directly from Zed's Agent panel.

## Installation

1. Open Zed and go to **Extensions** (Cmd+Shift+X)
2. Search for "inference.sh" and click **Install**
3. Click **Configure** on the extension
4. Enter your API key and click **Configure Server**

To get an API key, sign up at [inference.sh](https://app.inference.sh) and create one in [settings](https://app.inference.sh/settings/keys).

## Configuration

The extension is configured through Zed's settings. You can also manually add the following to your Zed `settings.json` (Cmd+,):

```json
"context_servers": {
  "inference-sh": {
    "settings": {
      "api_key": "your-api-key"
    }
  }
}
```

## How it works

This extension registers an MCP context server that connects to inference.sh's API. It includes a lightweight native bridge binary that translates between Zed's stdio-based MCP transport and inference.sh's HTTP API.

On first use, the extension automatically downloads the correct bridge binary for your platform from GitHub releases. No Node.js or other runtime dependencies required.

## Development

### Prerequisites

- [Rust](https://rustup.rs/) (must be installed via rustup)
- `wasm32-wasip1` target: `rustup target add wasm32-wasip1`

### Project structure

```
├── src/lib.rs              # Zed extension (compiled to WASM)
├── bridge/src/main.rs      # MCP bridge binary (compiled natively)
├── configuration/          # Setup UI shown in Zed
└── .github/workflows/      # CI to build & release bridge binaries
```

### Building the extension

```bash
cargo build --target wasm32-wasip1
```

### Building the bridge

```bash
cargo build --release --manifest-path bridge/Cargo.toml
```

### Testing locally

1. Build the bridge and create a local release-like structure
2. Open Zed, run **zed: install dev extension**, select this directory
3. Click **Configure** and enter your API key

### Releasing

Tag a version to trigger the release workflow:

```bash
git tag v0.1.0
git push origin v0.1.0
```

This builds the bridge for all platforms and creates a GitHub release with the assets.

### Debugging

Check Zed's log for errors:
- Open the command palette and run **zed: open log**
- Look for `inference-sh` or `context_server` entries

## License

MIT
