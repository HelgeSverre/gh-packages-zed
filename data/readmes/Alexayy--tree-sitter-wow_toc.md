# tree-sitter-wow_toc (grammar)
> Tree-sitter grammar for World of Warcraft .toc files.

## __What it covers__
  - _## Key: Value __tags__ (Interface, Title, Notes, etc...)_
  - _# __comments___
  - _Ordered __file list__ entries (eg. Core/Init.lua, UI/layout.xml). Load order is significant in WoW_

### __Repo layout__
```bash
grammar.js
tree-sitter.json
src/
  parser.c
queries/
  highlights.scm
  folds.scm
  indents.scm
TestAddon/
  smoke-test.toc
```

### __Quick start__
```bash
cargo install --locked tree-sitter-cli
tree-sitter init
tree-sitter generate
```
- tree-sitter.json sets ABI/version; current CLI emits language ABI 15. Older ABIs are generally supported, forward-compat isn’t.

### __Highlights (queries)__
Minimal __queries/highlights.scm__
```scm
(tag key: (key) @label)
(tag ":" @punctuation.delimiter)
(tag value: (value) @string)
(comment) @comment
(file_line path: (path) @string)
```
Tree-sitter queries match AST nodes and apply captures (the @name bits) that editors map to theme styles.

Optional folding:
```scm
((tag)+) @fold
((file_line)+) @fold
```

# tldr
- Line oriented format: treat newline as a token, not an “extra”.
- Use named child nodes (eg: key, value, path) if you want to target them with field captures in queries.

## Sample toc
```toc
## Interface: 110205
## Title: MyAddon
## Notes: Demo TOC covering common tags, comments, and file list.
## Author: Your Name
## Version: 0.0.1

## RequiredDeps: Blizzard_APIDocumentation
## OptionalDeps: Ace3, LibSharedMedia-3.0

## SavedVariables: MyAddonDB
## SavedVariablesPerCharacter: MyAddonCharDB

## LoadOnDemand: 1
## DefaultState: enabled

## X-Category: Chat
## X-Website: https://example.com/myaddon
## X-Localizations: enUS, deDE, frFR

Core/init.lua
Core/events.lua
UI/layout.xml
Modules/feature.lua
Media/sounds/notify.ogg
```
