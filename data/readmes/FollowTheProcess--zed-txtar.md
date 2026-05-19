# Zed Txtar

A [Zed] extension for [txtar] files, powered by [tree-sitter-txtar].

## Features

- Syntax highlighting for the txtar archive format itself: pre-marker comments, filename markers, and content.
- Outline view, listing each archived file by its marker filename.
- Bracket matching across `-- name --` markers.
- **Embedded language injection.** Each archived file's content is parsed in
  the appropriate language based on its filename, so a `main.go` block is
  highlighted as Go, a `go.mod` block as Go Mod, an `App.swift` block as Swift,
  and so on. Falls back gracefully when a language is not installed.

### Injected languages

By extension: Go, Python, Rust, JavaScript, TypeScript, JSON, YAML, TOML,
Markdown, Bash, C, C++, Zig (`.zig` / `.zon`), Nushell, HTML, CSS, SQL, Lua,
Make (`.mk`), XML, Protobuf, GraphQL, Java, Kotlin, Swift, Ruby, PHP, Elixir,
Erlang, Nix, Haskell, OCaml, Dockerfile.

By full filename: `go.mod`, `go.sum`, `go.work`, `Dockerfile` (and
`Dockerfile.*` variants), `Makefile` / `GNUmakefile`, `Rakefile`, `Gemfile`.

Languages whose grammars are built into Zed (Go, Rust, Python, etc.) work out
of the box. Languages provided by other extensions (Zig, Nushell, Dockerfile,
SQL, Lua, etc.) require those extensions to be installed for highlighting to
appear inside the archived block.

[Zed]: https://zed.dev/
[txtar]: https://pkg.go.dev/golang.org/x/tools/txtar
[tree-sitter-txtar]: https://github.com/FollowTheProcess/tree-sitter-txtar
