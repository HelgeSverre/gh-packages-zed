# JIRA Slash Command for Zed

A [Zed editor](https://zed.dev/) extension that adds a `/jira` slash command to fetch JIRA issues and insert them as nicely formatted JSON.

## Features

- Fetch JIRA issues directly from within Zed
- Insert issue data as well-formatted JSON
- Include key issue details like summary, description, type, status, and comments
- Secure authentication using JIRA API tokens

## Installation

### From the Extension Registry

1. Open Zed
2. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux) to open the command palette
3. Type "Extensions: Install Extension"
4. Search for "JIRA Slash Command"
5. Click "Install"

### Manual Installation

```bash
git clone https://github.com/trbroyles1/jira-slash-command.git
cd jira-slash-command
cargo build --release
```

Then copy the resulting .wasm file to your Zed extensions directory.

## Configuration

This extension requires three environment variables to be set:

| Variable | Description |
|----------|-------------|
| `JIRA_URL` | Base URL for your JIRA instance (e.g., `https://your-domain.atlassian.net`) |
| `JIRA_USER` | Your JIRA username (typically your email address) |
| `JIRA_API_TOKEN` | Your JIRA API token (create one in [Atlassian Account Settings](https://id.atlassian.com/manage-profile/security/api-tokens)) |

## Usage

1. Open a workspace in Zed
2. Type `/jira` followed by the issue key:
   ```
   /jira PROJECT-123
   ```
3. Press Enter
4. The issue details will be inserted as formatted JSON

### Example Output

```json
{
  "issue_key": "PROJECT-123",
  "type": "Story",
  "summary": "Implement the new login flow",
  "description": "As a user, I want to be able to log in using my social accounts",
  "createdAt": "2023-06-15T14:53:00.000Z",
  "reporter": "Jane Smith",
  "assignee": "John Doe",
  "status": "In Progress",
  "comments": [
    {
      "timestamp": "2023-06-16T09:32:00.000Z",
      "author": "Bob Johnson",
      "body": "Should we add support for Google authentication as well?"
    }
  ]
}
```

## Requirements

- Zed v0.105.0 or higher
- Valid JIRA API credentials

## Development

### Building from Source

```bash
# Clone the repository
git clone https://github.com/trbroyles1/jira-slash-command.git

# Navigate to the directory
cd jira-slash-command

# Build the extension
cargo build --release
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the BSD-3-Clause License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- The Zed Editor team, for Zed
- [Atlassian](https://www.atlassian.com/) for the JIRA API
