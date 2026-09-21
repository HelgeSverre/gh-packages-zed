# Spice Language Extension for Zed

Syntax highlighting and language server support for SPICE circuit netlists in the
[Zed](https://zed.dev) editor.

## Supported files

| Extension | Description |
|-----------|--------------|
| `.cir`, `.sp`, `.spi` | Circuit netlists |
| `.lib` | Model/subcircuit libraries |
| `.mod`, `.mdl` | Model files |

## Features

- Syntax highlighting via [tree-sitter-spice](https://github.com/MrPoloGit/tree-sitter-spice):
  component cards, `.subckt`/`.ends`, `.model`, other dot commands, numbers with engineering
  suffixes (`4.7k`, `100n`), behavioral expressions (`{V(a)-V(b)}`), and comments (`*`, `;`, `$`,
  `//`)
- Line comment toggling with `* `
- Bracket matching for `()` and `{}`
- Language server ([spice-lsp](https://github.com/MrPoloGit/spice-lsp), downloaded automatically):
  - Completion for dot-command directives (with docs) and `.subckt`/`.model` names (current file +
    includes)
  - Hover: built-in dot-command documentation, subcircuit port lists, model types
  - Go to definition and find references for `.subckt`/`.model`, across `.include`/`.lib` files
  - Document symbols / outline
  - Document formatting (whitespace normalization)
  - Diagnostics: unbalanced blocks, undefined subcircuit/model references, port-count mismatches,
    duplicate instance names
- Run the current netlist through a simulator via a "run" gutter button on `.tran`/`.ac`/`.dc`/`.op`
  lines (see [Running a simulation](#running-a-simulation))

## Running a simulation

`languages/spice/runnables.scm` tags simulation-analysis directives (`.tran`, `.ac`, `.dc`, `.op`,
`.noise`, `.tf`) as runnable, and `languages/spice/tasks.json` bundles a matching task that invokes
`ngspice -b $ZED_FILE`.

**I haven't been able to verify end-to-end whether Zed actually picks up an extension-bundled
`tasks.json` automatically** — this is a real gap even in Zed's own documentation (their tasks doc
lists "by language extension" as one of four ways tasks are defined, but doesn't document the exact
mechanism, and a GitHub discussion about adding default run tasks for built-in languages like C/C++
suggests this doesn't happen automatically even for languages Zed ships itself). If the gutter run
button doesn't appear or doesn't do anything for you, add the same task to your project's
`.zed/tasks.json` — that mechanism is stable and well-documented:

```json
[
  {
    "label": "Run SPICE ($ZED_FILENAME)",
    "command": "ngspice",
    "args": ["-b", "$ZED_FILE"],
    "tags": ["spice-run"],
    "use_new_terminal": false,
    "reveal": "always"
  }
]
```

The default command assumes [ngspice](https://ngspice.sourceforge.io/) is on your `PATH`. If you use
LTspice, HSPICE, or another simulator, change `command`/`args` to match (e.g. LTspice on macOS:
`"/Applications/LTspice.app/Contents/MacOS/LTspice"` with `["-b", "$ZED_FILE"]`).

## Not supported

A few other file types share the "SPICE" name or ecosystem but are out of scope for this
extension:

- **LTspice schematics** (`.asc`) and **symbols** (`.asy`)
- **LTspice simulation output** (`.raw`) - binary waveform data
- **NASA/NAIF SPICE toolkit kernels** (`.bsp`, `.tpc`, `.tls`) - spacecraft ephemeris data from an
  entirely unrelated "SPICE" (NASA's, not Berkeley's)

## Spice netlist example

```spice
* Example RC low-pass filter
.param VDD=5

.subckt lpf in out
R1 in mid 4.7k
C1 mid 0 100n
.ends lpf

X1 vin vout lpf
V1 vin 0 PULSE(0 {VDD} 0 1n 1n 1m 2m)

.tran 0 10m
.end
```

## Installation

### From Zed extension registry

Search for **Spice** in `zed: extensions`.

### Local development

```bash
# In Zed, open command palette and run:
# zed: install dev extension
# Point it at the spice-lang directory
```

### Related resources
- https://ngspice.sourceforge.io/docs.html
- https://www.analog.com/en/resources/design-tools-and-calculators/ltspice-simulator.html
