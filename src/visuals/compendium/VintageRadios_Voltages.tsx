import { C, Diagram, T } from '../kit'

const ROWS = [
  { name: 'Solid-state radio', lo: 13.8, hi: 13.8, c: C.good, note: 'about 13.8 V DC' },
  { name: 'Tube receiver or small tube transmitter', lo: 150, hi: 800, c: C.resist, note: 'hundreds of volts' },
  { name: 'Tube power amplifier', lo: 600, hi: 3000, c: C.bad, note: 'up to several kV' },
]

/** Typical internal supply voltages: tube gear carries lethal voltages. Log scale, illustrative. */
export function VintageRadios_Voltages() {
  const x0 = 24, x1 = 616, lo = 10, hi = 10000
  const X = (v: number) => x0 + ((Math.log10(v) - Math.log10(lo)) / (Math.log10(hi) - Math.log10(lo))) * (x1 - x0)
  const y0 = 66, rh = 68
  return (
    <Diagram w={640} h={y0 + ROWS.length * rh - 8} title="Typical internal supply voltages on a log scale: a solid-state radio runs from about 13.8 volts, a tube receiver or small transmitter uses hundreds of volts, and a tube power amplifier can reach several thousand volts"
      caption="Typical, illustrative ranges on a logarithmic scale. Tube gear stores and carries potentially lethal voltage.">
      {[10, 100, 1000, 10000].map(v => (
        <g key={v}>
          <line x1={X(v)} y1={34} x2={X(v)} y2={y0 + ROWS.length * rh - 12} stroke={C.muted} strokeWidth={1} strokeDasharray="3 4" />
          <T x={X(v)} y={20} anchor={v === 10 ? 'start' : v === 10000 ? 'end' : 'middle'} size={13} color={C.muted}>{v.toLocaleString('en-US')} V</T>
        </g>
      ))}
      {ROWS.map((r, i) => {
        const y = y0 + i * rh
        const a = X(r.lo), b = X(r.hi)
        const w = Math.max(10, b - a)
        return (
          <g key={r.name}>
            <T x={x0 + 8} y={y - 10} size={13} bold>{r.name}</T>
            <rect x={a} y={y} width={w} height={26} rx={5} fill={r.c} />
            <T x={a + w + 10 > 480 ? a - 10 : a + w + 10} y={y + 13} size={12.5} bold anchor={a + w + 10 > 480 ? 'end' : 'start'}>{r.note}</T>
          </g>
        )
      })}
    </Diagram>
  )
}
