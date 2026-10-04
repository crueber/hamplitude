import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

const GM = 398600.4418, RE = 6371
const H = 410 // km, a typical ISS-like height

function elevCurve(maxEl: number) {
  const a = RE + H, w = Math.sqrt(GM / a ** 3)
  const elAt = (b: number) => (Math.atan2(a * Math.cos(b) - RE, a * Math.sin(b)) * 180) / Math.PI
  let lo = 0, hi = Math.acos(RE / a)
  for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2; if (elAt(m) > maxEl) lo = m; else hi = m }
  const beta = (lo + hi) / 2
  const S = [RE * Math.cos(beta), 0, RE * Math.sin(beta)]
  const elev = (t: number) => {
    const p = [a * Math.cos(w * t), a * Math.sin(w * t), 0], d = [p[0] - S[0], p[1] - S[1], p[2] - S[2]]
    return (Math.asin((d[0] * S[0] + d[1] * S[1] + d[2] * S[2]) / (RE * Math.hypot(d[0], d[1], d[2]))) * 180) / Math.PI
  }
  const samples: { t: number; e: number }[] = []
  for (let t = -400; t <= 400; t += 4) { const e = elev(t); if (e >= 0) samples.push({ t, e }) }
  const above = (lim: number) => samples.filter((s) => s.e >= lim).length * 4 / 60
  return { samples, total: above(0), above10: above(10) }
}

/** One pass of a low-orbit station: how long it is above the horizon and above 10 degrees. */
export function IssAndAriss_Pass() {
  const [el, setEl] = useState(40)
  const gx0 = 70, gx1 = 612, gy0 = 236, gy1 = 36 // x: minutes 0..12, y: elevation 0..90
  const X = (m: number) => gx0 + ((gx1 - gx0) * m) / 12
  const Y = (e: number) => gy0 - ((gy0 - gy1) * e) / 90
  const cur = elevCurve(el)
  const mid = 6
  const line = (c: ReturnType<typeof elevCurve>) =>
    c.samples.map((s, i) => `${i ? 'L' : 'M'}${X(mid + s.t / 60).toFixed(1)},${Y(s.e).toFixed(1)}`).join('')
  const ghost = [15, 90].map((m) => ({ m, c: elevCurve(m) }))
  return (
    <>
      <Diagram w={640} h={296}
        title={`A pass of a station orbiting at about 400 kilometres that reaches ${el} degrees elevation lasts about ${cur.total.toFixed(0)} minutes above the horizon and ${cur.above10.toFixed(0)} minutes above 10 degrees`}
        caption="Elevation of the station during one pass (illustrative: 410 km, Earth's rotation ignored). Faint curves: a low and an overhead pass.">
        <rect x={gx0} y={Y(10)} width={gx1 - gx0} height={gy0 - Y(10)} fill={C.bad} fillOpacity={0.1} />
        <rect x={gx1 - 238} y={11} width={14} height={14} rx={3} fill={C.bad} fillOpacity={0.25} />
        <T x={gx1} y={18} anchor="end" size={12} color={C.muted}>below 10°: trees, buildings, noise</T>
        {[0, 30, 60, 90].map((e) => (
          <g key={e}>
            <Ln x1={gx0} y1={Y(e)} x2={gx1} y2={Y(e)} color={e === 0 ? C.muted : C.fill2} width={e === 0 ? 2 : 1} />
            <T x={gx0 - 8} y={Y(e)} anchor="end" size={12} color={C.muted}>{e}°</T>
          </g>
        ))}
        {[0, 3, 6, 9, 12].map((m) => <T key={m} x={X(m)} y={gy0 + 16} anchor="middle" size={12} color={C.muted}>{m}</T>)}
        <T x={(gx0 + gx1) / 2} y={gy0 + 36} anchor="middle" size={12} color={C.muted}>minutes</T>
        <T x={14} y={18} size={13} bold>Elevation above the horizon</T>
        {ghost.map(({ m, c }) => <path key={m} d={line(c)} fill="none" stroke={C.muted} strokeWidth={1.5} strokeDasharray="4 5" opacity={0.7} />)}
        <path d={line(cur)} fill="none" stroke={C.signal} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
        <T x={X(mid - cur.total / 2) - 4} y={Y(0) - 26} anchor="end" size={12} bold color={C.signal}>rises</T>
        <T x={X(mid + cur.total / 2) + 4} y={Y(0) - 26} size={12} bold color={C.signal}>sets</T>
      </Diagram>
      <Controls>
        <Slider label="Highest point of the pass" value={el} min={10} max={90} step={5} onChange={setEl} format={(v) => `${v}°`} color="var(--d-signal)" />
        <Readout label="Above the horizon" value={cur.total.toFixed(1)} unit=" min" color={C.signal} />
        <Readout label="Above 10°" value={cur.above10.toFixed(1)} unit=" min" color={C.good} />
      </Controls>
    </>
  )
}
