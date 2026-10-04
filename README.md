# Hamplitude

Learn the ideas behind the US amateur radio exams (Technician, General, Extra) from the official
NCVEC question pools: short visual explanations, practice with shuffled answers, spaced review,
and a full practice exam shaped like the real one (one question drawn from every pool group).

Static site (Vite + React + TypeScript + MDX). No backend; progress lives in `localStorage`.

```bash
bun install
bun run dev        # http://localhost:5173
bun run build      # type-check + production build into dist/ (deploy anywhere static)
bun run validate   # check lesson content against the authoring contract
bun run test:flow  # Playwright smoke test of the learner flow (needs dev server)
bun scripts/sweep.ts     # render every lesson in light/dark/mobile: console errors, overflow, clipped diagram labels
bun scripts/interact.ts  # drive every slider/button in every lesson; flags errors and NaN/undefined in text
```

## Question pools

| Class | Pool | Valid | Source release |
|---|---|---|---|
| Technician | 2026–2030 (409 Qs) | Jul 1 2026 – Jun 30 2030 | Feb 19 2026 revision |
| General | 2023–2027 (423 Qs) | Jul 1 2023 – Jun 30 2027 | 6th errata, Feb 4 2026 |
| Extra | 2024–2028 (603 Qs) | Jul 1 2024 – Jun 30 2028 | 4th errata, Feb 4 2026 |

Questions are parsed straight from the official PDFs in `data-src/` (public domain):

```bash
bun run pools      # data-src/*.pdf  ->  src/data/pools/*.json   (validates 4 choices, counts, groups)
bun run figures    # data-src/*-figures.pdf -> public/figures/*.svg  (needs poppler)
```

When NCVEC issues errata or a new pool, drop the new PDF into `data-src/`, update the path/metadata in
`scripts/parse-pools.ts`, run `bun run pools`, then `bun run validate` (it will flag any question that lost its explanation).

**The General pool expires June 30, 2027.** The next General pool (2027–2031) will need a refresh.

## Content

Each syllabus group (e.g. `T5D`, 120 in total) is one lesson, in `src/content/<license>/`:
`<GROUP>.mdx` (concept cards + visuals) and `<GROUP>.json` (title, blurb, and a one-line "why" per question).
See **CONTENT.md** for the authoring contract, visual kit, and verification loop.

## Layout

```
src/data/        typed pool access        src/lib/        progress store, spaced repetition, sessions
src/content/     lessons (mdx + json)     src/components/ quiz, exam runner, layout
src/visuals/     kit/ shared/ <license>/  src/pages/      routes (hash router)
scripts/         parse-pools, validate-content, shot (screenshots), flow-test
```

## Status

All 120 groups (35 Technician, 35 General, 50 Extra) have a lesson and a one-line "why" for every one of the
1,435 questions. Every lesson passes `validate`, `sweep` and `interact`, and every explanation was independently
fact-checked against the answer keys (calculations recomputed by script).

Known caveats worth a human glance before relying on them:

* **E0A10** (80 m RF exposure evaluation): the official key says an evaluation "must always be performed". Current FCC
  rules (§97.13(c)) exempt low-power stations by per-band thresholds. The lesson follows the exam key and notes this.
* Some visuals use **illustrative numbers** (marked "illustrative" / "schematic" on the diagram). The G3A propagation
  dashboard's good/poor cut-offs are rules of thumb, not official limits.
* The E8C bandwidth formulas (CW about 4 × WPM, FSK baud + 1.2 × shift) were reverse-engineered from the keyed answers.
* The main JS bundle (~340 KB gzipped) holds all pools and explanations so feedback is instant and offline-friendly;
  splitting content per licence is the obvious next optimisation.

Not affiliated with the FCC, NCVEC, or any VEC. Always check ncvec.org for the pool in effect on your exam date.
