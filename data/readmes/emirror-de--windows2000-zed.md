# Windows 2000 Theme for Zed

A faithful Windows 2000–inspired theme for Zed, available in both Light and Dark variants. It captures the classic UI palette (warm grays, Win2k blue title bars) while ensuring modern readability and contrast throughout the editor and panels.

- Theme names:
  - Windows 2000 Light
  - Windows 2000 Dark

## Highlights

- Authentic Windows 2000 palette
  - Classic app background and panel gray: `#D4D0C8` (Light)
  - Signature accent/title blue: `#0A246A`
  - Familiar ANSI terminal colors
- Clear readability
  - High-contrast text across UI and editor
  - Selection colors that keep file names and VCS statuses legible in the project panel
- Editor ergonomics
  - Light: white editor background with black text for maximum legibility
  - Dark: near-black editor background with carefully tuned contrasts
- Scrollbars and highlighting
  - Semi-transparent scrollbar thumbs so underlying search matches/highlights remain visible

Screenshots: coming soon

## Installation

Manual installation (Dev Extension):

1. Clone this repository:
   ```
   git clone https://github.com/emirror-de/windows2k-zed.git
   ```
2. Open Zed.
3. Open the Command Palette:
   - macOS: Cmd+Shift+P
   - Linux/Windows: Ctrl+Shift+P
4. Run: “Install Dev Extension”.
5. Select the cloned `windows2k-zed` directory.
6. Restart or reload Zed if needed.

Once published to the Zed Extensions marketplace, you’ll be able to install it directly from there as well.

## Usage

Select the theme from Zed’s Settings UI, or configure it via your `settings.json`.

- Single theme:
  ```json
  {
    "theme": "Windows 2000 Light"
  }
  ```
  or
  ```json
  {
    "theme": "Windows 2000 Dark"
  }
  ```

- Auto-switch based on system appearance:
  ```json
  {
    "theme": {
      "mode": "system",
      "light": "Windows 2000 Light",
      "dark": "Windows 2000 Dark"
    }
  }
  ```

- Per-workspace (add the same key in your workspace settings file).

## Design Notes

- Light variant
  - App/panel/tab backgrounds in classic gray (`#D4D0C8`)
  - Editor background white with black text
  - Selection backgrounds tuned (e.g., `#CFE3FF`) for readable file names and VCS statuses
- Dark variant
  - Deep gray/near-black surfaces for modern comfort
  - Preserves the Win2k blue accent (`#0A246A`) and overall feel
  - Selection uses the Win2k accent on dark surfaces while maintaining strong text contrast

- Project panel and VCS colors
  - VCS states (created/modified/deleted/renamed) are darkened/brightened where necessary to remain legible on selected rows.
- Scrollbar transparency
  - Semi-transparent scrollbar thumbs so search matches and other highlights are visible beneath the thumb.

## Customization

Want to tweak a surface or status color?
- You can fork/clone this repository and adjust values in `themes/windows2000.json`.
- If something looks low-contrast in your particular setup, open an issue with a screenshot and the affected surface/state, and we’ll refine it.

## Contributing

Issues and pull requests are welcome! If you contribute:
- Keep readability and contrast as top priorities
- Prefer staying close to the Windows 2000 palette unless contrast requires an adjustment
- Test changes in both Light and Dark variants

## License

MIT — see `LICENSE`.

## Credits

- Windows 2000 is a trademark of Microsoft. This theme is a fan-made homage for Zed.
- Thanks to the Zed team for an excellent editor and theming system.

Repository: https://github.com/emirror-de/windows2k-zed