import { C, Diagram, Ln, T } from '../kit'

/** The complex plane: j is a quarter turn, and each part of a circuit has its own direction. */
export function PhasorsAndComplexNumbers_JRotate() {
  const cx = 210, cy = 150, R = 96
  const q = (a: number, r: number) => ({ x: cx + r * Math.cos(a), y: cy - r * Math.sin(a) })
  const arc = (a0: number, a1: number, r = 50) => {
    const p0 = q(a0 + 0.12, r), p1 = q(a1 - 0.12, r)
    return `M${p0.x},${p0.y} A${r},${r} 0 0 0 ${p1.x},${p1.y}`
  }
  const quarter = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2]
  const lbl = ['× j', '× j', '× j', '× j']
  return (
    <Diagram w={640} h={300}
      title="The complex plane. Multiplying by j turns a vector a quarter turn counter-clockwise: 1 becomes j, then minus 1, then minus j. Resistance lies along the horizontal axis, inductive reactance up and capacitive reactance down."
      caption="Multiplying by j is a quarter turn. Two quarter turns make a half turn: j × j = −1.">
      <Ln x1={cx - R - 24} y1={cy} x2={cx + R + 24} y2={cy} color={C.fill2} width={2} />
      <Ln x1={cx} y1={cy - R - 22} x2={cx} y2={cy + R + 22} color={C.fill2} width={2} />
      <Ln x1={cx} y1={cy} x2={cx + R} y2={cy} color={C.resist} width={4} arrow />
      <Ln x1={cx} y1={cy} x2={cx} y2={cy - R} color={C.current} width={4} arrow />
      <Ln x1={cx} y1={cy} x2={cx - R} y2={cy} color={C.muted} width={4} arrow />
      <Ln x1={cx} y1={cy} x2={cx} y2={cy + R} color={C.voltage} width={4} arrow />
      {quarter.map((a, i) => (
        <g key={i}>
          <path d={arc(a, a + Math.PI / 2)} fill="none" stroke={C.power} strokeWidth={2.5} markerEnd="url(#hx-arrow)" />
          <T x={q(a + Math.PI / 4, 72).x} y={q(a + Math.PI / 4, 72).y} anchor="middle" size={13} bold color={C.power}>{lbl[i]}</T>
        </g>
      ))}
      <T x={cx + R + 12} y={cy - 16} size={15} bold>1</T>
      <T x={cx + 10} y={cy - R - 12} size={15} bold>j</T>
      <T x={cx - R - 8} y={cy - 16} anchor="end" size={15} bold>−1</T>
      <T x={cx + 10} y={cy + R + 12} size={15} bold>−j</T>
      <T x={440} y={46} size={14} bold>What each part looks like</T>
      <Ln x1={440} y1={84} x2={476} y2={84} color={C.resist} width={4} arrow />
      <T x={488} y={74} size={13} bold color={C.resist}>Resistor: R</T>
      <T x={488} y={94} size={12} color={C.muted}>along the real axis</T>
      <Ln x1={458} y1={160} x2={458} y2={124} color={C.current} width={4} arrow />
      <T x={488} y={134} size={13} bold color={C.current}>Inductor: +jXL</T>
      <T x={488} y={154} size={12} color={C.muted}>90° up</T>
      <Ln x1={458} y1={198} x2={458} y2={234} color={C.voltage} width={4} arrow />
      <T x={488} y={208} size={13} bold color={C.voltage}>Capacitor: −jXC</T>
      <T x={488} y={228} size={12} color={C.muted}>90° down</T>
      <T x={440} y={266} size={12} color={C.muted}>j is the square root of −1.</T>
      <T x={440} y={284} size={12} color={C.muted}>(Not i: that already means current.)</T>
    </Diagram>
  )
}
