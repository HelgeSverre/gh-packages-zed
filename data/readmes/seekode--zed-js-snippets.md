# Zed JavaScript Snippets

A comprehensive collection of JavaScript snippets for [Zed editor](https://zed.dev/), designed to accelerate JavaScript development with intelligent autocomplete and placeholder support.

## ✨ Features

- **Complete ES6+ Coverage**: 150+ snippets covering modern JavaScript features
- **Smart Placeholders**: Tab-navigable placeholders for efficient coding
- **Async/Await Support**: Modern asynchronous programming patterns
- **Array Methods**: Complete coverage of map, filter, reduce, and more
- **Class Syntax**: ES6 classes with methods, getters, and setters
- **Module System**: Import/export statements for modern JavaScript

## 📦 Installation

### Via Zed Extensions (Recommended)

1. Open Zed editor
2. Press `Cmd/Ctrl + Shift + P` to open the command palette
3. Type "extensions" and select "zed: extensions"
4. Search for "JavaScript Snippets"
5. Click "Install"

### Manual Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/seekode/zed-js-snippets
   ```

2. Copy the extension to your Zed extensions directory:
   - **macOS**: `~/.config/zed/extensions/`
   - **Linux**: `~/.config/zed/extensions/`
   - **Windows**: `%APPDATA%\Zed\extensions\`

3. Restart Zed

## 🚀 Usage

Simply start typing any JavaScript keyword or use the prefix shortcuts. The snippets will appear in the autocomplete menu.

### Quick Start Examples

| Prefix | Output                                   | Description           |
| ------ | ---------------------------------------- | --------------------- |
| `log`  | `console.log($0)`                        | Console log statement |
| `af`   | `const name = (params) => {}`            | Arrow function        |
| `asf`  | `async function name() {}`               | Async function        |
| `for`  | `for (let i = 0; i < array.length; i++)` | For loop              |
| `fetch`| `fetch(url).then().catch()`              | Fetch API call        |

## 📋 Available Snippets

### Console Methods

- `log` - Console log
- `warn` - Console warn
- `error` - Console error
- `table` - Console table
- `time` - Console time/timeEnd

### Functions

- `function` - Function declaration
- `af` - Arrow function
- `afi` - Arrow function (implicit return)
- `asf` - Async function
- `aaf` - Async arrow function
- `fn` - Anonymous function
- `iife` - Immediately Invoked Function Expression
- `iiafe` - Async IIFE

### Loops & Iteration

- `for` - For loop
- `forof` - For...of loop
- `forin` - For...in loop
- `while` - While loop
- `dowhile` - Do...while loop
- `fre` - Array forEach
- `map` - Array map
- `filter` - Array filter
- `reduce` - Array reduce
- `find` - Array find
- `findi` - Array findIndex
- `some` - Array some
- `every` - Array every

### Conditionals

- `if` - If statement
- `ife` - If...else statement
- `ei` - Else if statement
- `ter` - Ternary operator
- `switch` - Switch statement

### Error Handling

- `tc` - Try...catch block
- `tcf` - Try...catch...finally
- `ther` - Throw error
- `cerr` - Custom error class

### Promises & Async

- `promise` - New Promise
- `thenc` - Promise then/catch
- `await` - Await expression
- `awaitc` - Await with try/catch

### Classes

- `class` - Class declaration
- `clm` - Class with method
- `clx` - Class extends
- `get` - Getter method
- `set` - Setter method
- `sm` - Static method

### Modules

- `imp` - Import default
- `imn` - Import named
- `ima` - Import all (as)
- `imd` - Dynamic import
- `exp` - Export default
- `exn` - Export named
- `exa` - Export all
- `exf` - Export function
- `exc` - Export const

### Variables & Destructuring

- `const` - Const declaration
- `let` - Let declaration
- `var` - Var declaration
- `dsta` - Array destructuring
- `dsto` - Object destructuring
- `spa` - Spread array
- `spo` - Spread object
- `rp` - Rest parameters

### Objects

- `obj` - Object literal
- `om` - Object with method
- `os` - Object shorthand
- `oc` - Object computed property
- `ok` - Object.keys()
- `ov` - Object.values()
- `oe` - Object.entries()
- `oa` - Object.assign()
- `ofr` - Object.freeze()
- `oseal` - Object.seal()
- `ocr` - Object.create()

### Arrays & Collections

- `array` - Array literal
- `afrom` - Array.from()
- `aof` - Array.of()
- `nset` - New Set
- `nmap` - New Map
- `nws` - New WeakSet
- `nwm` - New WeakMap

### Strings

- `tl` - Template literal
- `tt` - Tagged template
- `match` - String match
- `replace` - String replace
- `split` - String split
- `trim` - String trim
- `includes` - String includes
- `startswith` - String startsWith
- `endswith` - String endsWith
- `padstart` - String padStart
- `padend` - String padEnd
- `repeat` - String repeat

### Timers

- `sto` - setTimeout
- `si` - setInterval
- `cto` - clearTimeout
- `ci` - clearInterval

### Fetch & JSON

- `fetch` - Fetch API
- `feta` - Fetch async/await
- `fetp` - Fetch POST request
- `jsp` - JSON.parse()
- `jss` - JSON.stringify()
- `jssp` - JSON.stringify() (pretty)

### DOM Manipulation

- `qs` - querySelector
- `qsa` - querySelectorAll
- `gid` - getElementById
- `gcl` - getElementsByClassName
- `gt` - getElementsByTagName
- `cel` - createElement
- `ael` - addEventListener
- `rel` - removeEventListener
- `domr` - DOMContentLoaded
- `wl` - Window load event
- `raf` - requestAnimationFrame

### Storage

- `lss` - localStorage.setItem()
- `lsg` - localStorage.getItem()
- `lsr` - localStorage.removeItem()
- `lsc` - localStorage.clear()
- `sss` - sessionStorage.setItem()
- `ssg` - sessionStorage.getItem()

### Advanced Features

- `gen` - Generator function
- `agen` - Async generator
- `proxy` - Proxy object
- `rget` - Reflect.get()
- `sym` - Symbol
- `symf` - Symbol.for()

### Regular Expressions

- `re` - RegExp pattern
- `ret` - RegExp test
- `match` - String match

### Math & Date

- `mra` - Math.random()
- `mfl` - Math.floor()
- `mce` - Math.ceil()
- `mro` - Math.round()
- `mmax` - Math.max()
- `mmin` - Math.min()
- `dnow` - Date.now()
- `ndate` - New Date()
- `diso` - ISO date string

### Operators

- `tof` - typeof check
- `iof` - instanceof check
- `nc` - Nullish coalescing (??)
- `oc` - Optional chaining (?.)

### Documentation

- `cmt` - Comment block
- `jsdoc` - JSDoc function
- `us` - Use strict

## 🎯 Smart Placeholders

Snippets use numbered placeholders (`$1`, `$2`, etc.) that you can tab through:

```javascript
// Typing 'af' + Tab
const functionName = (params) => {};
// Tab to functionName, type name, Tab to params, type parameters
```

The `$0` placeholder indicates the final cursor position.

## 🛠️ Customization

You can modify snippets by editing the `snippets/javascript.json` file. Each snippet follows this structure:

```json
{
  "Snippet Name": {
    "prefix": "trigger-text",
    "body": ["const ${1:name} = (${2:params}) => {", "\t$0", "}"]
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
- JavaScript community and ECMAScript contributors
- Community feedback and contributions

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/seekode/zed-js-snippets/issues)
- **Zed Community**: [Zed Discord](https://discord.gg/zed)
- **Documentation**: [Zed Documentation](https://zed.dev/docs)

---

**Happy coding with Zed! 🚀**
