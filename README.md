# splunk-learning-engine-example

A **concept tool** that demonstrates how AI can read **publicly available** Splunk documentation and training outlines, then turn that research into a structured browser-based learning resource: topic paths, practice questions, timed review, and an SPL glossary with doc links.

This repository is **not** an official Splunk product, certification prep service, or guaranteed-accuracy study guide. It is a working example of an AI-assisted content pipeline you can fork, run locally, and extend with your own harness.

## What this demonstrates

| Idea | How this repo shows it |
|------|-------------------------|
| AI reads public sources | Questions, explanations, and glossary text were drafted with AI help from Splunk Help, public training pages, and published topic outlines |
| Structure from outlines | Topic domains and weights follow publicly listed learning objectives—not proprietary exam banks |
| Human-in-the-loop | Every answer should be checked against **official Splunk documentation** before you rely on it |
| Repeatable workflow | TypeScript data files + prompts in [docs/UPDATING-CONTENT.md](docs/UPDATING-CONTENT.md) so you can regenerate or extend content with your own AI tools |

## Important: validate everything

**AI-generated content can be wrong, outdated, or incomplete.** Splunk releases change; doc pages move; models misread context.

Before trusting any question, explanation, or glossary entry:

1. Open the linked **official** Splunk Help or training material.
2. Confirm syntax, behavior, and product scope (Enterprise vs Cloud, version, role).
3. Fix or remove content that does not match the official source.

Treat this app as a **starting point for study**, not an authority.

## Prerequisites

- **Node.js** 20 or later (22 LTS recommended)
- **npm** 10+ (bundled with Node)

```bash
node -v
npm -v
```

## Install

```bash
git clone https://github.com/andrewkriley/splunk-learning-engine-example.git
cd splunk-learning-engine-example
npm ci
```

Use `npm ci` so versions match `package-lock.json`. On a fresh fork without a lockfile, run `npm install` once and commit the result.

## Run locally

Development server (hot reload):

```bash
npm run dev
```

Open the URL Vite prints (often `http://localhost:5173`).

Production build and local preview:

```bash
npm run build
npm run preview
```

Preview is usually served at `http://localhost:4173`.

## Scripts

| Command | Purpose |
|--------|---------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Typecheck + production bundle to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint |
| `npm run validate:splunk-docs` | HTTP-check Splunk doc URLs referenced in questions and glossary |

After editing glossary or question `docLinks`, run `npm run validate:splunk-docs`. Link checks do **not** verify factual correctness—only that URLs respond.

## Project layout

```
src/
  data/
    learningPaths.ts      # Path metadata (names, public source URLs, timed review settings)
    domains.ts            # Core User topic domains + weights
    *Domains.ts           # Other paths (power, advanced, cloud admin)
    questions/            # Multiple-choice banks per path (AI-drafted, human-verify)
    glossary/             # SPL reference sections and entries
    trackResources.ts     # Wires path id → questions + domains
  components/             # React UI
  lib/                    # Selection, storage, progress
docs/
  UPDATING-CONTENT.md     # Extend content with your own AI harness
AGENTS.md                 # Short rules for AI coding agents in this repo
```

## Updating sections and questions with your AI harness

Content lives in TypeScript modules—there is no CMS. To add or refresh material with Cursor, Claude Code, Copilot, or a custom script:

1. Read **[docs/UPDATING-CONTENT.md](docs/UPDATING-CONTENT.md)** for file locations, data shapes, copy-paste prompts, and a pre-commit checklist.
2. Point your harness at **public** Splunk Help and published training outlines only.
3. Generate **original** wording; link to official docs; do not paste proprietary exam items.
4. **Manually validate** a sample of outputs against official sources before merging.
5. Run `npm run build` and `npm run validate:splunk-docs`.

Optional: keep **[AGENTS.md](AGENTS.md)** in the repo root so IDE agents load the same conventions automatically.

## Disclaimer

- **Not affiliated with Splunk.** Splunk product names and public doc URLs are used for reference only.
- **Concept / demo quality.** This project illustrates an AI-assisted learning workflow, not production-ready training.
- **No warranty.** Authors and contributors are not responsible for incorrect answers or exam outcomes.
- **Official sources win.** When this app disagrees with [Splunk Help](https://help.splunk.com) or Splunk’s published training materials, trust the official source.
