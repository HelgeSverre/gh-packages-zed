# Hitagi Zed Extension

This extension wires the Hitagi language server into Zed for Rust projects.

## Requirements

- A `hitagi` binary available on `PATH`.
- Rust toolchain installed to build the extension for development.

To build Hitagi from source:

```bash
git clone https://github.com/JohnTitor/hitagi.git
cd hitagi
cargo build --release
```

Then put the binary on your `PATH` (for example, copy `target/release/hitagi` to a
directory already on `PATH`).

## Install For Development

1. Open Zed.
2. Run the `zed: extensions` command.
3. Click `Install Dev Extension`.
4. Choose this repository directory.

## Configuration

You can override the binary path and pass arguments or environment variables
using Zed settings:

```json
{
  "lsp": {
    "hitagi": {
      "binary": {
        "path": "/absolute/path/to/hitagi",
        "arguments": [],
        "env": {}
      }
    }
  }
}
```

You may also set `initialization_options` and `settings` under `lsp.hitagi` to
pass JSON configuration to the server.
