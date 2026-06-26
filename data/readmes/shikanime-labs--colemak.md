# Colemak Nix Modules

Repository containing Nix modules for Colemak keyboard layout configurations,
migrated from the [shikanime dotfiles](https://github.com/shikanime/shikanime).

## Keymap Design Rationale

### Analysis and Optimization of Modal Editor Workflows

The transition between keyboard layouts, specifically from QWERTY to the
ergonomic Colemak layout, necessitates a re-evaluation of modal editor
keybindings. The legacy `HJKL` navigation cluster (an artifact of ADM-3A
terminal design) is scattered across rows in Colemak, causing unnecessary finger
movement and cognitive load.

This configuration optimizes for the **NEUI cluster** (`n` = left, `e` = down,
`u` = up, `i` = right) placed on the home row, reducing physical distance for
the four most frequent navigation commands.

### Ergonomic Theory

- Core navigation uses the home row NEUI diamond to minimize finger travel
- Vertical axis motions are mapped to index/middle fingers for repetitive
  navigation
- Displaced `HJKL` commands are restored to original functions (e.g., `h` =
  insert mode, `l` = undo)
- Minor modes (GoTo, View) preserve NEUI directional muscle memory

### Cross-Platform Parity

The same ergonomic principles are applied to both Helix and Zed (via Helix-mode
emulation) to ensure consistent muscle memory across editors.

#### Helix Implementation

The `modules/helix.nix` module includes:

- NEUI cluster for normal/select modes
- Restored `HJKL` command mappings
- GoTo/View mode optimizations

#### Zed Implementation

The `modules/zed-editor.nix` module includes:

- Helix-mode emulation with NEUI cluster
- Normal/select mode bindings parity with Helix

#### Neovim Implementation

The `modules/neovim.nix` module includes:

- NEUI cluster navigation for normal/visual modes
- Restored `HJKL` command mappings for Colemak layout
- Integration with Neovim's built-in keybinding system

## Available Modules

### `modules/default.nix`

Imports all editor modules and exposes the shared option namespace under
`colemak.*`.

### `modules/helix.nix` (`homeModules.helix`)

Helix editor Colemak keybinding configuration. Implements the NEUI cluster
navigation and restored displaced commands for Colemak layout users.

### `modules/zed-editor.nix` (`homeModules.zed-editor`)

Zed editor Colemak keybinding configuration with Helix-mode emulation. Includes
normal and select mode bindings for Colemak layout.

### `modules/neovim.nix` (`homeModules.neovim`)

Neovim editor Colemak keybinding configuration. Implements the NEUI cluster
navigation and restored displaced commands for Colemak layout users.

## Usage

Import the modules into your Home Manager configuration, then enable either the
umbrella switch (`colemak.enable`) or individual editor switches.

### Enable Everything

```nix
{ config, pkgs, ... }:

{
  imports = [
    inputs.colemak.homeModules.default
  ];

  colemak.enable = true;
}
```

### Enable A Single Editor

```nix
{ config, pkgs, ... }:

{
  imports = [
    inputs.colemak.homeModules.default
  ];

  colemak.neovim.enable = true;
}
```

## License

Apache License 2.0. See [LICENSE](LICENSE) for details.
