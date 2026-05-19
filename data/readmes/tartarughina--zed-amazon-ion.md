# Ion Extension for Zed

This extension provides syntax highlighting and language support for Amazon Ion and Ion Schema Language in the [Zed editor](https://zed.dev/).

## Features

### Amazon Ion Support (.ion files)
- **Syntax Highlighting**: Full syntax highlighting for all Ion data types
- **Bracket Matching**: Automatic bracket matching for lists, structs, and S-expressions
- **Code Folding**: Fold lists, structs, S-expressions, and block comments
- **Comment Support**: Line comments (`//`) and block comments (`/* */`)
- **Data Types**: Support for all Ion types including:
  - Scalars: null, bool, int, float, decimal, timestamp, string, symbol, blob, clob
  - Containers: list, sexp, struct
  - Annotations: Type annotations with `::` syntax

### Ion Schema Language Support (.isl files)
- **Schema Syntax**: Highlighting for schema headers, imports, and type definitions
- **Constraint Highlighting**: Special highlighting for schema constraint keywords
- **Ion Integration**: Full Ion syntax support within schema definitions
- **Structure Folding**: Fold schema headers, imports, type definitions, and nested structures

## Installation

1. Open Zed
2. Open the command palette (`Cmd+Shift+P` on macOS, `Ctrl+Shift+P` on Linux/Windows)
3. Type "zed: install extension" and select it
4. Search for "Ion" and install this extension

## Usage

The extension automatically activates for files with the following extensions:
- `.ion` - Amazon Ion files
- `.isl` - Ion Schema Language files

### Example Ion File
```ion
// Ion document with various data types
{
  name: "John Doe",
  age: 30,
  active: true,
  balance: 1234.56d,
  created: 2023-01-01T00:00:00Z,
  tags: ["customer", "premium"],
  metadata: {
    source: 'web',
    score: null.int
  }
}

// Annotated values
person::{
  name: "Jane",
  contact: email::"jane@example.com"
}
```

### Example Ion Schema File
```isl
schema_header::{
  imports: [{ id: "isl/ion.isl", type: ion }]
}

type::{
  name: user,
  type: struct,
  fields: {
    id: { type: int, valid_values: range::[1, max] },
    email: { type: string, regex: "^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$" },
    name: { type: string, codepoint_length: range::[1, 100] },
    active: bool
  }
}
```

## Language Features

### Syntax Highlighting
- **Keywords**: `schema_header`, `import`, `type`
- **Literals**: Numbers, strings, booleans, timestamps, null values
- **Operators**: Annotations (`::`)
- **Punctuation**: Brackets, braces, commas, colons
- **Comments**: Line and block comments
- **Properties**: Field names in structs
- **Special**: Ion null types (`null.int`, `null.string`, etc.)

### Code Structure
- **Bracket Matching**: Automatic matching of `[]`, `{}`, and `()`
- **Code Folding**: Collapse large structures for better navigation
- **Indentation**: Smart indentation based on structure

## Tree-sitter Grammars

This extension uses custom Tree-sitter grammars:
- [tree-sitter-ion](https://github.com/tartarughina/tree-sitter-ion) - Amazon Ion grammar
- [tree-sitter-ion-schema](https://github.com/tartarughina/tree-sitter-ion-schema) - Ion Schema Language grammar

## Resources

- [Amazon Ion Documentation](https://amzn.github.io/ion-docs/)
- [Ion Schema Documentation](https://amzn.github.io/ion-schema/)
- [Ion Specification](https://amzn.github.io/ion-docs/docs/spec.html)
- [Ion Schema 2.0 Specification](https://amazon-ion.github.io/ion-schema/docs/isl-2-0/spec)

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## License

This extension is licensed under the Apache License 2.0.
