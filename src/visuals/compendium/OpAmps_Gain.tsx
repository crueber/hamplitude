import { useState } from 'react'
import { C, Choice, Controls, Diagram, Dot, Ground, Ln, Resistor, Slider, T, TAU, Wire, fmt } from '../kit'
import { OpAmpSymbol } from '../shared/OpAmpSymbol'

const R1 = 10 // kΩ, fixed
const CLIP = 10 // V, illustrative clipping level for a +/-12 V supply
const WX0 = 398, WX1 = 618, WY = 140, WS = 8 // waveform box, px per volt

/** Inverting and non-inverting op-amp amplifiers: the gain is set by two resistors. Ideal op-amp, illustrative clip level. */
export function OpAmps_Gain() {
  const [mode, setMode] = useState<'inv' | 'non'>('inv')
  const [rf, setRf] = useState(47) // kΩ
  const [amp, setAmp] = useState(0.5) // V peak
  const inv = mode === 'inv'
  const gain = inv ? -rf / R1 : 1 + rf / R1
  const ideal = amp * gain
  const clipped = Math.abs(ideal) > CLIP
  const wave = (g: number, clip: boolean) => {
    const pts: string[] = []
    for (let i = 0; i <= 120; i++) {
      const u = i / 120
      let v = amp * g * Math.sin(TAU * 2 * u)
      if (clip) v = Math.max(-CLIP, Math.min(CLIP, v))
      pts.push(`${WX0 + (WX1 - WX0) * u},${WY - v * WS}`)
    }
    return pts.join(' ')
  }
  const sgn = (n: number) => (n < 0 ? '−' : '') + fmt(Math.abs(n), 3)
  const A = 170, Y = 140
  return (
    <>
      <Diagram w={640} h={352}
        title={`${inv ? 'Inverting' : 'Non-inverting'} op-amp amplifier with R1 ${R1} kilohms and Rf ${rf} kilohms: gain is ${sgn(gain)}. A ${amp} volt peak input gives ${fmt(Math.abs(ideal), 3)} volts peak at the output${inv ? ', upside down' : ', in phase'}${clipped ? ', so the output clips' : ''}.`}
        caption={inv ? 'Inverting: gain = −Rf ÷ R1. The output is the input turned upside down.' : 'Non-inverting: gain = 1 + Rf ÷ R1. The output follows the input, never less than 1.'}>
        <OpAmpSymbol x={A} y={Y} w={110} h={100} />
        {/* output */}
        <Wire pts={[[A + 110, Y], [350, Y]]} />
        <Dot x={310} y={Y} />
        <circle cx={358} cy={Y} r={8} fill={C.bg} stroke={C.ink} strokeWidth={2.2} />
        <T x={358} y={Y + 24} anchor="middle" size={13} bold color={C.voltage}>Vout</T>
        {/* feedback */}
        <Wire pts={[[130, Y - 25], [130, 60], [310, 60], [310, Y]]} />
        <Resistor x={220} y={60} len={70} />
        <T x={220} y={38} anchor="middle" size={13} bold color={C.resist}>Rf = {rf} kΩ</T>
        <Dot x={130} y={Y - 25} />
        <Wire pts={[[130, Y - 25], [A, Y - 25]]} />
        {inv ? (
          <g>
            <Wire pts={[[28, Y - 25], [45, Y - 25]]} />
            <Resistor x={75} y={Y - 25} len={60} />
            <Wire pts={[[105, Y - 25], [130, Y - 25]]} />
            <T x={75} y={Y - 55} anchor="middle" size={13} bold color={C.resist}>R1 = 10 kΩ</T>
            <circle cx={20} cy={Y - 25} r={8} fill={C.bg} stroke={C.ink} strokeWidth={2.2} />
            <T x={20} y={Y - 45} anchor="middle" size={13} bold color={C.signal}>Vin</T>
            <Wire pts={[[A, Y + 25], [150, Y + 25], [150, Y + 52]]} />
            <Ground x={150} y={Y + 52} />
          </g>
        ) : (
          <g>
            <Wire pts={[[130, Y - 25], [105, Y - 25]]} />
            <Resistor x={75} y={Y - 25} len={60} />
            <Wire pts={[[45, Y - 25], [30, Y - 25]]} />
            <Ground x={30} y={Y - 25} />
            <T x={75} y={Y - 55} anchor="middle" size={13} bold color={C.resist}>R1 = 10 kΩ</T>
            <circle cx={20} cy={Y + 25} r={8} fill={C.bg} stroke={C.ink} strokeWidth={2.2} />
            <T x={20} y={Y + 49} anchor="middle" size={13} bold color={C.signal}>Vin</T>
            <Wire pts={[[28, Y + 25], [A, Y + 25]]} />
          </g>
        )}
        {/* waveforms */}
        <rect x={382} y={30} width={248} height={220} rx={10} fill={C.fill} />
        <Ln x1={WX0} y1={WY} x2={WX1} y2={WY} color={C.muted} width={1.5} />
        <Ln x1={WX0} y1={WY - CLIP * WS} x2={WX1} y2={WY - CLIP * WS} color={C.bad} width={1.5} dash="4 4" />
        <Ln x1={WX0} y1={WY + CLIP * WS} x2={WX1} y2={WY + CLIP * WS} color={C.bad} width={1.5} dash="4 4" />
        <T x={WX1} y={WY - CLIP * WS - 10} anchor="end" size={12} color={C.bad}>clip level (illustrative)</T>
        <polyline points={wave(1, false)} fill="none" stroke={C.signal} strokeWidth={2.5} />
        <polyline points={wave(gain, true)} fill="none" stroke={C.voltage} strokeWidth={3} />
        <T x={WX0} y={238} size={13} bold color={C.signal}>Vin (input)</T>
        <T x={WX0 + 100} y={238} size={13} bold color={C.voltage}>Vout (output)</T>
        {/* working */}
        <rect x={14} y={266} width={612} height={76} rx={12} fill={C.fill} />
        <T x={28} y={286} size={13.5} mono>{inv
          ? <tspan>Gain = −Rf ÷ R1 = −{rf} ÷ {R1} = <tspan fill={C.power} fontWeight={700}>{sgn(gain)}</tspan></tspan>
          : <tspan>Gain = 1 + Rf ÷ R1 = 1 + {rf} ÷ {R1} = <tspan fill={C.power} fontWeight={700}>{sgn(gain)}</tspan></tspan>}</T>
        <T x={28} y={310} size={13.5} mono>Vout peak = {amp} V × {sgn(gain)} = <tspan fill={C.voltage} fontWeight={700}>{sgn(clipped ? Math.sign(ideal) * CLIP : ideal)} V</tspan>{clipped ? ' (clipped)' : ''}</T>
        <T x={28} y={330} size={12} color={C.muted}>{inv ? 'Output is inverted (180° out of phase).' : 'Output is in phase with the input.'}</T>
      </Diagram>
      <Controls>
        <Choice label="Configuration" value={mode} onChange={setMode} options={[{ value: 'inv', label: 'Inverting' }, { value: 'non', label: 'Non-inverting' }]} />
        <Slider label="Feedback resistor Rf" value={rf} min={1} max={100} step={1} onChange={setRf} format={(v) => `${v} kΩ`} color={C.resist} />
        <Slider label="Input amplitude (peak)" value={amp} min={0.1} max={2} step={0.1} onChange={(v) => setAmp(Math.round(v * 10) / 10)} format={(v) => `${v.toFixed(1)} V`} color={C.signal} />
      </Controls>
    </>
  )
}
