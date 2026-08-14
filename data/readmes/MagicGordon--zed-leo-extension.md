# Leo for Zed

A Zed extension for Leo and Aleo language support.

## Features

- Syntax highlighting for Leo files.
- Syntax highlighting for Aleo files.
- Outline symbols for Leo programs, structs, records, mappings, functions, transitions, and tests.
- Runnable markers for Leo test functions annotated with `@test`.
- Leo snippets.
- Leo LSP integration through `leo-lsp` from `PATH` or a configured binary path.

## Leo Tests

Zed currently requires a task template to bind runnable tags to commands. Add this once to your global Zed `tasks.json`:

```json
[
  {
    "label": "leo test $ZED_CUSTOM_test",
    "command": "leo",
    "args": ["test", "$ZED_CUSTOM_test"],
    "cwd": "$ZED_WORKTREE_ROOT",
    "tags": ["leo-test"],
    "save": "all",
    "use_new_terminal": false,
    "allow_concurrent_runs": true
  }
]
```

After this is configured, Leo functions annotated with `@test` show a runnable marker in the editor gutter.

## Tooling

The extension does not install Leo tooling. Install `leo`, `leo-fmt`, and `leo-lsp` separately, and make sure the commands are available on `PATH`.

If Zed cannot find `leo-lsp` on `PATH`, configure the binary in your Zed settings:

```json
{
  "lsp": {
    "leo-lsp": {
      "binary": {
        "path": "/absolute/path/to/leo-lsp",
        "arguments": [],
        "env": {}
      }
    }
  }
}
```

The `binary` setting is optional. Use it only when the default `leo-lsp` lookup is not enough.

## Formatting

`leo-lsp` 4.2.0 does not advertise LSP document formatting. `leo-fmt` currently formats files and directories in place. Zed external formatters must read source from stdin and write formatted source to stdout, so `leo-fmt` should not be configured as a Zed external formatter unless it gains stdin/stdout support.

To run `leo-fmt` manually from Zed, add a global task:

```json
[
  {
    "label": "leo fmt current file",
    "command": "leo-fmt",
    "args": ["$ZED_FILE"],
    "cwd": "$ZED_WORKTREE_ROOT",
    "save": "current",
    "use_new_terminal": false,
    "allow_concurrent_runs": true
  }
]
```
