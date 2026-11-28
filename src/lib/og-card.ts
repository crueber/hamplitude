/**
 * Per-article social cards (og:image). scripts/make-brand-assets.ts renders public/og/<article path>.jpg and records each
 * card's hash in src/data/og-cards.json. seo.ts uses a card only when its recorded hash matches the article's current title,
 * summary and section, so a new or renamed article falls back to the site-wide og.png until `bun run cards` is re-run.
 */
export const CARD_VERSION = 1

export interface CardInput { title: string; summary: string; section: string; adjacent?: boolean }

/** FNV-1a over the card's visible text: changes whenever the card would look different. */
export function cardHash(c: CardInput): string {
  const s = [CARD_VERSION, c.title, c.summary, c.section, c.adjacent ? 1 : 0].join('\u0001')
  let h = 0x811c9dc5
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 0x01000193) >>> 0
  return h.toString(36)
}

export const cardFile = (articlePath: string) => `og/${articlePath}.jpg`
