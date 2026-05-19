# Zed ERB Snippets

A comprehensive collection of ERB snippets for [Zed editor](https://zed.dev/), designed to accelerate ERB development with intelligent autocomplete and placeholder support.

## ✨ Features

- 50+ snippets covering all common Rails ERB patterns
- Smart tab stops - quickly navigate through snippet placeholders with Tab
- Organized by category - forms, helpers, control flow, Turbo, and more
- Autocomplete support - snippets appear in Zed's autocomplete menu
- Proper ERB syntax highlighting - enhanced language support for .html.erb files
- Auto-closing tags - ERB tags <% %> auto-close as you type
- Modern Rails support - includes Turbo Frame, Turbo Stream, and latest helpers
- Zero configuration - works immediately after installation
- Lightweight - no dependencies, fast loading
- Well-documented - each snippet includes a description

What's Included
✅ Basic ERB tags (output, execution, comments)
✅ Form helpers (form_with, form_for, all input types)
✅ Link and navigation helpers
✅ Asset management helpers
✅ Control structures (if/else, loops, unless)
✅ Rendering partials and collections
✅ Turbo Frame and Turbo Stream
✅ View helpers (sanitize, truncate, time_ago, etc.)
✅ Flash messages and error handling
✅ Content management (content_for, yield, capture)

## 📦 Installation

### Via Zed Extensions (Recommended)

1. Open Zed editor
2. Press `Cmd/Ctrl + Shift + P` to open the command palette
3. Type "extensions" and select "zed: extensions"
4. Search for "ERB Snippets"
5. Click "Install"

### Manual Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/enderahmetyurt/zed-erb-snippets
   ```

2. Copy the extension to your Zed extensions directory:
   - **macOS**: `~/.config/zed/extensions/`
   - **Linux**: `~/.config/zed/extensions/`
   - **Windows**: `%APPDATA%\Zed\extensions\`

3. Restart Zed



Type the prefix and press **Tab** to expand the snippet.

### Example

```erb
pe<Tab>  →  <%= | %>
```

The `|` represents your cursor position.

## 📝 Available Snippets

### Basic ERB Tags

| Prefix | Output | Description |
|--------|--------|-------------|
| `pe` | `<%= %>` | ERB output tag |
| `pc` | `<% %>` | ERB execution tag |
| `pco` | `<%# %>` | ERB comment |

### Links and Assets

| Prefix | Description |
|--------|-------------|
| `lt` | link_to helper |
| `ltb` | link_to with block |
| `img` | image_tag |
| `bt` | button_to |
| `ap` | asset_path |
| `slt` | stylesheet_link_tag |
| `jit` | javascript_include_tag |

### Forms

| Prefix | Description |
|--------|-------------|
| `ffw` | form_with |
| `ff` | form_for |
| `ftf` | text_field |
| `fta` | text_area |
| `fem` | email_field |
| `fpw` | password_field |
| `fsb` | submit button |
| `fl` | label |
| `fcb` | check_box |
| `frb` | radio_button |
| `fse` | select |
| `fcs` | collection_select |
| `fhf` | hidden_field |
| `fff` | file_field |
| `fnf` | number_field |
| `fdf` | date_field |

### Control Flow

| Prefix | Description |
|--------|-------------|
| `if` | if statement |
| `ife` | if-else statement |
| `unl` | unless statement |
| `each` | each loop |
| `eachi` | each_with_index loop |

### Rendering

| Prefix | Description |
|--------|-------------|
| `rp` | render partial |
| `rpc` | render partial with collection |
| `cf` | content_for |
| `yield` | yield |

### Turbo (Hotwire)

| Prefix | Description |
|--------|-------------|
| `tf` | turbo_frame_tag |
| `tsf` | turbo_stream_from |

### View Helpers

| Prefix | Description |
|--------|-------------|
| `sf` | simple_format |
| `san` | sanitize |
| `trc` | truncate |
| `ntc` | number_to_currency |
| `taiw` | time_ago_in_words |
| `dotiw` | distance_of_time_in_words |
| `plur` | pluralize |
| `cyc` | cycle |

### Common Patterns

| Prefix | Description |
|--------|-------------|
| `flash` | flash messages loop |
| `err` | error messages display |
| `csrf` | csrf_meta_tags |

### Content Tags

| Prefix | Description |
|--------|-------------|
| `ct` | content_tag |
| `tag` | tag helper |
| `sj` | safe_join |
| `cap` | capture block |
| `prov` | provide |

## 💡 Tips

- All snippets include **tab stops** (`$1`, `$2`, etc.) for quick navigation
- Press **Tab** to move to the next placeholder
- Press **Shift+Tab** to move to the previous placeholder
- The final tab stop (`$0`) places your cursor at the end

### Example Workflow

```erb
ffw<Tab>
  → <%= form_with model: @model do |f| %>
      |
    <% end %>

ftf<Tab>
  → <%= f.text_field :attribute, class: 'form-control' %>
```

## 🛠️ Troubleshooting

If snippets don't work:

1. **Check Zed's extension log**:
   - Open Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`)
   - Search for "Zed: Open Log"
   - Look for any errors related to your extension

2. **Verify file paths**: Make sure all files are in the correct location

3. **Check JSON syntax**: Validate all JSON files

4. **Restart Zed**: Sometimes a full restart is needed

5. **Verify file extension**: Make sure your file ends with `.html.erb`

## 🤝 Contributing

Contributions are welcome! If you have ideas for new snippets or improvements:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## 🙏 Acknowledgments

Built for the Ruby on Rails community using Zed editor.

---

**Enjoy coding with Rails ERB Snippets!** 🚀

If you find this extension helpful, please star the repository and share it with other Rails developers.
