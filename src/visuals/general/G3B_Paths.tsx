import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, fmt } from '../kit'

const CIRC = 40000 // km around the Earth
const CKM = 300000 // km per second

/** Short path and long path both reach you; the long path arrives later as an echo. */
export function Paths() {
  const [deg, setDeg] = useState(100)
  const cx = 150, cy = 148, r = 96
  const pt = (a: number): [number, number] => [cx + r * Math.sin((a * Math.PI) / 180), cy - r * Math.cos((a * Math.PI) / 180)]
  const [sx, sy] = pt(deg)
  const arc = (a0: number, a1: number) => {
    const [x0, y0] = pt(a0), [x1, y1] = pt(a1)
    return `M${x0},${y0} A${r},${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1},${y1}`
  }
  const dShort = (deg / 360) * CIRC, dLong = CIRC - dShort
  const tS = (dShort / CKM) * 1000, tL = (dLong / CKM) * 1000, echo = tL - tS
  const ax0 = 300, ax1 = 616, TMAX = 130
  const tx = (t: number) => ax0 + (t / TMAX) * (ax1 - ax0)
  const mid = pt(deg / 2), midL = pt((deg + 360) / 2)
  return (
    <>
      <Diagram w={640} h={300} title={`Short path ${Math.round(dShort)} kilometres arrives after ${fmt(tS, 2)} milliseconds; long path ${Math.round(dLong)} kilometres arrives ${fmt(echo, 2)} milliseconds later, heard as a slightly delayed echo`}
        caption="Top view of the Earth. Both paths carry the same signal, so you hear it twice.">
        <circle cx={cx} cy={cy} r={r} fill={C.fill} stroke={C.muted} strokeWidth={2} />
        <path d={arc(0, deg)} fill="none" stroke={C.good} strokeWidth={6} strokeLinecap="round" />
        <path d={arc(deg, 360)} fill="none" stroke={C.power} strokeWidth={6} strokeLinecap="round" strokeDasharray="2 10" />
        <circle cx={cx} cy={cy - r} r={8} fill={C.ink} stroke={C.bg} strokeWidth={2} />
        <T x={cx} y={cy - r - 18} anchor="middle" size={13} bold>You</T>
        <circle cx={sx} cy={sy} r={8} fill={C.signal} stroke={C.bg} strokeWidth={2} />
        <T x={sx + (sx > cx ? 14 : -14)} y={sy + (sy > cy ? 14 : 0)} anchor={sx > cx ? 'start' : 'end'} size={13} bold>Station</T>
        <T x={cx + (mid[0] - cx) * 0.55} y={cy + (mid[1] - cy) * 0.55} anchor="middle" size={13} bold color={C.good}>short</T>
        <T x={cx + (midL[0] - cx) * 0.55} y={cy + (midL[1] - cy) * 0.55} anchor="middle" size={13} bold color={C.power}>long</T>
        <T x={ax0} y={34} size={14} bold>Arrival time at your receiver</T>
        <Ln x1={ax0} y1={190} x2={ax1} y2={190} color={C.muted} width={2} />
        <T x={ax1} y={212} anchor="end" size={12} color={C.muted}>time (ms)</T>
        <Ln x1={tx(tS)} y1={190} x2={tx(tS)} y2={90} color={C.good} width={8} />
        <T x={tx(tS)} y={74} anchor="middle" size={13} bold color={C.good}>short path</T>
        <Ln x1={tx(tL)} y1={190} x2={tx(tL)} y2={118} color={C.power} width={8} />
        <T x={tx(tL)} y={102} anchor="middle" size={13} bold color={C.power}>long path</T>
        <Ln x1={tx(tS) + 8} y1={150} x2={tx(tL) - 8} y2={150} color={C.ink} width={2} arrow="both" />
        <T x={(tx(tS) + tx(tL)) / 2} y={140} anchor="middle" size={13} bold>echo delay</T>
        <T x={ax0} y={248} size={13} color={C.muted}>short {Math.round(dShort).toLocaleString()} km, long {Math.round(dLong).toLocaleString()} km</T>
        <T x={ax0} y={270} size={14} bold>Heard as a slightly delayed echo</T>
      </Diagram>
      <Controls>
        <Slider label="Station position around the globe" value={deg} min={30} max={170} step={5} onChange={setDeg} format={(v) => `${v}° from you`} color="var(--d-signal)" />
        <Readout label="Echo delay" value={fmt(echo, 2)} unit=" ms" color="var(--d-power)" />
      </Controls>
    </>
  )
}
