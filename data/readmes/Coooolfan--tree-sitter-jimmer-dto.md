# tree-sitter-jimmer-dto

English | [简体中文](README.zh-CN.md)

A Tree-sitter grammar and LSP-independent [Zed](https://zed.dev/) language extension for the [Jimmer DTO language](https://babyfish-ct.github.io/jimmer-doc/docs/object-view/dto-language/).

The grammar follows Jimmer's authoritative [`Dto.g4`](https://github.com/babyfish-ct/jimmer/blob/main/project/jimmer-dto-compiler/src/main/antlr/org/babyfish/jimmer/dto/compiler/Dto.g4) and has been verified against all 66 official `.dto` samples at commit `cb239b914aa5f7bebdb2aa27c231265ee312b16e`.

## Supported syntax

- `export`, package remapping, regular/grouped/aliased `import`
- DTO declarations, modifiers, `implements`, nested DTO bodies
- positive, negative, computed, aliased, recursive, optional, required, and user properties
- `#allScalars`, `#allReferences`, alias groups, `fold`
- `#types`, `#exhaustive`, default and typed polymorphic branches
- annotations, nested annotations, arrays, Java/Kotlin class literals, and generic type references
- `!where`, boolean predicates, `!orderBy`, `!filter`, `!recursion`, `!fetchType`, `!limit`, `!batch`, and `!depth`
- enum mappings, string/SQL string/character/numeric/boolean literals, doc/block/line comments

`#allScalars`, `#types`, and other directives are syntax nodes, not comments.

## Build and test

Requires Node.js and a C/C++ toolchain.

```sh
npm install
npm run generate
npm test
```

To parse every official DTO sample, keep a current Jimmer checkout at `~/Documents/code/jimmer` or set `JIMMER_REPO`:

```sh
npm run test:samples
JIMMER_REPO=/path/to/jimmer npm run test:samples
```

The sample check fails on any `ERROR` or missing node. Semantic validation remains the responsibility of Jimmer or an LSP.

## Zed development installation

Prepare a local development extension:

```sh
npm run zed:prepare
```

Then open Zed's command palette, run **zed: install dev extension**, and select:

```text
<this-repository>/build/zed-dev-extension
```

Open a `.dto` file and select **Jimmer DTO** if needed. Highlighting, bracket matching, indentation, outline, and text objects work without an LSP or Semantic Tokens.

## Known boundaries

- Tree-sitter validates syntax only; model and property resolution requires Jimmer or an LSP.
- Outline omits ordinary projected properties to stay concise.

## License and attribution

This project is distributed under the [MIT License](LICENSE). Jimmer and `Dto.g4` are provided by [babyfish-ct/jimmer](https://github.com/babyfish-ct/jimmer) under Apache-2.0.

## Acknowledgements

- [babyfish-ct/jimmer](https://github.com/babyfish-ct/jimmer) for the DTO language, `Dto.g4`, and test samples.
- [Enaium/JimmerBuddyLSP](https://github.com/Enaium/JimmerBuddyLSP) for pioneering Jimmer support in Zed.
