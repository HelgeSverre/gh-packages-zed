# DreamMaker Language Server for [Zed Editor](https://zed.dev/)

Code for the `zed-dreammaker-langserver` Zed extention, providing linting, code navigation and syntax highlighting for the DreamMaker language.

<img width="712" height="222" alt="image" src="https://github.com/user-attachments/assets/1e951d12-1805-4ae3-b6d1-8563f05cd424" />


This extension relies on [SpacemanDMM](https://github.com/SpaceManiac/SpacemanDMM) by [SpaceManiac](https://github.com/SpaceManiac) and its prebuilt binaries of `dm-langserver.exe`, but you can always build your own binaries [here](https://github.com/SpaceManiac/SpacemanDMM/tree/master/crates).

The `tree-sitter` files can be found here: https://github.com/mcbalaam/dm-tree-sitter

Currently only tested on Windows x64, will get tested and receive Linux support later.

# Installation

1. Install the extension. This will build the `tree-sitter` for the syntax highliting and will take some time to complete when done for the first time.

*or, if installing manually*

1. Download as `.zip` and unpack or clone the repository. Open Zed, press `ctrl+shift+p` to bring up the command bar, select `zed: install dev extension` and navigate to the extension folder.

2. Open the latest release of SpacemanDMM [here](https://github.com/SpaceManiac/SpacemanDMM/releases/latest) and download the `dm-langserver.exe` binary.
3. Open the Zed settings as `.json` and add the following to your configuration:
```json
  "lsp": {
    "dm-langserver": {
      "binary": {
        "path": "C:\\path\\to\\your\\binary\\dm-langserver.exe"
      }
    }
  },
```

# Usage

Zed doesn't currently support status bar manipulation, which means you'll have to reparse your enviroment by restrtging the laguage servers. This can be done by clicking the lightning bolt icon on the status bar:

<img width="228" height="150" alt="image" src="https://github.com/user-attachments/assets/bbecd334-0228-411b-bc86-a242dd9b809d" />

You can also hold `ctrl` to navigate to parsed variables, functions, defines and classes by clicking on highlited strings.

