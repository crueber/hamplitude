import { C, Diagram, Ln, T } from '../kit'

function Check({ x, y, ok = true }: { x: number; y: number; ok?: boolean }) {
  return (
    <g>
      <circle cx={x} cy={y} r={12} fill={C.good} fillOpacity={0.25} stroke={C.good} strokeWidth={2} />
      {ok && <path d={`M${x - 6},${y} L${x - 1},${y + 5} L${x + 7},${y - 6}`} fill="none" stroke={C.good} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />}
    </g>
  )
}

/** Before a climb: lock out and tag the power to the tower, and check the harness. */
export function Climb() {
  const gy = 280, lx = 70, rx = 160
  return (
    <Diagram w={640} h={330} title="Before climbing a tower: lock out and tag every circuit that powers devices on the tower, and confirm the harness is rated for the climber's weight and within its service life"
      caption="Lock out and tag the power. Check the harness rating and service life.">
      <Ln x1={20} y1={gy} x2={300} y2={gy} color={C.muted} width={3} />
      <Ln x1={lx} y1={gy} x2={lx + 14} y2={50} color={C.ink} width={5} />
      <Ln x1={rx} y1={gy} x2={rx - 14} y2={50} color={C.ink} width={5} />
      {[90, 140, 190, 240].map((y) => {
        const t = (gy - y) / (gy - 50)
        return <Ln key={y} x1={lx + 14 * t} y1={y} x2={rx - 14 * t} y2={y} color={C.muted} width={3} />
      })}
      <rect x={96} y={36} width={38} height={26} rx={5} fill={C.fill2} stroke={C.ink} strokeWidth={2} />
      <T x={115} y={22} anchor="middle" size={12} bold>rotor, lights</T>
      <Ln x1={115} y1={62} x2={115} y2={200} color={C.voltage} width={3} dash="5 4" />
      <path d={`M115,200 L115,${gy - 30} L230,${gy - 30}`} fill="none" stroke={C.voltage} strokeWidth={3} strokeDasharray="5 4" />
      <rect x={200} y={gy - 70} width={80} height={60} rx={6} fill={C.fill} stroke={C.ink} strokeWidth={3} />
      <T x={240} y={gy - 54} anchor="middle" size={12} bold>power</T>
      <path d={`M232,${gy - 22} L232,${gy - 32} a8,8 0 0 1 16,0 L248,${gy - 22}`} fill="none" stroke={C.ink} strokeWidth={2.5} />
      <rect x={228} y={gy - 24} width={24} height={16} rx={3} fill={C.resist} stroke={C.ink} strokeWidth={2} />
      <rect x={284} y={gy - 50} width={32} height={26} rx={3} fill={C.bad} fillOpacity={0.3} stroke={C.bad} strokeWidth={2} />
      <T x={300} y={gy - 37} anchor="middle" size={12} bold>tag</T>
      <T x={240} y={gy + 14} anchor="middle" size={13} bold color={C.bad}>locked out and tagged</T>
      <T x={340} y={38} size={15} bold>Before you climb</T>
      <Check x={352} y={84} /><T x={374} y={84} size={14} bold>Circuits to the tower</T><T x={374} y={102} size={14} bold>locked out and tagged</T>
      <Check x={352} y={152} /><T x={374} y={152} size={14} bold>Harness rated for the</T><T x={374} y={170} size={14} bold>climber's weight</T>
      <Check x={352} y={220} /><T x={374} y={220} size={14} bold>Harness within its</T><T x={374} y={238} size={14} bold>allowable service life</T>
    </Diagram>
  )
}
