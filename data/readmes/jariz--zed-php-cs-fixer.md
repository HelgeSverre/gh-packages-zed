# PHP CS Fixer for Zed

Zed extension for [PHP CS Fixer](https://github.com/PHP-CS-Fixer/PHP-CS-Fixer) via the [php-cs-fixer-lsp](https://github.com/balthild/php-cs-fixer-lsp) language server.

## Features

- Format PHP files using PHP CS Fixer
- Auto-downloads the language server on first use
- Configurable PHP binary path and worker count

## Installation

Install from the Zed Extensions panel: search for "PHP CS Fixer".

## Setup

Add the language server to your PHP config and set it as the formatter in your Zed settings (`settings.json`):

```json
{
  "languages": {
    "PHP": {
      "language_servers": ["intelephense", "php-cs-fixer-lsp"],
      "formatter": {
        "language_server": {
          "name": "php-cs-fixer-lsp"
        }
      }
    }
  }
}
```

## Configuration

All settings are optional. Add them under `lsp.php-cs-fixer-lsp.settings`:

```json
{
  "lsp": {
    "php-cs-fixer-lsp": {
      "settings": {
        "php_path": "/opt/homebrew/bin/php",
        "server_path": "/path/to/php-cs-fixer-lsp.phar",
        "workers": 2,
        "log_level": "debug"
      }
    }
  }
}
```

| Setting       | Default                   | Description                                    |
| ------------- | ------------------------- | ---------------------------------------------- |
| `php_path`    | auto-detected from PATH   | Path to the PHP binary                         |
| `server_path` | auto-downloaded           | Path to the LSP server PHAR or executable      |
| `workers`     | auto (based on CPU cores) | Number of worker processes                     |
| `log_level`   | `"info"`                  | Log level: `debug`, `info`, `warning`, `error` |

## Requirements

- PHP 8.2+ installed and on PATH
- A `.php-cs-fixer.dist.php` or `.php-cs-fixer.php` config file in your project

## Troubleshooting

### Laravel Herd

If you use [Laravel Herd](https://herd.laravel.com/), the LSP server's worker processes may crash due to how Herd wraps the PHP binary. Set `php_path` to a non-Herd PHP installation:

```json
{
  "lsp": {
    "php-cs-fixer-lsp": {
      "settings": {
        "php_path": "/opt/homebrew/bin/php"
      }
    }
  }
}
```
