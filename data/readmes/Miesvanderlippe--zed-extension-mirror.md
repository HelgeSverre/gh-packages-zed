# Zed Extension Mirror / Archiver

_This project is in no way associated with Zed itself._

Ever wanted to archive Zed extensions? Host an extension cache? Play around with the extension API? I did. This 
project is split up in several parts. 

Other goals of this project were:
- To play around with Axum.
- See what Zed is doing to install extensions.
- Write some more Rust.

## Data

The data crate contains Serde annotated models for the data the project parses and serves. 

## Client

An API client that can access a subset of the available API methods. It is based on Reqwest.

## Archiver

A CLI tool that integrates the client into an automatic downloader for Zed extensions.

## Mirror 

An Axum based HTTP API for serving archived extensions. Requires a reverse proxy that can sign traffic 
for `api.zed.dev`.

## Development scripts 

This project was (primarily) written on a Mac. The development folder contains scripts to bring up 
or down a testing environment. This redirects traffic to `api.zed.dev` to a locally running mirror instance.
It also creates and trusts a somewhat short-lived self-signed SSL certififcate for `api.zed.dev`.

# How to use

This section will not contain library documentation. Just a getting started guide for the two binary projects.

## Archiver

The current configuration of the archiver is a bit clunky. It requires an `archiver.toml` file. 

```toml
[downloader.filesystem]
output_folder = "/absolute/path/to/output/dir"

[[extension]]
identifier = "html"
download_latest = true

[[extension]]
identifier = "toml"
download_latest = true

[[extension]]
identifier = "git-firefly"
download_latest = true
```

The archiver binary has the following parameters;

```
zed-api-archiver --help

Usage: zed-api-archiver [OPTIONS]

Options:
  -c, --config <CONFIG>  [default: archiver.toml]
  -h, --help             Print help
```

It will poll the API with a set interval and download the latest version of specified
extensions. This is due to change.

## Mirror

The mirror can be built with or without the `https` feature. This creates two distinct binaries. The HTTPS 
binary cannot do HTTP and vice-versa.

The following flags are available. 

```
zed-api-mirror --help

Command-line arguments for the Zed API Mirror server

Usage: zed-api-mirror [OPTIONS] --ssl-cert-path <SSL_CERT_PATH> --ssl-key-path <SSL_KEY_PATH>

Options:
      --listen-address <LISTEN_ADDRESS>
          The listening address for the server [env: LISTEN_ADDRESS=] [default: 0.0.0.0]
      --listen-port <LISTEN_PORT>
          The listening port for the server [env: LISTEN_PORT=] [default: 3000]
      --filewatcher-path <FILEWATCHER_PATH>
          The path to the directory containing extension archives [env: FILEWATCHER_PATH=] [default: ./extension_archive]
      --ssl-cert-path <SSL_CERT_PATH>
          The path to the SSL certificate file for HTTPS [env: SSL_CERT_PATH=]
      --ssl-key-path <SSL_KEY_PATH>
          The path to the SSL private key file for HTTPS [env: SSL_KEY_PATH=]
  -h, --help
          Print help
  -V, --version
          Print version
```

The `ssl-*` flags are not available on the http binary.

# Future goals

- Implement the endpoint for installing a specific version of an extension.
- Add more tracing logs to all the crates.
- Add Python bindings to the archiver and or client libraries.
- Implement the archiver interval and make it optional.
- Add a way to download a single extension using the archiver CLI.
- Implement the cleanup functionallity and describe how it works.
