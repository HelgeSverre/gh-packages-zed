<p align="center"><img src="assets/logo.png" width="128" height="128" alt="lunaut logo"></p>

<h1 align="center">lunaut</h1>

> **If you can support author:** [Place](https://www.roblox.com/games/104318394065422/donating)

[![VS Code Marketplace](https://vsmarketplacebadges.dev/version-short/theexe.lunaut-luau.svg?label=VS%20Code%20Marketplace)](https://marketplace.visualstudio.com/items?itemName=theexe.lunaut-luau) [![Installs](https://vsmarketplacebadges.dev/installs-short/theexe.lunaut-luau.svg)](https://marketplace.visualstudio.com/items?itemName=theexe.lunaut-luau) [![Release](https://img.shields.io/github/v/release/TheExeDEV/lunaut)](https://github.com/TheExeDEV/lunaut/releases/latest)

[![CI](https://github.com/TheExeDEV/lunaut/actions/workflows/ci.yml/badge.svg)](https://github.com/TheExeDEV/lunaut/actions/workflows/ci.yml) [![Release](https://github.com/TheExeDEV/lunaut/actions/workflows/release.yml/badge.svg)](https://github.com/TheExeDEV/lunaut/actions/workflows/release.yml) [![Coverage](https://github.com/TheExeDEV/lunaut/actions/workflows/coverage.yml/badge.svg)](https://github.com/TheExeDEV/lunaut/actions/workflows/coverage.yml) [![codecov](https://codecov.io/gh/TheExeDEV/lunaut/graph/badge.svg)](https://codecov.io/gh/TheExeDEV/lunaut)

A language server for Luau and Roblox, written in C++ on top of the official Luau analysis library.

lunaut is your astronaut in Luau code: it checks types and lint while you type, completes names, shows types on hover and jumps to definitions. It reads the same `.luaurc` as the Luau CLI, loads `.d.luau` definition files in the order you choose, follows Rojo projects through the sourcemap and keeps Luau FFlags in sync with Roblox Studio.

**The server**

- Diagnostics (type errors, syntax errors, lint), hover, completion, go to definition, document symbols, signature help
- Find all references (`Shift+F12`) and rename (`F2`) across files, for locals and module members
- Inlay hints for variable types, parameter names, parameter and return types, each switchable in settings
- Documentation in hover, completion and signature help: Roblox and Luau API docs and Moonwave comments in your code
- Comments from any `.luau` file, including `.d.luau` definitions, for functions, type declarations, intersections and table fields
- Click a type name to jump to its declaration, or to the type body in `type Name = ...`
- Type statistics: totals, origins, type kinds, subtype relations and the type hierarchy, over LSP and from the CLI
- Analyzer plugins: load a custom Luau fork at runtime, with an explicit report when the plugin is incompatible
- Auto-imports: modules and Roblox services that are not required yet, with the `require` or `GetService` line added for you
- Semantic highlighting, quick fixes, a color picker for `Color3` and folding with `--#region`
- Reads luau-lsp settings (`luau-lsp.*`) as they are, so a project set up for luau-lsp works without changes
- Both Luau type solvers: the old one by default, the new one with `lunaut.fflags.enableNewSolver`
- `require` by string (`./`, `../`, `@self`, aliases from `.luaurc` and `.config.luau`) and by instance (`script.Parent.X`, `game:GetService("X")`, `:WaitForChild("X")`)
- Completion inside `require("...")`: aliases, folders and modules as you type the path
- A base `.luaurc` for the whole project (`lunaut.baseLuaurc`) under every other config
- Diagnostics follow dependents: change a module and every open file that requires it is checked again
- One static executable, no runtime to install

**FFlags**

- Every non-experimental `Luau*` flag is on by default, like in luau-lsp
- Values synced with the current Roblox Studio build, cached for a day, used offline
- Overrides from `.vscode/settings.json` and `--flag:Name=Value`, each value shows where it came from
- Every flag compiled into Luau is picked up by itself, and the VS Code settings schema lists all of them, so flag names complete in `lunaut.fflags.override`

**Definition files**

- Any number of `.d.luau` files, from settings, globs, the command line or found in the workspace
- A load priority for every file: higher loads first, so base types are ready before the files that extend them
- Priority in settings, or right in the file with `--!priority 50`
- Roblox API definitions downloaded for the security level you pick

**Rojo**

- Reads `sourcemap.json`, regenerates it with `rojo sourcemap` when files are added, removed or the project changes
- Gives `script`, `game` and services real instance types with children from the sourcemap
- Works without Rojo installed when a sourcemap is already there

---

## Contents

1. [Installation](#installation)
2. [Quick start](#quick-start)
3. [VS Code](#vs-code)
4. [Other editors](#other-editors)
5. [Settings](#settings)
6. [FFlags](#fflags)
7. [Definition files and priorities](#definition-files-and-priorities)
8. [Analyzer plugins](#analyzer-plugins)
9. [Rojo](#rojo)
10. [Editor features](#editor-features)
11. [References and rename](#references-and-rename)
12. [Requires and .luaurc](#requires-and-luaurc)
13. [.lunaut-declare](#lunaut-declare)
14. [Command reference](#command-reference)
15. [Custom LSP methods](#custom-lsp-methods)
16. [Environment variables](#environment-variables)
17. [Tests](#tests)
18. [Luau updates](#luau-updates)
19. [Releasing](#releasing)
20. [Building from source](#building-from-source)
21. [Source layout](#source-layout)
22. [Limitations](#limitations)
23. [Acknowledgements](#acknowledgements)
24. [License](#license)

---

## Installation

**VS Code:** install [Lunaut from the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=theexe.lunaut-luau), or run `ext install theexe.lunaut-luau` in Quick Open (`Ctrl+P`). The extension carries the server for Windows, Linux and macOS, nothing else is needed.

**Any editor:** one script for every system. It detects Windows, Linux or macOS and the processor (x64 or arm64) by itself.

**Windows** (PowerShell):

```powershell
irm https://raw.githubusercontent.com/TheExeDEV/lunaut/main/installers/install | iex
```

**Linux, macOS, Git Bash:**

```bash
curl -fsSL https://raw.githubusercontent.com/TheExeDEV/lunaut/main/installers/install | sh
```

Both lines run the same file. It lists the editors it finds and asks where to install lunaut:

```
Where should lunaut be installed?
  1) VS Code
  2) Zed
  3) Neovim
  4) Terminal (the lunaut command on PATH)
Type numbers separated by spaces, or press Enter for all:
```

| Choice | What it does |
| --- | --- |
| VS Code, VS Code Insiders, Cursor, Windsurf, VSCodium | installs `lunaut.vsix`, which carries its own server |
| Zed | reminds you to install the **Lunaut** extension from Zed's Extensions panel; the extension downloads the newest server itself |
| Neovim | puts the server on `PATH` and copies [`lunaut.lua`](editors/neovim/lunaut.lua) into `nvim/plugin` |
| Helix | puts the server on `PATH` and writes [`languages.toml`](editors/helix/languages.toml) when you have none yet |
| Roblox Studio | downloads [`LunautPlugin.rbxm`](#lunaut-plugin-for-roblox-studio) into Studio's plugin folder (Windows and macOS) |
| Terminal | puts the server into `%LOCALAPPDATA%\lunaut\bin` (Windows) or `~/.lunaut/bin` and adds that folder to `PATH` |

Without a terminal to ask in (CI, scripts), it installs into everything it found. Open a new terminal and run `lunaut --version`.

Options, set before the command: `LUNAUT_VERSION=0.1.0` installs a specific version, `LUNAUT_INSTALL_DIR` changes the folder, `LUNAUT_NO_PATH=1` leaves `PATH` alone, `LUNAUT_NO_EXTENSION=1` skips the VS Code family, `LUNAUT_EDITORS=code,zed,nvim,helix,path` picks the targets without asking (`cursor`, `windsurf`, `codium`, `code-insiders` and `all` work too). In PowerShell: `$env:LUNAUT_VERSION = "0.1.0"`.

**Manually:** download `lunaut-<platform>` from the latest release, rename it to `lunaut` (or `lunaut.exe`) and put it on your `PATH`. Install `lunaut.vsix` with `code --install-extension lunaut.vsix`, or install [Lunaut (`theexe.lunaut-luau`) from the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=theexe.lunaut-luau).

### Update

`lunaut update` checks the latest release and, when it is newer, runs the same installer for this lunaut only: it replaces the binary in its own folder and does not touch your editors or `PATH`. On Windows the running `lunaut.exe` is moved aside to `lunaut.exe.old` first, so an editor that is running the language server does not block the update; the old file goes away with the next update.

```bash
lunaut update --check   # only say whether a newer release exists
lunaut update           # install the latest release
lunaut update 0.1.7     # install a given release
lunaut update --dry-run # print what would run
```

A lunaut that came with an editor extension is updated by the extension, so `lunaut update` leaves it alone. The VS Code extension downloads a newer server from the releases on its own (`lunaut.server.autoUpdate`, on by default) and asks to restart the server, and the Zed extension always starts the latest release. A new Luau therefore reaches both editors without waiting for an extension update.

### Uninstall

Also one script for every system:

```powershell
irm https://raw.githubusercontent.com/TheExeDEV/lunaut/main/installers/uninstall | iex
```

```bash
curl -fsSL https://raw.githubusercontent.com/TheExeDEV/lunaut/main/installers/uninstall | sh
```

It lists what it finds (the extension in each VS Code-like editor, the Zed extension with the servers it downloaded, the Neovim config, the `lunaut` command with its `PATH` entries, the download cache) and asks what to remove. Enter removes everything except the download cache (synced FFlags, Roblox definitions); type `all`, or run it like this, to remove the cache too:

```powershell
$env:LUNAUT_PURGE = 1; irm https://raw.githubusercontent.com/TheExeDEV/lunaut/main/installers/uninstall | iex
```

```bash
curl -fsSL https://raw.githubusercontent.com/TheExeDEV/lunaut/main/installers/uninstall | sh -s -- --purge
```

---

## Quick start

Check a project from the terminal:

```bash
lunaut analyze src
```

```text
src/main.luau:4:23: error [TypeError] Type 'number' could not be converted into 'string'
src/main.luau:6:16: warning [FunctionUnused] FunctionUnused: Function 'unusedHelper' is never used; prefix with '_' to silence
2 files, 1 errors, 1 warnings
```

The exit code is `1` when there are errors, so it fits CI as is.

Ask where the types come from:

```bash
lunaut stats src
```

```text
Types: 28 total, 1 modules, 3 definition files
  in modules: 21, in globals: 69
  by kind: any 1, extern 5, function 27, never 1, primitive 6, table 11, ...
Origins:
  @base (Config) 3 types types/base.d.luau
  @roblox (Roblox) 210 types globalTypes.d.luau
  src/util (module) 14 internal, 8 interface
```

Open the folder in VS Code with the extension installed and the same diagnostics appear in the editor. For a Roblox project, put a `default.project.json` (or a `sourcemap.json`) in the root: lunaut switches to Roblox mode, downloads the API definitions and follows the instance tree.

---

## VS Code

Install it from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=theexe.lunaut-luau) or with the installer. The extension lives in [`editors/vscode`](editors/vscode). It starts the bundled server, or the one from `lunaut.path`, or `lunaut` from `PATH`.

Commands (`Ctrl+Shift+P`):

| Command | What it does |
| --- | --- |
| `Lunaut: Open Menu` | the menu behind the **Lunaut** button in the status bar: server version, Install Roblox Studio Plugin, Studio sync on or off, restart, reload, sourcemap, status, FFlags, definitions, docs, issues |
| `Lunaut: Install Roblox Studio Plugin` | downloads `LunautPlugin.rbxm` of this version into Studio's plugin folder |
| `Lunaut: Restart Server` | restarts the server process |
| `Lunaut: Show Status` | version, solver, workspaces, sourcemap, loaded definitions |
| `Lunaut: Show FFlags` | every Luau FFlag with its value and source, with a filter |
| `Lunaut: Show Loaded Definitions` | definition files in load order with priorities and errors |
| `Lunaut: Regenerate Rojo Sourcemap` | runs `rojo sourcemap` and reloads it |

Settings are described in [Settings](#settings). Put project settings in `.vscode/settings.json` and commit it, so everyone on the team and CI get the same ones.

**Local build of the extension:**

```bash
cd editors/vscode
npm install
npm run package
code --install-extension lunaut.vsix
```

`npm run package` copies `build/lunaut(.exe)` into the extension, so build the server first. `npm test` starts a real VS Code with the extension and checks diagnostics, hover, completion and commands.

---

## Other editors

Any editor with LSP support can run `lunaut lsp`. Ready configs for Neovim, Helix and Zed are in [`editors/`](editors/README.md). The server reads `.vscode/settings.json` itself, so a project configured for VS Code works the same everywhere.

---

## Settings

All settings live in VS Code settings under `lunaut.*` (luau-lsp settings work too, see [luau-lsp settings](#luau-lsp-settings)): user settings for your machine, `.vscode/settings.json` for a project. The server reads `.vscode/settings.json` itself too, so `lunaut analyze` in a terminal or CI uses exactly the same project settings as the editor. Comments and trailing commas are fine, like everywhere in VS Code.

```jsonc
// .vscode/settings.json
{
  "lunaut.platform": "auto",
  "lunaut.fflags.enableByDefault": true,
  "lunaut.fflags.sync": true,
  "lunaut.fflags.enableNewSolver": false,
  "lunaut.fflags.override": { "LuauTypeInferIterationLimit": "4000" },
  "lunaut.definitions": [
    { "path": "types/base.d.luau", "priority": 100 },
    { "path": "types/**/*.d.luau", "priority": 10 },
    "vendor/extra.d.luau",
  ],
  "lunaut.discoverDefinitions": true,
  "lunaut.roblox.downloadTypes": true,
  "lunaut.roblox.securityLevel": "PluginSecurity",
  "lunaut.rojo.autogenerate": true,
  "lunaut.ignoreGlobs": ["**/_Index/**"],
  "lunaut.baseLuaurc": "",
}
```

| Setting | Default | Meaning |
| --- | --- | --- |
| `lunaut.path` | `""` | server executable; empty uses the bundled one, then `lunaut` from `PATH`; `~/` works |
| `lunaut.platform` | `auto` | `standard`, `roblox`, or `auto`: Roblox when a Rojo project or sourcemap is in the root |
| `lunaut.fflags.enableByDefault` | `true` | turn on every non-experimental `Luau*` flag |
| `lunaut.fflags.sync` | `true` | take flag values from the current Roblox Studio build |
| `lunaut.fflags.enableNewSolver` | `false` | `LuauSolverV2 = true` |
| `lunaut.fflags.override` | `{}` | flag values that win over everything except `--flag`; flag names complete as you type |
| `lunaut.definitions` | `[]` | definition files, see below |
| `lunaut.discoverDefinitions` | `true` | also load every `*.d.luau` in the workspace |
| `lunaut.restartOnDefinitionChanges` | `true` | rebuild the workspace when a `.d.luau` file is saved; turn off to reload yourself with **Reload Definitions and FFlags** |
| `lunaut.roblox.downloadTypes` | `true` | download Roblox API definitions in Roblox mode |
| `lunaut.roblox.securityLevel` | `PluginSecurity` | `None`, `LocalUserSecurity`, `PluginSecurity`, `RobloxScriptSecurity` |
| `lunaut.roblox.typesPriority` | `1000` | load priority of the Roblox definitions |
| `lunaut.rojo.enabled` | `true` | use the sourcemap |
| `lunaut.rojo.projectFile` | `default.project.json` | Rojo project used to generate the sourcemap |
| `lunaut.rojo.sourcemapFile` | `sourcemap.json` | sourcemap to read |
| `lunaut.rojo.autogenerate` | `true` | run `rojo sourcemap` on start and on file changes |
| `lunaut.rojo.includeNonScripts` | `true` | pass `--include-non-scripts`, so folders and models get types |
| `lunaut.rojo.strictDatamodelTypes` | `false` | old solver only: use instance types in diagnostics, not only in hover and completion |
| `lunaut.rojo.executable` | `rojo` | Rojo command |
| `lunaut.diagnostics.lint` | `true` | run Luau lint |
| `lunaut.diagnostics.includeDependents` | `true` | re-check open files that require a changed module |
| `lunaut.ignoreGlobs` | `["**/_Index/**"]` | files that never get diagnostics and are never discovered; crater package folders are added on top, see [crater packages](#crater-packages) |
| `lunaut.analyzeLuaFiles` | `true` | check `.lua` files too, not only `.luau` |
| `lunaut.baseLuaurc` | `""` | a `.luaurc` applied under every other one, relative to the workspace |
| `lunaut.inlayHints.variableTypes` | `true` | type hints after locals and loop variables |
| `lunaut.inlayHints.parameterNames` | `literals` | parameter names before arguments: `none`, `literals` or `all` |
| `lunaut.inlayHints.parameterTypes` | `false` | type hints after function parameters without annotations |
| `lunaut.inlayHints.functionReturnTypes` | `true` | return type hints after function signatures |
| `lunaut.inlayHints.hideHintsForErrorTypes` | `true` | skip hints for types that failed to infer |
| `lunaut.inlayHints.hideHintsForMatchingParameterNames` | `true` | skip `value:` before an argument already named `value` |
| `lunaut.inlayHints.typeHintMaxLength` | `50` | longer type hints are cut |
| `lunaut.inlayHints.makeInsertable` | `true` | double-click a type hint to insert it as an annotation |
| `lunaut.hover.documentation` | `true` | documentation in hover, completion and signature help |
| `lunaut.documentationFiles` | `[]` | extra documentation files in the Roblox API docs format |
| `lunaut.disabledGlobals` | `[]` | globals to remove, like `table` or `table.clone` |
| `lunaut.completion.autoImports` | `true` | suggest modules and services that are not required yet |
| `lunaut.completion.importKeyword` | `local` | keyword of inserted auto-imports: `local` or `const` |
| `lunaut.completion.imports.requireStyle` | `auto` | `auto`, `alwaysRelative` or `alwaysAbsolute`: how auto-imported `require` paths are written |
| `lunaut.completion.imports.aliasPath` | `shortest` | `shortest` or `longest`: which `.luaurc` alias wins when several cover the file |
| `lunaut.semanticTokens.enabled` | `true` | semantic highlighting |
| `lunaut.colors.enabled` | `true` | color picker for `Color3` |
| `lunaut.codeLens.references` | `true` | `N references` above every function |
| `lunaut.implicitSelf` | `false` | type the implicit `self` of `function X:name()` as the type alias `X`, see [Typed self](#typed-self) |
| `lunaut.completion.autocompleteEnd` | `true` | insert `end` or `until` after Enter on a block opener, adding a missing `then` or `do` |
| `lunaut.format.convertQuotes` | `true` | typing `{` in a `"string"` turns it into an interpolated string |
| `lunaut.format.closeInterpolation` | `true` | with `convertQuotes`, also add the closing `}` and keep the cursor inside `{}` |
| `lunaut.format.enabled` | `true` | format documents and selections with StyLua |
| `lunaut.format.styluaPath` | `stylua` | StyLua executable |
| `lunaut.diagnostics.workspace` | `false` | diagnostics for every file in the workspace, not only open ones |
| `lunaut.analyzer.enabled` | `false` | load the analyzer plugin from `lunaut.analyzer.path`; setting a path turns it on |
| `lunaut.analyzer.path` | `""` | shared library with a custom Luau analyzer, see [Analyzer plugins](#analyzer-plugins) |
| `lunaut.analyzer.diagnostics` | `false` | merge diagnostics returned by the analyzer plugin with the built-in ones |
| `lunaut.rojo.watch` | `true` | VS Code only: keep `rojo sourcemap --watch` running instead of regenerating on every change |
| `lunaut.studioPlugin.enabled` | `false` | VS Code only: accept the live DataModel from the Studio companion plugin |
| `lunaut.studioPlugin.port` | `3667` | port of the Studio companion plugin |
| `lunaut.trace.server` | `off` | log LSP traffic to the Lunaut output channel |

### luau-lsp settings

lunaut understands the settings of [luau-lsp](https://github.com/JohnnyMorganz/luau-lsp), in `.vscode/settings.json` and in your user settings. When both are set, `lunaut.*` wins.

| luau-lsp | lunaut |
| --- | --- |
| `luau-lsp.platform.type` | `lunaut.platform` |
| `luau-lsp.fflags.enableByDefault`, `sync`, `enableNewSolver`, `override` | `lunaut.fflags.*` |
| `luau-lsp.types.definitionFiles` | `lunaut.definitions` |
| `luau-lsp.types.documentationFiles` | `lunaut.documentationFiles` |
| `luau-lsp.types.disabledGlobals` | `lunaut.disabledGlobals` |
| `luau-lsp.types.robloxSecurityLevel` | `lunaut.roblox.securityLevel` |
| `luau-lsp.types.roblox` | `lunaut.roblox.downloadTypes` |
| `luau-lsp.sourcemap.enabled`, `rojoProjectFile`, `sourcemapFile`, `autogenerate`, `includeNonScripts`, `rojoPath` | `lunaut.rojo.*` |
| `luau-lsp.diagnostics.strictDatamodelTypes` | `lunaut.rojo.strictDatamodelTypes` |
| `luau-lsp.diagnostics.includeDependents` | `lunaut.diagnostics.includeDependents` |
| `luau-lsp.inlayHints.*` | `lunaut.inlayHints.*` |
| `luau-lsp.completion.imports.enabled` | `lunaut.completion.autoImports` |
| `luau-lsp.ignoreGlobs` | `lunaut.ignoreGlobs` |
| `luau-lsp.analyzeLuaFiles` | `lunaut.analyzeLuaFiles` |
| `luau-lsp.server.baseLuaurc` | `lunaut.baseLuaurc` |

The Roblox definitions and API docs come from the [`definitions` release](https://github.com/TheExeDEV/lunaut/releases/tag/definitions) of this repository, refreshed every day by the [Definitions](.github/workflows/definitions.yml) workflow, and are loaded as the `@roblox` package. They are cached in the lunaut cache folder, so a project keeps working offline with the last downloaded copy.

---

## FFlags

FFlags switch features of the Luau analyzer on and off. lunaut sets them once on start, in this order (later wins):

1. **Enable by default.** Every `Luau*` boolean flag that Luau does not mark as experimental becomes `true`.
2. **Sync.** The flags of the current Roblox Studio build are downloaded from `clientsettingscdn.roblox.com` and applied, so you see what Studio sees. The answer is cached for 24 hours in `%LOCALAPPDATA%\lunaut\cache` (`~/.cache/lunaut/cache`); without internet the cached copy is used.
3. **New solver.** `lunaut.fflags.enableNewSolver` sets `LuauSolverV2`.
4. **Override.** `lunaut.fflags.override`.
5. **Command line.** `--flag:Name=Value`.

Names go without the `FFlag`/`FInt` prefix: `LuauSolverV2`, not `FFlagLuauSolverV2`. Booleans take `true`/`false`, integers take numbers. A wrong value or an unknown name is reported in the log and skipped.

See every flag, its value and where it came from:

```bash
lunaut flags --flag:LuauSolverV2=true
```

```text
LuauSolverV2=true  (bool, Cli)
LuauTypeInferIterationLimit=20000  (int, Default)
...
```

In VS Code: `Lunaut: Show FFlags`. Flags apply to the whole server, so changing them asks for a restart.

---

## Definition files and priorities

A definition file (`.d.luau`) declares globals and classes without code:

```luau
--!priority 100
declare extern type Vehicle with
	speed: number
	function drive(self, distance: number): number
end
```

```luau
--!priority 50
declare extern type Car extends Vehicle with
	brand: string
end

declare garage: { Car }
```

Order matters: `Car extends Vehicle` only works if `Vehicle` is already loaded. lunaut sorts every file by priority, **higher first**, and keeps the listed order for equal priorities.

Where a file gets its priority, first match wins:

1. `priority` in settings or `--definition=path#priority`
2. the `--!priority N` line at the top of the file
3. `0`

Where files come from:

| Source | Example |
| --- | --- |
| settings | `"lunaut.definitions": [{ "path": "types/base.d.luau", "priority": 100 }]` |
| settings with a glob | `"lunaut.definitions": [{ "path": "types/**/*.d.luau", "priority": 10 }]` |
| settings as a map | `"lunaut.definitions": { "@roblox": "types/globalTypes.d.luau" }` |
| settings as one path | `"lunaut.definitions": "types/globals.d.luau"` |
| command line | `--definition=@base=types/base.d.luau#100` |
| discovery | every `*.d.luau` in the workspace when `lunaut.discoverDefinitions` is on |
| Roblox | `globalTypes.<security_level>.d.luau`, priority `lunaut.roblox.typesPriority` |

A file listed twice is loaded once, with the first priority found. Every file gets a package name (`@base`, `@roblox`); set it with `name`. Errors in a definition file show up as diagnostics in that file and in `Lunaut: Show Loaded Definitions`.

Saving a definition file rebuilds the workspace without a restart. When you edit definitions bit by bit and want to choose the moment yourself, set `"lunaut.restartOnDefinitionChanges": false` and reload with **Reload Definitions and FFlags** in the Lunaut menu (`Lunaut: Reload Workspace` in `Ctrl+.` elsewhere). Changing `lunaut.definitions` itself still reloads at once.

### Types as a module

With `show_as_module`, the exported types of a file are reached through its package name, like the types of a required module:

```luau
-- types/base.d.luau, loaded as @base
export type Vehicle = { speed: number }
```

```luau
local car: base.Vehicle = make_vehicle()
```

`base` is offered in type completion, `base.` lists the types, and hover shows `base.Vehicle`. A plain `Vehicle` is an unknown type, so the name always says where the type comes from. Definition files loaded later can use `base.Vehicle` too.

Turn it on in settings, `{ "path": "types/base.d.luau", "name": "@base", "show_as_module": true }`, or in the file itself, among the comment lines at the top:

```luau
--!lunaut_show_as_module true
```

The setting wins over the line in the file; `--!lunaut_show_as_module false` turns it off for a file matched by a glob.

Give the module a description with `message`; completion shows it next to the module name instead of `definitions @base`:

```json
"lunaut.definitions": [
  { "path": "types/database.d.luau", "name": "@fc_database", "show_as_module": true, "message": "Rows and tables of the funny-core database" }
]
```

---

## Analyzer plugins

lunaut can hand type checking to a custom Luau fork, loaded at runtime as a shared library. This is for projects that patch Luau itself and need the server to use the same analyzer. Set `lunaut.analyzer.path` to the library and lunaut loads it on start and whenever the setting changes:

```json
{
  "lunaut.analyzer.enabled": true,
  "lunaut.analyzer.path": "./tools/libmy-luau-analyzer.so",
  "lunaut.analyzer.diagnostics": true
}
```

The plugin exports three C functions and one versioned info structure, declared in [`src/Lunaut/analyzer.h`](src/Lunaut/analyzer.h):

| Symbol | Purpose |
| --- | --- |
| `lunaut_analyzer_info_v1` | returns `lunaut_analyzer_info`: ABI version, name, Luau version and frontend API |
| `lunaut_analyzer_check_v1` | checks one module and returns a JSON array of LSP diagnostics |
| `lunaut_analyzer_free_v1` | frees the diagnostics string, optional |

The frontend API is `1` for Luau before 0.743 and `2` from 0.743 on. lunaut validates the ABI, the reported Luau version and the API pair; a plugin built for the wrong side of 0.743, an unknown ABI or a missing symbol is not loaded, and the reason is reported in `Lunaut: Show Status` and in the server log instead of crashing the server. `lunaut/status` shows the loaded analyzer under `analyzer` in every workspace.

With `lunaut.analyzer.diagnostics` the plugin diagnostics are merged with the built-in ones. Without it the plugin only reports whether it is loaded and compatible.

---

## Rojo

In Roblox mode lunaut reads `sourcemap.json`. Each script in it gets a virtual name like `game/ReplicatedStorage/Shared/Util`, so these all resolve to the same module:

```luau
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Util = require(ReplicatedStorage.Shared.Util)
local Util = require(ReplicatedStorage:WaitForChild("Shared"):WaitForChild("Util"))
local Helper = require(script.Parent.Helper)
local Helper = require("./Helper")
local Util = require("@game/ReplicatedStorage/Shared/Util")
local Child = require("@self/Child")
```

`script.Parent`, `FindFirstChild`, `WaitForChild`, `FindFirstAncestor` and `game:GetService` are followed. `Players.LocalPlayer.PlayerScripts` and `PlayerGui` point to `StarterPlayerScripts` and `StarterGui`.

`script`, `game` and every service get instance types with their children from the sourcemap, so `script.Parent.Config.Value` completes. With the old solver these types are used in hover and completion; set `lunaut.rojo.strictDatamodelTypes` to use them in diagnostics too. The new solver always uses them.

**Keeping the sourcemap fresh.** With `lunaut.rojo.autogenerate` lunaut runs

```bash
rojo sourcemap default.project.json --output sourcemap.json --include-non-scripts
```

on start, when a `.luau` file is created or deleted and when a `*.project.json` changes. Without Rojo on `PATH` it uses the `sourcemap.json` that is already there, and reloads it whenever it changes, for example when you run `rojo sourcemap --watch` yourself.

In VS Code the extension keeps `rojo sourcemap --watch` running for every workspace folder with a project file in its root (`lunaut.rojo.watch`), and the server only reloads what Rojo writes. If Rojo exits, the server goes back to regenerating on its own.

**Which project.** `lunaut.rojo.projectFile` is used when it exists. Otherwise lunaut looks for `*.project.json` up to four folders deep and takes, in this order: a project whose `$path` folders exist, the one closest to the root, the one named like `lunaut.rojo.projectFile`. Pick one by hand with **Select Rojo Project** in the Lunaut menu (or `Lunaut: Select Rojo Project`); it lists every project found and marks the ones whose `$path` folders are missing.

A project in a subfolder, such as `bin/build.project.json`, works too: Rojo writes its paths relative to that folder, so lunaut rewrites them to start at the workspace root (`bin/core/init.luau`). Rojo resolves `$path` from the folder of the project file, so `"$path": "src"` in `src/default.project.json` means `src/src`; when no `$path` of a project exists, lunaut says so instead of writing an empty sourcemap.

### Lunaut plugin for Roblox Studio

The Lunaut plugin sends the instance tree of the open place from Studio to the editor, so instances that exist only in the place, not in your files or Rojo project, get types and completion: `workspace.Map.Door`, `ReplicatedStorage.Remotes.Fire` and so on.

1. Install it: pick *Roblox Studio* in the [installer](#installation), or download `LunautPlugin.rbxm` from the latest release into `%LOCALAPPDATA%\Roblox\Plugins` (Windows) or `~/Documents/Roblox/Plugins` (macOS) and restart Studio.
2. Turn on `lunaut.studioPlugin.enabled` in VS Code. The extension listens on `127.0.0.1:3667` (`lunaut.studioPlugin.port`).
3. In Studio press *Plugins > Lunaut*. The window has:

| Part | What it does |
| --- | --- |
| **Start Sync** / **Stop Sync** | sends the tree now and again half a second after instances are added or removed |
| **Sync on Start** | starts syncing as soon as Studio opens a place |
| **Silent Mode** | only errors go to the Output window |
| **Open on Start** | opens the window when Studio starts |
| **Send Once** | sends the tree once |
| **Clear Editor** | removes the instances the plugin sent from the editor |
| **Settings** | opens `ServerStorage.Lunaut_Settings`, and creates it on the first click, to choose what is sent |
| **Port** | the same number as `lunaut.studioPlugin.port`; in VS Code change it with *Lunaut menu > Change Port* |

The first time it sends, Studio asks whether the plugin may make HTTP requests to `localhost`; allow it. The plugin sends the services that hold game content (Workspace, ReplicatedStorage, ServerScriptService, StarterPlayer, Lighting and the like), up to 200 000 instances, and only names and classes, never scripts or properties. It runs in edit mode only, not during play tests.

**Choosing what is sent.** In a big place, send only the parts your code uses. **Settings** creates a ModuleScript `Lunaut_Settings` in ServerStorage; it lives in the place, so everyone who opens it shares the same choice:

```luau
--!strict
return {
	include = {
		game:GetService("ReplicatedStorage").Assets,
		workspace.Map,
	},
	exclude = {
		workspace.Map.Decorations,
	},
}
```

- `include`: when it lists anything, only these instances, their descendants and the path to them from `game` are sent, and only changes inside them send the tree again
- `exclude`: subtrees left out, even under an included instance
- without the module, or with an empty `include`, the plugin sends the content services as before
- saving the module sends the tree again; if it fails to run or holds something that is not an instance, the plugin warns once in the Output window (unless Silent Mode is on) and sends everything until it is fixed

The [luau-lsp Studio Companion plugin](https://create.roblox.com/store/asset/10913122509) speaks the same protocol and works too. Run luau-lsp or lunaut, not both: they use the same port.

`.server.luau` and `.client.luau` files are checked as scripts, everything else as modules.

### Roblox types

In Roblox mode the Roblox API definitions get the same extra typing as in luau-lsp, in both solvers:

| Code | Type |
| --- | --- |
| `Instance.new("Part")` | `Part`; an unknown or non-creatable class is an error |
| `game:GetService("Players")` | `Players`; an unknown service is an error |
| `part:Clone()` | the type of `part` |
| `Instance.fromExisting(part)` | the type of `part` |
| `x:FindFirstChildWhichIsA("Model")`, `OfClass`, `FindFirstAncestorWhichIsA`, `OfClass` | `Model?` |
| `if x:IsA("BasePart") then` | `x` is a `BasePart` inside the branch |
| `local m: Enum.Material` | enum types work in annotations |

The lists of creatable classes and services come from the metadata line at the top of the downloaded definitions.

---

### Typed self

Luau does not type the implicit `self` of a method: the old solver gives it the type of the method table, the new solver guesses it from how `self` is used. With `"lunaut.implicitSelf": true`, lunaut types it from the name before `:`:

```luau
export type Account = { balance: number, owner: string }
local Account = {}

function Account:deposit(amount: number)
	self.balance += amount -- self: Account
end
```

`function Account:deposit(amount: number)` is checked as if it were `function Account.deposit(self: Account, amount: number)`, with both solvers, and nested functions see the same `self`. The rules are strict on purpose:

- only `function X:name() ... end` with a plain name before `:`; `function a.b:name()` and anything else keep Luau's own `self`
- only a function closed with `end`
- only when a type alias `X` without generics is in scope there: declared in the same block or an outer one, or a global type from the definition files
- off by default; turning it on or off rechecks the open files

## Editor features

### Hover

Hover text follows luau-lsp:

| Under the cursor | Hover |
| --- | --- |
| a local | `local count: number`, `const limit: number` |
| a function | `function Util.double(value: number): number`, methods as `function Part:Clone(): Part` |
| a global | `type game = DataModel` |
| a type name | `type Vector<T> = { x: T, y: T }` |
| a table field | `x: number` |
| a string | `string (6 bytes)` |

Named table types keep the name from the analyzer, so a variable of type `LuaObject` or `Scheduler` shows that name instead of the expanded table body. Clicking a type name in `type Name = ...` goes to its declaration, not to the body.

Documentation follows under a `----------` line: the Roblox or Luau API docs for API members, otherwise the comment right above the declaration. Comments are read from any `.luau` file, including `.d.luau` definitions, and work for functions, type declarations, intersections and table fields. Moonwave comments are rendered with `@param`, `@return`, `@error` sections and `@deprecated`, `@yields`, `@since` labels:

```luau
--[=[
	Doubles a number.

	@param value number to double
	@return the doubled number
]=]
local function double(value: number): number
```

Signature help shows the same documentation for the function and each parameter.

### Inlay hints

Gray hints inside the code: `local result = scale(2, 3)` shows `: number` after `result` and `value:`, `factor:` before the arguments. Every kind has its own switch under `lunaut.inlayHints`; VS Code's `editor.inlayHints.enabled` turns all of them off at once. Changes apply right away, no restart needed.

### Completion and auto-imports

Functions show their parameters next to the name and fill the call with placeholders: `add(${1:a}, ${2:b})`. Fields and functions carry the comment above their declaration in the completion popup. Names of modules in the workspace and Roblox services that are not imported yet appear too; picking one adds the line at the top, after the existing imports:

| Picked | Added |
| --- | --- |
| a module next to the file | `local Util = require("./Util")` |
| a module under a `.luaurc` alias | `local Signal = require("@packages/Signal")` |
| a sibling instance in Rojo | `local Helper = require(script.Parent.Helper)` |
| another instance in Rojo | `local Util = require(game:GetService("ReplicatedStorage").Shared.Util)` |
| a Roblox service | `local Players = game:GetService("Players")` |

`lunaut.completion.importKeyword` switches the inserted keyword from `local` to `const`.

How the path is written is up to `lunaut.completion.imports.requireStyle` (`luau-lsp.completion.imports.requireStyle` works too):

| Value | Path |
| --- | --- |
| `auto` (default) | `./Module` for a file in the same folder or below it, an alias for everything else, `../Module` when no alias covers it |
| `alwaysRelative` | always relative, `../../Module` included |
| `alwaysAbsolute` | an alias whenever one covers the file, even next door; relative otherwise |

When several aliases cover the file, `lunaut.completion.imports.aliasPath` picks one: `shortest` (default) gives the shortest path, usually the most specific alias such as `@reflection/package/Output`; `longest` gives the longest, such as `@static/system/reflection/src/package/Output`.

### Quick fixes

| Diagnostic | Fix |
| --- | --- |
| `LocalUnused`, `FunctionUnused`, `ImportUnused` | rename to `_name` |
| any lint | add `--!nolint Name` at the top of the file |
| `Unknown global 'Util'` | add the `require` or `GetService` line |

Without a diagnostic:

| Under the cursor | Action |
| --- | --- |
| anywhere | *Sort imports*: sorts the block of `require` and `GetService` lines at the top |
| a local without an annotation | *Add type annotation*: writes the inferred type, like `: number` |
| `require(script.Parent.Helper)` in Rojo | *Use string require*: `require("./Helper")`, or `require("@game/ReplicatedStorage/Shared/Util")` across services |

### Typing

Pressing Enter after `function ...`, `if ... then`, `for ... do`, `while ... do`, `do` or `repeat` adds the closing `end` or `until` when the block is still open, and adds a missing `then` or `do` (`lunaut.completion.autocompleteEnd`). The same happens on Enter after the last line of a block that has no `end` yet. Text after the cursor moves behind the `end`, so `foo(function()` + Enter gives `end)`, and every block left open gets its own `end`. It works through on-type formatting, in VS Code, Zed and every other editor that supports it. Typing `{` inside a `"string"` or `'string'` turns it into `` `string {}` `` with the cursor between the braces (`lunaut.format.convertQuotes`, and `lunaut.format.closeInterpolation` for the `}`); the extension turns on `editor.formatOnType` for Luau so this works out of the box.

### Formatting

*Format Document* and *Format Selection* run [StyLua](https://github.com/JohnnyMorganz/StyLua) with the project's `stylua.toml`. Install StyLua or point `lunaut.format.styluaPath` at it.

### Navigation

| Feature | What it does |
| --- | --- |
| document highlight | marks every use of the symbol under the cursor in the file, writes and reads apart |
| document links | the path in `require("./util")` or `require("@alias/x")` is clickable |
| workspace symbols | `Ctrl+T` finds functions, locals and module members in every file |
| call hierarchy | *Show Call Hierarchy* lists callers and callees of a function, across modules |
| go to definition | `F12` jumps to locals, requires, table members, type names, and globals and Roblox members in `.d.luau` files |
| go to declaration | like definition, but a member typed by an annotation jumps to the field in the type, not to the assignment |
| go to type definition | jumps to the type of the value under the cursor: a type alias, a table type or a `declare extern type` |
| go to implementation | `Ctrl+F12` lists every place the symbol gets a value: `function M.x`, `M.x = ...`, `{ x = ... }`, `local x = ...` |
| code lens | `N references` above every function; click it to list the uses (`lunaut.codeLens.references`) |
| selection range | `Shift+Alt+→` grows the selection by syntax: name, call, statement, block, function |
| type hierarchy | *Show Type Hierarchy* on an instance type walks `extends`: `Part` → `Instance` → `Object`, and every subclass |
| inline values | while debugging, shows local values next to the code up to the stopped line |
| monikers | stable symbol ids for indexers: `util.luau.add` for module exports, `print` for globals |
| type names | a type reference jumps to its declaration; the name in `type Name = ...` jumps to the type body, so the internals are one click away |

### Type statistics

`lunaut stats` and the `lunaut/typeStats` request report how many types the workspace holds and where they come from: definition files (`@base`, `@roblox`), modules, and globals. The report also groups types by kind, lists exported aliases and their kinds, and shows the hierarchy of extern types (`Car extends Vehicle`). Type origins include internal and interface type counts for every module, and plugins can report their own analyzer status in the same payload.

```bash
lunaut stats src
lunaut stats src --json
```

### Colors, folding, highlighting

`Color3.new`, `fromRGB`, `fromHSV` and `fromHex` with literal arguments get a color square and a picker; the picked color is written back in the same constructor. Functions, blocks, tables, comment runs and `--#region` / `--#endregion` fold. Semantic highlighting marks parameters, locals, functions, methods, properties, enum items, types and built-in globals.

---

## References and rename

`Shift+F12` lists every use of the symbol under the cursor, `F2` renames it everywhere at once.

| Symbol | Where it is found |
| --- | --- |
| a local, a parameter, a local function | the file it lives in |
| a module member: `function Util.double()`, `Util.double`, `{ double = ... }` | the module and every file that requires it, open or not |

```luau
-- Util.luau
local Util = {}
function Util.double(value: number): number
	return value * 2
end
return Util

-- Main.server.luau
local Util = require(script.Parent.Util)
print(Util.double(21))
```

Renaming `double` in either file changes both. Members are matched by the table they belong to, not by name, so another table with a `double` field stays untouched. lunaut parses the whole workspace on the first request to know who requires whom; Rojo requires through `script`, `game` and `@game` count too. Names are checked before renaming: a keyword or a name that is not a valid identifier is refused. Globals from definition files (`print`, `game`) cannot be renamed.

---

## Requires and .luaurc

String requires follow the Luau rules:

| Require | Resolves to |
| --- | --- |
| `require("./util")` | `util.luau`, `util.lua`, `util/init.luau` next to the file |
| `require("../shared/util")` | one folder up |
| `require("@self/child")` | inside the folder of an `init.luau` |
| `require("@lib/math")` | the `lib` alias from the nearest `.luaurc` |

`.luaurc` and `.config.luau` files are read from the file's folder up to the root and merged, closer files win; in one folder `.luaurc` is applied after `.config.luau`. `languageMode`, `lint`, `lintErrors`, `typeErrors`, `globals` and `aliases` all work. Aliases are case-insensitive.

`.config.luau` is Luau code that returns the config, run in a sandbox with a 2 second limit:

```luau
return {
	luau = {
		languagemode = "strict",
		aliases = { tools = "./tools" },
	},
}
```

`lunaut.baseLuaurc` points to one more `.luaurc` that sits under all of them, handy for aliases shared by every project on your machine.

Inside `require("...")` completion lists the aliases and `./`, `../` first, then the folders and modules of whatever the typed path points to. `init.luau` files are shown as their folder.

---

## .lunaut-declare

`lunaut init` writes `.lunaut-declare` into the project folder: a JSON file that says the project uses lunaut and tells other tools, crater first of all, what this lunaut supports and how to read its settings, so they don't have to guess from `PATH` or from keys in `settings.json`. `lunaut declare --json` prints the same content for the installed lunaut, without a file in the project.

```json
{
  "api_version": 1,
  "lunaut_version": "0.0.9",
  "features": { "analyzer": 1, "base_luaurc": 1, "crater_packages": 1, "definition_message": 1, "definition_priority": 1, "definitions": 1, "fflags": 1, "restart_on_definition_changes": 1, "rojo": 1, "settings": 1, "show_as_module": 2 },
  "settings": {
    "file": ".vscode/settings.json",
    "prefix": "lunaut.",
    "compatible_prefix": "luau-lsp.",
    "compatible": { "luau-lsp.types.definitionFiles": "lunaut.definitions", "luau-lsp.ignoreGlobs": "lunaut.ignoreGlobs", "...": "..." },
    "precedence": "lunaut"
  },
  "definitions": {
    "setting": "lunaut.definitions",
    "compatible_setting": "luau-lsp.types.definitionFiles",
    "merge_with_compatible": false,
    "forms": { "array": "...", "string": "one path", "object": "a map of name to path" },
    "entry": {
      "path": { "type": "string", "required": true, "globs": true, "relative_to": "workspace root" },
      "name": { "type": "string", "default": "", "globs": "ignored for wildcard paths" },
      "priority": { "type": "integer", "default": 0, "order": "higher loads first" },
      "show_as_module": { "type": "boolean", "default": false },
      "message": { "type": "string", "default": "", "shown": "completion of the module name with show_as_module" }
    },
    "default_name": "@ + file name without .d.luau, .d.lua, .luau or .lua",
    "name_prefix": "@",
    "priority_sources": ["settings", "directive", "default"],
    "priority_directive": { "text": "--!priority", "lines": 32 },
    "duplicates": "first",
    "show_as_module_name": { "strip": "first @", "pattern": "^[A-Za-z_][A-Za-z0-9_]*$" },
    "show_as_module_sources": ["settings", "directive", "default"],
    "show_as_module_directive": { "text": "--!lunaut_show_as_module", "values": ["true", "false"], "lines": 32 },
    "show_as_module_access": "only through the module name, such as base.Vehicle",
    "restart_on_definition_changes_setting": "lunaut.restartOnDefinitionChanges",
    "reserved_names": ["@roblox"],
    "roblox_priority_setting": "lunaut.roblox.typesPriority"
  },
  "schemas": { "settings": "https://raw.githubusercontent.com/TheExeDEV/lunaut/v0.0.9/editors/vscode/package.json" },
  "cli": { "json_output": { "declare": 1, "flags": 1, "stats": 1 } }
}
```

| Key | What it tells other tools |
| --- | --- |
| `api_version` | The format of this file. Starts at `1`. |
| `lunaut_version` | The lunaut that wrote or last completed the file. |
| `features` | Each feature and the version of its format. A version goes up when the format of that feature changes, so a tool can support some features and skip the rest. |
| `settings.file`, `settings.prefix` | Settings live in `.vscode/settings.json` under `lunaut.` keys. |
| `settings.compatible` | Every `luau-lsp.*` key lunaut reads and the `lunaut.*` key it stands for. |
| `settings.precedence` | When both keys are set, the `lunaut.*` one wins. |
| `definitions.setting`, `compatible_setting`, `merge_with_compatible` | `lunaut.definitions` and `luau-lsp.types.definitionFiles` are not added together: only one list is read, and `lunaut.definitions` wins. |
| `definitions.forms` | The setting is an array of entries (a path string or an object), one path string, or a map of name to path. |
| `definitions.entry` | Fields of an entry with their types and defaults. `path` may be a glob; `name` is ignored for globs. |
| `definitions.priority_sources` | Where a priority comes from, first match wins: `priority` in settings, then the `--!priority N` line in the first 32 lines of the file, then `0`. Higher loads first. |
| `definitions.duplicates` | A file listed twice is loaded once, with the first priority found. |
| `definitions.default_name`, `name_prefix` | A file without `name` is called `@` plus its file name; a name always starts with `@`. |
| `definitions.show_as_module_name` | With `show_as_module`, the first `@` of the name is dropped and the rest has to be an identifier, so `@base` gives `base.Vehicle`. |
| `definitions.show_as_module_sources`, `show_as_module_directive` | `show_as_module` in settings wins, then the `--!lunaut_show_as_module true` or `false` line in the first 32 lines of the file, then `false`. |
| `definitions.show_as_module_access` | Types of such a file are reached only as `base.Vehicle`, not as a plain `Vehicle`. |
| `definitions.restart_on_definition_changes_setting` | The setting that turns off the rebuild when a definition file is saved. |
| `definitions.reserved_names` | `@roblox` is the downloaded Roblox API. Another file with that name gets `@roblox_2`. |
| `schemas.settings` | The VS Code extension manifest; `contributes.configuration.properties` is the JSON schema of every setting. |
| `cli.json_output` | Each command that prints JSON with `--json` and the version of that output. |

The file is hidden (a dot file, and marked hidden on Windows) and should be committed with the project. New lunaut versions only add keys and never rename or remove old ones. When the file exists, the server adds the missing keys on start without a message, raises `api_version` and feature versions that went up, and sets `lunaut_version`; a complete file is not touched. `lunaut init` on an existing file does the same and says what it did. Without the file nothing is created: run `lunaut init` once.

### crater packages

When the project has a [`.crater-declare`](https://github.com/TheExeDEV/crater#crater-declare), lunaut reads crater's package folders from it and adds them to `lunaut.ignoreGlobs`, so installed packages give no diagnostics and are never discovered as definitions:

- the folders of `sync.packages`
- the vendor folders, `vendor.folders.*.path`
- the realm folders from the crater settings file it names (`path_to_crater_settings`): `client`, `server` and `develop`, `Packages`, `ServerPackages` and `DevPackages` when a realm is not set, nothing when its path is empty

Requires into those folders keep working; only their own diagnostics are hidden.

---

## Command reference

| Command | What it does |
| --- | --- |
| `lunaut` / `lunaut lsp` | language server on stdio |
| `lunaut analyze [paths]` | checks files and folders (default `.`), prints diagnostics, exit code `1` on errors |
| `lunaut stats [paths] [--json]` | reports type statistics for files and folders (default `.`): totals, origins, kinds, hierarchy and aliases |
| `lunaut flags` | lists every Luau FFlag with its value and source |
| `lunaut init [folders]` | writes [`.lunaut-declare`](#lunaut-declare) into each folder (default `.`), or adds the missing keys to an existing one |
| `lunaut declare [--json]` | prints the `.lunaut-declare` content of this lunaut |
| `lunaut version` | version, Luau version and compiler |
| `lunaut update [version] [--check] [--dry-run]` | updates this lunaut to the latest or the given release, see [Update](#update) |
| `lunaut help` | usage |

Options for every command:

| Option | Meaning |
| --- | --- |
| `--flag:Name=Value` | set a Luau FFlag |
| `--no-flags-enabled` | do not enable `Luau*` flags by default |
| `--definition=[@name=]path[#priority]` | load a definition file, can repeat |
| `--settings=file` | extra settings in `.vscode/settings.json` format, applied last |
| `--verbose` | print the server log to stderr |
| `--json` | print `flags`, `stats` or `declare` as JSON |

---

## Custom LSP methods

Besides the standard protocol the server answers:

| Method | Params | Result |
| --- | --- | --- |
| `lunaut/status` | `{}` | version, Luau version, solver, workspaces with platform, sourcemap and definitions |
| `lunaut/typeStats` | `{}` | type totals, origins, kinds, hierarchy and aliases for every workspace |
| `lunaut/fflags` | `{ "filter"?: string }` | `[{ name, value, kind, source }]` |
| `lunaut/definitions` | `{}` | `[{ root, definitions: [{ name, path, priority, success, message, source }] }]` |
| `lunaut/sourcemap` | `{ "regenerate"?: bool }` | regenerates and reloads the sourcemap of every Roblox workspace |

Other editors can pass settings in `initializationOptions` and `workspace/didChangeConfiguration` as `{ "lunaut": { "fflags": { "sync": false }, ... } }` (the keys of `lunaut.*` in snake_case), or just keep a `.vscode/settings.json` in the project.

---

## Environment variables

| Variable | Used by | Meaning |
| --- | --- | --- |
| `LUNAUT_VERSION` | installer | version to install, default `latest` |
| `LUNAUT_INSTALL_DIR` | installer, uninstaller | install folder |
| `LUNAUT_NO_PATH` | installer | do not touch `PATH` |
| `LUNAUT_NO_EXTENSION` | installer | do not install the VS Code extension |
| `LUNAUT_EDITORS` | installer | targets to install into without asking: `code`, `code-insiders`, `cursor`, `windsurf`, `codium`, `zed`, `nvim`, `helix`, `path` or `all` |
| `LUNAUT_PURGE` | uninstaller | also remove the cache |
| `LUNAUT_REPOSITORY` | installer, uninstaller | GitHub repository to download from |
| `LUNAUT_BINARY` | tests, extension packaging | path to the server executable |
| `LUNAUT_OFFLINE` | server | never download anything, use the cache only (tests set it) |

---

## Tests

```bash
python tests/run.py
```

It runs every suite in [`tests/cases`](tests/cases) against `build/lunaut(.exe)` and writes [`tests/report.md`](tests/report.md) with every test, its status and time. Run one suite with `python tests/run.py test_rojo.py`, another binary with `--binary path`.

| Suite | Checks |
| --- | --- |
| `test_cli.py` | `version`, `help`, `analyze` output and exit codes |
| `test_lsp.py` | diagnostics, updates, hover, completion, definitions, symbols, signature help, aliases |
| `test_fflags.py` | defaults, `--no-flags-enabled`, `--flag`, bad values, overrides over LSP |
| `test_definitions.py` | priority order, `--!priority`, globs, a wrong order failing |
| `test_rojo.py` | sourcemap loading, instance requires, `script` and service types, completion of sourcemap children |
| `test_references.py` | references and rename for locals, module functions and table keys, in both solvers |
| `test_features.py` | inlay hints and their switches, documentation, signature help, auto-imports, semantic tokens, quick fixes, colors, folding, luau-lsp settings |
| `test_config.py` | `.config.luau` aliases, `lunaut.baseLuaurc`, `lunaut.analyzeLuaFiles`, `require` path completion, `const` hover |

On GitHub the [CI](.github/workflows/ci.yml) workflow builds and tests on Windows and Linux on every push and pull request. macOS runners are often unavailable for private repositories, so macOS has its own [macOS](.github/workflows/macos.yml) workflow: Actions → macOS → Run workflow. Releases try to build macOS too and ship without it if no runner is available.

Fixtures live in [`tests/fixtures`](tests/fixtures): a plain Luau project, two definition setups and a Rojo project with its own sourcemap and Roblox-like definitions, so tests need neither Rojo nor internet.

---

## Luau updates

Luau is the git submodule [`extern/luau`](extern/luau), checked out at a release tag, and [`luau.version`](luau.version) holds the same tag for the version string. CI checks that both point at the same Luau.

Every day [`update-luau.yml`](.github/workflows/update-luau.yml) runs [`scripts/update_luau.py`](scripts/update_luau.py): it finds the newest Luau release, moves the submodule to that tag, writes it to `luau.version` and adds `Sync to upstream Luau X` to the changelog. Then it builds lunaut and runs every test. Only when they pass, it commits the new Luau to `main`, raises the lunaut version, commits `Release X` and starts the Release workflow, so a new Luau becomes a lunaut release without anyone stepping in. Everything else already on `main` ships with it. The VS Code extension picks the new server up on its own (`lunaut.server.autoUpdate`) and Zed starts the latest release, so neither needs a Marketplace or registry update for a new Luau. Run the same thing by hand:

```bash
python scripts/update_luau.py
```

---

## Releasing

Releases publish themselves. The version lives in one place, `project(lunaut VERSION x.y.z)` in `CMakeLists.txt`.

```bash
python scripts/release.py bump
```

Versions count up by `0.0.1` and carry over every ten, like an odometer: `0.0.1`, `0.0.2` … `0.0.9`, then `0.1.0`; after `0.9.9` comes `1.0.0`. `bump` without arguments picks the next one; it also takes an exact version like `0.3.0`. It writes the version into `CMakeLists.txt` and the VS Code extension and turns `## [Unreleased]` in `CHANGELOG.md` into `## [0.0.4] - <date>`. Commit and push to `main`.

On every push to `main` the [Release](.github/workflows/release.yml) workflow checks whether the tag `v<version>` exists. If it does not, it:

1. builds Windows, Linux and macOS (macOS is skipped when GitHub has no runner),
2. runs every test on each of them,
3. packages `lunaut.vsix` with the same version and the server of every platform inside; the extension starts the one for the machine it runs on,
4. creates the tag `v<version>` and publishes the release with the changelog section as notes and every binary attached.

Pushes that do not change the version release nothing. To rebuild any commit under a chosen version, run the workflow by hand: Actions → Release → Run workflow, with `ref` (commit, branch or tag), `version` and `latest` (whether it becomes the latest release). The daily Luau update also bumps the patch version, so merging its pull request ships the new Luau on its own. `python scripts/release.py notes 0.2.0` prints what the release notes will be.

### Branch and tag rules

The rules live in [`.github/rulesets`](.github/rulesets):

| Ruleset | Protects | Rules |
| --- | --- | --- |
| `main` | the default branch | no deletion, no force push, changes through pull requests, `build (windows-latest)` and `build (ubuntu-latest)` must pass |
| `release tags` | tags `v*` | nobody moves, overwrites or deletes them; GitHub does not let a personal repository exempt the Actions app, so creating tags stays open for the Release workflow |

Admins can bypass both, so you can still push to `main` directly. Apply or update them with

```bash
python scripts/apply_rulesets.py
```

or import the JSON files in Settings → Rules → Rulesets → Import a ruleset. GitHub offers rulesets for public repositories and on GitHub Pro and above; on a free private repository the script stops with GitHub's "Upgrade to GitHub Pro or make this repository public" message.

---

## Building from source

Needs CMake 3.20+, a C++17 compiler (MSVC, GCC or Clang, MinGW works) and git. Luau is a git submodule in `extern/luau`, so clone with it:

```bash
git clone --recursive https://github.com/TheExeDEV/lunaut.git
```

In a clone made without `--recursive`:

```bash
git submodule update --init
```

```bash
cmake -S . -B build -G Ninja -DCMAKE_BUILD_TYPE=Release
```

```bash
cmake --build build
```

The result is `build/lunaut(.exe)`, statically linked. nlohmann/json is fetched by CMake; point to a local copy with `-DFETCHCONTENT_SOURCE_DIR_JSON=path`. `-DLUNAUT_DEBUG=ON` turns on debug logging.

Code style is in [`AGENTS.md`](AGENTS.md); format with `clang-format -i` and the root `.clang-format`.

---

## Source layout

```
src/Lunaut/
├── core.d.hpp        every public type: the contract
├── project.hpp       project definitions
├── build.hpp.in      version info, generated by CMake
├── fflag_core.hpp    core compile-time flags
├── fflag.hpp         feature flags
├── Program.cpp       entry point, arguments
├── Cli/              analyze mode
├── Server/           JSON-RPC, LSP dispatch, protocol replies
├── Core/             workspace, file resolver, FFlags, definitions, .lunaut-declare, text documents,
│                     type display (TypeDisplay, TypeAliases, TypeComparer, TypeLookup, TypeNormalizer)
├── Features/         one LSP operation per file: hover, completion, definition, references, rename, ...
├── Models/           settings and enum names
├── Roblox/           sourcemap, instance requires, DataModel types, Rojo, crater packages, Roblox types
└── Util/             strings, glob, uri, processes, http, cache
extern/luau/          Luau, a git submodule
editors/vscode/       VS Code extension
installers/           install and uninstall scripts
scripts/              Luau update, release and ruleset scripts
tests/                test runner, suites and fixtures
```

---

## Limitations

- Rename covers locals, table members, globals and type aliases; generic parameters and table type fields are not renamed
- Go to definition does not reach Luau built-ins (`print`, `table.insert`), they have no source file
- Type hierarchy covers `declare extern type` classes; plain tables and metatables have no inheritance to show
- Outside VS Code Rojo autogeneration runs `rojo sourcemap` once per change, it does not keep `--watch` running, and the Studio plugin needs the VS Code extension to receive the tree
- Downloads (FFlags, Roblox definitions) use `curl`, which ships with Windows 10+, macOS and most Linux systems

---

## Acknowledgements

lunaut is built on [Luau](https://github.com/luau-lang/luau). Many ideas, the Roblox type extensions and the Roblox API definitions come from [luau-lsp](https://github.com/JohnnyMorganz/luau-lsp) by JohnnyMorganz (MIT).

---

## License

MIT, see [LICENSE](LICENSE).
