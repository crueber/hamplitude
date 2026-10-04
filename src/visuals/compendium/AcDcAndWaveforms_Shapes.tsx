import { C, Diagram, Ln, T, TAU } from '../kit'

type Fn = (u: number) => number

// each shape takes u in [0,1) across the panel and returns a level in [-1, 1]
const sine: Fn = (u) => Math.sin(TAU * 2 * u)
const tri: Fn = (u) => { const f = (u * 2) % 1; return f < 0.25 ? 4 * f : f < 0.75 ? 2 - 4 * f : 4 * f - 4 }
const saw: Fn = (u) => { const f = (u * 2) % 1; return 2 * f - 1 }
const sq: Fn = (u) => (((u * 2) % 1) < 0.5 ? 1 : -1)
const rect: Fn = (u) => Math.abs(Math.sin(TAU * 2 * u))

const PANELS: { name: string; note: string; kind: 'dc' | 'ac'; f: Fn; steps: number }[] = [
  { name: 'DC', note: 'steady, one direction', kind: 'dc', f: () => 0.6, steps: 2 },
  { name: 'Sine wave', note: 'smooth AC, one pure tone', kind: 'ac', f: sine, steps: 120 },
  { name: 'Square wave', note: 'switches between two levels', kind: 'ac', f: sq, steps: 400 },
  { name: 'Triangle wave', note: 'straight rising and falling ramps', kind: 'ac', f: tri, steps: 200 },
  { name: 'Sawtooth wave', note: 'slow ramp, sudden snap back', kind: 'ac', f: saw, steps: 400 },
  { name: 'Rectified AC', note: 'pulsating DC: never negative', kind: 'dc', f: rect, steps: 160 },
]

/** Six common waveforms side by side, each drawn against a zero line. */
export function AcDcAndWaveforms_Shapes() {
  const pw = 196, ph = 140, gx = 16, gy = 12
  return (
    <Diagram w={640} h={2 * ph + gy + 8}
      title="Six waveforms against a zero line: DC (steady), sine, square, triangle, sawtooth and rectified AC (pulsating DC). AC crosses zero and reverses; DC never does."
      caption="AC crosses the zero line and reverses direction. DC never crosses it, even if it pulses.">
      {PANELS.map((p, i) => {
        const col = i % 3, row = Math.floor(i / 3)
        const x = 4 + col * (pw + gx), y = 4 + row * (ph + gy)
        const cy = y + 72, amp = 32, w = pw - 24, xs = x + 12
        const pts: string[] = []
        for (let k = 0; k <= p.steps; k++) {
          const u = k / p.steps
          const yy = cy - p.f(Math.min(u, 0.9999)) * amp
          pts.push(`${k ? 'L' : 'M'}${(xs + w * u).toFixed(1)},${yy.toFixed(1)}`)
        }
        const color = p.kind === 'ac' ? C.signal : C.voltage
        return (
          <g key={p.name}>
            <rect x={x} y={y} width={pw} height={ph} rx={12} fill={C.fill} />
            <T x={x + pw / 2} y={y + 16} anchor="middle" bold size={14}>{p.name}</T>
            <Ln x1={xs} y1={cy} x2={xs + w} y2={cy} color={C.muted} width={1.2} dash="3 4" />
            <T x={xs} y={cy + 10} size={12} color={C.muted}>0</T>
            <path d={pts.join('')} fill="none" stroke={color} strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" />
            <T x={x + pw / 2} y={y + ph - 16} anchor="middle" size={12} color={C.muted}>{p.note}</T>
          </g>
        )
      })}
    </Diagram>
  )
}
