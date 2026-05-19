# Loi Paper — a Zed theme

A theme for Zed with a warm paper aesthetic: cream surfaces in light mode, soft charcoal in dark mode, restrained coral accents reserved for cursor, links, syntax tags, and emphasis. The goal is a calm editor that still has personality.

Two variants ship in this extension:

- **Loi Paper Light** — warm off-white background (`#faf9f5`), warm dark text, coral accent (`#c96442`).
- **Loi Paper Dark** — warm charcoal background (`#262624`), cream text, soft coral accent (`#d97757`).

## Install from the Zed extension store

1. Open the command palette (`⌘⇧P`) and run `zed: extensions`.
2. Search for `Loi Paper`.
3. Click **Install**.
4. Open the theme selector (`⌘K ⌘T`) and pick **Loi Paper Light** or **Loi Paper Dark**.

## Install as a dev extension

1. Clone this repo locally.
2. In Zed: `zed: install dev extension` from the command palette.
3. Select this folder.
4. Pick the theme from `⌘K ⌘T`.

## Auto-switch with system appearance

Add this to `~/.config/zed/settings.json`:

```json
{
  "theme": {
    "mode": "system",
    "light": "Loi Paper Light",
    "dark": "Loi Paper Dark"
  }
}
```

## License

[MIT](./LICENSE)
