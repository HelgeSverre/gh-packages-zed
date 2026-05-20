# Code Snippets iWonder

**Code Snippets iWonder** is a productivity extension for the [Zed editor](https://zed.dev), aimed at speeding up your development workflow by providing a comprehensive collection of code snippets.

Currently, this extension provides robust support for **Python**, covering everything from basic control flow to type hinting and asynchronous programming.

## Features

-   **Instant Boilerplate**: Quickly insert common patterns like `main` blocks, class definitions, and loops.
-   **Modern Python Support**: Includes snippets for `async/await`, type hinting, and f-strings.
-   **Debugging Helpers**: Fast insertion of logging statements and debug prints.
-   **Type Safety**: Pre-filled snippets with type annotations for variables and functions.
-   **Context Aware**: Snippets designed for specific contexts (e.g., class methods vs. standalone functions).

## 🤝 Call for Contributions

We currently support **Python**, but we want to build a universal library of snippets!

We invite the community to help add support for other languages (JavaScript, Rust, Go, C++, etc.). If you have a favorite set of snippets or want to improve the existing ones, please submit a Pull Request.

## Installation

### Method 1: Zed Extension Store (Recommended)

1.  Open Zed.
2.  Press `Cmd+Shift+X` (or click the **Extensions** icon in the sidebar).
3.  Search for `Code Snippets iWonder`.
4.  Click **Install**.

### Method 2: Manual / Git Installation (For Development)

If you want to modify the snippets or contribute to the project:

1.  Clone this repository to a local directory:
    ```bash
    git clone https://github.com/ityme/snippet-iwonder.git
    ```
2.  Open Zed.
3.  Go to **Extensions** view.
4.  Click the **Install Dev Extension** button (or "Load Extension from Folder").
5.  Select the `snippet-iwonder` folder you just cloned.

## Usage

Simply type the **prefix** of a snippet in your editor, and Zed will show the autocomplete suggestion. Press `Tab` or `Enter` to insert the snippet. You can then tab through the placeholders (e.g., variable names, arguments) to customize the code.

### Python Snippets Guide

The Python module (`python.json`) is designed to cover the full spectrum of Python development. Here is a guide to the included snippets:

#### 1. Entry Points & Imports
Start your files quickly.
| Prefix | Description |
| :--- | :--- |
| `main` | Generates the standard `if __name__ == "__main__":` block. |
| `import` | Basic `import module`. |
| `from` | `from module import item`. |

#### 2. Function & Class Definitions
Includes aliases for speed (e.g., `func` vs `def`).
| Prefix | Description |
| :--- | :--- |
| `def` / `func` | Standard function definition. |
| `class` | Class definition with `__init__`. |
| `def-self` / `func-self` | Instance method (automatically adds `self` as the first argument). |
| `property` | Full property definition with `@property`, `@x.setter`, and `@x.deleter`. |
| `decorator` | Template for creating a standard decorator. |
| `decorator-with-arg` | Template for a decorator that accepts arguments. |
| `lambda` | Inline lambda function. |

#### 3. Control Flow
| Prefix | Description |
| :--- | :--- |
| `if`, `ifelse`, `elif` | Conditional blocks. |
| `for-i-in` | Standard for-loop iteration. |
| `while` | While loop. |
| `try`, `try-finally` | Exception handling with `try/except` and optional `finally`. |
| `with` | Context manager usage (specifically tailored for file opening). |
| `context-manager` | Template for creating your own Context Manager class (`__enter__`, `__exit__`). |

#### 4. Asynchronous Programming
| Prefix | Description |
| :--- | :--- |
| `def-async` | Define an `async def` coroutine. |
| `def-self-async` | Define an `async` method inside a class. |

#### 5. Type Hinting (Modern Python)
These snippets help you write type-safe code faster by pre-filling annotation syntax.

| Prefix | Description |
| :--- | :--- |
| `def-hint` | Function definition with arguments and return type hints (`-> None`). |
| `def-self-hint` | Class method definition with type hints. |
| `var-hint-int` | Variable declaration: `x: int = 0`. |
| `var-hint-str` | Variable declaration: `s: str = ""`. |
| `var-hint-list` | Variable declaration: `l: list[...] = [...]`. |
| `var-hint-dict` | Variable declaration: `d: dict[..., ...] = {...}`. |

#### 6. Debugging & Logging
Don't waste time typing out print statements.

| Prefix | Description |
| :--- | :--- |
| `print` | Simple `print()`. |
| `print-with-type` | Prints a value alongside its type for debugging: `print(val, type(val))`. |
| `f-string` | Self-documenting f-string for debugging variables: `f"{var=}"`. |
| `log-info` | `logging.info(...)` |
| `log-debug` | `logging.debug(...)` |
| `log-warn` | `logging.warn(...)` |
| `log-error` | `logging.error(...)` |

#### 7. Utilities
| Prefix | Description |
| :--- | :--- |
| `doc` | Generates a Google-style docstring template. |
| `list-comprehension` | Snippet for `[x for x in ...]`. |
| `dict-comprehension` | Snippet for `{k:v for k,v in ...}`. |
| `sort-list` | Sorts a list in-place with a lambda key. |
| `sorted-list` | Creates a new sorted list using `sorted()`. |

---

**Happy Coding!**
