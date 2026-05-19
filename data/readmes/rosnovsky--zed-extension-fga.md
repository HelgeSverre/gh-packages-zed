# FGA Syntax Highlighting Extension for Zed

A comprehensive syntax highlighting extension for OpenFGA authorization model files in the [Zed](https://zed.dev) editor. This extension uses the [tree-sitter-fga](https://github.com/matoous/tree-sitter-fga) grammar under the hood (thank you!).

![screenshot of a code snippet with syntax highlighting](./screenshot.png)

## Features

This extension provides syntax highlighting Open Fine-Grained Authorization (OpenFGA) model files.

- **Keywords**: `model`, `schema`, `type`, `relations`, `define`, `from`, `extend`, `module`, `condition`
- **Operators**: Logical (`and`, `or`, `but not`), mathematical (`+`, `-`, `*`, `/`, `%`), comparison (`==`, `!=`, `<`, `<=`, `>`, `>=`), bitwise (`<<`, `>>`, `&`, `^`, `|`)
- **Types**: Built-in types (`string`, `int`, `map`, `uint`, `list`, `timestamp`, `bool`, `duration`, `double`, `ipaddress`)
- **Direct relationships**: `[user]`, `[admin, moderator]`
- **Wildcard references**: `[user:*]`
- **Relation references**: `[organization#member]`
- **Indirect relations**: `viewer from parent`
- **Conditional access**: `[user with security_clearance]`
- **Complex expressions**: Multiple operators with proper precedence

## Installation

1. Open Zed editor
2. Open the command palette (`Cmd+Shift+P` on macOS, `Ctrl+Shift+P` on Linux/Windows)
3. Type and select "zed: extensions"
4. Search for "OpenFGA"
5. You already know, don't you? ;)

## Supported File Extensions

- `.fga` - OpenFGA model files

## Examples

### Basic Authorization Model

```fga
model
  schema 1.1

type user

type document
  relations
    define owner: [user]
    define editor: [user] or owner
    define viewer: [user] or editor
    define can_read: viewer
    define can_write: editor
    define can_delete: owner
```

### Advanced Model with Conditions

```fga
model
  schema 1.1

type organization
  relations
    define admin: [user]
    define member: [user, user:*] or admin

type document
  relations
    define owner: [user]
    define editor: [user, organization#member]
    define restricted_viewer: [user with security_clearance]
    define can_read: owner or editor or restricted_viewer
    define can_write: (owner or editor) but not restricted_viewer

condition security_clearance(user: user) {
  user.clearance_level >= 3 && user.department == "security"
}
```

### Module Structure

```fga
module user_management

type user
  relations
    define active: [user]
    define can_login: active but not suspended

condition active_user(user: user) {
  user.status == "active" && user.last_login > timestamp.now() - duration("30d")
}
```

## Resources

- [OpenFGA Documentation](https://openfga.dev/)
- [OpenFGA Configuration Language](https://openfga.dev/docs/configuration-language)
- [Tree-sitter FGA Grammar](https://github.com/matoous/tree-sitter-fga)
- [Zed Extension Documentation](https://zed.dev/docs/extensions)

## License

This extension is released under the same license terms as the underlying [tree-sitter-fga](https://github.com/matoous/tree-sitter-fga).
