# OpenFOAM syntax highlighting for Zed

Provides syntax highlighting for OpenFOAM dictionary files in Zed editor using the [tree-sitter-foam](https://github.com/FoamScience/tree-sitter-foam) grammar.

## Installation
1. Open Zed
2. Press `Ctrl+Shift+x` (or `Cmd+Shift+x`)
3. Search for and install "openfoam.zed"
4. Open `settings.json` (e.g. `~/.config/zed/settings.json`) and add the following to enable syntax highlighting for OpenFOAM files:

```json
{
"modeline_lines": 0
}
```

## Installation for developers

1. Open Zed
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P`)
3. Search for "zed: install dev extension" and select this directory
4. Open `settings.json` (e.g. `~/.config/zed/settings.json`) and add the following to enable syntax highlighting for OpenFOAM files:

```json
{
"modeline_lines": 0
}
```

## Supported Files

- System dictionary files: `blockMeshDict`, `controlDict`, `fvSchemes`, `fvSolution`
- Field files: `U`, `p`, `T`, `k`, `epsilon`, `omega`, `nut`, `nuTilda`
- And more OpenFOAM dictionary files

## Examples

The `examples/` directory contains sample OpenFOAM dictionary files from the pitzDaily tutorial case:

- `controlDict` - simulation control parameters
- `fvSchemes` - numerical schemes configuration
- `fvSolution` - solver settings and tolerances
- `blockMeshDict` - mesh generation dictionary
- `U` - velocity field boundary conditions
- `p` - pressure field boundary conditions

Open any of these files in Zed to see the syntax highlighting in action!

As this extensions relies on the upstream `tree-sitter-foam` grammar, any updates or improvements to that grammar will automatically enhance the syntax highlighting provided by this extension. Contributions to the grammar are welcome!