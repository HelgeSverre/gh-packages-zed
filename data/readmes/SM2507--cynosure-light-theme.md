# Cynosure Light Theme for Zed

A Zed port of the [Cynosure Light Theme](https://github.com/SM2507/Cynosure-Theme-VSCode) for VS Code: soft, creamy, warm light theme inspired by Cyberpunk 2077: Phantom Liberty.

![Cynosure Light Theme preview](https://raw.githubusercontent.com/SM2507/Cynosure-Theme-VSCode/main/image.png)

## Installation

Open the Zed extension marketplace (`zed: extensions`), search **Cynosure Light Theme**, install, then pick it with `theme selector: toggle`.

To try it before it's published: `zed: install dev extension` and select a clone of this repository.

## Color Palette

### Editor

| Color | Hex | Usage |
| ----- | --- | ----- |
| ![#FFFFEA](https://placehold.co/12x12/FFFFEA/FFFFEA.png) Cream | `#FFFFEA` | Editor, terminal, active tab |
| ![#F9F5C2](https://placehold.co/12x12/F9F5C2/F9F5C2.png) Butter | `#F9F5C2` | Panels, tab bar, title/status bar, active line |
| ![#766832](https://placehold.co/12x12/766832/766832.png) Olive | `#766832` | Borders |
| ![#C6D5FE](https://placehold.co/12x12/C6D5FE/C6D5FE.png) Periwinkle | `#C6D5FE` | Selection, hover |
| ![#228479](https://placehold.co/12x12/228479/228479.png) Deep Teal | `#228479` | Focus, accent |
| ![#44BCA2](https://placehold.co/12x12/44BCA2/44BCA2.png) Mint | `#44BCA2` | Active line number |

### Syntax

| Color | Hex | Usage |
| ----- | --- | ----- |
| ![#2F3737](https://placehold.co/12x12/2F3737/2F3737.png) Charcoal | `#2F3737` | Text, punctuation, parameters |
| ![#D075B0](https://placehold.co/12x12/D075B0/D075B0.png) Orchid | `#D075B0` | Keywords, storage |
| ![#017762](https://placehold.co/12x12/017762/017762.png) Jade | `#017762` | Strings |
| ![#0047AB](https://placehold.co/12x12/0047AB/0047AB.png) Cobalt | `#0047AB` | Functions |
| ![#7A00AB](https://placehold.co/12x12/7A00AB/7A00AB.png) Violet | `#7A00AB` | Types, classes, namespaces |
| ![#13A6AB](https://placehold.co/12x12/13A6AB/13A6AB.png) Cyan | `#13A6AB` | Variables, properties, tags |
| ![#1256EF](https://placehold.co/12x12/1256EF/1256EF.png) Electric Blue | `#1256EF` | Constants, numbers, attributes |
| ![#E81AEF](https://placehold.co/12x12/E81AEF/E81AEF.png) Magenta | `#E81AEF` | Operators, escapes, regex, enum members |
| ![#D0C39C](https://placehold.co/12x12/D0C39C/D0C39C.png) Sand | `#D0C39C` | Comments (italic) |

## Differences from the VS Code version

Zed uses one text colour for the whole UI, so the dark charcoal (`#2F3737`) title bar, status bar and active tab from VS Code would make their labels unreadable. In Zed those use the butter/cream surfaces instead; everything else maps 1:1.

## License

[MIT](LICENSE)
