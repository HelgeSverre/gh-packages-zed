# Iconify for Zed

[![Zed extension badge](https://zedbadge.dev/chart/iconify-lsp.svg)](https://zed.dev/extensions/iconify-lsp)  
*Made with 💙 [ZedBadge.dev](https://zedbadge.dev/) 💙*

[Iconify](https://iconify.design/) icon name completion and hover previews, powered by [iconify-lsp](https://github.com/PleahMaCaka/iconify-lsp).

## Icon string

```svelte
<Icon icon="lucide:eye-off" />
```

![Hover preview of an icon string](assets/hover-icon.png)

## Variable

```svelte
<script lang="ts">
  const overlay = $derived(linked ? "lucide:link-2" : "lucide:arrow-up-right")
</script>

<Icon icon={overlay} />
```

![Hover preview of a variable](assets/hover-variable.png)

Values returned from functions are found too.

```ts
const overlay = $derived.by(() => {
  if (item.link) {
    return "lucide:link-2"
  }

  return isShortcut(item) ? "lucide:arrow-up-right" : null
})
```

![Hover preview of a function value](assets/hover-derived.png)

## Settings

The first start downloads `@iconify/json` (about 100 MB). Icon sets installed in the project as `@iconify-json/*` or `@iconify/json` take priority.

```json
{
  "lsp": {
    "iconify-lsp": {
      "initialization_options": {
        "color": "#ffffff"
      }
    }
  }
}
```

## Author

[![Zed author badge](https://zedbadge.dev/author/pleahmacaka.svg)](https://zedbadge.dev/)

## License

[MIT](./LICENSE)
