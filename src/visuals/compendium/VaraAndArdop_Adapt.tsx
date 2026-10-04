import { C, Diagram, Ln, T } from '../kit'

/** ARQ data modes measure the channel and change speed to match it. */
export function VaraAndArdop_Adapt() {
  const X0 = 90, X1 = 620
  const qual = (x: number) => {
    const t = (x - X0) / (X1 - X0)
    return 0.55 + 0.3 * Math.sin(t * 6.3) - (t > 0.55 && t < 0.72 ? 0.5 * Math.sin(((t - 0.55) / 0.17) * Math.PI) : 0)
  }
  const qy = (q: number) => 138 - q * 100
  const pts: string[] = []
  for (let x = X0; x <= X1; x += 4) pts.push(`${x === X0 ? 'M' : 'L'}${x},${qy(qual(x)).toFixed(1)}`)
  // stepped speed: 4 levels following quality with a lag
  const level = (x: number) => Math.max(0, Math.min(3, Math.floor(qual(x - 20) * 4.2)))
  const sy = (l: number) => 290 - l * 26
  let step = ''
  let prev = -1
  for (let x = X0; x <= X1; x += 2) {
    const l = level(x)
    step += prev < 0 ? `M${x},${sy(l)}` : l !== prev ? `L${x},${sy(prev)}L${x},${sy(l)}` : ''
    prev = l
  }
  step += `L${X1},${sy(prev)}`
  return (
    <Diagram w={640} h={352}
      title="Adaptive ARQ modes. Top: the quality of the radio path varies over time, with a deep fade in the later part. Bottom: the data rate steps up when the path is good and down when it worsens, following with a short delay. A fast, wide mode would fail in the fade; an adaptive mode slows down and keeps the link alive."
      caption="Schematic: the mode measures the path with every acknowledgement and changes speed, so it is fast when it can be and robust when it must be.">
      <T x={14} y={20} size={13} bold color={C.signal}>Path quality</T>
      <rect x={X0} y={30} width={X1 - X0} height={116} rx={6} fill={C.fill} stroke={C.fill2} strokeWidth={1.5} />
      <path d={pts.join('')} fill="none" stroke={C.signal} strokeWidth={3} />
      <T x={X0 - 8} y={50} anchor="end" size={12} color={C.muted}>good</T>
      <T x={X0 - 8} y={128} anchor="end" size={12} color={C.muted}>poor</T>
      <T x={14} y={186} size={13} bold color={C.power}>Data rate</T>
      <rect x={X0} y={196} width={X1 - X0} height={110} rx={6} fill={C.fill} stroke={C.fill2} strokeWidth={1.5} />
      <path d={step} fill="none" stroke={C.power} strokeWidth={3.2} strokeLinejoin="round" />
      <T x={X0 - 8} y={sy(3)} anchor="end" size={12} color={C.muted}>fast</T>
      <T x={X0 - 8} y={sy(0)} anchor="end" size={12} color={C.muted}>slow</T>
      <Ln x1={X0} y1={324} x2={X1} y2={324} color={C.muted} width={2} arrow />
      <T x={X1} y={340} anchor="end" size={12.5} color={C.muted}>time</T>
      <T x={X0} y={340} size={12.5} color={C.muted}>the rate follows the path, a little late</T>
    </Diagram>
  )
}
