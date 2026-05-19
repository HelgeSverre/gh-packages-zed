# Color Preview — Zed Extension

Zed IDE 用のインラインカラープレビュー拡張機能です。エディタ上のカラーコード文字列の横に色見本を表示します。

## 対応カラー形式

| 形式 | 例 |
|------|------|
| Hex (3桁) | `#f00` |
| Hex (6桁) | `#ff0000` |
| Hex (4桁/8桁 alpha付き) | `#ff000080`, `#f008` |
| rgb() / rgba() | `rgb(255, 0, 0)`, `rgba(255, 0, 0, 0.5)` |
| hsl() / hsla() | `hsl(0, 100%, 50%)`, `hsla(0, 100%, 50%, 0.5)` |
| CSS Named Colors | `red`, `coral`, `dodgerblue` など148色 ※ |

※ Named Colors は CSS 系言語 (CSS / SCSS / Less / HTML) でのみ検出されます。

## 対応言語

HTML, CSS, SCSS, Less, JavaScript, TypeScript, TSX, JSX, JSON, JSONC, Markdown, Python, Rust, Go, TOML, YAML, Vue.js, Svelte, Astro, PHP, Ruby, C, C++, C#, Java, Kotlin, Swift, Dart, Elixir, Lua, Zig

## フォルダ構成

```
color-preview/
├── extension.toml           # Zed 拡張機能マニフェスト
├── Cargo.toml               # WASM 拡張クレート (cdylib)
├── rust-toolchain.toml      # ビルドツールチェイン設定
├── src/
│   └── color_preview.rs     # Extension trait 実装
├── server/
│   ├── Cargo.toml           # LSP サーバークレート
│   └── src/
│       ├── main.rs           # LSP サーバー本体
│       ├── color_parser.rs   # カラーコード検出・パース
│       └── named_colors.rs   # CSS Named Colors テーブル
└── test-files/              # テスト用サンプルファイル
```

## インストール方法

### 前提条件

- [Zed IDE](https://zed.dev/) (v0.170 以降)
- [Rust ツールチェイン](https://rustup.rs/) (`cargo` コマンドが使える状態)

### 手順 1: LSP サーバーをビルド

```bash
cd server
cargo build --release
```

### 手順 2: バイナリを PATH に配置

ビルドされたバイナリを PATH の通ったディレクトリにコピーします。

**Windows (PowerShell):**
```powershell
Copy-Item server\target\release\color-lsp-server.exe $env:USERPROFILE\.cargo\bin\
```

**macOS / Linux:**
```bash
cp server/target/release/color-lsp-server ~/.cargo/bin/
```

> `~/.cargo/bin` は `rustup` をインストールすると自動的に PATH に追加されます。

### 手順 3: Zed に拡張機能をインストール

1. Zed を開く
2. コマンドパレットを開く（`Ctrl+Shift+P` / `Cmd+Shift+P`）
3. **`zed: install dev extension`** を実行
4. この `color-preview` フォルダを選択
5. ビルド完了まで待機（初回は数十秒かかります）

### 手順 4: プロジェクトフォルダを信頼する

Zed はセキュリティのため、開いたフォルダを信頼するか確認します。
ウィンドウ上部に表示される **「Trust」ボタンを押して**ください。
信頼しないと LSP サーバーが起動しません。

> **ヒント**: すべてのプロジェクトを自動信頼するには、Zed の `settings.json` に以下を追加します：
> ```json
> "session": {
>   "trust_all_worktrees": true
> }
> ```

## 設定

Zed の `settings.json`（`Ctrl+,` / `Cmd+,`）で表示モードを変更できます。

### カラー表示モード

```json
{
  "editor": {
    "lsp_document_colors": "inlay"
  }
}
```

| 値 | 説明 |
|------|------|
| `"inlay"` | カラーコードの横にインラインで色見本を表示（**デフォルト**） |
| `"background"` | カラーコード文字列の背景色を変更 |
| `"border"` | カラーコードに下線を表示 |
| `"none"` | カラー表示を無効化 |

### 特定の言語で無効化する

特定の言語でカラープレビューを無効にするには：

```json
{
  "languages": {
    "Markdown": {
      "language_servers": ["!color-preview-lsp", "..."]
    }
  }
}
```

## アンインストール

1. コマンドパレットで **`zed: extensions`** を開く
2. 「Color Preview」を探して **Uninstall** をクリック
3. 不要なら `color-lsp-server` バイナリも削除：
   ```powershell
   # Windows
   Remove-Item $env:USERPROFILE\.cargo\bin\color-lsp-server.exe
   ```
   ```bash
   # macOS / Linux
   rm ~/.cargo/bin/color-lsp-server
   ```

## ライセンス

Apache-2.0

> **Note**: CSS Named Colors (`red`, `blue` 等) は CSS/SCSS/Less/HTML/Vue/Svelte のみで検出されます。
> 他の言語では Hex/RGB/HSL のみ検出します（誤検出防止のため）。
