# ASM for Zed

A Zed extension for assembly languages - currently handles AArch64 (ARM64.)

Provides syntax highlighing and uses [asm-lsp](https://github.com/bergercookie/asm-lsp) to provide formatting and definitions.

## Prerequisites

Install asm-lsp:

    cargo install asm-lsp

It should download natively, please let me know if it does not.

## LSP Configuration

asm-lsp looks for `.asm-lsp.toml` in your project root, then falls back to
`~/.config/asm-lsp/.asm-lsp.toml`. If neither exists, it uses built-in defaults.

asm-lsp handles all architectures but needs different configurations in .asm-lsp.toml.

This is done by creating the file and restarting the server - if you are lazy, use `asm-lsp gen-config` in a project or use `--global-cfg`.

### Manual Suggestions for LSP

Here they are below (assuming clang):

#### AArch64 (ARM64)
```
    [default_config]
    assembler = "gas"
    instruction_set = "arm64"

    [default_config.opts]
    compiler = "clang"
    compile_flags_txt = []
    diagnostics = false
    default_diagnostics = false
```

#### x86-64/x86
```
    [default_config]
    assembler = "nasm"
    instruction_set = "x86/x86-64"
    
    [default_config.opts]
    compiler = "clang"
    compile_flags_txt = []
    diagnostics = false
    default_diagnostics = false
```


    
## Development

If you have a feature request or bug, please let me know via the issues tab!
Please see the [developing extension section in the Zed documentation](https://zed.dev/docs/extensions/developing-extensions).

- n0blenote
