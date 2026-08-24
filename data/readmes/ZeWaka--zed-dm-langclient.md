# DreamMaker Zed Language Client

DreamMaker language support for [Zed], powered by [SpacemanDMM].

It provides syntax highlighting, code completion, diagnostics, hover,
goto-definition, references, symbols, Outline, and debugging for `.dm` and `.dme` files.

## Installation

Install **DreamMaker** from Zed's Extensions view. The extension downloads the
latest language server automatically.

Open the folder containing your `.dme` file. BYOND is detected from `PATH` and
standard Windows installation locations.

## Build and debug

Run `debugger: start` to build and launch DreamSeeker. Add a `.zed/debug.json`
profile for DreamDaemon or attach sessions:

```json
[
  {
    "label": "DreamMaker: DreamSeeker",
    "adapter": "byond",
    "request": "launch",
    "dmb": "$ZED_WORKTREE_ROOT/project.dmb",
    "cwd": "$ZED_WORKTREE_ROOT"
  }
]
```

The adapter accepts `byond_executable` for an explicit DreamSeeker or
DreamDaemon path, `byond_path` for a custom BYOND installation, and
`dreamDaemon: true` to select DreamDaemon automatically.

Use Zed's Outline and symbol search for code navigation. Restart the language
server after changing project configuration or includes.

## Development

```sh
rustup target add wasm32-wasip2
cargo test
cargo build --target wasm32-wasip2 --release
```

Install the repository with Zed's **Install Dev Extension** command.

[Zed]: https://zed.dev/
[SpacemanDMM]: https://github.com/SpaceManiac/SpacemanDMM

## License

DreamMaker Zed Language Client is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

DreamMaker Zed Language Client is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

The GNU General Public License can be found here: https://www.gnu.org/licenses/