# Zeta Server

A Rust server for AI-powered code completion using Ollama with the Zeta model, compatible with Zed editor.

## 📋 Requirements

- **Rust**: 1.70+ (2021 edition)
- **Ollama**: Running instance with a compatible model
- **Model**: zeta model or compatible (e.g., `hf.co/bartowski/zed-industries_zeta-GGUF:Q4_K_M`)

## 🚀 Quick Start

### 1. Start Ollama

Make sure Ollama is running with a model:

```bash
# Install and start Ollama (see https://ollama.ai)
ollama pull hf.co/bartowski/zed-industries_zeta-GGUF:Q4_K_M
```

### 2. Run the Server

```bash
cd zeta-server
cargo run
```

The server will start on `http://127.0.0.1:9000` by default.

## ⚙️ Configuration

Configure using environment variables:

```bash
# Server (defaults: 127.0.0.1:9000)
export HOST=0.0.0.0
export PORT=8080

# Ollama (defaults: http://localhost:11434)
export OLLAMA_HOST=http://localhost
export OLLAMA_PORT=11434

# Model (default: hf.co/bartowski/zed-industries_zeta-GGUF:Q4_K_M)
export MODEL_NAME=llama2:latest

# Context window size (default: 8192)
export CONTEXT_LENGTH=8192

# Logging (default: zeta_server=debug,actix_web=info)
export RUST_LOG=zeta_server=info,actix_web=info

cargo run
```

## 🌐 API Endpoints

### POST /predict_edits

Generate code predictions from edit context.

**Request Body:**

```json
{
  "input_events": "User typed: hello world",
  "input_excerpt": "fn main() {\n    // cursor here\n}",
  "outline": null,
  "speculated_output": null,
  "can_collect_data": false,
  "diagnostic_groups": []
}
```

**Response:**

```json
{
  "output_excerpt": "fn main() {\n    println!(\"hello world\");\n}",
  "request_id": "abc123def456"
}
```

**Example:**

```bash
curl -X POST http://localhost:9000/predict_edits \
  -H "Content-Type: application/json" \
  -d '{
    "input_events": "User typed: test",
    "input_excerpt": "fn main() {}"
  }'
```

### GET /health

Health check endpoint.

**Response:**

```
OK
```

**Example:**

```bash
curl http://localhost:9000/health
```

## 🧪 Testing

Run the comprehensive test suite:

```bash
# Run all tests
cargo test

# Run tests with output
cargo test -- --nocapture

# Run specific test module
cargo test domain::prediction

# Run tests in serial (useful for env var tests)
cargo test -- --test-threads=1

# Run only library tests
cargo test --lib

# Run integration tests (requires Ollama running)
cargo test -- --ignored
```

## 🏗️ Architecture

This project follows **Domain-Driven Design (DDD)** principles with clear layer separation:

### Domain Layer
- **Pure business logic** - no dependencies on external frameworks
- **Entities**: `EditContext`, `Prediction`
- **Value Objects**: `RequestId`, `Prompt`
- **Services**: `PromptBuilder`, `ModelService` (trait)

### Application Layer
- **Use Cases**: Orchestrate domain logic
- **DTOs**: Data transfer objects for API boundaries
- **Main Use Case**: `GeneratePredictionUseCase`

### Infrastructure Layer
- **Ollama Client**: Implementation of `ModelService` trait
- **Configuration**: Environment-based config
- **Observability**: Logging and metrics

### Interface Layer
- **HTTP Handlers**: Actix-web request handlers
- **Server**: HTTP server configuration and startup
- **API Routes**: RESTful endpoints

## 🔧 Development

### Watch Mode

For development with auto-reload:

```bash
# Install cargo-watch
cargo install cargo-watch

# Run with auto-reload
cargo watch -x run

# Clear screen on reload
cargo watch -c -x run
```
