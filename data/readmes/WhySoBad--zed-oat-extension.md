# zed-oat-extension

A Zed extension which adds syntax highlighting to the Oat language. The extension is powered by the [`tree-sitter-oat` grammar](https://github.com/WhySoBad/tree-sitter-oat).

## Installation

The extension is added to the official zed extension catalog, simply search after an extension named *Oat* and install it.

## Setup

Out-of-the-box, the extension matches all `.oat` files. If you want to match more file types, you need to edit the `file_types` mapping in your `settings.json` file.

## Development

To help developing this extension you need to install it as an dev extension. For this you'll have to have cargo installed and the wasm32-wasip2 target ond the stable rust toolchain set up. Additionally, you'll need to clone this repository to some location from where you can install it as a dev extension. A more detailed tutorial about this can be found in the [Zed docs](https://zed.dev/docs/extensions/developing-extensions#developing-an-extension-locally).


### tree-sitter queries

All tree-sitter queries for the extension are stored as git diffs which can be patched into the tree-sitter grammar. This patching automatically happens during the build phase.

To create a new query diff which can be patched, you need to copy all `.scm` files from this repository into the `tree-sitter-oat/queries/oat` directory or patch the diffs directly onto it.

Then, new diffs can be generated using
```bash
# Create git diff for a new file
git diff /dev/null queries/oat/<path-to-query>.scm > output.diff
# Create git diff for a file which was modified
git diff queries/oat/<path-to-query>.scm > output.diff
```
and then copied into the `patches` folder of this repository.