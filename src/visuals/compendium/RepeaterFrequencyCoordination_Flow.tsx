import { C, Diagram, T } from '../kit'

type Lane = 'you' | 'coord'
const STEPS: { lane: Lane; t: string; d: string }[] = [
  { lane: 'you', t: 'Gather the facts', d: 'Site, height, power, mode, tones' },
  { lane: 'you', t: 'Send the application', d: "To your area's coordinator" },
  { lane: 'coord', t: 'Check records and model', d: 'Against coordinated pairs nearby' },
  { lane: 'coord', t: 'Recommend, or ask for changes', d: 'A pair and an access tone or code' },
  { lane: 'you', t: 'Build and get on the air', d: 'Typically within a set time' },
  { lane: 'coord', t: 'Confirm and list it', d: 'Often after a period on the air' },
  { lane: 'you', t: 'Report changes', d: 'A major change is a new coordination' },
]

const LANE = {
  you: { x: 14, label: 'You and your club', color: C.signal },
  coord: { x: 336, label: 'The frequency coordinator', color: C.current },
}

/** Swim-lane flow of a typical repeater coordination request. */
export function RepeaterFrequencyCoordination_Flow() {
  const bw = 290, bh = 50, pitch = 62, y0 = 52
  const H = y0 + STEPS.length * pitch + 6
  return (
    <Diagram w={640} h={H}
      title="A typical repeater coordination request in seven steps. You gather the technical facts and send the application. The coordinator checks its records, models interference and recommends a frequency pair and access tone, or asks for changes. You build the repeater and put it on the air within the time allowed. The coordinator confirms and lists it. Afterwards you report changes, and a major change is a new coordination."
      caption="Typical steps drawn from two regional coordinators' published procedures; yours will differ in detail and timing.">
      {(Object.keys(LANE) as Lane[]).map((k) => (
        <g key={k}>
          <rect x={LANE[k].x - 4} y={4} width={bw + 8} height={H - 8} rx={12} fill={LANE[k].color} fillOpacity={0.07} />
          <T x={LANE[k].x + bw / 2} y={26} anchor="middle" bold size={14} color={LANE[k].color}>{LANE[k].label}</T>
        </g>
      ))}
      {STEPS.slice(0, -1).map((s, i) => {
        const n = STEPS[i + 1]
        const ax = LANE[s.lane].x + bw / 2, bx = LANE[n.lane].x + bw / 2
        const y1 = y0 + i * pitch + bh, y2 = y0 + (i + 1) * pitch
        const mid = (y1 + y2) / 2
        const d = ax === bx ? `M${ax},${y1} V${y2 - 2}` : `M${ax},${y1} V${mid} H${bx} V${y2 - 2}`
        return <path key={i} d={d} fill="none" stroke={C.muted} strokeWidth={2} strokeLinejoin="round" markerEnd="url(#hx-arrow)" />
      })}
      {STEPS.map((s, i) => {
        const x = LANE[s.lane].x, y = y0 + i * pitch, col = LANE[s.lane].color
        return (
          <g key={s.t}>
            <rect x={x} y={y} width={bw} height={bh} rx={10} fill={C.fill} stroke={col} strokeWidth={2.5} />
            <circle cx={x + 24} cy={y + bh / 2} r={13} fill={col} fillOpacity={0.25} />
            <T x={x + 24} y={y + bh / 2} anchor="middle" bold size={13}>{i + 1}</T>
            <T x={x + 46} y={y + 17} bold size={13.5}>{s.t}</T>
            <T x={x + 46} y={y + 36} size={12.5} color={C.muted}>{s.d}</T>
          </g>
        )
      })}
    </Diagram>
  )
}
