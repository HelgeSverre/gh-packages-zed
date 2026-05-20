import { describe, expect, it } from "vitest";
import {
  parseExtensionToml,
  transformRepo,
  scrubSecrets,
  repoKeyToFilename,
} from "./fetch-packages.js";

describe("parseExtensionToml", () => {
  it("returns null for empty input", () => {
    expect(parseExtensionToml("")).toBeNull();
    expect(parseExtensionToml("   \n  ")).toBeNull();
  });

  it("extracts top-level scalar metadata", () => {
    const toml = `
id = "rust-extras"
name = "Rust Extras"
description = "Extra Rust niceties"
version = "0.2.1"
schema_version = 1
authors = ["Helge Sverre <helge@example.com>"]
repository = "https://github.com/example/rust-extras"
`;
    const meta = parseExtensionToml(toml);
    expect(meta).toMatchObject({
      id: "rust-extras",
      name: "Rust Extras",
      description: "Extra Rust niceties",
      version: "0.2.1",
      schema_version: 1,
      authors: ["Helge Sverre <helge@example.com>"],
      repository: "https://github.com/example/rust-extras",
    });
  });

  it("derives categories from section headers", () => {
    const toml = `
id = "polyglot"
name = "Polyglot"
[language_servers.rust]
[grammars.rust]
[themes.dark]
[slash_commands.foo]
[context_servers.bar]
[debug_adapters.baz]
[indexed_docs_providers.qux]
[icon_themes.bright]
`;
    const meta = parseExtensionToml(toml);
    expect(meta.categories.sort()).toEqual(
      [
        "context-server",
        "debug-adapter",
        "docs-provider",
        "grammar",
        "icon-theme",
        "language-server",
        "slash-command",
        "theme",
      ].sort(),
    );
  });

  it("treats top-level snippets as a category", () => {
    const meta = parseExtensionToml(`
id = "js-snippets"
name = "JS Snippets"
snippets = "snippets/javascript.json"
`);
    expect(meta.categories).toContain("snippets");
  });

  it("falls back to theme when no sections present", () => {
    const meta = parseExtensionToml(`id = "x"\nname = "X"\n`);
    expect(meta.categories).toEqual(["theme"]);
  });

  it("handles BOM, comments, and odd whitespace", () => {
    const toml = `﻿# header comment\nid = "bom-tolerant"  # trailing comment\nname = "BOM"\n`;
    const meta = parseExtensionToml(toml);
    expect(meta.id).toBe("bom-tolerant");
    expect(meta.name).toBe("BOM");
  });

  it("parses one-line arrays with quoted commas", () => {
    const meta = parseExtensionToml(
      `id = "a"\nname = "A"\nauthors = ["Alice, Sr.", "Bob"]\n`,
    );
    expect(meta.authors).toEqual(["Alice, Sr.", "Bob"]);
  });

  it("buffers multi-line arrays until closing bracket", () => {
    const meta = parseExtensionToml(`
id = "multi"
name = "Multi"
authors = [
  "Alice",
  "Bob",
  "Carol"
]
`);
    expect(meta.authors).toEqual(["Alice", "Bob", "Carol"]);
  });

  it("returns nulls for missing optional fields", () => {
    const meta = parseExtensionToml(`id = "x"\nname = "X"\n`);
    expect(meta.description).toBeNull();
    expect(meta.version).toBeNull();
    expect(meta.repository).toBeNull();
    expect(meta.authors).toEqual([]);
  });
});

describe("transformRepo", () => {
  const sample = {
    full_name: "owner/repo",
    html_url: "https://github.com/owner/repo",
    description: "A thing",
    stargazers_count: 42,
    forks_count: 3,
    topics: ["zed", "theme"],
    language: "Rust",
    license: { spdx_id: "MIT" },
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-06-01T00:00:00Z",
    pushed_at: "2025-06-02T00:00:00Z",
  };

  it("normalizes a GitHub repo response to the indexed shape", () => {
    const out = transformRepo(sample, true);
    expect(out).toMatchObject({
      name: "owner/repo",
      url: "https://github.com/owner/repo",
      description: "A thing",
      stars: 42,
      forks: 3,
      topics: ["zed", "theme"],
      language: "Rust",
      license: "MIT",
      official: true,
    });
    expect(typeof out.discovered_at).toBe("string");
    expect(new Date(out.discovered_at).toString()).not.toBe("Invalid Date");
  });

  it("defaults missing description and topics to safe values", () => {
    const out = transformRepo({
      ...sample,
      description: null,
      topics: undefined,
    });
    expect(out.description).toBe("");
    expect(out.topics).toEqual([]);
    expect(out.official).toBe(false);
  });

  it("handles missing license object", () => {
    const out = transformRepo({ ...sample, license: null });
    expect(out.license).toBeNull();
  });
});

describe("scrubSecrets", () => {
  it("redacts Slack incoming webhooks", () => {
    // Build the URL at runtime so the literal pattern doesn't sit in source
    // and trigger GitHub's secret-scanning push protection.
    const fakeHookPath = ["T", "B", "X".repeat(24)]
      .map((s) => s.padEnd(11, "0"))
      .join("/");
    const input = `Slack: https://hooks.slack.com/services/${fakeHookPath}`;
    expect(scrubSecrets(input)).toBe(
      "Slack: https://hooks.slack.com/services/REDACTED",
    );
  });

  it("leaves unrelated URLs untouched", () => {
    const input = "https://example.com/path?foo=bar";
    expect(scrubSecrets(input)).toBe(input);
  });
});

describe("repoKeyToFilename", () => {
  it("turns slashes into double hyphens for filesystem safety", () => {
    expect(repoKeyToFilename("owner/repo")).toBe("owner--repo");
  });
});
