import { useState } from 'react'
import { C, Choice, Controls, Diagram, T } from '../kit'

type Goal = 'emcomm' | 'club' | 'link' | 'hole' | 'digital'

const GOALS: { value: Goal; label: string }[] = [
  { value: 'emcomm', label: 'Emergency' },
  { value: 'club', label: 'Club net' },
  { value: 'link', label: 'Linking' },
  { value: 'hole', label: 'Coverage hole' },
  { value: 'digital', label: 'Digital node' },
]

const ROWS = ['Band leaning', 'Coverage goal', 'Backup power', 'Access policy', 'Money goes to', 'Talk first to']
const COLORS = [C.current, C.signal, C.voltage, C.power, C.resist, C.good]

/** Typical leanings only; every real project is decided with local operators and the coordinator. */
const PLAN: Record<Goal, [string, string][]> = {
  emcomm: [
    ['VHF or UHF, matching what the served', 'agencies and local groups already use'],
    ['Reliable across the area served, including', 'shelters, hospitals and the roads between them'],
    ['Essential: batteries, and a plan for a', 'longer outage such as a generator'],
    ['Usually open to every licensed amateur', 'so volunteers can reach it'],
    ['Resilience: power, a sturdy site,', 'spare parts, good receive performance'],
    ['The emergency group and the agencies,', 'then the coordinator and the landlord'],
  ],
  club: [
    ['2 m or 70 cm typically; whichever has', 'a free coordinated pair near you'],
    ['Where members live, work and drive,', 'not necessarily the widest area'],
    ['Worth having; a short outage is', 'an inconvenience, not a crisis'],
    ['Open, or tone-access with a published', 'tone; a club may add a members policy'],
    ['A reliable simple controller and', 'a good antenna system'],
    ['Club members, nearby repeater owners,', 'then the coordinator'],
  ],
  link: [
    ['The band the linked repeaters already use,', 'plus a separate link path (radio or internet)'],
    ['Enough overlap or a clear path to', 'reach the system you link to'],
    ['Needed at both ends, or the link', 'fails when either end does'],
    ['Often tone-controlled so only', 'intended users trigger the link'],
    ['Link radios or an internet connection,', 'and a controller that can link'],
    ['Owners of the repeaters to link; the', 'coordinator for repeater and link channels'],
  ],
  hole: [
    ['Usually the band of the repeater nearby,', 'so users\' radios already have it'],
    ['A specific valley, tunnel mouth or road,', 'not a wider area'],
    ['Moderate; match what the main repeater has', 'so the weak point is not this one'],
    ['As the system it supports, so users', 'meet one policy'],
    ['The antenna and the site: terrain is', 'the problem you are solving'],
    ['The owner of the existing repeater, who may', 'prefer an extra receiver to a new pair'],
  ],
  digital: [
    ['2 m or 70 cm typically; the mode\'s', 'network and your local coordinator guide it'],
    ['Where network users are; a digital', 'signal needs a good margin to decode'],
    ['Power for the repeater and for the', 'internet connection it depends on'],
    ['Set by the network\'s own rules,', 'plus yours for the RF side'],
    ['Controller and gateway, internet link,', 'and the usual radio and antenna'],
    ['The network administrators and the', 'coordinator, who still coordinates the RF channel'],
  ],
}

/** A planning worksheet: choose the purpose and see what it typically implies for band, coverage, backup, access, spending and who to talk to. */
export function PlanningARepeater_Worksheet() {
  const [g, setG] = useState<Goal>('emcomm')
  const rowH = 56, y0 = 38
  const H = y0 + ROWS.length * rowH + 8
  return (
    <>
      <Diagram w={640} h={H}
        title="A repeater planning worksheet. Choosing a purpose (emergency communications, club net, linking, filling a coverage hole, or a digital network node) changes the typical band leaning, coverage goal, backup power, access policy, where the money goes, and who to talk to first."
        caption="Typical leanings, not rules. Local operators and the coordinator have the last word on what fits your area.">
        <T x={14} y={18} size={14} bold>If the purpose is: {GOALS.find((x) => x.value === g)!.label.toLowerCase()}</T>
        {ROWS.map((r, i) => {
          const y = y0 + i * rowH
          return (
            <g key={r}>
              <rect x={8} y={y} width={624} height={rowH - 6} rx={10} fill={C.fill} stroke={C.fill2} strokeWidth={2} />
              <rect x={8} y={y} width={6} height={rowH - 6} rx={3} fill={COLORS[i]} />
              <T x={28} y={y + (rowH - 6) / 2} size={13.5} bold color={COLORS[i]}>{r}</T>
              <T x={190} y={y + 15} size={12.5}>{PLAN[g][i][0]}</T>
              <T x={190} y={y + 34} size={12.5}>{PLAN[g][i][1]}</T>
            </g>
          )
        })}
      </Diagram>
      <Controls>
        <Choice label="Purpose of the repeater" options={GOALS} value={g} onChange={setG} />
      </Controls>
    </>
  )
}
