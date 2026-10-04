# Authoring lessons for Hamplitude

Hamplitude teaches the **ideas behind** the official FCC question pools, so a learner can reason to
the answer even for a question they've never seen. Everything here serves that.

One **group** (e.g. `T5D`) = one lesson = one question drawn on the real exam. Each group has:

```
src/content/<license>/<GROUP>.mdx    the lesson (concept cards + visuals)
src/content/<license>/<GROUP>.json   { title, blurb, why: { "<QID>": { why, trap?, concept? } } }
src/visuals/<license>/<GROUP>_<Name>.tsx   visuals unique to this group (optional)
```

`<license>` is `technician`, `general`, or `extra`. **Study the three finished pilots before writing**:
`T3B` (physics + interactive), `T5D` (maths), `T1F` (regulations). Match their density and tone.

## Principles

1. **Concept first, never answer first.** Teach the mechanism so the answer becomes obvious. A learner who
   only memorises `C` has learned nothing; one who understands *why* can answer any variant of the question.
2. **Extremely concise.** Most ham-radio prose is wordy. Cut. If a sentence doesn't change what the learner
   can do or understand, delete it. No preamble, no "it is important to note", no history lessons.
3. **Show it.** Every concept card should have a visual (diagram, interactive, or at least a comparison
   table). Text-only cards are the exception. Visual learners and text learners must both be served by
   the *same* card, so the picture and the 1–3 sentences must say the same thing.
4. **Teach the group, not the questions.** Read all questions in the group, find the 2–5 underlying ideas,
   and teach those. The pool questions are the *test* of understanding, not the syllabus.
5. **Accuracy beats everything.** People take real exams on this. The pool's answer key is authoritative:
   your lesson must be consistent with the correct answer of every question in the group. If you believe
   an answer key is wrong, do NOT contradict it in the lesson. Teach what is consistent with the key and
   report your concern in your final message. Don't assert facts you aren't sure of; omit them.
   Don't invent FCC rules, band edges, or numbers beyond what the pool and syllabus support.
6. **Reason, don't recite.** For calculations show the formula and arithmetic. For rules, give the logic
   or a memory hook ("10 minutes and when you're done"). For lists that truly must be memorised
   (e.g. band edges), use a table or visual, plus a hook.

## Budgets (the validator enforces some of these)

| Thing | Target | Hard limit |
|---|---|---|
| Lesson title | ≤ 7 words, plain ("Ohm's law and circuits") | 60 chars |
| `blurb` | one sentence, ≤ 22 words, says what you'll be able to explain | 28 words (warn) |
| Concept cards per lesson | 2–5 (merge related ideas) | warn above 7 |
| Prose per card | ~25–60 words outside tables/visuals | — |
| `why` per question | ≤ 30 words, 1–2 sentences | 55 words (error) |
| `trap` | ≤ 20 words, only when a distractor is a classic mistake | 35 (warn) |

**`why`**: the concept behind *this* answer, in a way that would help with a *different* question on the same
idea. Maths: show the working (`R = E ÷ I = 90 ÷ 3 = **30 Ω**`). Never refer to answer letters (choices are
shuffled). Don't just restate the correct answer.
**`trap`**: shown only after a wrong answer. Say what the tempting wrong choice confuses. Skip it if there's nothing useful.
**`concept`**: the `id` of the card in your `.mdx` that teaches this. Include it on every `why`.

Inline markup in `why`/`trap`: `**bold**` and `` `code` `` only.

## The .mdx lesson

```mdx
import { OhmsLaw } from '@/visuals/shared/OhmsLaw'
import { T5E_Something } from '@/visuals/technician/T5E_Something'

<Concept id="short-kebab-id" title="A claim or question, not a topic label" qs="T5E01 T5E02 T5E03">

One to three sentences.

<T5E_Something />

<Key>The single thing to remember.</Key>

</Concept>
```

* **Every question id in the group must appear in exactly one or more `<Concept qs="…">`** (validator checks).
* Card titles state the idea ("Higher frequency, shorter wavelength"), not the topic ("Wavelength").
* Available without importing: `<Concept>`, `<Key>` (one-line takeaway), `<Callout kind="tip|warn|note" title="…">`,
  `<Mnemonic>` (memory hook), `<Formula label="…">`, `<Row cols="1fr 1fr">` (side-by-side on wide screens), `<Term>`.
* Markdown works: **bold**, lists, GFM tables (great for comparisons and "rule → answer").
* Import visuals explicitly at the top, `'@/visuals/…'` paths only. They code-split per lesson.
* **MDX gotchas**: never write a bare `<` or `{`/`}` in prose (`< 10` breaks the build; write "less than 10" or `&lt;`).
  Blank lines are required between a JSX tag and markdown content inside it. Use `<Callout>` text on its own lines or inline.
* Use real superscripts via unicode (`E²`), `×`, `÷`, `Ω`, `µ`, `λ`, `π`, `→`.
* The official figure for questions that reference one (`T-1`, `G7-1`, `E5-1` …) is shown automatically
  during practice. Still teach the underlying symbols/ideas yourself, with your own diagram.

## Visuals

Read the kit before drawing: `src/visuals/kit/` (`Diagram`, `T`, `Lines`, `Ln`, `Box`, controls, `symbols.tsx`, `util.ts`).
Finished examples to imitate: `src/visuals/shared/*` and `src/visuals/technician/T1F_*`.

**Reuse before building.** Shared visuals you can import as-is:
`EmWave`, `WavelengthExplorer`, `SpectrumBar`, `SameSpeed`, `OhmsLaw`, `SeriesParallel`, `RepeaterFlow`.
Don't edit `kit/` or `shared/` files. If a shared visual almost fits, write your own variant in your group's folder.
If you build something broadly reusable (resistor colour code, dB scale, SWR, antenna pattern…), you may add it
to `src/visuals/shared/` with a distinctive name, only if no equivalent exists. Check first (`ls src/visuals/shared`).

**New visual files**: `src/visuals/<license>/<GROUP>_<Name>.tsx` (the group prefix prevents collisions between authors).
Export a named React component. Props optional.

Rules:
* Wrap in `<Diagram w h title caption>`. `title` is the accessible description. `caption` is one short line.
* **Only theme tokens**: use `C.*` from the kit (`C.voltage`, `C.current`, `C.resist`, `C.power`, `C.signal`, `C.good`,
  `C.bad`, `C.ink`, `C.muted`, `C.fill`, `C.fill2`, `C.bg`). **No hex or rgb colours**: dark mode depends on this.
  Colour meaning is fixed site-wide: voltage red, current blue, resistance amber, power violet, signal/teal for waves.
* Draw to a 640-wide viewBox; text ≥ 12 px. Nothing may overlap or clip. Keep labels clear of lines and each other.
* **Interactive only when interaction teaches** (a slider that shows a relationship). Otherwise a clear static diagram,
  or a gentle animation via `useTime`. Everything must still read as a still frame (reduced-motion users).
* Pair a diagram with plain labels. Don't make the learner decode a clever picture.
* Fidelity: circuit symbols from `kit/symbols.tsx` are US-style and match what appears on the exam. Don't improvise symbols.
* Keep files small and dependency-free (React + kit only).

## Voice

Plain, direct, friendly. Second person where natural. No jargon without a one-line definition on first use.
No filler, no exclamation marks, no "simply". Prefer "Voltage is on top. To find anything else, divide." over a paragraph.

Good: *"Series: one path, so the same current flows through every part."*
Bad: *"In a series circuit, because there exists only a single path available for the charge carriers to travel along, the current will necessarily be identical at every point in the circuit."*

## Verify your work (all three, every time)

```bash
bunx tsc -b                                   # types, imports
bun scripts/show-group.ts T5E                  # read the group's questions + answer key
bun scripts/validate-content.ts T5E T5F       # contract: coverage, budgets, anchors, colours
bun scripts/shot-el.ts /technician/T5E "#anchor-id .diagram" /tmp/x.png          # light
bun scripts/shot-el.ts /technician/T5E "#anchor-id .diagram" /tmp/x-dark.png dark # dark
```

The dev server runs on `http://localhost:5173` (it's already up; don't start another). Open the screenshots
(Read the PNG) and **look**: overlapping labels, clipped text, unreadable colours in dark mode, confusing layout. Fix and re-shoot.
`shot-el.ts <route> <css-selector> <out.png> [dark]` screenshots the first match, so you can target a specific card or diagram.
`bun scripts/shot.ts <route> <out.png> --full [--dark] [--mobile]` shoots the whole page; check mobile (`--mobile`) for at least one lesson.
For interactive visuals, also drive them with a small Playwright script (see `scripts/flow-test.ts`) to confirm sliders update values.

Finish with the whole-site check `bunx tsc -b` once more. Another author is working in parallel on other groups; only touch your own files.
