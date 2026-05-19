# HL7 v2 Extension for Zed

Adds support for HL7 v2 messages in the [Zed editor](https://zed.dev). Syntax
highlighting is done via a [tree-sitter grammar](https://github.com/Yes25/tree-sitter-hl7v2).
Additionally a very simple [hl7_v2_lsp](https://github.com/Yes25/hl7_v2_lsp) is used to
provide some convenience features like field numbers (when inlay hints are
active), as well as field names and descriptions on hover.
