# PlatformIO for Zed

Unofficial PlatformIO workflows for [Zed](https://zed.dev/).

This project helps Zed users work with existing PlatformIO projects by generating Zed tasks for common embedded workflows:

- Build
- Upload
- Clean
- Serial monitor
- Compilation database generation for `clangd`

## Unofficial project notice

This is an independent community project.

It is **not** created, sponsored, endorsed, or maintained by PlatformIO Labs, Zed Industries, Arduino, Espressif, or any board vendor. “PlatformIO”, “Zed”, “Arduino”, “ESP32”, and related names are trademarks of their respective owners and are used only to describe compatibility.

The goal is not to clone the PlatformIO VS Code extension. Zed has a different extension model, so this project follows Zed-native workflows where possible.

See [DISCLAIMER.md](./DISCLAIMER.md) for the full disclaimer.

## Current status

Implemented:

- `platformio.ini` discovery and parsing
- optional computed config discovery through `pio project config --json-output`
- environment discovery from `[env:*]` and `default_envs`
- support for `upload_port` and `monitor_port`
- `.zed/tasks.json` generation
- optional `.clangd` generation
- CLI for local bootstrapping
- initial Zed extension manifest/scaffold

Not implemented yet:

- status-bar / bottom toolbar buttons
- custom activity panel
- in-Zed modal picker
- full debug integration
- PlatformIO Home replacement

Zed does not currently expose a VS Code-style status-bar contribution API for extensions. For now, the reliable UX is task-based.

## Requirements

- Zed
- Rust toolchain
- PlatformIO Core (`pio`) available in your shell

Check PlatformIO:

```bash
pio --version
```

## Quick start

Generate Zed tasks for a PlatformIO project:

```bash
cargo run --bin platformio-for-zed -- \
  --project-dir /path/to/platformio-project \
  --backup \
  --with-clangd
```

This writes:

```text
/path/to/platformio-project/.zed/tasks.json
/path/to/platformio-project/.clangd
```

Existing files are backed up under:

```text
/path/to/platformio-project/.zed/backups/<timestamp>/
```

Open the PlatformIO project in Zed and run:

```text
task: spawn
```

Then choose one of the generated tasks:

- `PlatformIO: Build (<env>)`
- `PlatformIO: Upload (<env>)`
- `PlatformIO: Clean (<env>)`
- `PlatformIO: Monitor (<env>)`
- `PlatformIO: Compiledb (<env>)`

## CLI usage

```bash
platformio-for-zed [options]
```

Options:

```text
--project-dir <path>   Project root containing platformio.ini (default: cwd)
--with-clangd          Also write .clangd with a CompilationDatabase directive
--overwrite-clangd     Overwrite existing .clangd (requires --with-clangd)
--list-envs            Print detected PlatformIO environments and exit
--backup               Backup existing .zed/tasks.json and .clangd before writing
--stdout               Print tasks JSON to stdout instead of writing .zed/tasks.json
-h, --help             Show help
```

Examples:

```bash
# List detected environments
cargo run --bin platformio-for-zed -- --project-dir /path/to/project --list-envs

# Print generated Zed tasks without writing files
cargo run --bin platformio-for-zed -- --project-dir /path/to/project --stdout

# Safe write with backups
cargo run --bin platformio-for-zed -- --project-dir /path/to/project --backup --with-clangd
```

## Installing in Zed

### Development install

Use this while the project is not published in the Zed extensions registry.

1. Open Zed.
2. Open the Extensions view.
3. Click **Install Dev Extension**.
4. Select this repository folder.
5. Click **Rebuild** if Zed asks for it.

Important: the current extension scaffold does not add visible UI yet. The CLI-generated `.zed/tasks.json` is the working path today.

See [docs/INSTALL.md](./docs/INSTALL.md) for more details.

### Normal extension install

After this project is accepted into the Zed extensions registry, it should be installable from Zed’s Extensions view like other extensions. Until then, use **Install Dev Extension**.

Maintainers: see [docs/PUBLISHING.md](./docs/PUBLISHING.md) before submitting the project to the Zed registry.

## Repository layout

```text
.
├── .github/
│   ├── ISSUE_TEMPLATE/
│   └── pull_request_template.md
├── ARCHITECTURE.md
├── CHANGELOG.md
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── Cargo.lock
├── Cargo.toml
├── DISCLAIMER.md
├── LICENSE
├── README.md
├── ROADMAP.md
├── SECURITY.md
├── docs/
│   ├── INSTALL.md
│   ├── MVP-CHECKLIST.md
│   ├── PUBLISHING.md
│   ├── SPRINTS.md
│   └── ZED-LIMITATIONS.md
├── extension.toml
└── src/
    ├── bin/
    │   └── platformio-for-zed.rs
    ├── lib.rs
    └── platformio.rs
```

## Why task-first?

The official PlatformIO VS Code extension uses VS Code APIs for activity-bar views, status-bar toolbar items, task providers, command contributions, and debugger integration.

Zed’s extension APIs are different. This project deliberately starts with the part that works reliably in Zed today:

```text
platformio.ini -> Zed tasks -> pio -> clangd metadata
```

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the design rationale.

## Roadmap

See [ROADMAP.md](./ROADMAP.md).

Near-term priorities:

1. Better project task refresh flow.
2. Error parsing for PlatformIO output.
3. Environment and port selection workflow.
4. Debug integration investigation.

## Development

Run tests:

```bash
cargo test
```

Format:

```bash
cargo fmt
```

Build the CLI:

```bash
cargo build --release
```

Build the Zed Wasm component:

```bash
rustup target add wasm32-wasip2
cargo build --release --target wasm32-wasip2
```

## Sources

Primary references:

- [Zed extensions](https://zed.dev/docs/extensions)
- [Zed extension capabilities](https://zed.dev/docs/extensions/capabilities)
- [Developing Zed extensions](https://zed.dev/docs/extensions/developing-extensions)
- [Zed tasks](https://zed.dev/docs/tasks)
- [Zed C++ / clangd](https://zed.dev/docs/languages/cpp)
- [Zed debugger](https://zed.dev/docs/debugger)
- [PlatformIO IDE for VS Code docs](https://docs.platformio.org/en/latest/integration/ide/vscode.html)
- [PlatformIO `pio run`](https://docs.platformio.org/en/latest/core/userguide/cmd_run.html)
- [PlatformIO compilation database](https://docs.platformio.org/en/stable/integration/compile_commands.html)
- [PlatformIO VS Code extension repo](https://github.com/platformio/platformio-vscode-ide)

## License

MIT. See [LICENSE](./LICENSE).
