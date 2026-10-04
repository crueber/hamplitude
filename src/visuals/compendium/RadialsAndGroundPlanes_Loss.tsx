import { useState } from 'react'
import { C, Controls, Diagram, Slider, T } from '../kit'

const RR = 36 // ohms: radiation resistance of a quarter-wave vertical over a good ground

/** Efficiency = radiation resistance / (radiation resistance + ground loss resistance). */
export function RadialsAndGroundPlanes_Loss() {
  const [rg, setRg] = useState(12)
  const eff = RR / (RR + rg)
  const pct = Math.round(eff * 100)
  const db = 10 * Math.log10(eff)
  const x0 = 30, W = 580, sc = W / 76
  const good = pct >= 80
  return (
    <>
      <Diagram w={640} h={250}
        title={`Quarter-wave vertical with 36 ohms of radiation resistance and ${rg} ohms of ground loss resistance: efficiency ${pct} percent, so of 100 watts about ${pct} watts are radiated and ${100 - pct} watts heat the ground. Illustrative.`}
        caption="Illustrative model. Ground loss is a resistance in series with the antenna: it takes its share of the power.">
        <T x={x0} y={22} size={13} bold color={C.muted}>Resistance the transmitter sees (Ω)</T>
        <rect x={x0} y={40} width={RR * sc} height={34} fill={C.good} fillOpacity={0.9} />
        <rect x={x0 + RR * sc} y={40} width={Math.max(rg * sc, 0)} height={34} fill={C.bad} fillOpacity={0.9} />
        <rect x={x0} y={40} width={W} height={34} fill="none" stroke={C.fill2} strokeWidth={1.5} />
        <T x={x0 + 8} y={92} size={13} bold color={C.good}>radiation 36</T>
        <T x={x0 + W} y={92} anchor="end" size={13} bold color={C.bad}>ground loss {rg}</T>
        <rect x={x0} y={118} width={W} height={50} rx={10} fill={C.fill} stroke={good ? C.good : C.bad} strokeWidth={2} />
        <T x={x0 + 14} y={143} size={16} bold color={good ? C.good : C.bad}>efficiency = 36 ÷ {RR + rg} = {pct}%</T>
        <T x={x0 + W - 14} y={143} anchor="end" size={14} bold color={C.muted}>{db.toFixed(1)} dB</T>
        <T x={x0} y={196} size={14} color={C.ink}>Of 100 W from the transmitter:</T>
        <T x={x0} y={222} size={14} bold color={C.good}>{pct} W radiated</T>
        <T x={x0 + 200} y={222} size={14} bold color={C.bad}>{100 - pct} W heats the ground</T>
      </Diagram>
      <Controls>
        <Slider label="Ground loss resistance (fewer radials or poorer soil = more)" value={rg} min={0} max={40} step={1} onChange={setRg} format={(v) => `${v} Ω`} color="var(--d-bad)" />
      </Controls>
    </>
  )
}
