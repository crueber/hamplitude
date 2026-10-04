import { C, Diagram, Ln, T } from '../kit'

function Badge({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={11} fill={C.ink} />
      <T x={x} y={y} anchor="middle" size={13} bold color={C.bg}>{n}</T>
    </g>
  )
}

/** Lightning protection: ground system outside, arrestors where feed lines enter, every ground bonded together. */
export function Lightning() {
  const gy = 216
  const rod = (x: number) => <Ln x1={x} y1={gy} x2={x} y2={gy + 52} color={C.good} width={7} />
  return (
    <Diagram w={640} h={340} title="Lightning protection: the ground system is outside the building, lightning arrestors are where the feed lines enter, and all ground rods are bonded together with the other grounds"
      caption="Outside, at the entry, all bonded.">
      <rect x={20} y={gy} width={600} height={70} fill={C.fill} />
      <Ln x1={20} y1={gy} x2={620} y2={gy} color={C.muted} width={3} />
      <Ln x1={60} y1={50} x2={60} y2={gy} color={C.ink} width={6} />
      <Ln x1={34} y1={50} x2={86} y2={50} color={C.resist} width={5} />
      <path d={`M60,56 L60,${gy - 24} L350,${gy - 24}`} fill="none" stroke={C.signal} strokeWidth={4} strokeLinejoin="round" />
      <T x={190} y={gy - 40} anchor="middle" size={13} bold color={C.signal}>feed line</T>
      <rect x={340} y={80} width={280} height={gy - 80} fill="none" stroke={C.ink} strokeWidth={3} />
      <path d={`M328,80 L480,34 L632,80`} fill="none" stroke={C.ink} strokeWidth={3} strokeLinejoin="round" />
      <T x={480} y={118} anchor="middle" size={14} bold>Inside: station</T>
      <rect x={338} y={gy - 58} width={52} height={40} rx={6} fill={C.fill} stroke={C.power} strokeWidth={3} />
      <T x={364} y={gy - 38} anchor="middle" size={12} bold color={C.power}>arrester</T>
      <path d={`M364,${gy - 24} L364,${gy - 24}`} />
      <Badge x={364} y={gy - 74} n={2} />
      <T x={380} y={gy - 74} size={13} bold color={C.power}>where feed lines enter</T>
      {rod(60)}{rod(364)}{rod(560)}
      <Ln x1={364} y1={gy - 18} x2={364} y2={gy} color={C.good} width={5} />
      <Ln x1={60} y1={gy + 40} x2={560} y2={gy + 40} color={C.good} width={6} />
      <Badge x={44} y={gy + 80} n={1} />
      <T x={62} y={gy + 80} size={13} bold color={C.good}>ground rods outside</T>
      <Badge x={330} y={gy + 80} n={3} />
      <T x={348} y={gy + 80} size={13} bold color={C.good}>bonded with all other grounds</T>
      <T x={560} y={gy + 60} anchor="middle" size={12} color={C.muted}>AC power ground</T>
    </Diagram>
  )
}
