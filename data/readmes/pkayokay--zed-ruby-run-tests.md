# Ruby Run Tests — Zed Extension

Toggle between Ruby source/test files and run RSpec or Minitest, mirroring the VSCode [ruby-run-tests](https://github.com/mtayllan/vscode-ruby-run-tests) extension.

Auto-detects `spec/` (RSpec) or `test/` (Minitest/Rails) and runs the appropriate runner.

## Setup

### 1. Add tasks to `~/.config/zed/tasks.json`

Merge the contents of [`config/tasks.json`](config/tasks.json) into your global tasks file. This gives you three named tasks:

- **Ruby: Run Test File** — runs the test file for the current buffer
- **Ruby: Run Test at Line** — runs the single test at the cursor line
- **Ruby: Toggle Test / Source** — opens the paired source or test file

### 2. Add keybindings (optional)

Merge the contents of [`config/keymap.json`](config/keymap.json) into `~/.config/zed/keymap.json` to get VSCode-equivalent shortcuts:

| Key | Action |
|-----|--------|
| `alt-d` | Toggle source ↔ test |
| `alt-f` | Run test file |
| `alt-v` | Run test at line |

Or bind them to whatever keys you prefer using the task names above.

### 3. Install the dev extension (optional)

In Zed: **Extensions → Install Dev Extension** → select this directory.

This adds `/ruby-toggle`, `/ruby-run`, and `/ruby-run-line` slash commands to the AI assistant panel.

## File conventions

Follows Rails conventions:

| Source | Test |
|--------|------|
| `app/models/user.rb` | `spec/models/user_spec.rb` |
| `app/controllers/users_controller.rb` | `spec/controllers/users_controller_spec.rb` |
| `lib/utils.rb` | `spec/lib/utils_spec.rb` |
| `app/models/user.rb` | `test/models/user_test.rb` |

## Notes

- Toggle opens the paired file via the `zed` CLI — ensure it's on your `$PATH` (`zed --version` to check)
- No external scripts required; all logic is inlined into the task commands
- Zed's extension WASM API does not support registering keybinding-triggered actions, so Tasks + keymap is the native Zed equivalent
