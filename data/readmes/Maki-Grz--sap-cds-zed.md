# SAP CDS Language Support for Zed

This is a community-driven extension for the [Zed Editor](https://zed.dev) that adds support for the **SAP Core Data Services (CDS)** language of the Cloud Application Programming Model (CAP).

It mimics the features of the official VS Code extension `sapse.vscode-cds` by using the same Tree-sitter parser and integrating with the official language server `@sap/cds-lsp`.

---

## ⚠️ Disclaimer

**This is a community-driven, open-source project. It is NOT affiliated with, sponsored by, or officially supported by SAP SE.**

SAP SE has no responsibility or liability for this extension. Core Data Services (CDS) and SAP CAP are trademarks or registered trademarks of SAP SE in Germany and other countries. This extension is provided "as is" under the Apache 2.0 License, without warranties or conditions of any kind.

---

## ✨ Features

- **Syntax Highlighting:** Full syntax highlighting mapped on Tree-sitter nodes for `.cds`, `.cdl`, and `.hdbcds` files.
- **Code Folding:** Fold entity, service, context, view, aspect, type, and annotation definitions.
- **Auto-Indentation:** Indentation rules for braces `{}` and parentheses `()`.
- **Bracket Matching:** Highlighting and matching for brackets, brackets, and braces.
- **LSP Intelligence (via `@sap/cds-lsp`):**
  - **Autocomplete:** Smart code completion suggestions for keywords, types, and model elements.
  - **Diagnostics:** Real-time semantic and syntax validation with errors highlighted in-editor.
  - **Go to Definition:** Jump directly to declared entities, aspects, or types using `F12` or `Ctrl+Click`.
  - **Outline Panel:** View the hierarchical layout of your `.cds` files directly in Zed's outline view.

---

## 📋 Prerequisites

To run this extension fully, you need:
1. **Zed Editor** installed.
2. **Node.js** (required to run the language server).
3. The **SAP CDS Development Kit** installed globally for compilation and deployment tasks:
   ```bash
   npm install -g @sap/cds-dk
   ```

---

## 🛠️ Local Testing

To test this extension locally inside Zed:

1. Open Zed.
2. Open the Command Palette (`Ctrl+Shift+P` on Windows/Linux or `Cmd+Shift+P` on macOS).
3. Execute the action **`zed: install dev extension`**.
4. Choose the directory containing this extension (`sap-cds`).
5. Open any `.cds` file to activate highlighting and IntelliSense!

*Note: You can watch the extension logs by launching Zed from your terminal via `zed --foreground`.*

---

## 📄 License

This extension is licensed under the **Apache License 2.0**. See the [LICENSE](LICENSE) file for the full text.
