# phrost for Zed

[phrost](https://github.com/koroblabs/phrost) is a fast, lean PHP language server written in Rust:
generics and templates, PHPStan-strict null safety, and first-class Drupal and Laravel support, with
memory that follows your own code rather than `vendor/`.

> **Temporary home.** This extension exists until phrost is offered by Zed's own PHP extension. When
> it is, this repository will point there.

## Install

The extension is not in Zed's registry yet, so install it from a clone:

```sh
git clone https://github.com/koroblabs/phrost-zed
```

Then in Zed run **zed: install dev extension** and pick that directory. Zed builds the extension
itself, which needs a Rust toolchain installed through `rustup`.

The first PHP file you open fetches phrost from its
[releases](https://github.com/koroblabs/phrost/releases): macOS on Apple silicon or Intel, Linux on
x86_64 or arm64. It is kept until a newer release replaces it, and used offline. A `phrost` on your
`PATH` is used instead, so a build of your own wins:

```sh
cargo install --locked --git https://github.com/koroblabs/phrost phrost-cli
```

## Make it the PHP server

Zed's PHP extension brings its own servers, so tell Zed which one to run. In `settings.json`:

```jsonc
{
  "languages": {
    "PHP": {
      "language_servers": ["phrost", "!phpactor", "!intelephense", "!phptools", "!phpantom", "..."],
    },
  },
}
```

phrost also reads Blade and Twig templates and Drupal's YAML files. It attaches to them once Zed
knows those languages: install the Blade and Twig extensions for templates. YAML is built in.

## Settings

All optional, in Zed's settings:

```jsonc
{
  "lsp": {
    "phrost": {
      // A binary of your own, instead of PATH or the download.
      "binary": { "path": "/path/to/phrost", "arguments": ["serve"] },
      // The same settings as a `phrost.toml` at the project root, which they override.
      "initialization_options": {
        "lint": {
          "categories": ["correctness", "safety"],
          "on": ["doc-missing-tags"],
        },
        "diagnostics": { "project": true },
      },
    },
  },
}
```

A project's own settings belong in its `phrost.toml`: see
[phrost's README](https://github.com/koroblabs/phrost#configuration).

## Working on it

In Zed, run **zed: install dev extension** and pick this directory.
