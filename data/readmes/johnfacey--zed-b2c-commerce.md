# Salesforce Agentforce Commerce (B2C Commerce Cloud) - Zed Extension

A comprehensive Zed editor extension for Salesforce Agentforce Commerce (formerly Salesforce Commerce Cloud) development. This extension provides integrated B2C CLI support, ISML/SFRA syntax highlighting, code snippets, and task automation.

## Features

### 🚀 B2C CLI Integration
- Direct B2C CLI command execution from Zed
- Code version deployment and management
- MRT (Managed Runtime) bundle management
- Job execution and monitoring
- SLAS client management
- WebDAV file operations
- Site import/export automation

### 📝 Language Support
- **ISML** (InterServer Markup Language) syntax highlighting
- **SFRA** JavaScript support with B2C-specific snippets
- Auto-formatting for B2C template files
- Syntax validation for ISML constructs

### 💡 Code Snippets
Includes 20+ pre-configured snippets for:
- ISML control structures (loops, conditionals)
- SCAPI HTTP requests
- Logger configuration
- Site preferences
- Custom objects
- Transactions
- B2C CLI commands

### 🔧 Built-in Tasks
Quick access to common B2C operations:
- Deploy code versions
- Activate code versions
- Push MRT bundles
- Deploy MRT bundles
- Run jobs
- Import/export site archives

## Installation

### Prerequisites
- **Zed** editor (latest version)
- **Rust** (via rustup) for building dev extensions
- **Node.js** >= 22.16.0
- **B2C CLI** installed globally or available via `npx`

### Option 1: Install from Zed Extension Gallery
1. Open Zed
2. Press `Cmd+Shift+X` (macOS) or `Ctrl+Shift+X` (Linux/Windows)
3. Search for "B2C Commerce Cloud"
4. Click "Install"

### Option 2: Install as Dev Extension
```bash
# Clone the extension repository
git clone https://github.com/salesforcecommercecloud/zed-b2c-commerce
cd zed-b2c-commerce

# Build the extension
cargo build --release

# Install as dev extension in Zed
# In Zed: Cmd+Shift+X > Install Dev Extension > Select this directory
```

### Option 3: Manual Installation
```bash
# macOS
cp -r zed-b2c-commerce ~/Library/Application\ Support/Zed/extensions/

# Linux
cp -r zed-b2c-commerce ~/.local/share/zed/extensions/

# Windows
xcopy zed-b2c-commerce %LOCALAPPDATA%\Zed\extensions\
```

## Configuration

### B2C CLI Authentication

Configure your B2C credentials using environment variables:

```bash
# Set B2C instance configuration
export SFCC_REALM_ID=zzte
export SFCC_INSTANCE_ID=001
export SFCC_SCAPI_SHORTCODE=kv7kzm78

# Or use OAuth credentials
export SFCC_CLIENT_ID=your_client_id
export SFCC_CLIENT_SECRET=your_client_secret
```

### Zed Settings

Add to your `settings.json`:

```json
{
  "b2c_commerce": {
    "enable_linting": true,
    "auto_format_isml": true,
    "show_b2c_hints": true,
    "default_server": "your-instance.demandware.net",
    "default_code_version": "dev"
  }
}
```

## Usage

### Using Code Snippets

1. Start typing a snippet prefix:
   - `isml-loop` - ISML loop statement
   - `isml-if` - ISML conditional
   - `scapi-getrequest` - HTTP GET request
   - `logger` - Logger instance
   - `b2c-deploy` - Code deployment command

2. Press Tab or Enter to expand
3. Use Tab to navigate through placeholders

### Running B2C CLI Commands

#### Option 1: Using Built-in Tasks
1. Press `Cmd+Shift+B` (macOS) or `Ctrl+Shift+B` (Linux/Windows)
2. Select a B2C task:
   - "B2C: Deploy Code"
   - "B2C: Push MRT Bundle"
   - "B2C: Run Job"
   - etc.

#### Option 2: Using Command Palette
1. Press `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Linux/Windows)
2. Type "B2C:" to see available commands
3. Select desired operation

#### Option 3: Terminal Integration
Execute directly in Zed's integrated terminal:

```bash
# Deploy code version
b2c code deploy --server my-instance.demandware.net --code-version v1

# Watch and sync changes
b2c code watch

# Activate code version
b2c code activate v1

# Run a job
b2c job run ImportXML --wait

# Push MRT bundle
b2c mrt push --project my-storefront --environment staging

# List SLAS clients
b2c slas client list

# WebDAV file operations
b2c webdav ls /cartridges
```

### Working with ISML Files

#### Syntax Highlighting
ISML files (`.isml`) automatically get syntax highlighting for:
- ISML tags and attributes
- Variable interpolation `${...}`
- Control structures
- Embedded HTML

#### Auto-formatting
Format ISML files:
1. Open ISML file
2. Press `Cmd+Shift+I` (macOS) or `Ctrl+Shift+I` (Linux/Windows)
3. Auto-formatting applies formatting standards

### JavaScript/SFRA Development

Use B2C-specific code snippets:

```javascript
// Logger
logger
// Expands to:
var logger = dw.system.Logger.getLogger('module', 'component');
logger.debug('message');

// Site Preference
sitepref
// Expands to:
var prefValue = dw.system.Site.current().getPreferences().get('preferenceId');

// Transaction
transaction
// Expands to:
dw.system.Transaction.wrap(function() {
    // code
});
```

## Common Workflows

### Deploy Code Changes

```bash
# 1. Make code changes
# 2. Deploy to sandbox
b2c code deploy --server sandbox.demandware.net --code-version dev

# 3. Monitor deployment
b2c code list

# 4. Activate when ready
b2c code activate dev
```

### MRT Deployment

```bash
# 1. Push bundle
b2c mrt push --project my-storefront --environment staging

# 2. List bundles
b2c mrt bundle list --project my-storefront

# 3. Deploy to environment
b2c mrt deploy --bundle-id <bundle-id> --environment staging

# 4. Verify deployment
b2c mrt env list --project my-storefront
```

### Site Import/Export

```bash
# Export current configuration
b2c job export --global-data meta_data

# Import from file
b2c job import ./site-data.zip

# Monitor job status
b2c job search --status RUNNING
```

### WebDAV Operations

```bash
# Browse cartridges
b2c webdav ls /cartridges

# Upload file
b2c webdav put local-file.txt /remote/path/

# Download file
b2c webdav get /remote/path/file.txt ./local/path

# Create backup archive
b2c webdav zip /cartridges my-backup.zip
```

## Keyboard Shortcuts

| Action | macOS | Linux/Windows |
|--------|-------|---------------|
| Open Command Palette | `Cmd+Shift+P` | `Ctrl+Shift+P` |
| Open Extensions | `Cmd+Shift+X` | `Ctrl+Shift+X` |
| Run Task | `Cmd+Shift+B` | `Ctrl+Shift+B` |
| Format Document | `Cmd+Shift+I` | `Ctrl+Shift+I` |
| Open Terminal | `Ctrl+` | `Ctrl+` |
| Show Hover Info | `Cmd+K Cmd+I` | `Ctrl+K Ctrl+I` |

## Troubleshooting

### B2C CLI Not Found
If you see "B2C CLI not found" error:

```bash
# Install globally
npm install -g @salesforce/b2c-cli

# Or verify npx can find it
npx @salesforce/b2c-cli --version
```

### Authentication Issues
Verify credentials are properly set:

```bash
# Test B2C CLI authentication
b2c auth info

# Re-authenticate if needed
b2c auth login --client-id YOUR_CLIENT_ID --client-secret YOUR_SECRET
```

### ISML Syntax Highlighting Not Working
1. Verify file extension is `.isml`
2. Check language is set to ISML:
   - Click language indicator in status bar
   - Select "ISML"

### Performance Issues
If extension is slow:
1. Disable large file linting in settings
2. Clear Zed cache: `rm -rf ~/.config/zed/`
3. Rebuild extension: `cargo clean && cargo build --release`

## Development

### Building from Source

```bash
# Clone repository
git clone https://github.com/salesforcecommercecloud/zed-b2c-commerce
cd zed-b2c-commerce

# Install dependencies
cargo fetch

# Build extension
cargo build --release

# Run tests
cargo test
```

### Project Structure

```
zed-b2c-commerce/
├── extension.toml          # Extension manifest
├── Cargo.toml              # Rust dependencies
├── src/
│   └── lib.rs              # Main extension code
├── grammars/
│   └── isml.plist          # ISML syntax grammar
├── snippets/
│   └── b2c.json            # Code snippets
└── README.md               # This file
```

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with `cargo test`
5. Submit a pull request

## Resources

- [Salesforce B2C Commerce Developer Documentation](https://developer.salesforce.com/docs/commerce/b2c-commerce/overview)
- [B2C CLI GitHub Repository](https://github.com/SalesforceCommerceCloud/b2c-developer-tooling)
- [B2C Developer Tooling Guide](https://salesforcecommercecloud.github.io/b2c-developer-tooling/)
- [Zed Editor Documentation](https://zed.dev/docs)
- [ISML Reference Guide](https://salesforcecommercecloud.github.io/b2c-dev-doc/)

## Support

- **Issues & Bugs**: [GitHub Issues](https://github.com/salesforcecommercecloud/zed-b2c-commerce/issues)
- **Discussions**: [GitHub Discussions](https://github.com/salesforcecommercecloud/zed-b2c-commerce/discussions)
- **Slack Community**: [Salesforce Commerce Cloud Community](https://slack.com)

## License

This extension is licensed under the Apache License 2.0. See [LICENSE](LICENSE) for details.

## Changelog

### v0.1.0 (Initial Release)
- ✅ ISML syntax highlighting
- ✅ SFRA JavaScript support
- ✅ 20+ code snippets
- ✅ B2C CLI task integration
- ✅ Built-in task runners
- ✅ WebDAV file operations support
- ✅ MRT deployment management
- ✅ Job execution monitoring

## Acknowledgments

Built for the Salesforce Commerce Cloud developer community by the Salesforce Innovation team.

---

**Note**: This extension is in Developer Preview and provided "as-is" without warranty. Not for production use until GA release.
