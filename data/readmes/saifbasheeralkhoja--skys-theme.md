🌊 Sky’s Sea

A Minimalist Zed Theme

Author: Saif Basheer Mohammed Al-Khoja
**Repository:** https://github.com/saifbasheeralkhoja/skys-theme

**License:** MIT
*Sky’s Sea* A minimal, eye‑friendly syntax theme inspired by the colors of the sky colors throughout the day but withot sun effects, It's a collection of 12 carefully crafted color themes for the **Zed** editor. Each flavor is named after a period of the day (Arabic prayer times) and mirrors the sky’s natural palette at that moment. The themes are deliberately **minimalistic** and **easy on the eyes**, helping you stay focused on code during long editing sessions.


## 🎨 Overview
Sky’s Sea is a collection of **12 theme flavors** that translate the natural hues of the sky—from dawn to night—into a clean, minimalist code‑editing 
experience. Each flavor is carefully tuned to reduce eye strain during long coding sessions while keeping the focus on the code itself.

**Design goals**  
**Minimalistic look** – only essential UI elements are highlighted.  
**Eye‑comfort** – soft contrast and soothing gradients.  
**Border‑optional** – flavors with a trailing `+` include subtle, clear borders around UI components (panels, sidebars, etc.). Flavors without `+` 
keep a border‑less look for a truly seamless feel.  
**Easy customization** – all colors are exposed as CSS/VS Code token variables, making tweaks trivial.


## Table of Contents

- [✨ Features](#-features)
- [🎨 Theme Flavors](#-theme-flavors)
- [🔧 Installation](#-installation)
- [🖥 Usage](#-usage)
- [📸 Screenshots](#-screenshots)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)
- [💬 Contact](#-contact)


## ✨ Features

-----------------------------------------------------------------------------------------------------------------------------------------------------------
| Feature                   | Description                                                                                                                 |
|---------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| **12 Distinct Flavors**   | One for each major time‑of‑day segment (Asr, Maghrib, Layl, Fajr, Dhuhr, Ghasaq, Subh) plus “+” variants with clear borders.|
| **Sky‑Inspired Palette**  | Colors are taken directly from real sky hues.                                                                               |
| **Minimalistic Design**   | Low contrast UI chrome lets the code itself become the visual focus.                                                        |
| **Eye‑Friendly**          | Soft contrast ratios reduce strain during prolonged use.                                                                    |
| **Border Variants (`+`)   | Flavors suffixed with `+` add thin, distinct borders around pans, tabs, and the status bar for those who prefer extra visual separation.      |                                                                                                                            
| **Zed‑Native**            | Built using Zed’s theme JSON format – no extra plugins required.                                                            |
| **Easy Switching**        | Change flavors instantly via Zed’s command palette or settings file.                                                        |
| **Open Source**           | MIT‑licensed – feel free to fork, tweak, or share.                                                                          |
-----------------------------------------------------------------------------------------------------------------------------------------------------------


## 🎨 Theme Flavors that written in Arabic words via English letters

| Flavor       | Meaning (time of day)            | Borders |Background  |
|--------------|----------------------------------|---------|------------|
| 01. Asr      | Afternoon: High Minimlistic look |    ❌    | #212e4b  |
| 02. Asr+     | Afternoon+ With clear borders    |    ✅    | #212e4b  |
| 03. Maghrib  | Eveining: High Minimlistic look  |    ❌    | #192339  |
| 04. Maghrib+ | Eveining+ With clear borders:    |    ✅    | #192339  |
| 05. Layl     | Night: High Minimlistic look     |    ❌    | #111827  |
| 06. Layl+    | Night+ With clear borders        |    ✅    | #111827  |
| 07. Fajr     | Dawn: High Minimlistic look      |    ❌    | #2b3c61  |
| 08. Fajr+    | Dawn+ With clear borders         |    ✅    | #2b3c61  |
| 09. Dhuhr+   | Noon+ With clear borders         |    ✅    | #203f6e  |
| 10. Ghasaq+  | Twilight: With clear borders     |    ✅    | #102751  |
| 11. Subh     | Morning: High Minimlistic look   |    ❌    | #354b78  |
| 12. Subh+    | Morning: With clear borders      |    ✅    | #354b78  |
--------------------------------------------------------------------------


## 🔧 Installation

### Via Zed’s Built‑in Theme Manager (recommended)

1. Open Zed → **Settings** → **Themes** → **Install from URL**.
2. Paste the raw theme URL (replace `your-username` with your actual GitHub name):

   ```
   https://raw.githubusercontent.com/your-username/sky-s‑sea/main/themes/asr.json
   ```

   *Repeat for any other flavor you want (e.g., `maghrib+.json`).*

3. Select the installed theme from the theme picker.

### Manual Installation

1. Clone the repo (or download the ZIP):

   ```bash
   git clone https://github.com/your-username/sky-s‑sea.git
   ```

2. Copy the desired `.json` file(s) from `themes/` into Zed’s themes directory:

   - **macOS:** `~/Library/Application Support/Zed/themes/`
   - **Linux:** `~/.config/Zed/themes/`
   - **Windows:** `%APPDATA%\Zed\themes\`

3. Restart Zed (or reload the window) and choose the theme via **Settings → Themes**.


## 🖥 Usage

Switching flavors on the fly:

1. Open the **Command Palette** (`Ctrl+Shift+P` / `Cmd+Shift+P`).
2. Type `Theme: Select Theme`.
3. Choose the desired flavor (e.g., `Fajr+`, `Layl`).

You can also set a default theme in your `settings.json`:

```json
{
  "theme": "Asr+"
}
```


## 📸 Screenshots


01. | Asr  |
<img width="1920" height="1200" alt="Asr" src="https://github.com/user-attachments/assets/d9afc01b-d1be-4b06-bcf3-d78b010bec9b" />


02. | Asr+ |
<img width="1920" height="1200" alt="Asr+" src="https://github.com/user-attachments/assets/b743fcf7-75e8-4a9a-952d-9ea8dc0b5ba6" />


03. | Maghrib  |
<img width="1920" height="1200" alt="Maghrib" src="https://github.com/user-attachments/assets/68e452ea-3eb3-4ce1-94c7-27df4a4448da" />


04. | Maghrib+ |
<img width="1920" height="1200" alt="Maghrib+" src="https://github.com/user-attachments/assets/3b9795d9-62b3-4cb4-8dea-89bdf2eac545" />


05. | Layl  |
<img width="1920" height="1200" alt="Layl" src="https://github.com/user-attachments/assets/f2e067e8-0404-4526-91eb-e1be8865a583" />


06. | Layl+ |
<img width="1920" height="1200" alt="Layl+" src="https://github.com/user-attachments/assets/4fb24057-6c54-481b-9bab-759408299e72" />


07. | Fajr  |
<img width="1920" height="1200" alt="Fajr" src="https://github.com/user-attachments/assets/b4b669d1-a5c5-4ac9-a375-553352680788" />


08.| Fajr+ |
<img width="1920" height="1200" alt="Fajr+" src="https://github.com/user-attachments/assets/a5acf833-905b-47e1-a60c-49e831742ab0" />


09. | Dhuhr+ |
<img width="1920" height="1200" alt="Dhuhr+" src="https://github.com/user-attachments/assets/7fdbabf8-d121-4022-a070-c04daaef57a4" />


10. | Ghasaq+ |
<img width="1920" height="1200" alt="Ghasaq+" src="https://github.com/user-attachments/assets/dbb6fa3b-3a49-4494-9234-2328cd1a9720" />


11. | Subh  |
<img width="1920" height="1200" alt="Subh" src="https://github.com/user-attachments/assets/6f03c99a-4275-469f-8649-b786bd7a4f90" />


12. | Subh+ |
<img width="1920" height="1200" alt="Subh+" src="https://github.com/user-attachments/assets/f4be1076-5774-4cb7-9e7c-d2d8db649bc4" />



## 🤝 Contributing

We welcome improvements! If you’d like to tweak colors, add a new variant, or fix a typo:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/awesome-change`.
3. Make your changes (edit the relevant `.json` file under `themes/`).
4. Commit with a clear message: `git commit -m "Add Subh+ border tweak"`.
5. Push to your fork and open a Pull Request.

Please ensure that any new flavor follows the naming convention (`<time>` or `<time>+`) and stays true to the sky‑color inspiration.


## 📜 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

## 💬 Contact

- **Author:** Saif Basheer Mohammed Al-Khoja  
- **GitHub:** https://github.com/saifbasheeralkhoja

If you enjoy Sky’s Sea, please ⭐ the repository and share it with fellow Zed enthusiasts! Happy coding under the sky. 🌤


*Generated with ❤ for the Zed community.*
