import { useState } from 'react'
import { C, Choice, Diagram, Ln, T } from '../kit'

type Who = 'you' | 'them' | 'shared'
interface Part { head: string; lines: string[]; who: Who }
interface Scenario { name: string; source: Part; path: Part; victim: Part }

const SCENARIOS: Record<string, Scenario> = {
  tx: {
    name: 'Your signal in a neighbour’s TV',
    source: { head: 'Your transmitter', lines: ['clean it up, lower power'], who: 'you' },
    path: { head: 'Air, mains wiring, cables', lines: ['move antenna, add chokes'], who: 'shared' },
    victim: { head: 'Their TV or stereo', lines: ['filter at its input', 'needs their cooperation'], who: 'them' },
  },
  noise: {
    name: 'A neighbour’s LED lamp in your receiver',
    source: { head: 'Their LED lamp or charger', lines: ['replace or filter it', 'needs their cooperation'], who: 'them' },
    path: { head: 'Air and mains wiring', lines: ['filter your power lead', 'move your antenna'], who: 'shared' },
    victim: { head: 'Your receiver', lines: ['noise-cancelling, DSP', 'a quieter antenna spot'], who: 'you' },
  },
  mic: {
    name: 'Your own antenna into your own mic cable',
    source: { head: 'Your antenna', lines: ['choke at the feed point'], who: 'you' },
    path: { head: 'Cables, coax shield', lines: ['ferrite chokes'], who: 'you' },
    victim: { head: 'Your microphone', lines: ['shielded cable, bypass'], who: 'you' },
  },
}

const TAG: Record<Who, { text: string; color: string }> = {
  you: { text: 'you can fix this', color: C.good },
  them: { text: 'their part to fix', color: C.resist },
  shared: { text: 'you can often help', color: C.signal },
}

/** An interference problem has a source, a path and a victim; each scenario shows which part you can actually fix. */
export function RfiAndEmi_Chain() {
  const [key, setKey] = useState('tx')
  const s = SCENARIOS[key]
  const cols = [
    { x: 14, label: 'SOURCE', part: s.source },
    { x: 232, label: 'PATH', part: s.path },
    { x: 450, label: 'VICTIM', part: s.victim },
  ]
  const mine = [s.source, s.path, s.victim].filter((p) => p.who === 'you').length
  return (
    <>
      <Diagram w={640} h={270} title={`Interference scenario: ${s.name}. Source: ${s.source.head}. Path: ${s.path.head}. Victim: ${s.victim.head}. Each part is tagged with whether you can fix it.`}
        caption="Every interference problem is a chain. Find which link you control, and start there.">
        {cols.map((c, i) => {
          const tag = TAG[c.part.who]
          return (
            <g key={c.label}>
              <rect x={c.x} y={26} width={176} height={188} rx={12} fill={C.fill} stroke={tag.color} strokeWidth={2.5} />
              <T x={c.x + 88} y={46} anchor="middle" size={12} bold color={C.muted}>{c.label}</T>
              <T x={c.x + 88} y={78} anchor="middle" size={13} bold>{c.part.head.length > 22 ? c.part.head.slice(0, c.part.head.lastIndexOf(' ', 22)) : c.part.head}</T>
              {c.part.head.length > 22 && <T x={c.x + 88} y={96} anchor="middle" size={13} bold>{c.part.head.slice(c.part.head.lastIndexOf(' ', 22) + 1)}</T>}
              {c.part.lines.map((l, j) => <T key={j} x={c.x + 88} y={128 + j * 18} anchor="middle" size={12} color={C.muted}>{l}</T>)}
              <rect x={c.x + 10} y={176} width={156} height={26} rx={13} fill={C.bg} stroke={tag.color} strokeWidth={2} />
              <T x={c.x + 88} y={189} anchor="middle" size={12} bold color={tag.color}>{tag.text}</T>
              {i < 2 && <Ln x1={c.x + 180} y1={120} x2={c.x + 214} y2={120} color={C.bad} width={3.5} arrow />}
            </g>
          )
        })}
        <T x={320} y={240} anchor="middle" size={13} color={C.muted}>{mine === 3 ? 'The whole chain is yours: the easiest case.' : mine === 1 ? 'You control one link. That is where your effort should go.' : 'Fix your own link first.'}</T>
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Scenario" value={key} onChange={setKey} options={[
          { value: 'tx', label: 'Your signal hurts them' },
          { value: 'noise', label: 'Their noise hurts you' },
          { value: 'mic', label: 'Your signal hurts you' },
        ]} />
      </div>
    </>
  )
}
