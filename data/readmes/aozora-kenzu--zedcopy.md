# ZedCopy

A fast, lightweight, portable Windows utility for high-speed file transfers (`robocopy.exe`) and recursive file/folder deletion, wrapped in a clean **Zed.dev One Dark** frameless desktop interface built with **Tauri v2** and **Rust**.

[![Release](https://img.shields.io/github/v/release/aozora-kenzu/zedcopy?style=flat-square&color=98C379&label=Release)](https://github.com/aozora-kenzu/zedcopy/releases/latest)
[![Downloads](https://img.shields.io/github/downloads/aozora-kenzu/zedcopy/total?style=flat-square&color=61AFEF&logo=github&label=Downloads)](https://github.com/aozora-kenzu/zedcopy/releases)
[![Download Portable EXE](https://img.shields.io/badge/Download-Portable%20.exe-98C379?style=flat-square&logo=windows&logoColor=white)](https://github.com/aozora-kenzu/zedcopy/releases/latest/download/zedcopy.exe)
![Platform](https://img.shields.io/badge/Platform-Windows%2010%2F11-0078D6?style=flat-square&logo=windows&logoColor=white)
![Tauri](https://img.shields.io/badge/Tauri-v2-24C8DB?style=flat-square&logo=tauri&logoColor=white)
![Rust](https://img.shields.io/badge/Rust-2021-DEA584?style=flat-square&logo=rust&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-61AFEF?style=flat-square)

---

## Download

Get the latest portable build from the [GitHub Releases](https://github.com/aozora-kenzu/zedcopy/releases/latest) page:

- **Standalone Portable `.exe`**: [zedcopy.exe](https://github.com/aozora-kenzu/zedcopy/releases/latest/download/zedcopy.exe) — single-file executable, no installation required.
- **Portable `.zip` Archive**: Download `ZedCopy-v0.2.1-windows-x64-portable.zip` from [Latest Release](https://github.com/aozora-kenzu/zedcopy/releases/latest) — includes `zedcopy.exe`, `README.md`, and `LICENSE`.

---

## Features

- **Zed.dev One Dark Frameless UI**: Custom titlebar with drag region, window controls (`Minimize`, `Maximize`, `Close`), and mode tabs separating **Copy (Robocopy)** and **Delete (Fast Remove)**.
- **2-Step Copy Workspace**: Side-by-side **1. Source** and **2. Destination** panes with directional flow indicator, one-click swap (`⇄`), automatic `DIR`/`FILE` detection, and automatic parent-directory resolution when a file is dropped onto Destination.
- **Configurable `/MT` Multi-Threading**: Dedicated options bar with `/MT` presets (`Off`, `4`, `8`, `16`, `32`, `64`, `128`) and a custom numeric input supporting `1`–`128` threads.
- **Robocopy Quick Flags**: Toggle `/Z` (restartable mode), `/E` (copy subdirectories including empty folders), and `/MIR` (mirror mode with warning highlight).
- **Safe Drag & Drop Fast Delete**:
  - Dropping files or folders into **Delete Queue** stages them safely without deleting immediately.
  - Folders are clearly labeled `+ all contents` to indicate recursive permanent removal (bypasses the Recycle Bin).
  - Requires clicking **Apply Delete** and confirming via a summary modal before execution.
  - Clears read-only attributes automatically when removing stubborn files/folders and blocks drive-root deletion (`C:\`, `D:\`, etc.) for safety.
- **Realtime Progress & Live Speed**: Pre-scans source/delete targets to display live percentage (`0%–100%`), item/file counts, transferred bytes, active filename, and realtime `MB/s` throughput.
- **Built-in About & Portable Auto-Updater**: Automatically checks GitHub Releases on startup with a notification banner, includes manual **Check App Update**, and supports **Update & Restart** to self-replace the portable `.exe` and relaunch seamlessly.
- **Native HiDPI Drag & Drop & Silent Execution**: Converts physical cursor coordinates with `devicePixelRatio` for accurate drop-zone targeting on scaled Windows displays and executes `robocopy` without flashing console windows (`CREATE_NO_WINDOW`).
- **Collapsible Output Log Drawer**: Streams live Robocopy and deletion logs with minimize/expand and clear controls.

---

## Robocopy Flags Reference

| Flag | Description | Default |
| :--- | :--- | :--- |
| `/MT[:n]` | Multi-threaded copy with `n` threads (`1`–`128`) or `Off` for single-thread mode | `/MT:16` |
| `/Z` | Copies files in restartable mode (resilient to network interruptions) | Enabled |
| `/E` | Copies subdirectories, including empty ones | Enabled |
| `/MIR` | Mirrors a directory tree (deletes destination files/folders absent from source) | Disabled |

> **Note:** Internally, ZedCopy also passes `/BYTES`, `/NDL`, and `/NJH` to `robocopy` for accurate byte-level realtime progress tracking and clean terminal output.

---

## Tech Stack

- **Desktop Runtime:** [Tauri v2](https://v2.tauri.app/)
- **Backend:** Rust (`tokio`, `serde`, `serde_json`)
- **Frontend:** Vanilla JavaScript (ES Modules), HTML5, CSS3 (Zed.dev One Dark palette)
- **Bundler:** [Vite](https://vitejs.dev/)

---

## Getting Started

### Prerequisites

Ensure the following tools are installed on Windows 10/11:

- **Node.js** (v18 or newer) — <https://nodejs.org/>
- **Rust & Cargo** (via `rustup`) — <https://rustup.rs/>
- **Microsoft C++ Build Tools** (*Desktop development with C++* workload)
- **WebView2 Runtime** (pre-installed on Windows 11 and modern Windows 10)

### Installation & Development

```powershell
npm install
npm run tauri dev
```

### Building the Portable `.exe`

To compile a standalone portable executable (without generating an NSIS installer):

```powershell
.\node_modules\.bin\tauri build --no-bundle
```

To build both the executable and the NSIS installer:

```powershell
npm run tauri build
```

The standalone portable binary is output to:

```text
src-tauri/target/release/zedcopy.exe
```

Copy `zedcopy.exe` anywhere on Windows 10/11 and run it directly — no installation required.

---

## Project Structure

```text
zedcopy/
├── index.html                  # Main frameless layout (Copy & Delete views, About modal, log drawer)
├── package.json                # Frontend scripts and Tauri CLI/API dependencies
├── LICENSE                     # MIT License
├── README.md                   # Project documentation
├── src/
│   ├── main.js                 # UI state, HiDPI drag-and-drop, auto-update, & Tauri IPC listeners
│   └── styles.css              # Zed.dev One Dark theme styles
└── src-tauri/
    ├── Cargo.toml              # Rust dependencies & release size-optimization profile
    ├── tauri.conf.json         # Tauri window & bundling configuration
    └── src/
        ├── lib.rs              # Robocopy runner, realtime progress, fast-delete, & portable updater
        └── main.rs             # Windows application entry point
```

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.
