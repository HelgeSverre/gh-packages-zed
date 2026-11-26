# Zed Extension for Avalonia Axaml

Avalonia `.axaml` 支持：

- tree-sitter：highlight、outline、缩进、括号
- LSP：补全、hover、诊断、定义、引用、重命名、inlay hints
- AXAML <=> C# 跳转：`x:Class`、`x:DataType`、`{Binding Name}`、`Click="OnSave"`
- XamlStyler 格式化，支持未保存的缓冲区

## 要求

- Zed
- **.NET SDK 10+**（`dotnet` 在项目 PATH 中）
- 首次使用需要联网下载 `axaml-ls` 和 `XamlStyler.Console`

## 开发

```sh
./scripts/build-formatter.sh
cargo build --release --target wasm32-wasip2
```

## 安装

1. 执行 **`zed: install dev extension`**，选择本仓库目录。
2. 打开任意 `.axaml` 文件。

> 如果安装过 `Engel-167/zed-axaml`，请先卸载，避免 `AXAML` / `axaml-ls` 冲突。

## Zed 配置

```jsonc
// ~/.config/zed/settings.json
{
  "languages": {
    "AXAML": { "formatter": "language_server", "format_on_save": "on" }
  },
  "inlay_hints": { "enabled": true }
}
```

## XamlStyler

项目/解决方案根目录的 `Settings.XamlStyler` 会自动读取（向上查找，停在 `.sln` / `.slnx` / `.vs`）：

```json
{
  "IndentSize": 2,
  "AttributesTolerance": 2,
  "KeepFirstAttributeOnSameLine": false
  // ...
}
```

项目文件不存在时，可以用 Zed 内联 `config` 作为 fallback。完整的 `XamlStylerLSP` 选项：

```jsonc
{
  "lsp": {
    "XamlStyler": {
      "initialization_options": {
        "enabled": true,                   // false = 关闭格式化
        "verbose": false,                  // 日志打印实际执行的 xstyler 命令
        "loglevel": "Default",             // None | Minimal | Default | Verbose | Debug
        "timeoutMs": 30000,

        // 配置来源：默认自动查找项目 Settings.XamlStyler
        // "configPath": "${workspaceFolder}/Settings.XamlStyler", // 显式文件，优先级最高
        "config": {
          "IndentSize": 2,
          "AttributesTolerance": 2,
          "KeepFirstAttributeOnSameLine": false
          // 其余 XamlStyler 选项...
        },

        // xstyler 启动方式；默认自动下载 3.2501.8
        // "command": "xstyler",
        // "dll": "/path/to/xstyler.dll",
        // "version": "3.2501.8",
        "extraArguments": [],              // 追加 xstyler 参数

        "searchToSolutionRoot": true,
        "useLspIndentOptions": true,
        // 可选缩进覆盖；config/Settings.XamlStyler 已设置时保持注释
        // "indentSize": 4,
        // "indentWithTabs": false,

        // TrimTrailingAddNewline | TrimTrailingNoNewline | XStylerConsoleBehavior
        "fileWhiteSpaceBehavior": "TrimTrailingAddNewline"
      }
    }
  }
}
```

优先级：`configPath`（显式指定）> 项目 `Settings.XamlStyler` > Zed 内联 `config`。

`lsp.XamlStyler` 是格式化服务器自己的配置；`lsp.axaml-ls` 只配置语言服务器。内部适配器程序集是 `XamlStylerLSP`。

其它 XamlStyler 选项见 [XamlStyler 配置文档](https://github.com/Xavalon/XamlStyler/wiki/External-Configurations)。

## Axaml LSP

默认使用 [axaml-ls](https://github.com/Engel-167/axaml-ls) `0.1.0`（自动下载）。完整配置：

```jsonc
{
  "lsp": {
    "axaml-ls": {
      // 可选：不写 binary 时自动下载 axaml-ls。
      // 换用官方 Avalonia 服务器时取消注释并改成实际路径。
      // "binary": {
      //   "path": "dotnet",
      //   "arguments": ["/path/to/AvaloniaUI.VSCodeServer.dll"],
      //   "env": {}
      // },
      "initialization_options": {
        "verbose": false,
        "inlayHints": { "bindingSource": true },
        "codeLens": { "resourceReferences": true },
        "renameFiles": { "updateClass": true }
      }
    }
  }
}
```

- `binary` 为空：自动下载 axaml-ls；设置后使用指定服务器。
- axaml-ls 自带的格式化选项没有列出，因为格式化统一由 `XamlStyler` 提供。其它选项见 [axaml-ls 文档](https://github.com/Engel-167/axaml-ls)。

> 官方 Avalonia 服务器是专有软件，本仓库不分发它。

## 许可

本扩展 MIT。`axaml-ls` 和 `XamlStyler`（Apache-2.0）运行时下载，不随仓库分发。
见 [LICENSE](LICENSE) 和 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。
