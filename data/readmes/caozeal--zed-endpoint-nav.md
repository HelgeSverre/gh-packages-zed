# Endpoint Navigator for Zed

把 Spring、FastAPI、MCP Server 的「端点」当作符号，喂给 Zed 原生的 `Cmd+T`（Go to Symbol in Project）。不需要侧边栏、不需要自定义面板，搜到即跳转。

## 原理

扩展本身是一个 Rust 壳，只负责告诉 Zed「有这么几个 language server，用 python3 跑」。真正的逻辑是 `lsp/endpoint_lsp.py`：只实现 `workspace/symbol`，把每条请求映射拼成完整路径当成符号返回。脚本通过 `include_str!` 嵌进 WASM，运行时用 `python3 -c` 执行，产物自包含，目标机器不需要 Rust 工具链。

Java 与 Python 各注册一个语言服务器，共用同一份脚本，靠 `--lang` 分流。两个进程只扫描各自的语言，结果不会重复。

## 支持范围

| 语言 / 场景 | 识别内容 | 符号示例 |
|---|---|---|
| Java（Spring MVC） | `@GetMapping` 等注解、类级 `@RequestMapping` 前缀、`value` 多路径、`method = RequestMethod.X` | `GET /api/users/{id}` |
| Python（FastAPI） | `@app.get` / `@router.post` / `@router.api_route`、`APIRouter(prefix=)`、`include_router` 跨文件前缀拼接、别名与相对导入、字符串常量、f-string 模板路径 | `POST /api/v1/users` |
| Python（MCP Server） | `app.mount(...)` 挂载点、`@mcp.tool` / `@mcp.tool(name=...)` 工具名 | `MOUNT /mcp/jxb/activity/personal`<br>`TOOL list_submitted_unpublished_activity_ids` |

Java 只扫描文件名以 `Controller.java` 结尾的文件；Python 扫描所有 `.py`，但跳过 `venv`、`.venv`、`site-packages`、`migrations`、`tests` 等目录。

## 安装

1. `Cmd+Shift+P` → `zed: install dev extension`，选择本仓库目录
2. 打开对应语言的源文件，按 `Cmd+T`，输入路径、HTTP 方法、函数名或文件名

Python 无需额外扩展，Zed 自带 Python 语言支持。

## 搜索方式

符号名形如 `GET /api/v1/users/{user_id}`，容器列显示 `app/api/users.py:get_user`。查询按空格分词，全部命中才返回：

```
users          → 所有路径或容器里含 users 的端点
get user       → 方法为 GET 且含 user 的端点
activity tool  → 含 activity 的工具符号
```

## 自检

不想开 Zed 时可以命令行直接看索引结果：

```bash
python3 lsp/endpoint_lsp.py --dump /path/to/project --lang python
python3 lsp/endpoint_lsp.py --dump /path/to/project --lang java
```

第一列是符号名，第二列是文件与函数，第三列是跳转位置。

## 构建

```bash
cargo build --release --target wasm32-wasip2
cp target/wasm32-wasip2/release/spring_endpoint_nav.wasm extension.wasm
```

`extension.wasm` 是**有意提交**的产物，使用方机器可能没有 Rust 工具链。

改完脚本重编之后，必须 `Cmd+Q` 完全退出 Zed 再重新打开。`zed: reload extensions` 和重开文件都不会重读 dev extension 的 wasm，只会用启动时缓存的旧模块重启语言服务器。排查「改了没生效」时，先看 `~/Library/Logs/Zed/Zed.log` 里 `starting language server ... args: ["-c", ...]` 带上来的脚本内容。

## 已知限制

- 只做静态解析：运行时拼接的路径、循环/工厂里动态注册的路由、`mcp.add_tool(fn)` 这类非装饰器写法无法识别
- 前缀拼接最多展开 16 种组合，跨文件依赖无法解析时退化为路由自身前缀
- 文件列表只在语言服务器启动时扫描一次，新建的路由文件需要重启语言服务器（或重启 Zed）才会进入索引；已有文件的修改按 mtime 增量更新
- Python 目前只覆盖 FastAPI 与 MCP，Flask、Django 未实现

## 目录结构

```
extension.toml        扩展清单：两个 language server 注册
src/lib.rs            Rust 壳：拼接 python3 -c 命令
lsp/endpoint_lsp.py   解析与 LSP 实现（仅标准库）
extension.wasm        编译产物，随仓库分发
```
