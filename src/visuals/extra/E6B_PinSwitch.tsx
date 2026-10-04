import { useState } from 'react'
import { C, Controls, Diagram, Readout, Slider, T, Wire, sinePath, fmt } from '../kit'

/** PIN diode as a series RF attenuator or switch: forward DC bias current sets its RF resistance. Values are illustrative. */
export function PinSwitch() {
  const [b, setB] = useState(50)
  const r = 5000 * Math.pow(0.0006, b / 100) // ohms, illustrative
  const gain = 100 / (100 + r) // series element in a 50 ohm line (2*Z0/(2*Z0+R))
  const db = -20 * Math.log10(Math.max(gain, 1e-4))
  const on = r < 20
  const amp = 26 * Math.max(gain, 0.02)
  return (
    <>
      <Diagram w={640} h={250}
        title={`A PIN diode in series with an RF line. At ${b} percent forward DC bias its RF resistance is about ${fmt(r, 2)} ohms, so the signal is cut by about ${fmt(db, 2)} dB.`}
        caption="Forward DC bias current sets the RF resistance. More current, lower resistance, less attenuation.">
        <Wire pts={[[20, 100], [250, 100]]} color={C.muted} width={2.5} />
        <Wire pts={[[390, 100], [620, 100]]} color={C.muted} width={2.5} />
        <T x={135} y={16} anchor="middle" size={13} bold>RF in</T>
        <T x={505} y={16} anchor="middle" size={13} bold>RF out</T>
        <path d={sinePath(30, 240, 62, 26, 4)} fill="none" stroke={C.signal} strokeWidth={2.5} />
        <path d={sinePath(400, 610, 62, amp, 4)} fill="none" stroke={C.signal} strokeWidth={2.5} />
        <rect x={250} y={74} width={34} height={52} fill={C.resist} opacity={0.3} stroke={C.ink} strokeWidth={2} />
        <rect x={284} y={74} width={72} height={52} fill={C.fill2} stroke={C.ink} strokeWidth={2} />
        <rect x={356} y={74} width={34} height={52} fill={C.current} opacity={0.3} stroke={C.ink} strokeWidth={2} />
        <T x={267} y={100} anchor="middle" bold size={15} color={C.resist}>P</T>
        <T x={320} y={100} anchor="middle" bold size={15}>I</T>
        <T x={373} y={100} anchor="middle" bold size={15} color={C.current}>N</T>
        <T x={320} y={146} anchor="middle" size={13} color={C.muted}>wide undoped (intrinsic) layer</T>
        <T x={320} y={164} anchor="middle" size={13} color={C.muted}>PIN diode</T>
        <T x={135} y={190} anchor="middle" size={14} bold color={C.voltage}>DC bias: {b}%</T>
        <T x={135} y={210} anchor="middle" size={13} color={C.muted}>forward current from a DC supply</T>
        <T x={505} y={190} anchor="middle" size={14} bold color={on ? C.good : C.bad}>{on ? 'switch on: signal passes' : db > 20 ? 'switch off: signal blocked' : 'attenuating'}</T>
        <T x={505} y={210} anchor="middle" size={13} color={C.muted}>RF resistance ≈ {fmt(r, 2)} Ω · {fmt(db, 2)} dB loss</T>
      </Diagram>
      <Controls>
        <Slider label="Forward DC bias current" value={b} min={0} max={100} step={5} onChange={setB} format={(v) => (v === 0 ? 'none' : `${v}%`)} color={C.current} />
        <Readout label="Attenuation (illustrative)" value={fmt(db, 3)} unit=" dB" color={C.signal} />
      </Controls>
    </>
  )
}
