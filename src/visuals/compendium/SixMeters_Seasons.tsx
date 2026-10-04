import { C, Diagram, Ln, T } from '../kit'

const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
const bump = (x: number, c: number, w: number) => Math.exp(-(((x - c) / w) ** 2))

/** Schematic: sporadic E peaks in early summer with a smaller midwinter bump; F2 openings follow the sunspot cycle. */
export function SixMeters_Seasons() {
  const ax0 = 60, ax1 = 360 // panel 1
  const bx0 = 410, bx1 = 620 // panel 2
  const top = 60, base = 220
  const sporadic = (m: number) => 0.95 * bump(m, 5.9, 1.1) + 0.5 * bump(m, 7.4, 1.0) + 0.3 * bump(m, 0.3, 0.9) + 0.3 * bump(m, 12.2, 0.9) // m in 0..12
  const pts: string[] = []
  for (let i = 0; i <= 96; i++) {
    const m = (12 * i) / 96
    pts.push(`${i ? 'L' : 'M'}${(ax0 + ((ax1 - ax0) * m) / 12).toFixed(1)},${(base - (base - top) * sporadic(m)).toFixed(1)}`)
  }
  const area = `${pts.join('')} L${ax1},${base} L${ax0},${base} Z`
  const cyc: string[] = []
  for (let i = 0; i <= 60; i++) {
    const y = (11 * i) / 60
    const s = 0.5 - 0.5 * Math.cos((2 * Math.PI * y) / 11)
    cyc.push(`${i ? 'L' : 'M'}${(bx0 + ((bx1 - bx0) * y) / 11).toFixed(1)},${(base - (base - top) * (0.1 + 0.85 * s)).toFixed(1)}`)
  }
  const thresh = base - (base - top) * 0.62
  return (
    <Diagram w={640} h={300}
      title="Left: sporadic E openings on 6 metres are most likely in early summer, with a smaller peak around midwinter. Right: F2 layer openings happen mostly around the peak of the eleven-year solar cycle"
      caption="Schematic, not measured data: the pattern is real, the heights are not numbers.">
      <T x={ax0} y={22} size={13} bold>Sporadic E through the year</T>
      <T x={ax0} y={40} size={12} color={C.muted}>likelihood of an opening (relative)</T>
      <Ln x1={ax0} y1={base} x2={ax1} y2={base} color={C.muted} width={2} />
      <path d={area} fill={C.signal} fillOpacity={0.25} />
      <path d={pts.join('')} fill="none" stroke={C.signal} strokeWidth={3.5} strokeLinejoin="round" />
      {MONTHS.map((m, i) => <T key={i} x={ax0 + ((ax1 - ax0) * (i + 0.5)) / 12} y={base + 16} anchor="middle" size={12} color={C.muted}>{m}</T>)}
      <T x={ax0 + ((ax1 - ax0) * 7.4) / 12} y={top + 4} size={12} bold color={C.signal}>early summer peak</T>
      <T x={ax0 + 34} y={base - 84} size={12} bold color={C.signal}>smaller</T>
      <T x={ax0 + 34} y={base - 68} size={12} bold color={C.signal}>winter bump</T>

      <T x={bx0} y={22} size={13} bold>F2 openings and the sunspot cycle</T>
      <T x={bx0} y={40} size={12} color={C.muted}>solar activity over about 11 years</T>
      <Ln x1={bx0} y1={base} x2={bx1} y2={base} color={C.muted} width={2} />
      <rect x={bx0} y={top - 4} width={bx1 - bx0} height={thresh - top + 4} fill={C.good} fillOpacity={0.08} />
      <Ln x1={bx0} y1={thresh} x2={bx1} y2={thresh} color={C.good} width={2} dash="6 5" />
      <path d={cyc.join('')} fill="none" stroke={C.resist} strokeWidth={3.5} strokeLinejoin="round" />
      <T x={bx0 + (bx1 - bx0) / 2} y={base + 54} anchor="middle" size={12} bold color={C.good}>dashed: F2 can reach 50 MHz above</T>
      <T x={bx0 + (bx1 - bx0) / 2} y={base + 16} anchor="middle" size={12} color={C.muted}>years</T>
      <T x={bx0 + (bx1 - bx0) / 2} y={base + 36} anchor="middle" size={12} color={C.muted}>minimum  →  maximum  →  minimum</T>
    </Diagram>
  )
}
