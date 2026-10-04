import { C, Diagram, Ln, T, sinePath, useTime } from '../kit'

const LANES = [
  { name: 'HF', f: '14 MHz', cycles: 3, color: C.resist },
  { name: 'VHF', f: '146 MHz', cycles: 9, color: C.signal },
  { name: 'UHF', f: '446 MHz', cycles: 20, color: C.power },
  { name: 'Light', f: 'visible', cycles: 0, color: C.muted },
]

/** Three radio waves of very different frequency race — they arrive together. */
export function SameSpeed() {
  const { t, ref } = useTime(0.18)
  const W = 640, H = 270
  const x0 = 110, x1 = 600
  const p = t % 1.25 // pause at the line before restarting
  const run = Math.min(1, p)
  return (
    <Diagram w={W} h={H} title="Waves of different frequencies all travel at the speed of light and reach the finish line together" caption="Frequency changes how fast the wave wiggles, never how fast it travels." svgRef={ref}>
      {LANES.slice(0, 3).map((l, i) => {
        const cy = 50 + i * 68
        return (
          <g key={l.name}>
            <T x={14} y={cy - 8} bold size={16} color={l.color}>{l.name}</T>
            <T x={14} y={cy + 12} size={12.5} color={C.muted} mono>{l.f}</T>
            <Ln x1={x0} y1={cy} x2={x1} y2={cy} color={C.fill2} width={1.5} dash="2 5" />
            <path d={sinePath(x0, x0 + (x1 - x0) * run, cy, 18, l.cycles * run, 0)} fill="none" stroke={l.color} strokeWidth={3} strokeLinecap="round" />
            <circle cx={x0 + (x1 - x0) * run} cy={cy} r={6} fill={l.color} />
          </g>
        )
      })}
      <Ln x1={x1 + 8} y1={18} x2={x1 + 8} y2={222} color={C.good} width={3} dash="6 5" />
      <T x={x1 - 6} y={246} anchor="end" bold size={14} color={C.good}>all arrive together: 300,000,000 m/s</T>
    </Diagram>
  )
}
