# Make HTTP requests from inside a Zed editor extension

This oversimplified Zed extension employs MCP server configuration dialog to display results of HTTP request.

Tested with Zed 0.225.10, zed_extension_api [v0.7.0](https://crates.io/crates/zed_extension_api/0.7.0), Rust 1.93.1.

## Preparation

Make sure you have Rust toolchain and `wasm32-wasip2` target installed.

## Instructions

1. Install this demo as dev extension ( [docs](https://zed.dev/docs/extensions/developing-extensions#developing-an-extension-locally) ):

a. Clone this repo:

```sh
git clone --depth=1 https://github.com/wasm-outbound-http-examples/zed-extension.git
```

b. Run `zed: install dev extension` from command palette or activate it from menu Zed -> Extensions -> `Install Dev Extension`

c. Select the folder containing this extension.

2. Press `Configure` button for this extension in Zed Extensions list.

3. See the response for HTTP request in the dialog (and in debug output for `--foreground` mode too).

4. Press `Cancel`/`Dismiss` or `Esc` to close the dialog.

## Finish

Perform your own experiments if desired.
