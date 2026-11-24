# CUDA

CUDA support for Zed, built on [tree-sitter-cuda](https://github.com/tree-sitter-grammars/tree-sitter-cuda). `.cu` and `.cuh` files get C++ highlighting plus CUDA-only syntax: kernel launches (`name<<<grid, block>>>(args)`), storage/execution specifiers (`__global__`, `__device__`, `__host__`, `__shared__`, `__constant__`, …), `__launch_bounds__`, `dim3`, and the built-in thread and block variables.

## Install

- Marketplace: `zed: extensions` → **CUDA** → **Install**.
- From source: `zed: extensions` → **Install Dev Extension** → pick this repository.

Zed builds the grammar on install. `.cu` is also claimed by Zed's built-in C++ language, so see [Which language owns `.cu`](#which-language-owns-cu) if a file opens as C++.

## Configuration

The extension adds no settings of its own: `languages.CUDA` accepts the same keys as any other language (indentation, `language_servers`, …).

### Which language owns `.cu`

Zed's built-in C++ language also lists `cu` and `cuh`, so a `.cu` file can still open as C++. Pin it:

```json
{
  "file_types": { "CUDA": ["*.cu", "*.cuh"] }
}
```

### Language servers

Zed attaches language servers per language, and the C/C++ servers are bound to `C++` and `C`, so none of them serves a file once it belongs to `CUDA`:

- `clangd`, which ships with Zed, has its language list compiled into Zed — it cannot be re-targeted from settings.
- Extension-provided servers, such as `clice`, can be: add `"CUDA"` to the `languages` array in that extension's manifest (`<Zed data dir>/extensions/installed/clice/extension.toml`, on Windows `%LOCALAPPDATA%\Zed\...`) and restart Zed.

```toml
[language_servers.clice]
languages = ["C++", "C", "CUDA"]
```

If the C/C++ tooling matters more than CUDA highlighting, keep `.cu` on the C++ language instead: `"file_types": { "C++": ["*.cu"] }`.

## License

GPL-3.0. The Tree-sitter queries are derived from Zed's own C++ language queries (`crates/grammars/src/cpp`), which are GPL-3.0.
