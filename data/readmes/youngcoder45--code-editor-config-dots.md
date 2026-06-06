# Dotfiles Setup Guide

This repository contains configuration files for a consistent development environment across machines. It currently includes setup for Zed and VS Code.

## Overview

The goal of this setup is to replicate the same editor behavior, UI, and workflow on any new system with minimal effort. This repository does not include system-level dependencies or extensions, so those must be installed separately.

---

## Contents

```
dotfiles/
  zed/
    settings.json
  vscode/
    settings.json
  README.md
```

---

## Requirements

Before applying these configurations, ensure the following are installed:

* Zed editor
* Visual Studio Code
* Node.js and npm
* Required fonts (e.g., Fira Code)

---

## Setup Instructions

### 1. Clone the Repository

```
git clone <your-repo-url>
cd dotfiles
```

---

### 2. Zed Setup

Copy the Zed configuration file to your system:

Linux:

```
~/.config/zed/settings.json
```

MacOS:

```
~/Library/Application Support/Zed/settings.json
```

After copying:

* Restart Zed
* Ensure required language servers are installed
* Install the Emmet extension if not already available

---

### 3. VS Code Setup

Copy the VS Code settings file:

Linux:

```
~/.config/Code/User/settings.json
```

MacOS:

```
~/Library/Application Support/Code/User/settings.json
```

After copying:

* Restart VS Code
* Install required extensions (Copilot, Prettier, Live Server, etc.)

---

## Notes

* These settings control editor behavior, UI, and completion system
* Extensions and language servers are not included and must be installed manually
* Font settings require the font to be installed on the system
* Some paths (e.g., compilers, SDKs) may need adjustment depending on your system

---

## Troubleshooting

### Completions not showing automatically

* Ensure language servers are installed
* Check file type detection (HTML, JS, etc.)
* Restart the editor

### Emmet not working

* Install Emmet extension
* Verify language server configuration

### Fonts not applied

* Install the required font (e.g., Fira Code)
* Restart the editor

---

## Customization

You can modify any settings file to suit your workflow. Keep in mind that:

* Invalid JSON will break configuration loading
* Duplicate keys will override earlier values
* Some settings are editor-specific and not portable

---

## Goal

This setup is designed for a fast, minimal, and distraction-free coding experience with:

* Automatic completions
* No unwanted AI interference
* Consistent UI and behavior across editors

---

## License

Use freely and modify as needed.
