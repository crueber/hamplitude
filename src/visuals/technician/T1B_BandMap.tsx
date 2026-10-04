import { C, Diagram, Ln, T } from '../kit'

const BANDS = [
  { n: '10 m', r: '28 – 29.7', hint: 'HF' },
  { n: '6 m', r: '50 – 54', hint: 'VHF' },
  { n: '2 m', r: '144 – 148', hint: 'VHF' },
  { n: '1.25 m', r: '222 – 225', hint: 'VHF' },
  { n: '70 cm', r: '420 – 450', hint: 'UHF' },
]
const X = (i: number) => 3 + i * 132
const W = 106
const centre = (i: number) => X(i) + W / 2

/** Technician bands in order, with the pool's test frequencies placed under the band they fall in. */
export function T1B_BandMap() {
  const marks = [
    { f: '28.50', x: centre(0), note: '10 m', ok: true },
    { f: '49.00', x: X(0) + W + 13, note: 'no band', ok: false },
    { f: '52.525', x: centre(1), note: '6 m', ok: true },
    { f: '146.52', x: centre(2), note: '2 m', ok: true },
    { f: '222.15', x: centre(3), note: '1.25 m', ok: true },
  ]
  return (
    <Diagram w={640} h={220} title="Technician bands in frequency order with example frequencies: 28.50 megahertz is 10 meters, 49.00 is in no amateur band, 52.525 is 6 meters, 146.52 is 2 meters, 222.15 is 1.25 meters" caption="Bands in order, not to scale. Frequencies in MHz.">
      <T x={3} y={14} size={13} color={C.muted}>lower frequency</T>
      <T x={637} y={14} size={13} color={C.muted} anchor="end">higher frequency</T>
      {BANDS.map((b, i) => (
        <g key={b.n}>
          <rect x={X(i)} y={30} width={W} height={84} rx={10} fill={C.signal} fillOpacity={0.15} stroke={C.signal} strokeWidth={2} />
          <T x={centre(i)} y={55} anchor="middle" bold size={21}>{b.n}</T>
          <T x={centre(i)} y={80} anchor="middle" size={13} mono color={C.ink}>{b.r}</T>
          <T x={centre(i)} y={100} anchor="middle" size={12} color={C.muted}>{b.hint}</T>
        </g>
      ))}
      {marks.map((m) => (
        <g key={m.f}>
          <Ln x1={m.x} y1={150} x2={m.x} y2={120} color={m.ok ? C.good : C.bad} width={2.5} arrow />
          <T x={m.x} y={166} anchor="middle" bold mono size={14} color={m.ok ? C.good : C.bad}>{m.f}</T>
          <T x={m.x} y={186} anchor="middle" size={13} color={m.ok ? C.ink : C.bad}>{m.note}</T>
        </g>
      ))}
    </Diagram>
  )
}
