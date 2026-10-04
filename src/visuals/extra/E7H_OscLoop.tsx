import { useState } from 'react'
import { C, Controls, Diagram, Ln, Slider, T } from '../kit'

/** An oscillator is an amplifier whose output is fed back in phase. Loop gain of 1 or more keeps it going. */
export function OscLoop() {
  const [g, setG] = useState(1.1)
  const X0 = 40, X1 = 600, CY = 252, AMP = 40, N = 10
  const pts: string[] = []
  let amp = 0.12
  const peaks: number[] = []
  for (let k = 0; k < N; k++) {
    peaks.push(Math.min(amp, 1))
    amp = amp * g
  }
  const total = 420
  for (let i = 0; i <= total; i++) {
    const t = i / total
    const k = Math.min(N - 1, Math.floor(t * N))
    const a = peaks[k]
    pts.push(`${i ? 'L' : 'M'}${(X0 + t * (X1 - X0)).toFixed(1)},${(CY - AMP * a * Math.sin(t * N * Math.PI * 2)).toFixed(1)}`)
  }
  const verdict = g > 1.02 ? 'grows until the amplifier limits it' : g >= 0.98 ? 'holds steady: sustained oscillation' : 'dies away: no oscillation'
  const col = g >= 0.98 ? C.good : C.bad
  return (
    <>
      <Diagram w={640} h={330}
        title={`Oscillator: an amplifier with part of its output fed back in phase, positive feedback. With loop gain ${g.toFixed(2)} the signal ${verdict}.`}
        caption="Feed some output back to the input, in phase. If the loop gain is 1 or more, it keeps itself going.">
        <polygon points="80,40 80,120 200,80" fill={C.fill} stroke={C.ink} strokeWidth={3} strokeLinejoin="round" />
        <T x={116} y={80} anchor="middle" size={12.5} bold color={C.signal}>amp</T>
        <Ln x1={200} y1={80} x2={380} y2={80} color={C.signal} width={2.5} />
        <Ln x1={296} y1={80} x2={296} y2={146} color={C.signal} width={2.5} />
        <Ln x1={296} y1={146} x2={46} y2={146} color={C.resist} width={2.5} />
        <Ln x1={46} y1={146} x2={46} y2={80} color={C.resist} width={2.5} />
        <Ln x1={46} y1={80} x2={78} y2={80} color={C.resist} width={2.5} arrow />
        <circle cx={296} cy={80} r={4} fill={C.signal} />
        <rect x={146} y={128} width={140} height={36} rx={8} fill={C.fill} stroke={C.resist} strokeWidth={2} />
        <T x={216} y={146} anchor="middle" size={13} bold color={C.resist}>feedback network</T>
        <T x={390} y={80} size={14} bold color={C.signal}>output</T>
        <T x={296} y={176} anchor="middle" size={12.5} bold color={C.resist}>positive feedback: back in phase</T>
        <T x={X0} y={206} size={13} bold>Loop gain {g.toFixed(2)}:</T>
        <T x={X0 + 110} y={206} size={13} bold color={col}>{verdict}</T>
        <Ln x1={X0} y1={CY} x2={X1} y2={CY} color={C.muted} width={1} dash="3 5" />
        <path d={pts.join('')} fill="none" stroke={C.signal} strokeWidth={2.2} strokeLinejoin="round" />
        <T x={X1} y={306} anchor="end" size={12} color={C.muted}>time →</T>
      </Diagram>
      <Controls>
        <Slider label="Loop gain (amplifier gain × feedback fraction)" value={g} min={0.7} max={1.3} step={0.05} onChange={setG} format={(v) => v.toFixed(2)} color="var(--d-resist)" />
      </Controls>
    </>
  )
}
