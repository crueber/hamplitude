import technician from './pools/technician.json'
import general from './pools/general.json'
import extra from './pools/extra.json'

export type LicenseId = 'technician' | 'general' | 'extra'

export interface Question {
  id: string
  group: string
  answer: number
  refs: string[]
  q: string
  choices: string[]
  figure?: string
}

export interface Group {
  id: string
  topics: string
  questions: string[]
}

export interface Subelement {
  id: string
  title: string
  examQuestions: number
  groups: Group[]
}

export interface Pool {
  license: LicenseId
  letter: 'T' | 'G' | 'E'
  name: string
  element: number
  release: string
  valid: { from: string; to: string }
  exam: { questions: number; toPass: number }
  subelements: Subelement[]
  questions: Question[]
}

export const LICENSES: LicenseId[] = ['technician', 'general', 'extra']

export const POOLS: Record<LicenseId, Pool> = {
  technician: technician as Pool,
  general: general as Pool,
  extra: extra as Pool,
}

export const LICENSE_BLURB: Record<LicenseId, { tagline: string; privileges: string }> = {
  technician: {
    tagline: 'Your first license',
    privileges: 'All VHF/UHF, plus limited HF privileges',
  },
  general: {
    tagline: 'Talk around the world',
    privileges: 'Most HF bands, worldwide',
  },
  extra: {
    tagline: 'Every band, every privilege',
    privileges: 'All amateur bands and modes',
  },
}

const QUESTION_INDEX = new Map<string, Question>()
const QUESTION_LICENSE = new Map<string, LicenseId>()
const GROUP_INDEX = new Map<string, { group: Group; sub: Subelement; license: LicenseId }>()

for (const lic of LICENSES) {
  const pool = POOLS[lic]
  for (const q of pool.questions) {
    QUESTION_INDEX.set(q.id, q)
    QUESTION_LICENSE.set(q.id, lic)
  }
  for (const sub of pool.subelements)
    for (const group of sub.groups) GROUP_INDEX.set(group.id, { group, sub, license: lic })
}

export const getQuestion = (id: string) => QUESTION_INDEX.get(id)
export const licenseOfQuestion = (id: string) => QUESTION_LICENSE.get(id)
export const getGroup = (id: string) => GROUP_INDEX.get(id)

export const allGroups = (lic: LicenseId): Group[] => POOLS[lic].subelements.flatMap((s) => s.groups)

export const isLicense = (s: string | undefined): s is LicenseId => !!s && s in POOLS

/** Subelement number as shown on the exam, e.g. "T5" */
export const subelementOf = (groupId: string) => groupId.slice(0, 2)
