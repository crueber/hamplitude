import { C, Diagram, Ln, T } from '../kit'

/** Split operation: the DX station transmits on one frequency and listens on another so callers do not bury it. */
export function E2C_DxSplit() {
  const callers = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  const hs = [26, 40, 20, 48, 32, 18, 44, 28, 36]
  return (
    <Diagram w={640} h={300} title="Split operation: the DX station transmits on one frequency and listens on a different frequency range (often higher) where the many calling stations spread out. This separates the callers from the DX station, reduces interference, and avoids calling on a frequency that may be prohibited for some of them. When calling, send your full call sign once or twice."
      caption="Listen on the DX frequency. Call where the DX is listening.">
      <Ln x1={30} y1={150} x2={620} y2={150} color={C.muted} width={2.5} />
      <T x={30} y={172} size={12} color={C.muted}>frequency →</T>
      {/* DX transmit */}
      <Ln x1={130} y1={150} x2={130} y2={52} color={C.signal} width={5} />
      <T x={130} y={36} anchor="middle" size={14} bold color={C.signal}>DX transmits</T>
      <T x={130} y={198} anchor="middle" size={13} color={C.muted}>you listen here</T>
      <T x={130} y={218} anchor="middle" size={13} bold color={C.bad}>do not call here</T>
      {/* callers */}
      {callers.map((i) => (
        <Ln key={i} x1={340 + i * 22} y1={150} x2={340 + i * 22} y2={150 - hs[i]} color={C.voltage} width={5} />
      ))}
      <rect x={326} y={62} width={216} height={100} rx={8} fill="none" stroke={C.voltage} strokeWidth={2} strokeDasharray="5 5" />
      <T x={434} y={36} anchor="middle" size={14} bold color={C.voltage}>DX listens here</T>
      <T x={434} y={198} anchor="middle" size={13} color={C.muted}>callers spread over a range</T>
      <T x={434} y={218} anchor="middle" size={13} bold color={C.voltage}>call here</T>
      <Ln x1={160} y1={98} x2={320} y2={98} color={C.muted} width={2} arrow dash="4 5" />
      <T x={240} y={86} anchor="middle" size={12.5} color={C.muted}>"listening up"</T>
      <rect x={20} y={240} width={600} height={46} rx={10} fill={C.fill} stroke={C.fill2} strokeWidth={2} />
      <T x={34} y={256} size={13.5}><tspan fontWeight={700} fill="var(--d-good)">Call:</tspan> your full call sign, once or twice, e.g. "K1ABC K1ABC".</T>
      <T x={34} y={275} size={13.5}><tspan fontWeight={700} fill="var(--d-bad)">Not:</tspan> only your last two letters, or the DX call three times, or your grid.</T>
    </Diagram>
  )
}
