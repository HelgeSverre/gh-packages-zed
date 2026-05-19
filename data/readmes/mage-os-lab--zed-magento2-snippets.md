# Magento 2 Snippets for Zed

[![Zed](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/zed-industries/zed/main/assets/badge/v0.json)](https://zed.dev)

Magento 2 and Hyvä snippets for the [Zed](https://zed.dev) editor.

Covers the boilerplate you write every day, from phtml headers and CSP script tags to layout XML, di.xml, and system.xml.


## Installation

### Via Zed Extensions

2. Open Zed and go to the Extensions panel (`cmd+shift+x`).
2. Search for "Magento 2 Snippets" and click "Install".

### Via Developer install

Requires [rustup](https://rustup.rs) (Rust must be installed via rustup specifically, not Homebrew or other package managers).

1. Clone this repository to your local machine.
2. Open Zed and go to the Extensions panel (`cmd+shift+x`).
3. Click "Install Dev Extension" at the top of the panel.
4. Select the folder where you cloned this repository.

Zed will load the extension directly from that folder. Any changes you make to the snippet files are picked up after reloading the extension from the Extensions panel.

## Recommended setting

To show snippets at the top of the autocomplete list, add this to your Zed settings:

```json
{
    "snippet_sort_order": "top"
}
```

This can also be scoped per language if you only want it for PHP and XML:

```json
{
    "languages": {
        "PHP": { "snippet_sort_order": "top" },
        "XML": { "snippet_sort_order": "top" }
    }
}
```

## Complementary extensions

This extension focuses on Magento 2 and Hyvä specific snippets.

For generic PHP and Alpine.js snippets useful in day to day development, install these extensions alongside it:

- [PHP Snippets](https://github.com/seekode/zed-php-snippets) for general PHP snippets
- [Alpine.js Snippets](https://github.com/A909M/zed-alpinejs-snippets) for Alpine.js directives and patterns

## Available Snippets

### PHP

<details><summary>Magento</summary>

| Prefix                   | Description                                       |
| ------------------------ | ------------------------------------------------- |
| `escapeHtml.magento`     | Escape a string for safe HTML output              |
| `escapeUrl.magento`      | Escape a string for safe use in URLs              |
| `escapeHtmlAttr.magento` | Escape a string for safe use in HTML attributes   |
| `escapeJs.magento`       | Escape a string for safe inline JavaScript output |
| `__.magento`             | Wrap a string in Magento's translation function   |
| `getUrl.magento`         | Generate a store URL from a route path            |
| `getChildHtml.magento`   | Render a child block by name                      |
| `getData.magento`        | Get a data value from the current block           |
| `header.magento`         | Standard phtml file header                        |
| `registration.magento`   | Module registration.php                           |
| `script.magento`         | Inline script block using SecureHtmlRenderer      |
| `style.magento`          | Inline style tag using SecureHtmlRenderer         |
| `argumentClass.magento`  | Base class implementing ArgumentInterface         |

</details>

<details><summary>Hyvä</summary>

| Prefix                          | Description                                            |
| ------------------------------- | ------------------------------------------------------ |
| `header.hyva`                   | Standard phtml file header with Hyvä imports           |
| `icon.hyva`                     | Render a custom SVG icon via the svgicons ViewModel   |
| `lucideIcon.hyva`               | Render a Lucide SVG icon via the lucideIcons ViewModel |
| `viewModel.hyva`                | Require a ViewModel from the ViewModelRegistry         |
| `dispatchMessage.hyva.js`       | Show a UI message via dispatchMessages                 |
| `privateContent.hyva.js`        | Listen for the private-content-loaded event            |
| `reloadCustomerSection.hyva.js` | Dispatch reload-customer-section-data event            |
| `formatPrice.hyva.js`           | Format a number as a store price string                |
| `script.hyva`                   | CSP inline script block with Alpine component          |

</details>

### XML

<details><summary>Layout</summary>

| Prefix                              | Description                                   |
| ----------------------------------- | --------------------------------------------- |
| `page.layout.magento`               | Base page layout XML structure                |
| `block.layout.magento`              | Declare a block with class, name and template |
| `container.layout.magento`          | Declare a layout container                    |
| `referenceBlock.layout.magento`     | Reference an existing block                   |
| `referenceContainer.layout.magento` | Reference an existing container               |
| `move.layout.magento`               | Move a block or container                     |
| `remove.layout.magento`             | Remove an existing block                      |
| `update.layout.magento`             | Include another layout handle                 |
| `arg.layout.magento`                | Pass a string argument to a block             |
| `argBool.layout.magento`            | Pass a boolean argument to a block            |
| `argArray.layout.magento`           | Pass an array argument to a block             |
| `item.layout.magento`               | A single item inside an array argument        |
| `viewModel.layout.magento`          | Inject a ViewModel into a block               |
| `css.layout.magento`                | Include a CSS file from a module              |
| `js.layout.magento`                 | Include a JS file from a module               |
| `font.layout.magento`               | Preload a font file from a module             |

</details>

<details><summary>System (system.xml)</summary>

| Prefix                   | Description                     |
| ------------------------ | ------------------------------- |
| `config.system.magento`  | Root system.xml config wrapper  |
| `tab.system.magento`     | Declare a system config tab     |
| `section.system.magento` | Declare a system config section |
| `group.system.magento`   | Declare a system config group   |
| `field.system.magento`   | Declare a system config field   |
| `depends.system.magento` | Add a depends block to a field  |

</details>

<details><summary>Dependency Injection (di.xml)</summary>

| Prefix                   | Description                             |
| ------------------------ | --------------------------------------- |
| `config.di.magento`      | Root di.xml config wrapper              |
| `type.di.magento`        | Declare a type for plugins or arguments |
| `plugin.di.magento`      | Declare a plugin for a type             |
| `preference.di.magento`  | Override a class with a preference      |
| `virtualType.di.magento` | Declare a virtual type                  |

</details>

<details><summary>Module (module.xml)</summary>

| Prefix                  | Description                                          |
| ----------------------- | ---------------------------------------------------- |
| `config.module.magento` | Root module.xml with module declaration and sequence |

</details>

### LESS

<details><summary>Magento</summary>

| Prefix                | Description                                 |
| --------------------- | ------------------------------------------- |
| `@mq.mobile.magento`  | Magento LESS media query for mobile styles  |
| `@mq.desktop.magento` | Magento LESS media query for desktop styles |

</details>


## Contributing

Contributions are welcome. For larger changes, open an issue first to discuss what you have in mind.

1. Fork the repository.
2. Clone your fork.
3. Make your changes.
4. Test in Zed using the developer install steps.
5. Submit a pull request.

## License

Copyright © 2026 GrimLink. Released under the [MIT License](LICENSE).
