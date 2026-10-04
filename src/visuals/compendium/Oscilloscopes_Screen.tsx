import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Slider, T, TAU } from '../kit'

const SIGNALS = [
  { id: 'a', label: '1 kHz, 4 Vpp', f: 1000, vpp: 4 },
  { id: 'b', label: '5 kHz, 1.5 Vpp', f: 5000, vpp: 1.5 },
  { id: 'c', label: '400 Hz, 8 Vpp', f: 400, vpp: 8 },
] as const
const VDIV = [0.5, 1, 2, 5]
const TDIV = [0.1, 0.2, 0.5, 1, 2] // ms per division
const fmtV = (v: number) => `${+v.toFixed(2)}`
const fmtT = (ms: number) => (ms >= 1 ? `${+ms.toFixed(2)} ms` : `${+(ms * 1000).toFixed(0)} µs`)

/** A scope screen explained: the signal is fixed; change volts per division, time per division and the trigger level, and read the signal back from the grid. */
export function Oscilloscopes_Screen() {
  const [sig, setSig] = useState<(typeof SIGNALS)[number]['id']>('a')
  const [vdiv, setVdiv] = useState(1)
  const [tdiv, setTdiv] = useState(0.5)
  const [trig, setTrig] = useState(0)
  const s = SIGNALS.find((x) => x.id === sig)!
  const A = s.vpp / 2
  const triggered = Math.abs(trig) < A
  const phase = triggered ? Math.asin(trig / A) : 1.9
  const D = 36 // px per division
  const X0 = 20, Y0 = 16, GW = 10 * D, GH = 8 * D, cy = Y0 + GH / 2
  const T_total = (10 * tdiv) / 1000 // seconds across the screen
  const pts: string[] = []
  const N = 900
  for (let i = 0; i <= N; i++) {
    const u = i / N
    const v = A * Math.sin(TAU * s.f * T_total * u + phase)
    pts.push(`${i ? 'L' : 'M'}${(X0 + GW * u).toFixed(1)},${(cy - (v / vdiv) * D).toFixed(1)}`)
  }
  const hDiv = s.vpp / vdiv // divisions tall
  const per = 1000 / s.f // period in ms
  const pDiv = per / tdiv // divisions per cycle
  const off = hDiv > 8
  const ty = cy - (trig / vdiv) * D
  const clipId = 'osc-screen-clip'
  return (
    <>
      <Diagram w={640} h={336}
        title={`Oscilloscope screen showing a ${s.label} sine wave at ${fmtV(vdiv)} volts per division and ${fmtT(tdiv)} per division. The wave is ${hDiv.toFixed(1)} divisions tall and one cycle is ${pDiv.toFixed(1)} divisions wide. ${triggered ? '' : 'The trigger level is outside the signal, so the display is not triggered.'}`}
        caption="Height times volts-per-division gives volts; width times time-per-division gives time. The trigger sets where the sweep starts.">
        <defs><clipPath id={clipId}><rect x={X0} y={Y0} width={GW} height={GH} /></clipPath></defs>
        <rect x={X0} y={Y0} width={GW} height={GH} rx={6} fill={C.fill} stroke={C.ink} strokeWidth={2} />
        {Array.from({ length: 9 }, (_, i) => <Ln key={`v${i}`} x1={X0 + i * D + D} y1={Y0} x2={X0 + i * D + D} y2={Y0 + GH} color={C.fill2} width={i === 4 ? 2 : 1} />)}
        {Array.from({ length: 7 }, (_, i) => <Ln key={`h${i}`} x1={X0} y1={Y0 + i * D + D} x2={X0 + GW} y2={Y0 + i * D + D} color={C.fill2} width={i === 3 ? 2 : 1} />)}
        <g clipPath={`url(#${clipId})`}>
          <path d={pts.join('')} fill="none" stroke={triggered ? C.signal : C.muted} strokeWidth={3} strokeLinejoin="round" opacity={triggered ? 1 : 0.7} />
          <Ln x1={X0} y1={ty} x2={X0 + GW} y2={ty} color={C.resist} width={1.5} dash="5 4" />
        </g>
        <path d={`M${X0 - 14},${ty - 6} L${X0 - 3},${ty} L${X0 - 14},${ty + 6} Z`} fill={C.resist} />
        <T x={X0 + 6} y={Y0 + GH + 22} size={12.5} color={C.muted}>1 division = {fmtV(vdiv)} V up, {fmtT(tdiv)} across</T>
        <T x={X0 + GW - 4} y={Y0 + 14} anchor="end" size={12} bold color={triggered ? C.good : C.bad}>{triggered ? 'TRIG' : 'NOT TRIGGERED'}</T>
        {off && <T x={X0 + GW / 2} y={Y0 + 22} anchor="middle" size={12.5} bold color={C.bad}>trace runs off the screen</T>}
        <T x={410} y={34} size={13} bold color={C.voltage}>Voltage</T>
        <T x={410} y={56} size={13} color={C.ink}>{`${hDiv.toFixed(1)} div × ${fmtV(vdiv)} V`}</T>
        <T x={410} y={76} size={13} bold mono color={C.voltage}>{`= ${fmtV(hDiv * vdiv)} Vpp`}</T>
        <T x={410} y={104} size={12} color={C.muted}>{`peak ${fmtV(A)} V, RMS ${fmtV(A / Math.SQRT2)} V`}</T>
        <T x={410} y={146} size={13} bold color={C.signal}>Time</T>
        <T x={410} y={168} size={13} color={C.ink}>{`${pDiv.toFixed(1)} div × ${fmtT(tdiv)}`}</T>
        <T x={410} y={188} size={13} bold mono color={C.signal}>{`= ${fmtT(per)} per cycle`}</T>
        <T x={410} y={212} size={13} bold mono color={C.signal}>{`f = 1 ÷ ${fmtT(per)} = ${s.f} Hz`}</T>
        <T x={410} y={258} size={12.5} bold color={C.resist}>Trigger (amber)</T>
        <T x={410} y={278} size={12} color={C.muted}>starts the sweep where the</T>
        <T x={410} y={296} size={12} color={C.muted}>signal rises through this level</T>
      </Diagram>
      <Controls>
        <Choice label="Signal" value={sig} onChange={setSig} options={SIGNALS.map((x) => ({ value: x.id, label: x.label }))} />
        <Choice label="Volts per division" value={vdiv} onChange={setVdiv} options={VDIV.map((v) => ({ value: v, label: `${v} V/div` }))} />
        <Choice label="Time per division" value={tdiv} onChange={setTdiv} options={TDIV.map((v) => ({ value: v, label: fmtT(v) + '/div' }))} />
        <Slider label="Trigger level" value={trig} min={-4} max={4} step={0.1} onChange={(v) => setTrig(Math.round(v * 10) / 10)} format={(v) => `${v.toFixed(1)} V`} color="var(--d-resist)" />
      </Controls>
    </>
  )
}
