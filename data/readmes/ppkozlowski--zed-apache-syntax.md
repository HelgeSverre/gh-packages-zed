# zed-apache-syntax

Syntax highlighting for Apache HTTP Server 2.4 configuration files in [Zed](https://zed.dev).

Built with a custom [Tree-sitter](https://tree-sitter.github.io) grammar — structural approach that models the shape of Apache config (blocks, directives, value types) rather than enumerating all 300+ directive names.

## Features

- Syntax highlighting for directives, block containers, strings, comments, variables, flags, and more
- Bracket matching for `<Tag>` / `</Tag>` pairs
- Auto-indentation inside blocks

## Installation (Dev Extension)

1. Clone this repo
2. In Zed: command palette → `zed: install dev extension` → select the repo root
3. Open any `.conf` file — Zed will detect Apache configs via `first_line_pattern`

## Supported Syntax

- All 27 Apache container types (`VirtualHost`, `Directory`, `IfModule`, `If`/`ElseIf`/`Else`, `Macro`, `RequireAll`, etc.)
- Directives with arbitrary arguments
- Quoted strings with escape sequences
- Variable substitution (`${VAR}`, `%{HTTP_HOST}`)
- RewriteRule backreferences (`$1`, `%1`)
- Flag lists (`[R=301,L,QSA]`)
- Line continuation (`\` at end of line)
- Comparison operators in `<IfVersion>`

## Built with Claude Code

This extension was designed and implemented entirely using [Claude Code](https://claude.ai/code) — Anthropic's agentic CLI for software engineering. The full process went from an initial prompt through brainstorming, design spec, implementation plan, and subagent-driven development with automated spec compliance and code quality reviews.
