# Zed API Client

HTTP client workflow for [Zed](https://zed.dev/): `.http` / `.rest` syntax highlighting, runnable requests, Assistant slash commands, `{{variables}}`, and recent history.

## Features

- Syntax highlighting and injections (JSON, XML, GraphQL) for REST Client–style files
- **`/http`** — send a single request from the Assistant
- **`/http-file`** — run every request in a worktree-relative `.http` / `.rest` file
- **`/http-env`** — set, list, or clear variables (merged with optional `.http-env` in the worktree)
- **`/http-history`** — last requests, re-run hint, or clear

Requests use **`http://` and `https://` only** (validated in the extension and in the runner).

## Examples

Assistant:

```text
/http GET https://api.example.com/users
/http POST https://api.example.com/users --header "Content-Type: application/json" --body '{"name":"Alice"}'
/http GET https://api.example.com/me --bearer {{TOKEN}}
/http-file tests/requests/sample.http
```

Request file:

```http
### Get users
GET {{BASE_URL}}/users
Authorization: Bearer {{TOKEN}}

### Create user
POST {{BASE_URL}}/users
Content-Type: application/json

{
  "name": "Alice"
}
```

## Build and local install

Requirements: Rust (via **rustup**), `wasm32-wasip2`:

```bash
rustup target add wasm32-wasip2
./build.sh
```

In Zed: **Extensions → Install Dev Extension** and choose this folder. Restart Zed after rebuilding.

See [DEVELOPMENT.md](DEVELOPMENT.md) for layout and manual checks.

## Publish to the Zed marketplace

Extensions are added via a PR to [zed-industries/extensions](https://github.com/zed-industries/extensions), not by uploading this repo alone. Step-by-step instructions: **[docs/PUBLISHING.md](docs/PUBLISHING.md)**.

## Why a native runner?

Slash commands execute **`zed-api-runner`** so you get real HTTP behavior (4xx/5xx bodies, timeouts, redirects). Zed’s Wasm `http_client::fetch` path treats many error status codes as failures without a normal response body, which is a poor fit for API testing.

## License

MIT
