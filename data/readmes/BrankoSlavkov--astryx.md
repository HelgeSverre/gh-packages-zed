<p align="center">
  <img src="assets/logo-text.svg" alt="Astryx" width="280" height="66" />
</p>

## Zed theme — for all the people who love to code in deep dark spaces.

This repository is a **Zed extension** (see [`extension.toml`](extension.toml) and [`themes/astryx.json`](themes/astryx.json)).

----------

## Install locally (dev extension)

Use this while you develop or before the theme is on the Zed registry.

1. Open **Zed**.
2. Open the **Extensions** panel.
3. Click **Install Dev Extension** (or run the `zed: install dev extension` action).
4. Choose **this repository’s root folder** (the directory that contains `extension.toml`), not a subfolder.

Restart or reload if needed, then pick **Astryx** in **theme** / appearance settings.

----------

## Publish to the Zed extension registry

Publishing is **not** done from this repo with a single CLI login. You open a pull request to the official extensions index:

1. Read [Developing Extensions](https://zed.dev/docs/extensions/developing-extensions) and [Theme Extensions](https://zed.dev/docs/extensions/themes).
2. Fork [`zed-industries/extensions`](https://github.com/zed-industries/extensions).
3. Add your repo as a **git submodule** under `extensions/astryx` (or another unique id), **HTTPS** URL, matching the `id` in [`extension.toml`](extension.toml).
4. Add an entry to the root `extensions.toml` in that repo and bump the version to match `extension.toml`.
5. Ensure [`LICENSE`](LICENSE) stays at the **extension root** (this repo root) — required for publishing.
6. Open a PR; after merge, Zed packages and lists the extension.

If a local **`zed-extensions-fork`** clone with branch **`add-astryx-theme`** is already prepared (submodule + `extensions.toml` entry), follow [docs/publish-zed-pr.md](docs/publish-zed-pr.md) to push it to your fork and open the PR.

For troubleshooting: **Zed → Open Log** or run `zed --foreground` from a terminal.

----------

## Credits

Astryx is inspired by [Celestial](https://github.com/apvarun/celestial-theme) (Horizon-derived). The Zed theme JSON was bootstrapped from [Dracula for Zed](https://github.com/dracula/zed)-style structure and recolored; tune further in the [Zed Theme Builder](https://zed.dev/theme-builder).

## License

[MIT](LICENSE)
