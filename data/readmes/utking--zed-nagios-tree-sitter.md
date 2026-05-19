# tree-sitter-nagios

A [Tree-sitter](https://tree-sitter.github.io/) grammar for [Nagios](https://www.nagios.org/) configuration files (`.cfg`), with a bundled [Zed](https://zed.dev) extension for syntax highlighting.

## What gets highlighted

| Element | Example |
|---|---|
| `define` keyword | `define host {` |
| Object types | `host`, `service`, `command`, `timeperiod`, … |
| Directive names | `host_name`, `check_command`, `contact_groups` |
| `$MACRO$` variables | `$HOSTADDRESS$`, `$USER1$`, `$ARG1$` |
| Resource macros | `$USER1$=/usr/local/nagios/plugins` |
| Comments | `# comment`, `; comment` |
| Settings (nagios.cfg) | `log_file=/var/log/nagios/nagios.log` |

## Installing in Zed

### Steps

1. **Clone this repository** anywhere on your machine:

   ```sh
   git clone https://github.com/utking/zed-nagios-tree-sitter.git
   cd zed-nagios-tree-sitter
   ```

2. **Open Zed** and open the Command Palette:
   - macOS: `Cmd+Shift+P`
   - Linux: `Ctrl+Shift+P`

3. **Run `zed: install dev extension`** and select the folder containing `extension.toml`.

4. Open any `.cfg` file — the status bar at the bottom right of Zed should show
   **Nagios** as the language, and syntax highlighting should be active.

> **Note:** Dev extensions stay loaded across Zed restarts. To remove it, go to
> **Extensions** panel → find "Nagios" → click **Uninstall**.

## Installing from the Zed extensions registry

> This will be available once the extension is submitted to the registry.

Open the Command Palette and run `zed: extensions`, search for **Nagios**, and click **Install**.

## Grammar development

### Prerequisites

```sh
npm install
```

### Edit and regenerate

After editing `grammar.js`, regenerate the parser, commit, push, then sync the rev:

```sh
npx tree-sitter generate
git add src/ && git commit -m "Update grammar" && git push
./update-rev.sh   # updates extension.toml rev, commits, and pushes
```

Then reload the extension in Zed: `Cmd+Shift+P` → `zed: reload extensions`.

### Run tests

```sh
npx tree-sitter test
```

### Parse a file

```sh
npx tree-sitter parse /etc/nagios/objects/hosts.cfg
```

After regenerating, reload the Zed window to pick up the new parser.

## File structure

```
├── grammar.js                  # Grammar definition (edit this)
├── src/
│   └── parser.c                # Generated C parser (commit this)
├── queries/
│   └── highlights.scm          # Generic highlight queries
├── languages/nagios/
│   ├── config.toml             # Zed language configuration
│   └── highlights.scm          # Zed highlight queries
├── test/corpus/
│   └── basic.txt               # Tree-sitter test cases
└── extension.toml              # Zed extension manifest
```

## Supported syntax

The grammar covers Nagios object configuration files:

```nagios
# Object definitions
define host {
    host_name       web-server-01
    alias           Production Web Server
    address         192.168.1.100
    use             linux-server
    hostgroups      web-servers,linux-servers
    contact_groups  admins
}

define command {
    command_name    check_http
    command_line    $USER1$/check_http -H $HOSTADDRESS$ -w 5 -c 10
}

define timeperiod {
    timeperiod_name 24x7
    alias           24 Hours A Day, 7 Days A Week
    sunday          00:00-24:00
    monday          00:00-24:00
}
```

And `nagios.cfg`-style key=value settings:

```
log_file=/var/log/nagios/nagios.log
cfg_dir=/etc/nagios/objects
check_result_reaper_frequency=10
```

And resource macro files (`resource.cfg`):

```
$USER1$=/usr/local/nagios/plugins
$USER2$=/usr/local/nagios/libexec
```
