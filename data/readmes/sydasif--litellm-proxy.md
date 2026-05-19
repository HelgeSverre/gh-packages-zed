# 🚀 AI Proxy Gateway

[![LiteLLM](https://img.shields.io/badge/Powered%20by-LiteLLM-blueviolet?style=for-the-badge)](https://github.com/BerriAI/litellm)
[![Bifrost](https://img.shields.io/badge/Powered%20by-Bifrost-4285F4?style=for-the-badge)](https://github.com/maximhq/bifrost)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-D97757?style=for-the-badge&logo=anthropic&logoColor=white)](https://claude.com/product/claude-code)
[![OpenCode](https://img.shields.io/badge/OpenCode-007ACC?style=for-the-badge)](https://opencode.ai)
[![Google Gemini](https://img.shields.io/badge/Backend-Google%20Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

A high-performance proxy gateway that seamlessly maps `opencode` and `claude` code CLI to Google's `Gemma 4` models using LiteLLM and Bifrost, allowing you to leverage the power and cost-efficiency of `Gemma 4` models.

---

## ✨ Features

- 🐳 **Docker Native**: Official images, no build step — instant deployment.
- ⚙️ **Dual-Proxy Architecture**: LiteLLM proxy for Claude + Bifrost proxy for OpenCode. These can run simultaneously (Active-Active) or be managed as a primary/standby pair.
- 🔐 **Secure**: Environment-based API key management with unified key approach.
- 🔀 **Flexible**: Separate services with independent configuration and scaling.

---

## 📂 Project Structure

```
litellm-proxy/
├── docker-compose.yml
├── .env              # API keys
├── .gitignore
├── AGENTS.md
├── README.md
├── bifrost/
│   └── data/         # OpenCode data directory
└── litellm/
    └── config.yaml   # Unified model mappings
```

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Docker Desktop](https://docs.docker.com/get-docker/) or Docker Engine
- [Docker Compose](https://docs.docker.com/compose/install/)
- A **Gemini API Key** from [Google AI Studio](https://aistudio.google.com/)

---

## 🚀 Quick Start

### 1. Configure Environment

```bash
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY value
```

### 2. Deploy Proxy

```bash
./scripts/manage.sh up
```

- LiteLLM proxy (for Claude) is now running at `http://localhost:4000`
- Bifrost proxy (for OpenCode) is now running at `http://localhost:8080`

---

## 🛠️ Management

Use the provided management script for common operations:

```bash
./scripts/manage.sh [command]
```

| Command   | Action                         |
| :-------- | :----------------------------- |
| `up`      | Start all services             |
| `down`    | Stop and remove all services   |
| `restart` | Restart all services           |
| `logs`    | Follow logs for all services   |
| `health`  | Check health of all services   |
| `update`  | Pull latest images and restart |
| `status`  | Show container status          |

---

## 🤖 Using with OpenCode

To redirect `opencode` to your local Bifrost proxy, update your global `opencode.json` file:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "bifrost": {
      "name": "Bifrost",
      "options": {
        "baseURL": "http://localhost:8080/v1"
      },
      "models": {
        "gemini/gemma-4-31b-it": {
          "name": "Gemma-4-31b"
        },
        "gemini/gemma-4-26b-a4b-it": {
          "name": "Gemma-4-26b"
        },
        "gemini/gemini-3.1-flash-lite-preview": {
          "name": "Gemini-3.1-flash-lite"
        }
      }
    }
  }
}
```

---

## 🤖 Using with Claude Code

To redirect `claude` to your local LiteLLM proxy, update your global `settings.json` file:

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:4000/",
    "ANTHROPIC_AUTH_TOKEN": "sk-xxx",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "gemma-4-31b-it",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "gemini-3.1-flash-lite-preview",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "gemma-4-26b-a4b-it"
  }
}
```

---

## 🔧 Docker Customization

If you need to change the default ports, modify the `ports` section in `docker-compose.yml`:

```yaml
services:
  litellm:
    ports:
      - "4001:4000" # Maps port 8080 on your host to 4000 in the container
  bifrost:
    ports:
      - "8081:8080" # Maps port 8081 on your host to 8080 in the container
```

After changing the ports, restart the proxy:

```bash
docker compose down
docker compose up -d
```

---

## 🛠️ Deployment Modes

By default, this gateway operates in **Active-Active** mode, where both proxies run simultaneously to serve different clients. However, you can manage them as a **Primary/Standby** pair if you wish to conserve resources or isolate traffic.

### 1. Active-Active (Default)

Both Bifrost and LiteLLM are running. Use this if you are using both `opencode` and `claude` CLI tools.

```bash
docker compose up -d
```

### 2. Primary/Standby (Manual)

Use this to run only one proxy at a time.

**Run Bifrost as Active (LiteLLM Standby):**

```bash
docker compose stop litellm
docker compose up -d bifrost
```

**Switch to LiteLLM as Active (Bifrost Standby):**

```bash
docker compose stop bifrost
docker compose up -d litellm
```

---

| Action                     | Command                                       |
| :------------------------- | :-------------------------------------------- |
| **Start All**              | `docker compose up -d`                        |
| **Stop All**               | `docker compose down`                         |
| **View Logs (All)**        | `docker compose logs -f`                      |
| **View Logs (LiteLLM)**    | `docker compose logs -f litellm`              |
| **View Logs (Bifrost)**    | `docker compose logs -f bifrost`              |
| **Restart**                | `docker compose restart`                      |
| **Update Image**           | `docker compose pull && docker compose up -d` |
| **Health Check (LiteLLM)** | `curl http://localhost:4000/health`           |
| **Health Check (Bifrost)** | `curl http://localhost:8080/health`           |

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details (or MIT if not provided).

---

<p align="center">Made with ❤️ for the AI community</p>
