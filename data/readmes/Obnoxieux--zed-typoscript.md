# TypoScript Support for Zed

This extension provides syntax highlighting for the [TypoScript configuration language](https://docs.typo3.org/m/typo3/reference-typoscript/13.4/en-us/Introduction/Index.html) used by [TYPO3 CMS](https://typo3.org/).

> [!WARNING]
> Syntax not yet fully supported.

## Installation

This extension has not yet been released to the Zed extension registry. It can be installed locally as a dev extension as explained [here](https://zed.dev/docs/extensions/developing-extensions#developing-an-extension-locally).

**TL:DR**

- checkout code to some repository
- action: `zed: install dev extension`
- select repository when prompted for path

## Acknowledgements

> [!IMPORTANT]
> I did not build the Tree Sitter grammar for TypoScript myself, all I did was package the previous work (grammar definition and syntax highlighting) found at https://github.com/Teddytrombone/tree-sitter-typoscript (MIT License) to be used by Zed while working on my own TYPO3 CMS projects. **All credit for the original work goes to the contributors of that repository**.
