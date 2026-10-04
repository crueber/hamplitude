# Authoring compendium articles

The **compendium** (`#/compendium`) is the companion to the exam lessons. It does not teach to a test. It explains
**every concept an amateur radio operator should understand**: antennas, radios, modes, electronics, propagation,
operating, safety. A curious newcomer should come away understanding *how and why*; an experienced operator should
find it accurate. Same voice as the lessons: **concise, concept-first, visual**.

Read `CONTENT.md` first (voice, visual kit and rules all carry over). This file covers what is different.
**The three finished pilots are your quality bar**:
`src/compendium/content/antennas/wire/half-wave-dipole.mdx` (visual-led),
`.../modes/cw/morse-alphabet.mdx` (interactive + reference tables),
`.../hobby/service/what-is-amateur-radio.mdx` (narrative overview).

## Files

```
src/compendium/taxonomy.ts                              the table of contents: DO NOT EDIT (shared by everyone)
src/compendium/content/<section>/<sub>/<slug>.mdx       your article body (path = its taxonomy path)
src/visuals/compendium/<PascalSlug>_<Name>.tsx          new visuals, named after the article, e.g. HalfWaveDipole_Standing.tsx
```

The page title and the one-line summary come from `taxonomy.ts`; your file is just the body. **Never write an h1.**
If you think a title/summary is wrong or an article is missing, say so in your final report; don't edit the taxonomy.

## Shape of an article

* **Opening section** (`## What it is`, or a heading that fits): say plainly what the thing is and why it matters, in 1-3 sentences. No history, no throat-clearing.
* **2-5 `##` sections** in a sensible order: what it is, how it works (the mechanism: *why*), the numbers that matter, in practice, pitfalls. Use `###` sparingly.
* **At least one visual or table.** Prefer a diagram that shows the mechanism. A comparison table is a fine second choice. Text-only articles are the exception.
* `<Facts items={[['Label', 'value'], …]} />` near the top when there are quantitative anchors (impedance, length, bandwidth, typical values).
* Cross-link generously with `<Ref to="slug">text</Ref>` (slug alone is enough; text defaults to the article title).
* `<ExamLink groups="T9A G9B" />` when the topic appears in the exam syllabus. Find groups with `bun scripts/find-groups.ts <keyword>`. Omit it if there is no real match.
* End with `<Related to="slug-a slug-b slug-c" />`, 3-6 slugs of closely related articles. Browse `src/compendium/taxonomy.ts` for slugs.

Layout components available without importing: `Facts`, `Ref`, `Related`, `ExamLink`, `Key`, `Callout` (`kind="tip|warn|note"`), `Mnemonic`, `Formula`, `Row`, `Term`. Do **not** use `Concept` (that is the lesson card).
Markdown works (bold, lists, GFM tables). MDX gotchas from `CONTENT.md` apply (no bare `<` or `{` in prose; blank lines around JSX blocks).

## Size

| | target | limits |
|---|---|---|
| prose | 250-600 words | 120 min, 1100 max (validator); `reference/tables/*` (glossary, formula sheet, band chart...) may run to 3200 |
| `##` sections | 2-5 | 2 min, 8 max |
| visuals | 1-3 | text-only is flagged |

Cut. Say it once. A diagram plus three crisp sentences beats a page of prose. Don't duplicate a neighbouring article:
each one has a distinct scope (see its taxonomy summary and its neighbours); link instead of repeating.

## Depth and accuracy (this matters more than anything)

Real people will learn from this and build antennas, climb towers and wire power supplies from it.

* **Explain mechanism, then consequence.** Why it works, then what that means at the bench or on the air.
* **Be correct or be silent.** If you are not certain of a number, regulation, band edge, date or product fact, leave it out or say "typically". Recompute every calculation with a script. Do not invent standards, part numbers, or specifications.
* **US-centric but not parochial.** Part 97/FCC is the baseline; say "in the US" when a rule is national, and mention that other countries differ where relevant. Avoid exact band-edge tables unless you are certain (the exam lessons already contain verified ones).
* **No time-sensitive claims** (current prices, which product is "best", whether a network or app is currently active, counts of operators). Describe categories and trade-offs, not shopping lists. Mention a product or software name only as a well-known example, never as an endorsement.
* **Safety content must be conservative and explicit.** No tips that could get someone hurt.
* **Be fair on contested topics** (e.g. which antenna is "best"): state the trade-offs.
* Label typical or illustrative figures as such, in text and on diagrams.

## Visuals

Reuse before building. `bun scripts/list-visuals.ts <keywords>` lists ~550 existing visuals (every lesson diagram, plus `shared/`) with
what each shows; import any of them from any folder (`@/visuals/general/G9B_DipoleLength`). You may wrap or copy-and-adapt one in your own file.
New visuals go in `src/visuals/compendium/` named `<PascalCaseSlug>_<Name>.tsx` (the slug prefix prevents collisions between authors).
All the rules in `CONTENT.md` apply: theme tokens only (`C.*`, never hex), `<Diagram title caption>`, text >= 12 px, no overlaps or clipping, readable as a still frame, interactive only when interaction teaches, dependency-free (React + kit).
Diagrams scroll sideways on phones (below ~520px), so draw to a 640-wide canvas.
Audio/animation must degrade gracefully (see `MorseAlphabet_Player.tsx` and the `useTime` hook).

## Verify (every article, every time)

```bash
bunx tsc -b
bun scripts/validate-compendium.ts <section/sub/slug | section/sub | section | slug>
bun scripts/sweep.ts <same filter>        # light, dark, mobile: console errors, overflow, clipped labels
bun scripts/interact.ts <same filter>     # drives every slider/button
bun scripts/shot.ts /compendium/<path> <png> --full [--dark] [--mobile]     # then LOOK at it
bun scripts/shot-el.ts /compendium/<path> ".diagram" <png> [dark]           # one element
```

The dev server is already on http://localhost:5173 (don't start another). ~28 authors work in parallel: write screenshots under
`/tmp/claude-1000/-home-crueber-dev-git-packden-us-crueber-hamplitude/36514926-6164-460e-8bc3-a6938d308995/scratchpad/shots/` with your article slug as a prefix; only touch your own files; ignore transient `tsc` errors in files that are not yours; no git.

## Final report (under 150 words)

Articles completed; any shared visuals added; claims you are less than certain of; any taxonomy suggestions (title, summary, missing or redundant articles).
