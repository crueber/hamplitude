import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Slider, T, TAU, fmt, useTime } from '../kit'

const MU = 398600.4418, RE = 6378.137, DAY = 1436.07 // km³/s², km, sidereal day in minutes
const CX = 215, CY = 185, FIT = 155 // px radius the far end of the orbit is scaled to (not to scale between settings)
const SPEEDUP = 60 // minutes of orbit per second on screen

type Kind = 'leo' | 'geo' | 'heo'
const PRESET: Record<Kind, { v: number; label: string }> = {
  leo: { v: Math.log10(550), label: 'LEO' },
  geo: { v: Math.log10(35786), label: 'Geostationary' },
  heo: { v: Math.log10(39000), label: 'Elliptical (HEO)' },
}
const PERIGEE_HEO = 500

function solveKepler(M: number, e: number) {
  let E = M
  for (let i = 0; i < 12; i++) E -= (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E))
  return E
}

/** Orbit size sets the lap time; a lap that matches Earth's turn holds the satellite over one spot. */
export function E2A_Orbit() {
  const { t, ref } = useTime(1)
  const [kind, setKind] = useState<Kind>('leo')
  const [v, setV] = useState(PRESET.leo.v)
  const alt = Math.pow(10, v)
  const rp = RE + (kind === 'heo' ? PERIGEE_HEO : alt), ra = RE + alt
  const a = (rp + ra) / 2, e = (ra - rp) / (ra + rp)
  const S = FIT / ra, ER = S * RE // px per km; Earth shrinks as the orbit grows
  const period = (TAU * Math.sqrt((a * a * a) / MU)) / 60
  const tmin = t * SPEEDUP
  const E = solveKepler(((tmin / period) * TAU) % TAU, e)
  const px = CX + S * a * (Math.cos(E) - e), py = CY - S * a * Math.sqrt(1 - e * e) * Math.sin(E)
  const rot = (tmin / DAY) * TAU
  const sx = CX + ER * Math.cos(rot), sy = CY - ER * Math.sin(rot)
  const orbit = Array.from({ length: 121 }, (_, i) => {
    const q = (i / 120) * TAU
    return `${i ? 'L' : 'M'}${(CX + S * a * (Math.cos(q) - e)).toFixed(1)},${(CY - S * a * Math.sqrt(1 - e * e) * Math.sin(q)).toFixed(1)}`
  }).join('')
  const geoish = kind === 'geo' && Math.abs(alt - 35786) < 400
  const periodTxt = period < 180 ? `${fmt(period, 3)} min` : `${fmt(period / 60, 3)} h`
  const [head, sub] = kind === 'heo' ? ['Elliptical (HEO)', 'fast at perigee, slow at apogee'] : geoish ? ['Geostationary', 'lap = one Earth turn: fixed overhead'] : alt < 2000 ? ['LEO', 'short lap, sweeps across the sky'] : ['Higher orbit', 'longer lap']
  const altTxt = `${Math.round(alt).toLocaleString('en-US')} km`
  return (
    <>
      <Diagram w={640} h={370} svgRef={ref} title="Earth in the middle with a satellite orbit around it. A higher orbit has a longer period. At about 35,786 kilometers altitude one lap takes one Earth rotation, so a satellite there stays above the same point (geostationary). An elliptical orbit has a near point, perigee, where the satellite is fast and a far point, apogee, where it is slow."
        caption="Animated 60 min per second, zoomed to fit. The dot on Earth is you.">
        <path d={orbit} fill="none" stroke={C.muted} strokeWidth={1.5} strokeDasharray="3 5" />
        <circle cx={CX} cy={CY} r={ER} fill={C.fill} stroke={C.ink} strokeWidth={2} />
        <Ln x1={CX} y1={CY} x2={sx} y2={sy} color={C.fill2} width={1.5} />
        <circle cx={sx} cy={sy} r={6} fill={C.resist} stroke={C.bg} strokeWidth={2} />
        <Ln x1={sx} y1={sy} x2={px} y2={py} color={geoish ? C.good : C.fill2} width={geoish ? 2 : 1} dash="4 4" />
        <g transform={`translate(${px},${py})`}>
          <rect x={-6} y={-5} width={12} height={10} rx={2} fill={C.power} stroke={C.bg} strokeWidth={2} />
          <rect x={-19} y={-2.5} width={10} height={5} fill={C.signal} />
          <rect x={9} y={-2.5} width={10} height={5} fill={C.signal} />
        </g>
        {kind === 'heo' && (
          <>
            <T x={CX + S * rp + 6} y={CY + 16} size={12} bold color={C.good}>perigee</T>
            <T x={CX - S * ra - 4} y={CY + 16} size={12} bold color={C.bad}>apogee</T>
          </>
        )}
        <T x={430} y={40} size={14} bold color={C.signal}>{head}</T>
        <T x={430} y={62} size={12.5} color={C.muted}>{sub}</T>
        <T x={430} y={120} size={13} color={C.muted}>one Earth turn</T>
        <T x={430} y={140} size={16} bold mono>23 h 56 min</T>
        <T x={430} y={186} size={13} color={C.muted}>one lap of this orbit</T>
        <T x={430} y={206} size={16} bold mono color={C.power}>{periodTxt}</T>
        <T x={430} y={252} size={13} color={C.muted}>{kind === 'heo' ? 'apogee altitude' : 'altitude'}</T>
        <T x={430} y={272} size={16} bold mono>{altTxt}</T>
      </Diagram>
      <Controls>
        <Choice label="Orbit type" value={kind} onChange={(k) => { setKind(k); setV(PRESET[k].v) }} options={(['leo', 'geo', 'heo'] as Kind[]).map((k) => ({ value: k, label: PRESET[k].label }))} />
        <Slider label={kind === 'heo' ? 'Apogee altitude' : 'Altitude'} value={v} min={Math.log10(400)} max={Math.log10(42000)} step={0.005} onChange={setV} format={(x) => `${fmt(Math.pow(10, x), 3)} km`} color="var(--d-power)" />
      </Controls>
    </>
  )
}
