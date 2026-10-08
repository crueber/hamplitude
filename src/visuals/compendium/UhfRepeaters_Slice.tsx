import { C, Diagram, Ln, T } from '../kit'

const LO = 420, HI = 450, X0 = 24, X1 = 616
const X = (f: number) => X0 + ((f - LO) / (HI - LO)) * (X1 - X0)

interface Bar { a: number; b: number; color: string; fill?: number; label?: string; lab?: 'in' | 'above' | 'below'; end?: boolean }

// Row A: 47 CFR 97.205(b), repeaters may not use 431-433 and 435-438 MHz.
const RULE: Bar[] = [
  { a: 420, b: 431, color: C.good, label: 'repeaters allowed', lab: 'in' },
  { a: 431, b: 433, color: C.bad, label: 'not allowed', lab: 'below' },
  { a: 433, b: 435, color: C.good },
  { a: 435, b: 438, color: C.bad, label: 'not allowed', lab: 'below' },
  { a: 438, b: 450, color: C.good, label: 'repeaters allowed', lab: 'in' },
]
// Row B: ARRL band plan, simplified (overlapping entries merged).
const PLAN: Bar[] = [
  { a: 420, b: 432, color: C.muted, fill: 0.14, label: 'ATV, weak signal, other', lab: 'in' },
  { a: 432, b: 433, color: C.muted, fill: 0.14 },
  { a: 433, b: 435, color: C.resist, label: 'links', lab: 'above' },
  { a: 435, b: 438, color: C.muted, fill: 0.14, label: 'satellite', lab: 'below' },
  { a: 438, b: 442, color: C.muted, fill: 0.14, label: 'ATV, links', lab: 'in' },
  { a: 442, b: 445, color: C.signal, label: 'repeaters', lab: 'above' },
  { a: 445, b: 447, color: C.resist, label: 'shared', lab: 'below', end: true },
  { a: 447, b: 450, color: C.signal, label: 'repeaters', lab: 'above' },
]

function Row({ bars, y, h }: { bars: Bar[]; y: number; h: number }) {
  return (
    <g>
      {bars.map((r) => (
        <g key={`${r.a}-${r.b}`}>
          <rect x={X(r.a)} y={y} width={X(r.b) - X(r.a)} height={h} fill={r.color} fillOpacity={r.fill ?? 0.3} stroke={r.color} strokeWidth={2} />
          {r.label && r.lab === 'in' && <T x={(X(r.a) + X(r.b)) / 2} y={y + h / 2} anchor="middle" size={12.5} bold>{r.label}</T>}
          {r.label && r.lab === 'above' && <T x={(X(r.a) + X(r.b)) / 2} y={y - 11} anchor="middle" size={12.5} bold>{r.label}</T>}
          {r.label && r.lab === 'below' && <T x={r.end ? X(r.b) - 8 : (X(r.a) + X(r.b)) / 2} y={y + h + 12} anchor={r.end ? 'end' : 'middle'} size={12.5} bold>{r.label}</T>}
        </g>
      ))}
    </g>
  )
}

/** The 70 cm band to scale in three layers: the FCC repeater rule, the ARRL band plan, and who else shares the band. */
export function UhfRepeaters_Slice() {
  const ticks = [420, 425, 430, 435, 440, 445, 450]
  return (
    <Diagram w={640} h={330}
      title="The 70 centimeter band, 420 to 450 megahertz, in three layers. FCC rule: repeaters are not allowed at 431 to 433 and 435 to 438 megahertz. ARRL band plan, simplified: links at 433 to 435, satellite at 435 to 438, repeater blocks at 442 to 445 and 447 to 450 megahertz, 5 megahertz apart. Sharing: the whole band is secondary to US government radar, and 420 to 430 has extra limits near the northern border and around some Great Lakes cities."
      caption="Simplified from 47 CFR 97.205 and 97.303 and the ARRL band plan. Local plans differ; read the rules.">
      <T x={X0} y={14} size={13} bold color={C.bad}>FCC rule for repeaters</T>
      <Row bars={RULE} y={26} h={28} />

      <T x={X0} y={96} size={13} bold color={C.signal}>ARRL band plan (voluntary)</T>
      <Row bars={PLAN} y={134 - 26} h={28} />
      <Ln x1={X(442)} y1={140} x2={X(442)} y2={166} color={C.power} width={2} />
      <Ln x1={X(442)} y1={166} x2={X(447)} y2={166} color={C.power} width={2} />
      <Ln x1={X(447)} y1={166} x2={X(447)} y2={140} color={C.power} width={2} arrow />
      <T x={(X(442) + X(447)) / 2} y={180} anchor="middle" size={12.5} bold color={C.power}>5 MHz pair</T>

      <T x={X0} y={196} size={13} bold color={C.resist}>Sharing (47 CFR 97.303)</T>
      <rect x={X(420)} y={208} width={X1 - X0} height={24} rx={3} fill={C.resist} fillOpacity={0.22} stroke={C.resist} strokeWidth={1.5} />
      <T x={X(420) + 8} y={220} size={12.5}>Whole band: yield to US government radar</T>
      <rect x={X(420)} y={238} width={X(430) - X(420)} height={24} rx={3} fill={C.resist} fillOpacity={0.22} stroke={C.resist} strokeWidth={1.5} />
      <T x={X(420) + 8} y={250} size={12.5}>Line A and Great Lakes limits</T>
      <rect x={X(430)} y={238} width={X(450) - X(430)} height={24} rx={3} fill={C.resist} fillOpacity={0.22} stroke={C.resist} strokeWidth={1.5} />
      <T x={X(430) + 8} y={250} size={12.5}>Other countries' radar: accept interference</T>

      {ticks.map((f) => (
        <g key={f}>
          <Ln x1={X(f)} y1={270} x2={X(f)} y2={276} color={C.muted} width={1.5} />
          <T x={X(f)} y={290} anchor="middle" size={12.5} color={C.muted}>{f}</T>
        </g>
      ))}
      <T x={X1} y={310} anchor="end" size={12.5} color={C.muted}>MHz</T>
    </Diagram>
  )
}
