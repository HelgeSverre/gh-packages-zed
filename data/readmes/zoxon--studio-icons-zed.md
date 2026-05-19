# Studio Icons for Zed

This is a converted version of the popular [Studio Icons](https://github.com/jtlowe/studio-icons) VS Code theme for Zed editor.

## Features

- ✨ **214+ file type icons** - Comprehensive coverage for most programming languages and file types
- 🎨 **Dark & Light variants** - Optimized for both dark and light Zed themes
- 📁 **Folder icons** - Special icons for common folder names like `wwwroot`, `properties`, etc.
- 🎯 **Visual Studio heritage** - Uses official icons from the Visual Studio Image Library

## Installation

To install this icon theme in Zed:

1. Copy the entire `studio-icons-zed` directory to your Zed extensions directory:
   - **macOS**: `~/.config/zed/extensions/`
   - **Linux**: `~/.config/zed/extensions/`
   - **Windows**: `%APPDATA%\Zed\extensions\`

2. Restart Zed or run the "Extensions: Reload" command

3. Open Zed settings and set the icon theme:

   ```json
   {
     "icon_theme": "Studio Icons Dark"
   }
   ```

   Or for light theme users:

   ```json
   {
     "icon_theme": "Studio Icons Light"
   }
   ```

## Icons Preview

### Programming Languages & Frameworks

| Language | Dark Theme | Light Theme | File Extensions |
|----------|------------|-------------|-----------------|
| **C/C++** | ![C](icons/CFile_16x_color_inverse.svg) ![C++](icons/CPP_16x_inverse.svg) | ![C](icons/CFile_16x_color.svg) ![C++](icons/CPP_16x.svg) | `.c`, `.cpp`, `.cxx`, `.cc`, `.h`, `.hpp` |
| **C#** | ![C#](icons/CS_16x_inverse.svg) | ![C#](icons/CS_16x.svg) | `.cs`, `.csx` |
| **Rust** | ![Rust](icons/RustFile_16x_inverse.svg) | ![Rust](icons/RustFile_16x.svg) | `.rs` |
| **Python** | ![Python](icons/PY_16x_inverse.svg) | ![Python](icons/PY_16x.svg) | `.py`, `.pyw`, `.pyi` |
| **JavaScript** | ![JS](icons/JSScript_16x_inverse.svg) | ![JS](icons/JSScript_16x.svg) | `.js`, `.mjs` |
| **TypeScript** | ![TS](icons/TS_FileSENode_16x_inverse.svg) | ![TS](icons/TS_FileSENode_16x.svg) | `.ts`, `.tsx` |
| **JSX/React** | ![JSX](icons/JSXScript_16x_inverse.svg) | ![JSX](icons/JSXScript_16x.svg) | `.jsx`, `.tsx` |
| **Java** | ![Java](icons/JavaFile_16x_inverse.svg) | ![Java](icons/JavaFile_16x.svg) | `.java`, `.jar` |
| **PHP** | ![PHP](icons/PHPFile_16x_inverse.svg) | ![PHP](icons/PHPFile_16x.svg) | `.php`, `.phtml` |
| **Ruby** | ![Ruby](icons/RB_FileSENode_16x_inverse.svg) | ![Ruby](icons/RB_FileSENode_16x.svg) | `.rb`, `.rbw` |
| **F#** | ![F#](icons/FS_16x_inverse.svg) | ![F#](icons/FS_16x.svg) | `.fs`, `.fsi`, `.fsx` |

### Web Technologies

| Technology | Dark Theme | Light Theme | File Extensions |
|------------|------------|-------------|-----------------|
| **HTML** | ![HTML](icons/HTMLFile_16x_inverse.svg) | ![HTML](icons/HTMLFile_16x.svg) | `.html`, `.htm` |
| **CSS** | ![CSS](icons/StyleSheet_16x_inverse.svg) | ![CSS](icons/StyleSheet_16x.svg) | `.css` |
| **SCSS/Sass** | ![SCSS](icons/SassStyleSheet_16x_inverse.svg) | ![SCSS](icons/SassStyleSheet_16x.svg) | `.scss`, `.sass` |
| **LESS** | ![LESS](icons/LessStyleSheet_16x_inverse.svg) | ![LESS](icons/LessStyleSheet_16x.svg) | `.less` |
| **JSON** | ![JSON](icons/JSONScript_16x_inverse.svg) | ![JSON](icons/JSONScript_16x.svg) | `.json` |
| **XML** | ![XML](icons/XMLFile_16x_inverse.svg) | ![XML](icons/XMLFile_16x.svg) | `.xml` |
| **XSLT** | ![XSLT](icons/XSLTTransformFile_16x_inverse.svg) | ![XSLT](icons/XSLTTransformFile_16x.svg) | `.xsl`, `.xslt` |
| **ASP.NET** | ![ASPX](icons/ASPXFile_16x_inverse.svg) | ![ASPX](icons/ASPXFile_16x.svg) | `.aspx`, `.asp` |

### Build & Configuration

| Type | Dark Theme | Light Theme | Files |
|------|------------|-------------|--------|
| **Makefile** | ![Makefile](icons/MakeFile_16x_inverse.svg) | ![Makefile](icons/MakeFile_16x.svg) | `Makefile`, `makefile`, `CMakeLists.txt` |
| **Configuration** | ![Config](icons/ConfigurationFile_16x_inverse.svg) | ![Config](icons/ConfigurationFile_16x.svg) | `.config`, `.conf`, `.ini` |
| **Settings** | ![Settings](icons/SettingsFile_16x_inverse.svg) | ![Settings](icons/SettingsFile_16x.svg) | `.editorconfig`, `.env` |
| **Git** | ![Git](icons/GitLogo_16x_inverse.svg) | ![Git](icons/GitLogo_16x.svg) | `.gitignore`, `.gitconfig` |
| **Node.js** | ![Node](icons/NodeJS_16x_inverse.svg) | ![Node](icons/NodeJS_16x.svg) | `package.json` |
| **TypeScript Config** | ![TSConfig](icons/TS_FileSENode_16x_inverse.svg) | ![TSConfig](icons/TS_FileSENode_16x.svg) | `tsconfig.json`, `tslint.json` |

### Media & Documents

| Type | Dark Theme | Light Theme | Extensions |
|------|------------|-------------|------------|
| **Images** | ![Image](icons/Image_16x_inverse.svg) | ![Image](icons/Image_16x.svg) | `.png`, `.jpg`, `.gif`, `.svg`, `.ico` |
| **Audio** | ![Audio](icons/AudioOn_16x_inverse.svg) | ![Audio](icons/AudioOn_16x.svg) | `.mp3`, `.wav`, `.flac`, `.aac` |
| **Video** | ![Media](icons/Media_16x_inverse.svg) | ![Media](icons/Media_16x.svg) | `.mp4`, `.avi`, `.mov`, `.mkv` |
| **PDF** | ![PDF](icons/PDFFile_16x_inverse.svg) | ![PDF](icons/PDFFile_16x.svg) | `.pdf` |
| **Text** | ![Text](icons/TextFile_16x_inverse.svg) | ![Text](icons/TextFile_16x.svg) | `.txt`, `.md`, `.rst` |
| **Archive** | ![Archive](icons/ZipFile_16x_inverse.svg) | ![Archive](icons/ZipFile_16x.svg) | `.zip`, `.rar`, `.7z`, `.tar` |

### Adobe Creative Suite

| Application | Dark Theme | Light Theme | Extensions |
|-------------|------------|-------------|------------|
| **Photoshop** | ![PS](icons/AdobePhotoshop_16x_inverse.svg) | ![PS](icons/AdobePhotoshop_16x.svg) | `.psd`, `.psb` |
| **Illustrator** | ![AI](icons/AdobeIllustrator_16x_inverse.svg) | ![AI](icons/AdobeIllustrator_16x.svg) | `.ai` |
| **InDesign** | ![ID](icons/AdobeIndesign_16x_inverse.svg) | ![ID](icons/AdobeIndesign_16x.svg) | `.indd`, `.indt` |

### Microsoft Office

| Application | Dark Theme | Light Theme | Extensions |
|-------------|------------|-------------|------------|
| **Word** | ![Word](icons/OfficeWord2013Logo_16x_inverse.svg) | ![Word](icons/OfficeWord2013Logo_16x.svg) | `.doc`, `.docx` |
| **Excel** | ![Excel](icons/OfficeExcel2013Logo_16x_inverse.svg) | ![Excel](icons/OfficeExcel2013Logo_16x.svg) | `.xls`, `.xlsx` |
| **PowerPoint** | ![PPT](icons/OfficePowerPoint2013Logo_16x_inverse.svg) | ![PPT](icons/OfficePowerPoint2013Logo_16x.svg) | `.ppt`, `.pptx` |
| **Access** | ![Access](icons/OfficeAccess2013Logo_16x_inverse.svg) | ![Access](icons/OfficeAccess2013Logo_16x.svg) | `.mdb`, `.accdb` |
| **Project** | ![Project](icons/OfficeProject2013Logo_16x_inverse.svg) | ![Project](icons/OfficeProject2013Logo_16x.svg) | `.mpp` |
| **Visio** | ![Visio](icons/OfficeVisio2013Logo_16x_inverse.svg) | ![Visio](icons/OfficeVisio2013Logo_16x.svg) | `.vsd`, `.vsdx` |

### Folders

| Type | Dark Theme | Light Theme | Usage |
|------|------------|-------------|--------|
| **Regular** | ![Folder](icons/Folder_16x_inverse.svg) ![Open](icons/FolderOpen_16x_inverse.svg) | ![Folder](icons/Folder_16x.svg) ![Open](icons/FolderOpen_16x.svg) | Default folders |
| **Special** | ![Special](icons/SpecialFolder_16x_inverse.svg) ![Open](icons/SpecialFolderOpen_16x_inverse.svg) | ![Special](icons/SpecialFolder_16x.svg) ![Open](icons/SpecialFolderOpen_16x.svg) | Root project folders |
| **Web** | ![Web](icons/WebFolder_16x_inverse.svg) ![Open](icons/WebFolderOpen_16x_inverse.svg) | ![Web](icons/WebFolder_16x.svg) ![Open](icons/WebFolderOpen_16x.svg) | `wwwroot` folders |
| **Properties** | ![Props](icons/Property_16x_inverse.svg) | ![Props](icons/Property_16x.svg) | `properties` folders |
| **References** | ![Refs](icons/Reference_16x_inverse.svg) | ![Refs](icons/Reference_16x.svg) | `references` folders |

## Supported File Types

The theme includes icons for **214+ file types** across:

- **Programming Languages**: C/C++, C#, Rust, Python, JavaScript, TypeScript, Java, PHP, Ruby, F#, and more
- **Web Technologies**: HTML, CSS, SCSS, LESS, Vue, React (JSX), JSON, XML
- **Build & Config Files**: Makefile, CMake, package.json, tsconfig.json, .gitignore, Docker
- **Documents**: PDF, Word, Excel, PowerPoint, Text files, Markdown
- **Media Files**: Images, Audio, Video with appropriate icons
- **Archives**: ZIP, TAR, 7Z, RAR and other compressed formats
- **Databases**: SQL files, Access databases, SQLite

## Original Credits

This theme is a conversion of the original [Studio Icons](https://github.com/jtlowe/studio-icons) VS Code extension by [jtlowe](https://github.com/jtlowe). All icon assets are from the Visual Studio Image Library.

## License

This project maintains the same license as the original Studio Icons theme. See the [LICENSE.md](../studio-icons-master/LICENSE.md) file in the original project for details.

## Contributing

If you find issues with the conversion or want to improve the mappings, please feel free to submit issues or pull requests to help improve this Zed icon theme.
