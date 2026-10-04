import { C, Diagram, Ln, T } from '../kit'

const X0 = 190, X1 = 620
/** Log frequency axis from 1 to 1000 MHz. */
const px = (f: number) => X0 + (Math.log10(f) / 3) * (X1 - X0)
const FLOOR = -50

const lp = (f: number) => -10 * Math.log10(1 + Math.pow(f / 40, 10))
const hp = (f: number) => -10 * Math.log10(1 + Math.pow(48 / f, 10))
const notch = (f: number) => FLOOR / (1 + Math.pow(Math.log(f / 146) / 0.03, 2))

interface Panel { y: number; title: string; sub: string; fn: (f: number) => number; zones: { lo: number; hi: number; label: string; color: string; a?: 'start' | 'end' }[] }

const PANELS: Panel[] = [
  { y: 8, title: 'Low-pass', sub: 'at your transmitter', fn: lp, zones: [{ lo: 1.8, hi: 29.7, label: 'HF: passes', color: C.good }, { lo: 54, hi: 108, label: 'TV, FM: blocked', color: C.bad }] },
  { y: 118, title: 'High-pass', sub: 'at the TV antenna input', fn: hp, zones: [{ lo: 1.8, hi: 29.7, label: 'HF: blocked', color: C.bad }, { lo: 54, hi: 216, label: 'TV: passes', color: C.good }] },
  { y: 228, title: 'Band-reject', sub: 'at an FM radio input', fn: notch, zones: [{ lo: 88, hi: 108, label: 'FM: passes', color: C.good, a: 'end' }, { lo: 144, hi: 148, label: '2 m: blocked', color: C.bad, a: 'start' }] },
]

/** Idealised response of the three RFI filters on a log frequency axis. */
export function FiltersAndFerritesForRfi_Responses() {
  return (
    <Diagram w={640} h={374} title="Idealised responses of three RFI filters on a logarithmic frequency axis. A low-pass filter at the transmitter passes the HF bands and blocks harmonics in the TV and FM range. A high-pass filter at a TV input blocks HF and passes TV channels. A band-reject filter at an FM radio blocks the 2 metre band and passes the FM broadcast band."
      caption="Idealised shapes. The filter has to pass what you want and block what you do not, and its cutoff sits between the two.">
      {[1, 10, 100, 1000].map((m) => (
        <g key={m}>
          <line x1={px(m)} y1={14} x2={px(m)} y2={312} stroke={C.fill2} strokeWidth={1.2} strokeDasharray="2 4" />
          <T x={px(m)} y={346} anchor="middle" size={12} color={C.muted}>{m}</T>
        </g>
      ))}
      {PANELS.map((p) => {
        const top = p.y + 6, bot = p.y + 84
        const py = (db: number) => top + (-db / -FLOOR) * (bot - top)
        const d = Array.from({ length: 121 }, (_, i) => {
          const f = Math.pow(10, 0.1 + (i * 2.9) / 120)
          return `${i ? 'L' : 'M'}${px(f).toFixed(1)},${py(Math.max(FLOOR, p.fn(f))).toFixed(1)}`
        }).join('')
        return (
          <g key={p.title}>
            <T x={14} y={p.y + 30} size={14} bold color={C.power}>{p.title}</T>
            <T x={14} y={p.y + 50} size={12} color={C.muted}>{p.sub}</T>
            {p.zones.map((z) => (
              <g key={z.label}>
                <rect x={px(z.lo)} y={top} width={Math.max(3, px(z.hi) - px(z.lo))} height={bot - top} fill={z.color} fillOpacity={0.14} />
                <T x={z.a === 'start' ? px(z.lo) : z.a === 'end' ? px(z.hi) : px(z.lo) + Math.max(3, px(z.hi) - px(z.lo)) / 2} y={bot + 14} anchor={z.a ?? 'middle'} size={12} bold color={z.color}>{z.label}</T>
              </g>
            ))}
            <Ln x1={X0} y1={bot} x2={X1} y2={bot} color={C.muted} width={1.5} />
            <Ln x1={X0} y1={top} x2={X0} y2={bot} color={C.muted} width={1.5} />
            <T x={X0 - 6} y={top} anchor="end" size={12} color={C.muted}>0 dB</T>
            <path d={d} fill="none" stroke={C.signal} strokeWidth={3.5} strokeLinejoin="round" />
          </g>
        )
      })}
      <T x={X1} y={364} anchor="end" size={12} color={C.muted}>frequency, MHz (log scale)</T>
    </Diagram>
  )
}
