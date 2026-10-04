import { C, Diagram, Ln, T } from '../kit'

const Coil = ({ x, y, n = 4 }: { x: number; y: number; n?: number }) => (
  <path d={`M${x},${y}` + Array.from({ length: n }, () => 'a11,6 0 0 1 0,12').join('')} fill="none" stroke={C.power} strokeWidth={3.5} strokeLinecap="round" />
)

/** Loading coils, short handheld antennas, and vehicle shielding. */
export function Loading() {
  const gy = 215
  return (
    <Diagram w={640} h={310} title="Left: a full-size quarter-wave whip. Middle: a short antenna with a loading coil, which is electrically longer but less efficient. Right: a handheld inside a vehicle, whose metal body shields the signal"
      caption="Short antennas trade efficiency for size. A car body shields a handheld.">
      <T x={110} y={20} anchor="middle" bold size={14}>Full-size ¼ wave</T>
      <Ln x1={110} y1={gy} x2={110} y2={52} color={C.resist} width={5} />
      <Ln x1={60} y1={gy} x2={160} y2={gy} color={C.muted} width={5} />
      <T x={110} y={gy + 24} anchor="middle" size={13} bold color={C.good}>efficient, but long</T>

      <T x={320} y={20} anchor="middle" bold size={14}>Loaded short antenna</T>
      <Ln x1={320} y1={gy} x2={320} y2={196} color={C.resist} width={5} />
      <Coil x={320} y={152} />
      <Ln x1={320} y1={152} x2={320} y2={110} color={C.resist} width={5} />
      <T x={300} y={168} anchor="end" size={13} bold color={C.power}>coil (inductor)</T>
      <T x={300} y={186} anchor="end" size={12} color={C.muted}>adds electrical length</T>
      <Ln x1={270} y1={gy} x2={370} y2={gy} color={C.muted} width={5} />
      <T x={320} y={gy + 24} anchor="middle" size={13} bold color={C.bad}>compact, low efficiency</T>

      <T x={538} y={20} anchor="middle" bold size={14}>Handheld inside a car</T>
      <rect x={452} y={150} width={172} height={48} rx={12} fill={C.fill} stroke={C.muted} strokeWidth={3} />
      <path d="M476,150 L496,108 L580,108 L600,150 Z" fill={C.fill} stroke={C.muted} strokeWidth={3} strokeLinejoin="round" />
      <circle cx={486} cy={200} r={13} fill={C.muted} stroke={C.bg} strokeWidth={3} />
      <circle cx={590} cy={200} r={13} fill={C.muted} stroke={C.bg} strokeWidth={3} />
      <rect x={532} y={118} width={12} height={24} rx={3} fill={C.signal} />
      <Ln x1={538} y1={118} x2={538} y2={106} color={C.signal} width={3} />
      <Ln x1={552} y1={112} x2={622} y2={78} color={C.signal} width={2.5} dash="2 5" opacity={0.6} arrow />
      <T x={538} y={gy + 36} anchor="middle" size={13} bold color={C.bad}>metal body shields the signal</T>
      <T x={538} y={gy + 56} anchor="middle" size={12} color={C.muted}>an outside antenna avoids this</T>
    </Diagram>
  )
}
