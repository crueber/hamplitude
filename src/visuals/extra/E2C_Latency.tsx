import { useState } from 'react'
import { C, Controls, Diagram, Ln, Slider, T } from '../kit'

/** Remote operation: you act here, the remote transmitter responds later. That delay is latency. */
export function E2C_Latency() {
  const [ms, setMs] = useState(180)
  const X0 = 90, X1 = 580
  const tx = X0 + (ms / 600) * (X1 - X0 - 20) // where the response lands (0 to 600 ms axis)
  return (
    <>
      <Diagram w={640} h={330} title="Remote operation: you at the control point send a command over the internet to the remote station, and its transmitter changes some time later. That delay between your action and the change in the transmitted signal is latency. If the remote transmitter is in the US, you identify with your own call sign and no extra indicator is needed."
        caption="Latency = delay between your action and the signal changing. Jitter is its variation.">
        <rect x={20} y={14} width={160} height={52} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2} />
        <T x={100} y={34} anchor="middle" size={14} bold>You</T>
        <T x={100} y={52} anchor="middle" size={12} color={C.muted}>control point</T>
        <Ln x1={182} y1={40} x2={254} y2={40} color={C.muted} width={2.5} arrow />
        <rect x={256} y={14} width={128} height={52} rx={10} fill={C.fill2} stroke={C.signal} strokeWidth={2} />
        <T x={320} y={40} anchor="middle" size={14} bold color={C.signal}>Internet</T>
        <Ln x1={386} y1={40} x2={458} y2={40} color={C.muted} width={2.5} arrow />
        <rect x={460} y={14} width={160} height={52} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2} />
        <T x={540} y={34} anchor="middle" size={14} bold>Remote transmitter</T>
        <T x={540} y={52} anchor="middle" size={12} color={C.muted}>in the US</T>
        <rect x={20} y={80} width={600} height={42} rx={8} fill={C.good} fillOpacity={0.13} stroke={C.good} strokeWidth={2} />
        <T x={34} y={101} size={13.5}><tspan fontWeight={700} fill="var(--d-good)">ID:</tspan> your call sign only. A US remote transmitter needs no extra indicator.</T>
        <T x={X0 - 12} y={152} anchor="end" size={13} bold>You</T>
        <T x={X0 - 12} y={216} anchor="end" size={13} bold>Signal</T>
        <Ln x1={X0} y1={152} x2={X1} y2={152} color={C.fill2} width={3} />
        <Ln x1={X0} y1={216} x2={X1} y2={216} color={C.fill2} width={3} />
        <circle cx={X0} cy={152} r={9} fill={C.voltage} stroke={C.bg} strokeWidth={2.5} />
        <T x={X0 + 16} y={134} size={12.5} bold color={C.voltage}>you key up / change a setting</T>
        <Ln x1={X0} y1={161} x2={tx} y2={207} color={C.muted} width={2} dash="4 5" arrow />
        <circle cx={tx} cy={216} r={9} fill={C.current} stroke={C.bg} strokeWidth={2.5} />
        <T x={Math.min(tx, 470)} y={238} anchor={tx > 470 ? 'start' : 'middle'} size={12.5} bold color={C.current}>transmitted signal changes</T>
        <Ln x1={X0} y1={266} x2={tx} y2={266} color={C.resist} width={3} arrow="both" />
        <T x={(X0 + tx) / 2} y={286} anchor="middle" size={15} bold color={C.resist}>latency {ms} ms</T>
        <T x={X0} y={314} size={12} color={C.muted}>Not hang time (delay before returning to receive), not anti-VOX.</T>
      </Diagram>
      <Controls>
        <Slider label="Network delay" value={ms} min={20} max={600} step={10} onChange={setMs} format={(v) => `${v} ms`} color="var(--d-resist)" />
      </Controls>
    </>
  )
}
