# OpenType™ Feature Zed Extension

- Tree Sitter: [tree-sitter-opentype-fea](https://github.com/mishamyrt/tree-sitter-opentype-fea)

## Configuration

To support matching extensions other than `fea` you can add [`file_types`](https://zed.dev/docs/configuring-zed#file-types) to your Zed project or user settings:

```json
{
  "file_types": {
    "OpenType Feature": ["*.cls"]
  }
}
```

## References

- [OpenType™ Feature File Specification](https://adobe-type-tools.github.io/afdko/OpenTypeFeatureFileSpecification.html)
