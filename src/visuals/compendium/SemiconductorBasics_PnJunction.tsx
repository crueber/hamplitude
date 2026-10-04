import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, si } from '../kit'

const X0 = 30, X1 = 410, MID = 220, Y0 = 84, Y1 = 184
const IS = 1e-14 // illustrative saturation current for the ideal-diode model
const VT = 0.0257

/** PN junction under bias: the depletion region narrows in forward bias and widens in reverse bias. */
export function SemiconductorBasics_PnJunction() {
  const [v, setV] = useState(0)
  const fwd = v > 0.05
  const rev = v < -0.05
  // depletion width: sqrt law, built-in potential about 0.7 V for silicon
  const w = Math.max(6, Math.min(186, 64 * Math.sqrt(Math.max(0, 0.7 - v) / 0.7)))
  const i = IS * (Math.exp(v / VT) - 1)
  const conducting = v >= 0.6
  const holes: { x: number; y: number }[] = []
  const elecs: { x: number; y: number }[] = []
  for (let c = 0; c < 9; c++) for (let r = 0; r < 4; r++) {
    const y = Y0 + 17 + r * 22 + (c % 2) * 6
    holes.push({ x: X0 + 14 + c * 21, y })
    elecs.push({ x: MID + 14 + c * 19.6, y })
  }
  const left = MID - w / 2, right = MID + w / 2
  const status = rev ? 'Reverse bias: depletion region widens, no current' : conducting ? 'Forward bias: barrier overcome, current flows' : fwd ? 'Forward bias, below about 0.6 V: barrier still blocks' : 'No bias: carriers cancel at the junction'
  return (
    <>
      <Diagram w={640} h={300}
        title={`A PN junction at ${v.toFixed(1)} volts. ${status}. The depletion region, which has no free carriers, is ${Math.round(w)} units wide.`}
        caption="Forward bias squeezes the depletion region until carriers cross; reverse bias widens it and blocks the flow.">
        <T x={X0} y={30} size={14} bold color={rev ? C.bad : conducting ? C.good : C.muted}>{status}</T>
        <T x={X0} y={54} size={13} color={C.muted}>Applied voltage: <tspan fontWeight={700} fill={C.voltage}>{v === 0 ? '' : v > 0 ? '+' : '−'}{Math.abs(v).toFixed(1)} V</tspan>{v === 0 ? '' : v > 0 ? ' (P side positive)' : ' (N side positive)'}</T>
        <rect x={X0} y={Y0} width={MID - X0} height={Y1 - Y0} fill={C.resist} fillOpacity={0.16} />
        <rect x={MID} y={Y0} width={X1 - MID} height={Y1 - Y0} fill={C.current} fillOpacity={0.16} />
        {holes.filter((h) => h.x < left - 8).map((h, k) => <circle key={k} cx={h.x} cy={h.y} r={6} fill={C.bg} stroke={C.resist} strokeWidth={2.2} />)}
        {elecs.filter((e) => e.x > right + 8).map((e, k) => <circle key={k} cx={e.x} cy={e.y} r={6} fill={C.current} />)}
        <rect x={left} y={Y0} width={w} height={Y1 - Y0} fill={C.fill2} />
        <rect x={X0} y={Y0} width={X1 - X0} height={Y1 - Y0} fill="none" stroke={C.ink} strokeWidth={2} />
        <T x={X0 + 8} y={Y1 + 18} size={14} bold color={C.resist}>P</T>
        <T x={X1 - 8} y={Y1 + 18} anchor="end" size={14} bold color={C.current}>N</T>
        {/* depletion width marker */}
        <Ln x1={left} y1={Y1 + 18} x2={right} y2={Y1 + 18} color={C.muted} width={2} />
        <Ln x1={left} y1={Y1 + 11} x2={left} y2={Y1 + 25} color={C.muted} width={2} />
        <Ln x1={right} y1={Y1 + 11} x2={right} y2={Y1 + 25} color={C.muted} width={2} />
        <T x={MID} y={Y1 + 40} anchor="middle" size={13} color={C.muted}>depletion region (no free carriers)</T>
        {/* forward carrier arrows */}
        {conducting && (
          <g>
            <Ln x1={MID - 70} y1={Y0 - 10} x2={MID - 8} y2={Y0 - 10} color={C.resist} width={3} arrow />
            <Ln x1={MID + 70} y1={Y0 - 10} x2={MID + 8} y2={Y0 - 10} color={C.current} width={3} arrow />
            <T x={MID - 76} y={Y0 - 10} anchor="end" size={12} bold color={C.resist}>holes</T>
            <T x={MID + 76} y={Y0 - 10} size={12} bold color={C.current}>electrons</T>
          </g>
        )}
        {/* key */}
        <circle cx={X0 + 8} cy={262} r={6} fill={C.bg} stroke={C.resist} strokeWidth={2.2} />
        <T x={X0 + 22} y={262} size={12.5} color={C.muted}>hole (positive carrier)</T>
        <circle cx={X0 + 190} cy={262} r={6} fill={C.current} />
        <T x={X0 + 204} y={262} size={12.5} color={C.muted}>electron (negative carrier)</T>
        {/* right panel */}
        <rect x={440} y={Y0} width={190} height={Y1 - Y0 + 24} rx={12} fill={C.fill} />
        <T x={535} y={Y0 + 20} anchor="middle" size={13} bold>Current</T>
        <T x={535} y={Y0 + 62} anchor="middle" size={20} bold mono color={C.current}>{conducting ? si(i, 'A', 2) : rev ? '≈ 0' : fwd ? 'tiny' : '0'}</T>
        <T x={535} y={Y0 + 94} anchor="middle" size={12} color={C.muted}>ideal-diode model</T>
        <T x={535} y={Y0 + 112} anchor="middle" size={12} color={C.muted}>(illustrative only)</T>
      </Diagram>
      <Controls>
        <Slider label="Applied voltage" value={v} min={-5} max={0.8} step={0.1} onChange={(x) => setV(Math.round(x * 10) / 10)} format={(x) => `${x === 0 ? '' : x > 0 ? '+' : '−'}${Math.abs(x).toFixed(1)} V`} color={C.voltage} />
        <Readout label="Depletion width (zero bias = 1)" value={(w / 64).toFixed(2)} unit="×" color={C.muted} />
      </Controls>
    </>
  )
}
