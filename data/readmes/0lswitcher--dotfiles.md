![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&size=46&duration=4500&pause=1000&color=B277F7&center=true&vCenter=true&width=1012&lines=0lswitcher's+UNIX+Dotfiles)

![MultiPreview](md-assets/previews/combined-preview.gif)

<p align="center">
    My collection of dotfiles for different applications that I considered noteworthy.<br>
    No install scripts, just pure dotfiles.
</p>

> [!TIP]
> If you're looking for bash scripts, take a look at my [bash-scripts](https://github.com/0lswitcher/bash-scripts) repository since I've moved them there.
> 
> If you're instead looking for NixOS configuration files, take a look at my [nixfiles](https://github.com/0lswitcher/nixfiles) repository since I've moved them there.

<br>

### Previews

<details>
<summary><b>NeoVim:</b></summary>

![Neovim](md-assets/previews/neovim-preview.gif)

</details>
<!----------------------------------------------------------------->
<details>
<summary><b>Obsidian:</b></summary>

![Obsidian](md-assets/previews/obsidian-preview-cropped.gif)

</details>
<!----------------------------------------------------------------->
<details>
<summary><b>Kando (The Pie Menu):</b></summary>

![Kando](md-assets/previews/kando-preview-cropped.gif)

</details>
<!----------------------------------------------------------------->
<details>
<summary><b>Firefox (w/ Pywalfox Extension):</b></summary>

> w/ Standard Hyprland Transparency Effects:
![Firefox/Pywalfox](md-assets/previews/firefox-preview.gif)
> w/ Opaque Effect: (This can be used for all programs, see mouse binds)
![Firefox/Pywalfox Opaque](md-assets/previews/firefox-opaque-preview.gif)

</details>
<!----------------------------------------------------------------->
<details>
<summary><b>Glance (The Server Dashboard):</b></summary>

![Glance](md-assets/previews/glance-preview.gif)

</details>
<!----------------------------------------------------------------->
<details>
<summary><b>Ranger: (TUI File Manager):</b></summary>

![Ranger](md-assets/previews/ranger-preview.gif)

</details>
<!----------------------------------------------------------------->
<details>
<summary><b>PCManFM-Qt: (GUI File Manager):</b></summary>

![PCManFM-Qt](md-assets/previews/pcmanfm-qt-preview.gif)

</details>
<!----------------------------------------------------------------->
<br>

### Keybindings

> [!NOTE]
> Whenever you see `mainMod` below, keep in mind that for my keybindings, I swap my `Alt` and `Windows` key, and then I set my caps lock key to also function as a `Windows` key.
>
> The setup might seem weird but it works great for me.
>
> I swap the `Alt` and `Windows` key so that way it's easier to press my `mainMod`, because the actual location of the `Windows` key is a bit tight on the thumb.
>
> The reason I swap the keys instead of just setting `Alt` as `mainMod`, is because `Alt` is an actually useful key that gets used every once in a while, and I didn't want to remove its functionality. The `Windows` key is the perfect replacement for `mainMod` since the actual key doesn't usually register to anything by default in linux distros.
>
> Now for the caps lock being bound to the `Windows` key, this is done so I can have comfortable hand positions and expand my bind possibilities. For example, to toggle a window between floating and not, i use `mainMod+space`, and it's much easier to hit caps lock and space with my pinkie and thumb than it is to hit the `Alt` key and space.

<details>
<summary><b>Applications</b></summary>

| Key                                               | Action                                            |
| ------------------------------------------------- | ------------------------------------------------- |
| <kbd>mainMod</kbd> + <kbd>A</kbd>                 | Foot (Terminal)                                   |
| <kbd>mainMod</kbd> + <kbd>E</kbd>                 | PCManFM-Qt (GUI File Manager)                     |
| <kbd>mainMod</kbd> + <kbd>R</kbd>                 | Ranger     (TUI File Manager)                     |
| <kbd>mainMod</kbd> + <kbd>W</kbd>                 | Firefox Browser                                   |
| <kbd>mainMod</kbd> + <kbd>B</kbd>                 | Firefox Browser                                   |
| <kbd>mainMod</kbd> + <kbd>P</kbd>                 | Firefox Browser (Private)                         |
| <kbd>mainMod</kbd> + <kbd>L</kbd>                 | Neovide (GUI for Neovim)                          |
| <kbd>mainMod</kbd> + <kbd>V</kbd>                 | VSCodium (FOSS telemetry-free fork/alt of VSCode) |
| <kbd>mainMod</kbd> + <kbd>Z</kbd>                 | Zed Editor (speedy text editor written in Rust)   |
| <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>Del</kbd> | Btop (system monitor a.k.a. task manager)         |
| <kbd>Ctrl</kbd> + <kbd>Space</kbd>                | Kando (pie-menu everything* launcher)             |
| <kbd>mainMod</kbd> + <kbd>Q</kbd>                 | ULauncher (traditional application launcher)      |

</details>

<details>
<summary><b>Window Management</b></summary>

Modify window properties:
| Key                                                       | Action                                                        |
| --------------------------------------------------------- | ------------------------------------------------------------- |
| <kbd>mainMod</kbd> + <kbd>Space</kbd>                     | Toggle Floating & Center                                      |
| <kbd>mainMod</kbd> + <kbd>C</kbd>                         | Close Window                                                  |
| <kbd>mainMod</kbd> + <kbd>S</kbd>                         | Split Window                                                  |
| <kbd>mainMod</kbd> + <kbd>F</kbd>                         | Fullscreen                                                    |
| <kbd>mainMod</kbd> + <kbd>Arrows</kbd>                    | Move Focus                                                    |
| <kbd>Winkey</kbd>  + <kbd>Arrows</kbd>                    | Move Window                                                   |
| <kbd>mainMod</kbd> + <kbd>Shift</kbd> + <kbd>Arrows</kbd> | Resize Window                                                 |
| <kbd>mainMod</kbd> + <kbd>Tab</kbd>                       | Cycle through windows and bring to top (alt tab from windows) |

Workspace related binds:
| Key                                                                  | Action                                             |
| -------------------------------------------------------------------- | -------------------------------------------------- |
| <kbd>mainMod</kbd> + <kbd>1-9</kbd>                                  | Change/Switch Workspace                            |
| <kbd>mainMod</kbd> + <kbd>Shift</kbd> + <kbd>1-9</kbd>               | Move active window to Workspace                    |
| <kbd>mainMod</kbd> + <kbd>Shift</kbd> + <kbd>Left/Right Arrows</kbd> | Change/Switch Workspace                            |
| <kbd>mainMod</kbd> + <kbd>Shift</kbd> + <kbd>Up/Down Arrows</kbd>    | Move active window to Workspace                    |
| <kbd>mainMod</kbd> + <kbd>X</kbd>                                    | Toggle Special Workspace/Scratchpad                |
| <kbd>mainMod</kbd> + <kbd>Shift</kbd> + <kbd>X</kbd>                 | Move active window to Special Workspace/Scratchpad |

Mouse-centric/based binds:
| Key                                                          | Action                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------- |
| <kbd>mainMod</kbd> + <kbd>Drag LMB</kbd>                     | Move Window                                             |
| <kbd>mainMod</kbd> + <kbd>Drag RMB</kbd>                     | Resize Window                                           |
| <kbd>mainMod</kbd> + <kbd>Shift</kbd> + <kbd>Scroll Up</kbd> | Change Window Opacity (fully opaque at all times)       |
| <kbd>mainMod</kbd> + <kbd>Scroll Up</kbd>                    | Change Window Opacity (less transparent, still dynamic) |
| <kbd>mainMod</kbd> + <kbd>Scroll Down</kbd>                  | Change Window Opacity (default)                         |

</details>

<details>
<summary><b>Screenshots</b></summary>

| Key                                                  | Action              |
| ---------------------------------------------------- | ------------------- |
| <kbd>mainMod</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd> | Screenshot (region) |
| <kbd>ALT</kbd> +     <kbd>Shift</kbd> + <kbd>S</kbd> | Screenshot (window) |
| <kbd>CTRL</kbd> +    <kbd>Shift</kbd> + <kbd>S</kbd> | Screenshot (screen) |

</details>

<details>
<summary><b>Miscellaneous</b></summary>

| Key                                                       | Action                                |
| --------------------------------------------------------- | ------------------------------------- |
| <kbd>mainMod</kbd> + <kbd>Shift</kbd> + <kbd>W</kbd>      | Toggle Waybar Visibility (top bar)    |
| <kbd>mainMod</kbd> + <kbd>M</kbd>                         | Toggle Waybar Visibility (bottom bar) |
| <kbd>mainMod</kbd> + <kbd>D</kbd>                         | Show Desktop Shortcuts w/ PCManFM-Qt  |
| <kbd>mainMod</kbd> + <kbd>H</kbd>                         | Hide Desktop Shortcuts w/ PCManFM-Qt  |

</details>

See [hypr/.config/hypr/hyprland.lua](hypr/.config/hypr/hyprland.lua) for a comprehensive list.
It will recieve updates before this README does.

<br>

### Installation
---
My dotfiles now use [GNU Stow](https://www.gnu.org/software/stow/) for management, so installation is easier than ever.

<details>
<summary>What is GNU Stow?</summary>
According to the gnu.org site:<br>
"GNU Stow is a symlink farm manager which takes distinct packages of software and/or data located in separate directories on the filesystem, and makes them appear to be installed in the same place."
</details>

To begin installation, first clone the repository to your `$HOME` directory:

```
$ git clone https://github.com/0lswitcher/dotfiles.git
```

> [!TIP]
> You can optionally clone the repository to any other desired directory in your system, just make sure you know how to use `stow` with `-t` flag set to your `$HOME` directory.

Next, ensure you have `stow` installed in your systems package manager.\
With `stow` installed, getting the dotfiles is as easy as removing or backing up any previous dots you want to change:\
*(I'll use hyprland for this example-)*
> *Removal:*
> ```
> $ rm -r ~/.config/hypr
> ```

Or, alternatively;

> *Backup:*
> ```
> $ mv ~/.config/hypr ~/.config/hypr.bk
> ```

Then, navigating to the cloned repository directory and running:

```
$ stow <desired-dotfile-name>
```

That's it! <br>

For example, if you want to use my hyprland dots, run:

```
$ stow hypr
```


<br>

### Documentation
---
I've written multiple `README`'s regarding different configs, so I highly encourage browsing deeper within the repository either through the links provided below, or by manually checking the file tree above.

> [!NOTE]
> If you don't see the package or configuration linked below, it doesn't have a `README` yet. Feel free to open an issue in the repository online, and I'll prioritize that `README` next.

| Package / Configuration | README?   |
| ----------------------- | --------- |
|[Bash](bash/README.md)                     | Yes!      |
|Btop                     | Not yet.. |
|Cava                     | Not yet.. |
|[Fastfetch](fastfetch/README.md)                | Yes!      |
|Foot                     | Not yet.. |
|Hyprland                 | Not yet.. |
|Kando                    | Not yet.. |
|Laptop Specific          | Not yet.. |
|Micro                    | Not yet.. |
|Neovim                   | Not yet.. |
|Ranger                   | Not yet.. |
|Spicetify                | Not yet.. |
|Ulauncher                | Not yet.. |
|Waybar                   | Not yet.. |
| ------- Theming: ------ |           |
| gtk-2.0                 | Not yet.. |
| gtk-3.0                 | Not yet.. |
| gtk-4.0                 | Not yet.. |
| nwg-look                | Not yet.. |
| qt5ct                   | Not yet.. |
|[qt6ct](theming/.config/qt6ct/README.md)                    | Yes!      |

<br>

> [!CAUTION]
> This is a WIP! If you're reading this message, there's still plenty to come, dotfile and documentation wise. If you're interested in seeing how things turn out, feel free to 'Watch' the repo via the menu on the right side. o7
