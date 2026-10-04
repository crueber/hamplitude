import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, TAU, fmt, sinePath, useTime } from '../kit'

/** Two same-frequency sine waves as rotating arrows. The wave is the arrow's height; adding waves is adding arrows. */
export function PhasorsAndComplexNumbers_Rotating() {
  const [phiDeg, setPhi] = useState(60)
  const { t, ref, reduced } = useTime(1)
  const th = reduced ? 0.6 : 0.7 * t + 0.6 // current angle of phasor A
  const phi = (phiDeg * Math.PI) / 180
  const aA = 1, aB = 0.7
  const sx = aA + aB * Math.cos(phi), sy = aB * Math.sin(phi) // sum as a vector at th = 0
  const aS = Math.hypot(sx, sy), pS = Math.atan2(sy, sx)
  const U = 62
  const cx = 490, cy = 165
  const tip = (amp: number, ang: number) => ({ x: cx + U * amp * Math.cos(ang), y: cy - U * amp * Math.sin(ang) })
  const A = tip(aA, th), B = tip(aB, th + phi), S = tip(aS, th + pS)
  const X0 = 20, X1 = 330, cyc = 1.2
  const wave = (amp: number, p: number) => sinePath(X0, X1, cy, U * amp, cyc, th - TAU * cyc + p)
  return (
    <>
      <Diagram w={640} h={330} svgRef={ref}
        title={`Two phasors, A and B, ${phiDeg} degrees apart, and their sum. Each arrow's height is the value of its sine wave at that instant. The sum has amplitude ${fmt(aS, 3)} times that of A.`}
        caption="The wave is the arrow's height. Sum the arrows (the dashed parallelogram) and you have summed the waves.">
        <circle cx={cx} cy={cy} r={U * aS} fill="none" stroke={C.fill2} strokeWidth={1.5} strokeDasharray="4 4" />
        <Ln x1={cx - 120} y1={cy} x2={cx + 120} y2={cy} color={C.fill2} width={1.5} />
        <Ln x1={X0} y1={cy} x2={X1} y2={cy} color={C.fill2} width={1.5} />
        <path d={wave(aA, 0)} fill="none" stroke={C.signal} strokeWidth={2.5} />
        <path d={wave(aB, phi)} fill="none" stroke={C.power} strokeWidth={2.5} />
        <path d={wave(aS, pS)} fill="none" stroke={C.ink} strokeWidth={3.5} />
        <Ln x1={X1} y1={S.y} x2={S.x} y2={S.y} color={C.ink} width={1.2} dash="3 4" />
        <Ln x1={A.x} y1={A.y} x2={S.x} y2={S.y} color={C.power} width={1.5} dash="4 4" />
        <Ln x1={B.x} y1={B.y} x2={S.x} y2={S.y} color={C.signal} width={1.5} dash="4 4" />
        <Ln x1={cx} y1={cy} x2={A.x} y2={A.y} color={C.signal} width={4} arrow />
        <Ln x1={cx} y1={cy} x2={B.x} y2={B.y} color={C.power} width={4} arrow />
        <Ln x1={cx} y1={cy} x2={S.x} y2={S.y} color={C.ink} width={4.5} arrow />
        <T x={A.x + (A.x >= cx ? 10 : -10)} y={A.y + (A.y >= cy ? 12 : -12)} anchor={A.x >= cx ? 'start' : 'end'} bold size={14} color={C.signal}>A</T>
        <T x={B.x + (B.x >= cx ? 10 : -10)} y={B.y + (B.y >= cy ? 12 : -12)} anchor={B.x >= cx ? 'start' : 'end'} bold size={14} color={C.power}>B</T>
        <T x={S.x} y={S.y - 16} anchor="middle" bold size={14}>A + B</T>
        <T x={X0} y={cy + 150} size={13} bold color={C.signal}>wave A</T>
        <T x={X0 + 78} y={cy + 150} size={13} bold color={C.power}>wave B</T>
        <T x={X0 + 156} y={cy + 150} size={13} bold>sum</T>
        <T x={X1} y={cy + 150} anchor="end" size={12} color={C.muted}>time →</T>
        <T x={cx} y={cy + 150} anchor="middle" size={12} color={C.muted}>arrows turn counter-clockwise</T>
      </Diagram>
      <Controls>
        <Slider label="Phase of B ahead of A" value={phiDeg} min={0} max={180} step={5} onChange={setPhi} format={(v) => `${v}°`} color="var(--d-power)" />
        <Readout label="Sum, relative to A (A = 1, B = 0.7)" value={`${fmt(aS, 3)} ∠ ${fmt((pS * 180) / Math.PI, 3)}°`} color="var(--d-signal)" />
      </Controls>
    </>
  )
}
