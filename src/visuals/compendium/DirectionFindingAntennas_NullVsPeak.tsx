import { useState } from 'react'
import { C, Controls, Diagram, Ln, Slider, T, fmt } from '../kit'

const N_PEAK = 3.5 // field ~ cos^3.5: a beam about 50 degrees wide between the 3 dB points
const RAD = Math.PI / 180
const peakDb = (e: number) => 20 * Math.log10(Math.max(Math.cos(e * RAD) ** N_PEAK, 1e-6))
const nullDb = (e: number) => 20 * Math.log10(Math.max(Math.abs(Math.sin(e * RAD)), 1e-6))
const FLOOR = -40

/** Why DF uses nulls: near the peak of a beam the level barely changes; near a loop's null it changes quickly. Ideal patterns. */
export function DirectionFindingAntennas_NullVsPeak() {
  const [err, setErr] = useState(5)
  const x0 = 70, x1 = 410, yt = 40, yb = 220, span = 30
  const X = (e: number) => x0 + ((e + span) / (2 * span)) * (x1 - x0)
  const Y = (db: number) => yt + ((0 - Math.max(FLOOR, db)) / -FLOOR) * (yb - yt)
  const path = (f: (e: number) => number) => Array.from({ length: 241 }, (_, i) => {
    const e = -span + (i / 240) * 2 * span
    return `${i ? 'L' : 'M'}${X(e).toFixed(1)},${Y(f(e)).toFixed(1)}`
  }).join('')
  const dp = peakDb(err), dn = nullDb(err)
  const dnText = dn <= FLOOR ? 'below −40' : fmt(dn, 3)
  return (
    <>
      <Diagram w={640} h={290}
        title={`Signal level versus bearing error. With ${err} degrees of error, a beam's level changes by ${fmt(dp, 2)} dB while a loop's null level changes by ${dnText} dB relative to its maximum`}
        caption="Ideal patterns. Turn off the target by a few degrees: the beam hardly notices, the loop null jumps.">
        <Ln x1={x0} y1={yb} x2={x1} y2={yb} color={C.muted} width={2} />
        <Ln x1={x0} y1={yt - 6} x2={x0} y2={yb} color={C.muted} width={2} />
        {[0, -10, -20, -30, -40].map((d) => (
          <g key={d}>
            <Ln x1={x0 - 4} y1={Y(d)} x2={x1} y2={Y(d)} color={C.fill2} width={1} />
            <T x={x0 - 8} y={Y(d)} anchor="end" size={12} color={C.muted}>{d}</T>
          </g>
        ))}
        <T x={20} y={20} size={12} color={C.muted}>level, dB below maximum</T>
        {[-30, -20, -10, 0, 10, 20, 30].map((e) => <T key={e} x={X(e)} y={yb + 18} anchor="middle" size={12} color={C.muted}>{e}°</T>)}
        <T x={(x0 + x1) / 2} y={yb + 40} anchor="middle" size={12} color={C.muted}>pointing error from the true bearing</T>
        <path d={path(peakDb)} fill="none" stroke={C.signal} strokeWidth={3.5} strokeLinecap="round" />
        <path d={path(nullDb)} fill="none" stroke={C.bad} strokeWidth={3.5} strokeLinecap="round" />
        <Ln x1={X(err)} y1={yt} x2={X(err)} y2={yb} color={C.muted} width={1.2} dash="4 4" />
        <circle cx={X(err)} cy={Y(dp)} r={6} fill={C.signal} stroke={C.bg} strokeWidth={2} />
        <circle cx={X(err)} cy={Y(dn)} r={6} fill={C.bad} stroke={C.bg} strokeWidth={2} />
        <rect x={430} y={36} width={200} height={170} rx={12} fill={C.fill} />
        <T x={444} y={58} size={12} color={C.muted}>With {err}° of error</T>
        <T x={444} y={84} size={13} bold color={C.signal}>Beam peak</T>
        <T x={444} y={106} size={18} bold color={C.signal}>{fmt(dp, 2)} dB</T>
        <T x={444} y={136} size={13} bold color={C.bad}>Loop null</T>
        <T x={444} y={158} size={18} bold color={C.bad}>{dnText} dB</T>
        <T x={444} y={188} size={12} color={C.muted}>{Math.abs(dp) < 1 ? 'Peak change is hard to hear.' : 'Peak change is audible.'}</T>
      </Diagram>
      <Controls>
        <Slider label="Pointing error" value={err} min={0} max={30} step={1} onChange={setErr} format={(v) => `${v}°`} color="var(--d-bad)" />
      </Controls>
    </>
  )
}
