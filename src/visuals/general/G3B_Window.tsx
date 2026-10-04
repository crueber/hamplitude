import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

const FMAX = 32
const X0 = 40, X1 = 600
const X = (f: number) => X0 + (f / FMAX) * (X1 - X0)

/** Usable window: below the LUF absorbed, between LUF and MUF refracted, above the MUF passes through. */
export function Window() {
  const [muf, setMuf] = useState(21)
  const [luf, setLuf] = useState(7)
  const [f, setF] = useState(14)
  const none = luf >= muf
  const state = none ? 'none' : f < luf ? 'low' : f > muf ? 'high' : 'ok'
  const best = state === 'ok' && f >= muf * 0.85
  const msg = { none: 'LUF is above the MUF: no skywave path', low: 'Below the LUF: absorbed before it arrives', high: 'Above the MUF: passes through into space', ok: best ? 'Refracted back, with the least attenuation' : 'Refracted back to Earth' }[state]
  const col = state === 'ok' ? C.good : C.bad
  const yb = 262
  const att = (x: number) => yb - 40 * Math.min(1.7, Math.pow(luf / Math.max(x, 0.8), 2))
  const curve = Array.from({ length: 60 }, (_, i) => {
    const ff = 1.8 + (i / 59) * (FMAX - 1.8)
    return `${i ? 'L' : 'M'}${X(ff).toFixed(1)},${att(ff).toFixed(1)}`
  }).join('')
  const ticks = [5, 10, 15, 20, 25, 30]
  return (
    <>
      <Diagram w={640} h={300} title={`MUF ${muf} megahertz, LUF ${luf} megahertz, operating frequency ${f} megahertz. ${msg}`}
        caption="Absorption falls as frequency rises. The LUF is where it becomes tolerable; the MUF is the ceiling.">
        <T x={X0} y={22} size={15} bold color={col}>{f} MHz: {msg}</T>
        <rect x={X0} y={46} width={X1 - X0} height={52} rx={8} fill={C.bad} fillOpacity={0.14} stroke={C.muted} strokeWidth={1.5} />
        {!none && <rect x={X(luf)} y={46} width={X(Math.min(muf, FMAX)) - X(luf)} height={52} fill={C.good} fillOpacity={0.3} stroke={C.good} strokeWidth={2} />}
        {!none && luf > 4 && <T x={(X0 + X(luf)) / 2} y={72} anchor="middle" size={13} bold color={C.bad}>absorbed</T>}
        {!none && X(muf) - X(luf) > 100 && <T x={(X(luf) + X(muf)) / 2} y={72} anchor="middle" size={13} bold color={C.good}>refracted back</T>}
        {!none && muf < 27 && <T x={(X(muf) + X1) / 2} y={72} anchor="middle" size={13} bold color={C.bad}>passes through</T>}
        {none && <T x={(X0 + X1) / 2} y={72} anchor="middle" size={14} bold color={C.bad}>no usable frequency</T>}
        <Ln x1={X(luf)} y1={42} x2={X(luf)} y2={104} color={C.resist} width={3} />
        <T x={X(luf) - 6} y={118} anchor="end" size={13} bold color={C.resist}>LUF</T>
        <Ln x1={X(muf)} y1={42} x2={X(muf)} y2={104} color={C.power} width={3} />
        <T x={X(muf) + 6} y={118} size={13} bold color={C.power}>MUF</T>
        <path d={curve} fill="none" stroke={C.resist} strokeWidth={3} />
        <T x={X(1.8)} y={yb - 84} size={12} color={C.muted}>absorption</T>
        <Ln x1={X0} y1={yb - 40} x2={X1} y2={yb - 40} color={C.muted} width={1.5} dash="5 5" />
        <T x={X1} y={yb - 48} anchor="end" size={12} color={C.muted}>tolerable level</T>
        <Ln x1={X0} y1={yb} x2={X1} y2={yb} color={C.muted} width={2} />
        {ticks.map((t) => (
          <g key={t}>
            <Ln x1={X(t)} y1={yb} x2={X(t)} y2={yb + 5} color={C.muted} width={1.5} />
            <T x={X(t)} y={yb + 18} anchor="middle" size={12} color={C.muted}>{t}</T>
          </g>
        ))}
        <T x={X0} y={yb + 18} size={12} color={C.muted}>MHz</T>
        <Ln x1={X(f)} y1={104} x2={X(f)} y2={yb} color={col} width={2} dash="3 5" />
        <circle cx={X(f)} cy={104} r={7} fill={col} stroke={C.bg} strokeWidth={2} />
      </Diagram>
      <Controls>
        <Slider label="Operating frequency" value={f} min={2} max={30} step={0.5} onChange={setF} format={(v) => `${v} MHz`} color="var(--d-signal)" />
        <Slider label="MUF (sunlight, season, path)" value={muf} min={8} max={30} onChange={setMuf} format={(v) => `${v} MHz`} color="var(--d-power)" />
        <Slider label="LUF (D-region absorption)" value={luf} min={3} max={28} onChange={setLuf} format={(v) => `${v} MHz`} color="var(--d-resist)" />
        <Readout label="Usable window" value={none ? 'none' : `${luf} to ${muf}`} unit={none ? '' : ' MHz'} color="var(--d-good)" />
      </Controls>
    </>
  )
}
