# Agent instructions

**example-splunk-learning-engine** is a **concept tool**: AI-assisted research from public Splunk documentation and training outlines, compiled into a local learning demo. It is not certification prep software and answers are not guaranteed correct.

## When editing content

1. Follow **[docs/UPDATING-CONTENT.md](docs/UPDATING-CONTENT.md)** for file locations, types, prompts, and checklists.
2. Use **public Splunk sources only**; write original questions and glossary text.
3. Remind the user to **validate against official Splunk Help**—AI output may be wrong or outdated.
4. After glossary or `docLinks` changes, run `npm run validate:splunk-docs`.
5. Run `npm run build` before finishing.

## When editing app code

- Learning path metadata: `src/data/learningPaths.ts`
- Resolve path → bank: `src/data/trackResources.ts`
- UI entry: `src/App.tsx`, `src/components/MainMenu.tsx`

## Commands

```bash
npm ci
npm run dev
npm run build
npm run validate:splunk-docs
```
