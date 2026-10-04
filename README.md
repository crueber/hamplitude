# Hamplitude

Learn the ideas behind the US amateur radio exams (Technician, General, Extra) from the official
NCVEC question pools: short visual explanations, practice with shuffled answers, spaced review,
and a full practice exam shaped like the real one (one question drawn from every pool group).

Static site (Vite + React + TypeScript + MDX). No backend; progress lives in `localStorage`.

It has two halves that share one visual kit:

* **Exam lessons** (`#/technician`, `#/general`, `#/extra`): one lesson per question-pool group, practice, spaced review and a practice exam.
* **Compendium** (`#/compendium`): 286 concept articles on everything an operator should understand (antennas, radios, modes, electronics, propagation, operating, safety), in a three-level sidebar with full-text search. Not exam prep; lessons link to related articles ("Go deeper") and articles link back to the lessons they relate to.

```bash
bun install
bun run dev        # http://localhost:5173
bun run build      # type-check, build, then prerender ~460 pages into dist/ (deploy anywhere static)
bun run validate   # check lessons AND compendium articles against their authoring contracts
bun run test:flow  # Playwright smoke test of the learner flow (needs dev server)
bun scripts/hydration-check.ts   # load every prerendered page from the production build (needs `bunx vite preview --port 4173`)
bun scripts/sweep.ts [filter]     # render every lesson/article in light/dark/mobile: console errors, overflow, clipped diagram labels
bun scripts/interact.ts [filter]  # drive every slider/button; flags errors and NaN/undefined in text
                                  # filters: technician|general|extra|T5D|compendium|antennas/wire|half-wave-dipole ...
```

## Search engines and analytics

Every indexable page is prerendered to static HTML with full SEO metadata (canonical, Open Graph, JSON-LD), plus a sitemap, robots.txt
and an IndexNow ping on deploy; routes are real URLs, not hashes. Privacy-friendly analytics (GoatCounter, no third-party script, respects Do Not Track) switches on with one config value.
Going live on a custom domain is a `public/CNAME` file. See **SEO.md** for the go-live checklist and the Search Console / Bing steps.

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

## Compendium

```
src/compendium/taxonomy.ts                          the table of contents (sections > subsections > articles): single source of truth
src/compendium/content/<section>/<sub>/<slug>.mdx   an article body; title and summary come from the taxonomy
src/visuals/compendium/<PascalSlug>_<Name>.tsx      visuals written for an article
```

`bun run dev` and `bun run build` first run `scripts/gen-compendium.ts`, which writes the search index and the lesson-to-article
cross-links into `src/compendium/generated/` (git-ignored). Authoring guide: **CONTENT-COMPENDIUM.md**.
Helpers: `bun scripts/list-visuals.ts <keyword>` (find a reusable diagram), `bun scripts/find-groups.ts <keyword>` (find exam groups for an `<ExamLink>`).

## Layout

```
src/data/        typed pool access        src/lib/        progress store, spaced repetition, sessions
src/content/     lessons (mdx + json)     src/components/ quiz, exam runner, layout
src/visuals/     kit/ shared/ <license>/  src/pages/      routes (hash router)
src/compendium/  taxonomy, loader, sidebar, search  scripts/  parse-pools, validate-*, gen-compendium, sweep, interact, shot, flow-test
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
* The main JS bundle (~380 KB gzipped) holds all pools and explanations so feedback is instant and offline-friendly;
  splitting content per licence is the obvious next optimisation. The compendium search index (~270 KB gzipped) is a separate lazy chunk.
* Compendium articles state typical or illustrative figures as such, and avoid regulations, dates and program rules that change; readers are told to check current rules.

Not affiliated with the FCC, NCVEC, or any VEC. Always check ncvec.org for the pool in effect on your exam date.

## License

Copyright © 2026, Christopher Rueber (N0ZSY). Released under the [O'Saasy License](LICENSE): MIT-style permissions, plus a
condition that the software may not be used to directly compete with the original licensor by offering it to third parties as a
hosted or SaaS product.

Third-party material keeps its own terms: the question text comes from the NCVEC pools, which the NCVEC Question Pool Committee
released into the public domain, and the bundled fonts (Inter, Space Grotesk, JetBrains Mono, via Fontsource) are under the SIL Open Font License.
