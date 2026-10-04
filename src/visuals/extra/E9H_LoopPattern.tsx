import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T, TAU, fmt } from '../kit'

/** Small loop: figure-eight with two nulls. Add a sense antenna and the pattern becomes a cardioid with one null. */
export function LoopPattern() {
  const [k, setK] = useState(0)
  const [shield, setShield] = useState(true)
  const eps = shield ? 0 : 0.16
  const R = 112, cx = 190, cy = 170
  const f = (th: number) => Math.hypot(Math.cos(th) + k, eps)
  let max = 0
  for (let i = 0; i < 360; i++) max = Math.max(max, f((i / 360) * TAU))
  const pts = Array.from({ length: 361 }, (_, i) => {
    const th = (i / 360) * TAU
    const r = (f(th) / max) * R
    return `${i ? 'L' : 'M'}${(cx + r * Math.cos(th)).toFixed(1)},${(cy - r * Math.sin(th)).toFixed(1)}`
  }).join('')
  // null directions: where cosθ + k = 0
  const nulls: number[] = k < 0.995 ? [Math.acos(-k), -Math.acos(-k)] : [Math.PI]
  const depth = (th: number) => (f(th) / max)
  const oneNull = k >= 0.995
  const nullLabel = oneNull ? 'one null' : 'two nulls'
  return (
    <>
      <Diagram w={640} h={330} title={`Loop antenna pattern with a sense antenna adding ${fmt(k, 2)} of its strength: ${nullLabel}${shield ? ', deep nulls with an electrostatic shield' : ', shallow nulls without a shield'}`}
        caption="A small loop alone has two opposite nulls, so a bearing is ambiguous by 180°. A sense antenna adds an all-around signal and leaves just one.">
        <T x={20} y={16} size={13} bold color={C.muted}>Top view of the pattern</T>
        <circle cx={cx} cy={cy} r={R} fill="none" stroke={C.fill2} strokeWidth={1.5} />
        <circle cx={cx} cy={cy} r={R / 2} fill="none" stroke={C.fill2} strokeWidth={1.5} />
        <Ln x1={cx - R - 8} y1={cy} x2={cx + R + 8} y2={cy} color={C.fill2} width={1.5} />
        <Ln x1={cx} y1={cy - R - 8} x2={cx} y2={cy + R + 8} color={C.fill2} width={1.5} />
        <path d={pts + 'Z'} fill={C.signal} fillOpacity={0.25} stroke={C.signal} strokeWidth={3.5} strokeLinejoin="round" />
        {nulls.map((th, i) => {
          const r = (depth(th) * R)
          return (
            <g key={i}>
              <circle cx={cx + r * Math.cos(th)} cy={cy - r * Math.sin(th)} r={5} fill={C.bad} stroke={C.bg} strokeWidth={2} />
              <T x={cx + (R + 26) * Math.cos(th)} y={cy - (R + 14) * Math.sin(th)} anchor="middle" size={13} bold color={C.bad}>null</T>
            </g>
          )
        })}
        {/* the loop, edge-on */}
        <Ln x1={cx - 22} y1={cy} x2={cx + 22} y2={cy} color={C.resist} width={6} />
        {/* explanations */}
        <T x={400} y={52} size={14} bold color={C.signal}>{oneNull ? 'Cardioid: a single null' : k === 0 ? 'Loop alone: two nulls' : 'Between: two nulls, close together'}</T>
        <T x={400} y={74} size={13} bold color={C.resist}>Orange bar: the loop, edge-on</T>
        <T x={400} y={100} size={13} color={C.muted}>Loop: strongest in its own plane,</T>
        <T x={400} y={120} size={13} color={C.muted}>null straight through it.</T>
        <T x={400} y={154} size={13} color={C.muted}>Sense antenna: omnidirectional,</T>
        <T x={400} y={174} size={13} color={C.muted}>phased to add on one side and</T>
        <T x={400} y={194} size={13} color={C.muted}>cancel on the other.</T>
        <T x={400} y={234} size={13} bold color={shield ? C.good : C.bad}>{shield ? 'Shield on: deep nulls' : 'No shield: nulls filled in'}</T>
        <T x={400} y={254} size={12} color={C.muted}>{shield ? 'no unbalanced capacitive pickup' : 'capacitive pickup from surroundings'}</T>
      </Diagram>
      <Controls>
        <Slider label="Sense antenna strength" value={k} min={0} max={1} step={0.01} onChange={setK} format={(v) => (v < 0.005 ? 'off' : v > 0.995 ? 'equal to loop' : fmt(v, 2))} color="var(--d-signal)" />
        <Readout label="Nulls" value={oneNull ? '1' : '2'} color={oneNull ? 'var(--d-good)' : 'var(--d-bad)'} />
      </Controls>
      <div style={{ margin: '-6px 0 14px', display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        <Choice label="Preset" value={k >= 0.995 ? 'sense' : k === 0 ? 'loop' : ''} onChange={(v) => setK(v === 'sense' ? 1 : 0)} options={[{ value: 'loop', label: 'Loop alone' }, { value: 'sense', label: 'Loop + sense antenna' }]} />
        <Choice label="Electrostatic shield" value={shield ? 'on' : 'off'} onChange={(v) => setShield(v === 'on')} options={[{ value: 'on', label: 'Shield' }, { value: 'off', label: 'No shield' }]} />
      </div>
    </>
  )
}
