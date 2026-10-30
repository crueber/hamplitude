# Search engines and analytics

## What the build already does

The site is a single-page app, but every indexable page is **prerendered to static HTML** at build time
(`scripts/prerender.ts`), so crawlers get full content without running JavaScript, and the browser then hydrates it.

| | |
|---|---|
| Real URLs | `/technician/T5D/`, `/compendium/antennas/wire/half-wave-dipole/` (not `#/…`: search engines ignore everything after `#`) |
| Pages | 479: home, 3 license pages, 120 lessons, the compendium home, 10 sections, 44 subsections, 299 articles (plus info pages) |
| Per-page head | unique `<title>`, meta description (articles use their opening paragraph), canonical URL, `robots`, Open Graph + Twitter cards |
| Structured data | JSON-LD: `WebSite`, `Course`, `LearningResource` (lessons), `Article` (compendium) and `BreadcrumbList` |
| Discovery | `sitemap.xml`, `robots.txt`, internal links from the compendium index pages, `site.webmanifest` |
| Not indexed | practice, review, exam, settings, question bank (`noindex`; they're served by `404.html` as an SPA fallback) |
| Fast notification | **IndexNow** ping after each deploy (Bing, and through it DuckDuckGo; also Yandex, Naver, Seznam) |

Metadata for every URL is produced in one place, `src/lib/seo.ts`, used by both the prerenderer and client-side navigation.
`bun run brand` regenerates the social card (`og.png`) and icons. `bun scripts/hydration-check.ts` verifies every prerendered
page loads and hydrates without errors (needs `bun run build` and `bunx vite preview --port 4173`).

## Going live on hamplitude.net

The site builds for one of two homes, chosen by whether **`public/CNAME`** exists:

* absent → GitHub project page, `https://crueber.github.io/hamplitude/` (assets under `/hamplitude/`)
* present → custom domain at the root, `https://hamplitude.net/` (assets under `/`), canonical URLs and the sitemap use the domain

Do these together, because the base path changes:

1. **DNS** at your registrar. For the apex domain add four `A` records to GitHub Pages
   (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`) and, optionally, the matching `AAAA` records
   (`2606:50c0:8000::153` through `2606:50c0:8003::153`). For `www`, add a `CNAME` to `crueber.github.io`.
   (Check GitHub's "Managing a custom domain for your GitHub Pages site" page in case the addresses have changed.)
2. **GitHub → Settings → Pages → Custom domain**: enter `hamplitude.net`, save, and tick **Enforce HTTPS** once the certificate is issued.
3. **Commit `public/CNAME`** containing exactly `hamplitude.net` and push. The next deploy builds for the root, and the IndexNow job starts running.

## Tell the search engines (one-time, needs your accounts)

* **Google Search Console** (search.google.com/search-console): add `hamplitude.net` as a *Domain* property (verify with a DNS `TXT` record),
  or as a *URL prefix* property and put the verification token in `seo.config.json` → `googleSiteVerification`.
  Then **Sitemaps → add `https://hamplitude.net/sitemap.xml`**. This also gives you search queries, impressions and indexing problems.
* **Bing Webmaster Tools** (bing.com/webmasters): "Import from Google Search Console" is the quickest, or add the site and put the
  token in `seo.config.json` → `bingSiteVerification`. Submit the same sitemap. Bing feeds DuckDuckGo, Ecosia and others.
* **DuckDuckGo, Brave, Ecosia**: no console exists; they pick the site up from Bing/their own crawlers via the sitemap and `robots.txt`.
* Optional: Yandex Webmaster and Naver Search Advisor, if you want those markets.

Useful checks once live: Google's *Rich Results Test* and *URL Inspection*, validator.schema.org for the JSON-LD, and a
link-preview debugger for the social card. New sites can take days to weeks to appear; the sitemap and IndexNow speed that up.

## Analytics

The site uses a self-hosted **Umami** tracker (cookieless, no personal data, so no consent banner is needed, which matters because the
site promises that progress stays in the visitor's browser). GoatCounter was removed.

### Umami (self-hosted)

`index.html` also loads the Umami tracker from `https://umami.packden.us/script.js` (with this site's `data-website-id`). Because every
prerendered page and `404.html` is built from `index.html`, the tag is on every page. Umami counts client-side navigation itself. Test and
check scripts that load real pages should block `umami.packden.us` (as `scripts/hydration-check.ts` does) so they are not counted as visits.
