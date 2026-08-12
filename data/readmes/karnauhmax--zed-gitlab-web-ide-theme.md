# Gitlab Web IDE Theme — a Zed theme

A port of [GitLab's Web IDE / VS Code theme](https://gitlab.com/gitlab-org/gitlab-web-ide/-/tree/main/packages/vscode-extension-gitlab-vscode-theme)
to [Zed](https://zed.dev). Includes all three upstream variants:

- **Gitlab Web IDE Theme Dark**
- **Gitlab Web IDE Theme Dark Midnight**
- **Gitlab Web IDE Theme Light**

> This is an unofficial, community-made color port. It is not affiliated
> with, endorsed by, or supported by GitLab B.V.

## Install

### From the Zed extensions registry

> Not yet published to the registry. Once it is, open the command palette →
> `zed: extensions`, search for **Gitlab Web IDE Theme**, and install.

### As a dev extension (now)

1. Clone this repo.
2. In Zed, open the command palette (`cmd-shift-p`) → **`zed: install dev extension`**.
3. Select this repo's folder.
4. Open the theme selector (`cmd-k cmd-t`) and pick one of the three variants.

### Just the theme file

Copy [`themes/gitlab-web-ide-theme.json`](themes/gitlab-web-ide-theme.json)
into `~/.config/zed/themes/` and select a variant in the theme picker.

## Credits

Color values (workbench UI colors and syntax highlighting) are adapted from
["GitLab Theme for Visual Studio Code"](https://gitlab.com/gitlab-org/gitlab-web-ide/-/tree/main/packages/vscode-extension-gitlab-vscode-theme)
(`gitlab-vscode-theme`), Copyright (c) 2022-present GitLab B.V., licensed
under the MIT License. This port maps VS Code's `colors` / `tokenColors` /
`semanticTokenColors` onto Zed's theme schema; a few workbench and
tree-sitter syntax categories that don't have a 1:1 VS Code equivalent
(e.g. terminal "dim" ANSI colors, a couple of optional UI chrome keys) were
approximated from the closest matching source color rather than invented
from scratch.

## License

MIT — see [LICENSE](LICENSE).
