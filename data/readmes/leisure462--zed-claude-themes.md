# Claude Vellum Theme for Zed

Warm Claude-inspired themes for [Zed](https://zed.dev), based on the design notes in [`DESIGN.md`](./DESIGN.md): vellum surfaces, precise ink-like typography colors, subtle parchment borders, and restrained terra-cotta accents.

## Themes

- **Claude Vellum Light** — a soft academic-journal light theme using Vellum White (`#faf9f5`), Ink Black (`#141413`), Parchment (`#dedcd1`), Pale Azure (`#ccdbe8`), and Terra Cotta (`#d97757`).
- **Claude Onyx Dark** — a dark companion that keeps the same warm Claude character with onyx surfaces, vellum text, and muted terra-cotta highlights.

## Usage

After installing the extension, configure Zed to follow your system appearance:

```json
{
  "theme": {
    "mode": "system",
    "light": "Claude Vellum Light",
    "dark": "Claude Onyx Dark"
  }
}
```

For local development, open Zed's extensions page and run **Install Dev Extension**, then choose this repository directory.

## Development without Rust

This is a theme-only extension. It does not include `Cargo.toml` or Rust code, so there is nothing to compile locally. The GitHub Actions workflow validates the theme JSON against Zed's official theme schema.

The generated theme follows `DESIGN.md` closely: Vellum White remains the primary editor canvas, Ink Black / Graphite / Dusty Gray drive text hierarchy, Parchment provides dividers, Pale Azure is reserved for focus states, and Terra Cotta is the only prominent warm accent.

Regenerate the theme JSON after changing palette tokens:

```bash
node scripts/generate-theme.mjs
```

## Release

This repository includes a release workflow modeled after existing theme extensions:

1. Fork `zed-industries/extensions` to `leisure462/zed-extensions`.
2. Add a repository secret named `COMMITTER_TOKEN` with `repo` and `workflow` scopes.
3. Bump `version` in `extension.toml`.
4. Create and push a matching tag, for example `v0.1.0`.
5. The workflow opens a PR to the Zed extensions registry.

## License

MIT
