# Lean 4 for Zed

这个目录提供了一个本地可安装的 Zed Lean 4 dev extension。

当前移植的是 Zed 已支持的核心能力：

- `.lean` 文件识别
- Lean language server 启动与连接
- 基于 Tree-sitter 的高亮、outline 和括号匹配
- Lean Unicode 缩写 snippets

Zed 扩展当前主要支持 language、language server、snippets、themes、debuggers 和 MCP servers，因此 VS Code 版里依赖 webview / 自定义面板的部分没有放进这个移植版：

- InfoView 及其 pin / pause 面板
- Loogle webview
- setup guide 与 manual webviews
- project wizard、标题栏菜单等 VS Code UI
- module hierarchy 视图

## 在 Zed 里安装

1. 按照 Zed 文档要求，用 `rustup` 安装 Rust。
2. 打开 Zed。
3. 执行 `zed: install dev extension`。
4. 选择 `zed-lean4` 目录。

如果你已经安装了 Zed 商店里的 Lean 4 扩展，这个 dev extension 使用同一个 `lean4` id，安装后会暂时覆盖商店版本。

## 运行逻辑

- 如果工作区根目录存在 `lakefile.lean` 或 `lakefile.toml`，扩展会启动 `lake serve --`。
- 否则会启动 `lean --server`，更适合单文件场景。
- 如果你显式设置了 `lsp.lean4-lsp.binary.path`，则完全按你的配置执行。

## 建议设置

```json
{
  "semantic_tokens": "combined",
  "lsp": {
    "lean4-lsp": {
      "settings": {
        "elan_auto_install": true,
        "elan_default_toolchain": "stable"
      }
    }
  }
}
```

如果你想固定使用某个可执行文件，可以这样配置：

```json
{
  "lsp": {
    "lean4-lsp": {
      "binary": {
        "path": "/Users/you/.elan/bin/lake",
        "arguments": ["serve", "--"]
      }
    }
  }
}
```
