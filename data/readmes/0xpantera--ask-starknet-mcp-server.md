# Ask Starknet MCP Extension for Zed

A Zed extension that exposes the [ask-starknet](https://github.com/KasarLabs/ask-starknet) MCP server as a context server, enabling AI assistants to interact with the Starknet blockchain directly from Zed.

## Features

- Query Starknet blockchain data (blocks, transactions, account balances)
- Deploy and interact with smart contracts
- Access to all ask-starknet MCP tools through Zed's AI assistant
- Configurable LLM providers (Anthropic Claude, OpenAI, Google Gemini)

## Prerequisites

- [Zed Editor](https://zed.dev)
- Node.js ≥ 18
- The [ask-starknet](https://github.com/KasarLabs/ask-starknet) repository built locally

## Installation

1. **Build ask-starknet:**
   ```bash
   git clone https://github.com/KasarLabs/ask-starknet
   cd ask-starknet
   pnpm install
   pnpm -w build
   ```

2. **Install the extension in Zed:**
   - Clone this repository
   - In Zed: **Extensions → Ask Starknet MCP**
   - Select install

3. **Configure settings in Zed** (`Cmd/Ctrl + ,`):
   ```json
   {
     "context_servers": {
       "ask-starknet-mcp": {
         "enabled": true,
         "settings": {
           "ask_starknet_path": "/absolute/path/to/ask-starknet",
           "anthropic_api_key": "sk-ant-...",
           "starknet_rpc_url": "https://starknet-mainnet.public.blastapi.io",
           "starknet_account_address": "0x...",
           "starknet_private_key": "0x..."
         }
       }
     }
   }
   ```

## Configuration

### Required Settings

- `ask_starknet_path`: Absolute path to your ask-starknet repository
- At least one LLM API key:
  - `anthropic_api_key`: For Claude models (recommended)
  - `gemini_api_key`: For Google Gemini models
  - `openai_api_key`: For OpenAI models

### Optional Settings

- `starknet_rpc_url`: Starknet RPC endpoint
- `starknet_account_address`: Your Starknet account address
- `starknet_private_key`: Your account private key (for transactions)
- `model_name`: Specific model to use (defaults based on API key)

## Usage

1. Open the **Agent Panel** in Zed (`View → Agent Panel`)
2. Enable the "Ask Starknet" context server for your assistant
3. Ask Starknet-related questions:
   - "What's the current block number?"
   - "Check the balance of address 0x..."
   - "Deploy a simple storage contract"

## Troubleshooting

- **"ask_starknet_path not found"**: Ensure the path is absolute and points to your built ask-starknet repo
- **"index.js not found"**: Run `pnpm -w build` in the ask-starknet directory
- **"At least one LLM API key required"**: Set a valid API key in your settings
- **Process not starting**: Run `zed --foreground` to see detailed logs

## Development

```bash
# Build the extension
cargo clean
cargo build --target wasm32-wasi --release

# Or use Zed's rebuild button in Extensions
```

## License

MIT - See [LICENSE](LICENSE) file for details.
