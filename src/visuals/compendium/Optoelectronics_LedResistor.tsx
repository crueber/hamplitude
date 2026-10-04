import { useState } from 'react'
import { C, Choice, Controls, Diagram, LED, Resistor, Slider, Source, T, Wire, fmt, si } from '../kit'

const COLORS = [
  { id: 'red', name: 'Red', vf: 2.0, col: C.voltage },
  { id: 'yellow', name: 'Yellow', vf: 2.1, col: C.resist },
  { id: 'blue', name: 'Blue / white', vf: 3.2, col: C.current },
] as const
const E12 = [10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82]
const stdUp = (r: number) => {
  for (let dec = 1; dec <= 1e6; dec *= 10) for (const m of E12) if (m * dec / 10 >= r - 1e-9) return m * dec / 10
  return r
}

/** An LED needs a series resistor: R = (supply - LED drop) / current. LED drops are typical values only. */
export function Optoelectronics_LedResistor() {
  const [vs, setVs] = useState(12)
  const [ma, setMa] = useState(10)
  const [ci, setCi] = useState(0)
  const led = COLORS[ci]
  const i = ma / 1000
  const rCalc = (vs - led.vf) / i
  const rStd = stdUp(rCalc)
  const iAct = (vs - led.vf) / rStd
  const pR = iAct * iAct * rStd
  const glow = Math.min(1, iAct / 0.02)
  return (
    <>
      <Diagram w={640} h={340}
        title={`An LED in series with a resistor on a ${vs} volt supply. A ${led.name} LED drops about ${led.vf} volts, so for ${ma} milliamps the resistor must be ${si(rCalc, 'Ω', 3)}; the next standard value up is ${si(rStd, 'Ω', 3)}, giving ${si(iAct, 'A', 3)}.`}
        caption="The resistor drops whatever voltage the LED does not, and so sets the current. LED drops shown are typical.">
        <Source x={60} y={140} rot={90} len={60} />
        <T x={84} y={140} size={13} bold color={C.voltage}>{vs} V</T>
        <Wire pts={[[60, 110], [60, 70], [130, 70]]} />
        <Resistor x={170} y={70} len={80} />
        <T x={170} y={44} anchor="middle" size={13} bold color={C.resist}>R = {si(rStd, 'Ω', 3)}</T>
        <Wire pts={[[210, 70], [300, 70], [300, 110]]} />
        <LED x={300} y={140} rot={90} len={60} color={led.col} />
        <T x={332} y={160} size={13} bold color={led.col}>LED</T>
        <T x={332} y={180} size={12} color={C.muted}>drops ≈ {led.vf} V</T>
        <Wire pts={[[300, 170], [300, 210], [60, 210], [60, 170]]} />
        <T x={170} y={96} anchor="middle" size={12} color={C.muted}>drops {fmt(vs - led.vf, 3)} V</T>
        {/* glow */}
        <circle cx={520} cy={130} r={56} fill={led.col} opacity={0.12 + 0.6 * glow} />
        <circle cx={520} cy={130} r={22} fill={led.col} opacity={0.35 + 0.65 * glow} />
        <T x={520} y={206} anchor="middle" size={13} bold color={led.col}>{si(iAct, 'A', 3)}</T>
        <T x={520} y={226} anchor="middle" size={12} color={C.muted}>brighter with more current</T>
        {/* working */}
        <rect x={14} y={248} width={612} height={84} rx={12} fill={C.fill} />
        <T x={28} y={268} size={13} mono>R = (Vs − Vf) ÷ I = ({vs} − {led.vf}) ÷ {ma} mA = <tspan fill={C.resist} fontWeight={700}>{si(rCalc, 'Ω', 3)}</tspan></T>
        <T x={28} y={292} size={13} mono>Next standard value up: <tspan fill={C.resist} fontWeight={700}>{si(rStd, 'Ω', 3)}</tspan>, actual current <tspan fill={C.current} fontWeight={700}>{si(iAct, 'A', 3)}</tspan></T>
        <T x={28} y={316} size={13} mono>Resistor heat = I² × R = <tspan fill={C.power} fontWeight={700}>{si(pR, 'W', 2)}</tspan></T>
      </Diagram>
      <Controls>
        <Choice label="LED colour" value={ci} onChange={setCi} options={COLORS.map((c, k) => ({ value: k, label: c.name }))} />
        <Slider label="Supply voltage" value={vs} min={5} max={15} step={0.5} onChange={setVs} format={(v) => `${v} V`} color={C.voltage} />
        <Slider label="Wanted LED current" value={ma} min={2} max={20} step={1} onChange={setMa} format={(v) => `${v} mA`} color={C.current} />
      </Controls>
    </>
  )
}
