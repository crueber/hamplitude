import type { ReactNode } from 'react'
import { C, Diagram, T } from '../kit'

type Lvl = 'good' | 'ok' | 'poor'
const BANDS = ['HF', 'VHF', 'UHF', 'µW']

interface Conn {
  name: string
  alt: string
  r: number
  coupling: 'thread' | 'bayonet' | 'hex'
  use: string[]
  fit: [Lvl, Lvl, Lvl, Lvl]
}

const CONNS: Conn[] = [
  { name: 'UHF', alt: 'PL-259 / SO-239', r: 31, coupling: 'thread', use: ['HF and VHF radios,', 'amplifiers, mobile'], fit: ['good', 'good', 'ok', 'poor'] },
  { name: 'N', alt: 'Type N', r: 29, coupling: 'thread', use: ['outdoor, repeaters,', 'UHF and microwave'], fit: ['good', 'good', 'good', 'good'] },
  { name: 'BNC', alt: 'bayonet', r: 22, coupling: 'bayonet', use: ['test gear, handhelds,', 'short jumpers'], fit: ['good', 'good', 'good', 'ok'] },
  { name: 'TNC', alt: 'threaded BNC', r: 22, coupling: 'thread', use: ['mobile, vibration,', 'low microwave'], fit: ['good', 'good', 'good', 'good'] },
  { name: 'SMA', alt: 'small, threaded', r: 15, coupling: 'hex', use: ['handhelds, modules,', 'microwave; low power'], fit: ['good', 'good', 'good', 'good'] },
]

const COL: Record<Lvl, string> = { good: C.good, ok: C.resist, poor: C.fill2 }

function Face({ x, y, c }: { x: number; y: number; c: Conn }): ReactNode {
  const r = c.r
  return (
    <g>
      {c.coupling === 'hex' ? (
        <polygon points={Array.from({ length: 6 }, (_, i) => `${x + (r + 5) * Math.cos((Math.PI / 3) * i + Math.PI / 6)},${y + (r + 5) * Math.sin((Math.PI / 3) * i + Math.PI / 6)}`).join(' ')} fill={C.fill2} stroke={C.ink} strokeWidth={2} />
      ) : (
        <circle cx={x} cy={y} r={r + 4} fill={C.fill2} stroke={C.ink} strokeWidth={2} strokeDasharray={c.coupling === 'thread' ? '3 2' : undefined} />
      )}
      {c.coupling === 'bayonet' && (
        <>
          <circle cx={x - r - 4} cy={y} r={4} fill={C.resist} stroke={C.ink} strokeWidth={1.5} />
          <circle cx={x + r + 4} cy={y} r={4} fill={C.resist} stroke={C.ink} strokeWidth={1.5} />
        </>
      )}
      <circle cx={x} cy={y} r={r - 3} fill={C.fill} stroke={C.ink} strokeWidth={1.8} />
      <circle cx={x} cy={y} r={Math.max(4, r * 0.18)} fill={C.resist} stroke={C.ink} strokeWidth={1.5} />
    </g>
  )
}

/** Face-on sketches (relative sizes only) of five common RF connectors with typical uses and qualitative frequency suitability. */
export function RfConnectors_Gallery() {
  return (
    <Diagram w={640} h={304}
      title="Five common RF connectors drawn face-on: UHF (PL-259 and SO-239), Type N, BNC, TNC and SMA, with typical uses and a qualitative suitability strip for HF, VHF, UHF and microwave. UHF suits HF and VHF, N and TNC and SMA work from HF to microwave, BNC works to UHF and somewhat beyond."
      caption="Sketches are not to scale. Dashed ring = threaded coupling, side lugs = bayonet, hexagon = small hex nut. Suitability is qualitative.">
      {CONNS.map((c, i) => {
        const x = 72 + i * 124
        return (
          <g key={c.name}>
            <Face x={x} y={56} c={c} />
            <T x={x} y={112} anchor="middle" size={16} bold>{c.name}</T>
            <T x={x} y={132} anchor="middle" size={12} color={C.muted}>{c.alt}</T>
            <T x={x} y={156} anchor="middle" size={12} color={C.ink}>{c.use[0]}</T>
            <T x={x} y={172} anchor="middle" size={12} color={C.ink}>{c.use[1]}</T>
            {c.fit.map((f, k) => (
              <g key={k}>
                <rect x={x - 59 + k * 30} y={196} width={28} height={16} rx={3} fill={COL[f]} stroke={f === 'poor' ? C.muted : 'none'} strokeWidth={1} />
                <T x={x - 45 + k * 30} y={226} anchor="middle" size={12} color={C.muted}>{BANDS[k]}</T>
              </g>
            ))}
          </g>
        )
      })}
      <rect x={20} y={252} width={18} height={14} rx={3} fill={C.good} />
      <T x={44} y={259} size={12.5} color={C.muted}>works well</T>
      <rect x={140} y={252} width={18} height={14} rx={3} fill={C.resist} />
      <T x={164} y={259} size={12.5} color={C.muted}>limited or marginal</T>
      <rect x={320} y={252} width={18} height={14} rx={3} fill={C.fill2} stroke={C.muted} strokeWidth={1} />
      <T x={344} y={259} size={12.5} color={C.muted}>poor choice</T>
      <T x={20} y={286} size={12.5} color={C.muted}>Choose by frequency first, then by weather, power and how often you plug and unplug.</T>
    </Diagram>
  )
}
