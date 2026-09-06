# Monkey C for Zed

[Monkey C](https://developer.garmin.com/connect-iq/monkey-c/) (Garmin Connect IQ) language
support for the [Zed](https://zed.dev) editor: syntax highlighting, symbol outline,
indentation and snippets for `.mc` files.

> **Disclaimer**
>
> This is a small, lightweight community extension, and it is not affiliated with or endorsed
> by Garmin.
>
> Garmin publishes an [official Monkey C extension](https://marketplace.visualstudio.com/items?itemName=garmin.monkey-c)
> (2020), which provides a comprehensive suite of features including autocomplete, folding
> ranges, real-time errors, renaming and syntax highlighting — but it is written for
> **Visual Studio Code**, and there is no official Garmin support for Zed.
>
> In contrast, this extension provides lightweight syntax highlighting and editor support for
> those who prefer a minimal, fast setup. If you need diagnostics, completion or refactoring,
> the official extension in VS Code remains the fuller environment.

## Features

- Syntax highlighting for `.mc` files, driven by a tree-sitter grammar
- Symbol outline (`cmd-shift-o`) for modules, classes, functions, typedefs, module and class
  level variables, and enum members
- Bracket matching, auto-closing pairs and auto-indentation
- Comment toggling (`//`, `/* */`) and block-comment continuation
- Vim text objects for functions, classes/modules and comments
- 22 Connect IQ snippets — application, view, delegate, unit test, timer, control flow and
  more (type two characters of a prefix, or press `ctrl-space`)

## Installation

Open the extension list (`zed: extensions`, or **Zed → Extensions**), search for
**Monkey C**, and click Install. Zed compiles the grammar on first install, which takes a few
seconds.

Language specific settings key off the language name:

```json
{
  "languages": {
    "Monkey C": {
      "tab_size": 4
    }
  }
}
```

## What this extension does not do

There is no open-source Monkey C language server, so there are **no completions, diagnostics,
go-to-definition, renaming or formatting**. Everything here is powered by tree-sitter, which
parses your code but does not understand the Connect IQ SDK.

Only `.mc` sources are handled. Resource XML and `monkey.jungle` build files are left to
Zed's built-in languages. Building, running and side-loading still happen through the Connect
IQ SDK's `monkeyc` / `monkeydo` command line tools.

## Grammar accuracy

Highlighting uses [bombsimon/tree-sitter-monkey-c](https://github.com/bombsimon/tree-sitter-monkey-c),
pinned by commit in `extension.toml`. It was the most complete of the public Monkey C
grammars at the time of writing.

Measured over the 121 `.mc` files in
[garmin/connectiq-apps](https://github.com/garmin/connectiq-apps): **2.2% of lines** sit
inside a parse error (median file: 0%), and **758 of 759 functions** still appear in the
outline. Tree-sitter recovers inside the statement, so a construct it cannot parse usually
costs a single token its color rather than blanking the line.

Five constructs are not modelled yet:

| Construct | Example | Effect |
| --- | --- | --- |
| ByteArray literals | `var b = [0x01, 0x02]b;`, `new [size]b` | the `b` suffix colors as a variable |
| Single-segment imports | `using BluetoothMeshBarrel as Mesh;` | that line loses keyword/type colors |
| Enum members without a value or trailing comma | `enum { OFF, ON }` | members drop out of the outline |
| Typed catch clauses | `catch (e instanceof BadFormatException)` | no visible effect |
| Annotations with arguments | `(:typecheck(false))` | the closing `)` loses its color |

Issues and fixes for these belong
[upstream in the grammar](https://github.com/bombsimon/tree-sitter-monkey-c/issues); this
extension then only needs its `commit` pin moved forward.

## Development

Clone the repository, then run `zed: install dev extension` from the command palette and
select the directory. Re-run it after editing any file, or use `zed: reload extensions`.

```
extension.toml                    extension metadata + grammar pin
languages/monkey-c/config.toml    language settings (suffixes, comments, brackets, indent)
languages/monkey-c/*.scm          tree-sitter queries: highlights, brackets, indents,
                                  outline, textobjects, overrides
snippets/monkey c.json            snippets (Zed matches the file name to the lowercased
                                  language name, hence the space)
```

The registry ID is `monkey-c-ce` (community edition) rather than `monkey-c`, so that the
plain name stays available should Garmin ever publish an official Zed extension. Zed IDs are
global and cannot be changed after publishing; the display name can.

The grammar is registered as `monkey_c`, matching the `tree_sitter_monkey_c` symbol exported
by the upstream parser — that name is fixed by the grammar, not by this extension. For
grammar work, `[grammars.monkey_c].repository` also accepts a
`file:///path/to/tree-sitter-monkey-c` URL, so you can point Zed at a local checkout.

Releasing an update: bump `version` in `extension.toml`, then open a PR against
[`zed-industries/extensions`](https://github.com/zed-industries/extensions) updating the
`[monkey-c-ce]` entry to the new version and submodule commit.

Contributions are welcome — issues and pull requests for missing highlights, outline entries
or snippets are the easiest things to help with.

## Credits

- Grammar by [Simon Sawert](https://github.com/bombsimon/tree-sitter-monkey-c)
- Language coverage cross-checked against
  [ghisguth/vscode-monkey-c](https://github.com/ghisguth/vscode-monkey-c), the community
  VS Code extension this one takes its cue from

Garmin, Connect IQ and Monkey C are trademarks of Garmin Ltd. or its subsidiaries.

## License

[MIT](LICENSE)
