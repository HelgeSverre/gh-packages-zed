# Paper Development for Zed

Zed tooling for Java 21 plugins targeting Paper 1.21.11.

## Features

- `paper-plugin.yml` completion, hover, and diagnostics (validated against
  Paper's actual manifest parser rules, including undocumented keys such as
  `permissions`, `prefix`, and `provides`);
- MCP tools for the Zed agent panel: `create_paper_project` scaffolds a full
  Gradle Kotlin project, `inspect_paper_project` validates an existing one;
- Java snippets for common Paper APIs;
- generated `.zed/tasks.json` (build, clean, reobfuscate, run, debug) and
  `.zed/debug.json` (attach on port 5005) in every scaffolded project.

`paper-plugin.yml` uses Paper's plugin loader. This project does not generate
Bukkit-compatible `plugin.yml` files.

## Architecture

```
extension.toml                 Zed manifest: language, grammar, LSP + MCP registration
src/
  lib.rs                       WASM extension entry point (Extension trait)
  server_binary.rs             PATH -> cache -> GitHub-release binary resolution
crates/paper-core/src/
  lib.rs                       public API surface and shared version constants
  schema.rs                    verified paper-plugin.yml schema facts
  manifest/                    manifest validation (values, dependencies)
  project.rs + project/        project scaffolding and request validation
  templates.rs                 generated file templates
  doctor.rs                    read-only project health report
crates/paper-zed/src/
  main.rs                      mode dispatch: `paper-zed lsp` / `paper-zed mcp`
  lsp/                         language server (protocol glue + features)
  mcp/                         context server (tools + parameter types)
```

Zed runs language and context servers as separate native processes (WASM
extensions cannot serve LSP/MCP themselves), so the extension manages a
companion binary automatically: it looks for `paper-zed` on `PATH` (useful
during development), otherwise downloads the right build from this
repository's GitHub releases and caches it in the extension directory.

## Installation

Install it as a dev extension:

```sh
rustup target add wasm32-wasip1
cargo test --workspace
```

Then run `zed: install dev extension` and select this repository. For dev
installs, put a `paper-zed` build on `PATH` (keep exactly one copy -
`which -a paper-zed` should list a single path):

```sh
cargo install --path crates/paper-zed --locked
```

## Creating a project

Run the interactive wizard in a terminal (every prompt has a sensible
default):

```sh
paper-zed init ~/Projects/my-plugin
```

To launch it from Zed's command palette, add a task once to
`~/.config/zed/tasks.json` (`zed: open tasks`):

```json
{
  "label": "Paper: New project",
  "command": "paper-zed",
  "args": ["init"],
  "use_new_terminal": true
}
```

then `task: spawn` → `Paper: New project`. The Minecraft EULA is never
accepted implicitly - the wizard asks, and defaults to no.

If you use Zed's agent panel, the same scaffolding is also available to the
assistant as the `create_paper_project` / `inspect_paper_project` MCP tools;
an AI setup is entirely optional.

## Usage

- Open any `paper-plugin.yml` to get diagnostics, completion, and hover docs.
- Use the generated tasks: `Paper: Build`, `Paper: Clean`,
  `Paper: Reobfuscate`, `Paper: Run server`, `Paper: Run debug server`, and
  `Paper: Attach debugger` from `.zed/debug.json` (Gradle's `--debug-jvm`
  listens on port 5005 and suspends the server until the debugger attaches).

Project toolchain requirements (for the plugins you build, not for the
extension): JDK 21 and Gradle. If Gradle or Git are missing when a project is
scaffolded, generation still succeeds and reports warnings; tasks fall back to
`gradle` until you generate a wrapper.

## Scope

The current release is fixed to Minecraft/Paper 1.21.11, Java 21, Gradle
Kotlin DSL, paperweight-userdev, Shadow, and run-paper. Maven, Groovy DSL,
version selection, and Paper-aware Java inspections are not included.
