import { useState } from 'react'
import { C, Controls, Diagram, Slider, T } from '../kit'

const GM = 398600.4418 // km^3/s^2
const RE = 6371 // km, mean Earth radius

/** Orbit height sets lap time, speed and how much of the Earth the satellite can see at once. */
export function AmateurSatellites_Altitude() {
  const [h, setH] = useState(500)
  const a = RE + h
  const period = (2 * Math.PI * Math.sqrt(a ** 3 / GM)) / 60 // minutes
  const speed = Math.sqrt(GM / a)
  const lam = Math.acos(RE / a) // central angle to the horizon
  const radius = RE * lam // km, ground distance to the horizon
  const maxPass = (2 * lam) / ((2 * Math.PI) / (period * 60)) / 60 // minutes, overhead pass, Earth's turn ignored

  // drawing: exaggerated height, not to scale
  const cx = 170, cy = 168, R = 100
  const k = 1 + (h - 300) / 1700 * 0.34 + 0.12
  const OR = R * k
  const sy = cy - OR
  const tx = R * Math.sin(Math.acos(R / OR)), ty = R * Math.cos(Math.acos(R / OR))
  const lx = cx - tx, rx = cx + tx, ky = cy - ty
  return (
    <>
      <Diagram w={640} h={304}
        title={`A satellite at ${h} kilometres altitude orbits in about ${period.toFixed(0)} minutes at ${speed.toFixed(1)} kilometres per second and can see ground up to about ${radius.toFixed(0)} kilometres away`}
        caption="Higher orbit: slower, longer lap, wider footprint, longer pass. Height is exaggerated in the drawing.">
        <circle cx={cx} cy={cy} r={OR} fill="none" stroke={C.muted} strokeWidth={1.5} strokeDasharray="3 6" />
        <circle cx={cx} cy={cy} r={R} fill={C.fill2} stroke={C.muted} strokeWidth={2} />
        <path d={`M${cx},${sy} L${lx},${ky} A${R},${R} 0 0 1 ${rx},${ky} Z`} fill={C.signal} fillOpacity={0.22} stroke={C.signal} strokeWidth={2} />
        <path d={`M${lx},${ky} A${R},${R} 0 0 1 ${rx},${ky}`} fill="none" stroke={C.signal} strokeWidth={5} strokeLinecap="round" />
        <g transform={`translate(${cx},${sy})`}>
          <rect x={-7} y={-6} width={14} height={12} rx={3} fill={C.power} stroke={C.bg} strokeWidth={2} />
          <rect x={-26} y={-3} width={15} height={6} fill={C.signal} />
          <rect x={11} y={-3} width={15} height={6} fill={C.signal} />
        </g>
        <T x={cx} y={cy + 6} anchor="middle" size={14} bold color={C.muted}>Earth</T>
        <T x={cx} y={ky + 20} anchor="middle" size={13} bold color={C.signal}>footprint</T>

        <rect x={350} y={18} width={274} height={268} rx={12} fill={C.fill} />
        <T x={366} y={42} size={12} color={C.muted}>Height above the surface</T>
        <T x={366} y={64} size={20} bold mono>{h.toLocaleString('en-US')} km</T>
        <T x={366} y={98} size={12} color={C.muted}>Time for one lap</T>
        <T x={366} y={120} size={20} bold mono color={C.current}>{period.toFixed(0)} min</T>
        <T x={366} y={154} size={12} color={C.muted}>Speed</T>
        <T x={366} y={176} size={20} bold mono color={C.resist}>{speed.toFixed(2)} km/s</T>
        <T x={366} y={210} size={12} color={C.muted}>Sees ground out to about</T>
        <T x={366} y={232} size={20} bold mono color={C.signal}>{radius.toFixed(0)} km</T>
        <T x={366} y={262} size={12} color={C.muted}>Longest pass, horizon to horizon: {maxPass.toFixed(0)} min</T>
      </Diagram>
      <Controls>
        <Slider label="Orbit height" value={h} min={300} max={2000} step={50} onChange={setH} format={(v) => `${v} km`} color="var(--d-signal)" />
      </Controls>
    </>
  )
}
