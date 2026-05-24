# zed-loc

Localization tooling for extracting and translating Zed runtime UI text.

[中文版本](README.zh-CN.md)

## Quickstart

Run `extract` against a clean English Zed source tree. If the source has already been localized, re-extracting from it will treat translated text as source text.

```bash
uv run zed-loc extract --crates-dir zed/crates
uv run zed-loc translate --locale zh-CN --limit 20 --dry-run
uv run zed-loc review --locale zh-CN --limit 20 --dry-run
uv run zed-loc stats --locale zh-CN
uv run zed-loc apply --locale zh-CN --dry-run
uv run zed-loc apply --locale zh-CN
```

```powershell
uv run zed-loc extract --crates-dir zed\crates
uv run zed-loc translate --locale zh-CN --limit 20 --dry-run
uv run zed-loc review --locale zh-CN --limit 20 --dry-run
uv run zed-loc stats --locale zh-CN
uv run zed-loc apply --locale zh-CN --dry-run
uv run zed-loc apply --locale zh-CN
```

## Source Tree States

- Clean English `zed/`: safe for `extract`, `translate`, and `apply`.
- Localized `zed/`: do not use as the official `extract` input; translated text would become source text.
- Updated upstream `zed/`: re-run `extract`, migrate or refresh the locale file, then verify with `apply --dry-run`.

`data/ui_text_catalog.json` is the current source catalog. Locale files are loaded with automatic v1-to-v2 migration and are saved as v2 on the next write. Older `ui_strings.json` data is legacy and is not part of the active pipeline.

## Project Layout

- `src/zed_loc/`: CLI and core implementation.
- `src/zed_loc/ai/`: AI translation and review domain, including client, parsing, prompts, context, memory, translate, and review services.
- `src/zed_loc/extract/`: internal extractor modules for rules, Rust AST traversal, literals, filters, macro fallbacks, and entry creation.
- `data/ui_text_catalog.json`: versioned source text catalog.
- `data/locales/{locale}/ui_text.json`: versioned locale translation files.
- `data/schemas/`: JSON schemas for catalog and locale files.
- `data/runs/translate/`: local translation audit log; ignored by git and not a versioned data asset.
- `tests/fixtures/`: focused Rust fixtures used by extractor regression tests.
- `zed/`: external Zed source tree; ignored by git.

## Locale Statuses

| Status | Meaning | Default `translate` | Default `apply` |
| --- | --- | --- | --- |
| `pending` | Entry needs a translation. | Yes | No |
| `needs_update` | Source text changed and the existing translation should be refreshed. | Yes | No |
| `translated` | Translation passed validation. | No | Yes |
| `needs_review` | Translation exists but needs human review, usually because placeholder validation warned. | No, unless explicitly selected | No, unless explicitly selected |
| `skipped` | Entry no longer maps to the current catalog or was intentionally skipped. | No | No |

## Translation

`translate` defaults to `pending` and `needs_update`. LLM calls use `--json-mode auto` by default: the request asks for JSON output when the provider supports it and falls back to plain chat completions when it does not. Translation prompts include glossary terms and up to three same-source translation memory examples by default.

For ambiguous UI text, you can opt into the bounded agent loop. It is off by default, uses provider-native tools, prefers same-file read-only context, and falls back to the ordinary one-shot prompt if it exhausts its step or tool budget.

```bash
uv run zed-loc translate --locale zh-CN --limit 20 --agent-loop
uv run zed-loc translate --locale zh-CN --limit 20 --agent-loop --agent-max-steps 4 --agent-max-tool-calls 6
```

Enable cross-file reads only when the same-file context is clearly insufficient:

```bash
uv run zed-loc translate --locale zh-CN --limit 20 --agent-loop --agent-allow-cross-file
```

To retranslate review items, pass an explicit status:

```bash
uv run zed-loc translate --locale zh-CN --status needs_review --limit 20
```

To disable translation memory:

```bash
uv run zed-loc translate --locale zh-CN --memory-context 0 --limit 20
```

Set API credentials through environment variables or pass them on the command line:

```bash
export OPENAI_API_BASE=https://api.deepseek.com
export OPENAI_MODEL=deepseek-v4-pro
export OPENAI_API_KEY=<your-api-key>
uv run zed-loc translate --locale zh-CN --limit 20
```

Non-dry-run translation saves local prompt, response, and batch metadata under `data/runs/translate/`. Agent-loop runs also write one trace per entry, including provider failure details when a batch aborts. This directory is ignored by git and is a local audit log, not a versioned data asset.

## Review

`review` asks the LLM to inspect existing translations without rewriting them. It defaults to `translated` and `needs_review`, updates structured review metadata, and marks entries with validation or AI review warnings as `needs_review`:

```bash
uv run zed-loc review --locale zh-CN --limit 20 --dry-run
uv run zed-loc review --locale zh-CN --limit 20
```

The same bounded agent loop is available for review when a translation needs deeper source inspection before judgment:

```bash
uv run zed-loc review --locale zh-CN --priority P0 --limit 20 --agent-loop
```

Review logs are saved under `data/runs/review/`. Agent-loop review failures still write the failed entry trace and batch metadata with provider error details for local debugging.

## Apply

`apply` writes translated locale entries back into Rust source by catalog location. It defaults to `translated` entries only:

```bash
uv run zed-loc apply --locale zh-CN --dry-run
uv run zed-loc apply --locale zh-CN
```

To also apply review items:

```bash
uv run zed-loc apply --locale zh-CN --status needs_review --dry-run
```

If a source string changed after extraction, `apply` reports a conflict and skips that entry. Re-run `extract` or inspect the source before applying again.

## Checks

```bash
uv run pytest
uv run ruff check
uv run zed-loc stats --locale zh-CN
uv run zed-loc apply --locale zh-CN --dry-run
```

## Docs

- [Project context](CONTEXT.md)
- [Workflow guide](docs/workflow.md)
- [AST catalog ADR](docs/adr/0001-ast-ui-text-catalog.md)
- [Translation/apply ADR](docs/adr/0002-translation-and-apply-pipeline.md)
- [Extractor rules](docs/extractor-rules.md)
