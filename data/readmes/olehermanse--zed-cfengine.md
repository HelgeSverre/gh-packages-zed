# CFEngine extension for Zed editor

This extension adds syntax highlighting for CFEngine policy language files (`.cf`) to the Zed editor.
In the future it could be updated to add indentation / code formatting, linting, and autocomplete suggestions.

It uses the tree-sitter grammar from this repo:

https://github.com/olehermanse/tree-sitter-cfengine

## Releasing a new version

1. Make your changes, commit them and push them.
   Including:
   - Update the grammar by changing the commit SHA at [`./extension.toml`](./extension.toml).
     - Grammar changes often require changes in [`./languages/cfengine/highlights.scm`](./languages/cfengine/highlights.scm).
   - Set the version number at [`./extension.toml`](./extension.toml)
2. Tag & release with GitHub UI.
   Tag / release name should match the version number set in the last commit.
3. Submit a PR to the extensions repo to update the version: https://github.com/zed-industries/extensions/pull/5318
   That PR must update both the version number in their `extensions.toml`, and the submodule commit SHA.
