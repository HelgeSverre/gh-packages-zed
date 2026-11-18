<div align="center">

<img width="160" alt="TakaTime" src="https://raw.githubusercontent.com/Rtarun3606k/TakaTime/main/public/TakatimeLogo.png" />

# TakaTime for Zed

**Self-hosted coding time tracking for [Zed](https://zed.dev), powered by [TakaTime](https://github.com/Rtarun3606k/TakaTime).**

Your editor, your database, your data.

<br>

[![npm](https://img.shields.io/npm/v/takatime-ls?style=for-the-badge&logo=npm&logoColor=white&label=takatime-ls&color=CB3837)](https://www.npmjs.com/package/takatime-ls)
[![License](https://img.shields.io/badge/License-GPL--3.0--only-blue?style=for-the-badge)](LICENSE)
[![Zed](https://img.shields.io/badge/Zed-Extension-084CCF?style=for-the-badge&logo=zedindustries&logoColor=white)](https://zed.dev/extensions)

![Rust](https://img.shields.io/badge/Rust-000000?style=flat-square&logo=rust&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-000000?style=flat-square&logo=bun&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)

</div>

<br>

## ✨ Features

- **Zero setup in Zed:** install the extension, point it at a MongoDB and start coding.
- **Accurate time:** counts the real time between your edits and skips idle gaps, instead of crediting a fixed block per keystroke.
- **Every language:** tracks any file Zed can open, from Rust to Markdown.
- **Self-hosted:** heartbeats go straight to your own MongoDB, nothing passes through a third party.
- **Shared setup:** uses the same `~/.takatime.json` and binaries as the TakaTime plugins for VS Code, JetBrains and Neovim.
- **Offline friendly:** failed uploads are retried, and setup quietly retries in the background until you're back online.
- **Always up to date:** new upstream TakaTime releases are picked up automatically.

## 📋 Requirements

- [Zed](https://zed.dev)
- A MongoDB instance, local or hosted (see [Setting up MongoDB](#-setting-up-mongodb))
- One of the supported platforms:

| Platform | Architecture                       |
| -------- | ---------------------------------- |
| Linux    | x64                                |
| macOS    | x64, Apple Silicon                 |
| Windows  | x64, ARM64 (through x64 emulation) |

## 🚀 Installation

1. Open Zed's extensions page (`zed: extensions`).
2. Search for **TakaTime** and click **Install**.
3. Open any file. TakaTime creates `~/.takatime.json` and asks you to set your MongoDB URI.

## ⚙️ Configuration

TakaTime reads its settings from `~/.takatime.json`, shared with every other TakaTime plugin:

```json
{
  "MONGO_URI": "mongodb://user:password@your-host:27017/takatime?authSource=takatime",
  "VERSION": "v2.3.1"
}
```

| Key         | Description                                                                     |
| ----------- | ------------------------------------------------------------------------------- |
| `MONGO_URI` | Your MongoDB connection string (`mongodb://` or `mongodb+srv://`).              |
| `VERSION`   | The TakaTime binary version in use. Managed automatically, no need to touch it. |

Changes are picked up within a few seconds, without restarting Zed.

> [!TIP]
> TakaTime always writes to the `takatime` database. Give it a dedicated user with the `readWrite` role on that database instead of your admin credentials.

## 🗄️ Setting up MongoDB

<details>
<summary><b>Local, with Docker</b></summary>

<br>

```sh
docker run -d --name takatime-mongo --restart unless-stopped \
  -p 127.0.0.1:27017:27017 -v takatime-mongo:/data/db mongo:8
```

Then set `"MONGO_URI": "mongodb://localhost:27017"`.

</details>

<details>
<summary><b>Self-hosted, on a VPS</b></summary>

<br>

1. Create a MongoDB instance (for example as a [Coolify](https://coolify.io) database resource) and expose it on a non-default port.
2. Restrict that port to your own IPs with your provider's firewall, or reach it through a VPN such as Tailscale. Docker-published ports bypass `ufw`.
3. Create a dedicated user:

   ```sh
   mongosh "<admin connection string>" --eval '
     db.getSiblingDB("takatime").createUser({
       user: "takatime",
       pwd: "<long random password>",
       roles: [{ role: "readWrite", db: "takatime" }]
     })'
   ```

4. Use `mongodb://takatime:<password>@<host>:<port>/takatime?authSource=takatime`, percent-encoding any special characters in the password.

</details>

<details>
<summary><b>Hosted, with MongoDB Atlas</b></summary>

<br>

Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/atlas), add a database user and copy the `mongodb+srv://` connection string it gives you.

</details>

## 📊 Dashboard

TakaTime comes with a terminal dashboard. Add it as a Zed task in `~/.config/zed/tasks.json`:

```json
[
  {
    "label": "TakaTime: Dashboard",
    "command": "~/.takatime/bin/taka-dashboard-$(jq -r .VERSION ~/.takatime.json) -MongoDBString \"$(jq -r .MONGO_URI ~/.takatime.json)\"",
    "use_new_terminal": true,
    "allow_concurrent_runs": false,
    "reveal": "always"
  }
]
```

Then run `task: spawn` and pick **TakaTime: Dashboard**. Add `-theme` with `dark`, `light`, `dracula`, `nord`, `gruvbox`, `monokai` or `cyberpunk` to change its look.

> [!NOTE]
> The task uses [`jq`](https://jqlang.org) to read your config, so the URI never has to live in `tasks.json`.

## 🔍 How it works

Zed extensions run in a WebAssembly sandbox with no access to editor events, so TakaTime registers a small language server for every language and tracks activity from there.

```mermaid
flowchart LR
    zed["Zed"] -- "LSP over stdio" --> ls["takatime-ls<br/>(Node)"]
    ls -- "spawns" --> upload["taka-upload<br/>(Go)"]
    upload -- "inserts" --> mongo[("MongoDB")]
    dashboard["taka-dashboard<br/>(Go)"] -- "reads" --> mongo
```

1. The extension installs [`takatime-ls`](https://www.npmjs.com/package/takatime-ls) from npm and runs it on Zed's bundled Node.
2. On first run, `takatime-ls` downloads the pinned TakaTime binaries into `~/.takatime/bin`.
3. Every edit and save adds the time since your last activity, skipping gaps longer than 2 minutes.
4. Tracked time is uploaded through `taka-upload` every minute, when you switch files and when Zed shuts down.

### What gets sent

Only the file path, project name, duration, editor name and timestamp. **File contents are never read or sent.**

## 🩺 Troubleshooting

| Problem                                   | Fix                                                                                   |
| ----------------------------------------- | ------------------------------------------------------------------------------------- |
| "Set MONGO_URI" notification              | Add your connection string to `~/.takatime.json`.                                     |
| "Isn't a valid MongoDB connection string" | The URI must start with `mongodb://` or `mongodb+srv://`.                             |
| "Couldn't install binaries"               | Check your connection. TakaTime retries every 5 minutes on its own.                   |
| No time showing up                        | Run `dev: open language server logs`, pick `takatime` and look for `takatime active`. |

## 🛠️ Development

### Prerequisites

- [Rust](https://rustup.rs) installed through `rustup` (Zed needs it to compile dev extensions)
- [Bun](https://bun.sh)

### Project layout

```
takatime-zed/
├── extension.toml       # Zed extension manifest
├── src/lib.rs           # WASM shim: installs and launches takatime-ls
├── takatime-ls/         # the language server, published to npm
│   └── src/
│       ├── server.ts    # LSP entry
│       └── lib/         # config, setup, binaries and heartbeats
└── scripts/             # release tooling
```

### Running locally

1. Build the language server:

   ```sh
   cd takatime-ls
   bun install
   bun run build
   ```

2. Point Zed at your local build in `settings.json`:

   ```json
   "lsp": {
     "takatime": {
       "binary": {
         "path": "node",
         "arguments": ["/absolute/path/to/takatime-ls/dist/server.js", "--stdio"]
       }
     }
   }
   ```

3. Run `zed: install dev extension` and pick this folder.

Logs from the language server show up under `dev: open language server logs`.

### Releasing

Versions are kept in sync across `extension.toml`, `Cargo.toml`, `Cargo.lock` and `takatime-ls/package.json`:

```sh
scripts/bump-version.sh <patch|minor|major|x.y.z>
```

Pushing a version change to `main` publishes `takatime-ls` to npm, creates a GitHub release and opens a pull request on [zed-industries/extensions](https://github.com/zed-industries/extensions). A daily workflow bumps the TakaTime binaries as soon as a new upstream release is fully published.

## 🙏 Credits

- [TakaTime](https://github.com/Rtarun3606k/TakaTime) by [@Rtarun3606k](https://github.com/Rtarun3606k), which this extension wraps
- [zed-wakatime](https://github.com/wakatime/zed-wakatime), for showing how to track time from inside Zed's sandbox

## 📄 License

[AGPL-3.0](LICENSE)
