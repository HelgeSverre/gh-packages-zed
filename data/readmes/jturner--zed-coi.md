# Coi Language Extension for Zed

Language support for [Coi](https://github.com/io-eric/coi) in the Zed editor.

Coi is a component-based language for building high-performance web applications that compile to WebAssembly.

## Features

- Syntax highlighting
- Code folding
- Bracket matching
- Auto-indentation
- Symbol outline
- Text objects for navigation
- CSS injection in style blocks

## Installation

### From Zed Extensions

1. Open Zed
2. Open the Extensions panel (`Cmd+Shift+X` on macOS)
3. Search for "Coi"
4. Click Install

### Development Installation

1. Clone this repository
2. Open Zed
3. Run the command `zed: install dev extension`
4. Select the `zed-coi` directory

## Supported File Types

- `.coi` - Coi component files
- `.d.coi` - Coi definition files

## Language Syntax

```coi
import "components/Button.coi";

component Counter {
    mut int count = 0;

    enum Direction { Up, Down }

    def increment() : void {
        count++;
    }

    def decrement() : void {
        count--;
    }

    def label(Direction dir) : string {
        return match (dir) {
            Direction::Up => "+";
            Direction::Down => "-";
        };
    }

    style {
        .counter {
            display: flex;
            align-items: center;
            gap: 16px;
        }
    }

    view {
        <div class="counter">
            <Button label={label(Direction::Down)} &onclick={decrement} />
            <span>{count}</span>
            <Button label={label(Direction::Up)} &onclick={increment} />
        </div>
    }
}

app {
    root = Counter;
    title = "Counter App";
}
```

## Requirements

This extension requires the [tree-sitter-coi](https://github.com/jturner/tree-sitter-coi) grammar.

## License

MIT
