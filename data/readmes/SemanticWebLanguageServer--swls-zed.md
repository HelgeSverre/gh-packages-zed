# SWLS – Zed Extension

[Zed](https://zed.dev) extension for **Turtle**, **TriG**, **SPARQL**, and **JSON-LD**, powered by the [Semantic Web Language Server (SWLS)](https://github.com/SemanticWebLanguageServer/swls).

## Features

- Autocompletion (prefixes, properties, classes, ontologies)
- Diagnostics
- Formatting
- Semantic highlighting
- Go to definition
- Hover information

## Installation

Search for **SWLS** in Zed's extension marketplace (`zed: extensions`).

The extension automatically downloads the SWLS binary from GitHub releases.

## Configuration

Add to your Zed `settings.json` to customize initialization options:

```json
{
  "lsp": {
    "swls": {
      "initialization_options": {
        "log": "debug",
        "turtle": true,
        "trig": true,
        "jsonld": true,
        "sparql": false,
        "ontologies": [],
        "shapes": [],
        "completion": "none"
      }
    }
  }
}
```

To use a custom binary:

```json
{
  "lsp": {
    "swls": {
      "binary": {
        "path": "/path/to/swls"
      }
    }
  }
}
```

## License

MIT
