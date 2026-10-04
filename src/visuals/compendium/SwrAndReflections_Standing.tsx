import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, T, TAU, fmt } from '../kit'

const Z0 = 50
const LOADS = [
  { id: 'match', label: '50 Ω: matched', g: 0 },
  { id: 'z100', label: '100 Ω', g: (100 - Z0) / (100 + Z0) },
  { id: 'z25', label: '25 Ω', g: (25 - Z0) / (25 + Z0) },
  { id: 'open', label: 'open circuit', g: 1 },
  { id: 'short', label: 'short circuit', g: -1 },
]

/** Voltage envelope along a line for a few loads: SWR is literally Vmax / Vmin of the standing wave. */
export function SwrAndReflections_Standing() {
  const [id, setId] = useState('z100')
  const { g } = LOADS.find((l) => l.id === id)!
  const m = Math.abs(g)
  const swr = m >= 0.999 ? Infinity : (1 + m) / (1 - m)
  const x0 = 40, x1 = 576, yb = 190, sc = 70 // amplitude 1 = sc px
  const len = 1.5 // wavelengths, load at right end
  const pts: string[] = []
  for (let i = 0; i <= 300; i++) {
    const d = (len * (300 - i)) / 300 // distance from the load, in wavelengths
    const v = Math.sqrt(Math.max(0, 1 + g * g + 2 * g * Math.cos(2 * TAU * d)))
    pts.push(`${i ? 'L' : 'M'}${(x0 + ((x1 - x0) * i) / 300).toFixed(1)},${(yb - v * sc).toFixed(1)}`)
  }
  const vmax = 1 + m, vmin = 1 - m
  return (
    <>
      <Diagram w={640} h={262}
        title={`Voltage along a 50 ohm line ending in a ${LOADS.find((l) => l.id === id)!.label} load. The standing wave has maxima of ${fmt(vmax, 3)} and minima of ${fmt(vmin, 3)} times the forward voltage, so the standing wave ratio is ${swr === Infinity ? 'infinite' : fmt(swr, 3) + ' to 1'}`}
        caption="The voltage on a mismatched line swings between a maximum and a minimum every quarter wavelength. SWR is that maximum divided by that minimum.">
        <T x={20} y={20} size={13.5} bold>Voltage size along the line (forward wave = 1)</T>
        <Ln x1={x0} y1={yb} x2={x1} y2={yb} color={C.muted} width={1.5} />
        <Ln x1={x0} y1={yb - sc} x2={x1} y2={yb - sc} color={C.muted} width={1.5} dash="2 6" />
        <T x={x0 - 8} y={yb - sc} anchor="end" size={12} color={C.muted}>1</T>
        <T x={x0 - 8} y={yb} anchor="end" size={12} color={C.muted}>0</T>
        <Ln x1={x0} y1={yb - vmax * sc} x2={x1} y2={yb - vmax * sc} color={C.bad} width={1.5} dash="6 4" />
        {m > 0.001 && <Ln x1={x0} y1={yb - vmin * sc} x2={x1} y2={yb - vmin * sc} color={C.good} width={1.5} dash="6 4" />}
        <path d={pts.join('')} fill="none" stroke={C.signal} strokeWidth={3.5} strokeLinejoin="round" />
        <T x={x0 + 4} y={yb - vmax * sc - 12} size={12.5} bold color={C.bad}>maximum {fmt(vmax, 3)}</T>
        {m > 0.001 && <T x={x0 + 4} y={yb + 14} size={12.5} bold color={C.good}>minimum {fmt(vmin, 3)}</T>}
        <rect x={x1} y={yb - 44} width={52} height={88} rx={6} fill={C.fill} stroke={C.ink} strokeWidth={2} />
        <T x={x1 + 26} y={yb} anchor="middle" size={12.5} bold>load</T>
        <Ln x1={x0 + ((x1 - x0) * (1 - 0.5 / len))} y1={yb + 38} x2={x1} y2={yb + 38} color={C.muted} width={1.5} arrow="both" />
        <T x={x1 - 89} y={yb + 54} anchor="middle" size={12.5} color={C.muted}>½ wavelength</T>
        <T x={x0} y={246} size={12.5} color={C.muted}>Toward the transmitter ←</T>
      </Diagram>
      <Controls>
        <Readout label="Reflection coefficient |Γ|" value={fmt(m, 3)} color="var(--d-bad)" />
        <Readout label="SWR" value={swr === Infinity ? '∞' : `${fmt(swr, 3)} : 1`} color={swr < 1.05 ? 'var(--d-good)' : 'var(--d-bad)'} />
        <Readout label="Power reflected" value={fmt(m * m * 100, 3)} unit=" %" color="var(--d-power)" />
      </Controls>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Load on a 50 Ω line" value={id} onChange={setId} options={LOADS.map((l) => ({ value: l.id, label: l.label }))} />
      </div>
    </>
  )
}
