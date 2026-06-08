# cdot

**cdot** is a (**proof of concept**) language server proxy for C that adds UFCS-style (Uniform Function Call Syntax) dot completions on top of clangd.

It sits between your editor and clangd, passing everything through unchanged — except dot completions, where it injects free functions that follow the `type_function` naming convention as if they were methods.

```c
struct car { int speed; };
void car_set_speed(struct car *c, int speed);

int main() {
    struct car my_car;
    my_car.set_speed(  // ← cdot suggests this; clangd alone wouldn't
}
```

When you accept the `set_speed` completion, cdot rewrites it to the correct C call:

```c
car_set_speed(&my_car, )  // cursor lands inside the parens
```

---

## How it works

### UFCS convention

cdot recognises a function as a UFCS candidate for type `T` when:

- Its name starts with `T_` (e.g. `car_set_speed` for type `car`)
- Its first parameter is a pointer to `T` — either `struct T*` or a typedef (`T*`)

### Proxy architecture

```
Zed ──LSP──► cdot ──LSP──► clangd
               │
               └─ intercepts textDocument/completion
                  injects UFCS items into the response
```

Three async tasks run concurrently:

| Task | Role |
|------|------|
| **client handler** | Reads LSP messages from the editor, maintains a document store, resolves dot completions |
| **clangd writer** | Drains an mpsc channel into clangd's stdin |
| **clangd router** | Reads clangd's stdout; augments tracked completion responses before forwarding |

### Dot completion flow

1. Editor sends `textDocument/completion` (dot-triggered or ctrl+space)
2. cdot scans the stored document text to find the variable name before the dot
3. Resolves the variable's declared type by scanning backwards for its declaration
4. Scans all open documents for functions matching `<type>_*` with a pointer first parameter
5. Stores the candidates keyed by the request ID
6. Forwards the request to clangd unchanged
7. When clangd's response arrives, appends the UFCS items before sending to the editor

Type resolution and candidate scanning are purely text-based — no clangd indexing required, so they work instantly on freshly opened files.

---

## Installation

### Prerequisites

- Rust (stable) via [rustup](https://www.rust-lang.org/tools/install)
- [clangd](https://clangd.llvm.org/installation) on your PATH

### Build

```sh
git clone https://github.com/dxkyy/cdot
cd cdot
cargo build --release
```

Add `target/release/cdot` (or `target\release\cdot.exe` on Windows) to your PATH.

---

## Zed extension

The `extension/` directory contains a Zed extension that registers cdot as the language server for C files.

### Install as a dev extension

1. Open Zed → Extensions → **Install Dev Extension**
2. Select the `extension/` directory inside this repo

### Tell Zed to use cdot for C

Add this to your Zed `settings.json`:

```json
"languages": {
  "C": {
    "language_servers": ["cdot", "..."]
  }
}
```

The `"..."` keeps any other configured servers active. (However this isnt recommended, as clangd is Zed's default LSP for C, meaning cdot and clangd would run in parallel, causing weird bugs and duplicate code completions.)

---

## Configuration

Configure cdot through Zed's LSP settings. All options live under `initialization_options`:

```json
"lsp": {
  "cdot": {
    "initialization_options": {
      "clangdPath": "clangd-18",
      "clangdArgs": ["--query-driver=/usr/bin/*", "--clang-tidy"],
      "fallbackFlags": ["-std=c23"]
    }
  }
}
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `clangdPath` | string | `"clangd"` | Path or name of the clangd binary to spawn |
| `clangdArgs` | string[] | `[]` | Extra CLI arguments passed to clangd at startup |
| *anything else* | — | — | Forwarded to clangd as `initializationOptions` (e.g. `fallbackFlags`) |

cdot reads `clangdPath` and `clangdArgs` before spawning clangd, so they take effect at startup. All other keys pass through transparently and are handled by clangd directly.

---

## Limitations

- **Naming convention required.** Functions must follow `<type>_<verb>` with a pointer-to-type first parameter. Arbitrary free functions are not suggested.
- **Text-based only.** Type resolution is a backward scan for declarations; it does not use semantic analysis. Complex cases (casts, macros, chained calls) may not resolve.
- **Single-file scan.** Candidates are found by scanning documents open in the editor. Functions defined only in headers that haven't been opened won't appear.
- **Pointer vs. value detection** is based on whether `*` appears in the declaration text; it does not handle `typedef`d pointer types (e.g. `typedef struct car* Car`).
