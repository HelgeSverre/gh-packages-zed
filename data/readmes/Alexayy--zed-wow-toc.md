# zed-wow-toc — README.md
> Zed language extension that wires the wow_toc grammar to highlight .toc files.

## __What this extension provides__
  - A language with ```name = "WoW TOC"``` and ```grammar = "wow_toc"```
  - Highlights via ___tree-sitter___ queries (```highlights.scm```) and optional folds and indents
  - File association via ```path_suffixes = ["toc"]```

## __Install (dev/local)__
1. Ensure __Rust via rustup__ is installed
2. In Zed go to __Extensions -> Install Dev Extension__ and select this repos root where ```extension.toml``` lives. Zed will do the rest.
3. If something fails, open __Zed.log__ or run ```zed --foreground```

> If you're on Flatpak, the log and extension dirs are under app sandbox (same structure, different root): ```~/.var/app/dev.zed.Zed/data/zed/...```

## __Files of interest__
```bash
extension.toml
languages/
  wow_toc/
    config.toml
    highlights.scm
    folds.scm
    indents.scm
```

```languages/wow_toc/config.toml```
```toml
name = "WoW TOC"
grammar = "wow_toc"
path_suffixes = ["toc"]
line_comments = ["# "]
```
Language config must specify grammar = "<name>" and use path_suffixes (not file_types).

```extension.toml```
```toml
id = "wow-toc"
name = "World of Warcraft TOC"
version = "0.0.1"
schema_version = 1
authors = ["Lekica <aleksa.cakic@gmail.com>"]
description = "Syntax for .toc WoW addon manifests"
repository = "https://github.com/Alexayy/zed-wow-toc"

[grammars.wow_toc]
repository = "https://github.com/Alexayy/tree-sitter-wow_toc"
rev = "64bb8008cb206452735236da04af293a84d0f9b2"
```
