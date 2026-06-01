# Updating content with your own AI harness

This guide is for maintainers who use an AI assistant (Cursor, Claude Code, Copilot, custom scripts, etc.) to research **public** Splunk material and extend this **concept learning tool**. The app has no CMS—content lives in TypeScript modules that you edit, **validate against official Splunk documentation**, and rebuild.

## Principles

1. **Public sources only** — Splunk Help (`help.splunk.com`), published training pages, and outline PDFs linked from Splunk’s site. Do not paste proprietary exam items or unreleased materials.
2. **Original wording** — Paraphrase stems, explanations, and glossary text. Link to official docs; do not reproduce large doc passages.
3. **Human validation required** — AI drafts are starting points. Spot-check answers and explanations against official docs before merge; fix or remove anything that does not match.
4. **Stable IDs** — `domainId`, question `id`, and glossary domain `id` are persisted in browser storage stats. Prefer adding new IDs over renaming existing ones.
5. **Verify before merge** — `npm run build`, `npm run validate:splunk-docs`, manual review in `npm run dev`, and confirmation against official sources for changed Q&A.

---

## Content map

| What you change | Where it lives | Also update |
|-----------------|----------------|-------------|
| Learning path list (title, links, timed review size) | `src/data/learningPaths.ts` | `src/data/trackResources.ts` if the path has a question bank |
| Topic domains + weights (%) | `src/data/domains.ts` or `*Domains.ts` | `src/types.ts` (`DomainId` union) |
| Practice / timed-review questions | `src/data/questions/<path>/` | Domain file + `trackResources.ts` + bank `index.ts` |
| SPL reference section | `src/data/glossary/*Glossary.ts` or `glossary/domains/*.ts` | `src/data/glossary/types.ts` (`GlossaryDomainId`) if new domain |
| Combined main-menu SPL reference | `src/data/glossary/index.ts` | Only if adding Core / Power / Advanced domains |
| Doc URL constants (shared links) | `src/data/questions/<path>/docs.ts` | Glossary files that import the same constants |

Paths with interactive content today: `core-user`, `core-power-user`, `core-advanced-power-user`, `splunk-cloud-admin`. Others in `learningPaths.ts` are links-only placeholders.

**Lab guides** (hands-on): `core-power-user` only today — see `src/data/labs/powerUserLabs.ts` and register new paths in `src/data/labs/index.ts`.

**Sample data** for labs: `sample-data/*.log` (generate with `npm run generate:sample-data`). Lab SPL uses `index=sample` by default.

---

## Workflow E: Add or extend lab scenarios

Lab content is separate from multiple-choice banks. Each scenario is a guided exercise users run in **their own Splunk environment**.

| What you change | Where |
|-----------------|--------|
| Power User labs | `src/data/labs/powerUserLabs.ts` |
| New path lab guide | `src/data/labs/<path>Labs.ts` + entry in `src/data/labs/index.ts` |
| Types | `src/data/labs/types.ts` |
| UI | `src/components/LabGuide.tsx`, navigation in `src/App.tsx` |

### Lab scenario shape

```ts
{
  id: 'pu-lab-08-example',
  trackId: 'core-power-user',
  title: 'Lab 8 — …',
  summary: '…',
  domainIds: ['pu-macros'],
  estimatedMinutes: 30,
  difficulty: 'intro' | 'intermediate',
  objectives: ['…'],
  prerequisites: ['…'],
  environmentNotes: ['…'],
  steps: [
    {
      title: 'Step title',
      body: 'Instructions for Splunk UI or SPL.',
      spl: 'index=main | …',  // optional
      hint: '…',              // optional
      checkpoint: 'What the user must confirm before continuing.',
    },
  ],
  verification: ['Final knowledge checks'],
  troubleshooting: [{ problem: '…', suggestion: '…' }],  // optional
  docLinks: [{ label: '…', url: 'https://help.splunk.com/…' }],
}
```

### Example prompt (new lab scenario)

```text
You are extending example-splunk-learning-engine with a hands-on Splunk lab (not exam prep).

Path: core-power-user
Domain: pu-data-models
Public docs: <help.splunk.com data models URL>

Write one LabScenario object: 4–6 steps with checkpoints, optional SPL samples using index=main placeholders, objectives, verification, and docLinks. User runs this in their own Splunk. Paraphrase only; validate UI paths against Splunk Help 10.x.

Output: TypeScript object matching src/data/labs/types.ts LabScenario.
```

After adding labs, wire navigation: register in `src/data/labs/index.ts`, and enable `onOpenLabGuide` from `App.tsx` for that `trackId`.

---

## TypeScript shapes (copy into prompts)

### Question (`src/types.ts`)

```ts
{
  id: 'unique-kebab-id',           // stable; never reuse for a different question
  domainId: 'pu-transforming-viz', // must exist in DomainMeta for this path
  stem: 'Question text?',
  choices: ['A', 'B', 'C', 'D'],   // exactly four strings
  correctIndex: 0,                 // 0–3
  explanation: 'Why the answer is correct.',
  docLinks?: [{ label: 'Search Manual', url: 'https://help.splunk.com/...' }],
}
```

### Domain (`src/types.ts`)

```ts
{
  id: 'pu-transforming-viz',
  blueprintRef: '1.0',             // section ref from public outline (label only)
  title: 'Using Transforming Commands for Visualizations',
  examWeightPercent: 10,           // from public outline; drives timed review mix
}
```

### Glossary domain (`src/data/glossary/types.ts`)

```ts
{
  id: 'pu-transforming-viz',       // often matches DomainId for that topic
  title: '...',
  overview: 'One paragraph scope summary from public docs.',
  referenceUrls: [{ label: 'Search Manual', url: 'https://help.splunk.com/...' }],
  entries: [
    {
      term: 'timechart',
      kind: 'command',             // 'command' | 'function' | 'concept'
      summary: 'Short definition.',
      example: 'index=main | timechart count by status',  // optional
      docUrl: 'https://help.splunk.com/...',              // optional
    },
  ],
}
```

---

## Workflow A: Add questions to an existing path

1. **Research** — Give your AI the public outline PDF URL from `learningPaths.ts` (`sourceOutlineUrl`) and ask for N original MCQs per domain section.
2. **Edit** — Append to the path’s chunk file(s) under `src/data/questions/<path>/` (e.g. `chunk1.ts`) or add a new chunk and export it from `index.ts`.
3. **IDs** — Use a consistent prefix (`pu-tv-042`, `ca-im-015`) and unique `domainId` per outline section.
4. **Coverage** — In dev mode, open the path’s timed review once. If the bank cannot satisfy domain quotas, the console warns:
   `[example-splunk-learning-engine] Question bank cannot fill timed review: need X in <domainId>, have Y.`
   Add questions until each domain has at least as many items as the timed review quota (see `examDomainQuotas` in `src/lib/selection.ts`).
5. **Validate** — `npm run build` && `npm run validate:splunk-docs`.

### Example prompt (paste into your harness)

```text
You are helping extend a Splunk learning demo (not exam prep). Use ONLY public Splunk documentation and this outline PDF: <sourceOutlineUrl>.

Task: Write 4 original multiple-choice questions for domain "<domainId>" / "<title>" (outline section <blueprintRef>, weight <examWeightPercent>%).

Rules:
- Four choices each; one correct; plausible distractors.
- TypeScript shape: Question from the project (id, domainId, stem, choices, correctIndex, explanation, docLinks).
- IDs: prefix "<prefix>-" and increment from <lastId>.
- docLinks: 1–2 help.splunk.com URLs from official Search/Admin manuals.
- Do not copy exam items or long passages from Splunk docs.

Output: a TypeScript array export ready to append to src/data/questions/<path>/chunkN.ts
```

---

## Workflow B: Add or change a glossary section

1. **Research** — Same public outline section; ask for overview paragraph + 8–15 terms (commands, functions, concepts).
2. **Edit** — Update the matching block in `src/data/glossary/<path>Glossary.ts` or a file under `glossary/domains/`.
3. **Register** — If `id` is new, add it to `GlossaryDomainId` in `src/data/glossary/types.ts` and to `DomainId` in `src/types.ts` when that domain also has questions.
4. **URLs** — Prefer shared constants from `src/data/questions/<path>/docs.ts` so `validate:splunk-docs` stays maintainable.
5. **Validate** — `npm run validate:splunk-docs` (glossary `referenceUrls` and entry `docUrl` fields are checked).

### Example prompt

```text
Research public Splunk Help for topic "<title>" (outline <blueprintRef>).

Produce a GlossaryDomain object: id "<id>", title, overview (one paragraph), referenceUrls (2 help.splunk.com links), entries (10 items with term, kind, summary; add example SPL for commands where useful).

Paraphrase only; link to docs; no proprietary exam content.

Output: TypeScript object matching src/data/glossary/types.ts GlossaryDomain.
```

---

## Workflow C: Add a new learning path (full track)

1. **`learningPaths.ts`** — Add a `LearningPath` with unique `id`, `hasInteractiveContent: true` if you ship a bank, `assessmentQuestionCount`, `assessmentDurationMinutes`, and public URLs.
2. **`src/types.ts`** — Extend `DomainId` with all new domain ids.
3. **`src/data/<path>Domains.ts`** — Export `*_DOMAINS`, `*_DOMAIN_BY_ID` (mirror `powerUserDomains.ts`).
4. **`src/data/questions/<path>/`** — Chunks + `docs.ts` + `index.ts` exporting `*Questions`.
5. **`src/data/glossary/<path>Glossary.ts`** — Export `*_GLOSSARY_DOMAINS`.
6. **`src/data/questions/index.ts`** — Re-export the question array.
7. **`src/data/trackResources.ts`** — Branch in `resolveLearningTrack()` for the new `path.id`.
8. **`src/data/glossary/index.ts`** — Add `getGlossaryDomainsForTrack()` branch if the path has its own glossary nav.
9. **Dev check** — Timed review console warning + manual practice on a few domains.
10. **CI locally** — `npm run build` && `npm run validate:splunk-docs`.

### Example prompt (new path)

```text
I am adding learning path id "<id>" to a Splunk learning demo.

Public sources:
- Topic page: <officialTopicUrl>
- Outline PDF: <sourceOutlineUrl>

Deliver:
1. List of DomainMeta rows (id, blueprintRef, title, examWeightPercent) matching the PDF.
2. DomainId union entries for types.ts.
3. Plan for question bank size (~1 question per outline point minimum per domain).
4. Glossary domain list aligned 1:1 with DomainMeta ids.

Do not include certification prep framing; this is AI-researched study material from public docs only.
```

---

## Workflow D: Refresh links or weights from a new public outline

1. Compare PDF/HTML section weights to `examWeightPercent` in the domains file.
2. Update `assessmentQuestionCount` / duration in `learningPaths.ts` if the public outline changed scale.
3. Re-run dev timed review to see quota warnings; add/remove questions per domain as needed.
4. Run `npm run validate:splunk-docs`; fix broken `help.splunk.com` paths (see `scripts/validate-splunk-doc-urls.mjs`).

---

## Checklist before you commit

- [ ] `npm run build` passes
- [ ] `npm run validate:splunk-docs` passes (or only pre-existing failures documented)
- [ ] New `domainId` / glossary `id` values added to type unions
- [ ] `trackResources.ts` resolves the path
- [ ] Question IDs are unique across the whole repo (`rg "id: 'your-id'" src`)
- [ ] No secrets, API keys, or proprietary exam text in the diff
- [ ] Stems/explanations are original paraphrases with doc links

---

## Optional: agent rules in your harness

- **Cursor** — Point the project root at this repo; reference `AGENTS.md` and this file in chat.
- **Claude Code** — Add a skill or `CLAUDE.md` snippet: “When editing Splunk learning content, follow docs/UPDATING-CONTENT.md.”
- **Batch generation** — Split work by domain chunk (one AI job per `chunkN.ts`) to stay within context limits; merge exports in `index.ts`.

---

## Troubleshooting

| Symptom | Likely fix |
|--------|------------|
| Console: cannot fill timed review | Add questions for the listed `domainId` until count ≥ quota |
| `validate:splunk-docs` 404 | Use URLs from Splunk Help search; mirror patterns in `docs.ts` |
| TypeScript error on `domainId` | Add id to `DomainId` in `src/types.ts` |
| Glossary domain missing in UI | Register in `getGlossaryDomainsForTrack` / glossary index |
| Progress looks wrong after renames | Avoid changing question `id`; users keep old stats in `localStorage` |
