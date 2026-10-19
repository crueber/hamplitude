# Agent guide for Hamplitude

Hamplitude (https://hamplitude.net) teaches the *ideas behind* US amateur radio: exam lessons built from the official NCVEC
question pools, plus a compendium of concept articles. It is a static site: Vite, React 19, TypeScript and MDX, prerendered to
HTML, with no backend. Progress lives in the learner's `localStorage`.

Read this whole file before changing anything. The rules in **Git and deploys** exist because ignoring them broke the live site.

## Git and deploys (read first)

**Never push this repo directly to GitHub. Not once, not as a one-off URL, and never with `--force`.**

The canonical remote is the Forgejo server at git.packden.us (SSH on port 2288):

```
origin  ssh://git@git.packden.us:2288/crueber/hamplitude.git
```

Forgejo pushes to GitHub automatically, and GitHub Actions publishes to GitHub Pages (hamplitude.net) from there. A direct push to
GitHub never reaches Forgejo, so Forgejo's next sync force-pushes its older `main` over it and redeploys the old site. That
happened on 2026-10-15 and 2026-10-18.

- Before any push, run `git remote -v` and confirm `origin` is the Forgejo URL above. If it points anywhere else, stop and tell the user.
- Do not add, change or remove a remote on an ambiguous instruction. Ask which host is meant.
- Commit and push only when the user asks. Push with a plain `git push origin main`.
- Every push to `main` deploys (`.github/workflows/deploy.yml`: build, deploy to Pages, then an IndexNow ping). The build runs
  `bun run validate` and `bun run build`, so a failing check stops the deploy.
- After pushing, GitHub's `main` should match within a minute or two. Verify read-only with
  `gh api repos/crueber/hamplitude/branches/main --jq .commit.sha`, and watch the run with `gh run list -R crueber/hamplitude`
  (use `-R`, because `origin` is not a GitHub remote). Never push to GitHub to fix a mismatch.
- To confirm the live site, fetch pages from https://hamplitude.net/ and check the title, content and `sitemap.xml`. GitHub Pages
  caches for about ten minutes.
- `mise.toml` in the repo root is untracked on purpose. Leave it alone and do not commit it.

## Commands

```bash
bun install
bun run dev          # gen-compendium, then Vite on http://localhost:5173
bun run build        # gen-compendium, tsc -b, vite build, SSR build, prerender every route into dist/
bun run validate     # lessons AND compendium articles against their authoring contracts
bunx tsc -b          # types and imports (run this before every commit)
bun run lint         # oxlint; a few existing warnings (for example in Lesson.tsx) are known
bun run brand        # regenerate public/og.png and the icons (see Brand assets)
bun run pools        # data-src/*.pdf -> src/data/pools/*.json (see Question pools)
```

Other helpers (all under `scripts/`): `show-group.ts`, `find-groups.ts`, `list-visuals.ts`, `check-links.ts`, `sweep.ts`, `interact.ts`,
`shot.ts`, `shot-el.ts`, `flow-test.ts`, `hydration-check.ts`. `README.md` explains each. Note that the README still says
"hash router" and quotes old article counts; routes are real URLs (`createBrowserRouter`), so trust the code.

## Repository map

```
src/pages/            Home.tsx (+ home-data.ts), License, Lesson, Practice, Browse, Settings, Acknowledgements
src/components/       Layout (topbar, footer), WaveBand (hero), Quiz, ExamRunner, Ring, Seo, ...
src/styles/           tokens.css (colours, type, radii), app.css, home.css (.hm-*), compendium.css (.cmp-*)
src/routes.tsx        every route; shared by the browser (main.tsx) and the prerenderer (entry-server.tsx)
src/lib/              store (progress, settings, theme), srs, sessions, seo
src/data/             typed pool access, contributors.json, pools/*.json (generated)
src/content/<license>/<GROUP>.mdx + .json     exam lessons (technician, general, extra)
src/compendium/       taxonomy.ts (the table of contents), content/<section>/<sub>/<slug>.mdx, Sidebar, pages, search, Icons
src/visuals/          kit/ (drawing kit), shared/, <license>/, compendium/  (diagrams and interactives)
scripts/              data parsing, validators, generators, prerender, browser helpers
data-src/             official NCVEC PDFs (public domain)
public/               CNAME, icons, og.png, figures/*.svg
site.config.ts, seo.config.json, SEO.md       domain, base path, SEO and analytics settings
```

`src/compendium/generated/` is git-ignored and rebuilt by `scripts/gen-compendium.ts` (the search index and lesson-to-article links).
`bun run dev` and `bun run build` run it for you; run `bun run gen` yourself after editing the taxonomy if you use other scripts.

## Principles for all content

These come from the authoring guides. Read the full guides before writing (**CONTENT.md** for lessons, **CONTENT-COMPENDIUM.md** for
compendium articles). They are the contract that `bun run validate` enforces.

1. **Concept first, then the answer.** Explain the mechanism so the reader can reason to the result. Exam lessons never contradict the official answer key.
2. **Concise.** Cut filler. A diagram plus a few crisp sentences beats a page of prose. Articles are roughly 250 to 600 words.
3. **Show it.** Almost every card or article has a visual or at least a table.
4. **Be correct or be silent.** People take real exams and build real antennas from this. If you are not certain of a number, regulation, date or product fact, leave it out or say "typically". Recompute calculations with a script. Never invent standards or part numbers.
5. **Plain voice.** Direct, friendly, no jargon without a one-line definition, no exclamation marks, no "simply".
6. **No time-sensitive claims**: no prices, no "best" products, no current network sizes or activity, no firmware or app versions, no brand endorsements. Describe categories and trade-offs.

### Sourcing and regulatory content

- Rule and regulation articles must end with `<Sources items={[...]} />` linking primary sources (eCFR, regulators' own pages, a project's own documentation). The validator requires it for `activities/repeater-setup/` and for every section marked `adjacent` in the taxonomy.
- Open every URL you cite and confirm it says what you claim. Check with `bun scripts/check-links.ts <path-filter>`. fcc.gov blocks automated fetches, so do not cite pages you cannot verify; the eCFR API works from scripts (`https://www.ecfr.gov/api/versioner/v1/full/<date>/title-47.xml?part=95&section=...`, with `--compressed`) and gives exact rule text.
- Quote rules from their text, not from memory. Say "in plain words, not legal advice" in a warning callout on rules articles.
- When the facts come from a project's own documentation (for example Meshtastic or MeshCore), attribute them ("the Meshtastic documentation says") and do not repeat either project's opinion of the other. Describe mechanisms and trade-offs, and label your own reasoning as reasoning.
- Do not state which regulation a device complies under, or present a power figure as "the legal limit", unless a rule you have read says so.
- Do not use brand or product names, or app and flasher names, in articles.

## Compendium

The table of contents is `src/compendium/taxonomy.ts`: sections, subsections, articles. An article's body is
`src/compendium/content/<section>/<sub>/<slug>.mdx` (never write an h1; title and summary come from the taxonomy). Slugs are unique
across the whole compendium. Only list articles in the taxonomy that you have written, because unwritten ones show as "soon" and are prerendered.

- **Adding an article**: add its entry to the taxonomy, write the `.mdx`, optionally a visual in `src/visuals/compendium/<PascalSlug>_<Name>.tsx`, then run `bun scripts/validate-compendium.ts <section/sub/slug>`.
- **Layout components** (no import needed): `Facts`, `Ref`, `Related`, `ExamLink`, `Key`, `Callout`, `Mnemonic`, `Formula`, `Row`, `Term`, `Sources`. Do not use `Concept` (that is the lesson card). Link other articles with `<Ref to="slug" />` and end with `<Related to="slug-a slug-b" />`.
- **MDX gotchas**: never write a bare `<` or `{` in prose (use "less than" or `&lt;`), and leave blank lines around JSX blocks.
- **Adjacent sections** (`adjacent: true`) are things that are not amateur radio but are close enough to explain (GMRS, FRS, CB, MURS, Meshtastic, MeshCore). They are listed apart in the sidebar under "Beyond ham radio", carry a "Not amateur radio" tag, and show a banner on section and subsection pages. A section or subsection can set a `note` (the banner text). Keep the wording accurate for that service: for example license-free is not "licensing-free of rules".
- Adjacent sections are left out of the landing page's topic tiles (`src/pages/home-data.ts`).
- The compendium does not show article counts anywhere (sidebar, home page or section pages). Do not add them back.
- Search: `scripts/gen-compendium.ts` rebuilds the index from the taxonomy and the MDX files.
- Useful helpers: `bun scripts/list-visuals.ts <keyword>` (find a reusable diagram), `bun scripts/find-groups.ts <keyword>` (exam groups for an `<ExamLink>`).

## Exam lessons and question pools

- One lesson per syllabus group (for example `T5D`): `src/content/<license>/<GROUP>.mdx` and `<GROUP>.json`. See CONTENT.md for budgets and the `why`/`trap` format.
- Pool questions are parsed from the PDFs in `data-src/`. **Never edit an answer key.** To refresh a pool, put the new PDF in `data-src/`, update `scripts/parse-pools.ts`, run `bun run pools` then `bun run validate`.
- The General pool expires on June 30, 2027, so it will need a refresh.

## Visuals (diagrams)

- Use the drawing kit in `src/visuals/kit/` (`Diagram`, `T`, `Lines`, `Ln`, `Box`, controls). Wrap every diagram in `<Diagram w h title caption>`; `title` is the accessible description.
- **Theme tokens only** (`C.*` from the kit). Never hex or rgb colours: dark mode depends on it. Colour meaning is fixed: voltage red, current blue, resistance amber, power violet, signal and waves teal.
- Draw to a 640-wide canvas with text at 12 px or larger. Diagrams scroll sideways on phones, so do not rely on narrower layouts.
- **Nothing may overlap or clip.** Keep labels short and widths generous. Earlier diagrams overflowed their boxes: avoid monospace text for row labels in tight layouts, and make sure a label fits inside its box in a wider-than-expected font.
- Make interactives only when interaction teaches. Everything must read as a still frame, and animation must degrade for reduced motion.
- New files are named `<PascalSlug>_<Name>.tsx` so authors do not collide. Reuse before building; do not edit `kit/` or `shared/`.

## Design rules for the site itself

- **Dark mode is the primary mode.** Check every visual change in dark first, then light. Headless browsers render light by default (the stored theme is `system`), so set `document.documentElement.dataset.theme = 'dark'` after loading the page.
- Check at least 390 px (phone), 768 px (tablet) and 1440 px (desktop), and confirm `document.documentElement.scrollWidth` equals the viewport width (no sideways scroll).
- **The tagline is fixed**: "Don't memorize ham radio." on the first line and "Understand it." on the second, always two lines. It appears in `src/pages/home-data.ts`, `index.html`, `src/lib/seo.ts` and `scripts/make-brand-assets.ts`. Change all four together and regenerate the brand assets.
- The landing headline's font size is calculated from the viewport so the longer line never wraps (about 8% of the content width). If you change the headline's width, recompute it. Do not use container query units (`cqi`): they could not be verified in the headless renderer.
- Landing page parts: `Home.tsx` (hero, tabbed switcher with "Explore the compendium" and "Exam study guides"), `home.css` (`.hm-*` classes only), `WaveBand.tsx` (the window-wide wave band). The band sits outside the centred column, and its rings layer rises behind the headline and, faintly, through the translucent topbar (`z-index: 20`, 82% opaque with a blur). Keep the rings faint enough that text stays readable in both themes.
- Both exam panels stay in the prerendered HTML (the inactive one is `hidden`), and exactly one element has `id="exams"`.
- CSS in this app is global. Give anything new its own prefix and never reuse another feature's class names.
- Keep the page `<title>` and SEO text in step with content changes (`src/lib/seo.ts`).

## Verify before you commit

Run all of these, and **look at the screenshots you take**:

```bash
bunx tsc -b
bun run validate                       # or: bun scripts/validate-compendium.ts <filter>
bun scripts/check-links.ts <filter>    # for articles with Sources
bun run build                          # prerenders every page; the page count rises when you add routes
```

- Render the pages you changed in dark and light at phone and desktop widths. `scripts/shot.ts` and `scripts/shot-el.ts` take screenshots (see CONTENT.md for usage); `sweep.ts` and `interact.ts` catch console errors, overflow, clipped diagram labels and NaN text.
- After a build, `dist/sitemap.xml` should list new routes, and the prerendered HTML should contain the content.
- Read each screenshot yourself. A measurement such as scroll width does not show overlapping or clipped labels.

## Tooling notes for this machine

- The Playwright helper scripts launch `/usr/bin/chromium`. On this machine Chromium is a snap at `/snap/bin/chromium`, and `scripts/make-brand-assets.ts` honours a `CHROMIUM` environment variable. The snap cannot read files in `/tmp`, so give it a temp directory under the home directory: `TMPDIR=~/brand-tmp CHROMIUM=/snap/bin/chromium bun run brand` (create and remove `~/brand-tmp` yourself).
- A lightweight browser, Obscura (`~/.local/bin/obscura`), can render pages and take screenshots: `obscura serve --port <port> --allow-private-network`, then connect with `playwright-core` `connectOverCDP`. Use a port other than 9222, which another process may hold. Its layout engine renders real pages, but in testing it did not honour container query units, and it may not apply `backdrop-filter`, so check the translucent header in a real browser if it matters. A pointer click through it did not switch tabs: trigger clicks with `element.click()` in `page.evaluate`.
- Do not run `pkill -f vite` or `pkill -f obscura` from your shell: the pattern also matches your own shell command and kills it. Find the PID with `ss -ltnp` and `kill <pid>`.
- Start at most one dev server, and stop servers you started when you are done.

## Brand assets

`bun run brand` regenerates `public/og.png` (the social card), the app icons and the favicon from `scripts/make-brand-assets.ts`. Run it whenever the tagline or logo changes, and open `public/og.png` to check that the headline fits.

## Domain, SEO and analytics

`public/CNAME` is the custom-domain switch (it holds `hamplitude.net`). `site.config.ts` derives the base path and canonical origin from it. `seo.config.json` holds site-verification codes, the IndexNow key, the analytics code and the contact address. See `SEO.md` for details. Every indexable page is prerendered with a canonical URL, Open Graph tags and JSON-LD, and `sitemap.xml` is generated from the routes and taxonomy.

## Contributors and licence

Contributors are thanked on the Acknowledgements page; add them to `src/data/contributors.json` (see CONTRIBUTING.md). The project is under the O'Saasy License (`LICENSE`); question text is public domain from the NCVEC and fonts are under the SIL Open Font License. The site is not affiliated with the FCC, the NCVEC or any VEC, and must not claim to be.
