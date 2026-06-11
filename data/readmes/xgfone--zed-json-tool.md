# json-tool-lsp

`json-tool-lsp` is a Zed extension for working with JSON buffers. It provides code actions for
minifying and formatting the current editor buffer through a small companion LSP server.

The extension is adapted from the VSCode extension `eriklynd.json-tools-1.0.2`, with the editor
integration rewritten for Zed. Because Zed extensions cannot read editor buffers directly, this
extension uses LSP document synchronization to receive the current buffer text and returns
`WorkspaceEdit` edits through code actions.

## Features

- `JSON Tool: Minify JSON`
    - Replaces the current JSON buffer with compact JSON.
    - Supports one JSON value or a stream of multiple JSON values.
    - When multiple JSON values are present, the result is one minified JSON value per line.
    - Preserves large JSON numbers without converting them to floating point values.
    - Preserves object key order.

- `JSON Tool: Format JSON`
    - Uses a target maximum line length of 120 characters.
    - Formats the current JSON buffer with 4-space indentation.
    - Keeps arrays and objects on one line when they fit within the target line length.
    - Expands arrays and objects across multiple lines when they exceed the target line length.
    - Supports JSON streams, including JSON log files where each line is one JSON object.
    - Also supports irregular multi-line JSON objects when they can be parsed as a valid JSON value stream.

## Supported Languages

The extension is enabled for:

- `JSON`
- `JSONC`

JSONC is currently parsed with the same parser as JSON, so comments and trailing commas are not
accepted yet.

## Usage

1. Open a `JSON` or `JSONC` file in Zed.
2. Open code actions for the current buffer.
3. Choose one of:
    - `JSON Tool: Minify JSON`
    - `JSON Tool: Format JSON`

If the buffer cannot be parsed as JSON, the extension does not offer a JSON edit.

## JSON Streams

This extension intentionally supports more than a single top-level JSON value.
This is useful for JSON log files and NDJSON-like files.

Input:

```json
{"level":"info","message":"started"}
{"level":"warn","message":"slow request","duration_ms":1234}
```

Format output:

```json
{"level": "info", "message": "started"}
{"level": "warn", "message": "slow request", "duration_ms": 1234}
```

Minify output:

```json
{"level":"info","message":"started"}
{"level":"warn","message":"slow request","duration_ms":1234}
```

When a value is longer than the target line length, formatting expands it:

```json
{
    "level": "info",
    "message": "a long message that pushes the object beyond the configured line width",
    "metadata": { "request_id": "abc", "status": 200 }
}
```

## Local Development

For local development, this repository includes helper scripts that build the
extension and copy only the extension manifest and wasm into the local Zed data
directory:

```sh
scripts/install-dev.sh
```

For Zed Preview on macOS, pass the data directory explicitly:

```sh
scripts/install-dev.sh --data-dir "$HOME/Library/Application Support/Zed Preview"
```

Restart Zed after installation.

The script builds these local development artifacts:

- the Zed extension wasm
- the native `json-tool-lsp` server

It installs only the extension files into:

```text
<Zed data dir>/extensions/installed/json-tool-lsp
```

The local LSP server is not bundled into the extension. Point Zed at the locally built server with
`lsp.json-tool-lsp.binary.path`:

```json
{
    "lsp": {
        "json-tool-lsp": {
            "binary": {
                "path": "/absolute/path/to/json-tool-lsp"
            }
        }
    }
}
```

Alternatively, set `ZED_JSON_TOOL_LSP` to the server path before launching Zed.

These scripts are for local development only. Published builds download the platform-specific LSP
server from GitHub Releases or use a user-provided server path.

## Development Commands

Run LSP tests:

```sh
cargo test --manifest-path server/Cargo.toml
```

Build the extension wasm:

```sh
cargo build --release --target wasm32-wasip2
```

Build the LSP server:

```sh
cargo build --release --manifest-path server/Cargo.toml
```

Clean build outputs:

```sh
scripts/clean.sh
```

Uninstall the local development extension:

```sh
scripts/uninstall-dev.sh --data-dir "$HOME/Library/Application Support/Zed Preview"
```

## LSP Server Resolution

At runtime, the Zed extension resolves `json-tool-lsp` in this order:

1. `lsp.json-tool-lsp.binary.path` from Zed settings.
2. `ZED_JSON_TOOL_LSP` from the worktree shell environment.
3. `json-tool-lsp` from `PATH`.
4. A platform-specific binary downloaded from the latest GitHub Release.

## Release Assets

For automatic downloads, GitHub Releases must include platform-specific zip assets with these
names:

```text
json-tool-lsp-macos-aarch64.zip
json-tool-lsp-macos-x86_64.zip
json-tool-lsp-linux-aarch64.zip
json-tool-lsp-linux-x86_64.zip
json-tool-lsp-windows-x86_64.zip
```

Each zip should contain exactly the native LSP binary:

```text
json-tool-lsp
```

On Windows, the binary should be:

```text
json-tool-lsp.exe
```

The included GitHub Actions workflow at `.github/workflows/release-lsp.yml` builds and uploads
these assets when a tag matching `v*` is pushed, or when the workflow is run manually.

## Configuration

All formatter settings are optional. If you do not configure anything, the extension uses its
defaults.

You can configure only the setting you want to change:

```json
{
    "lsp": {
        "json-tool-lsp": {
            "settings": {
                "max_line_length": 100
            }
        }
    }
}
```

Full formatter settings example:

```json
{
    "lsp": {
        "json-tool-lsp": {
            "settings": {
                "indent_size": 4,
                "indent_style": "space",
                "max_line_length": 120,
                "compact_arrays": "auto",
                "compact_objects": "auto",
                "json_stream_mode": "auto",
                "document_separator": "\n",
                "trailing_newline": true,
                "object_key_order": "preserve",
                "space_after_colon": true,
                "space_after_comma": true
            }
        }
    }
}
```

Available formatter settings:

| Setting              | Default      | Values                           | Description                                                                           |
| -------------------- | ------------ | -------------------------------- | ------------------------------------------------------------------------------------- |
| `indent_size`        | `4`          | positive integer                 | Number of spaces per indent level when `indent_style` is `space`.                     |
| `indent_style`       | `"space"`    | `"space"`, `"tab"`               | Indentation style for expanded arrays and objects.                                    |
| `max_line_length`    | `120`        | positive integer                 | Target line length for deciding whether arrays and objects stay on one line.          |
| `compact_arrays`     | `"auto"`     | `"auto"`, `"always"`, `"never"`  | Controls whether arrays stay on one line.                                             |
| `compact_objects`    | `"auto"`     | `"auto"`, `"always"`, `"never"`  | Controls whether objects stay on one line.                                            |
| `json_stream_mode`   | `"auto"`     | `"auto"`, `"single"`, `"stream"` | Controls whether multiple top-level JSON values are accepted.                         |
| `document_separator` | `"\n"`       | string                           | Text inserted between formatted or minified top-level JSON values.                    |
| `trailing_newline`   | `true`       | boolean                          | Adds a newline at the end of the replacement text.                                    |
| `object_key_order`   | `"preserve"` | `"preserve"`, `"sort"`           | Preserves original object key order or sorts keys alphabetically while formatting.    |
| `space_after_colon`  | `true`       | boolean                          | Adds a space after `:` in compact inline objects. Expanded objects always use `": "`. |
| `space_after_comma`  | `true`       | boolean                          | Adds a space after `,` in compact inline arrays and objects.                          |

To use a custom LSP binary, configure Zed with:

```json
{
    "lsp": {
        "json-tool-lsp": {
            "binary": {
                "path": "/absolute/path/to/json-tool-lsp"
            }
        }
    }
}
```

Alternatively, set:

```sh
export ZED_JSON_TOOL_LSP=/absolute/path/to/json-tool-lsp
```

## Implementation Notes

The LSP server uses full document synchronization. It stores the latest text for open JSON buffers
and responds to `textDocument/codeAction` with `WorkspaceEdit` changes that replace the full
document range.

Formatting is intentionally conservative:

- It parses valid JSON values with `serde_json`.
- It preserves object key order.
- It preserves arbitrary precision JSON numbers.
- It does not currently preserve comments, trailing commas, or other JSONC-only syntax.
- It does not read or write temporary files for JSON edits.

## License

Apache-2.0
