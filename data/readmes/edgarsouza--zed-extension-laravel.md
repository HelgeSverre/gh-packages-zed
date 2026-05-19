# Laravel Extension for Zed Editor

A comprehensive Zed editor extension providing Laravel-specific IDE features including Blade templating support, Artisan integration, and Laravel-aware PHP development tools.

## Features

### ✅ Phase 1-2: Foundation (Completed)

- ✅ **Blade Template Support**
  - Syntax highlighting for `.blade.php` files
  - PHP, HTML, JavaScript, and CSS injection
  - Blade directive recognition (@if, @foreach, @section, etc.)
  - Comment support ({{-- --}})

- ✅ **PHP Language Server Integration**
  - Intelephense support (recommended)
  - Phpactor support (alternative)
  - Laravel-specific configuration
  - Auto-detection of Laravel projects

- ✅ **Artisan Integration**
  - 30+ Artisan commands via Command Palette
  - Server, migration, cache, make commands
  - Task system integration

### ✅ Phase 3: Intelligent Navigation (Completed)

- ✅ **Route Navigation**
  - Ctrl+Click on `route('dashboard')` → jump to route definition
  - Navigate to routes/web.php with exact line number
  - Support for all HTTP methods (GET, POST, PUT, etc.)

- ✅ **View Navigation**
  - Navigate from `view('auth.login')` → blade file
  - Support for nested views (dot notation)
  - Opens resources/views/auth/login.blade.php

- ✅ **Config Navigation**
  - Jump to config keys from `config('app.name')`
  - Opens config file at specific key line
  - Works with Laravel 9-12 including streamlined Laravel 11+

- ✅ **Translation Navigation**
  - Navigate from `__('auth.failed')` → translation file
  - Support for PHP and JSON formats
  - Multi-locale support (en, es, pt, pt-BR, etc.)

- ✅ **Autocomplete**
  - Smart suggestions for config keys
  - Translation key autocomplete
  - Context-aware completions

### ✅ Phase 4: Advanced Features (Completed)

- ✅ **Eloquent Support**
  - Parse models and detect relationships (HasMany, BelongsTo, etc.)
  - 80+ Eloquent query builder methods
  - Fillable and casts detection

- ✅ **Migration Autocomplete**
  - 40+ Schema column types (string, integer, json, uuid, etc.)
  - 20+ column modifiers (nullable, unique, default, etc.)
  - Smart snippets with placeholders

- ✅ **Test Integration**
  - Automatic Pest/PHPUnit detection
  - Run tests from Command Palette
  - Parallel execution support
  - Coverage reports

- ✅ **Laravel 11+ Support**
  - Streamlined structure compatibility
  - bootstrap/app.php configuration support
  - Adjusted paths for new structure

## Installation

### Prerequisites

1. **Rust via rustup** (required for building):
   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   ```

2. **PHP Language Server** (choose one):

   **Intelephense (Recommended):**
   ```bash
   npm install -g intelephense
   ```

   **Phpactor (Alternative):**
   ```bash
   composer global require phpactor/phpactor
   ```

### Installing the Extension

#### Method 1: Install from Zed Extensions (Coming Soon)

Once published, you'll be able to install directly from Zed's extension registry.

#### Method 2: Install as Development Extension

1. Clone this repository:
   ```bash
   git clone https://github.com/edgarsouza/zed-extension-laravel
   cd zed-extension-laravel
   ```

2. Open Zed and navigate to: `Zed > Extensions > Install Dev Extension`

3. Select the `zed-extension-laravel` directory

4. Zed will automatically compile the extension and activate it

## Usage

### Automatic Activation

The extension automatically activates when you open a Laravel project (detected via `composer.json` containing `laravel/framework`).

### Navigation Features

**Route Navigation:**
```php
// In controller - Ctrl+Click on route name
return redirect()->route('dashboard');
// → Jumps to routes/web.php at route definition
```

**View Navigation:**
```php
// In controller - Ctrl+Click on view name
return view('auth.login');
// → Opens resources/views/auth/login.blade.php
```

**Config Navigation:**
```php
// In code - Ctrl+Click on config key
$name = config('app.name');
// → Opens config/app.php at 'name' key line
```

**Translation Navigation:**
```php
// In view - Ctrl+Click on translation key
{{ __('auth.failed') }}
// → Opens lang/en/auth.php at 'failed' key
```

### Autocomplete

**Config Keys:**
```php
config('app.'); // Press Ctrl+Space
// → Shows: name, env, debug, url, timezone, ...
```

**Translation Keys:**
```php
__('auth.'); // Press Ctrl+Space
// → Shows: failed, throttle, password, ...
```

**Eloquent Methods:**
```php
User::query()->; // Press Ctrl+Space
// → Shows: where, orderBy, with, has, first, get, paginate, ...
```

**Schema Builder:**
```php
Schema::create('users', function (Blueprint $table) {
    $table->; // Press Ctrl+Space
    // → Shows: string, integer, text, boolean, timestamp, ...
});
```

### Artisan Commands

Open Command Palette (Ctrl+Shift+P) and search:

**Development:**
- `Laravel: Artisan Serve` - Start dev server
- `Laravel: Artisan Tinker` - REPL console

**Database:**
- `Laravel: Artisan Migrate`
- `Laravel: Artisan Migrate Fresh`
- `Laravel: Artisan DB Seed`

**Testing:**
- `Laravel: Run All Tests`
- `Laravel: Run Tests (Parallel)`
- `Pest: Run All Tests`
- `PHPUnit: Run All Tests`

**Cache:**
- `Laravel: Artisan Cache Clear`
- `Laravel: Artisan Config Clear`
- `Laravel: Artisan Route Clear`

**Make Commands:**
- `Laravel: Artisan Make Controller`
- `Laravel: Artisan Make Model`
- `Laravel: Artisan Make Migration`
- And 20+ more...

### Blade Templates

Open any `.blade.php` file to get:
- Syntax highlighting
- PHP autocomplete within Blade directives
- HTML/CSS/JS support
- Proper indentation

### Language Server Features

With Intelephense or Phpactor installed, you get:
- Autocomplete for Laravel facades (Route::, DB::, etc.)
- Go-to-definition
- Type hints
- Error diagnostics
- Code formatting

## Configuration

The extension comes pre-configured for Laravel development. To customize language server settings:

1. Open Zed settings: `Zed > Settings`
2. Add your preferences under the `lsp` section

Example custom Intelephense settings:
```json
{
  "lsp": {
    "intelephense": {
      "initialization_options": {
        "licenceKey": "YOUR_LICENSE_KEY"
      }
    }
  }
}
```

## Supported Laravel Versions

- Laravel 9.x
- Laravel 10.x
- Laravel 11.x
- Laravel 12.x

## Development

### Building Locally

```bash
# Ensure Rust is installed via rustup
cargo build --target wasm32-wasip1 --release
```

### Testing

```bash
cargo test
```

### Debug Mode

Launch Zed from terminal to see debug output:
```bash
zed --foreground
```

## Troubleshooting

### Extension Not Activating

- Ensure you're in a Laravel project (check for `composer.json` with `laravel/framework`)
- Verify Rust is installed via rustup (not Homebrew)
- Check Zed's extension logs for errors

### Language Server Not Working

- Verify Intelephense or Phpactor is installed:
  ```bash
  which intelephense
  # or
  which phpactor
  ```
- Check language server logs in Zed
- Ensure your Laravel project has a valid `composer.json`

### Blade Syntax Highlighting Issues

- Ensure the file has `.blade.php` extension
- Try reloading the file or restarting Zed
- Check that tree-sitter-blade grammar is properly loaded

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) for details

## Credits

- Built for [Zed Editor](https://zed.dev)
- Uses [tree-sitter-blade](https://github.com/EmranMR/tree-sitter-blade) by EmranMR
- Integrates with [Intelephense](https://intelephense.com/) and [Phpactor](https://phpactor.github.io)

## Performance

**Benchmarks:**
- Extension activation: < 500ms
- Route indexing (50 routes): < 500ms
- Model indexing (50 models): < 1s
- Navigation response: < 100ms
- Memory usage: < 50MB

## Documentation

- [TESTING.md](TESTING.md) - Complete testing guide
- [IMPLEMENTATION.md](IMPLEMENTATION.md) - Technical implementation details
- [plano-extensao-laravel-zed.md](plano-extensao-laravel-zed.md) - Original roadmap

## Roadmap

### ✅ Completed (Phases 1-4)
- ✅ Blade syntax highlighting
- ✅ Language server integration
- ✅ Artisan commands
- ✅ Intelligent navigation
- ✅ Eloquent support
- ✅ Test integration

### 🚧 Planned (Phase 5+)
- [ ] File watchers for auto-cache invalidation
- [ ] Full model discovery (parse composer autoload)
- [ ] Livewire component navigation
- [ ] Inertia.js integration
- [ ] Event/Listener navigation
- [ ] Custom Laravel LSP server
- [ ] Code actions (generate factory, migration, etc.)

## Support

- Report issues: [GitHub Issues](https://github.com/edgarsouza/zed-extension-laravel/issues)
- Discussions: [GitHub Discussions](https://github.com/edgarsouza/zed-extension-laravel/discussions)
