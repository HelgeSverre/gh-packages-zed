# Hostlinku IDE & Coding Agent Setup

[![CI](https://github.com/dyocodes/hostlinku-ide-setup/actions/workflows/ci.yml/badge.svg)](https://github.com/dyocodes/hostlinku-ide-setup/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**English** | [Bahasa Indonesia](README.id.md) | [日本語](README.ja.md) | [简体中文](README.zh-CN.md)

Ready-to-use configuration templates, base URL cheat sheet, and an endpoint verifier for connecting **Cursor**, **Cline / Roo Code**, **Zed**, **Codex CLI**, **OpenCode**, and **Continue** to [Hostlinku](https://hostlinku.com).

## Base URL cheat sheet

| Client | Provider / Mode | Base URL | Template |
|---|---|---|---|
| **Cursor** | Override OpenAI Base URL | `https://api.hostlinku.com/v1` | UI settings |
| **Cline / Roo Code** | OpenAI Compatible *(recommended)* | `https://api.hostlinku.com/v1` | UI settings |
| **Cline / Roo Code** | Anthropic (custom base URL) | `https://api.hostlinku.com` *(no `/v1`)* | UI settings |
| **Zed** | `openai_compatible.hostlinku` | `https://api.hostlinku.com/v1` | [`configs/zed-settings.json`](configs/zed-settings.json) |
| **Codex CLI** | Custom provider (`wire_api = "responses"`) | `https://api.hostlinku.com/v1` | [`configs/codex-config.toml`](configs/codex-config.toml) |
| **OpenCode** | `@ai-sdk/openai-compatible` | `https://api.hostlinku.com/v1` | [`configs/opencode.json`](configs/opencode.json) |
| **Continue** | `openai` | `https://api.hostlinku.com/v1` | [`configs/continue-config.json`](configs/continue-config.json) |

## Verify your key first

Test `/v1/models`, `/v1/chat/completions`, and `/v1/responses` before pasting the key into your editor (no dependencies, Node.js ≥ 18):

```bash
HOSTLINKU_API_KEY=sk-your-api-key node scripts/verify-ide-endpoint.mjs
```

## Client notes & gotchas

- **Cursor:** `Verify` sends requests from Cursor servers (`localhost` URLs fail; `https://api.hostlinku.com/v1` works). Cursor Tab (autocomplete) stays on Cursor's own backend; Chat, Cmd-K, and Agent use Hostlinku. If streaming stalls, set *HTTP Compatibility Mode* to **HTTP/1.1**.
- **Cline & Roo Code:** Use **OpenAI Compatible** to access any catalog slug (Claude, GPT, DeepSeek). If using **Anthropic**, drop `/v1` from the base URL (`https://api.hostlinku.com`) and pick only Claude IDs recognized by Cline.
- **Zed:** Declare every model under `language_models.openai_compatible.hostlinku.available_models` in `settings.json`, then paste your key in Agent Panel settings (or export `HOSTLINKU_API_KEY`). Zed Edit Predictions use `/v1/completions` (FIM) which Hostlinku does not expose — keep Edit Predictions on default.
- **Codex CLI:** Must go in `~/.codex/config.toml` (not project-local `.codex/config.toml`) with `wire_api = "responses"`. In Performance/Economy modes, use OpenAI/GPT slugs (`gpt-5-5`, `gpt-5-6-luna`, `gpt-6-astra`); Claude and domestic models are not supported in Codex CLI.
- **OpenCode:** Put your key in `~/.config/opencode/hostlinku-api-key.txt` and reference it with `{file:~/.config/opencode/hostlinku-api-key.txt}` inside [`configs/opencode.json`](configs/opencode.json). Restart OpenCode after saving.
- **Continue:** Works for `chat`, `edit`, and `apply` roles (`configs/continue-config.json`, or translate to `~/.continue/config.yaml`). Leave `autocomplete` / `embed` / `rerank` to dedicated local/other providers.

## Common troubleshooting

| Error | Likely cause |
|---|---|
| `401 UNAUTHORIZED` | Extra whitespace in key, revoked key, or `HOSTLINKU_API_KEY` not exported before starting IDE/CLI. |
| `404` on every request | Missing `/v1` on OpenAI-compatible URL, or extra `/v1` on Anthropic-compatible URL. |
| `404 MODEL_NOT_FOUND` | Slug typo or model not available in your key's Service Mode. Check `GET /v1/models`. |
| `400 max_tokens` | Output limit exceeds the model's `maxOutputTokens`; lower `max_tokens` in config. |

## Links

- All IDE & Agent Docs: <https://docs.hostlinku.com/en/integrations>
- Claude Code Guide: <https://github.com/dyocodes/hostlinku-claude-code-setup>
- API Examples: <https://github.com/dyocodes/hostlinku-api-examples>
- Console: <https://console.hostlinku.com>

## License

[MIT](LICENSE). Config templates use placeholder keys only.
