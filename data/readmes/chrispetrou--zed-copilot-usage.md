# Copilot Usage

A [Zed](https://zed.dev/) extension that displays your GitHub Copilot usage stats directly in the assistant panel via a `/copilot-usage` slash command.

## Features

- View your current Copilot plan
- Track inline suggestions, chat messages, and premium request quotas
- Visual progress bar for premium request usage
- Overage tracking when applicable
- Quota reset date display

## Example Output

```
Copilot Usage

Plan: Business

Inline Suggestions       Included
Chat Messages            Included

Premium Requests         75% used (300/400)
                         [#####               ] 25% remaining

Allowance resets March 1, 2026
```

## Setup

1. Install the extension from the Zed extension registry (search for "Copilot Usage")

2. Set a GitHub personal access token as an environment variable:

   ```bash
   # In your shell profile (~/.bashrc, ~/.zshrc, etc.)
   export GITHUB_TOKEN="ghp_your_token_here"
   ```

   Alternatively, you can use `COPILOT_USAGE_TOKEN` instead of `GITHUB_TOKEN`.

3. Create a token at [github.com/settings/tokens](https://github.com/settings/tokens) — a classic PAT with no scopes required.

4. Restart Zed so it picks up the environment variable.

## Usage

In the Zed assistant panel, type:

```
/copilot-usage
```

## Notes

- This extension uses an undocumented GitHub API endpoint (`/copilot_internal/user`), so the data may occasionally be unavailable if GitHub changes the API.
- The token is read from your shell environment variables — Zed must be launched from a terminal or your shell profile must export the variable.

## Disclaimer

This extension is provided as-is and is not affiliated with or endorsed by GitHub. It relies on an undocumented GitHub API that may change or become unavailable without notice. Your GitHub token is sent only to GitHub's API — it is never stored or transmitted elsewhere. Use this extension at your own risk.

## License

MIT
