import { C, Diagram, Ln, T } from '../kit'

/** ARQ: detect an error, ask for a resend. FEC: send redundant bits so the receiver can fix errors itself. */
export function ArqFec() {
  const col = (cx: number, title: string, sub: string, color: string) => (
    <g>
      <T x={cx} y={16} anchor="middle" size={15} bold color={color}>{title}</T>
      <T x={cx} y={36} anchor="middle" size={12.5} color={C.muted}>{sub}</T>
      <T x={cx - 100} y={66} anchor="middle" size={14} bold>Sender</T>
      <T x={cx + 100} y={66} anchor="middle" size={14} bold>Receiver</T>
      <Ln x1={cx - 100} y1={78} x2={cx - 100} y2={252} color={C.fill2} width={3} />
      <Ln x1={cx + 100} y1={78} x2={cx + 100} y2={252} color={C.fill2} width={3} />
    </g>
  )
  const a = 150, f = 480
  return (
    <Diagram w={640} h={274} title="Two ways to handle errors. ARQ: the receiver detects an error and requests a retransmission. FEC: the sender adds redundant bits so the receiver can correct errors without asking."
      caption="ARQ asks again. FEC repairs it on the spot.">
      {col(a, 'ARQ', 'detect, then ask for a resend', C.resist)}
      {col(f, 'FEC', 'extra bits let the receiver repair', C.signal)}
      <Ln x1={a - 94} y1={96} x2={a + 94} y2={112} color={C.signal} width={2.5} arrow />
      <T x={a} y={92} anchor="middle" size={12.5} bold color={C.signal}>data</T>
      <T x={a + 108} y={128} size={12.5} bold color={C.bad}>error detected</T>
      <Ln x1={a + 94} y1={164} x2={a - 94} y2={180} color={C.resist} width={2.5} arrow />
      <T x={a} y={160} anchor="middle" size={12.5} bold color={C.resist}>please resend</T>
      <Ln x1={a - 94} y1={204} x2={a + 94} y2={220} color={C.signal} width={2.5} arrow />
      <T x={a} y={200} anchor="middle" size={12.5} bold color={C.signal}>data again</T>
      <T x={a + 108} y={236} size={12.5} bold color={C.good}>received OK</T>
      <Ln x1={f - 94} y1={110} x2={f + 94} y2={126} color={C.signal} width={2.5} arrow />
      <T x={f} y={104} anchor="middle" size={12.5} bold color={C.signal}>data + redundant bits</T>
      <T x={f + 92} y={150} anchor="end" size={12.5} bold color={C.bad}>error occurs</T>
      <T x={f + 92} y={176} anchor="end" size={12.5} bold color={C.good}>fixed on the spot,</T>
      <T x={f + 92} y={194} anchor="end" size={12.5} bold color={C.good}>no request sent</T>
    </Diagram>
  )
}
