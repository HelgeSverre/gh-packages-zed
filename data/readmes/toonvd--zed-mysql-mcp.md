# MySQL MCP Server for Zed

A [Zed](https://zed.dev) extension that integrates MySQL database access through the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/), powered by [@benborla29/mcp-server-mysql](https://github.com/benborla/mcp-server-mysql).

This extension enables Zed's AI assistant to inspect database schemas, execute SQL queries, and interact with your MySQL databases.

## Features

- **Direct MySQL Connection** — Connect to local or remote MySQL instances via host/port or Unix socket
- **Read & Write Operations** — Read-only by default; optionally enable INSERT, UPDATE, DELETE, and DDL
- **Multi-Database Mode** — Query across multiple databases when no specific database is set
- **SSL/TLS Encryption** — Secure your database connections
- **Connection Pooling** — Configurable pool size for performance


## Requirements

- **Zed** editor (latest version recommended)
- **Node.js** v20 or higher
- **MySQL** 5.7 or higher (MySQL 8.0+ recommended)
- A MySQL user with appropriate permissions

## Installation

1. Open Zed
2. Go to **Extensions** (`cmd+shift+x` on macOS)
3. Search for **"MySQL MCP Server"**
4. Click **Install**

## Configuration

After installing the extension, configure it in your Zed settings (`cmd+,`):

### Basic Connection

```json
{
  "context_server": {
    "mcp-server-mysql": {
      "source": "extension",
      "enabled": true,
      "settings": {
        "mysql_host": "127.0.0.1",
        "mysql_port": "3306",
        "mysql_user": "root",
        "mysql_pass": "your_password",
        "mysql_db": "your_database"
      }
    }
  }
}
```

### Connecting to Remote Databases via SSH Tunnel

If your MySQL database is on a remote server that isn't publicly accessible, you can use an SSH tunnel. This is managed outside of the extension so you can tailor it to each project's needs.

**1. Open a terminal and start the tunnel:**

```bash
ssh -L 3307:localhost:3306 user@remote-host -N
```

This forwards local port `3307` to the remote MySQL port `3306` through the SSH connection. Add `-f` to run it in the background:

```bash
ssh -fNL 3307:localhost:3306 user@remote-host
```

**2. Configure the extension to connect through the tunnel:**

```json
{
  "context_server": {
    "mcp-server-mysql": {
      "source": "extension",
      "enabled": true,
      "settings": {
        "mysql_host": "127.0.0.1",
        "mysql_port": "3307",
        "mysql_user": "remote_db_user",
        "mysql_pass": "remote_db_password",
        "mysql_db": "remote_database"
      }
    }
  }
}
```

### Unix Socket Connection

For local MySQL instances using Unix sockets:

```json
{
  "context_server": {
    "mcp-server-mysql": {
      "source": "extension",
      "enabled": true,
      "settings": {
        "mysql_socket_path": "/tmp/mysql.sock",
        "mysql_user": "root",
        "mysql_pass": "your_password",
        "mysql_db": "your_database"
      }
    }
  }
}
```

### Full Configuration Reference

| Setting | Default | Description |
|---|---|---|
| **Connection** | | |
| `mysql_host` | `127.0.0.1` | MySQL server host |
| `mysql_port` | `3306` | MySQL server port |
| `mysql_user` | `root` | MySQL username |
| `mysql_pass` | `""` | MySQL password |
| `mysql_db` | `""` | Database name (empty = multi-DB mode) |
| `mysql_socket_path` | `""` | Unix socket path (overrides host/port) |
| **Security** | | |
| `allow_insert_operation` | `false` | Enable INSERT operations |
| `allow_update_operation` | `false` | Enable UPDATE operations |
| `allow_delete_operation` | `false` | Enable DELETE operations |
| `allow_ddl_operation` | `false` | Enable DDL (CREATE, ALTER, DROP) |
| `mysql_ssl` | `false` | Enable SSL/TLS encryption |
| **Performance** | | |
| `mysql_pool_size` | `10` | Connection pool size |
| `mysql_query_timeout` | `30000` | Query timeout (ms) |
| `mysql_cache_ttl` | `60000` | Cache TTL (ms) |


## Usage

Once configured, the MySQL MCP server provides the following tool to the AI assistant:

### `mysql_query`

Execute SQL queries against the connected database.

**Examples you can ask the assistant:**

- *"Show me all tables in the database"*
- *"Describe the schema of the users table"*
- *"Find all orders from the last 7 days"*
- *"What are the foreign key relationships in this database?"*

### Multi-Database Mode

When `mysql_db` is left empty, the assistant can query any database the MySQL user has access to using fully qualified table names:

```sql
SELECT * FROM database_name.table_name;
```

## Security

⚠️ **Important:** By default, only read operations (SELECT) are allowed. Write operations must be explicitly enabled via settings. Only enable write operations if you fully trust the AI assistant with your database.

Credentials are stored in your local Zed settings file and are passed as environment variables to the MCP server process — they are never sent to any external service.

## Troubleshooting

- **Server not starting:** Ensure Node.js v20+ is installed (`node --version`)
- **Connection refused:** Verify MySQL is running and credentials are correct
- **SSH tunnel issues:** Test the tunnel manually with `ssh -L 3307:localhost:3306 user@host -N`
- **Authentication errors (MySQL 8.0+):** Ensure your user supports `caching_sha2_password`

## Development

```bash
# Clone the repository
git clone https://github.com/toonvd/zed-mysql-mcp.git
cd zed-mysql-mcp

# Build the extension
cargo build
```

## Credits

- **MCP Server:** [@benborla29/mcp-server-mysql](https://github.com/benborla/mcp-server-mysql) by Ben Borla
- **Extension structure** based on [zed-mcp-server-context7](https://github.com/akbxr/zed-mcp-server-context7) by Akbxr

## License

MIT
