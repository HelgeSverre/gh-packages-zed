# C! Zed Extension

A [Zed](https://zed.dev) extension adding language support for the
C! programming language.

Syntax highlighting, brackets, indentation, outline, text objects, and
construct-scoped editor overrides — all driven by the
[tree-sitter-cf](https://github.com/cf-lang/tree-sitter-cf) grammar.

## Install

**From the registry** (once published): Zed → Extensions → search **C!** → Install.

**As a dev extension** (local clone):

```sh
git clone https://github.com/cf-lang/zed-cf
```

Then in Zed run `zed: install dev extension` and pick the `zed-cf` directory.
Zed builds the grammar from the `repository` URL in `extension.toml` — no local
grammar checkout required.

## Layout

```
extension.toml             extension + grammar metadata
languages/cf/config.toml   language config (suffixes, comments, tabs, brackets)
languages/cf/highlights.scm syntax highlighting
languages/cf/brackets.scm   bracket matching
languages/cf/indents.scm    indentation
languages/cf/outline.scm    symbol outline
languages/cf/textobjects.scm Vim text objects
languages/cf/overrides.scm  per-construct setting scopes
grammars/                  build cache (gitignored; cloned + compiled by Zed)
```
