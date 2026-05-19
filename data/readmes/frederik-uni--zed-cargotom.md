# zed-cargotom
## language server
https://github.com/frederik-uni/cargotom
## Config
Sample config:
```js
"lsp": {
  "cargo-tom": {
    "initialization_options": {
      /// Search
      "per_page": 25,
      /// What features should be displayed on hover
      /// All, UnusedOpt, Features,
      "feature_display_mode": "UnusedOpt",
      "hide_docs_info_message": false,
      /// Sort toml on format
      "sort_format": false,
      /// Use stable versions in completions
      "stable_version": true,
      /// Offline mode uses https://github.com/frederik-uni/crates.io-dump-minfied for search
      /// The order is non existent feel free to contribute
      "offline": false,
    }
  },
  // ...
}
```
See language server repo for up-to-date configuration options.

## Features
### Code actions
- "Make Workspace dependency" => This will generate `{ workspace = true }` for the dependency
- "Expand dependency specification" => This will convert from `"0.1.0"` to `{ version = "0.1.0" }`
- "Collapse dependency specification" => This will convert from `{ version = "0.1.0" }` to `"0.1.0`
- "Open Docs" => opens docs.rs/...
- "Open crates.io" => opens crates.io/...
- "Upgrade" => will upgrade the dependency version to the latest version
- "Upgrade All " => will upgrade every dependency version to the latest version
- "Update All" => will run `cargo run`

### Code completion
#### Dependencies
- crate names(online/offline)
- crate versions(online/offline)
- crate features(online/offline)
- feature key when version after the key `crate = "0.1.0"` => `crate = {ve"0.1.0"` to `crate = { version = "0.1.0" }`

### Diagnostics
- check if crate needs update
- check if crate version exists
- check if crate features exist
