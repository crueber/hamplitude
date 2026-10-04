import type { ReactNode } from 'react'
import { C, Diagram, T } from '../kit'

const THEIRS = C.resist
const MINE = C.signal

const ROWS: { when: string; sub: string; say: ReactNode }[] = [
  { when: 'Answer someone calling CQ', sub: 'their call first, then yours', say: <><tspan fill={THEIRS}>W1ABC</tspan> <tspan fill={MINE}>K2XYZ</tspan></> },
  { when: 'Call a known station on a repeater', sub: 'their call first, then yours', say: <><tspan fill={THEIRS}>W1ABC</tspan> <tspan fill={MINE}>K2XYZ</tspan></> },
  { when: 'Show you are listening on a repeater', sub: 'your call, then "listening"', say: <><tspan fill={MINE}>K2XYZ</tspan> listening</> },
  { when: 'Seek any contact, no repeater', sub: 'repeat a few times, then pause to listen', say: <>CQ CQ CQ, this is <tspan fill={MINE}>K2XYZ</tspan></> },
]

/** What to say, in what order. */
export function Calling() {
  return (
    <Diagram w={640} h={330} title="What to say: when answering CQ or calling a known station, say their call sign first then yours. To show you are listening, say your call sign then the word listening. To seek any contact, call CQ then this is and your call sign." caption={<><span style={{ color: 'var(--d-resist)' }}>■</span> their call sign &nbsp; <span style={{ color: 'var(--d-signal)' }}>■</span> your call sign. CQ means calling any station.</>}>
      {ROWS.map((r, i) => {
        const y = 12 + i * 78
        return (
          <g key={i}>
            <T x={14} y={y + 22} bold size={14}>{r.when}</T>
            <T x={14} y={y + 44} size={12.5} color={C.muted}>{r.sub}</T>
            <rect x={320} y={y + 4} width={306} height={52} rx={12} fill={C.fill} stroke={C.ink} strokeWidth={1.5} />
            <T x={338} y={y + 30} mono bold size={14}>{r.say}</T>
          </g>
        )
      })}
    </Diagram>
  )
}
