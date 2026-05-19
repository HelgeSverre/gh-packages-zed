## Summary

I am encountering **systematic false diagnostics from rust-analyzer when used inside Zed**, but **only in a multi-crate Cargo workspace configuration**.

The Zed issue Link : https://github.com/zed-industries/zed/issues/47226#issuecomment-3789188956

The same project:

* compiles and runs correctly with `cargo check` / `cargo run`
* works perfectly in **VS Code** using rust-analyzer
* fails consistently in **Zed**, producing nonsensical diagnostics on basic Rust code

This strongly suggests a **Zed-specific issue in rust-analyzer integration or workspace metadata handling**, rather than a Rust, Cargo, or rust-analyzer core problem.

---

## Reproduction Repository

I created and pushed a minimal reproduction repository to GitHub to make this issue easy to reproduce.

The repository contains:

* a Cargo workspace with multiple members under `apps/`, `crates/`, `libs/`, and `tools/`
* a root `Cargo.toml` defining `[workspace]`, `[workspace.package]`, and `[workspace.dependencies]`
* member crates using `edition.workspace = true`

---

## Scope of the Issue

After additional investigation, the reproduction scope is very clear:

* ✅ **Reproduces** in:

  * multi-crate Cargo workspace
  * crates using `edition.workspace = true`
* ❌ **Does NOT reproduce** in:

  * single-crate projects
  * standalone crates opened outside the workspace
  * the same workspace opened in VS Code

This indicates the issue is **workspace-specific**, not code-specific.

---

## Symptoms

Inside Zed, rust-analyzer reports errors such as:

* `expected 3 arguments, found 4`
* `call to unsafe function is unsafe and requires an unsafe function or block`

These appear on extremely basic code, for example:

```rust
fn main() {
    let x = 42;
    println!("value: {}", x);
    let s = format!("value: {}", x);
    println!("{}", s);
}
```

The diagnostics appear consistently in:

* `crates/*/src/bin/*.rs`
* `apps/*/src/main.rs`

Despite this:

* `cargo check` passes
* `cargo run` works
* binaries execute correctly

This suggests that **macros like `println!` and `format!` (and possibly the std prelude itself) are being misinterpreted** by rust-analyzer *only when run under Zed in workspace mode*.

---

## Key Observations

* Removing **all rust-analyzer-related settings** from `settings.json` and restarting Zed does **not** resolve the issue.
* The problem disappears immediately if:

  * the crate is opened outside the workspace, or
  * `edition = "2021"` is explicitly set in the crate `Cargo.toml` instead of `edition.workspace = true`.
* Zed appears to:

  * first attempt to use `~/.cargo/bin/rust-analyzer`
  * then fall back to its bundled rust-analyzer
* The same rust-analyzer version, same toolchain, and same `Cargo.lock` behave correctly in VS Code.

This strongly suggests a **problem in how Zed propagates or resolves workspace-level metadata**, particularly `[workspace.package]` (edition), when initializing rust-analyzer.

---

## Logs (Highlights)

From the Zed logs:

* rust-analyzer is started correctly in workspace mode
* Cargo runnables are detected for each package
* yet diagnostics clearly do not match Rust semantics

From the rust-analyzer logs:

* diagnostics are repeatedly requested and returned
* errors are consistent and deterministic
* the errors resemble **macro signature misinterpretation**, not real compiler output

This mismatch is a strong indicator that **Zed is feeding rust-analyzer an incorrect project model or workspace configuration**, rather than rust-analyzer malfunctioning on its own.

---

## Environment Notes

* macOS (Apple Silicon)
* Issue reproducible across restarts
* Folder paths are masked for privacy, but structure is standard and should not matter
* No custom build scripts or proc macros involved

---

## Why This Appears Zed-Specific

* Same workspace
* Same Cargo.toml
* Same toolchain
* Same rust-analyzer version
* Same lockfile

➡ Works perfectly in **VS Code**
➡ Fails consistently in **Zed**

That eliminates:

* Rust compiler bugs
* rust-analyzer core bugs
* Cargo workspace configuration errors

The remaining variable is **Zed’s rust-analyzer integration and workspace handling**.

---

## Hypothesis

The issue is likely caused by one (or a combination) of the following:

* Incorrect propagation of `workspace.package.edition`
* Partial or incorrect workspace metadata sent to rust-analyzer
* Zed opening subprojects with a mismatched workspace root
* A race or conflict between user-installed and bundled rust-analyzer binaries

At minimum, `edition.workspace = true` appears to be mishandled in multi-crate workspaces.

---

## Notes

If needed, I can further reduce the reproduction repository, but at this point the behavior is already tightly scoped and deterministic.

The issue makes Zed effectively unusable for non-trivial Rust workspaces, which is unfortunate because everything else about the editor is excellent.


---

## Error Issue Notes


### I created and pushed a minimal reproduction repository to GitHub to make this issue easier to reproduce

I did some additional investigation and wanted to share a more precise reproduction scope.

This issue only occurs in a **multi-crate Cargo workspace** setup.
In a single-crate project, or when opening a minimal standalone crate, the problem does **not** reproduce.

In my workspace, I have multiple members (apps/, crates/, libs/, tools/) with a root `Cargo.toml` defining `[workspace]`, `[workspace.package]`, and `[workspace.dependencies]`. Individual crates (for example `crates/katas`) rely on `edition.workspace = true`.

In this setup, rust-analyzer reports errors such as:

* `expected 3 arguments, found 4`
* `call to unsafe function is unsafe and requires an unsafe function or block`

on very basic code like:

```rust
fn main() {
    let x = 42;
    println!("value: {}", x);
    let s = format!("value: {}", x);
    println!("{}", s);
}
```

These diagnostics appear consistently in workspace members (e.g. `crates/katas/src/bin/*.rs` or `apps/worker/src/main.rs`), even though the code compiles fine with `cargo check` / `cargo run`.

From the logs, rust-analyzer is started correctly in workspace mode and cargo runnables are detected for each package, but the diagnostics suggest that `std` prelude / built-in macros like `println!` and `format!` are being misinterpreted only in the multi-workspace context.

Notably:

* The issue disappears if the crate is tested outside of the workspace.
* The issue also disappears if `edition = "2021"` is explicitly set in the crate’s `Cargo.toml` instead of using `edition.workspace = true`.

This makes me suspect an interaction between rust-analyzer and workspace-level metadata propagation (especially `workspace.package.edition`) in multi-crate workspaces, rather than a code-level or OS-specific problem.

Let me know if you’d like me to reduce this further into a minimal repro repository, but at this point the behavior seems tightly correlated with multi-workspace layouts.


 **I tried removing all rust-analyzer-related settings from settings.json and completely re-running, but the result still shows an error.
I don't think it has much to do with settings.json. Because there is no problem in single workspace single project. Zed is currently working very unstable. And is it right that zed is looking for "~/.cargo/bin/rust-analyzer"? Anyway, is there no one in the zed team who can reproduce and test this on Mac? **

### 🚨 Important: Not reproducible in VS Code

**There is NO issue when opening and testing the exact same project in VS Code.**  
The problem only occurs in **Zed**.

- Same workspace
- Same toolchain
- Same rust-analyzer version
- Same Cargo.lock

This strongly suggests that the issue is **Zed-specific** (likely in the rust-analyzer integration or workspace handling), rather than a rust-analyzer or Rust toolchain problem.



**Zed Log**
```log
npm: "/opt/homebrew/bin/npm", global_node_modules: "/opt/homebrew/lib/node_modules\n", scratch_dir: "~/Library/Application Support/Zed/node" }
2026-01-23T17:25:21+09:00 INFO  [language] found user-installed language server for rust-analyzer. path: "~/.cargo/bin/rust-analyzer", arguments: []
2026-01-23T17:25:21+09:00 INFO  [lsp] starting language server process. binary path: "~/.cargo/bin/rust-analyzer", working directory: "/dev/workspace/Projects/Rust/myworks/zed-error-reproduce", args: []
2026-01-23T17:25:22+09:00 ERROR [project::context_server_store] Failed to create context server configuration from settings: from extension "Postgres Context Server" version 0.0.5: missing field `database_url`
2026-01-23T17:25:22+09:00 ERROR [project::context_server_store] Failed to create context server configuration from settings: from extension "Postgres Context Server" version 0.0.5: missing field `database_url`
2026-01-23T17:25:23+09:00 INFO  [lsp] starting language server process. binary path: "~/Library/Application Support/Zed/languages/rust-analyzer/rust-analyzer-2026-01-19", working directory: "/dev/workspace/Projects/Rust/myworks/error-reproduce", args: []
2026-01-23T17:28:16+09:00 ERROR [language] missing required capture(s) in TOML indents TreeSitter query: indent
2026-01-23T17:28:16+09:00 WARN  [language] unrecognized capture name 'comment' in TOML textobjects TreeSitter query
```


**Rust Analyzer Log**
```json
// Send:
{"jsonrpc":"2.0","method":"workspace/didChangeConfiguration","params":{"settings":{}}}

// Receive:
{"jsonrpc":"2.0","id":25,"method":"workspace/configuration","params":{"items":[{"section":"rust-analyzer"}]}}

// Send:
{"jsonrpc":"2.0","method":"workspace/didChangeConfiguration","params":{"settings":{}}}

// Receive:
{"jsonrpc":"2.0","id":26,"method":"workspace/configuration","params":{"items":[{"section":"rust-analyzer"}]}}

// Send:
{"jsonrpc":"2.0","id":25,"result":[null]}

// Send:
{"jsonrpc":"2.0","id":26,"result":[null]}

// Send:
{"jsonrpc":"2.0","id":21,"method":"textDocument/diagnostic","params":{"textDocument":{"uri":"file:///dev/workspace/Projects/Rust/myworks/zed-error-reproduce/crates/katas/src/bin/async_03.rs"},"identifier":"rust-analyzer","previousResultId":"rust-analyzer"}}

// Send:
{"jsonrpc":"2.0","id":22,"method":"textDocument/diagnostic","params":{"textDocument":{"uri":"file:///dev/workspace/Projects/Rust/myworks/zed-error-reproduce/apps/worker/src/main.rs"},"identifier":"rust-analyzer","previousResultId":"rust-analyzer"}}

// Receive:
{"jsonrpc":"2.0","id":21,"result":{"kind":"full","resultId":"rust-analyzer","items":[{"range":{"start":{"line":7,"character":26},"end":{"line":7,"character":67}},"severity":1,"code":"E0107","codeDescription":{"href":"https://doc.rust-lang.org/stable/error_codes/E0107.html"},"source":"rust-analyzer","message":"expected 3 arguments, found 4"},{"range":{"start":{"line":7,"character":26},"end":{"line":7,"character":67}},"severity":1,"code":"E0133","codeDescription":{"href":"https://doc.rust-lang.org/stable/error_codes/E0133.html"},"source":"rust-analyzer","message":"call to unsafe function is unsafe and requires an unsafe function or block"},{"range":{"start":{"line":28,"character":17},"end":{"line":28,"character":47}},"severity":1,"code":"E0107","codeDescription":{"href":"https://doc.rust-lang.org/stable/error_codes/E0107.html"},"source":"rust-analyzer","message":"expected 3 arguments, found 4"},{"range":{"start":{"line":32,"character":13},"end":{"line":32,"character":48}},"severity":1,"code":"E0107","codeDescription":{"href":"https://doc.rust-lang.org/stable/error_codes/E0107.html"},"source":"rust-analyzer","message":"expected 3 arguments, found 4"},{"range":{"start":{"line":28,"character":17},"end":{"line":28,"character":47}},"severity":1,"code":"E0133","codeDescription":{"href":"https://doc.rust-lang.org/stable/error_codes/E0133.html"},"source":"rust-analyzer","message":"call to unsafe function is unsafe and requires an unsafe function or block"},{"range":{"start":{"line":32,"character":13},"end":{"line":32,"character":48}},"severity":1,"code":"E0133","codeDescription":{"href":"https://doc.rust-lang.org/stable/error_codes/E0133.html"},"source":"rust-analyzer","message":"call to unsafe function is unsafe and requires an unsafe function or block"}]}}

// Receive:
{"jsonrpc":"2.0","id":22,"result":{"kind":"full","resultId":"rust-analyzer","items":[{"range":{"start":{"line":1,"character":13},"end":{"line":1,"character":28}},"severity":1,"code":"E0107","codeDescription":{"href":"https://doc.rust-lang.org/stable/error_codes/E0107.html"},"source":"rust-analyzer","message":"expected 3 arguments, found 4"},{"range":{"start":{"line":1,"character":13},"end":{"line":1,"character":28}},"severity":1,"code":"E0133","codeDescription":{"href":"https://doc.rust-lang.org/stable/error_codes/E0133.html"},"source":"rust-analyzer","message":"call to unsafe function is unsafe and requires an unsafe function or block"}]}}

// Send:
{"jsonrpc":"2.0","id":23,"method":"experimental/runnables","params":{"textDocument":{"uri":"file:///dev/workspace/Projects/Rust/myworks/zed-error-reproduce/apps/worker/src/main.rs"},"position":null}}

// Send:
{"jsonrpc":"2.0","id":24,"method":"experimental/runnables","params":{"textDocument":{"uri":"file:///dev/workspace/Projects/Rust/myworks/zed-error-reproduce/crates/katas/src/bin/async_03.rs"},"position":null}}

// Receive:
{"jsonrpc":"2.0","id":23,"result":[{"label":"run worker","location":{"targetUri":"file:///dev/workspace/Projects/Rust/myworks/zed-error-reproduce/apps/worker/src/main.rs","targetRange":{"start":{"line":0,"character":0},"end":{"line":2,"character":1}},"targetSelectionRange":{"start":{"line":0,"character":3},"end":{"line":0,"character":7}}},"kind":"cargo","args":{"environment":{"RUSTC_TOOLCHAIN":"~/.rustup/toolchains/nightly-aarch64-apple-darwin"},"cwd":"/dev/workspace/Projects/Rust/myworks/zed-error-reproduce","overrideCargo":null,"workspaceRoot":"/dev/workspace/Projects/Rust/myworks/zed-error-reproduce","cargoArgs":["run","--package","worker","--bin","worker"],"executableArgs":[]}},{"label":"cargo check -p worker --all-targets","kind":"cargo","args":{"environment":{"RUSTC_TOOLCHAIN":"~/.rustup/toolchains/nightly-aarch64-apple-darwin"},"cwd":"/dev/workspace/Projects/Rust/myworks/zed-error-reproduce","overrideCargo":null,"workspaceRoot":"/dev/workspace/Projects/Rust/myworks/zed-error-reproduce","cargoArgs":["check","--package","worker","--all-targets"],"executableArgs":[]}},{"label":"cargo run -p worker","kind":"cargo","args":{"environment":{"RUSTC_TOOLCHAIN":"~/.rustup/toolchains/nightly-aarch64-apple-darwin"},"cwd":"/dev/workspace/Projects/Rust/myworks/zed-error-reproduce","overrideCargo":null,"workspaceRoot":"/dev/workspace/Projects/Rust/myworks/zed-error-reproduce","cargoArgs":["run","--package","worker"],"executableArgs":[]}},{"label":"cargo test -p worker --all-targets","kind":"cargo","args":{"environment":{"RUSTC_TOOLCHAIN":"~/.rustup/toolchains/nightly-aarch64-apple-darwin"},"cwd":"/dev/workspace/Projects/Rust/myworks/zed-error-reproduce","overrideCargo":null,"workspaceRoot":"/dev/workspace/Projects/Rust/myworks/zed-error-reproduce","cargoArgs":["test","--package","worker","--all-targets"],"executableArgs":[]}}]}

// Receive:
{"jsonrpc":"2.0","id":24,"result":[{"label":"run async_03","location":{"targetUri":"file:///dev/workspace/Projects/Rust/myworks/zed-error-reproduce/crates/katas/src/bin/async_03.rs","targetRange":{"start":{"line":16,"character":0},"end":{"line":33,"character":1}},"targetSelectionRange":{"start":{"line":17,"character":9},"end":{"line":17,"character":13}}},"kind":"cargo","args":{"environment":{"RUSTC_TOOLCHAIN":"~/.rustup/toolchains/nightly-aarch64-apple-darwin"},"cwd":"/dev/workspace/Projects/Rust/myworks/zed-error-reproduce","overrideCargo":null,"workspaceRoot":"/dev/workspace/Projects/Rust/myworks/zed-error-reproduce","cargoArgs":["run","--package","katas","--bin","async_03"],"executableArgs":[]}},{"label":"cargo check -p katas --all-targets","kind":"cargo","args":{"environment":{"RUSTC_TOOLCHAIN":"~/.rustup/toolchains/nightly-aarch64-apple-darwin"},"cwd":"/dev/workspace/Projects/Rust/myworks/zed-error-reproduce","overrideCargo":null,"workspaceRoot":"/dev/workspace/Projects/Rust/myworks/zed-error-reproduce","cargoArgs":["check","--package","katas","--all-targets"],"executableArgs":[]}},{"label":"cargo run -p katas","kind":"cargo","args":{"environment":{"RUSTC_TOOLCHAIN":"~/.rustup/toolchains/nightly-aarch64-apple-darwin"},"cwd":"/dev/workspace/Projects/Rust/myworks/zed-error-reproduce","overrideCargo":null,"workspaceRoot":"/dev/workspace/Projects/Rust/myworks/zed-error-reproduce","cargoArgs":["run","--package","katas"],"executableArgs":[]}},{"label":"cargo test -p katas --all-targets","kind":"cargo","args":{"environment":{"RUSTC_TOOLCHAIN":"~/.rustup/toolchains/nightly-aarch64-apple-darwin"},"cwd":"/dev/workspace/Projects/Rust/myworks/zed-error-reproduce","overrideCargo":null,"workspaceRoot":"/dev/workspace/Projects/Rust/myworks/zed-error-reproduce","cargoArgs":["test","--package","katas","--all-targets"],"executableArgs":[]}}]}

// Send:
{"jsonrpc":"2.0","id":25,"method":"textDocument/documentHighlight","params":{"textDocument":{"uri":"file:///dev/workspace/Projects/Rust/myworks/zed-error-reproduce/crates/katas/src/bin/async_03.rs"},"position":{"line":34,"character":0}}}

// Send:
{"jsonrpc":"2.0","id":26,"method":"textDocument/documentHighlight","params":{"textDocument":{"uri":"file:///dev/workspace/Projects/Rust/myworks/zed-error-reproduce/apps/worker/src/main.rs"},"position":{"line":1,"character":0}}}

// Receive:
{"jsonrpc":"2.0","id":26,"result":null}

// Receive:
{"jsonrpc":"2.0","id":25,"result":null}

// Send:
{"jsonrpc":"2.0","id":27,"method":"textDocument/diagnostic","params":{"textDocument":{"uri":"file:///dev/workspace/Projects/Rust/myworks/zed-error-reproduce/apps/worker/src/main.rs"},"identifier":"rust-analyzer","previousResultId":"rust-analyzer"}}

// Send:
{"jsonrpc":"2.0","id":28,"method":"textDocument/diagnostic","params":{"textDocument":{"uri":"file:///dev/workspace/Projects/Rust/myworks/zed-error-reproduce/crates/katas/src/bin/async_03.rs"},"identifier":"rust-analyzer","previousResultId":"rust-analyzer"}}

// Receive:
{"jsonrpc":"2.0","id":27,"result":{"kind":"full","resultId":"rust-analyzer","items":[{"range":{"start":{"line":1,"character":13},"end":{"line":1,"character":28}},"severity":1,"code":"E0107","codeDescription":{"href":"https://doc.rust-lang.org/stable/error_codes/E0107.html"},"source":"rust-analyzer","message":"expected 3 arguments, found 4"},{"range":{"start":{"line":1,"character":13},"end":{"line":1,"character":28}},"severity":1,"code":"E0133","codeDescription":{"href":"https://doc.rust-lang.org/stable/error_codes/E0133.html"},"source":"rust-analyzer","message":"call to unsafe function is unsafe and requires an unsafe function or block"}]}}

// Receive:
{"jsonrpc":"2.0","id":28,"result":{"kind":"full","resultId":"rust-analyzer","items":[{"range":{"start":{"line":7,"character":26},"end":{"line":7,"character":67}},"severity":1,"code":"E0107","codeDescription":{"href":"https://doc.rust-lang.org/stable/error_codes/E0107.html"},"source":"rust-analyzer","message":"expected 3 arguments, found 4"},{"range":{"start":{"line":7,"character":26},"end":{"line":7,"character":67}},"severity":1,"code":"E0133","codeDescription":{"href":"https://doc.rust-lang.org/stable/error_codes/E0133.html"},"source":"rust-analyzer","message":"call to unsafe function is unsafe and requires an unsafe function or block"},{"range":{"start":{"line":28,"character":17},"end":{"line":28,"character":47}},"severity":1,"code":"E0107","codeDescription":{"href":"https://doc.rust-lang.org/stable/error_codes/E0107.html"},"source":"rust-analyzer","message":"expected 3 arguments, found 4"},{"range":{"start":{"line":32,"character":13},"end":{"line":32,"character":48}},"severity":1,"code":"E0107","codeDescription":{"href":"https://doc.rust-lang.org/stable/error_codes/E0107.html"},"source":"rust-analyzer","message":"expected 3 arguments, found 4"},{"range":{"start":{"line":28,"character":17},"end":{"line":28,"character":47}},"severity":1,"code":"E0133","codeDescription":{"href":"https://doc.rust-lang.org/stable/error_codes/E0133.html"},"source":"rust-analyzer","message":"call to unsafe function is unsafe and requires an unsafe function or block"},{"range":{"start":{"line":32,"character":13},"end":{"line":32,"character":48}},"severity":1,"code":"E0133","codeDescription":{"href":"https://doc.rust-lang.org/stable/error_codes/E0133.html"},"source":"rust-analyzer","message":"call to unsafe function is unsafe and requires an unsafe function or block"}]}}

// Send:
{"jsonrpc":"2.0","id":29,"method":"textDocument/codeAction","params":{"textDocument":{"uri":"file:///dev/workspace/Projects/Rust/myworks/zed-error-reproduce/apps/worker/src/main.rs"},"range":{"start":{"line":1,"character":0},"end":{"line":1,"character":0}},"context":{"diagnostics":[],"only":["","quickfix","refactor","refactor.extract","refactor.inline","refactor.rewrite"]}}}

// Send:
{"jsonrpc":"2.0","id":30,"method":"textDocument/codeAction","params":{"textDocument":{"uri":"file:///dev/workspace/Projects/Rust/myworks/zed-error-reproduce/crates/katas/src/bin/async_03.rs"},"range":{"start":{"line":34,"character":0},"end":{"line":34,"character":0}},"context":{"diagnostics":[],"only":["","quickfix","refactor","refactor.extract","refactor.inline","refactor.rewrite"]}}}

// Receive:
{"jsonrpc":"2.0","id":30,"result":[]}

// Receive:
{"jsonrpc":"2.0","id":29,"result":[]}
```


```
├── apps
│   ├── api
│   │   ├── Cargo.toml
│   │   └── src
│   │       └── main.rs
│   └── worker
│       ├── Cargo.toml
│       └── src
│           └── main.rs
├── Cargo.lock
├── Cargo.toml
├── crates
│   ├── hack
│   │   ├── Cargo.toml
│   │   └── src
│   │       ├── bin
│   │       └── main.rs
│   ├── katas
│   │   ├── Cargo.toml
│   │   └── src
│   │       ├── bin
│   │       └── lib.rs
│   └── scratch
│       ├── Cargo.toml
│       └── src
│           └── main.rs
├── debug.entitlements
├── deny.toml
├── docs
├── libs
│   └── domain
│       ├── Cargo.toml
│       └── src
│           └── lib.rs
├── rust-toolchain.toml
└── tools
    └── xtask
        ├── Cargo.toml
        └── src
            └── main.rs

26 directories, 13 files
```
`Cargo.toml`
```toml
[workspace]
resolver = "2"
members = [
  "crates/katas",
  "crates/scratch",
  "crates/hack",
  "apps/api",
  "apps/worker",
  "libs/domain",
  "tools/xtask",
]

[workspace.package]
edition = "2021"

[workspace.dependencies]
anyhow = "1"
thiserror = "2"
serde = { version = "1", features = ["derive"] }
serde_json = "1"
tracing = "0.1"
tracing-subscriber = { version = "0.3", features = ["env-filter"] }
tokio = { version = "1", features = ["rt-multi-thread", "macros", "time", "signal", "net", "io-util"] }

[profile.release]
lto = "thin"
codegen-units = 1
```

`crates/katas/src/bin/test_01.rs`
```rust
fn main() {
    let x = 42;
    println!("value: {}", x);
    let s = format!("value: {}", x);
    println!("{}", s);
}
```

`crates/katas/Cargo.toml`
```toml title="crates/katas/Cargo.toml"
[package]
name = "katas"
version = "0.1.0"
edition.workspace = true

[dependencies]
tokio = { workspace = true }
anyhow = { workspace = true }
thiserror = { workspace = true }
```

The folder path may look a bit strange, but it's masked for privacy reasons. Don't worry too much about it. It's not important.
