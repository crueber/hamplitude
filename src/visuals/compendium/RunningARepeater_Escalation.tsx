import { useState } from 'react'
import { C, Choice, Controls, Diagram, T } from '../kit'

type P = 'user' | 'repeater' | 'fault' | 'owner'
const PROBLEMS: { value: P; label: string }[] = [
  { value: 'user', label: 'Misuse by a user' },
  { value: 'repeater', label: 'Interference from another repeater' },
  { value: 'fault', label: 'Equipment fault' },
  { value: 'owner', label: 'Owner cannot continue' },
]

interface Step { who: string; color: string; a: string; b: string }
const STEPS: Record<P, Step[]> = {
  user: [
    { who: 'Control operator', color: C.signal, a: 'Note the time and what was heard; do not argue on', b: 'the air. Apply your written user policy.' },
    { who: 'Trustee / owner', color: C.power, a: 'Warn, then restrict. Limiting use to certain', b: 'stations is permitted (97.205(e)).' },
    { who: 'Control operator', color: C.signal, a: 'If it continues, shut the repeater off until it can', b: 'be stopped: do not let known violations carry on.' },
    { who: 'FCC (last resort)', color: C.resist, a: 'The user is accountable for what they send.', b: 'Report persistent unlawful operation to the FCC.' },
  ],
  repeater: [
    { who: 'Both owners', color: C.signal, a: 'Talk first, owner to owner: compare frequencies,', b: 'tones, power and antenna settings. Most cases end here.' },
    { who: 'Coordinator', color: C.current, a: 'Ask the coordinator to help. They keep the records', b: 'and know which repeater was coordinated first.' },
    { who: 'The rule', color: C.power, a: 'Equal responsibility, unless only one was coordinated:', b: 'the uncoordinated owner must fix it (97.205(c)).' },
    { who: 'FCC (last resort)', color: C.resist, a: 'If a good-faith effort fails, the FCC is', b: 'the last stop, not the first call.' },
  ],
  fault: [
    { who: 'Control operator', color: C.signal, a: 'Shut it down through the control link', b: 'if it is stuck on, off-frequency or not identifying.' },
    { who: 'Technician', color: C.good, a: 'Diagnose and repair, on site if needed.', b: 'Tower and roof work: see the safety articles.' },
    { who: 'Trustee / owner', color: C.power, a: 'Log the fault and the fix, and restore service', b: 'only when the cause is understood.' },
    { who: 'Users', color: C.current, a: 'Say what happened on the net or club channel,', b: 'so people know it is down or back.' },
  ],
  owner: [
    { who: 'Trustee / owner', color: C.power, a: 'Say so early. A succession plan, with spare keys', b: 'and codes held by others, is the point of planning.' },
    { who: 'Club or successor', color: C.signal, a: 'A club can designate a new trustee. An individual\'s license', b: 'is personal, so a new owner needs their own.' },
    { who: 'Coordinator', color: C.current, a: 'Tell the coordinator about any change of owner,', b: 'contact or call sign, or that the pair is being given up.' },
    { who: 'Directories', color: C.good, a: 'Update or remove the listing so users do not', b: 'chase a repeater that no longer answers.' },
  ],
}

/** When something goes wrong with a repeater: who acts, in what order. The FCC is the last step, not the first. */
export function RunningARepeater_Escalation() {
  const [p, setP] = useState<P>('user')
  const rowH = 72, y0 = 10
  return (
    <>
      <Diagram w={640} h={y0 + 4 * rowH + 4}
        title="What to do when a repeater has a problem, in order. For misuse by a user: log, apply the policy, shut it off if needed, then the FCC as a last resort. For interference from another repeater: owners talk, the coordinator helps, the rule on coordinated repeaters applies, then the FCC. For a fault: shut down, repair, log, tell users. If the owner cannot continue: plan succession, name a new trustee, tell the coordinator, update directories."
        caption="Order of steps shown; real cases vary. Rule cites are 47 CFR Part 97.">
        {STEPS[p].map((s, i) => {
          const y = y0 + i * rowH
          return (
            <g key={p + i}>
              <rect x={8} y={y} width={624} height={rowH - 8} rx={12} fill={C.fill} stroke={C.fill2} strokeWidth={2} />
              <circle cx={32} cy={y + (rowH - 8) / 2} r={14} fill={s.color} fillOpacity={0.25} stroke={s.color} strokeWidth={2} />
              <T x={32} y={y + (rowH - 8) / 2} anchor="middle" size={14} bold>{i + 1}</T>
              <T x={58} y={y + 17} size={14} bold color={s.color}>{s.who}</T>
              <T x={58} y={y + 36} size={12.5}>{s.a}</T>
              <T x={58} y={y + 53} size={12.5}>{s.b}</T>
            </g>
          )
        })}
      </Diagram>
      <Controls>
        <Choice label="Problem" options={PROBLEMS} value={p} onChange={setP} />
      </Controls>
    </>
  )
}
