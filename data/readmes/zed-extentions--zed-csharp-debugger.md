# zed-csharp-debugger — C#/.NET debugging for Zed (netcoredbg)

A DAP debug adapter extension that lets Zed's built-in debugger debug C#/.NET
applications, inspired by the debugging workflow of [dotnet/vscode-csharp](https://github.com/dotnet/vscode-csharp) (MIT) — with **zero dependency on VSCode extensions**.
It runs [Samsung/netcoredbg](https://github.com/Samsung/netcoredbg) (MIT) with
`--interpreter=vscode` (stdio DAP) and reimplements the launch/attach wiring the VSCode C#
extension performs, against the Zed extension API. The netcoredbg binary is not
bundled in the repository — it is user-installed or downloaded automatically on first use.

> As of Zed's docs, C# debugging is unsupported ("Native C# debugging isn't available yet") —
> this extension fills that gap.

## Demo

Recorded in the real Zed editor (`v1.28.1`) by the [`Feature GIFs`](.github/workflows/demos.yml) workflow (`ci/scenarios.py`); DAP protocol traces verify `netcoredbg` (`3.2.0-1092`) breakpoint stops, local variable inspection, step-over execution, and `dotnet-build` locator resolution in each recording.

| Reference (`dotnet/vscode-csharp` / `Samsung/netcoredbg`) | `zed-csharp-debugger` (Zed) | Differences / Notes |
|---|---|---|
| VS Code C# Dev Kit / `vsdbg` Run & Debug sidebar and Launch configs | ![Breakpoint & Locals](docs/media/dap-breakpoint-locals.gif)<br>![Step Over & Continue](docs/media/dap-step-over.gif) | Runs MIT-licensed `Samsung/netcoredbg` via native Zed Debug Palette (`F4`), Variables/Frames/Console panels, `F9`/`F10`/`F5`, `.vscode/launch.json` `coreclr` bridging, and the `dotnet-build` task locator. |

### Breakpoint & Locals Inspection (`F9` + `F4`)

![Breakpoint & Locals](docs/media/dap-breakpoint-locals.gif)

### Step Over (`F10`) & Continue (`F5`)

![Step Over & Continue](docs/media/dap-step-over.gif)

### Build-then-Debug Task Locator (`dotnet-build`)

![Build-then-Debug Task Locator](docs/media/dap-build-locator.gif)

### Sample App Walkthrough (`examples/debug-sample`)

Recorded by `ci/scenarios_sample.py` against the bundled [`examples/debug-sample`](examples/debug-sample) app: a breakpoint inside `Multiply()` shows the call stack and arguments, `F10` steps over (`result` becomes `42`), and `F5` runs to exit.

![Sample: Breakpoint & Call Stack](docs/media/sample-breakpoint-callstack.gif)

![Sample: Step Over](docs/media/sample-step-over.gif)

![Sample: Continue to Exit](docs/media/sample-continue-exit.gif)

## 🚀 Editor Native Palette Experience (No Assistant Required)
Zed's headless WASM architecture runs debugging workflows through native Zed palettes via `netcoredbg` (stdio DAP):
* **Debug Palette (`F4` / `debugger: start`)**: Launch scenarios from `.zed/debug.json` or automatically bridged `.vscode/launch.json` `coreclr` configurations.
* **Process Picker Modal (`${ZED_PICK_PID}`)**: Interactively pick and attach to a running `.NET` / `dotnet` process without numeric parsing errors.
* **Native Debug Panel & Toolbar (`F5`, `F10`, `F11`)**: Inspect Locals, Watch expressions, Call Stack frames, and Debug Console output natively inside Zed.

## Feature Parity with `vscode-csharp` / `netcoredbg`

### Adapter Provisioning & Transport
- [x] stdio DAP wiring (`netcoredbg --interpreter=vscode`)
- [x] Binary resolution hierarchy: `dap.netcoredbg.binary` setting → `$PATH` lookup → automatic GitHub Releases download (`Samsung/netcoredbg`)
- [x] Session-memoized release resolution, versioned cache reuse, automatic cleanup of older cached versions, and offline cache fallback
- [x] Intel macOS (`osx-amd64`) automatic fallback to `3.1.3-1062`
- [x] `pipeTransport` wrapper execution (`docker exec`, `kubectl exec`, `ssh`) and TCP connect to `netcoredbg --server` (`tcp_connection`)
- [ ] Automatic binary download on Windows ARM64, 32-bit x86, and Linux musl *(No official `Samsung/netcoredbg` release asset published; build from source or set `dap.netcoredbg.binary`)*
- [ ] User-customizable adapter CLI `args` and `env` via Zed settings *(Blocked until Zed forwards `dap.<adapter>.args` / `env` to extensions — [issue #16](https://github.com/zed-extentions/zed-csharp-debugger/issues/16))*

### Launch & Attach Configuration (`vscode-csharp` Compatibility)
- [x] `request: "launch"` (`program`, `args`, `cwd` defaulting to worktree root, `env`, `stopAtEntry`)
- [x] `request: "attach"` (`processId` as integer, numeric string, or `"${ZED_PICK_PID}"` interactive picker)
- [x] `.vscode/launch.json` `coreclr` bridging (`${workspaceFolder}`, `${workspaceRoot}`, `${command:pickProcess}` → `${ZED_PICK_PID}`)
- [x] `Properties/launchSettings.json` profile merging (`launchSettingsProfile`, `launchSettingsFilePath`)
- [x] `envFile` dotenv loading (`KEY=VALUE`, comments, quotes, `export`) with precedence `env` > `launchSettings` > `envFile` > `DOTNET_ROOT`
- [x] `console: "internalConsole"` validation (rejects `integratedTerminal` / `externalTerminal` with attach workaround because `netcoredbg` lacks DAP `runInTerminal`)
- [x] Automatic `DOTNET_ROOT` discovery and environment injection from `dotnet` on `$PATH` (skipped for `pipeTransport` / `tcp_connection`)
- [x] Verbatim forwarding of `netcoredbg` / `vscode-csharp` fields (`justMyCode`, `enableStepFiltering` on launch, etc.)
- [x] Zed New-Process Modal support (Launch and Attach UI tabs via `dap_request_kind` and `dap_config_to_scenario`)
- [x] JSON Schema validation and autocompletion for `.zed/debug.json` (`debug_adapter_schemas/netcoredbg.json`)
- [ ] `sourceFileMap` and `targetArchitecture` runtime behavior *(Accepted in schema for `vscode-csharp` compatibility, ignored by `netcoredbg` upstream — [Samsung/netcoredbg#78](https://github.com/Samsung/netcoredbg/issues/78))*

### Build-then-Debug & Diagnostics
- [x] `dotnet build` and `dotnet test` (Microsoft.Testing.Platform) task debug locator (`debug_locators.dotnet-build`) — builds project and queries `dotnet msbuild -getProperty:TargetPath`
- [x] Forwarding of output-affecting CLI switches (`-c`, `-f`, `-r`, `--ucr`, `-o`, `--artifacts-path`, `-p:`) to MSBuild property evaluation
- [x] Adapter diagnostic flags via `logging` object (`engine` / `engineLogging` → `--engineLogging`, `enginePath`, `log` → `--log`, `logPath`) and graceful ignore of `vscode-csharp`-only logging keys
- [ ] Automatic startup-project selection when building a `.sln` / `.slnx` / `.slnf` solution *(MSBuild MSB1063 limit; task must target a project or run in a single-project directory)*
- [ ] Proprietary `vsdbg`-only features (Logpoints, Hit-count breakpoints, Hot Reload, Blazor WASM, symbol server UI options)

## Feature Support Matrix (`netcoredbg` vs `vscode-csharp` / `vsdbg`)

`netcoredbg` implements the MIT-licensed VS Code DAP protocol in [`src/protocols/vscodeprotocol.cpp`](https://github.com/Samsung/netcoredbg), which is a subset of Microsoft's proprietary `vsdbg` feature set ([`vscode-csharp` feature list](https://github.com/dotnet/vscode-csharp/blob/main/docs/debugger/.NET-Core-debugging-feature-list.md)):

| Feature / Option | Status in `netcoredbg` / Extension | Notes & Upstream References |
|---|---|---|
| `launch` (`program`, `args`, `cwd`, `env`, `stopAtEntry`, `justMyCode`, `enableStepFiltering`) | **Supported** | Forwarded to `netcoredbg`; `cwd` defaults to worktree root, `DOTNET_ROOT` auto-injected |
| `attach` (`processId`) | **Supported** | `netcoredbg` attach reads **only** `processId` (supports `${ZED_PICK_PID}`); `justMyCode`/`enableStepFiltering` are omitted from attach schema |
| Line & conditional breakpoints | **Supported** | `setBreakpoints` reads `line` and `condition` |
| Function breakpoints | **Supported** | Supported via `setFunctionBreakpoints` ([Samsung/netcoredbg#243](https://github.com/Samsung/netcoredbg/issues/243) notes response reports `line: 0`) |
| Exception filters & `exceptionInfo` | **Supported** | Filters are **exactly `all` and `user-unhandled`** (none enabled by default) |
| Variables & evaluation (`evaluate`, `setVariable`, `setExpression`) | **Supported** | Native Zed Variables / Watch / Debug Console evaluation |
| Extension-emulated options | **Supported** | `launchSettingsProfile`/`launchSettingsFilePath`, `envFile`, `console: "internalConsole"`, `pipeTransport`, `logging`, `.vscode/launch.json` bridge |
| Logpoints (`supportsLogPoints`) | **Unsupported** | Not implemented in `netcoredbg`; Zed greys out or a logpoint behaves as a plain breakpoint |
| Hit-count breakpoints (`supportsHitConditionalBreakpoints`) | **Unsupported** | `setBreakpoints` ignores `hitCondition` |
| `console` (`integratedTerminal` / `externalTerminal`) | **Unsupported** | `netcoredbg` never sends DAP `runInTerminal` (no stdin/TTY); rejected with attach recipe |
| `sourceFileMap`, `targetArchitecture` | **Ignored** | Forwarded verbatim for `launch.json` compatibility; `netcoredbg` ignores both ([Samsung/netcoredbg#78](https://github.com/Samsung/netcoredbg/issues/78), [#24](https://github.com/Samsung/netcoredbg/issues/24)) |
| `symbolOptions`, `sourceLinkOptions`, `requireExactSource`, `suppressJITOptimizations`, `expressionEvaluationOptions`, `terminateChildProcesses`, `processName` | **Unsupported** | Proprietary `vsdbg` / `vscode-csharp` options; ignored by `netcoredbg` |
| Hot Reload during debug | **Unsupported** | Only present in `NCDB_DOTNET_STARTUP_HOOK` custom builds with no DAP surface |
| Blazor WASM & child-process debugging | **Unsupported** | Proprietary `vsdbg` / unsupported in `netcoredbg` |

> Zed extension API / UI limitations (adapter CLI `args`/`env` settings, `launchBrowser`, `preLaunchTask` importer, etc.) are tracked in [issue #16](https://github.com/zed-extentions/zed-csharp-debugger/issues/16).

### Known Zed limitations & workarounds

These `vscode-csharp` features cannot be built until Zed adds extension API or UI support. They are tracked in [issue #16](https://github.com/zed-extentions/zed-csharp-debugger/issues/16); the table lists what to do in the meantime.

| `vscode-csharp` feature | Limitation (Zed side) | Workaround |
|---|---|---|
| User adapter `args` / `env` (`dap.netcoredbg.args` / `env`) | Zed does not forward these settings to extensions (`extension_dap_adapter.rs`: `TODO support user args/env in the extension API`) | Set `args`, `env`, `envFile` or `launchSettingsProfile` **per scenario** in `.zed/debug.json` (these apply to the debuggee, not to the `netcoredbg` CLI). Adapter diagnostics: use the `logging` object. Custom adapter path: `dap.netcoredbg.binary` |
| `serverReadyAction` / `launchBrowser` | Extensions get no hook on debuggee output | Open the URL manually (e.g. `http://localhost:5000`, taken from `applicationUrl` / `ASPNETCORE_URLS`). `launchBrowser` in `launchSettings.json` is ignored (FR-22) |
| `preLaunchTask` / `postDebugTask` in `launch.json` | Zed's `launch.json` importer does not map them | Use `"build"` in `.zed/debug.json` for pre-launch (see [Build-then-debug](#build-then-debug-with-a-dotnet-build-task-locator)); there is no post-debug equivalent, run cleanup as a normal Zed task |
| `${command:pickProcess}` | Zed's own `launch.json` importer only maps `pickMyProcess` | This extension's bridge (FR-21) maps `${command:pickProcess}` to `${ZED_PICK_PID}` when it reads `.vscode/launch.json`; in `.zed/debug.json` write `"processId": "${ZED_PICK_PID}"` directly |
| `coreclr` type mapping in the importer | Zed's importer does not map `coreclr` to an adapter | Use the extension's `.vscode/launch.json` bridge (FR-21), or copy the configuration into `.zed/debug.json` with `"adapter": "netcoredbg"` |
| `checkForDevCert` | `process:exec` can run the check, but extensions have no notification API (only a hard error) | Run `dotnet dev-certs https --check` (and `--trust`) once in a terminal before debugging HTTPS apps |
| Default exception-filter selection | Filter state lives in the debug session; no scenario-level setting | Enable `all` / `user-unhandled` from the Breakpoints panel at the start of each session |

> No matching upstream `zed-industries/zed` issues were found when this table was written (2026-11-19); links will be added to issue #16 as they are filed or discovered.

## Platform Coverage & Manual Install Notes

Verified release assets from `Samsung/netcoredbg` (`3.2.0-1092` latest, `3.1.3-1062` Intel macOS fallback):

| Platform | Asset | Auto-Download | Verified Version / Notes |
|---|---|---|---|
| `linux-amd64` | `netcoredbg-linux-amd64.tar.gz` | Yes | Latest (`3.2.0-1092`), requires glibc |
| `linux-arm64` | `netcoredbg-linux-arm64.tar.gz` | Yes | Latest (`3.2.0-1092`), requires glibc |
| `osx-arm64` | `netcoredbg-osx-arm64.zip` | Yes | Latest (`3.2.0-1092`); see Gatekeeper note below for manual installs |
| `osx-amd64` | `netcoredbg-osx-amd64.tar.gz` | Yes | **Pinned fallback `3.1.3-1062`** (`3.2.0` dropped `osx-amd64`; [Samsung/netcoredbg#235](https://github.com/Samsung/netcoredbg/issues/235)) |
| `win64` | `netcoredbg-win64.zip` | Yes | Latest (`3.2.0-1092`) |
| `win-arm64` | — | No | No upstream release asset; [build from source](https://github.com/Samsung/netcoredbg#building-from-source) and set `dap.netcoredbg.binary` |
| Linux `musl` (Alpine) | — | No | No upstream musl asset ([Samsung/netcoredbg#201](https://github.com/Samsung/netcoredbg/issues/201)); build from source in container/musl and add to `PATH` or `dap.netcoredbg.binary` |
| 32-bit `x86` | — | No | No upstream release asset; unsupported-platform error links to build-from-source docs |

### Per-OS Troubleshooting
- **macOS Gatekeeper quarantine**: When installing `netcoredbg` manually on macOS (or if macOS blocks an unsigned binary), remove the quarantine attribute (`xattr -d com.apple.quarantine` on the binary, or `-dr` recursively on the directory):
  ```bash
  xattr -dr com.apple.quarantine /path/to/netcoredbg
  ```
  See also [`Debugging-Sandboxed-Processes-on-OSX.md`](https://github.com/dotnet/vscode-csharp/blob/main/docs/debugger/Debugging-Sandboxed-Processes-on-OSX.md).
- **Debugging x64 processes on ARM64 (Apple Silicon / Windows ARM64)**: An x64 debuggee running under Rosetta 2 or Windows x64 emulation requires an **x64** `netcoredbg` binary (`dap.netcoredbg.binary`). See [`Debugging-x64-processes-on-an-arm64-computer.md`](https://github.com/dotnet/vscode-csharp/blob/main/docs/debugger/Debugging-x64-processes-on-an-arm64-computer.md).
- **Unsupported platforms (`win-arm64`, Linux `musl`, `x86`)**: Follow [Samsung's build-from-source instructions](https://github.com/Samsung/netcoredbg#building-from-source) and configure `{ "dap": { "netcoredbg": { "binary": "/path/to/netcoredbg" } } }`. The automatic-download error points to the same documentation.

## Prerequisites

1. **.NET SDK** — to build your debug target
2. **netcoredbg** — optional to set up by hand:
   - On first use without a manual install, the extension **automatically downloads** the
     latest netcoredbg release from GitHub Releases (see below)
   - Manual alternatives: download from
     [Releases](https://github.com/Samsung/netcoredbg/releases) and add it to PATH, build
     from source (see the linked docs), or use a package manager (e.g. `brew install netcoredbg`)

Verify with: `netcoredbg --version`

### Automatic adapter download (first use)

Binary resolution order:

1. **`dap.netcoredbg.binary` setting** (always wins — see below)
2. **`PATH`** lookup (`netcoredbg` / `netcoredbg.exe`)
3. **Automatic download** from `Samsung/netcoredbg` GitHub Releases:
   - The latest release (assets required, no pre-releases) is resolved via the extension API
     once per Zed session (the resolved binary is memoized, so the rate-limited GitHub API is
     not queried again until Zed restarts); the asset matching your platform is downloaded
     and extracted into the **extension working directory**: the binary ends up at
     `netcoredbg/<version>/netcoredbg/netcoredbg[.exe]`
   - An already extracted version is reused without downloading; after a successful
     download of a new version, older version directories are deleted
   - Set the environment variable `ZED_NETCOREDBG_FORCE_UPDATE=1` to force a re-download
     during development
   - A compile-time `VERSION_PIN` constant in `src/download.rs` (`None` by default) can pin a
     specific release tag instead of following the latest
   - **Intel Macs**: netcoredbg 3.2.0 ships no `osx-amd64` asset, so macOS x86_64 falls back
     to `3.1.3-1062`, the newest release that has one (the extension API can only fetch the
     latest release or a named tag, so this tag is a known constant)
   - Windows ARM64 and 32-bit x86 have no published asset at all — install manually
4. **Fallbacks** — when the release lookup or the download fails (offline, HTTP error,
   missing asset), the newest already cached version is used. Only when nothing is cached
   is the instructive install error shown (combined with the download error).

The setting override takes precedence over everything:

```json
{ "dap": { "netcoredbg": { "binary": "/path/to/netcoredbg" } } }
```



## Usage

`.zed/debug.json`:

```json
[
  {
    "label": "Debug my app",
    "adapter": "netcoredbg",
    "request": "launch",
    "program": "bin/Debug/net8.0/MyApp.dll",
    "args": ["--verbose"],
    "stopAtEntry": false
  }
]
```

Attach to a running process:

```json
[
  {
    "label": "Attach to PID",
    "adapter": "netcoredbg",
    "request": "attach",
    "processId": 4242
  }
]
```

- `cwd` defaults to the project root; unknown fields are forwarded to netcoredbg verbatim
  (vscode-csharp launch.json compatibility).
- When `DOTNET_ROOT` is not set, it is injected automatically from the detected `dotnet`
  location (prevents runtime discovery failures on Windows).
- Point Zed at a specific binary via settings (overrides PATH and the automatic download):
  `{ "dap": { "netcoredbg": { "binary": "/path/to/netcoredbg" } } }`

### Build-then-debug with a `dotnet build` task (locator)

`dotnet build` Zed tasks become debug scenarios automatically — build first, debug
after (mirrors the VSCode C# extension's pre-launch build). Define a task in
`.zed/tasks.json` (`"command": "dotnet build"` as one string and `dotnet.exe` work too):

```json
[
  { "label": "build MyApp", "command": "dotnet", "args": ["build"], "cwd": "$ZED_WORKTREE_ROOT" }
]
```

Then trigger Zed's "debug" action on the task (or pick the converted scenario from the
debugger's task list). The extension:

1. attaches the build task to a launch scenario (locator phase 1, `dap_locator_create_scenario`)
2. lets Zed run `dotnet build` (build failures stop the session before it starts)
3. after a successful build, asks MSBuild where the output is:
   `dotnet msbuild <target> -getProperty:TargetPath;...` (locator phase 2,
   `run_dap_locator`; evaluation only, nothing is rebuilt) — requires **.NET SDK 8+**
4. launches MSBuild's `TargetPath` through netcoredbg (`dotnet <dll>`) with the project
   directory as `cwd`

Notes and constraints:

- Zed only runs debug locators on `.zed/tasks.json` tasks when the active editor buffer's language has a debugger configured (for example, `"languages": { "C#": { "debuggers": ["netcoredbg"] } }` or top-level `"debuggers": ["netcoredbg"]` in Zed `settings.json`)
- The task must have an absolute `cwd` (`$ZED_WORKTREE_ROOT` or an absolute path); without
  an explicit project argument, that directory must contain exactly one project file
- **Solutions are not supported as the build target**: MSBuild cannot report a solution's
  output (MSB1063). If your repository root only has a `.sln`, point the task at the
  project to debug (`"args": ["build", "src/App/App.csproj"]`) or set the task `cwd` to the
  project directory. The locator does not guess a project from the solution, since most
  solutions contain several (app + tests)
- Output-affecting switches are forwarded to the query exactly like the `dotnet` CLI
  forwards them: `-c/--configuration`, `-f/--framework`, `-r/--runtime`, `--ucr`,
  `-o/--output`, `--artifacts-path`, `-p:/-property:/--property:` (relative paths are
  resolved against the task `cwd`). Add `-f <tfm>` for multi-target projects.
  `-a/--arch` and `--os` are rejected (their runtime identifier depends on the host SDK);
  use `-r <rid>` instead
- An explicit `program` in your debug configuration always takes precedence over the
  locator-resolved path (Zed merges your config over the locator output)
- The locator runs `dotnet msbuild` through Zed's extension process API; the extension
  declares the `process:exec` capability for `dotnet msbuild **` in `extension.toml`
- Debug configs without an explicit `program` only work through this locator; a debug.json
  entry with `"request": "launch"` and no `program` on its own still errors

### Diagnostics (`logging`)

The optional `logging` object enables netcoredbg's diagnostic output. It is translated into
netcoredbg *adapter* command line flags (verified against netcoredbg's `src/main.cpp`) and
stripped from the configuration forwarded over DAP:

```json
[
  {
    "label": "Debug my app (engine log)",
    "adapter": "netcoredbg",
    "request": "launch",
    "program": "bin/Debug/net8.0/MyApp.dll",
    "logging": { "engine": true }
  }
]
```

| Key | Type | netcoredbg flag | Where the log lands |
|---|---|---|---|
| `engine` | bool | `--engineLogging` | Zed's debug console (reported as `console` output events) |
| `enginePath` | string | `--engineLogging=<path>` | The given file (implies `engine`) |
| `log` | bool | `--log` | netcoredbg's internal log, `<temp dir>/<executable name>.<pid>.log` |
| `logPath` | string | `--log=<path>` | The given file, or `"stderr"` (implies `log`; `"stdout"` is rejected — it would corrupt the DAP stream) |

To watch engine output: start a debug session with `"logging": { "engine": true }` and open
Zed's debug console — engine and DAP activity is reported there.

**Log directories must exist.** Relative `enginePath`/`logPath` values resolve against the
worktree root (the adapter's working directory). netcoredbg does not create missing
directories: if the file cannot be opened, the log is silently dropped (`"logs/engine.log"`
needs an existing `logs/` directory).

**vscode-csharp compatibility.** A `logging` object copied from a VS Code `launch.json` keeps
working: `engineLogging: true` maps to `--engineLogging` (same as `engine`), and the other
vscode-csharp keys — `exceptions`, `moduleLoad`, `programOutput`, `browserStdOut`,
`elapsedTiming`, `threadExit`, `processExit`, `consoleUsageMessage`, `diagnosticsLog` — have
no netcoredbg equivalent and are ignored. Any other key, or a wrong type for a key this
extension acts on, is rejected before the session starts: the object is consumed by the
extension (never forwarded), so a typo would otherwise silently disable the logging you asked
for.

> Note: netcoredbg's flag is spelled `--engineLogging` (camelCase); `--engine_logging` is
> rejected by netcoredbg as an unknown option.

`sourceFileMap` is accepted by the schema only so vscode-csharp configurations validate:
**netcoredbg ignores it** (it has no source file mapping). `targetArchitecture` is not
supported by netcoredbg either; like any unknown field it is forwarded verbatim and ignored.

### `launchSettings.json` profiles

Load ASP.NET Core / .NET `Properties/launchSettings.json` profiles into launch configurations using `launchSettingsProfile` and/or `launchSettingsFilePath`:

```json
[
  {
    "label": "Api (https)",
    "adapter": "netcoredbg",
    "request": "launch",
    "program": "src/Api/bin/Debug/net8.0/Api.dll",
    "launchSettingsFilePath": "src/Api/Properties/launchSettings.json",
    "launchSettingsProfile": "https"
  }
]
```

- When `launchSettingsProfile` is given without `launchSettingsFilePath`, the extension reads `Properties/launchSettings.json` in the worktree.
- When `launchSettingsProfile` is omitted and `launchSettingsFilePath` is given, it selects the first profile with `"commandName": "Project"`.
- JSONC comments and trailing commas are tolerated; `launchBrowser` is ignored; `launchSettings*` keys are stripped before forwarding to `netcoredbg`.
- Mapping & precedence (explicit config always wins):
  - `environmentVariables` → `env` (explicit `env` keys take precedence)
  - `applicationUrl` → `env["ASPNETCORE_URLS"]` (if absent)
  - `commandLineArgs` → `args` (if explicit `args` is absent)
  - `workingDirectory` → `cwd` (if absent/blank)

### Dotenv (`envFile`)

Load `KEY=VALUE` environment variables from a worktree-relative `.env` file:

```json
[
  {
    "label": "Launch with .env",
    "adapter": "netcoredbg",
    "request": "launch",
    "program": "bin/Debug/net8.0/MyApp.dll",
    "envFile": "${ZED_WORKTREE_ROOT}/.env"
  }
]
```

- Supports blank lines, `#` comments, optional `export ` prefixes, and matching single or double quotes (`envFile` is stripped before forwarding).
- Precedence: **explicit `env` > `launchSettings` > `envFile` > `DOTNET_ROOT` hint**.
- File must live inside the worktree; `${env:VAR}` interpolation inside `.env` is not performed.

### Interactive console apps (`console` / `stdin`)

`netcoredbg` never sends the DAP `runInTerminal` reverse request: it spawns the debuggee itself and forwards stdout/stderr over DAP `output` events, so there is **no stdin and no TTY** in `internalConsole`.

- `"console": "internalConsole"` is accepted (and stripped).
- `"console": "integratedTerminal"` or `"externalTerminal"` is rejected with an actionable error explaining this limit.
- **Recipe for console apps that read `stdin`**:
  1. Start your app from a Zed terminal or `.zed/tasks.json`:
     ```json
     [
       { "label": "run console app", "command": "dotnet", "args": ["run"] }
     ]
     ```
  2. Attach using Zed's process picker (`${ZED_PICK_PID}`) in `.zed/debug.json`:
     ```json
     [
       {
         "label": "Attach to console app",
         "adapter": "netcoredbg",
         "request": "attach",
         "processId": "${ZED_PICK_PID}"
       }
     ]
     ```
     *(Note: breaking on the very first line before attach is not possible with this workaround.)*

### Remote & container debugging (`pipeTransport` & TCP `--server`)

Debug processes inside containers or connect to an already-running `netcoredbg --server` instance:

- **Container / external command (`pipeTransport`)** — spawns `pipeProgram` with `pipeArgs + [debuggerPath, "--interpreter=vscode"] + logging_args`, skipping local binary resolution and local `DOTNET_ROOT` injection:
  ```json
  [
    {
      "label": "Attach in Docker",
      "adapter": "netcoredbg",
      "request": "attach",
      "processId": 1,
      "pipeTransport": {
        "pipeProgram": "docker",
        "pipeArgs": ["exec", "-i", "myapp"],
        "debuggerPath": "/vsdbg/netcoredbg"
      }
    }
  ]
  ```
- **TCP connect (`netcoredbg --server=4711`)** — when `tcp_connection` is set, the extension resolves it via `resolve_tcp_template` and returns `command: None` so Zed connects directly over TCP:
  ```json
  [
    {
      "label": "Attach via netcoredbg --server",
      "adapter": "netcoredbg",
      "request": "attach",
      "processId": 1,
      "tcp_connection": { "port": 4711 }
    }
  ]
  ```
- **Limitations**: `netcoredbg` ignores `sourceFileMap`, so stack frames show container/remote paths unless source paths match; `${ZED_PICK_PID}` is local-only. For **SSH** workspaces, use **Zed's native Remote Development**, which runs the extension and `netcoredbg` directly on the remote host.

### Test debugging (`dotnet test`)

`netcoredbg` does not debug child processes, so launching `dotnet test` directly never reaches the test host. Choose the recipe matching your test runner:

- **Microsoft.Testing.Platform (MTP)** (xUnit v3, MSTest / NUnit MTP runners — compiles directly to an executable test `.dll`):
  - **Option A — Direct launch** in `.zed/debug.json` (recommended for passing `--filter-method`):
    ```json
    [
      {
        "label": "Debug single MTP test",
        "adapter": "netcoredbg",
        "request": "launch",
        "program": "tests/T/bin/Debug/net8.0/T.dll",
        "args": ["--filter-method", "MyNamespace.MyTests.MyTest"]
      }
    ]
    ```
  - **Option B — `dotnet test` task locator**: add a `dotnet test` task in `.zed/tasks.json` (e.g. `"command": "dotnet", "args": ["test", "tests/T/T.csproj"]`, `"cwd": "$ZED_WORKTREE_ROOT"`) and trigger Zed's debug action on it. The locator rewrites the pre-launch build step to `dotnet build` (stripping `--filter`, `--no-build`, `-- ...` so failing tests do not abort the build), resolves `TargetPath`, and launches the MTP executable.
- **VSTest** (classic `Microsoft.NET.Test.Sdk` projects):
  1. Run in a Zed terminal with `VSTEST_HOST_DEBUG=1`:
     ```bash
     VSTEST_HOST_DEBUG=1 dotnet test --filter FullyQualifiedName~MyTest
     ```
     VSTest pauses and prints the `testhost` process ID (`Process Id: <pid>`).
  2. Start an attach scenario with `"processId": "${ZED_PICK_PID}"` (or the printed PID) to attach to `testhost` and hit your breakpoints.

## Installation (dev extension)

Zed command palette → `zed: install dev extension` → select this directory

## Manual verification procedure (G5)

1. `dotnet new console -o debug-sample && cd debug-sample && dotnet build`
2. Add a launch config to `.zed/debug.json` (`program`: the built `debug-sample.dll` path)
3. Set a breakpoint → start debugging → verify breakpoint hits, stepping and variables
4. Verify `stopAtEntry: true` breaks immediately on entry
5. Attach to a running `dotnet` process and verify the connection
6. Plain `.zed/debug.json` launch without locator: with only the launch config from step 2
   (no `build` field, no build task), start the scenario from the debug panel → the session
   starts (no "Zed cannot determine how to run this debug scenario" error)
7. New-process modal → Attach tab → pick the running `debug-sample` process → the session
   starts; then the Launch tab with "Stop on entry" checked → it breaks on entry
   (`stop_on_entry` → `stopAtEntry`)
8. Remove netcoredbg from PATH, start debugging → verify netcoredbg is auto-downloaded from
    GitHub Releases and the session starts (fresh machine with `dotnet` only); the binary is
    at `<extension work dir>/netcoredbg/<version>/netcoredbg/netcoredbg[.exe]` (Zed's
    extension work dir: `~/Library/Application Support/Zed/extensions/work/csharp-debugger`
    on macOS, `~/.local/share/zed/extensions/work/csharp-debugger` on Linux,
    `%LOCALAPPDATA%\Zed\extensions\work\csharp-debugger` on Windows)
9. Start a second session in the same Zed instance → it starts without a new download or
    GitHub API call (memoized). Restart Zed and start a session → the cached version is
    reused (directory mtime unchanged)
10. Go offline, restart Zed, start a session → the cached version is still used. Then delete
    the `netcoredbg/` cache directory (still offline, restart Zed) → the instructive install
    error, prefixed with the download failure, is shown
11. Create a dummy older version directory (e.g. `netcoredbg/0.0.1/`) and set
    `ZED_NETCOREDBG_FORCE_UPDATE=1` → after the re-download only the current version
    directory remains
12. (Intel Mac only) the session starts with netcoredbg `3.1.3-1062`
13. Set `dap.netcoredbg.binary` → verify the override wins over PATH and the cache
14. Add `"logging": { "engine": true }` to the launch config → start debugging → verify engine
    output appears in Zed's debug console; then set `"enginePath": "logs/engine.log"` with an
    existing `logs/` directory and verify the log file is written instead (without the
    directory, no file appears and the session still runs)
15. Paste a vscode-csharp `logging` object (`{"moduleLoad": false, "engineLogging": true}`) →
    the session starts and engine output appears; `{"engin": true}` → the session is refused
    with an error naming `logging.engin`
16. Edit `.zed/debug.json` and confirm schema completions/validation for `logging` and that
    `sourceFileMap` is described as ignored by netcoredbg
17. Locator: add a `dotnet build` task (label it, `cwd: $ZED_WORKTREE_ROOT`) to
    `.zed/tasks.json`, remove `program` from the launch config, set a breakpoint, then run
    the task's debug action → verify the build runs first, then the session starts on the
    `bin/Debug/<tfm>/<app>.dll` reported by MSBuild and the breakpoint hits. Repeat with
    `"command": "dotnet build"` (single string) and with `-c Release -o out` /
    `-r <rid>` in the task args → the session launches the matching output
18. Locator failure paths: break the code (compile error) → the build failure stops the
    session with an actionable error; add `<TargetFrameworks>net8.0;net9.0</TargetFrameworks>`
    without `-f` → the multi-target error names the `-f <tfm>` remedy; run the task from a
    directory that only has a `.sln` → the error asks to point the task at a project
19. Locator precedence: keep `program` in the launch config alongside the task → verify the
    explicit `program` wins over the locator-resolved path
20. `launchSettings.json` + `envFile`: add `"launchSettingsProfile"`, `"envFile"`, and `"env"` on a
    launch config → verify `env > launchSettings > envFile > DOTNET_ROOT` precedence and that
    `ASPNETCORE_URLS` / `args` / `cwd` are populated from the selected profile
21. `console` workaround: verify `"console": "integratedTerminal"` returns the `runInTerminal`
    error with `${ZED_PICK_PID}` guidance, and verify launching a `stdin`-reading console app in
    a Zed terminal + attaching via `"processId": "${ZED_PICK_PID}"` hits breakpoints
22. Container / TCP (`pipeTransport` / `--server`): attach to a running `.NET` process inside a
    container with `"pipeTransport"` (`docker exec -i <container>`) and verify breakpoints/locals;
    start `netcoredbg --interpreter=vscode --server=4711` and connect via `tcp_connection`
23. `dotnet test`: launch an MTP test executable (directly with `--filter-method` and via a
    `dotnet test` task locator) and verify breakpoints hit; run `VSTEST_HOST_DEBUG=1 dotnet test`
    and attach via `${ZED_PICK_PID}`
24. Capability limits & schema: verify exception filters `all` and `user-unhandled`, conditional
    breakpoints, and function breakpoints work; edit `.zed/debug.json` with `"request": "attach"`
    and verify `justMyCode` / `enableStepFiltering` are absent from attach schema completions

> Steps 4, 5 (attach by PID; the process-picker modal of step 7 stays manual) and 18 are also automated against a real Zed UI by `ci/g5_checks.py`
> (run by the "Feature GIFs" workflow after `ci/scenarios.py`); they assert on the recorded
> DAP traffic, not only on screen text.

> The schema parts of steps 16 and 24 (launch-only options absent from attach, `console` enum,
> `sourceFileMap` documented as ignored, `$ref` integrity) are unit-tested (`schema_tests` in
> `src/lib.rs`, FR-14); only the in-editor completion UI itself stays manual.

> The full locator flow needs a live Zed session (task conversion, task spawning,
> `process:exec` capability checks and variable substitution are host-side); it cannot be
> verified headlessly.

## Development

```bash
cargo test                                      # 166 unit tests (host)
cargo build --target wasm32-wasip2 --release    # extension WASM build
```

- `src/resolve.rs` — binary resolution, arguments, DOTNET_ROOT hint (pure logic)
- `src/download.rs` — release asset selection, cache layout, version comparison (pure logic)
- `src/locator/` — `dotnet build` task matching, MSBuild query/output parsing, program
  resolution (pure logic)
- `src/config/` — launch/attach config normalization and validation (pure logic, serde_json)
- `src/lib.rs` — the Zed Extension touchpoints: `get_dap_binary` (+ GitHub Releases
  download), `dap_request_kind`, `dap_config_to_scenario` and the locator hooks

### Scenario tests against the built `.wasm` (`harness-tests/`)

`harness-tests/` is a standalone package (not a dependency of the extension) that runs
the **built** extension component against a fake Zed host (GitHub Releases, downloads
extracted the way Zed does, platform, PATH) and automates G5 steps 6, 8–10 and 12–15
without opening Zed: first-use download, reuse within a session, offline cache, the
Intel Mac fallback, user path / PATH precedence, logging flags and request kind. It
depends on the `zed-ext-harness` crate, which is currently kept locally and must be
checked out next to this repository (`../zed-ext-harness`), so it is not part of CI yet.

```bash
cargo build --target wasm32-wasip2 --release
cargo test --manifest-path harness-tests/Cargo.toml   # 13 scenarios
```

Set `ZED_DEBUG_ADAPTER_WASM=<path>` to run the scenarios against another build.

Plan: [PLAN.md](PLAN.md) · Requirements: [REQUIREMENTS.md](REQUIREMENTS.md) · Architecture: [ARCHITECTURE.md](ARCHITECTURE.md)

## License

MIT — This extension is an independent Rust/WASM implementation inspired by [dotnet/vscode-csharp](https://github.com/dotnet/vscode-csharp) (MIT) and built around [Samsung/netcoredbg](https://github.com/Samsung/netcoredbg) (MIT); it ships neither their binaries nor their sources.
