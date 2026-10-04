import { C, Diagram, Ln, T } from '../kit'

const CX = 320, ROW = 74, TOP0 = 8
const BOXH = 46

interface Sig { off: number; h: number; color: string; wanted?: boolean }
const SIGS: Sig[] = [
  { off: -272, h: 0.95, color: C.bad },
  { off: -190, h: 0.9, color: C.bad },
  { off: -75, h: 0.8, color: C.resist },
  { off: 0, h: 0.34, color: C.signal, wanted: true },
  { off: 25, h: 0.6, color: C.resist },
  { off: 55, h: 0.7, color: C.resist },
  { off: 150, h: 0.75, color: C.bad },
  { off: 272, h: 0.9, color: C.bad },
]

const STAGES = [
  { name: '1  Band-pass (preselector)', detail: 'the whole band, e.g. 350 kHz on 20 m', hw: 250 },
  { name: '2  Roofing filter', detail: 'a few kHz to about 15 kHz (typical)', hw: 120 },
  { name: '3  IF filter', detail: 'about 2.4 kHz for SSB, 500 Hz for CW (typical)', hw: 40 },
  { name: '4  DSP filter', detail: 'any width, down to tens of Hz', hw: 14 },
]

/** The receive path as a funnel: each filter narrows the window, so fewer neighbours get through. */
export function RadioFilters_Funnel() {
  return (
    <Diagram w={640} h={TOP0 + ROW * 4 + 6}
      title="Receiver filters as a funnel. A band-pass filter passes the whole band, a roofing filter a few kilohertz to about fifteen, an IF filter about 2.4 kilohertz, and a DSP filter narrower still. Each stage removes more of the strong neighbours around the wanted signal."
      caption="Not to scale: each window is far narrower than the one before. Red and amber are neighbours that are blocked (faint, dashed) or still passing.">
      {STAGES.map((s, r) => {
        const y = TOP0 + r * ROW
        const by = y + 22
        const base = by + BOXH - 4
        return (
          <g key={s.name}>
            <T x={20} y={y + 8} bold size={13}>{s.name}</T>
            <T x={620} y={y + 8} anchor="end" size={12} color={C.muted}>{s.detail}</T>
            <rect x={20} y={by} width={600} height={BOXH} rx={8} fill={C.fill} stroke={C.muted} strokeOpacity={0.4} />
            <rect x={CX - s.hw} y={by} width={s.hw * 2} height={BOXH} rx={4} fill={C.signal} fillOpacity={0.14} stroke={C.signal} strokeWidth={2} />
            <Ln x1={26} y1={base} x2={614} y2={base} color={C.muted} width={1.5} />
            {SIGS.map((g) => {
              const inside = Math.abs(g.off) < s.hw
              const hh = (BOXH - 12) * g.h
              return <Ln key={g.off} x1={CX + g.off} y1={base} x2={CX + g.off} y2={base - hh} color={g.color} width={g.wanted ? 4.5 : 4} dash={inside ? undefined : '3 4'} opacity={inside ? 1 : 0.35} />
            })}
          </g>
        )
      })}
    </Diagram>
  )
}
