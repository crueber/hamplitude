import { C, Diagram, Ln, T } from '../kit'

/** Two-level vs four-level FSK at the same symbol rate: four levels carry two bits per symbol. */
export function SystemFusion_FourLevel() {
  const x0 = 160, x1 = 610, n = 12
  const sw = (x1 - x0) / n
  const two = [1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1]
  const four = [2, 0, 3, 1, 1, 3, 0, 2, 2, 1, 3, 0]
  const path = (seq: number[], levelY: (l: number) => number) => {
    let d = ''
    seq.forEach((l, i) => {
      const xa = x0 + i * sw, y = levelY(l)
      d += i === 0 ? `M${xa},${y}` : `L${xa + 5},${y}`
      d += `L${xa + sw - 5},${y}`
    })
    return d
  }
  const y2 = (l: number) => 84 - l * 36
  const y4 = (l: number) => 250 - l * 30
  return (
    <Diagram w={640} h={300}
      title="Frequency against time for the same twelve symbols: with two frequency levels each symbol carries one bit, with four levels each symbol carries two bits"
      caption="Idealised. Real transmitters smooth the steps to keep the signal narrow. Four-level FSK is also written 4FSK; C4FM is a constant-envelope form of it.">
      <T x={14} y={22} size={15} bold color={C.resist}>Two levels</T>
      <T x={14} y={42} size={12.5} color={C.muted}>1 bit per symbol</T>
      <T x={14} y={62} size={12.5} color={C.muted}>12 symbols = 12 bits</T>
      {[0, 1].map((l) => <Ln key={l} x1={x0} y1={y2(l)} x2={x1} y2={y2(l)} color={C.muted} width={1} dash="3 5" />)}
      <path d={path(two, y2)} fill="none" stroke={C.resist} strokeWidth={3.5} strokeLinejoin="round" />
      <T x={14} y={166} size={15} bold color={C.signal}>Four levels</T>
      <T x={14} y={186} size={12.5} color={C.muted}>2 bits per symbol</T>
      <T x={14} y={206} size={12.5} color={C.muted}>12 symbols = 24 bits</T>
      {[0, 1, 2, 3].map((l) => <Ln key={l} x1={x0} y1={y4(l)} x2={x1} y2={y4(l)} color={C.muted} width={1} dash="3 5" />)}
      <path d={path(four, y4)} fill="none" stroke={C.signal} strokeWidth={3.5} strokeLinejoin="round" />
      {Array.from({ length: n + 1 }, (_, i) => (
        <Ln key={i} x1={x0 + i * sw} y1={120} x2={x0 + i * sw} y2={268} color={C.fill2} width={1} />
      ))}
      <Ln x1={x0} y1={284} x2={x1} y2={284} color={C.muted} width={2} arrow />
      <T x={x1} y={272} size={12.5} color={C.muted} anchor="end">time (one column per symbol)</T>
    </Diagram>
  )
}
