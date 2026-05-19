# Hacker News Reader for Zed

A Zed extension that brings Hacker News directly into your editor. Read the latest stories without leaving your coding environment.

## Features

- Fetch top, new, Ask HN, Show HN, and job stories
- Beautiful markdown-formatted output with:
  - Story titles with direct links
  - Score and comment counts
  - Author information
  - Full text content for Ask HN posts
  - Direct links to discuss on Hacker News

## Usage

Use the `/hn` slash command in the Zed Assistant panel:

```
/hn top    - Show top stories (default)
/hn new    - Show newest stories
/hn ask    - Show Ask HN stories
/hn show   - Show Show HN stories
/hn job    - Show job postings
```

### Example

1. Open the Assistant panel in Zed (`Cmd-Shift-A` on macOS, `Ctrl-Shift-A` on Linux)
2. Type `/hn top` and press Enter
3. Browse the latest top stories from Hacker News

## Installation

### From Source

1. Clone this repository:
   ```bash
   git clone https://github.com/roberto/hn-reader.git
   cd hn-reader
   ```

2. Build the extension:
   ```bash
   cargo build --release
   ```

3. The compiled extension will be at:
   ```
   target/wasm32-wasip1/release/hn_reader.wasm
   ```

4. Link the extension in Zed by adding it to your Zed extensions directory.

## Development

### Requirements

- Rust toolchain with `wasm32-wasip1` target
- Zed editor

### Building

```bash
cargo build --release
```

### Project Structure

- `src/lib.rs` - Main extension code
- `extension.toml` - Extension manifest
- `Cargo.toml` - Rust dependencies

## License

MIT

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.
