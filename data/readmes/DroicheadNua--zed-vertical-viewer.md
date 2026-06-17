[English version is available here (README-en.md)](./README-en.md)

# Zed Vertical Viewer (zed-vertical-viewer)

マークダウン（.md）ファイルを縦書きでプレビューするための、Zedエディタ用拡張機能です。青空文庫形式のルビにも対応しています。

また、ルビ付き・縦書きのままEPUBやHTMLで出力することもできます。

![Screenshot](./screenshot.png) 

自作の没入型ライティングエディタ[MirrorShard 2](https://github.com/DroicheadNua/MirrorShard_2) の縦書きプレビュー機能を移植したものです。

---

## 仕様

- 本拡張機能は、Markdown用の言語サーバとして動作します。Markdown（`.md`）ファイルを開いた際に、自動的にLSPとしてバックグラウンドで起動・連動します（したがってステータスバーの「Language Servers」で操作が可能）。
　- したがって、拡張子.txtのファイルしか開かれていない場合にはサーバが起動しません。
- 完全ローカル動作：Zedの標準入力をキャプチャしてプレビューウィンドウ（WebView）に送っているだけなので、外部のサーバーやクラウドにデータ送信することはありません。
- 保存時（Ctrl + S）に自動同期：エディタ側で保存（`Ctrl + S` または `:w`）、あるいはオートセーブしたタイミングでプレビューが更新されます。
- プレビューウィンドウの多重起動はできない仕様になっています。
- 青空文庫のルビ書式（｜親字《ルビ》）で書くことで、プレビュー画面でルビを表示することができます。
- WebViewでプレビューしている関係上、巨大テキストを扱うことはできません。安全のため、文字数が多すぎる場合は先頭の50000字だけを表示し、末尾に境界線と注意書きを追加しています。
- Linux環境では、ウィンドウの描画（安定性）のためにWebKit Compositeを無効化する仕様上、メモリ消費量（RAM）が大きくなります。

---

## 技術スタック

Tauri v2 ＋ Rust ＋ WebAssembly（WASM）

---

## 機能と操作

プレビューウィンドウ上のコントロール、またはフォーカス時のショートカットキーで、直感的な操作が可能です。

### 画面上のコントロール（右上のツールバー）
- **最前面に固定（ピン留め）**：プレビューウィンドウを常に最前面に表示します。
- **エクスポート（HTML / EPUB）**：ルビを保持したまま、縦書きの電子書籍（EPUB）やHTML形式に変換して保存します。
- **更新**：表示を手動でリフレッシュします。
- **フルスクリーン**：プレビュー画面を全画面にします。（F11キーでも切り替え可能）。
- **最小化**：プレビューを最小化します。
- **閉じる**：プレビューを終了します（Ctrl + Pでも閉じられます）。

### ショートカットキー（プレビューウィンドウにフォーカスがある時）
- `Ctrl + T` (Macは `Cmd + T`)：**ダークモード ↔️ セピアカラー（目に優しい暖色系）** のテーマを切り替えます（設定は自動保存されます）。
- `Ctrl + P` (Macは `Cmd + P`) または`Ctrl + Q` (Macは `Cmd + Q`)：プレビューを閉じます。
- `Ctrl + H` (Macは `Cmd + H`)：プレビューを最小化します。
- `Ctrl + +` / `Ctrl + -`：フォントサイズの拡大・縮小。
- `Ctrl + 0`：フォントサイズをデフォルト(18ポイント)に戻します。

また、プレビューウィンドウは、ウィンドウの端をドラッグしてサイズを変更できます。

---

## 🚀 導入・セットアップ手順

※現在、本拡張機能はZedの公式レジストリへ申請中（Pending）です。そのため、公式収録されるまでの間は、以下の手順で手動インストールを行ってください。

### 1. プレビュー用バイナリ（本体）の配置

お使いのオペレーティングシステム（OS）に合わせた手順に従って、エディタ裏で動作するプレビュー本体のセットアップを行います。

#### 🔹 Windowsの場合
1. [Releasesページ](https://github.com/DroicheadNua/zed-vertical-viewer/releases) から、`zed-vertical-viewer.exe` をダウンロードします。
2. ダウンロードした `zed-vertical-viewer.exe` を、環境変数（PATH）の通っているフォルダ（例：`C:\Windows`、またはご自身で用意しているPATHの通ったフォルダ）に配置します。

#### 🔹 macOSの場合
macOSのセキュリティ仕様により、Windows版と同じ手順（生バイナリの起動）を踏むとシステムに画面描画をブロックされてしまいます。そのため、以下の手順で配置を行ってください。

1. [Releasesページ](https://github.com/DroicheadNua/zed-vertical-viewer/releases) から、**`zed-vertical-viewer_1.0.0_aarch64.dmg`** をダウンロードし、ダブルクリックしてインストールします。（`/Applications` フォルダにアプリが配置されます）
2. ターミナルを開き、以下の**コマンドブロックを丸ごとコピーして貼り付け、実行**してください。（※自動的に中継用スクリプトが生成され、実行権限が付与されます）

   sudo tee /usr/local/bin/zed-vertical-viewer << 'EOF'
   #!/bin/bash
   exec /Applications/zed-vertical-viewer.app/Contents/MacOS/zed-vertical-viewer "$@"
   EOF
   sudo chmod +x /usr/local/bin/zed-vertical-viewer

#### 🔹 Linuxの場合

1. [Releasesページ](https://github.com/DroicheadNua/zed-vertical-viewer/releases) から、拡張子なしの実行バイナリ zed-vertical-viewer をダウンロードします。

2. ダウンロードしたバイナリを、/usr/local/bin/ などのPATHの通った場所に配置し、ターミナルで以下のコマンドを実行して実行権限を付与します：

sudo chmod +x /usr/local/bin/zed-vertical-viewer

### 2. Zed 拡張機能（WASM）のインストール

    本リポジトリを git clone するか、ZIPでダウンロードしてご自身のPC上で解凍しておきます。

    Zedを開き、コマンドパレット（Ctrl + Shift + P）から、zed: install dev extension を実行します。

    ファイル選択ダイアログが開くので、先ほどダウンロードしたリポジトリフォルダの中にある zed-extension フォルダ を選択してインストールします。

---

## エクスポート機能（Pandoc）について
EPUBやHTMLへのエクスポートには、システムに **Pandoc** がインストールされている必要があります。
- 導入されていない場合は、[Pandoc公式サイト](https://pandoc.org/) からインストールしてください。
- Pandocは標準的な場所、あるいはパスの通っている場所にインストールされていることを想定しています。それ以外の場所にインストールすると、正しく認識されない場合があります。

---

## ⚠️ プロジェクト（フォルダ）切り替え時の注意点

Zedの仕様上、エディタ側でプロジェクト（ワークスペース）を切り替えた際、古いLSPプロセスと新しいプロセスの間で、プレビューの自動同期が停止することがあります。

その場合は、**お手数ですが以下のいずれかの手順で再起動（Restart）を行ってください。**
1. Zedのステータスバーにある `zed-vertical-viewer` の横の **"Restart"** ボタンをクリックする（それでも起動できない場合、Restart All Serversで全サーバを再起動する）。
2. コマンドパレットから **`editor: restart language server`** を実行する。

これによって、新しいプロジェクトのドキュメントの自動同期が再開されます。

---

## ライセンス

本プロジェクトは **MIT License** のもとで公開されています。



　Copyright (c) 2026 [DroicheadNua]  
　mirrorshard.dev@gmail.com  
 X: @mirrorshard_dev  
　https://github.com/DroicheadNua/zed-vertical-viewer
