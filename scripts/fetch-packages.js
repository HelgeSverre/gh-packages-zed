const fs = require("fs");
const path = require("path");

const PACKAGES_FILE = path.join(__dirname, "..", "data", "packages.json");
const STATS_FILE = path.join(__dirname, "..", "data", "stats.json");
const ARCHIVED_FILE = path.join(__dirname, "..", "data", "archived.json");
const EXTENSIONS_FILE = path.join(__dirname, "..", "data", "extensions.json");
const READMES_DIR = path.join(__dirname, "..", "data", "readmes");
const TOMLS_DIR = path.join(__dirname, "..", "data", "extension-tomls");

// Minimum stars to include (filter out empty repos)
const MIN_STARS = 0;
// Maximum stars (we want undiscovered gems, not already-popular ones)
const MAX_STARS = 500;
// Stale package archiving
const STALE_THRESHOLD_DAYS = 365;
const MAX_ARCHIVE_PER_RUN = 10;
// Extension metadata fetching
const README_MAX_BYTES = 100 * 1024;
const SYNC_BATCH_PER_RUN = Number(process.env.SYNC_LIMIT ?? 250);

// Zed editor ecosystem search queries.
// Mix of topic-based (catches well-tagged repos) and keyword-based (catches the rest).
// The authoritative source is the zed-industries/extensions registry — these
// queries layer on top to find unregistered / in-progress extensions.
const SEARCH_QUERIES = [
  // Core extension topics
  { q: "topic:zed-extension", pages: 5 },
  { q: "topic:zed-extensions", pages: 3 },
  { q: "topic:zed-editor", pages: 3 },
  { q: "topic:zed-plugin", pages: 2 },
  // Theme topics — separate ecosystem
  { q: "topic:zed-theme", pages: 5 },
  { q: "topic:zed-themes", pages: 3 },
  { q: "topic:zed-icon-theme", pages: 2 },
  // Capability-specific topics (granular but catches well-tagged misses)
  { q: "topic:zed-language", pages: 2 },
  { q: "topic:zed-grammar", pages: 2 },
  { q: "topic:zed-lsp", pages: 2 },
  { q: "topic:zed-snippets", pages: 1 },
  { q: "topic:zed-slash-command", pages: 1 },
  { q: "topic:zed-context-server", pages: 2 },
  // Bare "zed" topic — noisy but catches well-tagged misses
  { q: "topic:zed+language:Rust", pages: 3 },
  // Naming-convention fallback
  { q: "zed-+in:name+language:Rust", pages: 5 },
  { q: "zed+extension+in:name", pages: 3 },
];

const OFFICIAL_REGISTRY_REPO = "zed-industries/extensions";

async function fetchPage(query, page) {
  const url = `https://api.github.com/search/repositories?q=${query}&sort=updated&order=desc&per_page=100&page=${page}`;

  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "zed-package-discovery",
      ...(process.env.GITHUB_TOKEN && {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      }),
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GitHub API error: ${response.status} - ${text}`);
  }

  const data = await response.json();
  return data.items || [];
}

// Walk the official zed-industries/extensions registry. Each entry is a git
// submodule pointing to the extension's source repo — pages of the contents
// API give us the html_url for each submodule, from which we extract owner/repo.
async function fetchRegistryPage(page, attempt = 1) {
  const url = `https://api.github.com/repos/${OFFICIAL_REGISTRY_REPO}/contents/extensions?per_page=100&page=${page}`;
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "zed-package-discovery",
      ...(process.env.GITHUB_TOKEN && {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      }),
    },
  });
  if (!response.ok) {
    throw new Error(`Registry contents fetch failed (page ${page}): ${response.status}`);
  }
  // Read as text first, then parse — bypasses native fetch's silent
  // body truncation behavior when response is large.
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    if (attempt < 3) {
      await new Promise((r) => setTimeout(r, 500 * attempt));
      return fetchRegistryPage(page, attempt + 1);
    }
    throw new Error(`Page ${page} JSON parse failed after ${attempt} attempts: ${e.message}`);
  }
}

async function fetchOfficialRegistry() {
  const repoUrls = [];
  const seen = new Set();
  let page = 1;
  while (true) {
    const items = await fetchRegistryPage(page);
    if (!Array.isArray(items) || items.length === 0) break;
    for (const item of items) {
      if (!item.html_url) continue;
      const m = item.html_url.match(/github\.com\/([^\/]+)\/([^\/]+)/i);
      if (!m) continue;
      const key = `${m[1]}/${m[2]}`.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      repoUrls.push({ owner: m[1], repo: m[2], submoduleName: item.name });
    }
    if (items.length < 100) break;
    page++;
  }
  return repoUrls;
}

// Hydrate registry entries we don't already have metadata for. Capped per run
// so we don't burn the secondary rate-limit budget. Stops on first 403 since
// continuing past a rate-limit just wastes attempts.
async function fetchRegistryRepoMetadata(entries, existingByKey, maxPerRun = 200, concurrency = 4) {
  const need = entries.filter((e) => {
    const key = `${e.owner}/${e.repo}`.toLowerCase();
    return !existingByKey[key];
  });
  const todo = need.slice(0, maxPerRun);
  const results = [];
  const failed = [];
  let stoppedEarly = false;

  for (let i = 0; i < todo.length; i += concurrency) {
    if (stoppedEarly) break;
    const chunk = todo.slice(i, i + concurrency);
    const settled = await Promise.allSettled(
      chunk.map(async ({ owner, repo }) => {
        const url = `https://api.github.com/repos/${owner}/${repo}`;
        const response = await fetch(url, {
          headers: {
            Accept: "application/vnd.github+json",
            "User-Agent": "zed-package-discovery",
            ...(process.env.GITHUB_TOKEN && {
              Authorization: `token ${process.env.GITHUB_TOKEN}`,
            }),
          },
        });
        if (response.status === 404) return null;
        if (response.status === 403) {
          stoppedEarly = true;
          return null;
        }
        if (!response.ok) throw new Error(`${response.status} for ${owner}/${repo}`);
        return await response.json();
      }),
    );
    for (let j = 0; j < settled.length; j++) {
      const r = settled[j];
      if (r.status === "fulfilled" && r.value) results.push(r.value);
      else if (r.status === "rejected") failed.push({ ...chunk[j], err: r.reason?.message });
    }
    if ((i + concurrency) % 60 === 0) {
      console.log(`   registry ${Math.min(i + concurrency, todo.length)}/${todo.length} (${need.length} total new)`);
    }
  }

  return {
    results,
    failed,
    stoppedEarly,
    pendingHydration: Math.max(0, need.length - todo.length),
  };
}

async function fetchPagesInParallel(query, totalPages, concurrency = 3) {
  let allRepos = [];
  for (let i = 0; i < totalPages; i += concurrency) {
    const chunk = [];
    for (let j = i; j < Math.min(i + concurrency, totalPages); j++) {
      chunk.push(fetchPage(query, j + 1));
    }
    const results = await Promise.all(chunk);
    allRepos = allRepos.concat(results.flat());
    if (i + concurrency < totalPages) {
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
  return allRepos;
}

function transformRepo(repo, official = false) {
  return {
    name: repo.full_name,
    url: repo.html_url,
    description: repo.description || "",
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    topics: repo.topics || [],
    language: repo.language,
    license: repo.license?.spdx_id || null,
    created_at: repo.created_at,
    updated_at: repo.updated_at,
    pushed_at: repo.pushed_at,
    discovered_at: new Date().toISOString(),
    official,
  };
}

function loadExisting() {
  try {
    if (fs.existsSync(PACKAGES_FILE)) {
      return JSON.parse(fs.readFileSync(PACKAGES_FILE, "utf8"));
    }
  } catch (e) {
    console.error("Error loading existing packages:", e.message);
  }
  return {};
}

function loadArchived() {
  try {
    if (fs.existsSync(ARCHIVED_FILE)) {
      return JSON.parse(fs.readFileSync(ARCHIVED_FILE, "utf8"));
    }
  } catch (e) {
    console.error("Error loading archived packages:", e.message);
  }
  return {};
}

// ---------------------------------------------------------------------------
// extension.toml + README sync
// ---------------------------------------------------------------------------

function repoKeyToFilename(fullName) {
  return fullName.replace("/", "--");
}

function tomlPath(fullName) {
  return path.join(TOMLS_DIR, repoKeyToFilename(fullName) + ".toml");
}

function readmePath(fullName) {
  return path.join(READMES_DIR, repoKeyToFilename(fullName) + ".md");
}

// Minimal TOML parser tailored to Zed's extension.toml.
// Handles: top-level scalar/string/array assignments, [section.subsection]
// headers, comments, basic string/number/bool/array values. Not a full TOML
// implementation — good enough for the surface Zed extensions actually use.
function parseExtensionToml(text) {
  if (!text || !text.trim()) return null;
  const meta = { __sections: new Set() };
  let currentPath = null; // null = top-level

  const stripComment = (s) => {
    let out = "";
    let inStr = false;
    let strCh = null;
    for (let i = 0; i < s.length; i++) {
      const ch = s[i];
      if (inStr) {
        if (ch === strCh && s[i - 1] !== "\\") inStr = false;
        out += ch;
      } else if (ch === '"' || ch === "'") {
        inStr = true;
        strCh = ch;
        out += ch;
      } else if (ch === "#") {
        break;
      } else {
        out += ch;
      }
    }
    return out.trim();
  };

  const parseValue = (raw) => {
    raw = raw.trim();
    if (!raw) return null;
    // String
    if (raw.startsWith('"') && raw.endsWith('"')) {
      try {
        return JSON.parse(raw);
      } catch {
        return raw.slice(1, -1);
      }
    }
    if (raw.startsWith("'") && raw.endsWith("'")) {
      return raw.slice(1, -1);
    }
    // Array (one-line only — multi-line arrays are rare in extension.toml)
    if (raw.startsWith("[") && raw.endsWith("]")) {
      const inner = raw.slice(1, -1).trim();
      if (!inner) return [];
      const parts = [];
      let depth = 0;
      let cur = "";
      let inStr = false;
      let strCh = null;
      for (let i = 0; i < inner.length; i++) {
        const ch = inner[i];
        if (inStr) {
          if (ch === strCh && inner[i - 1] !== "\\") inStr = false;
          cur += ch;
        } else if (ch === '"' || ch === "'") {
          inStr = true;
          strCh = ch;
          cur += ch;
        } else if (ch === "[" || ch === "{") {
          depth++;
          cur += ch;
        } else if (ch === "]" || ch === "}") {
          depth--;
          cur += ch;
        } else if (ch === "," && depth === 0) {
          parts.push(cur);
          cur = "";
        } else {
          cur += ch;
        }
      }
      if (cur.trim()) parts.push(cur);
      return parts.map((p) => parseValue(p.trim())).filter((v) => v !== null);
    }
    // Boolean
    if (raw === "true") return true;
    if (raw === "false") return false;
    // Number
    if (/^-?\d+(\.\d+)?$/.test(raw)) return Number(raw);
    return raw;
  };

  // Buffer multi-line arrays — extension.toml occasionally uses them
  let buffer = null;
  let bufferKey = null;
  let bufferPath = null;

  const flushBuffer = () => {
    if (!buffer) return;
    const value = parseValue(buffer);
    assign(bufferPath, bufferKey, value);
    buffer = null;
    bufferKey = null;
    bufferPath = null;
  };

  const assign = (sectionPath, key, value) => {
    if (sectionPath === null) {
      meta[key] = value;
    }
    // Subsection values aren't materialized — we only care about which top-level
    // sections exist (for categorization).
  };

  text = text.replace(/^﻿/, "");
  const lines = text.split(/\r?\n/);

  for (const rawLine of lines) {
    const line = stripComment(rawLine);
    if (!line) continue;

    // Buffer continuation (open multi-line array)
    if (buffer !== null) {
      buffer += " " + line;
      const opens = (buffer.match(/\[/g) || []).length;
      const closes = (buffer.match(/\]/g) || []).length;
      if (opens === closes) flushBuffer();
      continue;
    }

    // Section header
    const sectionMatch = line.match(/^\[\[?([^\]]+)\]\]?$/);
    if (sectionMatch) {
      currentPath = sectionMatch[1].trim();
      const root = currentPath.split(".")[0];
      meta.__sections.add(root);
      continue;
    }

    // Key = value
    const kvMatch = line.match(/^([A-Za-z0-9_\-]+)\s*=\s*(.+)$/);
    if (!kvMatch) continue;
    const key = kvMatch[1];
    const rest = kvMatch[2];

    if (rest.startsWith("[") && !rest.endsWith("]")) {
      // Multi-line array start
      buffer = rest;
      bufferKey = key;
      bufferPath = currentPath;
    } else {
      assign(currentPath, key, parseValue(rest));
    }
  }

  flushBuffer();

  const sections = Array.from(meta.__sections);
  delete meta.__sections;

  // Derive a normalized "categories" list from sections + top-level snippets.
  const categories = [];
  if (sections.includes("themes")) categories.push("theme");
  if (sections.includes("icon_themes")) categories.push("icon-theme");
  if (sections.includes("grammars")) categories.push("grammar");
  if (sections.includes("language_servers")) categories.push("language-server");
  if (sections.includes("slash_commands")) categories.push("slash-command");
  if (sections.includes("context_servers")) categories.push("context-server");
  if (sections.includes("debug_adapters")) categories.push("debug-adapter");
  if (sections.includes("indexed_docs_providers")) categories.push("docs-provider");
  if (meta.snippets) categories.push("snippets");

  // Fallback heuristic: if no sections detected and the file only has metadata,
  // it's almost certainly a pure theme (themes/*.json files alongside).
  if (categories.length === 0) categories.push("theme");

  return {
    id: meta.id ?? null,
    name: meta.name ?? null,
    description: meta.description ?? null,
    version: meta.version ?? null,
    schema_version: meta.schema_version ?? null,
    authors: Array.isArray(meta.authors) ? meta.authors : [],
    repository: meta.repository ?? null,
    snippets: meta.snippets ?? null,
    sections,
    categories,
  };
}

// Patterns GitHub's secret scanner blocks on push — many READMEs ship
// example webhooks/tokens. Scrub before persisting.
function scrubSecrets(text) {
  return text
    .replace(
      /https:\/\/hooks\.slack\.com\/services\/[A-Z0-9\/]+/gi,
      "https://hooks.slack.com/services/REDACTED",
    )
    .replace(
      /https:\/\/(?:discord|discordapp)\.com\/api\/webhooks\/\d+\/[A-Za-z0-9_-]+/gi,
      "https://discord.com/api/webhooks/REDACTED",
    );
}

async function fetchRepoFile(fullName, filePath, accept = "application/vnd.github.raw+json") {
  const url = `https://api.github.com/repos/${fullName}/contents/${filePath}`;
  const response = await fetch(url, {
    headers: {
      Accept: accept,
      "User-Agent": "zed-package-discovery",
      ...(process.env.GITHUB_TOKEN && {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      }),
    },
  });
  if (response.status === 404) return { status: "missing" };
  if (!response.ok) return { status: "error", code: response.status };
  const text = await response.text();
  return { status: "ok", body: text };
}

async function fetchReadme(fullName) {
  const url = `https://api.github.com/repos/${fullName}/readme`;
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github.raw+json",
      "User-Agent": "zed-package-discovery",
      ...(process.env.GITHUB_TOKEN && {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      }),
    },
  });
  if (response.status === 404) return { status: "missing" };
  if (!response.ok) return { status: "error", code: response.status };
  let text = await response.text();
  if (!text || !text.trim()) return { status: "empty" };
  text = scrubSecrets(text);
  const buf = Buffer.from(text, "utf8");
  if (buf.byteLength > README_MAX_BYTES) {
    text = buf.subarray(0, README_MAX_BYTES).toString("utf8");
  }
  return { status: "ok", body: text };
}

// Sync extension.toml + README for each package. Repos without an extension.toml
// are excluded from the resulting extensions.json (caller filters using the
// returned metaByKey map).
async function syncExtensions(packages) {
  if (!fs.existsSync(TOMLS_DIR)) fs.mkdirSync(TOMLS_DIR, { recursive: true });
  if (!fs.existsSync(READMES_DIR)) fs.mkdirSync(READMES_DIR, { recursive: true });

  // Decide which packages need a (re)fetch: no toml file yet, or pushed since
  // last toml fetch. Same logic for READMEs.
  const tomlCandidates = [];
  const readmeCandidates = [];

  for (const pkg of packages) {
    const tFile = tomlPath(pkg.name);
    const rFile = readmePath(pkg.name);
    const pushedMs = pkg.pushed_at ? new Date(pkg.pushed_at).getTime() : 0;

    if (!fs.existsSync(tFile) || (pushedMs && fs.statSync(tFile).mtimeMs < pushedMs)) {
      tomlCandidates.push(pkg);
    }
    if (!fs.existsSync(rFile) || (pushedMs && fs.statSync(rFile).mtimeMs < pushedMs)) {
      readmeCandidates.push(pkg);
    }
  }

  const prio = (a, b) => {
    if (b.stars !== a.stars) return b.stars - a.stars;
    return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
  };
  tomlCandidates.sort(prio);
  readmeCandidates.sort(prio);

  const tomlTodo = tomlCandidates.slice(0, SYNC_BATCH_PER_RUN);
  const readmeTodo = readmeCandidates.slice(0, SYNC_BATCH_PER_RUN);

  if (tomlCandidates.length) {
    console.log(
      `📜 extension.toml: ${tomlCandidates.length} need refresh, fetching up to ${tomlTodo.length}`,
    );
  } else {
    console.log("📜 extension.toml: all up to date");
  }
  if (readmeCandidates.length) {
    console.log(
      `📚 READMEs: ${readmeCandidates.length} need refresh, fetching up to ${readmeTodo.length}`,
    );
  } else {
    console.log("📚 READMEs: all up to date");
  }

  // Toml fetches
  let tomlFetched = 0;
  let tomlMissing = 0;
  let tomlErrors = 0;
  for (let i = 0; i < tomlTodo.length; i++) {
    const pkg = tomlTodo[i];
    try {
      const res = await fetchRepoFile(pkg.name, "extension.toml");
      if (res.status === "ok") {
        fs.writeFileSync(tomlPath(pkg.name), res.body);
        tomlFetched++;
      } else if (res.status === "missing") {
        // Write a sentinel so we don't keep retrying the same dead repos
        fs.writeFileSync(tomlPath(pkg.name), "");
        tomlMissing++;
      } else {
        tomlErrors++;
      }
    } catch (e) {
      tomlErrors++;
    }
    if ((i + 1) % 50 === 0) console.log(`   toml ${i + 1}/${tomlTodo.length}`);
  }

  // README fetches
  let readmeFetched = 0;
  let readmeMissing = 0;
  let readmeErrors = 0;
  for (let i = 0; i < readmeTodo.length; i++) {
    const pkg = readmeTodo[i];
    try {
      const res = await fetchReadme(pkg.name);
      if (res.status === "ok") {
        fs.writeFileSync(readmePath(pkg.name), res.body);
        readmeFetched++;
      } else if (res.status === "missing" || res.status === "empty") {
        fs.writeFileSync(readmePath(pkg.name), "");
        readmeMissing++;
      } else {
        readmeErrors++;
      }
    } catch (e) {
      readmeErrors++;
    }
    if ((i + 1) % 50 === 0) console.log(`   readme ${i + 1}/${readmeTodo.length}`);
  }

  // Parse every available toml on disk and produce the meta map.
  const metaByKey = {};
  for (const pkg of packages) {
    const file = tomlPath(pkg.name);
    if (!fs.existsSync(file)) continue;
    const raw = fs.readFileSync(file, "utf8");
    if (!raw.trim()) continue; // sentinel for "no extension.toml on remote"
    try {
      const parsed = parseExtensionToml(raw);
      if (parsed) metaByKey[pkg.name.toLowerCase()] = parsed;
    } catch (e) {
      // Bad toml — skip
    }
  }

  return {
    metaByKey,
    tomlStats: { fetched: tomlFetched, missing: tomlMissing, errors: tomlErrors, remaining: Math.max(0, tomlCandidates.length - tomlTodo.length) },
    readmeStats: { fetched: readmeFetched, missing: readmeMissing, errors: readmeErrors, remaining: Math.max(0, readmeCandidates.length - readmeTodo.length) },
  };
}

function loadStats() {
  try {
    if (fs.existsSync(STATS_FILE)) {
      return JSON.parse(fs.readFileSync(STATS_FILE, "utf8"));
    }
  } catch (e) {
    console.error("Error loading stats:", e.message);
  }
  return { runs: [], total_discovered: 0 };
}

async function main() {
  // Sync-only mode: skip GitHub search, just keep chewing through the
  // extension.toml + README queues using already-discovered packages.
  if (process.env.SKIP_DISCOVERY === "1") {
    console.log("⏭️  SKIP_DISCOVERY=1 — running sync only\n");
    const existing = loadExisting();
    const syncResult = await syncExtensions(Object.values(existing));
    console.log(
      `\n📜 toml: ${syncResult.tomlStats.fetched} fetched, ${syncResult.tomlStats.missing} missing, ${syncResult.tomlStats.errors} errors, ${syncResult.tomlStats.remaining} remaining`,
    );
    console.log(
      `📚 readmes: ${syncResult.readmeStats.fetched} fetched, ${syncResult.readmeStats.missing} missing, ${syncResult.readmeStats.errors} errors, ${syncResult.readmeStats.remaining} remaining`,
    );
    const extensions = {};
    for (const [key, pkg] of Object.entries(existing)) {
      const meta = syncResult.metaByKey[pkg.name.toLowerCase()];
      if (!meta) continue;
      extensions[key] = { ...pkg, extension: meta };
    }
    fs.writeFileSync(EXTENSIONS_FILE, JSON.stringify(extensions, null, 2));
    console.log(`🧩 ${Object.keys(extensions).length} confirmed extensions`);
    const stats = loadStats();
    stats.last_run = new Date().toISOString();
    fs.writeFileSync(STATS_FILE, JSON.stringify(stats, null, 2));
    generateReadme(extensions, stats);
    return;
  }

  console.log("🔍 Fetching Zed extensions & themes from GitHub...\n");

  // Load existing data
  const existing = loadExisting();
  const existingCount = Object.keys(existing).length;
  console.log(`📦 Existing packages: ${existingCount}`);

  // Step 1: Pull from the official zed-industries/extensions registry.
  // Every repo here is a submodule of the official Zed extension registry —
  // the authoritative list of confirmed extensions.
  console.log(`\n📚 Pulling official registry (${OFFICIAL_REGISTRY_REPO})...`);
  let officialRepos = [];
  let officialKeys = new Set();
  try {
    const registryEntries = await fetchOfficialRegistry();
    console.log(`   ✅ Registry lists ${registryEntries.length} submodules`);

    // Flag every registry entry as official regardless of hydration status —
    // we know they're authoritative even before we have metadata.
    officialKeys = new Set(registryEntries.map((e) => `${e.owner}/${e.repo}`.toLowerCase()));

    // Immediately update existing records to set official: true
    let flagged = 0;
    for (const [key, pkg] of Object.entries(existing)) {
      if (officialKeys.has(key) && !pkg.official) {
        pkg.official = true;
        flagged++;
      }
    }
    if (flagged) console.log(`   🏷️  Flagged ${flagged} existing entries as official`);

    // Hydrate metadata for new/unknown registry entries (rate-limited per run)
    const { results: hydrated, failed, stoppedEarly, pendingHydration } =
      await fetchRegistryRepoMetadata(registryEntries, existing);
    officialRepos = hydrated;
    console.log(
      `   ✅ Hydrated ${hydrated.length} new registry repos (${failed.length} failed${stoppedEarly ? ", stopped early on 403" : ""}, ${pendingHydration} pending next run)`,
    );
  } catch (e) {
    console.error(`   ❌ Official registry pull failed: ${e.message}`);
  }

  // Fetch from all search queries
  let allRepos = officialRepos.slice();
  const queryResults = { "@official-registry": officialRepos.length };

  for (const { q, pages } of SEARCH_QUERIES) {
    console.log(`\n🔎 Query: ${q} (${pages} pages)`);
    try {
      const repos = await fetchPagesInParallel(q, pages);
      queryResults[q] = repos.length;
      allRepos = allRepos.concat(repos);
      console.log(`   ✅ Got ${repos.length} results`);
      // Delay between queries to avoid rate limiting
      await new Promise((r) => setTimeout(r, 1000));
    } catch (e) {
      console.error(`   ❌ Error: ${e.message}`);
      queryResults[q] = 0;
    }
  }

  // Deduplicate by full_name (case-insensitive)
  const seen = new Set();
  const dedupedRepos = [];
  for (const repo of allRepos) {
    const key = repo.full_name.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      dedupedRepos.push(repo);
    }
  }

  console.log(`\n📥 Fetched ${allRepos.length} total results (${dedupedRepos.length} unique)`);

  // Filter and transform
  const filtered = dedupedRepos.filter(
    (repo) =>
      repo.stargazers_count >= MIN_STARS &&
      repo.stargazers_count <= MAX_STARS &&
      !repo.fork &&
      !repo.archived,
  );

  console.log(
    `✅ After filtering (${MIN_STARS}-${MAX_STARS} stars, no forks/archived): ${filtered.length}`,
  );

  // Track which packages were seen in this fetch
  const fetchedKeys = new Set(filtered.map((repo) => repo.full_name.toLowerCase()));

  // Merge with existing (existing data preserved, new data added)
  let newCount = 0;
  let updatedCount = 0;

  for (const repo of filtered) {
    const key = repo.full_name.toLowerCase();
    const isOfficial = officialKeys.has(key);
    const transformed = transformRepo(repo, isOfficial);

    if (!existing[key]) {
      existing[key] = transformed;
      newCount++;
    } else {
      // Update metadata but keep original discovered_at
      const discoveredAt = existing[key].discovered_at;
      existing[key] = { ...transformed, discovered_at: discoveredAt };
      updatedCount++;
    }
  }

  // Archive stale packages
  const now = new Date();
  const archived = loadArchived();
  let archivedCount = 0;
  const keysToArchive = [];

  for (const [key, pkg] of Object.entries(existing)) {
    if (fetchedKeys.has(key)) continue;
    if (pkg.official) continue; // never archive registry-listed extensions
    if (!pkg.pushed_at) continue;

    const pushedAt = new Date(pkg.pushed_at);
    const daysSincePush = (now - pushedAt) / (1000 * 60 * 60 * 24);

    if (daysSincePush > STALE_THRESHOLD_DAYS) {
      keysToArchive.push(key);
      if (keysToArchive.length >= MAX_ARCHIVE_PER_RUN) break;
    }
  }

  for (const key of keysToArchive) {
    archived[key] = {
      ...existing[key],
      archived_at: now.toISOString(),
      archive_reason: `Stale: not seen in search results and last pushed ${Math.floor((now - new Date(existing[key].pushed_at)) / (1000 * 60 * 60 * 24))} days ago`,
    };
    delete existing[key];
    archivedCount++;
  }

  console.log(`\n🆕 New packages: ${newCount}`);
  console.log(`🔄 Updated packages: ${updatedCount}`);
  if (archivedCount > 0) {
    console.log(`🗃️  Archived packages: ${archivedCount}`);
  }
  console.log(`📊 Total packages: ${Object.keys(existing).length}`);

  // Ensure data directory exists
  const dataDir = path.dirname(PACKAGES_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Save packages
  fs.writeFileSync(PACKAGES_FILE, JSON.stringify(existing, null, 2));
  console.log(`\n💾 Saved to ${PACKAGES_FILE}`);

  // Save archived
  if (archivedCount > 0) {
    fs.writeFileSync(ARCHIVED_FILE, JSON.stringify(archived, null, 2));
    console.log(`🗃️  Archived saved to ${ARCHIVED_FILE}`);
  }

  // Fetch + parse extension.toml and READMEs (rate-limited per run)
  const syncResult = await syncExtensions(Object.values(existing));
  console.log(
    `\n📜 toml: ${syncResult.tomlStats.fetched} fetched, ${syncResult.tomlStats.missing} missing, ${syncResult.tomlStats.errors} errors, ${syncResult.tomlStats.remaining} remaining`,
  );
  console.log(
    `📚 readmes: ${syncResult.readmeStats.fetched} fetched, ${syncResult.readmeStats.missing} missing, ${syncResult.readmeStats.errors} errors, ${syncResult.readmeStats.remaining} remaining`,
  );

  // Build extensions.json: only packages with a parsed extension.toml.
  const extensions = {};
  for (const [key, pkg] of Object.entries(existing)) {
    const meta = syncResult.metaByKey[pkg.name.toLowerCase()];
    if (!meta) continue; // bail: not a Zed extension
    extensions[key] = { ...pkg, extension: meta };
  }
  fs.writeFileSync(EXTENSIONS_FILE, JSON.stringify(extensions, null, 2));
  console.log(
    `🧩 Saved ${Object.keys(extensions).length} confirmed extensions to ${EXTENSIONS_FILE}`,
  );

  // Update stats
  const stats = loadStats();
  stats.runs.push({
    timestamp: new Date().toISOString(),
    fetched: allRepos.length,
    unique: dedupedRepos.length,
    new: newCount,
    updated: updatedCount,
    archived: archivedCount,
    total: Object.keys(existing).length,
    queries: queryResults,
  });
  // Keep only last 100 runs
  stats.runs = stats.runs.slice(-100);
  stats.total_discovered = Object.keys(existing).length;
  stats.last_run = new Date().toISOString();

  fs.writeFileSync(STATS_FILE, JSON.stringify(stats, null, 2));
  console.log(`📈 Stats updated`);

  // Generate markdown summary using confirmed extensions only
  generateReadme(extensions, stats);
}

function generateReadme(packages, stats) {
  const pkgList = Object.values(packages);
  const officialCount = pkgList.filter((p) => p.official).length;
  const unofficialCount = pkgList.length - officialCount;

  const recentlyDiscovered = [...pkgList]
    .sort((a, b) => new Date(b.discovered_at) - new Date(a.discovered_at))
    .slice(0, 50);

  const byStars = [...pkgList].sort((a, b) => b.stars - a.stars).slice(0, 30);

  const recentlyActive = [...pkgList]
    .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
    .slice(0, 30);

  // Categorize for the breakdown table
  const catCounts = {};
  for (const p of pkgList) {
    for (const c of (p.extension?.categories || [])) {
      catCounts[c] = (catCounts[c] || 0) + 1;
    }
  }
  const CAT_LABEL = {
    'theme': 'Themes',
    'icon-theme': 'Icon Themes',
    'language-server': 'Language Servers',
    'grammar': 'Grammars',
    'snippets': 'Snippets',
    'slash-command': 'Slash Commands',
    'context-server': 'Context Servers',
    'debug-adapter': 'Debug Adapters',
    'docs-provider': 'Docs Providers',
  };
  const catRows = Object.entries(catCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([k, v]) => `| ${CAT_LABEL[k] || k} | ${v} |`)
    .join("\n");

  const md = `# Zed Extension Safari

A searchable, browsable directory of every Zed editor extension and theme on GitHub — pulled from the [official zed-industries/extensions registry](https://github.com/zed-industries/extensions) plus topic-tagged repos, parsed from each project's \`extension.toml\`, and refreshed every 6 hours.

🌐 **Live site:** https://helgesverre.github.io/gh-packages-zed
🤖 **Auto-updated:** GitHub Action runs every 6 hours
🧩 **Source of truth:** Each repo's \`extension.toml\` — version, authors, capabilities (LSP / grammar / theme / slash command / context server / debug adapter / docs provider / snippets / icon theme)

## At a glance

| | Count |
|---|---|
| Total tracked | **${pkgList.length}** |
| In official registry | ${officialCount} |
| Discovered via topics | ${unofficialCount} |
| Last updated | ${stats.last_run?.slice(0, 16).replace('T', ' ')} UTC |

### By capability
| Type | Count |
|------|-------|
${catRows}

## How it works

1. **Pull the registry.** Every entry in [zed-industries/extensions](https://github.com/zed-industries/extensions) is a git submodule pointing to the extension's source repo. We follow each submodule to its source.
2. **Top up with GitHub search.** A handful of topic queries (\`topic:zed-extension\`, \`topic:zed-theme\`, etc.) pick up extensions that aren't (yet) in the official registry.
3. **Fetch each \`extension.toml\`.** Parsed to extract \`id\`, \`name\`, \`description\`, \`version\`, \`schema_version\`, \`authors\`, and which TOML sections are present (\`[grammars]\`, \`[language_servers]\`, \`[themes]\`, \`[slash_commands]\`, \`[context_servers]\`, \`[icon_themes]\`, \`[debug_adapters]\`, \`[indexed_docs_providers]\`).
4. **Bail without a toml.** Repos that don't have an \`extension.toml\` aren't Zed extensions — they're filtered out of the listing entirely.
5. **Cache READMEs** for each extension so the website can render full detail pages without hitting GitHub at view time.

## Running locally

\`\`\`bash
# Full run: discovery + registry pull + toml/readme sync
GITHUB_TOKEN=\$(gh auth token) node scripts/fetch-packages.js

# Sync-only (skip GitHub search, just chew through the toml/readme queue)
GITHUB_TOKEN=\$(gh auth token) SKIP_DISCOVERY=1 node scripts/fetch-packages.js

# Smaller batches per run (default 250)
SYNC_LIMIT=100 node scripts/fetch-packages.js
\`\`\`

The website lives in \`website/\` — Astro + Svelte 5 + Tailwind v4:

\`\`\`bash
cd website && npm install && npm run dev
\`\`\`

## 📦 Recently Discovered

| Package | ⭐ | Description |
|---------|-----|-------------|
${recentlyDiscovered
  .slice(0, 20)
  .map(
    (p) =>
      `| [${p.name}](${p.url}) | ${p.stars} | ${(p.description || "").slice(0, 80)}${p.description?.length > 80 ? "..." : ""} |`,
  )
  .join("\n")}

## 🌟 Top Starred (Under ${MAX_STARS})

| Package | ⭐ | Description |
|---------|-----|-------------|
${byStars
  .slice(0, 20)
  .map(
    (p) =>
      `| [${p.name}](${p.url}) | ${p.stars} | ${(p.description || "").slice(0, 80)}${p.description?.length > 80 ? "..." : ""} |`,
  )
  .join("\n")}

## 🔥 Recently Active

| Package | ⭐ | Last Push | Description |
|---------|-----|-----------|-------------|
${recentlyActive
  .slice(0, 20)
  .map(
    (p) =>
      `| [${p.name}](${p.url}) | ${p.stars} | ${p.pushed_at?.slice(0, 10)} | ${(p.description || "").slice(0, 60)}${p.description?.length > 60 ? "..." : ""} |`,
  )
  .join("\n")}

---

## Run history

| Run | New | Updated | Total |
|-----|-----|---------|-------|
${stats.runs
  .slice(-10)
  .reverse()
  .map(
    (r) =>
      `| ${r.timestamp.slice(0, 16)} | ${r.new} | ${r.updated} | ${r.total} |`,
  )
  .join("\n")}

---

Source data lives in \`data/extensions.json\` (filtered, enriched) and \`data/packages.json\` (raw discovery). Cached extension.toml files in \`data/extension-tomls/\`, READMEs in \`data/readmes/\`.

Made by [Helge Sverre](https://helgesver.re). Not affiliated with [Zed Industries](https://zed.dev).
`;

  fs.writeFileSync(path.join(__dirname, "..", "README.md"), md);
  console.log("📝 README.md generated");
}

main().catch((e) => {
  console.error("Fatal error:", e);
  process.exit(1);
});
