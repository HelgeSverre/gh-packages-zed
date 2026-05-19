# Zed Storm

Zed Storm provides a collection of snippets and tasks for working with Laravel in Zed.

## What’s included

- Laravel-focused snippets
- Blade snippets
- Task definitions (`tasks.json`) for common workflow commands

Many snippets and tasks were adapted from [Zed for Laravel](https://github.com/croustibat/zed-for-laravel), combined with exported and converted PhpStorm Live Templates.

Prefix names were also adjusted from PhpStorm-style formats. For example, `r::g` became `rg` (instead of longer names such as `route` or `routepost`).

## Installation

1. Clone this repository.
2. In Zed, open `zed: extensions`.
3. Click **Install Dev Extension**.
4. Select the cloned `zed-storm` directory.

To install tasks, copy `tasks.json` into your Zed config directory:

```bash
cp tasks.json ~/.config/zed/tasks.json
```

**Optional:** add more snippets from Zed for Laravel

If you want additional snippets (for packages like Filament, Inertia, Livewire, Pest, and Volt), copy and merge them into:

`~/.config/zed/snippets/php.json`

Make sure you merge JSON objects correctly.

## Credits

- [Zed for Laravel](https://github.com/croustibat/zed-for-laravel) for the original snippet/task foundation.
