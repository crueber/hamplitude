import { C, Diagram, Ln, T } from '../kit'

// Illustrative flight: steady climb, burst, then a parachute descent that is fast in thin air and slow near the ground.
const CLIMB = 5 // m/s
const BURST = 30 // km
const H0 = 7 // km, atmosphere scale height
const V0 = 6 // m/s, landing speed under a small parachute

function profile() {
  const pts: { t: number; h: number }[] = []
  const tUp = (BURST * 1000) / CLIMB / 60 // minutes
  for (let i = 0; i <= 40; i++) pts.push({ t: (tUp * i) / 40, h: (BURST * i) / 40 })
  // descent: v = V0 * exp(h / (2 H0)) m/s; integrate dt = dh / v
  let t = tUp, h = BURST
  const dh = 0.25
  while (h > 0) {
    const v = V0 * Math.exp(h / (2 * H0))
    t += (dh * 1000) / v / 60
    h -= dh
    if (Math.round(h * 4) % 8 === 0) pts.push({ t, h: Math.max(h, 0) })
  }
  pts.push({ t, h: 0 })
  return { pts, tUp, tEnd: t }
}

/** Typical high-altitude balloon flight: climb, burst, parachute descent. */
export function Balloons_Flight() {
  const { pts, tUp, tEnd } = profile()
  const gx0 = 70, gx1 = 612, gy0 = 244, gy1 = 44
  const X = (m: number) => gx0 + ((gx1 - gx0) * m) / 150
  const Y = (k: number) => gy0 - ((gy0 - gy1) * k) / 35
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${X(p.t).toFixed(1)},${Y(p.h).toFixed(1)}`).join('')
  return (
    <Diagram w={640} h={308}
      title={`Typical balloon flight: a steady climb of about ${Math.round(tUp)} minutes to roughly ${BURST} kilometres, burst, then a parachute descent of about ${Math.round(tEnd - tUp)} minutes`}
      caption="Illustrative profile, not a prediction: real flights depend on balloon, payload mass, gas and weather.">
      {[0, 10, 20, 30].map((k) => (
        <g key={k}>
          <Ln x1={gx0} y1={Y(k)} x2={gx1} y2={Y(k)} color={k === 0 ? C.muted : C.fill2} width={k === 0 ? 2 : 1} />
          <T x={gx0 - 8} y={Y(k)} anchor="end" size={12} color={C.muted}>{k} km</T>
        </g>
      ))}
      {[0, 30, 60, 90, 120, 150].map((m) => <T key={m} x={X(m)} y={gy0 + 16} anchor="middle" size={12} color={C.muted}>{m}</T>)}
      <T x={(gx0 + gx1) / 2} y={gy0 + 36} anchor="middle" size={12} color={C.muted}>minutes after launch</T>
      <T x={14} y={20} size={13} bold>Altitude</T>
      <path d={d} fill="none" stroke={C.power} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={X(tUp)} cy={Y(BURST)} r={6} fill={C.bad} />
      <T x={X(tUp) - 12} y={Y(BURST) - 2} anchor="end" size={13} bold color={C.bad}>burst</T>
      <T x={X(tUp / 2) + 8} y={Y(BURST / 2) + 28} size={13} bold color={C.power}>climb: balloon swells as air thins</T>
      <T x={gx1} y={Y(27)} anchor="end" size={13} bold color={C.current}>parachute:</T>
      <T x={gx1} y={Y(27) + 17} anchor="end" size={13} bold color={C.current}>fast, then slower</T>
      <T x={X(tEnd) + 6} y={Y(0) - 12} size={13} bold color={C.good}>landing</T>
    </Diagram>
  )
}
