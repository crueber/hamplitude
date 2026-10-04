import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, T, TAU, sinePath, useTime } from '../kit'

type Part = 'r' | 'l' | 'c'
const PHI: Record<Part, number> = { r: 0, l: 90, c: -90 } // voltage angle relative to current

/** Rotating phasors: arrows turn counter-clockwise; the one ahead is leading. */
export function E5C_PhasorWheel() {
  const [part, setPart] = useState<Part>('l')
  const { t, ref, reduced } = useTime(1)
  const w = reduced ? 0.6 : 0.7 * t + 0.6 // radians for the current phasor
  const phi = (PHI[part] * Math.PI) / 180
  const R = 100, cx = 495, cy = 150
  const tip = (a: number) => ({ x: cx + R * Math.cos(a), y: cy - R * Math.sin(a) })
  const I = tip(w), V = tip(w + phi)
  const PX = 20, PW = 300 // trace area: "now" is at its right edge
  const traceX0 = PX, traceX1 = PX + PW
  const cyc = 1.2 // cycles shown
  const ph = (p: number) => w - TAU * cyc + p // value at left edge; sinePath draws left to right ending at w
  const msg = part === 'r' ? 'Voltage and current in phase' : part === 'l' ? 'Voltage leads current by 90°' : 'Current leads voltage by 90°'
  const mn = part === 'r' ? 'Resistor: no shift' : part === 'l' ? 'ELI: E before I in L' : 'ICE: I before E in C'
  return (
    <>
      <Diagram w={640} h={300} svgRef={ref} title={`Phasor wheel for a ${part === 'r' ? 'resistor' : part === 'l' ? 'inductor' : 'capacitor'}: ${msg}`}
        caption="Arrows turn counter-clockwise. The arrow that is ahead of the other is leading.">
        <T x={cx} y={20} anchor="middle" bold size={15}>{msg}</T>
        <circle cx={cx} cy={cy} r={R} fill="none" stroke={C.fill2} strokeWidth={2} />
        <Ln x1={cx - R - 8} y1={cy} x2={cx + R + 8} y2={cy} color={C.fill2} width={1.5} />
        <Ln x1={cx} y1={cy - R - 8} x2={cx} y2={cy + R + 8} color={C.fill2} width={1.5} />
        {/* trace: older to the left, now at the right edge, level with the phasor tips */}
        <Ln x1={traceX0} y1={cy} x2={traceX1} y2={cy} color={C.fill2} width={1.5} />
        <path d={sinePath(traceX0, traceX1, cy, R, cyc, ph(0))} fill="none" stroke={C.current} strokeWidth={3} />
        <path d={sinePath(traceX0, traceX1, cy, R, cyc, ph(phi))} fill="none" stroke={C.voltage} strokeWidth={3} opacity={part === 'r' ? 0.75 : 1} />
        <Ln x1={traceX1} y1={I.y} x2={I.x} y2={I.y} color={C.current} width={1.5} dash="3 4" />
        <Ln x1={traceX1} y1={V.y} x2={V.x} y2={V.y} color={C.voltage} width={1.5} dash="3 4" />
        <Ln x1={cx} y1={cy} x2={I.x} y2={I.y} color={C.current} width={4} arrow />
        <Ln x1={cx} y1={cy} x2={V.x} y2={V.y} color={C.voltage} width={4} arrow />
        <T x={I.x + (I.x >= cx ? 12 : -12)} y={I.y + (I.y >= cy ? 14 : -14)} anchor={I.x >= cx ? 'start' : 'end'} bold size={14} color={C.current}>I</T>
        <T x={V.x + (V.x >= cx ? 12 : -12)} y={V.y + (V.y >= cy ? 14 : -14)} anchor={V.x >= cx ? 'start' : 'end'} bold size={14} color={C.voltage}>V</T>
        <T x={PX} y={cy + R + 34} size={13} bold color={C.voltage}>voltage</T>
        <T x={PX + 80} y={cy + R + 34} size={13} bold color={C.current}>current</T>
        <T x={PX + PW} y={cy + R + 34} anchor="end" size={12} color={C.muted}>time →</T>
        <T x={cx} y={cy + R + 34} anchor="middle" bold size={14}>{mn}</T>
      </Diagram>
      <Controls>
        <Choice label="Part" value={part} onChange={setPart} options={[{ value: 'r', label: 'Resistor' }, { value: 'l', label: 'Inductor' }, { value: 'c', label: 'Capacitor' }]} />
      </Controls>
    </>
  )
}
