# HubL Language Support for Zed

Syntax highlighting for HubL (HubSpot's templating language) in Zed editor.

## Features

- Tree-sitter based syntax highlighting for HubL templates
- Support for pure HubL files (`.hubl`)
- Support for HTML + HubL files (with HTML injection)
- Support for CSS + HubL files (with CSS injection)
- Highlighting for:
  - HubL tags: `{% ... %}`
  - HubL variables: `{{ ... }}`
  - HubL comments: `{# ... #}`
  - Keywords: `if`, `for`, `block`, `macro`, `set`, etc.
  - Filters (`|upper`, `|truncate`, etc.)
  - Property access (`.name`, `.title`, etc.)
  - Operators and literals
  - Whitespace trimming syntax (`{%-`, `-%}`, `{{-`, `-}}`)

## Installation

### From Zed Extensions

1. Open Zed
2. Open the command palette (`Cmd+Shift+P` / `Ctrl+Shift+P`)
3. Search for "zed: extensions"
4. Search for "HubL" and install

### Dev Extension (Local)

1. Clone this repository
2. In Zed, open the command palette
3. Type "zed: install dev extension"
4. Select the cloned directory

## Usage

### Automatic file detection

- `.hubl` files are automatically detected as HubL
- `.hubl.html` files are detected as HTML + HubL
- `.hubl.css` files are detected as CSS + HubL

### Using with regular `.html` and `.css` files

Since Zed's built-in HTML and CSS extensions claim `.html` and `.css` files, you need to configure file type overrides in your Zed settings to use HubL highlighting for those files.

Add this to your Zed settings (`~/.config/zed/settings.json`):

```json
{
  "file_types": {
    "HTML + HubL": ["*.html"],
    "CSS + HubL": ["*.css"]
  }
}
```

For project-specific configuration (e.g., only HubSpot template directories), you can use glob patterns:

```json
{
  "file_types": {
    "HTML + HubL": ["**/templates/*.html"],
    "CSS + HubL": ["**/templates/*.css"]
  }
}
```

You can also manually select the language by clicking the language name in the bottom-right status bar.

## Grammar

This extension uses [tree-sitter-hubl](https://github.com/blueambr/tree-sitter-hubl), a tree-sitter grammar for HubL.
