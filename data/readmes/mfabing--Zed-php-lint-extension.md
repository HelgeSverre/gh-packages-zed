# zed-php-lint

A **Zed extension** that runs `php -l` (PHP’s built-in syntax checker) automatically whenever you save a PHP file. It reports syntax errors as diagnostics and highlights the offending line in your editor.

---

## ✨ Features
- Runs `php -l <file.php>` on save.
- Parses PHP’s output for syntax errors.
- Displays diagnostics inline in the editor.
- (Optional) Moves the cursor and reveals the line with the error.
- Configurable PHP binary (via `PHP_PATH` environment variable).

---

## 📦 Installation
1. Clone this repo:
   ```bash
   git clone https://github.com/mfabing/zed-php-lint.git
   cd zed-php-lint
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the extension:
   ```bash
   npm run build
   ```
4. Link or copy the built extension into your Zed extensions directory (see Zed docs on local extension development).

---

## ⚙️ Usage
- Open a PHP file in Zed.
- Save the file.
- If there’s a syntax error, Zed will show a diagnostic pointing to the error line.
- If there are no errors, diagnostics will be cleared.

---

## 🔧 Configuration
- By default, the extension calls `php` from your system’s PATH.
- To use a specific PHP binary, set the environment variable:
  ```bash
  export PHP_PATH=/usr/local/bin/php8.4
  ```

---

## 🧩 Development
- The extension is written in TypeScript.
- Source code is in `src/index.ts`.
- To run in development mode:
  ```bash
  npm run dev
  ```

---

## 🚀 Roadmap
- [ ] Full integration with Zed’s diagnostics API (replace `console.log` placeholders).
- [ ] Error popups using `window.showErrorMessage`.
- [ ] Support for configurable timeout.
- [ ] Auto-fix support via PHP-CS-Fixer (optional).

---

## 📚 Notes
This is a **skeleton extension**: some APIs (document save events, diagnostics reporting) may require adapting to Zed’s evolving extension system.

---

## 📝 License
MIT License. See [LICENSE](LICENSE) for details.
