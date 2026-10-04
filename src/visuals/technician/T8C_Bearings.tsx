import { C, Diagram, Ln, T } from '../kit'

/** Two or more bearings from a directional antenna cross at the hidden transmitter. */
export function Bearings() {
  const tx = { x: 450, y: 110 }
  const hunters = [
    { x: 90, y: 230, n: '1' },
    { x: 280, y: 255, n: '2' },
    { x: 130, y: 70, n: '3' },
  ]
  const ext = (h: { x: number; y: number }) => {
    const dx = tx.x - h.x, dy = tx.y - h.y, k = 1
    return { x: h.x + dx * k, y: h.y + dy * k }
  }
  return (
    <Diagram w={640} h={310} title="Direction finding: from several places, point a directional antenna at the signal. Each bearing is a line, and the lines cross at the transmitter" caption="Where the bearing lines cross is where to look. Two lines locate it; a third confirms.">
      {hunters.map((h) => {
        const e = ext(h)
        const ang = (Math.atan2(tx.y - h.y, tx.x - h.x) * 180) / Math.PI
        return (
          <g key={h.n}>
            <Ln x1={h.x} y1={h.y} x2={e.x} y2={e.y} color={C.signal} width={2.5} dash="7 6" />
            <g transform={`translate(${h.x},${h.y}) rotate(${ang})`}>
              <path d="M0,0 C18,-20 62,-20 80,0 C62,20 18,20 0,0Z" fill={C.signal} fillOpacity={0.25} stroke={C.signal} strokeWidth={2} />
            </g>
            <circle cx={h.x} cy={h.y} r={9} fill={C.ink} stroke={C.bg} strokeWidth={3} />
            <T x={h.x} y={h.y + (h.y > 150 ? 26 : -24)} anchor="middle" size={14} bold>Bearing {h.n}</T>
          </g>
        )
      })}
      <circle cx={tx.x} cy={tx.y} r={22} fill={C.bad} fillOpacity={0.2} />
      <circle cx={tx.x} cy={tx.y} r={10} fill={C.bad} stroke={C.bg} strokeWidth={3} />
      <T x={tx.x + 32} y={tx.y - 8} size={15} bold color={C.bad}>Hidden transmitter</T>
      <T x={tx.x + 32} y={tx.y + 14} size={13} color={C.muted}>the lines cross here</T>
    </Diagram>
  )
}
