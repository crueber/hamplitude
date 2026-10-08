import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

/**
 * A deliberately simple two-way link budget at 146 MHz. ALL values are illustrative.
 *   path loss  = max(free-space, plane-earth) + allowance
 *   free-space = 32.44 + 20 log10(f MHz) + 20 log10(d km)
 *   plane-earth= 40 log10(d m) - 20 log10(h1 m) - 20 log10(h2 m)
 *   allowance  = extra loss for foliage, buildings and body (adjustable)
 * Both directions use the same path loss; they differ in transmit power and in receive-side improvement.
 */
const F = 146
const SYS = 4.5 // repeater antenna 8 dBi, less 2 dB feed line, less 1.5 dB duplexer: net dB at the repeater, either direction
const HT_ANT = -3 // handheld antenna, dBi
const SENS = -118 // receiver sensitivity for a usable signal, dBm (both ends)
const H2_FT = 5
const MAXMI = 50

const dbm = (w: number) => 10 * Math.log10(w * 1000)
const pathLoss = (dKm: number, h1ft: number, extra: number) => {
  const fs = 32.44 + 20 * Math.log10(F) + 20 * Math.log10(dKm)
  const pe = 40 * Math.log10(dKm * 1000) - 20 * Math.log10(h1ft * 0.3048) - 20 * Math.log10(H2_FT * 0.3048)
  return Math.max(fs, pe) + extra
}
/** largest distance (miles) at which margin(d) is still non-negative; margin falls as distance grows. */
const solve = (margin: (dKm: number) => number) => {
  let lo = 0.05, hi = 1000
  for (let i = 0; i < 50; i++) {
    const m = Math.sqrt(lo * hi)
    if (margin(m) >= 0) lo = m
    else hi = m
  }
  return lo * 0.621371
}
const mi = (v: number) => (v < 9.95 ? v.toFixed(1) : Math.round(v).toString())

export function RepeaterCoverageAndAntennas_LinkBudget() {
  const [pr, setPr] = useState(50)
  const [ht, setHt] = useState(5)
  const [rx, setRx] = useState(0)
  const [h, setH] = useState(200)
  const [extra, setExtra] = useState(25)

  const down = solve((d) => dbm(pr) + SYS + HT_ANT - pathLoss(d, h, extra) - SENS)
  const up = solve((d) => dbm(ht) + HT_ANT + SYS + rx - pathLoss(d, h, extra) - SENS)
  const hor = 1.41 * (Math.sqrt(h) + Math.sqrt(H2_FT))
  const usable = Math.min(down, up, hor)
  const gap = dbm(pr) - dbm(ht) - rx // how much weaker the uplink is than the downlink, dB
  const limiter = usable === hor ? 'the radio horizon' : usable === up ? 'the uplink' : 'the downlink'

  const X0 = 214, X1 = 600
  const sx = (v: number) => X0 + (Math.min(v, MAXMI) / MAXMI) * (X1 - X0)
  const rows = [
    { y: 92, label: 'Repeater to you', sub: 'downlink', v: down, color: C.power },
    { y: 148, label: 'You to repeater', sub: 'uplink', v: up, color: C.signal },
  ]
  const gapTxt = gap > 0.5 ? `Uplink is ${gap.toFixed(0)} dB weaker than the downlink` : gap < -0.5 ? `Uplink is ${(-gap).toFixed(0)} dB stronger than the downlink` : 'The two directions are balanced'

  return (
    <>
      <Diagram w={640} h={268}
        title={`With a ${pr} watt repeater at ${h} feet and a ${ht} watt handheld, the repeater can be heard out to about ${mi(down)} miles, the handheld can reach the repeater out to about ${mi(up)} miles, and the radio horizon is ${mi(hor)} miles, so the usable range is about ${mi(usable)} miles, set by ${limiter}`}
        caption="Simple model at 146 MHz, illustrative numbers only. Terrain, foliage and buildings change real coverage a great deal.">
        <T x={20} y={24} size={14} bold color={gap > 0.5 ? C.bad : C.good}>{gapTxt}</T>
        {[0, 10, 20, 30, 40, 50].map((m) => (
          <g key={m}>
            <Ln x1={sx(m)} y1={60} x2={sx(m)} y2={214} color={C.fill2} width={1} dash="3 5" />
            <T x={sx(m)} y={230} anchor="middle" size={12} mono color={C.muted}>{m}</T>
          </g>
        ))}
        <T x={X1} y={250} anchor="end" size={12.5} color={C.muted}>distance from the repeater, miles</T>
        {rows.map((r) => (
          <g key={r.label}>
            <T x={20} y={r.y - 8} size={14} bold>{r.label}</T>
            <T x={20} y={r.y + 12} size={13} bold color={r.color}>{r.v > MAXMI ? `${r.sub}: ${MAXMI}+ mi` : `${r.sub}: ${mi(r.v)} mi`}</T>
            <rect x={X0} y={r.y - 20} width={Math.max(2, sx(r.v) - X0)} height={40} rx={5} fill={r.color} opacity={0.85} />
          </g>
        ))}
        {/* horizon cap and usable range */}
        <Ln x1={sx(hor)} y1={62} x2={sx(hor)} y2={214} color={C.resist} width={2.5} dash="6 5" />
        <T x={sx(hor) + (sx(hor) > X1 - 140 ? -8 : 8)} y={196} anchor={sx(hor) > X1 - 140 ? 'end' : 'start'} size={12.5} bold color={C.resist}>{`radio horizon ${mi(hor)} mi`}</T>
        <Ln x1={sx(usable)} y1={64} x2={sx(usable)} y2={214} color={C.good} width={3} />
        <T x={X0} y={52} size={13} bold color={C.good}>{`Usable range (green line): about ${mi(usable)} mi`}</T>
      </Diagram>
      <Controls>
        <Slider label="Repeater transmitter power" value={pr} min={10} max={100} step={5} onChange={setPr} format={(v) => `${v} W`} color="var(--d-power)" />
        <Slider label="Repeater antenna height" value={h} min={50} max={1000} step={10} onChange={setH} format={(v) => `${v} ft`} color="var(--d-current)" />
        <Slider label="Extra loss: foliage, buildings, body" value={extra} min={0} max={40} step={1} onChange={setExtra} format={(v) => `${v} dB`} color="var(--d-resist)" />
        <Slider label="Receive-side improvement at the repeater" value={rx} min={0} max={15} step={1} onChange={setRx} format={(v) => `+${v} dB`} color="var(--d-good)" />
        <Choice label="Handheld power" value={ht} onChange={setHt} options={[{ value: 1, label: '1 W' }, { value: 5, label: '5 W' }]} />
        <Readout label="Usable range" value={mi(usable)} unit="miles" color={C.good} />
      </Controls>
    </>
  )
}
