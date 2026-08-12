# booty

Grab-and-go artifacts from the 42labs Design System. Single source of truth — everything here is what `ds.42labs.io` serves. Function over fuss.

## What's inside

| Path | What |
|------|------|
| `tokens/` | DS design tokens (W3C-DTCG) — `.json`, `.css`, `.schema.json`. `latest` + versioned. Generated from the DS; do not hand-edit. |
| `themes/zed/` | 42labs theme for the [Zed](https://zed.dev) editor (`42labs.json`, light + dark). |
| `themes/linear/` | 42labs themes for [Linear](https://linear.app) — paste-ready custom-theme strings. |

## Use it

CDN (via jsDelivr):

```
https://cdn.jsdelivr.net/gh/4242labs/booty@main/tokens/tokens.latest.css
https://cdn.jsdelivr.net/gh/4242labs/booty@main/tokens/tokens.latest.json
```

Zed: drop `themes/zed/42labs.json` into `~/.config/zed/themes/`.

Linear: copy a string from `themes/linear/42labs-linear.md` → Settings → Preferences → Theme → Custom.

