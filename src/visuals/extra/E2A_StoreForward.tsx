import { C, Box, Diagram, Ln, T } from '../kit'

/** Store-and-forward: upload on one pass, the satellite carries the message, download on a later pass somewhere else. */
export function E2A_StoreForward() {
  const sat = (x: number, y: number) => (
    <g transform={`translate(${x},${y})`}>
      <rect x={-16} y={-12} width={32} height={24} rx={5} fill={C.power} stroke={C.bg} strokeWidth={3} />
      <rect x={-54} y={-5} width={34} height={10} fill={C.signal} />
      <rect x={20} y={-5} width={34} height={10} fill={C.signal} />
    </g>
  )
  return (
    <Diagram w={640} h={270} title="Store and forward: a station uploads a message to a satellite on one pass. The satellite holds it while it flies on. Later it passes over another station and downloads the message." caption="The satellite is a mailbox in the sky: hold now, deliver later.">
      <T x={20} y={20} size={14} bold color={C.voltage}>1. Upload</T>
      <T x={250} y={20} size={14} bold color={C.muted}>2. Hold while it flies</T>
      <T x={470} y={20} size={14} bold color={C.current}>3. Download later</T>
      {sat(80, 70)}
      <Box x={20} y={176} w={120} h={46} label="Station A" color={C.voltage} size={13} />
      <Ln x1={80} y1={174} x2={80} y2={96} color={C.voltage} width={3} arrow />
      <T x={92} y={134} size={13} bold color={C.voltage}>message</T>
      {sat(320, 70)}
      <rect x={298} y={118} width={44} height={34} rx={6} fill={C.fill} stroke={C.power} strokeWidth={2} />
      <T x={320} y={135} anchor="middle" size={20}>✉</T>
      <T x={320} y={176} anchor="middle" size={13} color={C.muted}>message stored</T>
      <T x={320} y={196} anchor="middle" size={13} color={C.muted}>on board</T>
      {sat(560, 70)}
      <Box x={500} y={176} w={120} h={46} label="Station B" color={C.current} size={13} />
      <Ln x1={560} y1={96} x2={560} y2={174} color={C.current} width={3} arrow />
      <T x={548} y={134} anchor="end" size={13} bold color={C.current}>message</T>
      <T x={320} y={252} anchor="middle" size={13} color={C.muted}>Station A and B never need to hear the satellite at the same time.</T>
    </Diagram>
  )
}
