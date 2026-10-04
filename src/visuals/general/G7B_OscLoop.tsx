import { useState } from 'react'
import { C, Controls, Diagram, Ln, T, Wire, Slider, Readout } from '../kit'

const PASSES = 7
const MAXH = 100

/** Oscillator = amplifier + filter in a feedback loop. Loop gain decides: dies out, holds steady, or grows. */
export function OscLoop() {
  const [g, setG] = useState(1)
  const amps = Array.from({ length: PASSES }, (_, n) => g ** n)
  const verdict = g < 0.98 ? 'Loop gain below 1: the signal dies out' : g > 1.02 ? 'Loop gain above 1: it grows until the amplifier limits' : 'Loop gain of 1: steady oscillation'
  const col = g < 0.98 ? C.bad : g > 1.02 ? C.power : C.good
  return (
    <>
      <Diagram w={640} h={330} title={`Oscillator loop with an amplifier and a filter. Loop gain ${g.toFixed(2)}. ${verdict}.`}
        caption="Part of the output is fed back to the input. Each trip round the loop multiplies the signal by the loop gain.">
        <polygon points="60,40 60,100 120,70" fill={C.fill} stroke={C.ink} strokeWidth={2.2} strokeLinejoin="round" />
        <T x={80} y={114} anchor="middle" size={13} bold>Amplifier</T>
        <rect x={250} y={44} width={100} height={52} rx={10} fill={C.fill} stroke={C.signal} strokeWidth={2} />
        <T x={300} y={70} anchor="middle" size={14} bold>Filter</T>
        <Wire pts={[[120, 70], [250, 70]]} color={C.signal} width={2.5} />
        <Wire pts={[[350, 70], [420, 70], [420, 130], [20, 130], [20, 70], [60, 70]]} color={C.signal} width={2.5} />
        <Ln x1={400} y1={70} x2={420} y2={70} color={C.signal} width={2.5} arrow />
        <T x={290} y={118} anchor="middle" size={13} color={C.muted}>feedback path, back to the input</T>
        <Ln x1={420} y1={70} x2={470} y2={70} color={C.ink} width={2.5} arrow />
        <T x={480} y={70} size={14} bold>output</T>
        <T x={300} y={30} anchor="middle" size={12} color={C.muted}>sets the frequency</T>

        <T x={30} y={160} size={13} bold color={C.muted}>Signal after each trip round the loop</T>
        {amps.map((a, n) => {
          const h = Math.min(a, 2) * (MAXH / 2)
          const x = 40 + n * 80
          return (
            <g key={n}>
              <rect x={x} y={300 - h} width={44} height={h} rx={4} fill={col} opacity={0.8} />
              <T x={x + 22} y={314} anchor="middle" size={12} color={C.muted}>{n === 0 ? 'start' : `trip ${n}`}</T>
            </g>
          )
        })}
        <line x1={32} y1={300 - MAXH / 2} x2={600} y2={300 - MAXH / 2} stroke={C.muted} strokeWidth={1.5} strokeDasharray="5 5" />
        <T x={34} y={300 - MAXH / 2 - 11} size={12} color={C.muted}>start level</T>
        <T x={320} y={186} anchor="middle" size={14} bold color={col}>{verdict}</T>
      </Diagram>
      <Controls>
        <Slider label="Loop gain (amplifier gain × filter loss)" value={g} min={0.5} max={1.5} step={0.05} onChange={setG} format={(v) => v.toFixed(2)} color={C.signal} />
        <Readout label="After 6 trips" value={Math.min(g ** 6, 99).toFixed(2)} unit="× start" color={col} />
      </Controls>
    </>
  )
}
