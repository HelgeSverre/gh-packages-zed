# Staff Engineer — Pragmatic Verified Loops

![Version](https://img.shields.io/badge/version-1.0.0-blue) ![License](https://img.shields.io/badge/license-MIT-green) [![skills.sh](https://img.shields.io/badge/skills.sh-johngbl%2Fstaff--engineer-black)](https://skills.sh/johngbl/staff-engineer)

> **XP with AI: Extreme Programming practices applied to AI-assisted development.**
> A single, self-contained SKILL.md that transforms coding agents into pragmatic Staff-level engineers. Evidence-based verified loops, strict TDD, anti-guessing discipline, and honest technical communication. Works with Claude Code, Cursor, Codex, Cline, OpenCode, and many more via [skills.sh](https://skills.sh). Simple by default — ceremony only when earned.

---

## Why Does This Repository Exist?

AI coding agents are powerful but undisciplined by default. They hallucinate APIs, skip tests, accumulate monolithic files, agree with bad ideas to please the user, and declare "done" without mechanical proof. The **Staff Engineer** skill fixes this by embedding battle-tested engineering discipline directly into the agent's operating instructions.

The skill equips coding agents to:

1. **Never guess when they can verify.** Research the codebase, read official docs, or ask the user — in that order. Zero hallucinated APIs or packages.
2. **Write complete, production-ready code.** No `// TODO`, no placeholders, no lazy omissions. Every function, every error path, every edge case.
3. **Enforce strict TDD with the Deletion Rule.** Failing test first, then implementation. If production code is written before the test, the agent deletes it and restarts.
4. **Validate everything mechanically.** Linter (0 warnings), type-checker (0 errors), test suite (exit code 0). "I think it works" is not acceptable.
5. **Be technically honest.** If the user's request has a flaw, the agent says so and proposes the correct alternative. No sycophantic agreement.
6. **Follow project conventions.** Write as a developer who has worked in this project for 2 years, not as a visitor.
7. **Stop when stuck.** 5 consecutive failures on the same problem triggers a halt with a clear diagnostic report. No infinite loops burning tokens.
8. **Institutional memory.** Leverage native/MCP memory directly, document permanent decisions in project docs/commits, and use `.tmp/` for task planning — zero ad-hoc file clutter.
9. **Protect the workspace.** No destructive git operations, no secrets exposure, no unvetted remote executables.
10. **Scale complexity only when earned.** Direct task with tests is the default. Specs and decomposition only when the task genuinely requires it.

---

## Repository Architecture

```
staff-engineer/
├── SKILL.md                  <- THE COMPLETE SKILL: fully self-contained (~160 lines)
├── README.md
├── .gitignore
├── .gitattributes            <- LF normalization
└── .github/
    └── workflows/
        └── evals.yml         <- CI Gate: structural + semantic integrity checks

```

**Design Principle:** `SKILL.md` is a **single, self-contained file** (~160 lines) organized in 4 sections + 2 appendices. No external files, no registry, no templates directory. Installation is trivial (1 file) and the skill works identically across all supported agents.

---

## Core Pillars

| # | Pillar | Description |
|---|--------|-------------|
| 1 | **Anti-Guessing Discipline** | Codebase evidence > official docs > web search > ask user. Never assume a verifiable fact. |
| 2 | **Strict TDD + Deletion Rule** | Failing test first or production code gets deleted. Tests are the only reliable feedback sensor. |
| 3 | **Verified Loop** | Implement > Test > Lint > Types > Verify. Every "done" backed by exit code 0. |
| 4 | **Circuit Breaker** | 5 consecutive failures = halt + diagnostic report. No infinite retry loops. |
| 5 | **Clean Code (Agent-Optimized)** | Concise single-responsibility functions, files <500 lines, greppable names, explicit types, max 2 nesting levels. |
| 6 | **Technical Honesty** | Disagree when necessary. A "no" with a better solution beats a "yes" that breaks production. |
| 7 | **Workspace Sandboxing** | No git push, no secrets, no destructive operations without explicit user instruction. |
| 8 | **Procedural Memory & Planning** | Native/MCP memory first; permanent knowledge in project docs/commits; scratchpad in `.tmp/`. |
| 9 | **Convention Mimicry** | Detect and follow existing project patterns. Write as a native, not a visitor. |
| 10 | **Complexity on Demand** | Simple loop is default. Specs and decomposition only when the task earns it. |

---

## Execution Flow

```
              [ User Requirement ]
                      |
                      v
        +---------------------------+
        | Detect Stack & Conventions |
        | Read Rules (AGENTS.md etc) |
        | Clarify if Ambiguous       |
        +-------------+-------------+
                      |
          +-----------+-----------+
          v                       v
   [ Direct Task ]        [ Complex Task ]
   80% of work            Decompose first
          |                       |
          v                       v
   +-------------+        +--------------+
   | Understand  |        | Brief Plan   |
   | Investigate |        | in .tmp/     |
   | Implement   |        | Then execute |
   | Test        |        | sub-tasks    |
   | Verify      |        | sequentially |
   +------+------+        +------+-------+
          |                       |
          v                       v
   +-----------------------------------+
   | Linter: 0 errors, 0 warnings      |
   | Types: 0 errors                   |
   | Tests: exit code 0                |
   | Docs: updated where needed        |
   +-----------------------------------+
                      |
                      v
              [ LOCAL Commit ]
        (push ONLY with user instruction)
```

---

## Installation & Updates

### Quick Global Install (All Agents)
```bash
npx skills add johngbl/staff-engineer -g -y
```

> Installs globally across Claude Code, Cursor, Codex, Cline, OpenCode, and any supported agent.  
> *Flags:* `-g` (global), `-y` (yes to all prompts). Short form: `npx skills add johngbl/staff-engineer`.

### Updating
```bash
# Update this skill specifically
npx skills update staff-engineer -g -y

# Or update all installed skills at once
npx skills update -g -y
```

### Verify Installation
```bash
npx skills ls -g
```

> Browse at [skills.sh/johngbl/staff-engineer](https://skills.sh/johngbl/staff-engineer)

---

## Daily Usage

Trigger your agent using standard natural language. The skill automatically routes to the appropriate depth.

### Bug Fix (TDD Loop)
> **Prompt:** `fix and verify: Coupon discounts are applying twice in multi-item carts.`

The agent writes a test reproducing the bug, confirms it fails, fixes the domain logic, and verifies the test passes — without altering the assertion.

### Feature Implementation
> **Prompt:** `implement with tests: Add rate limiting to the login endpoint (max 5 attempts per minute per IP).`

The agent detects the stack, writes failing tests for the rate-limit behavior, implements the feature following project conventions, and runs the full verification pipeline.

### Quick Fix
> **Prompt:** `production-ready code: Fix the padding alignment on the user table header.`

Direct edit, linter check, done. No ceremony.

### Code Review
> **Prompt:** `code review: Audit /src/auth for race conditions and missing error handling.`

Read-only analysis with concrete findings, file locations, evidence, and recommended next steps. No commit is produced.

---

## Design Decisions: What Was Cut and Why

| Removed | Why |
|---------|-----|
| 9 numbered phases | Ceremony for 80% of tasks; verified loop covers everything |
| Multi-agent personas (4 roles) | 1 strong agent > 4 weak ones; most harnesses don't support it |
| Graph Engineering / A2A Protocol | No evidence of practical benefit for typical tasks |
| TextGrad / Gauntlet Protocol (names) | Useful concepts kept, inflated names removed |
| Factory Mode (Light/Dark) | Replaced by: "the human reviews, always" |
| Ephemeral Micro-VM Tiering | Outside skill's control in most harnesses |

| Added | Why |
|-------|-----|
| Semantic CI checks | Prevents silent removal of critical rules (Circuit Breaker, TDD, etc.) |
| Native/MCP memory integration | Uses existing harness memory or MCP tools directly; zero ad-hoc filesystem pollution |
| Explicit UI/non-UI filter | No irrelevant design instructions for backend/CLI work |
| Refined triggers | Reduces false activation on generic prompts |
| Read-only completion path | Review/analysis/planning triggers have a terminal state that doesn't require a commit |
| TDD scope escape hatch | Non-behavioral changes (config, docs, formatting, covered refactors) no longer force a failing-test cycle |
| Pre-existing failure protocol | Red test suites are reported before work begins; scope boundaries stay explicit |
| Spec approval gate | Complex tasks (migrations, architectural changes) get user sign-off on the spec before implementation |
| Project-level knowledge retention | Decisions documented in repo docs and commits for future AI sessions and human devs |
| CI gate hardening | Frontmatter parse is no longer `head -20`-bound; 9 semantic keywords (incl. push lock) guarded |

**Net result:** the original draft (~470 lines) was reduced to ~160 lines. Higher instruction adherence, lower token waste, stronger guardrails where they matter.


### Density Pass (v1.0.0 final)

Rewritten under token-density discipline (Akita: "every line burns context tokens; density matters") and 2026 empirical studies (Senior SWE-Bench, ETH Zurich context rot study, AgentIF, Wang & Yang, Akita XP with AI): mandatory terminal local git commit execution, untracked files clean check, git history inspection (`git log -p`, `git log -L`, `git blame`) to respect intentional constraints and regressions, root cause analysis over superficial symptom patching, hermetic tests with explicit teardown, disciplined sub-agent delegation (single-agent by default, read-only scouts, disjoint file ownership, primary integration), MCP & skill composition (native tools over ad-hoc scripts), adaptive procedural memory (native harness / MCP tools prioritized, permanent decisions in project docs/commits, scratchpad in `.tmp/`), mandatory web search/doc lookup for external third-party dependencies, CI/CD pipeline alignment and remote build verification, helper deduplication, modular scoped changes (no sweeping cross-repo churn), review-defense rationale, universal frontend resilience (semantic HTML, a11y, four UI states, fluid mobile-first layouts), breaking-change protection, completeness + concise-commit, no silent exception swallowing, security-sensitive parameterized functions, universal bounded resources (timeouts, streaming, cleanup, no N+1, HTTP 429 backoff), non-destructive circuit breaker, tech-lead diff inspection, and zero phantom prohibitions.

---

## License

Distributed under the **MIT License**. Free to use, modify, and distribute for commercial and non-commercial projects.

---

<p align="center">
  <b>Built for engineers who ship.</b><br>
  <i>"Verify, don't trust. Test, don't hope."</i>
</p>
