# Nuxt

Nuxt companion support for Zed. This extension detects Nuxt projects, starts
Volar-compatible Vue tooling for Vue single-file components, and logs a clear
setup message when Nuxt's generated `.nuxt` type files are missing.

This is a companion for Nuxt workspaces, not a replacement for Zed's official
Vue extension.

## Requirements

- Install Rust through rustup before installing this as a Zed dev extension.
- Install Zed's official Vue extension for `.vue` syntax highlighting,
  Tree-sitter parsing, embedded template/script/style highlighting, and base
  Vue language configuration.
- Run `nuxt prepare` or `nuxt dev` in your Nuxt project when `.nuxt` generated
  types are missing.

## Behavior

- A worktree is treated as Nuxt when it has `nuxt.config.*` or a `package.json`
  dependency/devDependency named `nuxt`.
- The extension does not run `nuxt prepare` automatically.
- Settings are read from `lsp.nuxt.initialization_options` and
  `lsp.nuxt.settings`.
- The extension prefers a `vue-language-server` executable available on the
  worktree path. Otherwise, it installs and runs `@vue/language-server`.
- TypeScript is resolved from the project when it is listed in `package.json`;
  otherwise, an extension-managed TypeScript package is installed.

## Configuration

```json
{
  "lsp": {
    "nuxt": {
      "initialization_options": {
        "typescript": {
          "tsdk": ".yarn/sdks/typescript/lib"
        }
      },
      "settings": {
        "vue.inlayHints.inlineHandlerLeading": true,
        "vue.inlayHints.missingProps": true,
        "vue.inlayHints.optionsWrapper": true,
        "vue.inlayHints.vBindShorthand": true
      }
    }
  }
}
```

If you see duplicate Vue diagnostics because both this extension and the
official Vue extension are running a language server, choose the language
server order for Vue files in your Zed settings:

```json
{
  "languages": {
    "Vue.js": {
      "language_servers": ["nuxt", "!vue-language-server", "..."]
    }
  }
}
```

For non-Nuxt Vue projects, prefer the official Vue language server:

```json
{
  "languages": {
    "Vue.js": {
      "language_servers": ["vue-language-server", "!nuxt", "..."]
    }
  }
}
```

## Local Development

Clone this repository, then from Zed run `zed: install dev extension` and
select the cloned repository directory.

## Before Opening An Issue

- Run `npx nuxt prepare` or `npx nuxt dev` in the Nuxt project.
- Confirm the official Vue extension is installed for base `.vue` language
  support.
- Check whether duplicate diagnostics disappear after configuring
  `languages.Vue.js.language_servers`.
- Include the Nuxt version, Zed version, and relevant `lsp.nuxt` settings in
  bug reports.

## Troubleshooting

If Zed shows this error:

```text
Failed to install dev extension: failed to compile Rust extension
```

open the Zed log and check for:

```text
failed to run rustc: No such file or directory
```

That means Rust is not installed or Zed cannot see it on `PATH`. Install Rust
with rustup, restart Zed, and install the dev extension again.

If `rustc --version` works in Terminal but Zed still cannot compile, make Rust
visible to macOS GUI apps:

```sh
launchctl setenv PATH "$HOME/.cargo/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
```

Then fully quit and reopen Zed before trying `zed: install dev extension`
again.
