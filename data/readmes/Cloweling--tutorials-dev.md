# tutorials-dev

A personal collection of development tutorials and setup guides for modern web technologies.

## Tutorials

- [Angular](./Angular/install.md) — Install Angular CLI, configure ESLint, and set up the LSP in Zed

## Sync to ~/Documents

Keep a local copy of all tutorials in `~/Documents` with a single command.  
It clones the repo, copies every top-level folder into `~/Documents` (replacing old files), then cleans up automatically.

```bash
curl -s https://raw.githubusercontent.com/Cloweling/tutorials-dev/main/sync-to-documents.sh | bash
```

> Requires `git`, `rsync`, and `bash`. On Arch Linux all three are available by default.
