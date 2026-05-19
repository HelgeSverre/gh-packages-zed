# Avalonia for Zed

Zed extension that adds Avalonia `.axaml` support:

- `.axaml` file association (`Avalonia` language)
- XML-based Tree-sitter highlighting for Avalonia markup
- Avalonia language server startup from `euphoo-01/ls_for_avalonia` release assets

## Requirements

- Rust (installed via `rustup`)
- `wasm32-wasip2` target:
  - `rustup target add wasm32-wasip2`
- Zed (`zeditor` CLI on this machine)
- .NET SDK (for validating completion in a real Avalonia project)

## Build

From the extension root:

```bash
./build.sh
```

This builds the extension for `wasm32-wasip2` and writes `extension.wasm` at repo root.

## Install as Dev Extension

1. Open Zed.
2. Open command palette.
3. Run `Install Dev Extension`.
4. Select this repository directory.

To debug extension loading/runtime:

```bash
zeditor --foreground
```

## Language + Grammar Layout

- Language config: `languages/avalonia/config.toml`
- Highlight queries: `languages/avalonia/highlights.scm`
- Manifest: `extension.toml`
  - registers the Avalonia language
  - registers Tree-sitter grammar `xml` (from `tree-sitter-grammars/tree-sitter-xml`)
  - registers language server `avalonia-ls`

## Language Server Behavior

The extension downloads release assets from:

- `https://github.com/euphoo-01/ls_for_avalonia`

Asset mapping:

- Linux x86_64: `avalonia-ls-linux-x86_64.tar.gz`
- Linux aarch64: `avalonia-ls-linux-aarch64.tar.gz`
- macOS x86_64: `avalonia-ls-macos-x86_64.tar.gz`
- macOS aarch64: `avalonia-ls-macos-aarch64.tar.gz`
- Windows x86_64: `avalonia-ls-windows-x86_64.zip`

Downloaded binaries are stored in Zed extension workdir:

- `~/.local/share/zed/extensions/work/avalonia-zed/`

## Validation Checklist

1. Install as dev extension and open an `.axaml` file.
2. Confirm language is `Avalonia`.
3. Confirm highlighting for tags, attributes, strings, comments, and punctuation.
4. Check logs:
   - `Open Log` in Zed, or:
   - `rg -n "avalonia|axaml|language server|failed" ~/.local/share/zed/logs/Zed.log`

## Completion Validation (Real Project)

`ls_for_avalonia` completion requires generated metadata plus build output.

In the Avalonia project directory:

1. Run metadata generator:
   - `avalonia-solution-parser .`
2. Build project:
   - `dotnet build`
3. Re-open `.axaml` in Zed and test completion.

If metadata generation tool is not installed globally, run it from built `SolutionParser` output:

```bash
dotnet /path/to/SolutionParser.dll .
```

## Troubleshooting `Server reset the connection`

If Zed shows:

- `initializing server avalonia-ls ... Server reset the connection`

check `zed: open log` for `avalonia-ls` start/shutdown events.

Current extension behavior:

- starts the server with `--stdio` explicitly;
- downloads release assets from `euphoo-01/ls_for_avalonia`.

If upstream release `v0.1.0` still exits on your machine, run a patched local server binary and point the extension to it:

```bash
export AVALONIA_LS_BINARY=/absolute/path/to/AvaloniaLanguageServer
```

Then restart Zed. The extension will prefer `AVALONIA_LS_BINARY` over downloaded assets.

## Notes

- The extension does not require a preinstalled `avalonia-ls` in `PATH`.
- `extension.wasm` is generated and should be rebuilt when Rust code changes.
