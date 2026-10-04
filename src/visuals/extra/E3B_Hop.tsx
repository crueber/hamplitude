import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

const R_EARTH = 6371, H_IONO = 300 // km, assumed single-reflection height
const hopKm = (deg: number) => {
  const b = (deg * Math.PI) / 180
  return 2 * (Math.acos((R_EARTH * Math.cos(b)) / (R_EARTH + H_IONO)) - b) * R_EARTH
}

/** Lower takeoff angle means a longer ground distance per hop. */
export function Hop() {
  const [deg, setDeg] = useState(10)
  const b = (deg * Math.PI) / 180
  const R = 360, Hh = 50, ox = 320, oy = 440
  const th = 2 * (Math.acos((R * Math.cos(b)) / (R + Hh)) - b)
  const at = (ang: number, r: number): [number, number] => [ox + r * Math.sin(ang), oy - r * Math.cos(ang)]
  const A = at(-th / 2, R), B = at(th / 2, R), P = at(0, R + Hh)
  const km = hopKm(deg), mi = km / 1.609344
  const hops = Math.ceil(6000 / mi)
  const tan: [number, number] = [Math.cos(th / 2), -Math.sin(th / 2)]
  return (
    <>
      <Diagram w={640} h={290} title={`A signal leaving at ${deg} degrees above the horizon covers about ${Math.round(mi / 10) * 10} miles per hop. Lower takeoff angles give longer hops`}
        caption="Not to scale. Schematic height of the reflecting layer, about 300 km in the numbers.">
        <circle cx={ox} cy={oy} r={R + Hh} fill="none" stroke={C.muted} strokeWidth={22} opacity={0.2} />
        <T x={608} y={26} anchor="end" size={13} bold color={C.muted}>Ionosphere</T>
        <circle cx={ox} cy={oy} r={R} fill={C.fill} stroke={C.muted} strokeWidth={2} />
        <Ln x1={A[0] - 40 * tan[0]} y1={A[1] - 40 * tan[1]} x2={A[0] + 80 * tan[0]} y2={A[1] + 80 * tan[1]} color={C.muted} width={1.5} dash="4 4" />
        <polyline points={`${A} ${P} ${B}`} fill="none" stroke={C.signal} strokeWidth={3.5} strokeLinejoin="round" />
        <circle cx={A[0]} cy={A[1]} r={7} fill={C.ink} stroke={C.bg} strokeWidth={2} />
        <circle cx={B[0]} cy={B[1]} r={7} fill={C.ink} stroke={C.bg} strokeWidth={2} />
        <T x={A[0]} y={A[1] + 24} anchor="middle" size={13} bold>You</T>
        <T x={B[0]} y={B[1] + 24} anchor="middle" size={13} bold>Lands here</T>
        <T x={A[0] - 14} y={A[1] - 34} anchor="end" size={13} bold color={C.signal}>takeoff angle</T>
        <T x={A[0] - 14} y={A[1] - 16} anchor="end" size={12} color={C.muted}>{`${deg}° above the horizon`}</T>
        <Ln x1={A[0]} y1={A[1] + 52} x2={B[0]} y2={B[1] + 52} color={C.power} width={2.5} arrow="both" />
        <T x={ox} y={A[1] + 70} anchor="middle" size={14} bold color={C.power}>one hop</T>
      </Diagram>
      <Controls>
        <Slider label="Takeoff angle" value={deg} min={0} max={45} step={1} onChange={setDeg} format={(v) => `${v}°`} color="var(--d-signal)" />
        <Readout label="One hop covers about" value={Math.round(mi / 10) * 10} unit="miles" color="var(--d-power)" />
        <Readout label="Hops for 6,000 miles" value={hops} color="var(--d-signal)" />
      </Controls>
    </>
  )
}
