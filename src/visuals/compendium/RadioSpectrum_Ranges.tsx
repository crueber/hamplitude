import { C, Diagram, Ln, T } from '../kit'

const F0 = 3e3 // 3 kHz
const DECADES = 8 // to 300 GHz
const X0 = 20, X1 = 620
const pos = (f: number) => X0 + ((Math.log10(f) - Math.log10(F0)) / DECADES) * (X1 - X0)

const BANDS = [
  { id: 'VLF', f: '3–30|kHz', wl: '100–10 km', lo: 3e3, col: C.muted },
  { id: 'LF', f: '30–300|kHz', wl: '10–1 km', lo: 3e4, col: C.current },
  { id: 'MF', f: '0.3–3|MHz', wl: '1 km–100 m', lo: 3e5, col: C.muted },
  { id: 'HF', f: '3–30|MHz', wl: '100–10 m', lo: 3e6, col: C.resist },
  { id: 'VHF', f: '30–300|MHz', wl: '10–1 m', lo: 3e7, col: C.signal },
  { id: 'UHF', f: '0.3–3|GHz', wl: '1 m–10 cm', lo: 3e8, col: C.power },
  { id: 'SHF', f: '3–30|GHz', wl: '10–1 cm', lo: 3e9, col: C.voltage },
  { id: 'EHF', f: '30–300|GHz', wl: '1 cm–1 mm', lo: 3e10, col: C.current },
]

// Amateur allocations (US, rounded; individual bands have gaps inside the HF span). [label, lowHz, highHz, row]
const HAM: [string, number, number, number][] = [
  ['2200 m', 135.7e3, 137.8e3, 0],
  ['630 m', 472e3, 479e3, 1],
  ['160 m to 10 m', 1.8e6, 29.7e6, 0],
  ['6 m', 50e6, 54e6, 1],
  ['2 m', 144e6, 148e6, 0],
  ['70 cm', 420e6, 450e6, 1],
  ['23 cm', 1240e6, 1300e6, 0],
  ['microwave bands', 2.3e9, 250e9, 1],
]

// Everyday users, typical ranges only. [label, low, high]
const USES: [string, number, number][] = [
  ['AM radio', 0.53e6, 1.7e6],
  ['Shortwave', 2.3e6, 26e6],
  ['FM radio', 88e6, 108e6],
  ['Cell, GPS, Wi-Fi', 0.7e9, 5.9e9],
]

export function RadioSpectrum_Ranges() {
  return (
    <Diagram w={640} h={318}
      title="The radio spectrum on a log scale from 3 kilohertz to 300 gigahertz, in eight bands from VLF to EHF each ten times wider than the one before, with amateur allocations and some everyday services marked"
      caption="Log scale: each range spans a factor of ten. Green: US amateur allocations, rounded; the HF span is several bands with gaps. Grey: typical everyday users.">
      <T x={X0} y={14} size={12.5} color={C.muted}>lower frequency · longer waves</T>
      <T x={X1} y={14} size={12.5} color={C.muted} anchor="end">higher frequency · shorter waves</T>
      {BANDS.map((b) => {
        const a = pos(b.lo), z = pos(b.lo * 10), m = (a + z) / 2
        return (
          <g key={b.id}>
            <rect x={a + 1.5} y={28} width={z - a - 3} height={92} rx={8} fill={b.col} fillOpacity={0.18} stroke={b.col} strokeWidth={2} />
            <T x={m} y={46} anchor="middle" bold size={17} color={b.col === C.muted ? C.ink : b.col}>{b.id}</T>
            <T x={m} y={67} anchor="middle" size={13} bold color={C.ink}>{b.f.split('|')[0]}</T>
            <T x={m} y={83} anchor="middle" size={12} color={C.ink}>{b.f.split('|')[1]}</T>
            <T x={m} y={104} anchor="middle" size={12} color={C.muted}>{b.wl}</T>
          </g>
        )
      })}

      <T x={X0} y={140} size={13} bold color={C.good}>Amateur bands in the US</T>
      <Ln x1={X0} y1={166} x2={X1} y2={166} color={C.fill2} width={2} />
      {HAM.map(([n, lo, hi, row]) => {
        const a = pos(lo), z = pos(hi)
        const w = Math.max(5, z - a)
        const cx = (a + z) / 2
        return (
          <g key={n}>
            <rect x={a} y={156} width={w} height={20} rx={3} fill={C.good} fillOpacity={n === 'microwave bands' ? 0.4 : 0.85} stroke={C.good} strokeDasharray={n === 'microwave bands' ? '4 3' : undefined} />
            <Ln x1={cx} y1={176} x2={cx} y2={row ? 202 : 188} color={C.good} width={1.5} />
            <T x={cx} y={row ? 212 : 198} anchor="middle" size={12.5} bold color={C.ink}>{n}</T>
          </g>
        )
      })}

      <T x={X0} y={242} size={13} bold color={C.muted}>Everyday services (typical)</T>
      <Ln x1={X0} y1={268} x2={X1} y2={268} color={C.fill2} width={2} />
      {USES.map(([n, lo, hi], i) => {
        const a = pos(lo), z = pos(hi)
        return (
          <g key={n}>
            <rect x={a} y={258} width={Math.max(5, z - a)} height={20} rx={3} fill={C.muted} fillOpacity={0.7} />
            <T x={(a + z) / 2} y={i % 2 ? 304 : 292} anchor="middle" size={12.5} color={C.ink}>{n}</T>
          </g>
        )
      })}
    </Diagram>
  )
}
