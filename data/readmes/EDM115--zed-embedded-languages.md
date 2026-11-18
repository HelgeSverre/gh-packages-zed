# Embedded Languages for Zed

Highlight code inside string literals as you type. SQL can be the first statement of a Python block, with or without a `# sql` comment.

```python
if ready:
    query = """
        SELECT id, display_name
        FROM users
        WHERE active = true
    """
```

- **Host languages** include Python, JavaScript, TypeScript, TSX, Go, Rust, and TOML. TOML uses the installed TOML extension.
- **Automatic detection** covers SQL statements, JSON objects and arrays, HTML markup, and XML with an XML declaration. SQL, HTML, and XML use the corresponding installed Zed extension's Tree-sitter grammar and highlight query. JSON support is bundled.
- **Explicit Python markers** include `# sql` and `# language=html`, for example. Use a marker above a string assignment or before a string argument in a call. A marker is useful for fragments such as `SELECT display_name` that the automatic detector treats as ambiguous.

## Install on Windows

1. Extract the ZIP and quit Zed.
2. From the extracted folder containing `extension.toml`, run this in PowerShell to install the prebuilt extension.

   ```powershell
   $target = Join-Path $env:LOCALAPPDATA 'Zed\extensions\installed\embedded-languages'
   New-Item -ItemType Directory -Path $target -Force | Out-Null
   Copy-Item -LiteralPath '.\extension.toml', '.\extension.wasm' -Destination $target
   (Get-Item -LiteralPath (Split-Path -Parent $target)).LastWriteTimeUtc = [DateTime]::UtcNow
   ```

3. Reopen Zed. Merge [zed-settings.json](zed-settings.json) into your existing settings. The example includes the explicit Python and TypeScript server lists used in the compatibility check. Keep your own existing server entries and append `"embedded-languages"` last so Zed gives the snippet tokens priority where ranges overlap.

   ```json
   {
     "languages": {
       "Python": {
         "semantic_tokens": "combined",
         "language_servers": ["...", "embedded-languages"]
       }
     }
   }
   ```

   Merge the supplied `global_lsp_settings.semantic_token_rules` to use your theme's native JSON styles for keys, delimiters, brackets, booleans, null, and escapes. These rules apply only to embedded JSON. Keep the SQL extension installed for SQL highlighting. The companion server uses Zed's Node runtime and fetches its npm dependencies on first launch.

4. Open [examples/example.py](examples/example.py) or [examples/example.ts](examples/example.ts). If you updated the settings while a file was open, run **editor: restart language server**.

To build from source on any Zed platform, install Rust and run `rustup target add wasm32-wasip2`, then choose **zed: install dev extension** and select this folder. [Zed's extension development guide](https://zed.dev/docs/extensions/developing-extensions)

## Add a detector for another installed language

The server matches detector patterns against the trimmed string body and tries custom rules first. The target can be an installed extension language name, grammar name, or file suffix. A candidate must parse cleanly before automatic highlighting is applied.

This example identifies XML configuration fragments without an XML declaration. Keep the Zed XML extension installed.

```json
{
  "lsp": {
    "embedded-languages": {
      "initialization_options": {
        "autoDetect": [
          { "language": "xml", "pattern": "^<configuration\\b" }
        ]
      }
    }
  }
}
```

A rule can set `"ignoreCase": true`. Restart the language server after changing detection settings or installing a new target grammar.

To add another installed extension as a host, add its Zed display name to `languages` in `extension.toml`, and map it to its grammar name in `language_ids`. The server finds common string node types automatically. For other node names, set `initialization_options.hosts.<languageId>.stringNodes` to an array of node names. The extractor supports conventional quoted, triple-quoted, backtick, and Rust raw strings.

## How it works

Zed starts a companion language server for the host buffer. Tree-sitter finds string literal ranges, and the server parses likely snippets and sends LSP semantic tokens in the host's coordinates. Template interpolation remains highlighted as host code. Zed combines those tokens with its regular syntax highlighting. The JSON captures follow [Zed's native JSON query](https://github.com/zed-industries/zed/blob/e8bc16acee5ae1937600d571d441c4b5d7b0d288/crates/grammars/src/json/highlights.scm).

Detection is heuristic and depends on the target grammar. Incomplete or ambiguous strings can remain plain, and grammar errors can prevent highlighting. The server works with individual source literals and their interpolation spans. It does not evaluate strings, join separate literals, or decode arbitrary host escapes. Installed grammars and highlight queries need to be compatible with the companion's Tree-sitter runtime. The extension provides highlighting only. Embedded completion and diagnostics require separate editor support. [Zed semantic tokens](https://zed.dev/docs/semantic-tokens) · [Embedded language-server discussion](https://github.com/zed-industries/zed/discussions/60178)

## Verify from source

```powershell
npm ci --prefix server --ignore-scripts
$env:ZED_TEST_EXTENSIONS_DIR = Join-Path $env:LOCALAPPDATA 'Zed\extensions\installed'
node --test tests/*.test.mjs
cargo build --locked --release --target wasm32-wasip2
```

Tests for individual installed grammars skip when those grammars are absent.
