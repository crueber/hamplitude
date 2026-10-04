import { useState } from 'react'
import { C, Box, Choice, Controls, Diagram, Ln, Readout, Slider, T, fmt } from '../kit'

/** SWR: how well the load matches the line. Slide the antenna's impedance; watch the reflection. */
export function SwrMatch() {
  const [p, setP] = useState(0.5)
  const [tuner, setTuner] = useState(false)
  const R = 50 * Math.pow(5, 2 * p - 1) // 10 to 250 ohms
  const swr = Math.max(R / 50, 50 / R)
  const gamma = Math.abs(R - 50) / (R + 50)
  const refl = gamma * gamma * 100
  const perfect = Math.abs(R - 50) < 1.2
  const ls = tuner ? 262 : 138 // where the line starts
  const ref = 190 * gamma
  const W = 640, H = 250, ly = 120
  return (
    <>
      <Diagram w={W} h={H} title={`Antenna impedance ${fmt(R, 3)} ohms on a 50 ohm line gives an SWR of about ${fmt(swr, 3)} to 1`} caption="SWR rates the match between the line and its load. 1:1 is perfect. The worse the match, the more is reflected.">
        <Box x={18} y={ly - 36} w={100} h={72} label="Radio" sub="50 Ω" color={C.ink} />
        {tuner && <Box x={150} y={ly - 36} w={98} h={72} label="Tuner" sub="matches" color={C.power} />}
        {tuner && <Ln x1={118} y1={ly} x2={150} y2={ly} color={C.ink} width={4} />}
        <Ln x1={tuner ? 248 : 118} y1={ly} x2={500} y2={ly} color={C.ink} width={5} />
        <Box x={500} y={ly - 36} w={122} h={72} label="Antenna" sub={`${fmt(R, 3)} Ω`} color={perfect ? C.good : C.resist} />
        <Ln x1={ls + 14} y1={ly - 38} x2={470} y2={ly - 38} color={C.signal} width={5} arrow />
        <T x={(ls + 470) / 2} y={ly - 58} anchor="middle" size={13} bold color={C.signal}>forward power</T>
        {ref > 4 && <Ln x1={470} y1={ly + 40} x2={470 - ref} y2={ly + 40} color={C.bad} width={5} arrow />}
        <T x={470 - Math.max(ref, 0) / 2} y={ly + 62} anchor="middle" size={13} bold color={C.bad}>{ref > 4 ? 'reflected power' : 'almost nothing reflected'}</T>
        <T x={68} y={ly + 56} anchor="middle" size={13} color={C.muted}>radio sees</T>
        <T x={68} y={ly + 76} anchor="middle" size={14} bold color={tuner || perfect ? C.good : C.bad}>{tuner ? '1:1' : `${fmt(swr, 3)}:1`}</T>
        {tuner && !perfect && <T x={320} y={ly + 100} anchor="middle" size={13} color={C.muted}>the tuner fixes what the radio sees; the antenna itself is still mismatched</T>}
      </Diagram>
      <Controls>
        <Slider label="Antenna impedance" value={p} min={0} max={1} step={0.005} onChange={setP} format={() => `${fmt(R, 3)} Ω`} color="var(--d-resist)" />
        <Readout label="SWR on the line" value={fmt(swr, 3)} unit=":1" color="var(--d-power)" />
        <Readout label="Power reflected" value={fmt(refl, 2)} unit="%" color="var(--d-bad)" />
      </Controls>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Antenna tuner" value={tuner ? 'on' : 'off'} onChange={(v) => setTuner(v === 'on')} options={[{ value: 'off', label: 'No tuner' }, { value: 'on', label: 'Add antenna tuner' }]} />
      </div>
    </>
  )
}
