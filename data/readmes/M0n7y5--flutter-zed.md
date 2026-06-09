# Dart & Flutter for Zed

A comprehensive, self-contained Dart and Flutter extension for the
[Zed](https://zed.dev) editor: the Dart analysis server over LSP, the
Dart/Flutter SDK debug adapters over DAP, tasks, gutter runnables, a debug
locator, snippets, semantic-token rules, and vim text objects - in one install.

It aims to bring the **editing + debugging** inner loop to parity with VS Code's
Dart-Code. The features that remain VS-Code-only need editor capabilities Zed
does not yet expose to extensions; those are documented in
[`docs/limitations.md`](docs/limitations.md), with browser/terminal bridges in
[`docs/devtools.md`](docs/devtools.md) and
[`docs/hot-reload-on-save.md`](docs/hot-reload-on-save.md).

> [!IMPORTANT]
> This extension **replaces** the official `dart` extension. Zed allows only one
> extension to own the `Dart` language and grammar, so **do not install both** -
> uninstall the official "Dart" extension before installing this one.

## Features

- **IntelliSense** from `dart language-server`: completion, hover, signature
  help, go-to-definition/references, rename, format, diagnostics, document &
  workspace symbols, inlay hints, call/type hierarchy.
- **Flutter assists & fixes** - "Wrap with Widget/Column/Padding...", "Convert to
  StatefulWidget", "child -> children", add/remove `const`, etc. (server-side
  code actions; available via the code-actions menu).
- **Debugging** (Flutter & Dart): breakpoints, stepping, variables, watch, call
  stack, console; launch & attach; device / build-mode / flavor / `--dart-define`
  selection; FVM support.
- **Run & debug from the gutter**: `main()` and tests are runnable; the bundled
  locator turns `flutter run`/`dart run` and `flutter test`/`dart test` into
  debug sessions (breakpoints hit in tests too). Per-platform `flutter run -d
  <chrome|web-server|emulator|iphone>` entries share that gutter menu (desktop
  linux/macos/windows live in the task picker).
- **Tasks**: run, test (`--coverage` too), `build` (apk/appbundle/ipa/web),
  `pub get`/`upgrade`/`outdated`, `build_runner` build/watch, `analyze`, `format`,
  `fix --apply`, `doctor`, `devices`, `emulators`, `Open DevTools`.
- **Snippets** (`stless`, `stful`, `stanim`, `build`, `initState`, ...),
  **semantic-token rules** for Dart's custom token types (opt-in), and **vim
  text objects** for functions/classes/comments.

## Requirements

- The Dart/Flutter SDK on your `PATH` (`dart` / `flutter`), or point
  `lsp.dart.binary.path` at it. [FVM](https://fvm.app) is supported.

## Install (as a dev extension)

1. Clone this repo.
2. In Zed: `zed: install dev extension` (command palette) -> select this folder.
   Zed compiles the Rust -> WASM and fetches the grammar.

## Debugging - `.zed/debug.json`

Create `.zed/debug.json` in your project. Every entry needs `"adapter": "Dart"`.
The full schema is in [`debug_adapter_schemas/Dart.json`](debug_adapter_schemas/Dart.json).

```json
[
  {
    "label": "Flutter (debug)",
    "adapter": "Dart",
    "type": "flutter",
    "request": "launch",
    "program": "lib/main.dart"
  },
  {
    "label": "Flutter on Chrome (dev flavor)",
    "adapter": "Dart",
    "type": "flutter",
    "device_id": "chrome",
    "flavor": "dev",
    "dartDefines": ["API_URL=https://dev.example.com"]
  },
  {
    "label": "Flutter on Android emulator",
    "adapter": "Dart",
    "type": "flutter",
    "device_id": "emulator-5554"
  },
  {
    "label": "Flutter on iOS simulator",
    "adapter": "Dart",
    "type": "flutter",
    "device_id": "iphone"
  },
  {
    "label": "Flutter (profile mode)",
    "adapter": "Dart",
    "type": "flutter",
    "mode": "profile",
    "device_id": "macos"
  },
  {
    "label": "Attach to running app",
    "adapter": "Dart",
    "type": "flutter",
    "request": "attach",
    "vmServiceUri": "ws://127.0.0.1:8181/abcdef=/ws"
  },
  {
    "label": "Flutter via FVM",
    "adapter": "Dart",
    "type": "flutter",
    "useFvm": true,
    "device_id": "linux"
  },
  {
    "label": "Dart CLI",
    "adapter": "Dart",
    "type": "dart",
    "program": "bin/main.dart"
  },
  {
    "label": "Debug current test file",
    "adapter": "Dart",
    "type": "flutter",
    "test": true,
    "program": "test/widget_test.dart"
  }
]
```

Config keys: `type` (`flutter`|`dart`, default `flutter`), `request`
(`launch`|`attach`, inferred `attach` when `vmServiceUri`/`vmServiceInfoFile` is
set), `program`, `cwd`, `device_id` (-> `-d <id>`), `mode`
(`debug`|`profile`|`release`), `flavor`, `dartDefines`, `toolArgs` (verbatim
extra args to `flutter run`), `args` (args to your program), `env`, `useFvm`,
`test` (run the file under `<tool> debug_adapter --test` so breakpoints hit in
tests), `vmServiceUri`, `vmServiceInfoFile`, `noDebug`, `stopOnEntry`,
`debugSdkLibraries`, `debugExternalPackageLibraries`.

### Debugging tests

`flutter test`/`dart test` gutter runnables get a **debug** action automatically:
the locator emits a `test: true` scenario that starts the SDK *test* debug
adapter (`<tool> debug_adapter --test`) with the test file as `program`, so
breakpoints in your tests are honored. Group/single (`?line=`) selectors debug
the whole file.

### Target platforms

Bundled `flutter run -d <platform>` tasks let you run or debug on a specific
device; the locator carries `-d <platform>` into the debug session. Two tiers:

- **Gutter + task picker** (tagged, so they show in the gutter run/debug menu
  over `main()`): `chrome` and `web-server` (web), `emulator` (a running Android
  AVD), `iphone` (a booted iOS Simulator, macOS only).
- **Task picker only** (`task: spawn`, run-only): `linux`, `macos`, `windows`
  desktop - host-specific, so they are kept out of the gutter menu. To debug on
  desktop, add a `.zed/debug.json` entry with `device_id`.

`emulator`/`iphone` rely on `-d` prefix matching (ids `emulator-5554`,
`iPhone 15`, ...); boot one with the `flutter emulators` task (e.g.
`flutter emulators --launch apple_ios_simulator`).

To list and boot a chosen emulator in one terminal step, add this to your
project `.zed/tasks.json` (it runs in your shell and uses POSIX `read`, so
macOS/Linux):

```json
{
  "label": "Flutter: launch emulator",
  "command": "flutter emulators; printf '\\nEmulator id to launch: '; read -r e && flutter emulators --launch \"$e\""
}
```

Zed has no native device picker (extensions can't add UI or prompt for input),
but the integrated terminal makes the `read` step work. Booting is async, so
launch first, then run with `flutter run -d emulator`/`-d iphone`.

`-d` matches a device id or name exactly, then by prefix; there is no
`android`/`ios` platform alias. For a physical phone, another simulator or
emulator, or any specific device - whose ids are dynamic - run the
`flutter devices` task to read the id, then set `device_id` in a `.zed/debug.json`
launch config or add a task with `"args": ["run", "-d", "<id>"]`. Device
targeting is a `flutter run` feature; `flutter test` ignores `-d`.

## Tasks

All tasks are available from the command palette via `task: spawn`. Tasks tagged
for the gutter also appear in the run/debug (`>`) menu over the relevant code.

### Run & debug (gutter over `main()` + `task: spawn`)

Each row also gets an auto-generated **Debug** entry (the locator reuses the
command).

| Task | Command | Runs on |
| --- | --- | --- |
| flutter run | `flutter run` | the default device |
| fvm flutter run | `fvm flutter run` | the default device, via FVM |
| flutter run -d chrome | `flutter run -d chrome` | web (Chrome) |
| flutter run -d web-server | `flutter run -d web-server` | headless web |
| flutter run -d emulator | `flutter run -d emulator` | a running Android emulator |
| flutter run -d iphone | `flutter run -d iphone` | a booted iOS simulator (macOS) |

### Tests (gutter over test code + `task: spawn`)

| Task | Command | Runs |
| --- | --- | --- |
| flutter test | `flutter test <file>` (FVM variant too) | the current Flutter test file |
| dart test file | `dart test <file>` | the current `package:test` file |
| dart test group / single | `dart test "<file>?line=<row>"` | the test file (debugs whole file) |
| flutter test --coverage | `flutter test --coverage` | the whole suite, writing `coverage/lcov.info` |

### Utilities (`task: spawn`)

| Task | Command | What it does |
| --- | --- | --- |
| desktop run | `flutter run -d linux / macos / windows` | run on desktop (run-only) |
| flutter pub get / upgrade / outdated | `flutter pub get` / `upgrade` / `outdated` | fetch / upgrade / list outdated packages |
| dart pub get | `dart pub get` | fetch packages (Dart-only) |
| flutter clean | `flutter clean` | delete build artifacts |
| flutter doctor | `flutter doctor -v` | environment diagnostics |
| flutter devices | `flutter devices` | list connected device ids |
| flutter emulators | `flutter emulators` | list AVDs / iOS sim (boot via `--launch`) |
| dart analyze | `dart analyze` | static analysis |
| dart format | `dart format .` | format the project |
| dart fix --apply | `dart fix --apply` | apply automated fixes |
| build_runner | `dart run build_runner build / watch` | code generation |
| Open DevTools | `dart devtools` | launch DevTools in the browser |

### Build & release (`task: spawn`)

| Task | Command | Output |
| --- | --- | --- |
| flutter build apk | `flutter build apk` | release APK under `build/app/outputs/` |
| flutter build appbundle | `flutter build appbundle` | Play Store `.aab` bundle |
| flutter build ipa | `flutter build ipa` | iOS archive (macOS + Xcode only) |
| flutter build web | `flutter build web` | static site under `build/web/` |

## Recommended settings

```json
{
  // Render LSP code lenses (off by default in Zed):
  "code_lens": "on",
  // Use the Dart analysis server's semantic tokens on top of tree-sitter:
  "languages": {
    "Dart": { "semantic_tokens": "combined" }
  },
  "lsp": {
    "dart": {
      // Workspace settings forwarded to the analysis server:
      "settings": {
        "lineLength": 100,
        "completeFunctionCalls": true,
        "enableSnippets": true
      }
      // FVM: pin the language server to your project SDK, e.g.
      // "binary": {
      //   "path": ".fvm/flutter_sdk/bin/dart",
      //   "arguments": ["language-server", "--protocol=lsp"]
      // }
    }
  }
}
```

## DevTools, the inspector, and hot reload

DevTools (widget inspector, performance, memory) runs in your browser against
the app's VM Service - see [`docs/devtools.md`](docs/devtools.md). Hot reload and
reload-on-save options are in [`docs/hot-reload-on-save.md`](docs/hot-reload-on-save.md).
What's blocked on Zed core and why is in [`docs/limitations.md`](docs/limitations.md).

## License

GPL-3.0-or-later. Incorporates Apache-2.0 material from
[`zed-extensions/dart`](https://github.com/zed-extensions/dart); see
[`NOTICE`](NOTICE).
