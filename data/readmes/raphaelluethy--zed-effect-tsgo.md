# Effect TypeScript-Go for Zed

Zed extension for the `@effect/tsgo` language server.

It follows Zed's current Rust/WebAssembly extension model and launches the native `tsgo` binary with:

```sh
tsgo --lsp --stdio
```

## What It Does

- installs `@effect/tsgo` through Zed when no custom binary is configured
- resolves the platform-specific native package such as `@effect/tsgo-darwin-arm64`
- makes the binary executable when needed
- forwards `initialization_options` and `settings` from Zed to the server
- supports TypeScript, TSX, JavaScript, and JSX with correct LSP `languageId` mapping

## Project Setup

This extension only starts the language server. Your TypeScript project still needs the upstream Effect setup:

```sh
npx @effect/tsgo setup
npm install -D @typescript/native-preview
```

## Install As A Dev Extension

Zed's extension docs: <https://zed.dev/docs/extensions/developing-extensions>

1. Open Zed.
2. Run `zed: install dev extension`.
3. Select this directory.

For troubleshooting, run `zed --foreground` and inspect `zed: open log`.

## Enable The Server

```json
{
  "languages": {
    "TypeScript": {
      "language_servers": ["effect-tsgo"]
    },
    "TSX": {
      "language_servers": ["effect-tsgo"]
    },
    "JavaScript": {
      "language_servers": ["effect-tsgo"]
    },
    "JSX": {
      "language_servers": ["effect-tsgo"]
    }
  }
}
```

## Configuration

The extension resolves the server binary in this order:

1. `lsp.effect-tsgo.settings.binary.path`
2. `lsp.effect-tsgo.settings.package_version`
3. latest `@effect/tsgo` from npm

### Pin A Package Version

```json
{
  "lsp": {
    "effect-tsgo": {
      "settings": {
        "package_version": "0.5.1"
      }
    }
  }
}
```

### Use A Specific Native Binary

`binary.path` must be an absolute path to the native `tsgo` executable:

```json
{
  "lsp": {
    "effect-tsgo": {
      "settings": {
        "binary": {
          "path": "/absolute/path/to/node_modules/@effect/tsgo-darwin-arm64/lib/tsgo"
        }
      }
    }
  }
}
```

### Use Zed's Raw Binary Override

If you want Zed to bypass the extension-managed npm install completely, use the top-level raw binary override instead:

```json
{
  "lsp": {
    "effect-tsgo": {
      "binary": {
        "path": "./node_modules/.bin/tsgo",
        "arguments": ["--lsp", "--stdio"]
      }
    }
  }
}
```

## Notes

- The actual native executable is `tsgo`, not `effect-tsgo`.
- `extension.toml` currently points at the upstream `Effect-TS/tsgo` repository; update that metadata before publishing this extension from a separate repository.
