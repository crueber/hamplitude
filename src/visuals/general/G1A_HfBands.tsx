import { C, Diagram, T } from '../kit'

const BANDS: { n: string; f: string; partial: boolean }[] = [
  { n: '160 m', f: '1.8', partial: false },
  { n: '80 m', f: '3.5', partial: true },
  { n: '60 m', f: '5.3', partial: false },
  { n: '40 m', f: '7', partial: true },
  { n: '30 m', f: '10.1', partial: false },
  { n: '20 m', f: '14', partial: true },
  { n: '17 m', f: '18.07', partial: false },
  { n: '15 m', f: '21', partial: true },
  { n: '12 m', f: '24.89', partial: false },
  { n: '10 m', f: '28', partial: false },
]

/** HF/MF bands in frequency order: which have Amateur Extra-only segments. */
export function G1A_HfBands() {
  const w = 112
  const gap = 20
  return (
    <Diagram w={640} h={250} title="HF and MF bands in order of frequency. 80, 40, 20 and 15 meters have segments reserved for Amateur Extra; 160, 60, 30, 17, 12 and 10 meters are open to General class across the whole band" caption="Start frequencies in MHz. Four bands have an Extra-only slice.">
      {BANDS.map((b, i) => {
        const col = i % 5
        const row = Math.floor(i / 5)
        const x = 4 + col * (w + gap)
        const y = 10 + row * 100
        const color = b.partial ? C.resist : C.signal
        return (
          <g key={b.n}>
            <rect x={x} y={y} width={w} height={86} rx={10} fill={color} fillOpacity={0.16} stroke={color} strokeWidth={2} />
            <T x={x + w / 2} y={y + 24} anchor="middle" bold size={20}>{b.n}</T>
            <T x={x + w / 2} y={y + 47} anchor="middle" mono size={13}>{b.f} MHz</T>
            <T x={x + w / 2} y={y + 68} anchor="middle" size={13} bold color={b.partial ? C.resist : C.good}>
              {b.partial ? 'Extra-only slice' : 'all General'}
            </T>
          </g>
        )
      })}
      <T x={4} y={226} size={13} color={C.muted}>Amber: part of the band is closed to General.   Teal: open from edge to edge (some modes limited).</T>
    </Diagram>
  )
}
