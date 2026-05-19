# Zed HTML Snippets

A comprehensive collection of HTML snippets for [Zed editor](https://zed.dev/), designed to accelerate HTML development with intelligent autocomplete and placeholder support.

## ✨ Features

- **Complete HTML5 Coverage**: 95+ snippets covering all modern HTML5 elements
- **Smart Placeholders**: Tab-navigable placeholders for efficient coding
- **Semantic HTML**: Includes all semantic elements for modern web development
- **Form Elements**: Complete form controls and validation elements
- **Media Elements**: Audio, video, canvas, and responsive image snippets
- **Accessibility Ready**: ARIA-friendly snippets with proper attributes

## 📦 Installation

### Via Zed Extensions (Recommended)

1. Open Zed editor
2. Press `Cmd/Ctrl + Shift + P` to open the command palette
3. Type "extensions" and select "zed: extensions"
4. Search for "HTML Snippets"
5. Click "Install"

### Manual Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/seekode/zed-html-snippets
   ```

2. Copy the extension to your Zed extensions directory:
   - **macOS**: `~/.config/zed/extensions/`
   - **Linux**: `~/.config/zed/extensions/`
   - **Windows**: `%APPDATA%\Zed\extensions\`

3. Restart Zed

## 🚀 Usage

Simply start typing any HTML element or use the prefix shortcuts. The snippets will appear in the autocomplete menu.

### Quick Start Examples

| Prefix | Output | Description |
|--------|--------|-------------|
| `html` | HTML5 boilerplate | Complete HTML5 document structure |
| `div` | `<div>$0</div>` | Division element |
| `img` | `<img src="$1" alt="$2">` | Image with smart placeholders |
| `form` | `<form action="$1" method="$2">$0</form>` | Form element |
| `button` | `<button type="$1">$2</button>` | Button with type selection |

## 📋 Available Snippets

### Structure & Semantics
- `html` - HTML5 Boilerplate
- `head` - Document head
- `body` - Document body
- `header` - Page/section header
- `nav` - Navigation
- `main` - Main content area
- `article` - Article content
- `section` - Content section
- `aside` - Sidebar content
- `footer` - Page/section footer

### Text Content
- `h1`-`h6` - Headings
- `p` - Paragraph
- `div` - Generic container
- `span` - Inline container
- `blockquote` - Block quotation
- `pre` - Preformatted text
- `code` - Inline code
- `strong` - Strong emphasis
- `em` - Emphasis
- `mark` - Highlighted text

### Lists
- `ul` - Unordered list
- `ol` - Ordered list
- `li` - List item
- `dl` - Description list
- `dt` - Description term
- `dd` - Description definition

### Links & Media
- `a` - Anchor/link
- `img` - Image
- `picture` - Responsive images
- `audio` - Audio player
- `video` - Video player
- `source` - Media source
- `track` - Text track

### Forms
- `form` - Form container
- `input` - Input field
- `textarea` - Text area
- `select` - Dropdown
- `option` - Select option
- `optgroup` - Option group
- `button` - Button
- `label` - Form label
- `fieldset` - Field grouping
- `legend` - Fieldset caption

### Tables
- `table` - Table
- `thead` - Table header
- `tbody` - Table body
- `tfoot` - Table footer
- `tr` - Table row
- `th` - Header cell
- `td` - Data cell
- `caption` - Table caption

### Interactive Elements
- `details` - Collapsible content
- `summary` - Details summary
- `dialog` - Modal dialog
- `canvas` - Drawing canvas
- `progress` - Progress bar
- `meter` - Measurement gauge

### Meta Elements
- `meta:desc` - Meta description
- `meta:kw` - Meta keywords
- `meta:char` - Meta charset
- `meta:vp` - Meta viewport
- `link` - External resource link
- `style` - Internal styles
- `script` - JavaScript

## 🎯 Smart Placeholders

Snippets use numbered placeholders (`$1`, `$2`, etc.) that you can tab through:

```html
<!-- Typing 'img' + Tab -->
<img src="$1" alt="$2">
<!-- Tab to $1, type image path, Tab to $2, type alt text -->
```

The `$0` placeholder indicates the final cursor position.

## 🛠️ Customization

You can modify snippets by editing the `snippets/html.json` file. Each snippet follows this structure:

```json
{
  "Snippet Name": {
    "prefix": "trigger-text",
    "body": [
      "<element attribute=\"${1:default}\">",
      "\t$0",
      "</element>"
    ]
  }
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Setup

1. Fork the repository
2. Clone your fork
3. Make your changes
4. Test in Zed
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Zed Team](https://zed.dev/) for creating an amazing editor
- HTML5 specification contributors
- Community feedback and contributions

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/seekode/zed-html-snippets/issues)
- **Zed Community**: [Zed Discord](https://discord.gg/zed)
- **Documentation**: [Zed Documentation](https://zed.dev/docs)

---

**Happy coding with Zed! 🚀**
