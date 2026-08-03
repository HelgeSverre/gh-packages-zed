# Owl Strudel

[![CI](https://github.com/pol-cova/owl-strudel/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/pol-cova/owl-strudel/actions/workflows/ci.yml)
[![License: AGPL-3.0-or-later](https://img.shields.io/badge/license-AGPL--3.0--or--later-blue.svg)](LICENSE)
[![VSIX](https://img.shields.io/badge/extension-VS%20Code%20%2F%20Cursor-4c8bf5)](https://github.com/pol-cova/owl-strudel/releases)

Live-code [Strudel](https://strudel.cc) music from VS Code, Cursor, and Zed.

## Use it

1. Open `examples/first-song.strudel`, or create a `.strudel` file.
2. Run **Owl Strudel: Start Session**.
3. Click **Unlock Audio** once.
4. Press `Cmd/Ctrl+Enter` to evaluate your selection or file.
5. Use **Stop** for a normal stop and **Panic** to silence everything immediately.

The editor remains the only place where you write code. Owl Strudel’s panel is only for audio state and controls.

## Commands

| Command | Shortcut in `.strudel` files |
|---|---|
| Evaluate Selection, Block, or File | `Cmd/Ctrl+Enter` |
| Evaluate File | `Cmd/Ctrl+Shift+Enter` |
| Stop | `Cmd/Ctrl+.` |
| Panic | `Cmd/Ctrl+Shift+.` |

Owl Strudel never evaluates a file automatically and will not run code in an untrusted workspace.

## Editor support

VS Code and Cursor use an embedded player. Zed uses a local companion player because its extension API does not provide an equivalent embedded panel. Its setup instructions are in `zed/README.md`.

## Development

```sh
pnpm install
pnpm run check
pnpm run build
node dist/companion-server.js start --workspace "$PWD"
```

To test the extension, open this folder in VS Code or Cursor, press `F5`, then open the example file in the Extension Development Host. The checked-in “Run Owl Strudel” launch configuration builds the development host around this workspace.

Contributors and AI agents: see [AGENTS.md](AGENTS.md) for project layout, workflow, and commit conventions.

## License

Owl Strudel is AGPL-3.0-or-later. The bundled Strudel runtime is also AGPL-3.0-or-later. See [LICENSE](LICENSE).
