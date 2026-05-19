# SSH Local Proxy

**SSH Local Proxy** is a lightweight, zero-configuration reverse proxy built in Rust. It was designed to seamlessly integrate with Zed Editor's SSH connections, automatically mapping hard-to-remember local port forwards (e.g., `127.0.0.1:4200`) to intuitive, mnemonic local subdomains (e.g., `frontend.production.localhost:8080`).

## 🚀 Why this exists

When working with multiple remote environments (VMs, VPS, Staging servers) using SSH port forwarding, local ports quickly become a mess.
Is `localhost:8080` the staging backend or the production frontend? 

If you use the [Zed Editor](https://zed.dev/), it already handles SSH connections and port forwarding beautifully. This tool reads your existing Zed `settings.json`, discovers the forwarded ports, and instantly spins up a reverse proxy.

Instead of typing `localhost:51234`, you can simply type:
`http://backend.my-server.localhost:8080`

## ✨ Features

- **Zero-Config Sync**: Reads your `~/.config/zed/settings.json` automatically on startup.
- **Custom Labels**: Allows assigning readable labels (like `api`, `dashboard`, `engine`) to specific ports via a local `config.toml` file.
- **Pure Proxy Mode**: It does not interfere with your SSH keys or connections; it strictly routes HTTP traffic to the ports already opened by your editor.
- **Blazing Fast**: Built in Rust using `Tokio` and `Axum`.

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/alessandrobrunoh/ssh-local-proxy.git
cd ssh-local-proxy

# Build the project
cargo build --release
```

## 🛠️ Usage

1. Open your Zed Editor and connect to your remote projects. Ensure your port forwards are active.
2. Run the proxy:
   ```bash
   cargo run
   ```
3. On the first run, the tool will generate a `config.toml` file in the current directory.
4. Edit the `config.toml` to add `label` properties to your ports (see the example below).
5. Restart the proxy.

### Configuration Example (`config.toml`)

```toml
[[machines]]
host = "Production-Server"

[[machines.forwards]]
local_port = 3000
remote_port = 3000
label = "backend"

[[machines.forwards]]
local_port = 4200
remote_port = 4200
label = "frontend"
```

With the configuration above, you can access your services in your browser at:
- `http://backend.production-server.localhost:8080`
- `http://frontend.production-server.localhost:8080`

*If a port doesn't have a label, it falls back to the port number (e.g., `http://12345.production-server.localhost:8080`).*

## 📄 License

This project is open-source and available under the MIT License.
