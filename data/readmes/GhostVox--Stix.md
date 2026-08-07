# Stix

A muted, low-contrast color theme for [Zed](https://zed.dev) designed for long coding sessions. Available in dark and light variants.

Previously published as a [Neovim colorscheme](https://github.com/ghostvox/Stix.nvim) and [JetBrains IDE theme](https://plugins.jetbrains.com/plugin/Stix).

---

## Screenshots

**Dark**
![darkmode](https://github.com/user-attachments/assets/d3211ff5-e366-4cf7-a872-ad10b35b3601)

**Light**
![lightmode](https://github.com/user-attachments/assets/b1955073-488b-44b1-bd99-44a80d96603b)

---

## Installation

1. Open Zed and press `Ctrl+Shift+X` to open the Extensions panel
2. Search for **Stix**
3. Click **Install**
4. Open the theme picker with `Ctrl+K Ctrl+T` and select **Stix Dark** or **Stix Light**

---

## Combined Token Support

> **Tip:** If you have **Combined Syntax Token** support enabled in Zed's settings, Stix provides specialized colors for `import` statements and macros, giving them distinct treatment from standard keywords.

To enable it, add the following to your `settings.json`:

```json
{
  "lsp": {
    "rust-analyzer": {
      "initialization_options": {
        "semanticHighlighting": {
          "operator": { "specialization": { "enable": true } },
          "punctuation": { "specialization": { "enable": true } }
        }
      }
    }
  }
}
```

---

## License

[MIT](./LICENSE)
