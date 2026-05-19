# zed-gnome-presence
This program provides Discord rich presence for the Zed editor based on its window title, provided by the [Focused window D-Bus](https://github.com/flexagoon/focused-window-dbus) GNOME extension.

Made as a workaround to enable my performative coding tendencies. Unlike the LSP version, it works even when working remotely over SSH.

## Features
- minimal amount of actual code - less than 100 LOC!

## Anti-Features
- blocking code — ⚡️ blazingly inefficient
- zero error handling. :)
- hard-coded values
- discord is an untrustworthy platform :(

## Alternatives
- For hyprland: https://copeberg.org/virt/hl-zed-dc-rpc
- LSP server Zed extension: https://github.com/xhyrom/zed-discord-presence

## Running
```cargo run```

## Disclaimer
NOT AN OFFICIAL `Zed Industries, Inc.` program. NOT APPROVED BY OR ASSOCIATED WITH `Zed Industries, Inc.`
