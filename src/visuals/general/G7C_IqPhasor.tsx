import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, TAU } from '../kit'

const CX = 130, CY = 150, R = 100
const WX0 = 330, WX1 = 625
const rows = [{ y: 82, name: 'I carrier (cosine)', col: C.current }, { y: 166, name: 'Q carrier (sine)', col: C.voltage }, { y: 250, name: 'Sum = what is sent', col: C.signal }]
const AMP = 32

/** Any signal is a point on the I/Q plane. Two carriers 90° apart, scaled by I and Q, add up to any amplitude and phase. */
export function IqPhasor() {
  const [a, setA] = useState(80)
  const [ph, setPh] = useState(40)
  const A = a / 100
  const rad = (ph * Math.PI) / 180
  const I = A * Math.cos(rad), Q = A * Math.sin(rad)
  const wave = (y: number, f: (th: number) => number) =>
    Array.from({ length: 121 }, (_, k) => {
      const th = (k / 120) * 2 * TAU
      return `${(WX0 + ((WX1 - WX0) * k) / 120).toFixed(1)},${(y - AMP * f(th)).toFixed(1)}`
    }).join(' ')
  const x90 = WX0 + (WX1 - WX0) / 8
  const dx = CX + I * R, dy = CY - Q * R
  return (
    <>
      <Diagram w={640} h={300} title={`I and Q plane. A signal with I equal ${I.toFixed(2)} and Q equal ${Q.toFixed(2)} has amplitude ${A.toFixed(2)} and phase ${ph} degrees. The I and Q carriers are 90 degrees apart, and adding them gives the signal.`}
        caption="I and Q carriers are 90° apart. Changing I and Q gives any amplitude and phase.">
        <circle cx={CX} cy={CY} r={R} fill="none" stroke={C.fill2} strokeWidth={2} strokeDasharray="4 5" />
        <Ln x1={CX - R - 10} y1={CY} x2={CX + R + 14} y2={CY} color={C.muted} arrow />
        <Ln x1={CX} y1={CY + R + 10} x2={CX} y2={CY - R - 14} color={C.muted} arrow />
        <T x={CX + R + 14} y={CY + 16} anchor="end" bold size={13} color={C.current}>I</T>
        <T x={CX + 10} y={CY - R - 14} bold size={13} color={C.voltage}>Q</T>
        <line x1={dx} y1={CY} x2={dx} y2={dy} stroke={C.voltage} strokeWidth={2} strokeDasharray="4 4" />
        <line x1={CX} y1={dy} x2={dx} y2={dy} stroke={C.current} strokeWidth={2} strokeDasharray="4 4" />
        <Ln x1={CX} y1={CY} x2={dx} y2={dy} color={C.signal} width={3.5} arrow />
        <circle cx={dx} cy={dy} r={5} fill={C.signal} />
        <T x={CX} y={CY + R + 32} anchor="middle" size={13} bold>I = {I.toFixed(2)}   Q = {Q.toFixed(2)}</T>

        {rows.map((r) => (
          <g key={r.name}>
            <line x1={WX0} y1={r.y} x2={WX1} y2={r.y} stroke={C.fill2} strokeWidth={1.5} />
            <T x={WX1} y={r.y - 42} anchor="end" size={12} bold color={r.col}>{r.name}</T>
          </g>
        ))}
        <polyline points={wave(rows[0].y, (t) => I * Math.cos(t))} fill="none" stroke={C.current} strokeWidth={2.8} />
        <polyline points={wave(rows[1].y, (t) => Q * Math.sin(t))} fill="none" stroke={C.voltage} strokeWidth={2.8} />
        <polyline points={wave(rows[2].y, (t) => I * Math.cos(t) + Q * Math.sin(t))} fill="none" stroke={C.signal} strokeWidth={2.8} />
        <line x1={WX0} y1={24} x2={WX0} y2={rows[1].y + 36} stroke={C.ink} strokeWidth={1.2} strokeDasharray="3 4" />
        <line x1={x90} y1={24} x2={x90} y2={rows[1].y + 36} stroke={C.ink} strokeWidth={1.2} strokeDasharray="3 4" />
        <Ln x1={WX0} y1={16} x2={x90} y2={16} color={C.ink} width={1.5} arrow="both" />
        <T x={x90 + 6} y={16} size={12} bold>90° apart</T>
      </Diagram>
      <Controls>
        <Slider label="Amplitude" value={a} min={0} max={100} step={5} onChange={setA} format={(v) => `${v}%`} color={C.signal} />
        <Slider label="Phase" value={ph} min={0} max={355} step={5} onChange={setPh} format={(v) => `${v}°`} color={C.power} />
        <Readout label="I and Q" value={`${I.toFixed(2)} / ${Q.toFixed(2)}`} color={C.signal} />
      </Controls>
    </>
  )
}
