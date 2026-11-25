# Translation LSP

[日本語](README.ja.md)

Translation LSP translates code comments and Markdown in Zed and shows the translation in Hover; the source stays unchanged. It reads comments in more than 40 languages and file formats, including Rust, TypeScript, Python, Go, and shell scripts. The full list is under [Languages](docs/languages.md).

You can translate with ChatGPT using your plan, the Anthropic API, the OpenAI API, or an OpenAI-compatible service such as Ollama. Two translation services, the DeepL API and Google Cloud Translation, also work, as does the translation model PLaMo 3 Translate when you run it yourself. Until you select a provider, the extension sends no text to an external service.

- **Hover:** Hover over a comment to read its translation.

  ![A translated doc comment in Zed's Hover, shown as Markdown with its code example](docs/images/hover.png)

- **Markdown selection:** Select Markdown prose to translate it in the background, then hover over it to read the translation.

- **CodeLens:** With CodeLens on, the first line of the translation shows above the comment; click it to read all of it.

  ![A CodeLens line above a comment with the first line of the translation, and the whole translation in a card](docs/images/codelens.png)

- **Word lookup:** Select a word to ask the model for its meanings and an example.

  ![The meanings and an example of the selected word "argument" in Hover](docs/images/dictionary.png)

## Installation

Install Translation LSP as a development extension: Zed builds the extension from a checkout, and the extension downloads the language server.

1. Install Zed and [Rust through rustup](https://www.rust-lang.org/tools/install). Zed builds development extensions with Rust.
2. Clone this repository and check out the tag of a [published release](https://github.com/hwtnb/zed-translation-lsp/releases).
3. In Zed's Extensions view, choose `Install Dev Extension` and select **`crates/zed-extension`** in the checkout. See [Zed's development extension instructions](https://zed.dev/docs/extensions/developing-extensions).

If your Zed settings list the language servers of a language, add `"translation-lsp"` to that list; see [Language server settings](docs/languages.md#language-server-settings).

When the language server first starts, the extension downloads the server of its own version from that release and keeps it for later starts. A checkout whose version has no release has no server to download. Servers are published for these systems:

| OS | Versions | CPU |
| --- | --- | --- |
| macOS | macOS 12 or later | Apple silicon and Intel |
| Linux | Ubuntu 22.04 or later, Debian 12 or later, and other distributions with glibc 2.35 or later | ARM64 and x86-64 |
| Windows | Windows 10 or later on x86-64, Windows 11 on ARM64 | ARM64 and x86-64 |

The servers are not signed with Authenticode and not notarized by Apple. If your system does not start the downloaded server, or no server is published for it, build the server from source.

### Build the server from source

Install [Rust through rustup](https://www.rust-lang.org/tools/install) (Rust 1.98 or later) and a C/C++ toolchain, which the native dependencies need:

| OS | Build prerequisites | Native executable |
| --- | --- | --- |
| Windows | MSVC Rust toolchain, Visual Studio Build Tools with Desktop development with C++ and a Windows SDK; NASM on x86-64, clang-cl on ARM64. Use a Visual Studio developer PowerShell or command prompt. | `target/release/translation-lsp.exe` |
| macOS | Xcode Command Line Tools (`xcode-select --install`). | `target/release/translation-lsp` |
| Linux | GCC or Clang with C/C++ development tools; on Debian/Ubuntu, install `build-essential` and `ca-certificates`. | `target/release/translation-lsp` |

Tree-sitter and the TLS provider compile native code. See the TLS provider's [Windows](https://aws.github.io/aws-lc-rs/requirements/windows.html) and [Linux](https://aws.github.io/aws-lc-rs/requirements/linux.html) build requirements for other toolchain configurations.

Run the following command from the checkout root. It works in PowerShell, Command Prompt, Bash, and Zsh:

```sh
cargo build -p translation-lsp --release --locked
```

Set `lsp.translation-lsp.binary.path` to the absolute path of the executable you built, as described under [Server path](docs/configuration.md#server-path). The extension then starts that executable and downloads nothing.

## Set up a provider

Without a provider, the language server translates nothing. When it starts, it asks you to choose one, with buttons that open Zed's settings file and this section. Later, `Set up Translation LSP…` in the code actions of a supported document offers the same buttons.

Select a provider by adding an entry like the following to `lsp` in your existing Zed settings, then restart the language server. This example selects ChatGPT; change `name` to select another provider from the table below. `target_language` is the language translations are written in; see [Other common settings](#other-common-settings). Every setting is described under [Configuration](docs/configuration.md).

```json
{
  "lsp": {
    "translation-lsp": {
      "initialization_options": {
        "target_language": "ja",
        "provider": {
          "name": "chatgpt",
          "model": "gpt-6-luna",
          "effort": "low"
        }
      }
    }
  }
}
```

Then connect the provider: in a supported document, run `editor: toggle code actions` from Zed's Command Palette and choose the item in the table. Saving a key opens a terminal window; paste the key there and press Enter.

| Provider | `name` | How to connect | Details |
| --- | --- | --- | --- |
| ChatGPT | `chatgpt` | Choose `ChatGPT account…`, run `Continue with ChatGPT / Choose account`, and complete sign-in and plan permission in the browser. | [ChatGPT](docs/providers/chatgpt.md) |
| Anthropic API | `anthropic_api` | Choose `Anthropic API key…`, then run `Save Anthropic API key`. | [Anthropic API](docs/providers/anthropic.md) |
| OpenAI API | `openai_api` | Choose `OpenAI API key…`, then run `Save OpenAI API key`. | [OpenAI API](docs/providers/openai-api.md) |
| OpenAI-compatible API | `openai_compatible` | For a service that needs a key, choose `OpenAI-compatible API key…`, then run `Save OpenAI-compatible API key`. | [OpenAI-compatible API](docs/providers/openai-compatible.md) |
| DeepL API | `deepl` | Choose `DeepL API key…`, then run `Save DeepL API key`. | [DeepL API](docs/providers/deepl.md) |
| Google Cloud Translation | `google_translate` | Choose `Google Cloud API key…`, then run `Save Google Cloud API key`. | [Google Cloud Translation](docs/providers/google-translate.md) |
| PLaMo Translate | `plamo_translate` | Nothing for a tool that asks for no key, as Ollama by default. Otherwise, as for the OpenAI-compatible API. | [PLaMo Translate](docs/providers/plamo-translate.md) |

The providers differ in a few ways:

- For ChatGPT, the Anthropic API, and the OpenAI API, `model` and `effort` are optional. Each provider's page lists the values it takes, so change or remove them when you change `name`.
- The OpenAI-compatible provider needs `base_url`, the address of the service, and `model`, one of its model names. A service that needs no key, such as [Ollama on your computer](docs/providers/openai-compatible.md#ollama-on-your-computer), works without one.
- PLaMo Translate also needs `base_url` and `model`: the address of the service that runs PLaMo 3 Translate, such as Ollama, and the model's name there.
- The DeepL API and Google Cloud Translation take no fields other than `name`.
- With the DeepL API, Google Cloud Translation, and PLaMo Translate, `target_language` must be a language code, and a selected word is translated instead of looked up.

Each provider's page also describes creating the key and cost.

### Other common settings

These settings sit next to `provider` in `initialization_options`. Each can be omitted. Restart the language server after changing them, as after changing `provider`.

| Setting | Default | What it sets |
| --- | --- | --- |
| `target_language` | `ja` | The language translations are written in: a language code such as `en`, `ja`, or `zh-Hans`, or a language name. The DeepL API, Google Cloud Translation, and PLaMo Translate take language codes only. |
| `source_language` | `auto` | The language of the original text. With `auto`, the model identifies it. |
| `features.comment_hover` | `true` | Whether Hover over a comment starts a translation. |
| `features.automatic_selection` | `true` | Whether a stable Markdown selection starts a translation in the background. |
| `hover.header` | `true` | Whether Hover shows the title `Translation LSP` above a translation. |
| `hover.format` | `markdown` | How Hover shows a translation: `markdown` keeps the formatting the translation writes and shows other characters as written; `text` shows it in a code block. |

`features` can also turn each way of translating on or off for one language. See [Translation languages](docs/configuration.md#translation-languages), [Features](docs/configuration.md#features), and [Hover](docs/configuration.md#hover).

## Basic usage

| Operation | How |
| --- | --- |
| Comment Hover | Hover over a supported code comment, or place the cursor in it and run Zed's `editor: hover`. |
| Markdown selection | With `features.automatic_selection` set to `true`, select Markdown prose and keep the selection stable. Translation starts in the background; Hover over that range to read it. |
| `Translate selection to …` | This Code Action translates the selection immediately, also after a background failure. When it is done, Hover over the selection to read it. |
| Word lookup | Select up to three words or one identifier on one line. Hover shows a dictionary entry that the model writes. The DeepL API, Google Cloud Translation, and PLaMo Translate translate it instead. |
| `… and open in tab` | In Markdown or Plain Text, this Code Action opens the translation of the selection in a separate document, or of the whole document when nothing is selected. |
| CodeLens | With `"code_lens": "on"` in Zed's settings, comments get `Translate \| Settings`, and translated ranges show the first line of the translation; click it to read all of it. |
| Cancel | Place the cursor in a range and choose `Cancel translation of lines …` from Code Actions, or choose `Cancel all translations`. |
| Delete | Use `Delete translation` on a translation's card, the `Settings` menu of a comment's CodeLens, or Code Actions in Markdown and Plain Text. |

A text already translated with the same provider and settings is shown again without being sent, even at another place or in another document. With [`disk_cache`](docs/configuration.md#disk-cache) enabled, these translations also last across restarts.

The rules of these operations are described under [Usage](docs/usage.md), and the cache under [Cache](docs/behavior.md#cache).

## Before you send text

- Merely passing over a comment can consume provider usage once Zed sends a Hover request.
- If a comment contains a credential, the credential is sent with it.
- With `features.automatic_selection` set to `true`, selecting Markdown prose just to copy it can also send it for translation.
- Looking up a word also sends the line it is on.
- With [`disk_cache`](docs/configuration.md#disk-cache) enabled, completed translations are written to files on this computer, without encryption. The text that was sent is not written; a dictionary entry holds its word and example sentence, and a translation holds what was left untranslated, such as code and identifiers.

What each request contains is described under [What is sent](docs/usage.md#what-is-sent). Cost is described on each provider's page.

## Documentation

- [Configuration](docs/configuration.md): every setting, with a full example, including the server path and the disk cache.
- [ChatGPT](docs/providers/chatgpt.md): settings and connecting your account.
- [Anthropic API](docs/providers/anthropic.md): settings and the API key.
- [OpenAI API](docs/providers/openai-api.md): settings and the API key.
- [OpenAI-compatible API](docs/providers/openai-compatible.md): settings, the addresses of some services, and API keys.
- [DeepL API](docs/providers/deepl.md): settings, how the text is sent, and the API key.
- [Google Cloud Translation](docs/providers/google-translate.md): settings and the API key.
- [PLaMo Translate](docs/providers/plamo-translate.md): running the model with Ollama, settings, and what is sent.
- [Usage](docs/usage.md): each way of translating, canceling and deleting translations, and what is sent.
- [Behavior](docs/behavior.md): when translation work starts, waits, and stops, and how translations are cached.
- [Languages](docs/languages.md): supported languages, comments that are not translated, and language server settings.
- [Development](docs/development/README.md): checks, the mock provider and its samples, CI, and the dependency policy.

## License

[MIT](LICENSE). Each release archive of the server contains the licenses of the server's dependencies and where to download their sources.
