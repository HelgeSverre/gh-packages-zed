# Zed PHP Snippets

A comprehensive collection of PHP snippets for [Zed editor](https://zed.dev/), designed to accelerate PHP development with intelligent autocomplete and placeholder support.

## ✨ Features

- **Complete PHP Coverage**: 100+ snippets covering all essential PHP patterns
- **Smart Placeholders**: Tab-navigable placeholders for efficient coding
- **Modern PHP Support**: Includes PHP 8.x features (enums, match expressions, readonly properties, etc.)
- **OOP Ready**: Complete class, interface, trait, and abstract class snippets
- **Database Integration**: PDO snippets for secure database operations
- **Control Structures**: All loops, conditionals, and modern syntax patterns
- **Best Practices**: Type hints, strict types, and modern PHP conventions

## 📦 Installation

### Via Zed Extensions (Recommended)

1. Open Zed editor
2. Press `Cmd/Ctrl + Shift + P` to open the command palette
3. Type "extensions" and select "zed: extensions"
4. Search for "PHP Snippets"
5. Click "Install"

### Manual Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/seekode/zed-php-snippets
   ```

2. Copy the extension to your Zed extensions directory:
   - **macOS**: `~/.config/zed/extensions/`
   - **Linux**: `~/.config/zed/extensions/`
   - **Windows**: `%APPDATA%\\Zed\\extensions\\`

3. Restart Zed

## 🚀 Usage

Simply start typing any PHP keyword or use the prefix shortcuts. The snippets will appear in the autocomplete menu.

### Quick Start Examples

| Prefix | Output | Description |
|--------|--------|-------------|
| `php` | `<?php $0` | PHP opening tag |
| `class` | Class structure | Complete class definition |
| `func` | Function structure | Function definition |
| `if` | `if ($condition) { }` | If statement |
| `foreach` | `foreach ($array as $value) { }` | Foreach loop |
| `try` | Try-catch block | Exception handling |

## 📋 Available Snippets

### Basics

- `php` - PHP opening tag `<?php`
- `phpc` - PHP opening and closing tag `<?php ?>`
- `php=` - Echo short tag `<?= ?>`
- `echo` - Echo statement
- `print` - Print statement
- `var` - Variable assignment
- `def` - Define constant
- `const` - Const declaration

### Control Structures

- `if` - If statement
- `ife` - If-else statement
- `ifel` - If-elseif-else statement
- `ter` - Ternary operator
- `nc` - Null coalescing operator
- `switch` - Switch case
- `match` - Match expression (PHP 8+)

### Loops

- `for` - For loop
- `foreach` - Foreach loop (value only)
- `foreachk` - Foreach loop (key-value)
- `while` - While loop
- `do` - Do-while loop

### Functions

- `func` - Function declaration
- `funcr` - Function with return type
- `fn` - Anonymous function
- `arrow` - Arrow function (PHP 7.4+)

### Classes & OOP

- `class` - Class declaration
- `construct` - Constructor with property promotion (PHP 8+)
- `pubm` - Public method
- `prim` - Private method
- `prom` - Protected method
- `sm` - Static method
- `get` - Getter method
- `set` - Setter method
- `interface` - Interface declaration
- `trait` - Trait declaration
- `abstract` - Abstract class
- `extends` - Class extension
- `implements` - Interface implementation
- `use` - Use trait
- `enum` - Enum declaration (PHP 8.1+)
- `readonly` - Readonly property (PHP 8.1+)

### Arrays

- `arr` - Array declaration
- `arra` - Associative array
- `arrp` - Array push
- `array_map` - Array map function
- `array_filter` - Array filter function
- `array_reduce` - Array reduce function
- `in_array` - In array check
- `array_key_exists` - Array key exists check
- `count` - Count array elements

### Exception Handling

- `try` - Try-catch block
- `tryf` - Try-catch-finally block
- `throw` - Throw exception

### Namespaces & Imports

- `namespace` - Namespace declaration
- `uses` - Use statement
- `useas` - Use statement with alias

### File Inclusion

- `req` - Require
- `reqo` - Require once
- `inc` - Include
- `inco` - Include once

### Utility Functions

- `isset` - Isset check
- `empty` - Empty check
- `die` - Die statement
- `exit` - Exit statement
- `vd` - Var dump
- `pr` - Print r
- `ve` - Var export

### Superglobals

- `$get` - $_GET
- `$post` - $_POST
- `$req` - $_REQUEST
- `$sess` - $_SESSION
- `$cook` - $_COOKIE
- `$serv` - $_SERVER
- `$file` - $_FILES

### Variables

- `global` - Global variable
- `static` - Static variable
- `session` - Session start

### JSON

- `json_encode` - JSON encode
- `json_decode` - JSON decode

### Database (PDO)

- `pdo` - PDO connection
- `pdoq` - PDO query
- `pdop` - PDO prepared statement
- `pdoi` - PDO insert
- `pdou` - PDO update
- `pdod` - PDO delete

### File Operations

- `fgc` - File get contents
- `fpc` - File put contents
- `fexists` - File exists
- `isdir` - Is directory

### Strings

- `heredoc` - Heredoc syntax
- `nowdoc` - Nowdoc syntax
- `concat` - String concatenation
- `interp` - String interpolation
- `explode` - Explode string to array
- `implode` - Implode array to string
- `sprintf` - Sprintf formatting
- `preg_match` - Regex match
- `preg_replace` - Regex replace
- `str_replace` - String replace
- `trim` - Trim string
- `strtolower` - String to lowercase
- `strtoupper` - String to uppercase
- `ucfirst` - Uppercase first character
- `strlen` - String length
- `substr` - Substring

### Documentation

- `/**` - PHPDoc comment block
- `prop` - PHPDoc property
- `strict` - Strict types declaration

## 🎯 Smart Placeholders

Snippets use numbered placeholders (`$1`, `$2`, etc.) that you can tab through:

```php
// Typing 'func' + Tab
function functionName(params)
{
    // Tab to function name, type it, Tab to params, type them, Tab to body
}
```

The `$0` placeholder indicates the final cursor position.

## 🛠️ Customization

You can modify snippets by editing the `snippets/php.json` file. Each snippet follows this structure:

```json
{
  "Snippet Name": {
    "prefix": "trigger-text",
    "body": [
      "line1",
      "line2"
    ]
  }
}
```

## 💡 Examples

### Creating a Class

Type `classp` + Tab:

```php
class ClassName
{
    private type $property;

    public function __construct(type $property)
    {
        $this->property = $property;
    }

    // cursor ends here
}
```

### Database Query

Type `pdop` + Tab:

```php
$stmt = $pdo->prepare('SELECT * FROM table WHERE id = :id');
$stmt->execute(['id' => $id]);
$result = $stmt->fetch(PDO::FETCH_ASSOC);
```

### Try-Catch Block

Type `try` + Tab:

```php
try {
    // code
} catch (Exception $e) {
    // handle exception
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
- PHP community for best practices and standards
- Community feedback and contributions

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/seekode/zed-php-snippets/issues)
- **Zed Community**: [Zed Discord](https://discord.gg/zed)
- **Documentation**: [Zed Documentation](https://zed.dev/docs)

---

**Happy coding with Zed! 🚀**
