# mLua Debugger for Zed

`mlua-debugger-zed` is a Zed Debug Adapter Protocol extension for debugging
MapleStory Worlds mLua projects.

This extension wraps the official MSW VS Code debugger package
[`msw.debugger-for-mlua`](https://marketplace.visualstudio.com/items?itemName=msw.debugger-for-mlua).
On first use, it queries Visual Studio Marketplace, downloads the latest VSIX
package into Zed's extension cache, and starts the bundled `MSWDebugSession`
through a small Node.js DAP wrapper. The debugger behavior comes from the
official MSW extension; this repository provides the Zed integration layer.

## Status

This extension has not been published to the Zed Extension Gallery yet. Install
it as a Zed dev extension from a local checkout.

## Features

- Attach debugging for MapleStory Worlds Maker
- Line breakpoints
- Step over, step in, and step out
- Call stacks
- Evaluation and watches
- Local, global, and upvalue variables
- Optional port selection with automatic scan of `51300-51399`
- Latest VSIX lookup with cached fallback

## Requirements

- Zed
- Rust installed via `rustup`, which Zed requires for local dev extensions
- Node.js available through Zed or on `PATH`
- MapleStory Worlds Maker running with an mLua debug target available
- Internet access on first use to download the official MSW debugger VSIX
  package from Visual Studio Marketplace

For editing `.mlua` files, install the companion `mlua-zed` language extension
as a dev extension as well.

## Installation

Clone this repository, then install it as a dev extension in Zed:

1. Open Zed.
2. Open the Extensions page or run `zed: install dev extension` from the
   command palette.
3. Select the local `mlua-debugger-zed` repository directory.
4. Add a debug configuration to the project.

After updating the local repository, reinstall the dev extension or reload Zed so
the latest extension code is used.

## Debug Configuration

Create `.zed/debug.json` in your project:

```json
[
  {
    "label": "MSW Attach",
    "adapter": "msw",
    "request": "attach"
  }
]
```

Use this configuration from Zed's debug task list, or start debugging with the
configured debug keybinding.

If Maker is listening on a specific port, include `port`:

```json
[
  {
    "label": "MSW Attach",
    "adapter": "msw",
    "request": "attach",
    "port": 51300
  }
]
```

If `port` is omitted, the adapter searches listening ports in the `51300-51399`
range, matching the official MSW debugger behavior.

## How It Works

The extension does not reimplement the mLua debugger. Instead, it:

1. Looks up the latest `msw.debugger-for-mlua` VS Code extension version from
   Visual Studio Marketplace.
2. Downloads and extracts the VSIX package into Zed's extension work directory.
3. Starts the official `MSWDebugSession` with a Node.js wrapper that adapts it
   for Zed's Debug Adapter Protocol runtime.
4. Reuses the cached package when Marketplace is unavailable.

## Troubleshooting

- If the debug task is not listed, confirm that `.zed/debug.json` is valid JSON
  and that the dev extension is installed.
- If the adapter fails to start, confirm that Node.js is available.
- If attach fails, confirm that MapleStory Worlds Maker is running and that the
  debug port is reachable.
- If the first download fails, confirm that `marketplace.visualstudio.com` and
  `msw.gallery.vsassets.io` are reachable.
