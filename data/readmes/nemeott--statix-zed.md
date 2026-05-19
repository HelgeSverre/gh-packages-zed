# Statix Zed

This is a Zed extension for [Statix](https://github.com/oppiliappan/statix), a static analysis tool for Nix. It provides lints and warnings for anti-patterns in Nix code, as well as quick fixes for some of them.

## Usage

Enjoy the underlined lints and warnings in your files. Hover over them to see the details and quick fixes. You can also apply fixes for some of them by using Zed's "Code Actions" feature.

## Installation

Before installing the extension, make sure `statix-lsp` is installed or in your `$PATH` (more information below). To install the Statix Zed extension, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/nemeott/statix-zed.git
```

2. Load the repository as a development extension in Zed.

3. If that isn't an option for you (NixOS), build the extension with the Nix flake:

```bash
nix build
```

4. Install manually by copying the built extension to your Zed extensions directory.

```bash
cp ./result/share/zed/extensions/statix ~/.local/share/zed/extensions/installed/ -r
```

5. You can also use the pre-compiled extension parts in `./compiled/statix/`. Just move them to your Zed extensions directory.

```bash
cp ./compiled/statix ~/.local/share/zed/extensions/installed/ -r
```

6. NixOS has an issue when compiling, where the permissions of the compiled extension are not set to be writable by the user. You can fix this by running:

```bash
chmod -R u+w ~/.local/share/zed/extensions/installed/statix
```

## Implementation

The extension is very basic, but it gets the job done well enough for me. This extension uses `statix-lsp` under the hood to provide the lints and warnings. You can find the project for `statix-lsp` here: [https://github.com/nemeott/statix-lsp](https://github.com/nemeott/statix-lsp).
