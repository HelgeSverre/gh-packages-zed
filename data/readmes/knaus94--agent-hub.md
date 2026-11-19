# agent-hub

Watch and steer the agent chats of the [Zed](https://zed.dev) editor from your phone.

agent-hub sits between Zed and its ACP agents (Claude Code, Codex and others). From a phone or another computer you can:

- follow every running chat live: messages, reasoning, tool calls, diffs and terminal output;
- add a correction to a turn while it runs, or send the next message;
- answer the agent's questions and permission requests;
- start new chats in any project, with the agent's own models, effort levels, modes and slash commands;
- archive chats, keep quick-action buttons, dictate by voice and get push notifications when a turn ends.

The web app's interface is in Russian for now.

## How it works

- **Relay.** `agent-hub install` rewrites each agent in Zed's `agent_servers` settings to start through `agent-hub relay`, which passes Zed's traffic through unchanged and lets the hub watch and add to it. Zed's old settings are kept next to the file.
- **Hub.** A user service on `127.0.0.1:8790` that rebuilds every chat from that traffic and serves the web app. Chats started from the web run in agent processes the hub starts itself, with Zed's command and settings, and are added to Zed's thread list.
- **Remote access.** A Cloudflare tunnel: a temporary `*.trycloudflare.com` address, or a permanent name on your own Cloudflare domain. Nothing listens on a public port.
- **GNOME indicator.** An optional top bar button to turn remote access on and off and open ports of local dev servers.

## Requirements

- Linux with a systemd user session. Developed on Ubuntu 26.04 with GNOME 50.
- Go 1.25 or newer, Node.js 22 or newer with corepack, GNU make.
- Zed with agents configured as custom entries in `agent_servers`, each with a `command`.
- A free Cloudflare account and a domain on it, for a permanent address and for iPhone notifications. Without them a temporary address works. `cloudflared` is downloaded by the installer if missing.
- Optional: GNOME Shell 50 for the indicator; [VoiceKey](https://github.com/knaus94/voicekey) on an AMD NPU, or any server with OpenAI's transcription API, for voice input.

## Install

```sh
git clone https://github.com/knaus94/agent-hub.git
cd agent-hub
./scripts/install.sh
```

Run it as yourself, not with sudo. It builds the web app and the binary, installs `~/.local/bin/agent-hub`, the user services, a launcher and the GNOME indicator, and wraps Zed's agents. Running it again updates everything; the hub is restarted unless it runs chats started from the web.

To let an AI coding agent do the installation and setup, give it [docs/install-prompt.md](docs/install-prompt.md).

## Set up

1. **Login code.** `agent-hub otp` shows a QR code; scan it with any authenticator app. A phone logs in once with a code and then stays logged in for 30 days of inactivity. On this computer, `agent-hub open` opens the web app logged in.
2. **Remote access.** Either `agent-hub up` for a temporary address, or a permanent one:

   ```sh
   cloudflared tunnel login                   # pick your domain in the browser
   agent-hub domain --random example.com      # makes up a name like hub5jgf8540dlg.example.com
   agent-hub up
   ```

3. **Zed.** Restart Zed so its agents start through the relay.
4. **Phone.** Open the address and log in with a code. On an iPhone, add the page to the Home Screen, open it from there and turn notifications on with the bell in the chat list.
5. **Voice, optional.** `agent-hub voice voicekey`, or `agent-hub voice http <url> [model]` for a Whisper-compatible server (its key, if any, from `AGENT_HUB_VOICE_KEY`). Off by default.

## Commands

```text
agent-hub install                      set up or update everything for this user
agent-hub up | down | status           the hub's public address, and every open port
agent-hub domain <host> | --random <domain>   a permanent address on your Cloudflare domain
agent-hub share <port> | share stop <port>     an open public address for a local port, with no login
agent-hub open                         the web app in this computer's browser, logged in
agent-hub otp [reset]                  the authenticator QR code; reset after losing the phone
agent-hub voice [off | voicekey | http <url> [model]]   voice input, off by default
```

## Security

- The hub listens on loopback only. From outside it is reached only through the tunnel, and only with a code from the authenticator app. Each phone then holds its own device token, which logging out revokes.
- Three wrong codes lock out the address they came from for five minutes; thirty wrong codes from anywhere within ten minutes stop new logins for five minutes. Devices already logged in are not affected.
- The token in `config.json` works only from this computer.
- Whoever is logged in can do what the agents can, and agents usually run commands on this computer. Keep the authenticator to yourself.
- `agent-hub share` publishes a local port with no login at all.
- Notifications show the chat's title and the agent's question on the lock screen.

## Files

Everything the hub keeps is in `~/.config/agent-hub`, readable by you only:

| File | Holds |
| --- | --- |
| `config.json` | the local token, the permanent address, voice settings |
| `otp.json`, `devices.json` | the authenticator secret and the logged-in devices |
| `push.json` | the notification key and subscriptions |
| `quick.json`, `archive.json` | quick actions and chats archived from the web |

Cloudflare's tunnel credentials are in `~/.cloudflared`. The installer also edits `~/.config/zed/settings.json` (backup `settings.json.before-agent-hub-*`), adds chats started from the web to Zed's thread list, and installs `~/.config/systemd/user/agent-hub*.service`, `~/.local/share/applications/agent-hub.desktop` and the GNOME extension `agent-hub@knaus94`.

## Uninstall

```sh
agent-hub down
systemctl --user disable --now agent-hub.service
rm ~/.config/systemd/user/agent-hub*.service ~/.local/share/applications/agent-hub.desktop ~/.local/bin/agent-hub
rm -r ~/.local/share/gnome-shell/extensions/agent-hub@knaus94 ~/.config/agent-hub
```

Then put back Zed's settings from the backup, or remove `agent-hub` and `relay <name>` from each agent's `command` and `args`.

## Development

`make check` runs gofmt, go vet and the TypeScript check; `make build` builds `dist/agent-hub` with the web app inside.
