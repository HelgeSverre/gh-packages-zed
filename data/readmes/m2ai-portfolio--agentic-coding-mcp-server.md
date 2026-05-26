

<p align="center">
  <img src="assets/infographic.png" alt="Agentic Coding MCP Server: Local Gemma 4 powered coding assistant integrated with Zed editor" width="800">
</p>

<h3 align="center">Build an MCP server that exposes coding assistance tools (code generation, refactoring, explanation) using the Gemma 4 model running locally. The server integrates with Zed via its language plugin system and uses uv for managing Python dependencies, providing a seamless agentic coding experience for solo developers.</h3>

<p align="center">
  <a href="#quick-start">Quick Start</a> &bull;
  <a href="#features">Features</a> &bull;
  <a href="#examples">Examples</a> &bull;
  <a href="#contributing">Contributing</a>
</p>

## What is this?
Agentic Coding MCP Server is a lightweight, offline coding assistant that runs a local Gemma 4 GGUF model to refactor or explain code snippets. It is aimed at solo developers who want fast, private AI help without relying on cloud services.

```
$ python gemma_code_helper/__main__.py --mode refactor --file example.py
def calculate_sum(a, b):
    return a + b
```

## Problem
Solo developers using MCP servers lack easy access to powerful, low-latency, private AI coding assistants that work offline and integrate smoothly with modern editors like Zed, forcing reliance on cloud APIs or heavyweight setups.

## Features
| Feature | Description |
|---------|-------------|
| Refactor Mode | Produces a cleaned‑up version of a snippet (removes dead code, simplifies loops, applies PEP‑8). |
| Explain Mode | Returns a concise plain‑language description of what the code does. |
| Offline Execution | Loads a local GGUF model; no network calls required. |
| Low‑Latency Inference | Single forward pass with Torch ≥ 2.3 for rapid responses. |
| Minimal Dependencies | Requires only torch, transformers, sentencepiece via pip. |
| Single‑Command CLI | Invoke via `python gemma_code_helper/__main__.py` with argparse options. |
| No Editor Coupling | Works as a standalone script; integrates with any editor via shell. |
| MIT Licensed | Permissive open‑source license for unrestricted use. |

## Quick Start
1. Clone the repository:  
   ```bash
   git clone https://github.com/your-org/agentic-coding-mcp-server.git
   cd agentic-coding-mcp-server
   ```
2. Install runtime dependencies:  
   ```bash
   pip install -r requirements.txt
   ```
3. Place a Gemma 4 GGUF file (e.g., `gemma-4-q4_k_m.gguf`) in the project root or set `GEMMA_MODEL_PATH` to its location.  
4. Run a refactor request on a file:  
   ```bash
   python gemma_code_helper/__main__.py --mode refactor --file myscript.py
   ```
5. Run an explain request on stdin:  
   ```bash
   cat myscript.py | python gemma_code_helper/__main__.py --mode explain
   ```

## Examples
**Refactor a nested loop**  
Command:  
```bash
python gemma_code_helper/__main__.py --mode refactor --file loop.py
```
Input (`loop.py`):  
```python
for i in range(len(items)):
    for j in range(len(items)):
        if items[i] == items[j]:
            print(items[i])
```
Output:  
```python
for item in items:
    if items.count(item) > 1:
        print(item)
```

**Explain a sorting function**  
Command:  
```bash
echo "def quicksort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[0]\n    less = [x for x in arr if x < pivot]\n    equal = [x for x in arr if x == pivot]\n    greater = [x for x in arr if x > pivot]\n    return quicksort(less) + equal + quicksort(greater)" | python gemma_code_helper/__main__.py --mode explain
```
Output:  
```
This function implements the quicksort algorithm. It selects the first element as a pivot, partitions the array into elements less than, equal to, and greater than the pivot, then recursively sorts the partitions and concatenates the results.
```

**Generate a docstring for a function**  
Command:  
```bash
python gemma_code_helper/__main__.py --mode explain --file compute.py
```
Input (`compute.py`):  
```python
def compute_average(values):
    total = sum(values)
    count = len(values)
    return total / count if count else 0
```
Output:  
```
This function calculates the arithmetic mean of a list of numbers. It sums the elements, divides by the count, and returns zero for an empty list to avoid division by zero.
```

## File Structure
Agentic Coding MCP Server: Local Gemma 4 powered coding assistant integrated with Zed editor/
├── gemma_code_helper/          # Main package
│   ├── cli.py                  # CLI argument parsing
│   ├── engine.py               # Model loading & inference
│   ├── formatter.py            # Output cleaning
│   ├── prompt.py               # Prompt construction
│   ├── __init__.py
│   └── __main__.py             # Entry point
├── tests/                      # Unit test suite
│   ├── test_cli.py
│   ├── test_engine.py
│   ├── test_formatter.py
│   ├── test_integration.py
│   └── test_prompt.py
├── assets/                     # Documentation assets
│   └── infographic.png
├── requirements.txt            # Runtime dependencies
├── requirements-dev.txt        # Development dependencies
├── LICENSE
├── README.md
└── spec.md

## Tech Stack
| Technology | Purpose |
|------------|---------|
| Python 3.10+ | Core language |
| torch ≥ 2.3 | Tensor computation & model inference |
| transformers | Tokenizer & model loading for GGUF |
| sentencepiece | Tokenizer backend (bundled with transformers) |
| pip | Dependency management |
| argparse | CLI parsing |
| Standard library | File I/O, OS interaction |

## Contributing
Fork the repo, make changes, run `pytest` to verify, and submit a pull request. Keep modifications minimal and well‑tested.

## License
MIT

## Author
Matthew Snow -- [M2AI](https://m2ai.co) | [@m2ai-portfolio](https://github.com/m2ai-portfolio)