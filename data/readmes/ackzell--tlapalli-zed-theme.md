# Tlapalli Zed Theme

A monochromatic theme with 8 dark and 8 light colored variations. Inspired by minerals found in Mexico.

**This repo** — the packaging and release tooling for the [Tlapalli Zed extension](https://github.com/ackzell/tlapalli-zed-theme). Theme colors are maintained upstream in [tlapalli-vscode-theme](https://github.com/ackzell/tlapalli-vscode-theme).

## Structure

```
extension/          ← The actual extension (published to Zed marketplace)
  extension.toml    ─ extension manifest
  themes/           ─ theme JSON files
  LICENSE.md        ─ MIT license
  README.md         ─ theme documentation
package.json        ─ dev tooling (commit-and-tag-version, cz, husky)
.github/            ─ GitHub Actions (auto PR on tag push)
```

## Development

```sh
npm run cz          # Interactive conventional commit
npm run tag         # Bump version + CHANGELOG + git tag
npm run publish     # git push --follow-tags
```

Pushing a `v*` tag triggers a GitHub Action that auto-creates a PR to [zed-industries/extensions](https://github.com/zed-industries/extensions).

## License

MIT — see [extension/LICENSE.md](extension/LICENSE.md).
