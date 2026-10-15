/* Content for the landing page (src/pages/Home.tsx). */
import { LICENSES, LICENSE_BLURB, POOLS } from '@/data'
import { useStore } from '@/lib/store'
import { licenseStats, pct } from '@/lib/stats'
import { SECTIONS, articleHref, getArticle, getSub, sectionArticleCount } from '@/compendium/taxonomy'

export const FEATURE_PATH = 'radio/propagation/ionosphere-layers'
export const COLLECTION = { section: 'activities', sub: 'repeater-setup' }
const COLLECTION_PICKS = [
  'activities/repeater-setup/repeater-roadmap',
  'activities/repeater-setup/planning-a-repeater',
  'activities/repeater-setup/repeater-frequency-coordination',
  'activities/repeater-setup/fcc-rules-for-repeaters',
  'activities/repeater-setup/repeater-hardware-and-duplexers',
]

export const TAGLINE = { a: "Don't memorize ham radio.", b: 'Understand it.' }
export const LEAD_BOLD = 'Everything an operator should understand.'
export const LEAD =
  'Hundreds of pages that break down ham radio concepts. Each concept is related with pictures and interactive widgets that help you deeply understand how they work, so you can get the most out of your practice!'
export const FEATURE_BLURB =
  'The reason HF reaches across oceans and VHF does not. Flip the diagram to see the same signal at two frequencies: one comes back down, the other leaves for good.'
export const EXAMS_DEK =
  'The exam lessons teach the same ideas in the order the official question pools ask them, with practice questions and a full mock exam. Every compendium article points to the lessons that cover it.'

export const fmtDate = (iso: string) => new Date(iso + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

/** Everything the landing page shows, resolved once. */
export function useLandingData() {
  const cards = useStore((s) => s.cards)
  const feature = getArticle(FEATURE_PATH)
  const collSub = getSub(COLLECTION.section, COLLECTION.sub)
  const collPicks = COLLECTION_PICKS.flatMap((p) => { const a = getArticle(p); return a ? [{ path: p, a }] : [] })
  const sections = SECTIONS.map((s) => ({ ...s, count: sectionArticleCount(s) }))
  const licenses = LICENSES.map((l) => {
    const p = POOLS[l]
    const st = licenseStats(cards, l)
    return {
      id: l, name: p.name, tagline: LICENSE_BLURB[l].tagline, privileges: LICENSE_BLURB[l].privileges,
      lessons: p.subelements.reduce((n, s) => n + s.groups.length, 0), questions: p.questions.length,
      toPass: p.exam.toPass, examQuestions: p.exam.questions, validFrom: fmtDate(p.valid.from), validTo: fmtDate(p.valid.to),
      started: st.seen > 0, mastered: pct(st.mastered, st.total),
    }
  })
  return {
    feature, featureHref: articleHref(FEATURE_PATH),
    collSub, collHref: `/compendium/${COLLECTION.section}/${COLLECTION.sub}`, collPicks: collPicks.map(({ path, a }) => ({ href: articleHref(path), title: a.title, summary: a.summary })),
    sections, licenses,
  }
}
