
# Elixir Code Snippets

This repository contains a collection of Elixir code snippets designed to be used in the Zed editor.
Inspired from the [VSCode Elixir Snippets extension](https://github.com/florinpatrascu/vscode-elixir-snippets.git).

## Migration Notes
Some of the original snippets have been modified either because they contain VSCode features not available in Zed or because they generate deprecated code :)
If you have a way to improve/enhance a snippet, please open an issue or pr for it.

## Installation

1. In Zed go to the extensions page.
2. Search for `Elixir Snippets`.
3. Click `Install`.

## Snippets Reference

| Prefix               | Description                                                               |
|----------------------|---------------------------------------------------------------------------|
| `case`               | case                                                                      |
| `cond`               | cond                                                                      |
| `def`                | def                                                                       |
| `df`                 | def (one line)                                                            |
| `defd`               | defdelegate                                                               |
| `defe`               | defexception                                                              |
| `defi`               | defimpl                                                                   |
| `dmac`, `defmac`     | defmacro                                                                  |
| `defmp`              | defmacrop                                                                 |
| `describe`           | describe                                                                  |
| `defp`               | defp                                                                      |
| `defpro`             | defprotocol                                                               |
| `defs`               | defstruct                                                                 |
| `do`                 | do                                                                        |
| `doc`                | doc                                                                       |
| `ee`                 | embed_eex                                                                 |
| `fn`                 | fn                                                                        |
| `for`                | for                                                                       |
| `fori`               | for into                                                                  |
| `if`                 | if                                                                        |
| `ife`                | if else                                                                   |
| `ifel`               | if else (one line)                                                        |
| `ifl`                | if (one line)                                                             |
| `imp`                | import                                                                    |
| `i`                  | inspect                                                                   |
| `ii`                 | IO.inspect                                                                |
| `iib`                | IO.inspect() binding() with module name & line number                     |
| `iil`                | IO.inspect(label: ...)                                                    |
| `iill`               | IO.inspect(label: "<optional message>; Module:line_nr")                   |
| `iip`                | IO.inspect() piped value with module name & line number                   |
| `ist`                | `IO.inspect` the current stacktrace                                       |
| `ip`                 | IO.puts(..)                                                               |
| `vv`                 | value: value                                                              |
| `kv`                 | key => value                                                              |
| `ms`                 | map/struct                                                                |
| `mdoc`               | moduledoc                                                                 |
| `mfs`                | Map from Struct                                                           |
| `mp`                 | Puts the given value under key in map                                     |
| `mpn`                | Puts the given value under key unless the entry key already exists in map |
| `msan`               | sanitize a map by dropping some keys                                      |
| `p`                  | your favorite pipeline (\|>)                                              |
| `pe`                 | print_eex                                                                 |
| `pry`                | Debug with IEx.pry                                                        |
| `rec`                | receive                                                                   |
| `req`                | require                                                                   |
| `unless`             | unless                                                                    |
| `oke`                | {:ok, ... } = ...                                                         |
| `erre`               | {:error, ... } = ...                                                      |
| `ok`                 | {:ok, ... } ...                                                           |
| `err`                | {:error, ... } ...                                                        |
| `test`               | test                                                                      |
| `testc`              | test with context                                                         |
| `trc`                | try catch                                                                 |
| `trr`                | try rescue (everything!)                                                  |
| `unlesse`            | unless else                                                               |
| `unlessel`           | unless else (one line)                                                    |
| `unlessl`            | unless (one line)                                                         |
| `supervisor`         | Insert code for an OTP Supervisor                                         |
| `dynamic_supervisor` | Insert code for a DynamicSupervisor                                       |
| `gen_server`         | Insert code for a OTP GenServer                                           |
| `ex_unit`, `exu`     | Insert code for a ExUnit                                                  |
| `wt`                 | with                                                                      |
| `wte`                | with/else                                                                 |

## Contributing

Feel free to fork the project and submit pull requests to add new snippets or improve existing ones.
