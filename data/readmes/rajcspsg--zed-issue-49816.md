# Zed Issue #49816 Reproduction

This project reproduces the bug described in [Zed Issue #49816](https://github.com/zed-industries/zed/issues/49816).

## Issue Description

Rust debugger: Some structured variables cannot be expanded in the Variables panel. When debugging Rust code with LLDB, structured variables appear in the Variables panel but clicking the expand arrow does nothing - no child fields or nested values are displayed.

## Project Structure

```
zed-issue-49816/
├── Cargo.toml           # Project manifest with Tokio dependency
├── src/
│   └── main.rs         # Example code with nested structured variables
├── .zed/
│   └── tasks.json      # Build tasks configuration
└── README.md           # This file
```

## Setup

1. Ensure you have Rust installed:
   ```bash
   rustc --version
   ```

2. Install LLDB (if not already installed):
   - macOS: Should be included with Xcode Command Line Tools
   - Linux: `sudo apt install lldb` (Ubuntu/Debian) or `sudo dnf install lldb` (Fedora)

3. Build the project:
   ```bash
   cd zed-issue-49816
   cargo build
   ```

## Steps to Reproduce

1. Open this project in Zed editor

2. Open `src/main.rs`

3. Set breakpoints at the suggested locations:
   - Line 37: Inside `process_request` function (to inspect `context` parameter)
   - Line 90: Inside `main` function (to inspect `context` variable before it's moved)

4. Start debugging:
   - Open Command Palette: `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Linux/Windows)
   - Search for "Debug: Start" or use the debug panel
   - Select LLDB as the debugger

5. When the breakpoint hits, open the Variables panel

6. Try to expand these structured variables:
   - `context` - Should show `user`, `metadata`, and `settings` fields
   - `context.user` - Should show `id`, `name`, `email`, `age`, and `address` fields
   - `context.user.address` - Should show nested address fields
   - `context.metadata` - Should show HashMap entries
   - `context.settings` - Should show settings fields

## Expected Behavior

All structured variables should be expandable in the Variables panel:
- Click the expand arrow next to a structured variable
- The variable expands to show its internal fields and nested values
- Nested structures can be further expanded
- This should work similar to other debuggers (e.g., IntelliJ RustRover with LLDB)

## Actual Behavior (Bug)

- Structured variables appear in the Variables panel
- The expand arrow is visible
- Clicking the expand arrow does nothing
- No child fields or nested values are displayed
- No error message is shown

## Test Variables

This project includes several types of structured variables to test:

1. **Custom Structs**:
   - `User` - struct with primitive and nested struct fields
   - `Address` - nested struct with String fields
   - `RequestContext` - struct combining multiple complex types

2. **Standard Library Types**:
   - `HashMap<String, String>` - collection type
   - `Duration` - std library type

3. **Nested Structures**:
   - `context.user.address` - multiple levels of nesting

## Workaround

Currently, you may need to:
- Use print statements or `dbg!()` macro to inspect values
- Use LLDB command line directly
- Use a different IDE/debugger (e.g., VS Code with CodeLLDB, RustRover)

## Environment

Original report:
- Zed: v0.224.11 / v0.225.6
- OS: macOS (Apple Silicon)
- Architecture: aarch64
- Rust: 1.93.1

Test on your environment to confirm the issue persists.

## Additional Notes

- The project uses Tokio to match the original issue report
- Debug symbols are enabled in `Cargo.toml` with `[profile.dev]`
- The code is intentionally simple to focus on the debugger variable expansion issue
# zed-issue-49816
