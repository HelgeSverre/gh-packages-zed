# Bison language support for Zed

## What's it for
- Provide Bison/Yacc editing support in Zed using tree-sitter: syntax highlighting, basic indentation/brackets, outline, and C/C++ code injection inside actions and prologue/epilogue blocks.

## Features
- Syntax highlighting for Bison/Yacc grammar files.
- Basic indentation and bracket matching for Bison/Yacc grammar files.
- Outline view for Bison/Yacc grammar files.
- C/C++ code injection inside actions and prologue/epilogue blocks.

## Directory structure
```
.
├── extension.toml                # Zed extension manifest
├── languages/
│   └── bison/
│       ├── config.toml           # language metadata, suffixes, comments, brackets
│       ├── highlights.scm        # syntax highlighting captures
│       ├── injections.scm        # C/C++ injections for actions/prologue
│       ├── brackets.scm          # bracket pairs
│       ├── indents.scm           # indentation rules
│       └── outline.scm           # outline entries for rules
├── grammars/
│   └── tree-sitter-bison/        # (optional) locally cloned grammar fork; ignored by git
├── samples/                      # sample .y files for testing
├── scripts/
│   └── verify-grammar.sh         # build grammar (WASM+native) and parse samples
└── README.md
```

## Known limitations
- Highlighting is minimal; directives and grammar bodies are covered, but finer semantic scopes (types, precedence hints, `%code` variants) are still TODO.
- Indentation is basic; `|` continuations and multi-line actions may need tuning.
- Injections default to `c`; if your actions/prologue are C++, switch the injected language accordingly.
- Outline only lists rule declarations; declarations (`%token`, `%type`, etc.) are not yet surfaced.
- Error recovery can surface `ERROR` nodes on malformed rules; highlight tuning for those is pending.

## Thanks to
- Grammar: https://gitlab.com/btuin2/tree-sitter-bison.
  btuin2's work provides most of the grammer implementation.
- Zed extension layout follows https://github.com/zed-industries/extensions conventions.


## License
- Extension configuration, scripts in this repo, and the bundled grammar are LGPL-3.0-or-later per the upstream grammar; include its license files when distributing.
