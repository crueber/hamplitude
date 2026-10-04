import { C, Diagram, Ln, T } from '../kit'

const BITS = [1, 0, 1, 1, 0, 0, 1]

/** The same voltage trace read as positive or negative logic. */
export function PositiveLogic() {
  const x0 = 130, bw = 70, hi = 50, lo = 100
  const pts: string[] = []
  BITS.forEach((v, i) => {
    const y = v ? hi : lo
    pts.push(`${x0 + i * bw},${y}`, `${x0 + (i + 1) * bw},${y}`)
  })
  return (
    <Diagram w={640} h={250} title="One voltage trace that is high, low, high, high, low, low, high. Positive logic reads it as 1 0 1 1 0 0 1. Negative logic reads it as 0 1 0 0 1 1 0."
      caption="Same wire, same voltages. Only the naming rule changes.">
      <T x={14} y={hi} size={13} bold color={C.voltage}>high V</T>
      <T x={14} y={lo} size={13} bold color={C.muted}>low V</T>
      <Ln x1={x0} y1={hi} x2={x0 + 7 * bw} y2={hi} color={C.fill2} width={1.5} dash="4 4" />
      <Ln x1={x0} y1={lo} x2={x0 + 7 * bw} y2={lo} color={C.fill2} width={1.5} dash="4 4" />
      <polyline points={pts.join(' ')} fill="none" stroke={C.signal} strokeWidth={3.5} strokeLinejoin="round" />
      <rect x={10} y={136} width={620} height={44} rx={10} fill={C.fill} stroke={C.good} strokeWidth={2} />
      <T x={22} y={158} size={14} bold color={C.good}>Positive logic</T>
      {BITS.map((v, i) => <T key={i} x={x0 + i * bw + bw / 2} y={158} anchor="middle" bold mono size={17} color={C.good}>{v}</T>)}
      <rect x={10} y={190} width={620} height={44} rx={10} fill={C.fill} stroke={C.muted} strokeWidth={2} strokeDasharray="5 4" />
      <T x={22} y={212} size={14} bold color={C.muted}>Negative logic</T>
      {BITS.map((v, i) => <T key={i} x={x0 + i * bw + bw / 2} y={212} anchor="middle" bold mono size={17} color={C.muted}>{1 - v}</T>)}
    </Diagram>
  )
}
