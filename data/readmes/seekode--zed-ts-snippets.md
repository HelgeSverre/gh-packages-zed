# Zed TypeScript Snippets

A comprehensive collection of TypeScript snippets for [Zed editor](https://zed.dev/), designed to accelerate TypeScript development with intelligent type support and modern patterns.

## ✨ Features

- **Complete TypeScript Coverage**: 200+ snippets covering types, interfaces, generics, and advanced features
- **Type-First Approach**: All snippets include proper TypeScript type annotations
- **Short & Convenient Prefixes**: VSCode-inspired short prefixes for faster coding
- **Smart Placeholders**: Tab-navigable placeholders for efficient coding
- **Modern TypeScript**: Support for latest TypeScript features including utility types, decorators, and more
- **Async/Await Support**: Modern asynchronous programming patterns with proper typing
- **Advanced Types**: Generics, conditional types, mapped types, and utility types
- **Class & OOP**: Full support for classes, interfaces, abstract classes, and decorators

## 📦 Installation

### Via Zed Extensions (Recommended)

1. Open Zed editor
2. Press `Cmd/Ctrl + Shift + P` to open the command palette
3. Type "extensions" and select "zed: extensions"
4. Search for "TypeScript Snippets"
5. Click "Install"

### Manual Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/seekode/zed-ts-snippets
   ```

2. Copy the extension to your Zed extensions directory:
   - **macOS**: `~/.config/zed/extensions/`
   - **Linux**: `~/.config/zed/extensions/`
   - **Windows**: `%APPDATA%\Zed\extensions\`

3. Restart Zed

## 🚀 Usage

Simply start typing any prefix. The snippets will appear in the autocomplete menu.

### Quick Start Examples

| Prefix | Output                                              | Description                |
| ------ | --------------------------------------------------- | -------------------------- |
| `log`  | `console.log($0)`                                   | Console log statement      |
| `int`  | `interface Name { property: Type; }`                | TypeScript interface       |
| `typ`  | `type TypeName = Type;`                             | Type alias                 |
| `af`   | `const name = (params): ReturnType => {}`           | Typed arrow function       |
| `asf`  | `async function name(): Promise<Type> {}`           | Async function with typing |
| `cls`  | `class ClassName { constructor() {} }`              | TypeScript class           |
| `enu`  | `enum EnumName { Member = Value }`                  | Enum declaration           |
| `gfn`  | `function name<T>(param: T): ReturnType {}`         | Generic function           |

## 📋 Available Snippets

### Console Methods

- `log` - Console log
- `warn` - Console warn
- `error` - Console error
- `table` - Console table
- `time` - Console time/timeEnd

### Functions & Arrow Functions

- `fn` - Typed function declaration
- `af` - Typed arrow function
- `afe` - Arrow function (implicit return) with type
- `asf` - Async function with Promise return type
- `asa` - Async arrow function
- `afn` - Anonymous typed function
- `iife` - Immediately Invoked Function Expression
- `aiife` - Async IIFE
- `gfn` - Generic function
- `gaf` - Generic arrow function

### Types & Interfaces

- `int` - Interface declaration
- `typ` - Type alias
- `enu` - Enum declaration
- `cenu` - Const enum
- `gint` - Generic interface
- `gtyp` - Generic type alias
- `union` - Union type
- `inter` - Intersection type
- `lit` - Literal type
- `tg` - Type guard function
- `as` - Type assertion

### Advanced Types

- `mtyp` - Mapped type
- `ctyp` - Conditional type
- `tlit` - Template literal type
- `idx` - Index signature
- `keyof` - keyof operator
- `tof` - typeof operator
- `infer` - infer keyword
- `awaited` - Awaited utility type

### Utility Types

- `pick` - Pick utility type
- `omit` - Omit utility type
- `partial` - Partial utility type
- `required` - Required utility type
- `readonly` - Readonly utility type
- `record` - Record utility type
- `exclude` - Exclude utility type
- `extract` - Extract utility type
- `nonnull` - NonNullable utility type
- `rtype` - ReturnType utility type
- `params` - Parameters utility type

### Loops & Iteration

- `for` - For loop
- `forof` - For...of loop
- `forin` - For...in loop
- `while` - While loop
- `dowhile` - Do...while loop
- `fre` - Array forEach with types
- `map` - Array map with types
- `filter` - Array filter with types
- `reduce` - Array reduce with types
- `find` - Array find with types
- `findex` - Array findIndex with types
- `some` - Array some with types
- `every` - Array every with types

### Conditionals

- `if` - If statement
- `ifelse` - If...else statement
- `else` - Else if statement
- `ter` - Ternary operator
- `switch` - Switch statement

### Error Handling

- `try` - Try...catch block with typed error
- `tryf` - Try...catch...finally
- `terr` - Throw error
- `cerr` - Custom error class

### Promises & Async

- `prom` - New Promise with type
- `then` - Promise then/catch with types
- `await` - Await expression with type
- `awaitt` - Await with try/catch and types

### Classes

- `cls` - Class declaration
- `clsp` - Class with typed properties
- `clsm` - Class with typed method
- `acls` - Abstract class
- `clsi` - Class implements interface
- `clse` - Class extends
- `get` - Getter method with type
- `set` - Setter method with type
- `static` - Static method with type
- `gcls` - Generic class

### Decorators

- `dec` - Class decorator
- `mdec` - Method decorator
- `pdec` - Property decorator
- `pardec` - Parameter decorator

### Modules & Namespaces

- `ns` - Namespace declaration
- `mod` - Module declaration
- `dmod` - Declare module
- `dglobal` - Declare global

### Import/Export

- `imp` - Import default
- `impn` - Import named
- `impt` - Import type
- `impa` - Import all (as)
- `impd` - Dynamic import
- `exp` - Export default
- `expn` - Export named
- `expt` - Export type
- `expa` - Export all
- `expf` - Export typed function
- `expc` - Export typed const
- `expi` - Export interface
- `expta` - Export type alias

### Variables & Destructuring

- `const` - Typed const declaration
- `let` - Typed let declaration
- `var` - Typed var declaration
- `ca` - Const assertion (as const)
- `darr` - Typed array destructuring
- `dobj` - Typed object destructuring
- `sarr` - Spread array
- `sobj` - Spread object
- `rest` - Rest parameters with type

### Objects

- `obj` - Object literal
- `tobj` - Typed object
- `objm` - Object with typed method
- `objs` - Object shorthand
- `objc` - Object computed property
- `okeys` - Object.keys() with proper typing
- `ovals` - Object.values()
- `oents` - Object.entries() with proper typing
- `oassign` - Object.assign() with types
- `ofreeze` - Object.freeze()
- `oseal` - Object.seal()
- `ocreate` - Object.create() with type

### Arrays & Collections

- `arr` - Array literal
- `tarr` - Typed array
- `arrg` - Array with generic type
- `rarr` - Readonly array
- `tup` - Tuple type
- `afrom` - Array.from() with type
- `aof` - Array.of() with type
- `set` - New Set with type
- `nmap` - New Map with types
- `wset` - New WeakSet with type
- `wmap` - New WeakMap with types

### Strings

- `tpl` - Template literal
- `tlit` - Template literal type
- `ttag` - Tagged template
- `match` - String match
- `replace` - String replace
- `split` - String split
- `trim` - String trim
- `inc` - String includes
- `starts` - String startsWith
- `ends` - String endsWith
- `pstart` - String padStart
- `pend` - String padEnd
- `repeat` - String repeat

### Timers

- `timeout` - setTimeout
- `interval` - setInterval
- `ctimeout` - clearTimeout
- `cinterval` - clearInterval

### Fetch & JSON

- `fetch` - Fetch API with types
- `feta` - Fetch async/await with types
- `fetp` - Fetch POST request with types
- `fetg` - Generic fetch function
- `jparse` - JSON.parse() with type assertion
- `jstring` - JSON.stringify()
- `jstringp` - JSON.stringify() (pretty)

### DOM Manipulation

- `qs` - querySelector with generic type
- `qsa` - querySelectorAll with generic type
- `gel` - getElementById with type assertion
- `gclass` - getElementsByClassName with type
- `gtag` - getElementsByTagName with type
- `cel` - createElement
- `ael` - addEventListener with typed event
- `rel` - removeEventListener
- `domr` - DOMContentLoaded
- `winl` - Window load event
- `raf` - requestAnimationFrame

### Storage

- `lset` - localStorage.setItem()
- `lget` - localStorage.getItem()
- `lrem` - localStorage.removeItem()
- `lclear` - localStorage.clear()
- `sset` - sessionStorage.setItem()
- `sget` - sessionStorage.getItem()

### Advanced Features

- `gen` - Generator function with types
- `agen` - Async generator with types
- `proxy` - Proxy object with type
- `rget` - Reflect.get()
- `sym` - Symbol
- `symf` - Symbol.for()

### Regular Expressions

- `re` - RegExp pattern
- `retest` - RegExp test

### Math & Date

- `mrand` - Math.random()
- `mfloor` - Math.floor()
- `mceil` - Math.ceil()
- `mround` - Math.round()
- `mmax` - Math.max()
- `mmin` - Math.min()
- `dnow` - Date.now()
- `date` - New Date()
- `iso` - ISO date string

### Operators & Keywords

- `tof` - typeof check
- `inst` - instanceof check
- `nc` - Nullish coalescing (??)
- `oc` - Optional chaining (?.)
- `nna` - Non-null assertion (!)
- `sat` - satisfies operator
- `asc` - as const assertion
- `rop` - Readonly property
- `op` - Optional property

### Documentation

- `com` - Comment block
- `doc` - TSDoc function documentation
- `docc` - TSDoc class documentation
- `doci` - TSDoc interface documentation

## 🎯 Smart Placeholders

Snippets use numbered placeholders (`$1`, `$2`, etc.) that you can tab through:

```typescript
// Typing 'int' + Tab
interface InterfaceName {
  property: Type;
}
// Tab to InterfaceName, type name, Tab to property, type property name, Tab to Type, type the type
```

The `$0` placeholder indicates the final cursor position.

## 🛠️ Customization

You can modify snippets by editing the `snippets/typescript.json` file. Each snippet follows this structure:

```json
{
  "Snippet Name": {
    "prefix": "trigger-text",
    "body": ["const ${1:name}: ${2:Type} = ${3:value};"]
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
- TypeScript team for the incredible type system
- VSCode community for prefix inspiration
- Community feedback and contributions

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/seekode/zed-ts-snippets/issues)
- **Zed Community**: [Zed Discord](https://discord.gg/zed)
- **Documentation**: [Zed Documentation](https://zed.dev/docs)

---

**Happy coding with Zed and TypeScript! 🚀**
