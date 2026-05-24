# zed-csharp-ls

A [Zed](https://zed.dev) language extension that provides C# support backed
by [csharp-ls](https://github.com/razzmatazz/csharp-language-server) — a
lightweight F#-based LSP for C#, distributed as a `dotnet tool`.

## Prerequisite

Install csharp-ls globally with the .NET CLI:

```sh
dotnet tool install --global csharp-ls --version 0.24.0
```

Make sure `~/.dotnet/tools` is on your `PATH` so Zed can locate the binary.
Verify with:

```sh
which csharp-ls
```

## Install (dev extension)

1. Clone this repo locally.
2. In Zed, open the command palette and run **zed: install dev extension**.
3. Select the cloned directory.

## Configuration

The extension forwards any `settings` block under `lsp."csharp-ls"` in your
Zed settings to the language server under the `csharp` key. Example:

```json
{
  "lsp": {
    "csharp-ls": {
      "settings": {
        "logLevel": "information",
        "applyFormattingOptions": false,
        "solutionPathOverride": null
      }
    }
  }
}
```

To override the binary path or pass extra arguments:

```json
{
  "lsp": {
    "csharp-ls": {
      "binary": {
        "path": "/custom/path/to/csharp-ls",
        "arguments": ["--loglevel", "debug"]
      }
    }
  }
}
```

If csharp-ls is not found, the extension surfaces an error pointing back to
the install command above. There is no auto-download fallback; csharp-ls
ships only as a `dotnet tool` NuGet package.

## Attribution

The tree-sitter grammar reference and the files under `languages/csharp/`
(`config.toml`, `brackets.scm`, `highlights.scm`, `indents.scm`,
`injections.scm`, `outline.scm`, `textobjects.scm`) are copied verbatim from
the official Zed C# extension at
[zed-extensions/csharp](https://github.com/zed-extensions/csharp), which is
licensed under Apache-2.0.

## License

Apache-2.0. See [LICENSE](LICENSE).
