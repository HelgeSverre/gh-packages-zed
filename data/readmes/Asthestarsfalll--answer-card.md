# answer-card

[![license: MIT](https://img.shields.io/badge/license-MIT-4D6BFE.svg)](LICENSE)
[![platform: macOS](https://img.shields.io/badge/platform-macOS%2013%2B-000000.svg)](#环境要求)
[![hosts: Antigravity | DSH | Zed](https://img.shields.io/badge/hosts-Antigravity%20%7C%20DSH%20%7C%20Zed-4D6BFE.svg)](#分层架构)

**macOS 通用悬浮回答卡片：当 Antigravity、DeepSeek Harness (DSH) 或 Zed 中的 Agent 需要你批准、回答或收尾时，直接把决定搬到屏幕置顶悬浮窗——按一键或点一下即完成响应，无需切换窗口。**

A host-agnostic macOS always-on-top floating card for AI coding agents (**Antigravity**, **DeepSeek Harness**, and **Zed**). Approve tool calls, answer single/multi-select or free-text questions, and jump back or send follow-ups without breaking focus.

```text
┌───────────────────────────────────────────────────┐
│ Antigravity · 需要你回答                 [ 展开 E ] │
│ answer-card · 确认插件架构                         │
│                                                   │
│ ┌───────────────────────────────────────────────┐ │
│ │ 1  直接代我作答    点了就等于已回答            │ │
│ ├───────────────────────────────────────────────┤ │
│ │ 2  只切回前台      交回宿主原生界面            │ │
│ └───────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────┬─┐ │
│ │ 也可以直接输入补充说明（回车换行，⌘⏎ 提交）… │3│ │
│ └─────────────────────────────────────────────┴─┘ │
│ [ 稍后处理 ]                         [ 提交答案 ]  │
└───────────────────────────────────────────────────┘
```

## 核心功能

- **审批代答**：工具请求权限时后台弹卡，支持「允许一次 / 本次会话允许 / 总是允许 / 拒绝」以及直接输入拒绝原因或替代指令；Antigravity 自动附带 `permissionOverrides` 避免原生二次弹窗，点「稍后处理」无损交回宿主原生界面。
- **提问与多题作答**：支持单选、多选、自由文本以及选项 + 补充说明；单选聚焦输入框自动取消已选项，多题支持部分作答提交。
- **完成提醒 & 直接追问**：回合结束后后台弹卡；留空确认一键激活宿主并按标题关键词拉起对应窗口（支持多窗口），Antigravity 支持在完成卡里直接输入追问续跑下一轮。
- **动态主题自适应**：自动跟随当前 Agent 实时浅/深配色——Antigravity 通过 MCP App `hostContext` 同步、DSH 同步实时样式、Zed 自动读取 `settings.json` 与已安装扩展主题（兼容 Blur 透明主题）。
- **跨宿主统一可视化设置页**：三端共享同一套 `<answer-card-settings>` Web Component（Antigravity 内置侧边栏/全页 MCP App、DSH 插件设置分区、Zed 本地设置页），所有配置统一存入 `~/.config/answer-card/settings.json`（共享层 + 按宿主覆写层）。
- **完整键盘操作 & Markdown 渲染**：支持数字键选择/取消/聚焦、`⌘` 组合键在输入态触发、常驻 `展开 E` / `收起 E` 且展开自动防溢出屏幕、正文 Markdown（含行内代码/可点击链接）划选与 `⌘C` 复制。
- **智能防打扰 & 失败开放**：宿主位于前台时静默回退原生 UI；支持工作区（精确或末尾 `/` 前缀）与会话级静音、完成提醒冷却；任何编译/执行异常或超时均失败开放，绝不卡死 Agent。

## 键盘快捷键

非输入态直接按单键即可；仅在光标位于输入框内时加 `⌘` 前缀触发同类操作：

| 功能 | 非输入态 | 输入框内 |
| --- | --- | --- |
| 选中/取消选项，或聚焦输入框 | `1`–`9`（含小键盘） | `⌘1`–`⌘9` |
| 展开 / 收起卡片（自动防溢出屏幕） | `E` | `⌘E`（保留输入内容与焦点） |
| 提交 / 发送追问 | `Return` | `⌘Return`（`Return` 换行） |
| 退出输入框 / 关闭（稍后处理） | `Esc`（关闭卡片） | `Esc`（先退出输入焦点） |
| 复制 / 粘贴 / 剪切 / 全选 / 撤销 | `⌘C`（复制选中正文） | `⌘C` / `⌘V` / `⌘X` / `⌘A` / `⌘Z` |

## 分层架构

```text
answer-card/
├── plugin.json / hooks.json / mcp_config.json    # Antigravity 原生插件入口（根目录即可安装）
├── rules/ / skills/ / assets/                    # Antigravity 规则与设置 Skill
├── package.json / cordis.patch.yml               # DeepSeek Harness (DSH) bundle 入口
├── core/                                         # 共享核心（运行期零第三方依赖，多宿主共用）
│   ├── swift/PromptWindow.swift                  # macOS AppKit 悬浮窗、--probe、--activate
│   ├── helper.mjs                                # swiftc 编译缓存、前台探测、跨进程互斥锁
│   ├── settings.mjs                              # 统一配置（全局 + hosts.<id> 覆写）、静音、冷却
│   ├── theme.mjs                                 # 跨宿主动态主题解析（快照 / Zed 扩展 / 系统外观）
│   ├── protocol.mjs                              # 审批 / 提问 / 完成 / 测试卡片载荷构造
│   ├── bridge.mjs                                # 远程 SSH 反向转发桥接（服务端自动启动 + 客户端）
│   ├── settings-server.mjs                       # 本地 127.0.0.1 可视化设置页服务（Zed / CLI 复用）
│   ├── mcp.mjs                                   # 通用 stdio MCP Server（Zed / 跨宿主复用）
│   └── cli.mjs                                   # 通用设置、静音、测试与本地设置页 CLI
└── adapters/
    ├── shared/ui/                                # 跨宿主共享 <answer-card-settings> Web Component
    ├── antigravity/                              # Antigravity PreToolUse / Stop Hook + MCP App
    ├── dsh/                                      # DeepSeek Harness Cordis 插件 + Web 设置挂载
    └── zed/                                      # Zed MCP 启动器 + 可选 ACP 权限代理
```

## 环境要求

- **macOS 13+**（原生 AppKit 悬浮窗）
- **Node.js ≥ 20**（运行期零第三方依赖，UI 产物已预构建，安装后无需 `npm install`）
- **Xcode Command Line Tools**（提供 `swiftc`；若未安装请执行 `xcode-select --install`）

> 首次触发时会将 `core/swift/PromptWindow.swift` 编译缓存到 `~/Library/Caches/answer-card/PromptWindow-<hash>`（约 1–3 秒），后续毫秒级复用。

## 安装与配置

### 1. Antigravity

#### 方式一：直接克隆到 Antigravity 插件目录（推荐，App / IDE / CLI 通用）

```bash
git clone https://github.com/Asthestarsfalll/answer-card.git ~/.gemini/config/plugins/answer-card
```

可选：预先编译一次 Swift 悬浮窗助手：

```bash
node ~/.gemini/config/plugins/answer-card/core/cli.mjs compile
```

#### 方式二：通过 `agy` CLI 安装

```bash
git clone https://github.com/Asthestarsfalll/answer-card.git
agy plugin install ./answer-card
```

安装启用后即可在 **左侧边栏 → Answer Card**、**右侧辅助栏 `+` → Answer Card** 或对话中说「打开 Answer Card 设置」打开内置可视化面板。

| 场景 | Hook / 机制 | 行为 |
| --- | --- | --- |
| 模型提问（`ask_question`） | `PreToolUse` + `rules/AGENTS.md` | 后台弹提问卡，答完直接回传给模型继续；前台 / 稍后处理 / 超时回退原生弹窗 |
| 工具审批（`run_command` / `call_mcp_tool` / `write_file` / `edit_file`） | `PreToolUse` | 按 `approvalPolicy` 后台弹审批卡，支持一次/会话/总是允许与拒绝原因输入 |
| 回合完成 | `Stop` | 后台弹完成卡；留空确认切回对应窗口，输入文字直接返回 `decision: "continue"` 续跑 |

> **审批拦截策略（`approvalPolicy`）**：`external`（默认，拦截越沙箱/高风险命令、工作区外文件写操作与 MCP）、`commands`（全部命令与 MCP）、`mutating`（命令、文件写/改与 MCP）、`all`（全部匹配工具）。
>
> **关于 Antigravity 原生权限门与 Turbo 模式**：Antigravity 的原生权限门位于 `PreToolUse` Hook 之前。将 **Settings → General → Global Permissions** 切为 **Turbo** 后，越沙箱命令行（`BypassSandbox: true`）会放行进入 `PreToolUse` 由 Answer Card 接管；但对工作区外敏感路径（如 `~/.ssh/config`、`~/.gemini/config/config.json`）Antigravity 仍保留独立的文件边界保护（需单独放开 **Non-Workspace File Access**，且部分硬编码敏感目录始终走原生确认）。若日后停用 `answer-card` 插件，请及时改回默认预设。

---

### 2. DeepSeek Harness (DSH)

仓库完整保留 DSH bundle 入口（`package.json` + `cordis.patch.yml` + 共享设置组件）：

- **桌面端**：设置 → 插件 → 安装，填入 `https://github.com/Asthestarsfalll/answer-card`
- **命令行**：`dsh plugin --profile desktop add file:/path/to/answer-card`

首次启动会自动将旧的 `$DSH_HOME/dsh-answer-card.json` 迁移到 `~/.config/answer-card/settings.json` 的 `hosts.dsh` 中（兼容 `skipWhenDSHFocused`），并在 DSH 设置页挂载同一套 `<answer-card-settings>` 面板。

---

### 3. Zed

Zed 通过共享 `core/` 提供原生 MCP Server（以及可选的 ACP Proxy），详见 [adapters/zed/README.md](adapters/zed/README.md)。

在 `~/.config/zed/settings.json` 中加入：

```json
{
  "context_servers": {
    "answer-card": {
      "command": "/path/to/answer-card/adapters/zed/mcp.sh",
      "args": []
    }
  },
  "agent": {
    "tool_permissions": {
      "tools": {
        "mcp:answer-card:answer_card_ask": { "default": "allow" },
        "mcp:answer-card:answer_card_approve": { "default": "allow" },
        "mcp:answer-card:answer_card_notify": { "default": "allow" },
        "mcp:answer-card:answer_card_open_settings": { "default": "allow" },
        "mcp:answer-card:answer_card_settings": { "default": "allow" }
      }
    }
  }
}
```

提供的 5 个 MCP 工具：
- `answer_card_ask`：弹出悬浮提问卡并返回答案。
- `answer_card_approve`：弹出悬浮审批卡（支持填写拒绝原因 / 替代指令）。
- `answer_card_notify`：弹出完成卡，一键切回并拉起对应 Zed 窗口。
- `answer_card_open_settings`：启动仅监听 `127.0.0.1` 的本地可视化设置页（复用 `<answer-card-settings>`，自动套用 Zed 当前主题）并在浏览器打开。
- `answer_card_settings`：在 Zed 对话中直接读取 / 修改配置或发送测试卡片。

> 若需要拦截外部 ACP Agent 的原生权限请求，还可在 `agent_servers` 中用 `adapters/zed/acp-proxy.sh -- <acp-agent>` 包装（详见 [adapters/zed/README.md](adapters/zed/README.md)）。

---

### 4. 远程 SSH 会话支持（Linux 服务器 → 本机 Mac 弹窗）

本机 macOS 启用 Antigravity / Zed 插件时会自动监听 `127.0.0.1:19876`（带随机 Bearer Token，强制使用本机 Mac 外观/主题与 `returnCommand`，绝不执行远端传入命令）。让远程 SSH 主机也支持本机弹卡只需两步：

1. **在 `~/.ssh/config` 给目标主机加一行反向转发**：

```sshconfig
Host your-remote-host
  RemoteForward 19876 127.0.0.1:19876
```

2. **在本机一键部署插件并同步 Token 到远端**：

```bash
node ~/.gemini/config/plugins/answer-card/core/cli.mjs ssh-install your-remote-host
```

之后重连 SSH 即可生效：远端 Linux 上的 `PreToolUse` / `Stop` Hook 会自动检测 `~/.config/answer-card/bridge-token`，把审批、提问与完成卡通过隧道转发到你的 Mac 弹出（无隧道时毫秒级失败开放，回退原生界面）。

## 统一配置与 CLI

所有宿主共用 `~/.config/answer-card/settings.json`（共享全局外观 + `hosts.<id>` 按宿主独立覆写）：

```bash
# 打开本地可视化设置页（默认聚焦指定宿主）
node core/cli.mjs ui --host zed

# 查看当前生效配置
node core/cli.mjs status --host antigravity

# 发送测试卡片 / 测试「回到宿主」
node core/cli.mjs test --host zed
node core/cli.mjs test-return --host zed

# 修改全局（--global）或单宿主（--host）配置
node core/cli.mjs set position cursor --global
node core/cli.mjs set width 500 --global
node core/cli.mjs set fontScale 1.1 --global
node core/cli.mjs set approvalPolicy commands --host antigravity

# 静音工作区（末尾带 / 匹配整个子目录）或会话
node core/cli.mjs mute-workspace /path/to/workspace/ --host antigravity
node core/cli.mjs mute-session <sessionId> --host antigravity

# 开启诊断日志
node core/cli.mjs set traceFile /tmp/answer-card.log --global
```

## 开发与测试

```bash
npm run build:ui   # 修改 adapters/shared/ui 或宿主设置入口后重新构建前端产物（需先 npm install）
npm run check      # 全量 JS 语法检查
npm test           # 运行核心与三宿主适配器单测
npm run compile    # 预编译 macOS Swift 悬浮窗助手
```

## 许可

[MIT](LICENSE) © 2026 Asthestarsfalll
