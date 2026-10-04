import { C, Diagram, Ln, T } from '../kit'

const MARKS = [
  { f: '14.100', b: '20 m' },
  { f: '18.110', b: '17 m' },
  { f: '21.150', b: '15 m' },
  { f: '24.930', b: '12 m' },
  { f: '28.200', b: '10 m' },
]

/** Five propagation-beacon frequencies to keep clear. */
export function G1E_BeaconFreqs() {
  return (
    <Diagram w={640} h={150} title="Avoid transmitting on 14.100, 18.110, 21.150, 24.930 and 28.200 megahertz: a system of propagation beacon stations operates there" caption="Beacon frequencies in MHz (not to scale).">
      {MARKS.map((m, i) => {
        const x = 6 + i * 126
        return (
          <g key={m.f}>
            <rect x={x} y={12} width={118} height={64} rx={10} fill={C.power} fillOpacity={0.15} stroke={C.power} strokeWidth={2} />
            <T x={x + 59} y={36} anchor="middle" bold mono size={16}>{m.f}</T>
            <T x={x + 59} y={58} anchor="middle" size={13} color={C.muted}>{m.b}</T>
            <Ln x1={x + 59} y1={76} x2={x + 59} y2={92} color={C.power} width={2} />
          </g>
        )
      })}
      <T x={320} y={112} anchor="middle" size={14} bold color={C.power}>A beacon network uses these: stay off</T>
    </Diagram>
  )
}
