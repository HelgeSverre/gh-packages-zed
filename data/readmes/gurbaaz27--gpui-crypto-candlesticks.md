# Binance KLine Tracker

A real-time BTCUSDT perpetual futures candlestick chart built with **GPUI** — the GPU-accelerated UI framework from the creators of [Zed](https://zed.dev).

![Rust](https://img.shields.io/badge/Rust-000000?style=flat&logo=rust&logoColor=white)
![GPUI](https://img.shields.io/badge/GPUI-FF6B6B?style=flat)

## What is this?

I was exploring **gpui-rs** and wanted to build something real with it — not just a hello world. This is the result: a live cryptocurrency candlestick chart that connects to Binance's WebSocket API and renders candles in real-time.

## Features

- **Live WebSocket Connection** — Streams 1-minute kline data from Binance Futures
- **Custom Candlestick Chart** — Hand-rolled candlestick rendering (gpui-component doesn't have one!)
- **Real-time Updates** — Chart updates as new price data arrives
- **Moving Averages** — MA(7), MA(25), MA(99) displayed in header
- **Dark Theme** — Binance-inspired color scheme
- **Auto-reconnect** — Handles connection drops gracefully

## Screenshot

```
┌─────────────────────────────────────────────────────────────┐
│  BTCUSDT Perpetual   91,508.81   24h Change   MA indicators │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│     ┃   ┃                                                   │
│    ▅┃  ▅┃▅  ┃                         ┃                     │
│   ▅▅┃ ▅▅┃▅▅ ┃▅    ┃  ┃               ▅┃                     │
│  ▅▅▅┃▅▅▅┃▅▅▅┃▅▅  ▅┃ ▅┃▅   ┃         ▅▅┃▅                    │
│                   ▅┃▅▅┃▅▅ ▅┃▅  ┃   ▅▅▅┃▅▅                   │
│                          ▅▅┃▅▅▅┃▅▅▅                         │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  ● Connected          Last Update: 14:32:05    Candles: 47  │
└─────────────────────────────────────────────────────────────┘
```

## Tech Stack

| Component     | Technology                                                                                        |
| ------------- | ------------------------------------------------------------------------------------------------- |
| UI Framework  | [gpui](https://crates.io/crates/gpui) + [gpui-component](https://crates.io/crates/gpui-component) |
| WebSocket     | [async-tungstenite](https://crates.io/crates/async-tungstenite) with async-std runtime            |
| Async Runtime | smol (gpui's underlying runtime)                                                                  |
| Serialization | serde + serde_json                                                                                |
| Time          | chrono                                                                                            |

## Building

```bash
# Clone and build
git clone <repo-url>
cd binance_tracker
cargo build --release

# Run
cargo run --release
```

## Why GPUI?

GPUI is fast. Like, _really_ fast. It's the framework behind Zed editor, and I wanted to see how it feels to build something from scratch with it. Turns out:

- The API is clean and declarative (feels like Tailwind meets Rust)
- Custom components are straightforward to implement
- The async story works well with `smol`/`async-std`
- Documentation is still evolving, but the codebase is readable

This was a fun weekend project to learn the framework. If you're curious about GPUI, fork this and tinker!

## Future Scope

This project started as a GPUI exploration, but there's a lot of room to grow. Some ideas on the roadmap:

- [ ] **Multi-symbol Support** — Add a symbol picker to track ETH, SOL, and other perpetuals simultaneously in tabs or split view
- [ ] **Configurable Time Intervals** — Switch between 1m, 5m, 15m, 1h, 4h, 1D candles with a dropdown selector
- [ ] **L2 Order Book Integration** — Display real-time bid/ask depth alongside the chart for better market context
- [ ] **Multi-exchange Support** — Abstract the WebSocket layer to support Bybit, OKX, Coinbase, and others
- [ ] **Historical Data & Persistence** — Store candle data in SQLite/DuckDB for backtesting and offline analysis
- [ ] **Arbitrage Scanner** — Compare prices across exchanges in real-time and highlight spread opportunities
- [ ] **Technical Indicators** — Add RSI, MACD, Bollinger Bands as toggleable overlays

PRs and ideas welcome! This is meant to be a community playground for GPUI experimentation.

## License

MIT
