# Zed Web Dev Config

A practical Zed configuration for web development with PHP, HTML, CSS,
JavaScript, SQL, and Markdown.

This setup is designed for daily work on classic web projects: mixed PHP/HTML
templates, CSS and JavaScript formatted with Prettier, SQL snippets, and
Markdown notes.

The configuration was refined while refactoring Star51 between August 2025 and
April 2026. Star51 is a much older personal project that I brought back,
cleaned up, and updated for modern PHP and MySQL before deciding to publish it
on GitHub.

Project page:
`https://danieledandreti.github.io/zed-web-dev-config/`

## Topics

#Zed #ZedEditor #ZedConfig #ZedSettings #ZedKeymap #settingsJson #keymapJson #WebDevelopment #PHP #HTML #CSS #JavaScript #SQL #Markdown

## Files

- `zed-settings-web-dev.json`: main Zed settings, written in Zed's commented
  JSON style.
- `zed-keymap-web-dev.json`: cross-platform custom keybindings based on the
  VS Code keymap, written in Zed's commented JSON style.

## Install

Zed does not provide a dedicated import command for these files. The simplest
cross-platform method is to open the target files from Zed and paste the
configuration manually.

1. Download `zed-settings-web-dev.json` and `zed-keymap-web-dev.json`.
2. Open the Command Palette in Zed:
   - macOS: `Cmd+Shift+P`
   - Windows/Linux: `Ctrl+Shift+P`
3. Run `zed: open settings file`.
4. Copy the content of `zed-settings-web-dev.json` into `settings.json`.
5. Run `zed: open keymap file`.
6. Copy the content of `zed-keymap-web-dev.json` into `keymap.json`.
7. Save both files.

If you already have custom Zed settings, make a backup and merge the sections
you need instead of replacing the whole file.

Default file locations, if you prefer to open them manually:

```sh
macOS/Linux:
~/.config/zed/settings.json
~/.config/zed/keymap.json

Linux with XDG_CONFIG_HOME:
$XDG_CONFIG_HOME/zed/settings.json
$XDG_CONFIG_HOME/zed/keymap.json

Windows:
%APPDATA%\Zed\settings.json
%APPDATA%\Zed\keymap.json
```

## What It Configures

- 2-space indentation across web languages.
- Format on save enabled for CSS and JavaScript.
- Format on save disabled for PHP and HTML.
- HTML soft wrap tuned for long template lines.
- Intelephense-ready PHP language server setup.
- HTML language server setup.
- Diagnostics, inlay hints, minimap, and terminal dock.
- Productive cross-platform navigation and editing shortcuts.

The keymap uses Zed's `secondary` modifier where possible. In Zed, `secondary`
maps to `Cmd` on macOS and `Ctrl` on Windows/Linux.

## Recommended Extensions

This is the extension set used with the configuration:

Essential for web development:

- `HTML`: HTML language support and `vscode-html-language-server`.
- `PHP`: PHP, PHPDoc, and PHP language server support.
- `SQL`: SQL syntax highlighting for queries, including MySQL work.
- `SCSS & SASS`: SCSS/SASS support when projects use preprocessors.

Useful extras:

- `HTML Snippets`: faster HTML authoring.
- `PHP Snippets`: faster PHP authoring.
- `LOG`: syntax highlighting for log files.
- `Git Firefly`: syntax highlighting for Git-related files.

Personal/macOS:

- `macOS Classic Theme`: the light theme used in this setup.

Prettier is not installed as a Zed extension here. Zed manages its formatter
integration separately; this config enables formatting only where it behaves
predictably.

For mixed PHP/HTML files, `format_on_save` stays off on purpose. Automatic
formatters can be too aggressive with classic PHP templates, inline markup, and
SQL snippets. Format manually when you know the formatter output is safe.

## Before You Use It

Check these values before copying the settings:

- `theme`: choose your preferred light and dark themes.
- `auto_install_extensions`: this config lets Zed automatically install the
  HTML extension when needed.
- If a language server needs a custom Node.js path, add it locally. This shared
  config does not include a machine-specific `node.path`.

## Related Articles

- Italian article: coming soon.
- English article: coming soon.

## Star51

Star51 is the project where this Zed setup became stable enough to share. It is
a refactor of a much older personal project, brought back between August 2025
and April 2026, cleaned up, updated for modern PHP and MySQL, and then made
public on GitHub.

- Repository: <https://github.com/danieledandreti/star51>
- Project page: <https://danieledandreti.github.io/star51/>

## Italiano

Configurazione pratica di Zed per sviluppo web con PHP, HTML, CSS,
JavaScript, SQL e Markdown.

La configurazione e' stata rifinita durante il refactor di Star51, un mio
vecchio progetto ripreso tra agosto 2025 e aprile 2026, sistemato e aggiornato
per PHP e MySQL moderni, poi reso pubblico su GitHub. Prima di copiarla,
controlla il tema e le impostazioni che dipendono dal tuo ambiente locale. Se
un language server richiede un percorso personalizzato di Node.js, aggiungilo
solo nel tuo `settings.json`.

Per installarla, apri la Command Palette di Zed, esegui
`zed: open settings file` e `zed: open keymap file`, poi copia il contenuto dei
due file scaricati nei rispettivi file di configurazione.

Estensioni principali usate con questa configurazione: HTML, PHP, SQL e SCSS &
SASS. Gli snippet HTML/PHP, LOG e Git Firefly sono comodi ma opzionali. Il tema
macOS Classic e' una preferenza personale.

Pagina del progetto:
`https://danieledandreti.github.io/zed-web-dev-config/`

## License

MIT
