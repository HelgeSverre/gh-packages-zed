# Landroid Theme

**Landroid** is a theme for **Zed** and **NvChad (Neovim)**, available in 6 color variants across light and dark modes.

Inspired by the space-themed Easter egg game from **Android 17** (*Cinnamon Bun*).

---

## Highlights

- **HelmLab GenSpace Engine**: Color tokens are computed using the **HelmLab GenSpace (v0.11.1)** perceptual color space, ensuring smooth, naturally balanced palettes without gamut distortion.
- **APCA Contrast Compliance**: Strictly satisfies the **APCA** contrast standard (APCA-W3 0.98G). All 66 token pairs pass perceptual contrast thresholds across every theme variant.
- **6 Variations**:
  - `Dark Main`
  - `Dark Soft`
  - `Dark Contrast`
  - `Light Main`
  - `Light Soft`
  - `Light Contrast`

---

## Gallery

### Dark Themes

#### Dark Main
![Dark Main](assets/dark_main.jpg)

#### Dark Soft
![Dark Soft](assets/dark_soft.jpg)

#### Dark Contrast
![Dark Contrast](assets/dark_contrast.jpg)

---

### Light Themes

#### Light Main
![Light Main](assets/light_main.jpg)

#### Light Soft
![Light Soft](assets/light_soft.jpg)

#### Light Contrast
![Light Contrast](assets/light_contrast.jpg)

---

## Installation

### Zed
1. Copy `zed/themes/landroid-helmlab.json` to your Zed themes directory:
   - **Linux / macOS**: `~/.config/zed/themes/`
   - **Windows**: `%USERPROFILE%\AppData\Roaming\Zed\themes\`
2. Select your desired variant via the theme selector (`Ctrl+K Ctrl+T` / `Cmd+K Cmd+T`).

### NvChad
1. Copy the `.lua` theme files from `nvchad/` to `~/.config/nvim/lua/themes/`.
2. Set your active theme in `~/.config/nvim/lua/chadrc.lua`:
   ```lua
   M.ui = {
     theme = "landroid_helmlab_dark",
   }
   ```
3. Open the NvChad theme switcher (`<leader>th`) or restart Neovim.
