# About
This is a flake intended for consumers to use the latest pre-release versions of zed in a nix setup.

# Quickstart

## 1) Add this flake as a flake input

Import this flake into your `flake.nix`:
```nix
{
  inputs.zed-editor-pre.url = "github:rencire/zed-editor-prerelease-flake";
  ...
}

```


## 2) Reference the default package in your flake
Normally you can reference the package anywhere in your flake code  via `inputs.zed-editor-pre.packages.<system>.default`.

Here's a specific example setting up a developer environment with the  package in the `devshell` for a [`flakelight`](https://github.com/nix-community/flakelight) flake.
Note that `flakelight` provides `pkgs.inputs'`, which removes the need to sepcify the `system`.

```nix
{
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  inputs.flakelight.url = "github:accelbread/flakelight";
  inputs.zed-editor-pre.url = "github:rencire/zed-editor-prerelease-flake";

  outputs =
    { flakelight, ... }@inputs:
    flakelight ./. {
      inherit inputs;
      devShell = pkgs: {
        packages = with pkgs; [
          # Add zed-editor package here
          inputs'.zed-editor-pre.packages.default
        ];
      };
    };
}

```
  
