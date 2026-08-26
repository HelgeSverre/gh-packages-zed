<!-- SPDX-License-Identifier: Apache-2.0 -->

<div align="center">

# Agent Language Support

**An independent Zed language extension compatible with Agent Script.**

[![CI](https://github.com/dylandersen/agent-language-support/actions/workflows/ci.yml/badge.svg)](https://github.com/dylandersen/agent-language-support/actions/workflows/ci.yml)
[![Zed Extension](https://img.shields.io/badge/Zed-development_extension-084CCF)](https://zed.dev/docs/extensions/developing-extensions)
[![License: Apache-2.0](https://img.shields.io/badge/license-Apache--2.0-7C3AED)](#licensing)
[![Agent Script](https://img.shields.io/badge/files-.agent-00A1E0)](https://github.com/salesforce/agentscript)

</div>

Agent Language Support recognizes `.agent` files and connects them to the
official open-source Agent Script language server. It provides semantic color,
diagnostics, hover, completion, navigation, rename, symbols, and code actions.

> [!IMPORTANT]
> This is an unofficial community compatibility project. It is not a Salesforce
> product and is not affiliated with, sponsored by, or endorsed by Salesforce
> or Zed Industries. Version 0.2.0 has not been submitted to Zed's extension
> registry.

## Features

| Capability | Support |
| --- | :---: |
| `.agent` language detection | ✅ |
| Rich semantic highlighting | ✅ |
| Diagnostics and validation | ✅ |
| Completion and hover | ✅ |
| Go to definition and references | ✅ |
| Rename, symbols, and code actions | ✅ |
| Runtime installation of the official npm LSP | ✅ |

The extension pins `@sf-agentscript/lsp-server` to version `2.3.33`. Zed
installs that package into the extension work directory when the language
server is first needed and supplies the Node.js runtime. No language-server
bundle is checked into this repository or packaged into the extension.

## Install from source

1. Install [Zed](https://zed.dev/) and [Rust](https://rustup.rs/).
2. Add Zed's WebAssembly target:

   ```sh
   rustup target add wasm32-wasip2
   ```

3. Clone this repository:

   ```sh
   git clone https://github.com/dylandersen/agent-language-support.git
   cd agent-language-support
   ```

4. In Zed, open the command palette and run **`zed: install dev extension`**.
5. Select the cloned `agent-language-support` folder, then open an `.agent` file.

On first use, Zed downloads the pinned official language-server package from
npm. Internet access to the npm registry is therefore required once per pinned
version.

## Enable semantic color

Add this to your Zed `settings.json`:

```json
{
  "languages": {
    "Agent Script": {
      "semantic_tokens": "full"
    }
  }
}
```

Then run **`editor: restart language server`** or restart Zed. The status bar
should show **Agent Script**, and the language-server indicator should show
**Agent Script Language Server** running.

## Dialect configuration

The official server uses Agentforce when no dialect is configured. The
extension also accepts the friendly values `agentforce` and `agentscript` and
maps them to the current official npm package identifiers:

```json
{
  "lsp": {
    "agent-script-language-server": {
      "initialization_options": {
        "dialect": "agentforce"
      }
    }
  }
}
```

## Architecture

```text
.agent file
    ├── pinned Salesforce Tree-sitter grammar
    │       └── structure and baseline scopes
    └── Zed extension (WebAssembly)
            └── installs pinned @sf-agentscript/lsp-server from npm
                    └── semantic tokens, diagnostics and language features
```

The Tree-sitter grammar is pinned to Salesforce's upstream commit
`5e6404e9a662f049af236c2886f910d47e392905`. Runtime package versions,
copyright notices, and license boundaries are documented in
[`NOTICE`](NOTICE), [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md), and
[`LICENSES.md`](LICENSES.md).

## Example

[`examples/quote-builder.agent`](examples/quote-builder.agent) is a complete,
generalized quote-building workflow with catalog search, opportunity lookup,
quote creation, line updates, and guarded reasoning. Its action targets are
illustrative `Example*` placeholders; it contains no customer, account,
product, organization, credential, or Salesforce-internal data.

## Troubleshooting

**The file is recognized, but everything is one color**

Enable `semantic_tokens: "full"` as shown above, save the settings, and restart
the language server.

**The language server did not install**

Confirm Zed can reach the npm registry, then open the Extensions page, select
this development extension, and choose **Rebuild**. Version 0.2.0 no longer
expects or extracts `server/server.mjs`.

**Zed cannot compile the extension**

```sh
rustup target add wasm32-wasip2
cargo check --locked --target wasm32-wasip2
```

## Development

```sh
npm install --no-save --package-lock=false --ignore-scripts @sf-agentscript/lsp-server@2.3.33
cargo fmt --check
cargo check --locked --target wasm32-wasip2
node scripts/verify-lsp-package.mjs
node scripts/smoke-lsp.mjs
```

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for contribution guidance and
[`SECURITY.md`](SECURITY.md) for private vulnerability reporting. Maintainers
use [`RELEASE_CHECKLIST.md`](RELEASE_CHECKLIST.md) to verify provenance and
release readiness.

## Project relationship

The Agent Script language and its official tooling are developed by Salesforce in
[`salesforce/agentscript`](https://github.com/salesforce/agentscript). This
repository is an independent compatibility integration for Zed. It is not a
Salesforce product and is not affiliated with, sponsored by, or endorsed by
Salesforce or Zed Industries.

## Licensing

This repository is licensed under [Apache License 2.0](LICENSE). Files derived
from Salesforce sources remain Apache-2.0 and are identified explicitly in
[`LICENSES.md`](LICENSES.md). Runtime npm dependencies retain their own
licenses; see [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md).
