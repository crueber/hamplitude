import { useState } from 'react'
import { C, Controls, Diagram, Dot, Inductor, Ln, Slider, T, Wire, sinePath } from '../kit'

/** Reactance modulator: audio varies a capacitance in the oscillator tank, which varies its frequency. */
export function Reactance() {
  const [v, setV] = useState(0)
  const cycles = 9 - 4 * v // more capacitance -> lower frequency
  const size = 10 + 10 * v // plate gap visual: more C = bigger plates
  const lab = v > 0.15 ? 'high' : v < -0.15 ? 'low' : 'medium'
  const flab = v > 0.15 ? 'lower' : v < -0.15 ? 'higher' : 'at centre'
  return (
    <>
      <Diagram w={640} h={300}
        title={`Reactance modulator: audio voltage changes a capacitance in the oscillator, so the oscillator frequency changes. Capacitance is ${lab}, so frequency is ${flab}.`}
        caption="Audio varies the capacitance. The oscillator's frequency follows. More capacitance, lower frequency.">
        <rect x={14} y={30} width={300} height={200} rx={12} fill="none" stroke={C.muted} strokeWidth={2} strokeDasharray="6 4" />
        <T x={164} y={50} anchor="middle" size={13} bold color={C.muted}>local oscillator tank</T>
        <Wire pts={[[80, 90], [250, 90]]} />
        <Wire pts={[[80, 200], [250, 200]]} />
        <Inductor x={80} y={145} rot={90} len={80} label="L" />
        <Wire pts={[[80, 90], [80, 105]]} />
        <Wire pts={[[80, 185], [80, 200]]} />
        <g>
          <Wire pts={[[250, 90], [250, 126]]} />
          <Wire pts={[[250, 164], [250, 200]]} />
          <line x1={250 - size} y1={126} x2={250 + size} y2={126} stroke={C.signal} strokeWidth={3.5} strokeLinecap="round" />
          <line x1={250 - size} y1={164} x2={250 + size} y2={164} stroke={C.signal} strokeWidth={3.5} strokeLinecap="round" />
          <T x={284} y={152} size={14} bold color={C.signal}>C</T>
        </g>
        <Dot x={80} y={90} />
        <Dot x={250} y={90} />
        <Dot x={80} y={200} />
        <Dot x={250} y={200} />
        <T x={164} y={118} anchor="middle" size={12} color={C.muted}>tuned circuit</T>
        <T x={164} y={218} anchor="middle" size={12} color={C.muted}>sets the frequency</T>
        <rect x={14} y={250} width={104} height={38} rx={10} fill={C.fill} stroke={C.power} strokeWidth={2} />
        <T x={66} y={269} anchor="middle" size={14} bold color={C.power}>Audio in</T>
        <Ln x1={120} y1={269} x2={250} y2={269} color={C.power} width={2.5} />
        <Ln x1={250} y1={269} x2={250} y2={236} color={C.power} width={2.5} arrow />
        <Ln x1={228} y1={176} x2={274} y2={114} color={C.power} width={2.5} arrow />
        <T x={264} y={269} size={13} color={C.power} bold>audio varies C</T>
        <Ln x1={318} y1={130} x2={366} y2={130} color={C.ink} width={3} arrow />
        <T x={466} y={52} anchor="middle" size={14} bold>Output frequency</T>
        <rect x={372} y={70} width={254} height={118} rx={10} fill={C.fill} />
        <path d={sinePath(384, 614, 129, 38, cycles)} fill="none" stroke={C.signal} strokeWidth={3} strokeLinejoin="round" />
        <T x={499} y={214} anchor="middle" size={14} bold color={C.signal}>capacitance: {lab}</T>
        <T x={499} y={236} anchor="middle" size={14} bold color={C.signal}>frequency: {flab}</T>
      </Diagram>
      <Controls>
        <Slider label="Audio voltage (swings the capacitance)" value={v} min={-1} max={1} step={0.05} onChange={setV} format={(x) => (x > 0 ? '+' : x < 0 ? '−' : '') + Math.abs(x).toFixed(2)} color="var(--d-power)" />
      </Controls>
    </>
  )
}
