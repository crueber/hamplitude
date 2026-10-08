import { useState } from 'react'
import { C, Choice, Controls, Diagram, T } from '../kit'

type Site = 'own' | 'shared'
type Work = 'existing' | 'new'
type Air = 'no' | 'maybe'
type Kind = 'need' | 'check' | 'low' | 'always'

const KIND: Record<Kind, { color: string; label: string }> = {
  need: { color: C.resist, label: 'Needed' },
  check: { color: C.signal, label: 'Check' },
  low: { color: C.muted, label: 'Unlikely' },
  always: { color: C.power, label: 'Always' },
}

interface Row { t: string; k: Kind; label?: string; note: string }

function rows(site: Site, work: Work, air: Air): Row[] {
  const own = site === 'own', fresh = work === 'new'
  return [
    own
      ? { t: "Owner's written agreement", k: 'check', note: 'Your own land: read your deed and any HOA covenants first' }
      : { t: "Owner's written agreement", k: 'need', note: 'A lease or license from the building or tower owner' },
    own
      ? fresh
        ? { t: 'Zoning, building and electrical permits', k: 'need', label: 'Likely', note: 'A new structure usually gets local review (PRB-1 may help)' }
        : { t: 'Zoning, building and electrical permits', k: 'check', note: 'Ask whether adding an antenna or cabinet needs a permit' }
      : fresh
        ? { t: 'Zoning, building and electrical permits', k: 'need', label: 'Likely', note: 'A new structure usually needs approval; settle who files' }
        : { t: 'Zoning, building and electrical permits', k: 'check', note: 'Ask who holds the permits: the site owner often does' },
    air === 'maybe'
      ? { t: 'FAA notice and FCC structure registration', k: 'check', note: own ? 'Over 200 ft or near a listed airport: FAA notice, FCC registration' : 'The structure owner registers it; tell them your antenna height' }
      : { t: 'FAA notice and FCC structure registration', k: 'low', note: 'Under 200 ft and clear of airport surfaces: typically not needed' },
    { t: 'RF exposure compliance', k: 'always', note: own ? 'Your duty as licensee; evaluate unless exempt; keep people clear' : 'Your duty as licensee; at shared sites tenants share data and fixes' },
    own
      ? { t: 'Other transmitters at the site', k: 'low', note: 'Mainly nearby towers; ask the neighbors if you know of any' }
      : { t: 'Other transmitters at the site', k: 'need', label: 'Expect', note: 'The owner may ask for filtering or a study; cooperate with tenants' },
    own
      ? { t: 'Power, grounding and insurance', k: 'check', note: 'Electrical code, lightning protection, your own insurance policy' }
      : { t: 'Power, grounding and insurance', k: 'need', label: 'Typical', note: 'Owners usually ask for electrical, grounding and insurance details' },
    fresh
      ? { t: 'Climbing safety and neighbors', k: 'need', note: 'A tower safety plan, qualified climbers, a friendly word with neighbors' }
      : { t: 'Climbing safety and neighbors', k: 'check', note: 'Qualified climbers with fall protection; tell the owner and neighbors' },
  ]
}

const SITE: { value: Site; label: string }[] = [
  { value: 'own', label: 'My own property' },
  { value: 'shared', label: "Someone else's tower or roof" },
]
const WORK: { value: Work; label: string }[] = [
  { value: 'existing', label: 'On an existing structure' },
  { value: 'new', label: 'New mast or tower' },
]
const AIR: { value: Air; label: string }[] = [
  { value: 'no', label: 'Under 200 ft, no airport near' },
  { value: 'maybe', label: 'Taller, or near an airport' },
]

/** An approvals checklist that reshapes with the site: who must agree, in roughly what order. */
export function SitePermitsAndLocalApprovals_Checklist() {
  const [site, setSite] = useState<Site>('shared')
  const [work, setWork] = useState<Work>('existing')
  const [air, setAir] = useState<Air>('no')
  const list = rows(site, work, air)
  const pitch = 54, y0 = 12
  const H = y0 + list.length * pitch + 8
  return (
    <>
      <Diagram w={640} h={H}
        title={`Approvals checklist for ${site === 'own' ? 'your own property' : "someone else's tower or roof"}, ${work === 'new' ? 'a new mast or tower' : 'an existing structure'}, ${air === 'maybe' ? 'taller than 200 feet or near an airport' : 'under 200 feet and not near an airport'}. In order: ${list.map((r) => `${r.t}: ${r.label ?? KIND[r.k].label}`).join('; ')}.`}
        caption="Typical situations, not legal advice: local rules and landlords differ. RF exposure applies to every station.">
        {list.map((r, i) => {
          const y = y0 + i * pitch
          const k = KIND[r.k]
          const dim = r.k === 'low'
          return (
            <g key={r.t} opacity={dim ? 0.7 : 1}>
              <rect x={4} y={y} width={632} height={pitch - 6} rx={10} fill={C.fill} stroke={k.color} strokeWidth={dim ? 1.5 : 2.5} />
              <circle cx={30} cy={y + (pitch - 6) / 2} r={13} fill={k.color} fillOpacity={0.25} />
              <T x={30} y={y + (pitch - 6) / 2} anchor="middle" bold size={13}>{i + 1}</T>
              <T x={56} y={y + 16} bold size={13.5}>{r.t}</T>
              <T x={56} y={y + 35} size={12.5} color={C.muted}>{r.note}</T>
              <rect x={528} y={y + 11} width={96} height={24} rx={12} fill={k.color} fillOpacity={0.2} stroke={k.color} strokeWidth={1.5} />
              <T x={576} y={y + 23} anchor="middle" bold size={12.5}>{r.label ?? k.label}</T>
            </g>
          )
        })}
      </Diagram>
      <Controls>
        <Choice label="Where the repeater goes" options={SITE} value={site} onChange={setSite} />
        <Choice label="What you are building" options={WORK} value={work} onChange={setWork} />
        <Choice label="Height and airports" options={AIR} value={air} onChange={setAir} />
      </Controls>
    </>
  )
}
