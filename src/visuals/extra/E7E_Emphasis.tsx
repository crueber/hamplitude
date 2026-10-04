import { C, Diagram, Ln, T } from '../kit'

const X0 = 330, X1 = 620, YM = 190, K = 26 // plot: log-ish audio frequency, 0 dB at YM
const gain = (u: number) => 10 * Math.log10(1 + (u * 4) ** 2) // u 0..1 audio frequency scale
const path = (fn: (u: number) => number) => {
  const a: string[] = []
  for (let i = 0; i <= 60; i++) {
    const u = i / 60
    a.push(`${i ? 'L' : 'M'}${(X0 + u * (X1 - X0)).toFixed(1)},${(YM - fn(u) * (K / 6)).toFixed(1)}`)
  }
  return a.join('')
}

/** Pre-emphasis boosts highs before FM; de-emphasis cuts them again after. Together: flat. */
export function Emphasis() {
  const Box = ({ x, label, sub, col }: { x: number; label: string; sub?: string; col: string }) => (
    <g>
      <rect x={x} y={24} width={168} height={56} rx={10} fill={C.fill} stroke={col} strokeWidth={2} />
      <T x={x + 84} y={sub ? 44 : 52} anchor="middle" size={14} bold color={col}>{label}</T>
      {sub && <T x={x + 84} y={64} anchor="middle" size={12} color={C.muted}>{sub}</T>}
    </g>
  )
  return (
    <Diagram w={640} h={316}
      title="Pre-emphasis in the FM transmitter boosts high audio frequencies. De-emphasis in the receiver cuts them by the same amount, so the audio comes out flat."
      caption="Boost the highs going in, cut them coming out. The result is flat audio.">
      <Box x={14} label="Pre-emphasis" sub="transmitter: boosts highs" col={C.resist} />
      <Ln x1={184} y1={52} x2={240} y2={52} color={C.signal} width={2.5} arrow />
      <T x={212} y={36} anchor="middle" size={12} color={C.muted}>FM</T>
      <Box x={242} label="De-emphasis" sub="receiver: cuts highs" col={C.current} />
      <Ln x1={412} y1={52} x2={462} y2={52} color={C.good} width={2.5} arrow />
      <T x={550} y={52} anchor="middle" size={14} bold color={C.good}>flat audio</T>
      {/* plot */}
      <Ln x1={X0} y1={YM} x2={X1} y2={YM} color={C.muted} width={1.5} dash="4 4" />
      <Ln x1={X0} y1={110} x2={X0} y2={290} color={C.muted} width={2} />
      <Ln x1={X0} y1={290} x2={X1} y2={290} color={C.muted} width={2} />
      <T x={X1} y={306} anchor="end" size={12} color={C.muted}>audio frequency →</T>
      <T x={X0 - 8} y={YM} anchor="end" size={12} color={C.muted}>0 dB</T>
      <T x={X0 - 8} y={118} anchor="end" size={12} color={C.muted}>boost</T>
      <T x={X0 - 8} y={282} anchor="end" size={12} color={C.muted}>cut</T>
      <path d={path((u) => gain(u))} fill="none" stroke={C.resist} strokeWidth={3} />
      <path d={path((u) => -gain(u))} fill="none" stroke={C.current} strokeWidth={3} />
      <Ln x1={X0} y1={YM + 1} x2={X1} y2={YM + 1} color={C.good} width={2.5} />
      <g>
        <Ln x1={24} y1={160} x2={60} y2={160} color={C.resist} width={3} />
        <T x={68} y={160} size={13}>pre-emphasis response</T>
        <Ln x1={24} y1={190} x2={60} y2={190} color={C.current} width={3} />
        <T x={68} y={190} size={13}>de-emphasis response</T>
        <Ln x1={24} y1={220} x2={60} y2={220} color={C.good} width={3} />
        <T x={68} y={220} size={13}>both together: flat</T>
      </g>
    </Diagram>
  )
}
