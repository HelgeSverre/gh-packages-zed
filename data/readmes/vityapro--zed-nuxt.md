# Nuxt Extension for Zed

Full **Nuxt 3/4** support for [Zed](https://zed.dev) editor with auto-imports, path aliases, and Vue SFC support.

## Features

- **Auto-imports** — `useFetch`, `useAsyncData`, `useState`, `ref`, `computed` and more
- **Path aliases** — support for `~/`, `@/`, `#imports`, `#app`
- **Go-to-definition** — navigate to components and composables
- **TypeScript** — full type support
- **Nuxt Detection** — automatic Nuxt 3 vs 4 detection
- **Optimized LSP** — reduced completion noise
- **Snippets** — 15 Nuxt-specific code snippets

## Installation

### Requirements

- [Zed](https://zed.dev) editor
- [Node.js](https://nodejs.org) v18+
- Vue Language Server: `npm install -g @vue/language-server`

### Install Extension

**From Zed Extensions:**
1. Open Zed
2. `Cmd+Shift+P` → "zed: extensions"
3. Search for "Nuxt" and install

**Development Install:**
1. Clone this repository
2. In Zed: `Cmd+Shift+P` → "zed: install dev extension"
3. Select the extension directory

## Setup

### 1. Generate Nuxt Types

```bash
npx nuxi prepare
# or
npm run dev
```

### 2. Recommended Project Configuration

Create `.zed/settings.json` in your project root:

```json
{
  "languages": {
    "Vue": {
      "language_servers": ["vue-language-server"]
    }
  }
}
```

## Snippets

Type the prefix and press `Tab` to expand:

| Prefix | Description |
|--------|-------------|
| `npage` | Nuxt page with `definePageMeta` |
| `nlayout` | Layout component |
| `napi` | Server API route (Nitro) |
| `nmiddleware` | Route middleware |
| `ncomposable` | Composable function |
| `nplugin` | Nuxt plugin |
| `nfetch` | `useFetch` |
| `nasync` | `useAsyncData` |
| `nstate` | `useState` |
| `npagemeta` | `definePageMeta` |
| `nerror` | Error page |
| `nlink` | `<NuxtLink>` |
| `nscript` | Script setup TS |
| `ntemplate` | Full Vue SFC |
| `nnuxtconfig` | `nuxt.config.ts` |

## Troubleshooting

### Auto-imports not working

1. Make sure `.nuxt/` directory exists
2. Run `npx nuxi prepare`
3. Reload Zed (`Cmd+Shift+P` → "zed: reload")

### Path aliases not resolving

1. Check `tsconfig.json` — should extend `.nuxt/tsconfig.json`
2. Generate types: `npx nuxi prepare`

### LSP not starting

1. Install Vue Language Server:
   ```bash
   npm install -g @vue/language-server
   ```
2. Verify it's in PATH:
   ```bash
   which vue-language-server
   ```

## Project Structure Support

### Nuxt 3
```
project/
├── components/
├── composables/
├── pages/
├── server/
├── nuxt.config.ts
└── tsconfig.json
```

### Nuxt 4
```
project/
├── app/
│   ├── components/
│   ├── composables/
│   ├── pages/
│   └── app.vue
├── server/
├── nuxt.config.ts
└── tsconfig.json
```

## Development

### Build

```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Add WASM target
rustup target add wasm32-wasip1

# Build
cargo build --release --target wasm32-wasip1
```

### Test

1. Build the extension
2. In Zed: `Cmd+Shift+P` → "zed: install dev extension"
3. Open a Nuxt project

## License

MIT License

## Acknowledgments

- [Zed](https://zed.dev) — fast code editor
- [Volar](https://github.com/vuejs/language-tools) — Vue language tools
- [Nuxt](https://nuxt.com) — Vue framework
