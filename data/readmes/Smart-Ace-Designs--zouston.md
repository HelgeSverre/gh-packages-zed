# Zouston
An [Astro Houston](https://github.com/withastro/houston-vscode) inspired theme for the Zed editor.

<p align="center">
  <img width="1460" height="654" alt="Zouston vs Houston" src="https://github.com/user-attachments/assets/7c030825-f221-4c21-abe5-d9fb8ae10a7d" />
  <br>
  <em>Left: Zouston (Zed) — Right: Houston (VS Code)</em>
</p>

## Enhancements Needed
- **Fix color of destructured identifiers** (`title`, `description`)  
  These are binding identifiers created by object destructuring and should match Houston’s variable color.

- **Fix color of the `Astro` namespace identifier**  
  `Astro` is a namespace / module object and should receive the same color Houston applies to global framework objects.

- **Fix color of Astro (and other framework) components within the _Component Template_ section**  
  Imported components, such as `ClientRouter`, should receive the same color Houston applies to these components.
