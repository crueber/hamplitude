import { useState } from 'react'
import { C, Choice, Controls, Diagram, Lines, T } from '../kit'

type Who = 'sender' | 'owner' | 'other' | 'coord' | 'fcc'
type Kind = 'answers' | 'clear' | 'advises' | 'acts' | 'decides' | 'none'

const PARTIES: { id: Who; name: string[] }[] = [
  { id: 'sender', name: ['Sending', "station's control", 'operator'] },
  { id: 'owner', name: ['Repeater licensee', 'and control', 'operator'] },
  { id: 'other', name: ["Other repeater's", 'licensee'] },
  { id: 'coord', name: ['Frequency', 'coordinator'] },
  { id: 'fcc', name: ['FCC'] },
]

const KIND: Record<Kind, { color: string; defaultLabel: string }> = {
  answers: { color: C.resist, defaultLabel: 'Answers for it' },
  clear: { color: C.good, defaultLabel: 'Not accountable' },
  advises: { color: C.signal, defaultLabel: 'Advises only' },
  acts: { color: C.power, defaultLabel: 'Can enforce' },
  decides: { color: C.resist, defaultLabel: 'Decides' },
  none: { color: C.muted, defaultLabel: 'Not involved' },
}

interface Scenario {
  id: string
  button: string
  title: string
  parts: Partial<Record<Who, [Kind, string?]>>
  lines: string[]
  cite: string
}

const SCENARIOS: Scenario[] = [
  {
    id: 'content', button: 'Prohibited content', title: 'A user sends something the rules forbid, and the repeater relays it',
    parts: { sender: ['answers'], owner: ['clear'], fcc: ['acts'] },
    lines: ['The control operator of the sending station is responsible.', "The repeater's control operator is not accountable for content it", 'retransmits inadvertently. This matches the Technician exam (T1F).'],
    cite: '47 CFR 97.205(g), 97.103(a)',
  },
  {
    id: 'id', button: 'No call sign', title: 'The repeater runs without identifying itself',
    parts: { owner: ['answers'], fcc: ['acts'] },
    lines: ['A repeater is a station, so it must send its own call sign at the end of', 'each communication and at least every 10 minutes during one.', 'Its licensee and control operator answer for that, not the users.'],
    cite: '47 CFR 97.119(a), 97.103(a), 97.105(a)',
  },
  {
    id: 'both', button: 'Both coordinated', title: 'Two coordinated repeaters interfere with each other',
    parts: { owner: ['answers', 'Equally'], other: ['answers', 'Equally'], coord: ['advises', 'Often helps'] },
    lines: ['Neither licensee is favored: both are equally and fully responsible', 'for resolving the interference. A coordinator may help, but a', 'coordinator cannot order anyone to change.'],
    cite: '47 CFR 97.205(c)',
  },
  {
    id: 'unco', button: 'One uncoordinated', title: 'Your uncoordinated repeater interferes with a coordinated one',
    parts: { owner: ['answers', 'Primary duty'], other: ['clear', 'Not primary'], coord: ['advises'] },
    lines: ['When only one repeater was recommended by a frequency coordinator, the', 'other (non-coordinated) licensee has primary responsibility to resolve', 'the interference. Coordination does not decide who may transmit.'],
    cite: '47 CFR 97.205(c)',
  },
  {
    id: 'fcc', button: 'Stop notice', title: 'A Regional Director says the repeater is transmitting improperly',
    parts: { owner: ['answers'], fcc: ['acts'] },
    lines: ['Automatic control must stop when a Regional Director notifies the station', 'that it is transmitting improperly or causing harmful interference, and', 'must not resume without prior approval from the Regional Director.'],
    cite: '47 CFR 97.109(d)',
  },
  {
    id: 'closed', button: 'Members only', title: 'The owner limits the repeater to certain users',
    parts: { owner: ['decides'], coord: ['advises', 'Hears disputes'] },
    lines: ['Limiting use to certain stations is permitted. That does not give the', 'repeater exclusive use of its frequency: the rules say no frequency is', 'assigned for the exclusive use of any station.'],
    cite: '47 CFR 97.205(e), 97.101(b); FCC letter DA 09-2559',
  },
]

/** Who answers in six situations involving a repeater: sender, repeater owner, other repeater, coordinator, FCC. */
export function FccRulesForRepeaters_WhoAnswers() {
  const [id, setId] = useState(SCENARIOS[0].id)
  const sc = SCENARIOS.find((s) => s.id === id)!
  const bw = 116, gap = 14, x0 = 2
  return (
    <>
      <Diagram w={640} h={322}
        title="Who answers in six repeater situations. Prohibited content relayed: the sending station's control operator answers and the repeater's control operator is not accountable for inadvertent retransmission. No call sign: the repeater licensee and control operator answer. Two coordinated repeaters interfere: both licensees are equally responsible. One uncoordinated: that licensee has primary responsibility. A Regional Director's notice: automatic control must stop. Members only: the owner decides but gains no exclusive frequency."
        caption="Choose a situation. Coordinators advise; the rules put responsibility on licensees and control operators.">
        {PARTIES.map((p, i) => {
          const part = sc.parts[p.id]
          const kind: Kind = part ? part[0] : 'none'
          const k = KIND[kind]
          const label = part?.[1] ?? k.defaultLabel
          const x = x0 + i * (bw + gap)
          const active = kind !== 'none'
          return (
            <g key={p.id} opacity={active ? 1 : 0.5}>
              <rect x={x} y={14} width={bw} height={112} rx={12} fill={C.fill} stroke={k.color} strokeWidth={active ? 3 : 1.5} />
              <Lines x={x + bw / 2} y={36} lines={p.name} lh={18} size={13} bold anchor="middle" />
              <rect x={x + 6} y={90} width={bw - 12} height={26} rx={13} fill={k.color} fillOpacity={0.2} stroke={k.color} strokeWidth={1.5} />
              <T x={x + bw / 2} y={103} anchor="middle" size={12} bold>{label}</T>
            </g>
          )
        })}
        <rect x={2} y={142} width={636} height={170} rx={12} fill={C.fill} stroke={C.fill2} strokeWidth={2} />
        <T x={18} y={166} size={14.5} bold>{sc.title}</T>
        <Lines x={18} y={196} lines={sc.lines} lh={22} size={13.5} />
        <T x={18} y={292} size={12.5} color={C.muted} mono>{sc.cite}</T>
      </Diagram>
      <Controls>
        <Choice label="Situation" options={SCENARIOS.map((s) => ({ value: s.id, label: s.button }))} value={id} onChange={setId} />
      </Controls>
    </>
  )
}
