# ASPX for Zed

Syntax highlighting for ASP.NET WebForms files (`.aspx`, `.ascx`, `.master`,
`.asmx`, `.ashx`) in the [Zed editor](https://zed.dev), with HTML and C#
embedded inside server tags.

<!-- Replace with a real screenshot of an .aspx file open in Zed -->
![ASPX in Zed](./screenshot.png)

## Install

### From the Zed extension registry

1. Open Zed.
2. Open the command palette (`cmd-shift-p` / `ctrl-shift-p`) and run `zed: extensions`.
3. Search for **ASPX** and click **Install**.

Zed will then highlight any file with an ASPX file extension automatically.

### As a dev extension (from source)

1. Clone this repository.
2. In Zed, run `zed: install dev extension` from the command palette.
3. Select the cloned folder.

## Recommended companion extension

Install the [**C#** extension](https://zed.dev/extensions/c-) too. Zed doesn't
ship C# in core, and this extension injects C# into `<% %>`, `<%= %>`, and
`<%# %>` server tags — the injection only takes effect once a language called
"CSharp" is registered, which happens when the C# extension is installed.

The HTML injection that handles page markup, embedded `<script>`, and
embedded `<style>` is built into Zed and needs no extra setup.

## What you get

- File-type detection for `.aspx`, `.ascx`, `.master`, `.asmx`, `.ashx`.
- Page content highlighted as **HTML** (via language injection).
- HTML regions are combined before injection, so tags split by ASPX islands
  such as `<h2><%= Name %></h2>` still highlight as one coherent HTML tree.
- Code inside `<% ... %>` and `<%= ... %>` server tags highlighted as **C#**
  (also via injection).
- Plain server code blocks are combined before C# injection, which improves
  split control-flow such as `<% if (...) { %> ... <% } %>`.
- Data-binding expressions `<%# Eval(...) %>` highlighted as C# (rather than
  as comments — the upstream grammar treats `<%#` as an EJS-style comment;
  this extension corrects that for ASP.NET).
- Page directives `<%@ Page ... %>` highlighted as preprocessor directives
  rather than being mis-parsed as C# expressions.
- Server-side comments `<%-- ... --%>` highlighted as comments.
- `editor: toggle comments` uses `<%-- --%>` as the comment delimiter.

## Known limitations

This extension uses Tree-sitter's
[`embedded-template`](https://github.com/tree-sitter/tree-sitter-embedded-template)
grammar, which was designed for ERB/EJS-style templates. That grammar covers
the most common ASPX syntax but does **not** natively understand every
ASP.NET-specific construct. Specifically:

- `<%: ... %>` (HTML-encoded output, ASP.NET 4+) is not specially tokenised —
  it's parsed as a generic code block.
- `<%$ ... %>` (expression builders, e.g. `<%$ ConnectionStrings:MyDb %>`) is
  highlighted as an ASPX expression builder, but is not deeply parsed.
- `<%@ ... %>` directive bodies are highlighted as directives as a whole; the
  borrowed grammar does not expose individual attributes like `Language` or
  `CodeBehind` for separate colouring.
- `<asp:Control runat="server">` server controls are highlighted by the HTML
  injection — they look like XML tags, with no extra semantics on attributes
  like `runat`, `OnClick`, etc.
- SQL inside ASPX attributes such as `SelectCommand="SELECT ..."` remains an
  HTML attribute string. Highlighting that as SQL would require either a custom
  ASPX grammar that exposes those attributes or deeper HTML/SQL injection rules.

A proper ASP.NET-specific Tree-sitter grammar would address all of the above,
but is a larger separate project. PRs welcome.

## License

[MIT](./LICENSE).

The bundled grammar is fetched at build time from
[`tree-sitter/tree-sitter-embedded-template`](https://github.com/tree-sitter/tree-sitter-embedded-template)
and is licensed separately under the MIT license.
