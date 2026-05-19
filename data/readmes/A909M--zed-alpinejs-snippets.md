# Alpine.js Snippets for Zed

Comprehensive Alpine.js v3+ code snippets for faster development in Zed editor.

## Features

- 🚀 **30+ Alpine.js snippets** covering all major directives
- 💡 **IntelliSense-friendly** with descriptive names and tab stops
- 🎯 **Component patterns** for common use cases (modals, forms, toggles)
- 📝 **Complete examples** with proper Alpine.js syntax
- ⚡ **Optimized for productivity** with logical tab order

## Available Snippets

### Core Directives

| Prefix | Description |
|--------|-------------|
| `x-data` | Component data initialization |
| `x-data-obj` | Data object with init method |
| `x-init` | Element initialization hook |
| `x-show` | Conditional element visibility |
| `x-bind` | Attribute binding |
| `x-on` | Event handling |
| `x-text` | Text content binding |
| `x-html` | HTML content binding |
| `x-model` | Two-way data binding |

### Conditional Rendering

| Prefix | Description |
|--------|-------------|
| `x-if` | Conditional template rendering |
| `x-for` | List rendering |
| `x-for-key` | List rendering with key |

### Event Shortcuts

| Prefix | Description |
|--------|-------------|
| `@click` | Click event handler |
| `@submit` | Form submit handler |
| `@keydown` | Keydown event handler |

### Styling & Classes

| Prefix | Description |
|--------|-------------|
| `:class` | Conditional CSS classes |
| `:style` | Inline style binding |

### Transitions

| Prefix | Description |
|--------|-------------|
| `x-transition` | Basic transition |
| `x-transition-enter` | Enter transition classes |
| `x-transition-leave` | Leave transition classes |

### Component Patterns

| Prefix | Description |
|--------|-------------|
| `alpine-comp` | Basic component structure |
| `alpine-modal` | Modal component |
| `alpine-toggle` | Toggle component |
| `alpine-form` | Form with validation |

### Utilities

| Prefix | Description |
|--------|-------------|
| `x-cloak` | Hide until initialized |
| `x-ignore` | Skip Alpine initialization |
| `x-ref` | Element reference |
| `x-teleport` | Move element in DOM |
| `alpine-cdn` | Alpine.js CDN script |
| `alpine-store` | Global store definition |

## Installation

1. Clone or download this extension
2. Place in your Zed extensions directory
3. Restart Zed
4. Start typing Alpine.js snippets in HTML files!

## Usage

Simply start typing any snippet prefix in an HTML file and press Tab to expand. Use Tab to navigate through placeholder values.

### Example

Type `alpine-comp` and press Tab:

```html
<div x-data="{
  property: value,
  
  init() {
    // initialization code
  },
  
  method() {
    // method body
  }
}">
  <!-- component content -->
</div>
```

## Contributing

Found a bug or want to add more snippets? Contributions are welcome!

## Resources

- [Alpine.js Official Documentation](https://alpinejs.dev/)
- [Alpine.js GitHub](https://github.com/alpinejs/alpine)
- [Zed Editor](https://zed.dev/)

## License

MIT License - see LICENSE file for details.