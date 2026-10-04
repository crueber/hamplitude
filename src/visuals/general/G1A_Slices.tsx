import { C, Diagram, Ln, T } from '../kit'

interface Row {
  name: string
  lo: number
  hi: number
  s: number
  e: number
  ok: boolean
  verdict: string
}
const ROWS: Row[] = [
  { name: '40 m', lo: 7.0, hi: 7.3, s: 7.125, e: 7.175, ok: false, verdict: 'Extra only' },
  { name: '15 m', lo: 21.0, hi: 21.45, s: 21.275, e: 21.3, ok: true, verdict: 'General OK' },
  { name: '10 m', lo: 28.0, hi: 29.7, s: 28.0, e: 28.025, ok: true, verdict: 'General OK' },
]
const X0 = 70
const X1 = 470

/** To-scale strips: a tested slice of each band, coloured by whether a General may be control operator there. */
export function G1A_Slices() {
  return (
    <Diagram w={640} h={246} title="Three bands drawn to scale with a tested slice highlighted: 7.125 to 7.175 MHz on 40 meters is Amateur Extra only; 21.275 to 21.300 MHz on 15 meters and 28.000 to 28.025 MHz on 10 meters are open to General class" caption="Each strip is its whole band, to scale. Only the highlighted slice is being tested.">
      {ROWS.map((r, i) => {
        const y = 40 + i * 66
        const sx = (f: number) => X0 + ((f - r.lo) / (r.hi - r.lo)) * (X1 - X0)
        const color = r.ok ? C.good : C.bad
        const x1 = sx(r.s)
        const w = Math.max(sx(r.e) - x1, 6)
        const mid = x1 + w / 2
        return (
          <g key={r.name}>
            <T x={4} y={y + 14} bold size={17}>{r.name}</T>
            <rect x={X0} y={y} width={X1 - X0} height={28} rx={4} fill={C.fill} stroke={C.muted} strokeWidth={1.5} />
            <rect x={x1} y={y} width={w} height={28} fill={color} fillOpacity={0.5} stroke={color} strokeWidth={2} />
            <Ln x1={mid} y1={y + 28} x2={mid} y2={y + 40} color={color} width={2} />
            <T x={X0} y={y - 11} size={12} mono color={C.muted}>{r.lo.toFixed(3)}</T>
            <T x={X1} y={y - 11} size={12} mono color={C.muted} anchor="end">{r.hi.toFixed(3)}</T>
            <T x={mid < 110 ? 6 : mid} y={y + 52} anchor={mid < 110 ? 'start' : 'middle'} size={12} mono color={color} bold>{r.s.toFixed(3)} to {r.e.toFixed(3)}</T>
            <T x={X1 + 20} y={y + 14} bold size={15} color={color}>{r.verdict}</T>
          </g>
        )
      })}
    </Diagram>
  )
}
