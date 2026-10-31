# Zed Vim Keymapping

```text
  ________                  __                        __     __  ______  __       __ 
 /        |                /  |          __          /  |   /  |/      |/  \     /  |
 $$$$$$$$/   ______    ____$$ |         /  |         $$ |   $$ |$$$$$$/ $$  \   /$$ |
     /$$/   /      \  /    $$ |       __$$ |__       $$ |   $$ |  $$ |  $$$  \ /$$$ |
    /$$/   /$$$$$$  |/$$$$$$$ |      /  $$    |      $$  \ /$$/   $$ |  $$$$  /$$$$ |
   /$$/    $$    $$ |$$ |  $$ |      $$$$$$$$/        $$  /$$/    $$ |  $$ $$ $$/$$ |
  /$$/____ $$$$$$$$/ $$ \__$$ |         $$ |           $$ $$/    _$$ |_ $$ |$$$/ $$ |
 /$$      |$$       |$$    $$ |         $$/             $$$/    / $$   |$$ | $/  $$ |
 $$$$$$$$/  $$$$$$$/  $$$$$$$/                           $/     $$$$$$/ $$/      $$/ 
```

A Vim keymap for everyday development in Zed, paired with a searchable cheat sheet that keeps shortcuts close at hand.

Navigate files and tabs, jump to definitions, review Git changes, and work with Zed's AI tools from the keyboard. Common commands are grouped under `Space`, making them easier to find and remember.

**[Open the cheat sheet](https://pridees.github.io/zed-vim-keymapping/)**

Find a shortcut by key or command, browse commands by task, and explore both custom shortcuts and familiar Vim commands. Keep the cheat sheet open while you work, or use it to learn your next shortcut.

## Installation

Enable Vim mode in Zed, then run one command from the cloned repository root. The installer finds Zed's configuration directory, saves your original keymap in a separate backup for each run, and installs this one. It prints the installation and backup paths when finished.

### Linux / macOS

```sh
bash scripts/install.sh
```

### Windows (PowerShell)

```powershell
powershell -NoProfile -File .\scripts\install.ps1
```

The same shortcuts are installed on every platform; `Ctrl` remains Control on macOS.

The reference defaults come from [Zed](https://github.com/zed-industries/zed/blob/8dd255c3eafb5231056fe4e6f601cedd011f1c93/assets/keymaps/vim.json). See [reference/NOTICE.md](reference/NOTICE.md) for attribution. Project code and configuration: [MIT](LICENSE).
