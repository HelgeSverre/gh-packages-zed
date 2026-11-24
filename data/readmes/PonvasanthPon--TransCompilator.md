# The TransCompilator Project

## What is TransCompilator?

TransCompilator is a compiler family whose source language is structured human
language rather than a conventional programming language. The name means
*translate + compile*: it reads instructions written in everyday language,
recovers their computational intent through deterministic grammar and lexical
analysis, lowers that intent into a typed intermediate representation, and
emits executable code.

It is not an AI code generator. There are no models, embeddings, or
probabilistic guesses in the compilation path. A TransCompilator program should
be readable by a person and reproducible by a machine.

The current implementation uses English as its source language, Core-7 as its
shared middle-end, and static x86_64 ELF64 as its first target. The long-term
architecture is many natural languages in, one Core-7 IR, and many native or
portable targets out; see [MANIFEST.md](MANIFEST.md).

## What is tc_r1?

`tc_r1` is the clean-slate Rust implementation of TransCompilator, currently
**`tc_r1` 0.1.0-alpha-preview**. It is a nine-crate `std`-only workspace with
zero external crates, zero ML, and zero network access.

English source flows through vendored CMU Link Grammar 5.13.2, paragraph and
block segmentation, a normalized clause tree, a three-way intent gate,
discourse and anaphora resolution, compositional `where`/`Given`/`then`
analysis, and deterministic quantifier lowering. The typed front end resolves
modules, checks types and generics, and lowers verified Core-7 IR.
`tc-codegen-x86` emits Intel-syntax assembly and links a static zero-libc
ELF64 binary. The reference interpreter executes the same verified IR, and
parity tests require identical exit status, stdout, stderr, and file effects
between both paths.

The eight `std/*.eng` modules are written in readable English and provide
`Option`/`Result`, a reusable-block allocator, console formatting and input,
growable text, generic lists, file I/O, integer/text maps, and math helpers.
They compile to the same static zero-libc target.

The same compiler crates power `tc`, `tc-lsp`, and `r1-editor`; neither the
LSP nor the editor shells out to the compiler.

## What English looks like

These are complete programs, not pseudo-code. They use ordinary prose: no
braces, no semicolons, no `Print` statements, and no indentation-based control
flow. The compiler recovers the algorithm from the English.

### A running Fibonacci total

```text
Start with 1 and 2. Keep generating the next number by adding the previous two numbers together, as long as the new number doesn't exceed 200. For each number in this entire sequence, including the starting two, add it to a running total. Whenever that total goes over 100, subtract 100 from it and count an overflow. At the end, print the final running total and how many overflows happened.
```

Output:

```text
75
3
```

The first line is the final running total; the second is the number of
overflows.

### Two boxes with guarded moves

```text
Imagine a red box starting with 5 and a blue box starting with 16. Walk through every number from 1 up to 40. If the number is a multiple of 3, move 4 from the blue box into the red box; otherwise, move 1 from the red box into the blue box. However, if a move would ever cause either box to drop below 5, skip it. Stop immediately as soon as the red box holds more than twice as much as the blue box. Finally, print the number where you stopped, followed by the amounts in the red box and the blue box.
```

Output:

```text
12
15
6
```

The simulation stops at step 12, with 15 in the red box and 6 in the blue box.

### A single pass over a list

```text
Start with the list of numbers 14, 7, 22, 9, 15, 4, and 18. Go through the list from left to right, comparing each number with the one immediately after it. Whenever the left number is larger than the right one, swap their positions and count a swap. After finishing that pass, remove any number from the list that is divisible by 3. Finally, print the remaining numbers in order, followed by the total number of swaps made.
```

Output:

```text
7
14
4
22
5
```

The four remaining numbers are printed first, followed by the total swap count.

Save any example as `program.eng`, then run it directly or compile it to a
standalone binary:

```bash
./target/debug/tc run program.eng
./target/debug/tc build program.eng -o program.elf
./program.elf
```

## Quickstart

From a checkout of this repository:

```bash
CARGO_NET_OFFLINE=true make build
./target/debug/tc --selftest
```

Create `hello.eng`:

```text
Say "Hello, world!".
```

Then:

```bash
./target/debug/tc run hello.eng
```

For a release build and the offline Zed setup, see
[Build Requirements](#build-requirements) and
[Language Server (`tc-lsp`) and Zed](#language-server-tc-lsp-and-zed).

## Release status

`0.1.0-alpha-preview` is an Alpha Preview. The core compiler, Core-7 IR and
verifier, reference interpreter, static ELF64 backend, eight `std/*.eng`
modules, CLI, language server, terminal editor, and Zed integration work end
to end. The English grammar surface is actively evolving; unsupported
constructs produce diagnostics rather than guesses.

The current suite is **1054/1054 passing**, including 63 headless `tc-lsp`
protocol tests, 68 compositional parity tests, 89 paraphrase-invariance tests,
38 casual-English and guard tests, the human-English battle suite, the
orthogonality matrix, the std purity gates, and the IR runtime-honesty test.
The release includes the fixed point of a five-round convergence campaign:
**640 fresh `.eng` programs**, **15,000 disjoint
differential/paraphrase/prose/crash seeds**, and **7 root-cause bugs fixed**
with permanent regressions. Round 5 completed its entire fresh budget with
zero bugs.

All eight `std/*.eng` modules pass the Version 2 pure-English readability
gate. The frontend auto-loads `std/io` as a prelude plus `std/list`,
`std/string`, and `std/math` when their everyday forms are used, lowers every
WordNet/VerbNet `Emit` concept (`Print`, `Show`, `Display`, `Output`, `Say`,
`Report`) without requiring `Use io.`, decomposes `where`/`Given`/`then`
clause graphs, tracks plural `their ...` and `the result` anaphora, and parses
English math noun phrases such as `the product of the sum of a and b and the
difference between c and d`. `trim <x>`, `the square root of <x>`, and natural
`starts with` / `ends with` / `contains` predicates work without boilerplate.
Polite and sequence openers (`Please`, `Now`, `First`, `Let's`), English
number words, natural predicates, inline list construction, and length/count
queries normalize into the same deterministic Core-7 forms, so paraphrases
preserve exact IR and ELF64 behavior. Compiler diagnostics suggest natural
spellings for unknown names and fields, explain reserved control words, and
point unresolved anaphors at concrete fixes; `std/list` and `std/string` add
everyday sum/average/minimum/maximum/contains/find/reverse and text
starts/ends/contains/trim/parse/format helpers in pure Version 2 English.

```bash
./target/debug/tc --selftest
./target/debug/tc build program.eng -o program.elf
./target/debug/r1-editor program.eng
./target/debug/tc-lsp --stdio
```

## Documentation

Project and agent documents:

- [Engineering contract for coding agents](AGENTS.md)
- [English authoring skill guide](SKILL.md)
- [Architecture manifest and roadmap](MANIFEST.md)
- [Contributing guide](CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)

Language and verification references:

- [English language specification](docs/TC_ENGLISH_SPEC.md)
- [Convergence final report](docs/CONVERGENCE_FINAL_REPORT.md)
- [Convergence limits](docs/CONVERGENCE_LIMITS.md)
- [Vocabulary & grammar coverage audit](docs/COVERAGE_AUDIT.md)
- [Round history](docs/CONVERGENCE_ROUNDS_HISTORY.json)
- [Bug catalog](docs/CONVERGENCE_BUGS.json)

## Hard properties

- **100% Rust `std`-only workspace** — all nine local `tc-*` crates (`tc-ir`,
  `tc-codegen-x86`, `tc-typeck`, `tc-lexicon`, `tc-syntax`, `tc-semantics`,
  `tc-cli`, `tc-editor`, `tc-lsp`) have zero crates.io dependencies and zero
  checksums in `Cargo.lock`.
- **Zero ML** — no models, embeddings, neural runtimes, or statistical
  weight files.
- **Zero network** — builds and tests run fully offline.
- **Static zero-libc target** — final binaries are ELF64 x86_64 with raw
  Linux syscalls and no `libc` or dynamic loader.
- **Vendored, read-only linguistic assets** — Link Grammar under
  `vendor/link-grammar/` and goldmine tooling under `goldmines/`.

## Build Requirements

- Linux x86_64
- Rust 1.85+ with edition 2024 support
- GNU `make`, `as`, and `ld` from binutils
- vendored CMU Link Grammar 5.13.2 under `vendor/link-grammar/`
- Python 3 only for the optional Zed settings helper
- no network access is required; all builds and tests run with
  `CARGO_NET_OFFLINE=true`

## Scope & Verification Note

`tc_r1` is classified as a **general-purpose English compiler with general NL
understanding**. English source is interpreted as English: discourse structure,
narrative context, intent, anaphora, quantification, and computational
directives are analyzed by the frontend, while executable meaning is lowered to
deterministic Core-7 IR. Interpreter/ELF64 parity verifies backend equivalence:
the same lowered Core-7 IR must produce identical exit status, stdout, stderr,
and file effects in the reference interpreter and static x86_64 binary.
Backend parity is a verification guarantee, not a replacement for
English-language understanding.

## Workspace layout

```text
tc_r1/
  Cargo.toml
  Cargo.lock
  Makefile
  README.md
  AGENTS.md
  SKILL.md
  MANIFEST.md
  CONTRIBUTING.md
  CHANGELOG.md
  LICENSE
  THIRD_PARTY_NOTICES.md
  .gitignore
  .github/workflows/ci.yml
  vendor/link-grammar/
  goldmines/
  crates/
    tc-ir/            # intermediate representation
    tc-codegen-x86/   # ELF64 x86_64 backend
    tc-typeck/        # typed AST, modules, generics, lowering
    tc-lexicon/       # WordNet/VerbNet/closed-class lexicon engine
    tc-syntax/        # Link Grammar FFI, segmentation, clause normalization
    tc-semantics/     # intent gate, phrase dispatch, unified Core-7 lowering
    tc-cli/           # end-to-end `tc` command-line driver
    tc-editor/        # native std-only R1 Editor (`r1-editor`) for .eng programs
    tc-lsp/           # std-only JSON-RPC Language Server (`tc-lsp`)
  editors/zed/        # offline zero-AI Zed settings, tasks, and tc-eng extension
  std/                # 8 Version 2 pure-English standard-library modules
  tests/              # integration-test placeholder
  docs/               # spec, convergence report, limits, and round history
```

## Dependency graph

```text
tc-ir           (no dependencies)
tc-codegen-x86  -> tc-ir
tc-typeck       -> tc-ir
tc-lexicon      (no dependencies)
tc-syntax       -> tc-lexicon
tc-semantics    -> tc-syntax, tc-lexicon, tc-typeck, tc-ir
tc-cli          -> all six library crates (binary: tc)
tc-editor       -> tc-ir, tc-codegen-x86, tc-typeck, tc-lexicon, tc-syntax, tc-semantics
tc-lsp          -> tc-ir, tc-typeck, tc-lexicon, tc-syntax, tc-semantics
```

The graph is strictly acyclic. The TUI and LSP call the compiler in-process;
neither shells out to a compiler binary. Every workspace crate remains Rust
`std`-only. `crates/tc-cli` produces the `tc` binary:

- `tc --version` prints `tc_r1 0.1.0-alpha-preview`.
- `tc --audit` checks the workspace crate identities and reports the exact
  WordNet, VerbNet, morphology, and closed-class counts.
- `tc --selftest` verifies, interprets, compiles, executes, and
  differentially checks a small Core-7 module, then prints `SELFTEST PASS`.
- `tc build <file.eng|file.tc> [-o <out_elf>] [-I <dir>]` compiles English
  to a static zero-libc ELF64 binary. `.eng` is the primary source extension;
  `.tc` remains a compatible fallback.
- `tc run <file.eng|file.tc> [-I <dir>] [-- <args...>]` compiles and
  executes it.
- `tc interp <file.eng|file.tc> [-I <dir>] [-- <args...>]` executes the
  verified Core-7 IR in the reference interpreter.
- `tc trace <file.tc> [-I <dir>] [--paraphrase]` prints per-sentence Link
  Grammar counts, lexicon provenance, intent verdicts, and formatted TC-IR;
  `--paraphrase` appends canonical resolved English.
- `tc paraphrase <file.eng|file.tc> [-I <dir>]` type-checks the program and
  prints the deterministic paraphrase echo, including `[it -> cash]`,
  `[its x -> p.x]`, `[the point -> origin]`, condition grouping, and omitted
  prose markers.

## Core-7 IR and backend

`tc-ir` exposes `types`, `ir`, `verify`, `fmt`, and `interp` modules. The IR
contains only seven irreducible machine primitives: typed values, raw
memory, control flow, functions, aggregates, raw syscalls, and traps. There
are no heap `String`/`List` operations, print statements, file opcodes, or
English-specific nodes.

`tc-codegen-x86` emits Intel-syntax assembly, assembles with GNU `as --64`,
and links with `ld -static`. It implements the System V AMD64 integer and SSE
argument/return conventions, spillover stack arguments, nested-call-safe
argument evaluation, indirect function calls, width- and sign-accurate
integer operations, IEEE-754 `f32`/`f64`, aggregates in memory, and raw
Linux syscalls with the `r10` fourth-argument convention.

## High-level front end

`tc-typeck` is a language-agnostic front end over the Core-7 IR:

- `ast` — typed high-level AST, declarative phrase patterns, spans, errors.
- `resolve` — module table, import DAG validation, aliases, visibility.
- `check` — lexical scopes, local inference, strict type checking,
  type-directed overloads, and generic type-argument inference.
- `mono` — demand-driven, deterministic monomorphization with an
  infinite-instantiation depth guard.
- `lower` — verified lowering to `tc-ir`, including `.rodata`
  deduplication and an internal pointer ABI for aggregate parameters and
  returns.

`check_and_lower` is the public AST-to-IR entry point;
`collect_phrases` validates and exports declarative English phrase
signatures for the English front end.

## English front end

`tc-syntax` wraps the vendored CMU Link Grammar 5.13.2 shared library through
a minimal safe FFI layer with owned cleanup and `$ORIGIN` run-paths. It
segments flowing paragraphs, numbered steps, semicolon clauses, strings,
decimals, colon-introduced indented blocks, and explicit `End.` closers, then
normalizes dependency links into active, passive, and imperative clause trees.
When Link Grammar produces no linkage, deterministic closed-class role
extraction takes over.

`tc-semantics` classifies every sentence into exactly one of `EXEC`,
`COMMENT_OMITTED`, or `UNSUPPORTED` using structural anchors, grammatical
tense, `tc-lexicon` evidence, and in-scope declarative phrases. It matches
`Phrase:` signatures attached to English functions, binds `<param>` captures
as expressions, and lowers the whole program through a single recursive
`lower_stmt` path with a 32-level guard. Identifiers are case-insensitive while
string and byte literals preserve exact case.

## Lexicon engine

`tc-lexicon` is a compact, deterministic, provenance-backed semantic layer:

- **777** WordNet rows from 43 exact OEWN-2025 anchor synsets, depth <= 3,
  sorted by `(lemma, pos, concept)`.
- **10,845** VerbNet 3.4 frames from all 329 class files and 609
  classes/subclasses, sorted by `(verb, prep, predicate, class_id)`.
- **103** irregular morphology rows plus 8,749 WordNet verb lemmas for
  deterministic lemma validation.
- **279** audited closed-class function words.
- `classify_verb`, POS-aware lookups, lemmatization, phrase-safe semantic
  concepts, and exact provenance IDs are exposed through binary-searched
  static tables.
- `goldmines/PROVENANCE.md` records dataset versions, hashes, anchors, counts,
  and the reproducible harvester commands.

The direct WordNet anchors are depth-zero additions for scalar magnitude,
unary math, and `Emit`; they add only their own synset members and do not open
broad `verb.change` hyponym trees.

## Anti-hardcoding bans

The compiler must derive behavior from general linguistic structure, never
from hand-curated English fragments. Three bans are non-negotiable:

1. **No per-verb lists in Rust.** Verb behavior belongs in general lexical
   or syntactic rules and data, not hardcoded Rust tables. Every open-class
   verb resolves through `tc-lexicon` generated WordNet/VerbNet tables.
2. **No library phrase hacks in Rust.** Multi-word expressions must follow
   from compositional rules, not special-cased phrase strings in source.
3. **No prose noun blacklists.** Token classification uses grammar, tense,
   structural anchors, and lexicon evidence, never hand-written banned-noun
   lists.

## Commands

```bash
make build       # cargo build --workspace
make release     # cargo build --workspace --release
make test        # build + cargo test --workspace
make lint        # cargo clippy --workspace --all-targets -- -D warnings
make fmt-check   # cargo fmt --all -- --check
make audit       # zero-ML, 9 local tc-* crates only, 0 external crates
make selftest    # verify + interpret + compile + execute + differential check
make editor      # launch the terminal editor (r1-editor)
make lsp         # launch the stdio Language Server (tc-lsp)
make clean       # cargo clean
```

## Continuous integration

`.github/workflows/ci.yml` runs formatting, clippy with warnings denied, an
offline workspace build, the full test suite, the zero-dependency audit, the
compiler audit/selftest, and a reproducible static ELF64 check on every push
and pull request against `main`. The job sets `CARGO_NET_OFFLINE=true` so a
network-dependent dependency cannot slip in unnoticed.

## English standard library (`std/`)

`Use io.`, `Use list.`, `Use alloc, core, and string.`, and the other
`std/` imports are resolved automatically after the importing file's
directory and any `-I` directories. Classic `Import io.` remains valid.
The resolver checks `TC_STD_DIR`, walks up from `/proc/self/exe`, and falls
back to the repository `std/` directory for `cargo test`. Transitive imports
are loaded with cycle detection.

```text
std/core.eng     Option, Result, panic, assert_true, mem_zero, mem_eq
std/alloc.eng    reusable-block free-list heap over Linux pages
std/io.eng       Say/Show/Print/Display formatting and byte-safe stdin
std/string.eng   growable TcString with a final zero byte
std/list.eng     generic List of T: push, pop, get, set, sort, free
std/fs.eng       File handles plus save/display/delete/exists helpers
std/math.eng     sqrt, abs, min, max, pow, clamp
std/map.eng      IntMap of V and StrMap of V with linear probing
```

The reference interpreter implements `openat`, `read`, `write`, `close`,
`lseek`, and `unlinkat` inside a per-run working directory, so file programs
produce byte-identical output and created-file bytes in both the interpreter
and the static ELF64 binary. No libc or filesystem helper is used by the
compiled program.


## R1 Editor (`.eng`)

`r1-editor` is a native, standalone, Rust `std`-only terminal editor for
English `.eng` programs. It calls the compiler crates in-process and never
spawns a browser, Python, or a GUI toolkit.

```bash
make build
./target/debug/r1-editor                 # empty .eng buffer
./target/debug/r1-editor budget.eng      # open or create budget.eng
./target/debug/r1-editor --list-presets  # eight ready-to-run .eng programs
./target/debug/r1-editor --check budget.eng
```

Keybindings:

```text
Ctrl+S Save    Ctrl+O Open    Ctrl+N New     Ctrl+Q Quit
Ctrl+Z Undo    Ctrl+Y Redo    Ctrl+F Find    Ctrl+E Pane
F1 Help        F2 Presets     F3 Stdin
F5 / Ctrl+R    Run native ELF64 + interpreter parity
F6 / Ctrl+P    Paraphrase echo
F7 / Ctrl+T    Trace + WordNet/VerbNet provenance
F8 / Ctrl+I    Core-7 TC-IR
F9 / Ctrl+B    Build <stem>.elf
```

The editor uses raw POSIX `termios`, an alternate screen, and RAII plus a
panic hook that always restores the user's terminal. Imports resolve
`<module>.eng` first and `<module>.tc` second in the active file's directory,
then in `-I` directories, then in the discovered `std/` directory. The three
`std/` presets (`06_std_io_and_math.eng`, `07_std_generic_list.eng`, and
`08_std_file_and_map.eng`) run through the same sandboxed parity path as the
five Core presets.

Build a standalone release binary with:

```bash
CARGO_NET_OFFLINE=true cargo build --release --bin r1-editor
./target/release/r1-editor
```

## Language Server (`tc-lsp`) and Zed

`tc-lsp` is a native Rust `std`-only LSP server. It speaks JSON-RPC 2.0 over
stdin/stdout with `Content-Length` framing and provides:

- live diagnostics with Levenshtein suggestions, reserved-word hints, and
  `UNRESOLVED_ANAPHOR` guidance;
- hover for ACE anaphors, WordNet/VerbNet provenance, variables, records,
  fields, functions, and omitted prose reasons;
- completion for `std/` modules, record fields, English comparators,
  multi-word variables, phrase templates, and Version 2 starters;
- go-to-definition including cross-file jumps into `std/*.eng`;
- document symbols for the Zed Outline panel;
- semantic tokens driven by the lowered project trace and symbol index,
  including verbs, control words, variables, fields, spoken numbers, strings,
  readonly ACE anaphors, and `COMMENT_OMITTED` prose;
- language-scoped monochrome typographic highlighting for `.eng` in Zed via
  `semantic_token_rules.json` (bold verbs/control, subtle-underlined
  variables, italic anaphors and strings, normal-weight numbers, muted italic
  prose).

```bash
CARGO_NET_OFFLINE=true cargo build --release --bin tc-lsp
./target/release/tc-lsp --stdio
```

Zed setup is in `editors/zed/` and is fully offline, zero-AI, and zero-sign-in:

```bash
./editors/zed/install_zed_config.sh
```

The helper builds and links `tc`, `tc-lsp`, and `r1-editor` into
`~/.local/bin`, backs up your existing Zed settings, and merges the Light
theme, disabled AI, disabled telemetry, disabled auto-update, and soft-wrap
configuration. Then open `tc_r1` in Zed, choose
`Extensions -> Install Dev Extension`, and select
`editors/zed/tc-eng-extension`. The five `tc:` tasks (`Run`, `Run + Parity
Check`, `Paraphrase`, `Trace`, and `Build Static ELF64`) are available from
the repository `.zed/tasks.json`.

## License

Copyright (c) 2026 Ponvasanth — All Rights Reserved (see `LICENSE`).
Third-party components are listed in `THIRD_PARTY_NOTICES.md`; the vendored
Link Grammar license text is in `vendor/link-grammar/LICENSE`.
