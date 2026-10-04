import { useState } from 'react'
import { C, Choice, Diagram, Ln, T, TAU } from '../kit'

/** Two horizontally polarized Yagis stacked 1/2 wave apart: twice the power (+3 dB), lobe narrower in elevation only. */
export function G9C_Stack() {
  const [two, setTwo] = useState(true)
  const N = 180
  // broad single-Yagi pattern in the vertical plane; stack multiplies by the 2-element array factor
  const el = (e: number) => Math.pow(Math.max(0, Math.cos(e)), 1.2) * (two ? Math.abs(Math.cos((Math.PI / 2) * Math.sin(e))) : 1)
  const az = (a: number) => 0.06 + Math.pow(Math.max(0, Math.cos(a)), 4)
  const ex = 175, ey = 150, ER = 120
  const epts = Array.from({ length: N + 1 }, (_, i) => {
    const e = -Math.PI / 2 + (i / N) * Math.PI
    const r = el(e)
    return `${i ? 'L' : 'M'}${(ex + ER * r * Math.cos(e)).toFixed(1)},${(ey - ER * r * Math.sin(e)).toFixed(1)}`
  }).join('') + 'Z'
  const ax = 500, ay = 150, AR = 100
  const apts = Array.from({ length: N + 1 }, (_, i) => {
    const a = (i / N) * TAU
    const r = az(a) / 1.06
    return `${i ? 'L' : 'M'}${(ax + AR * r * Math.cos(a)).toFixed(1)},${(ay - AR * r * Math.sin(a)).toFixed(1)}`
  }).join('') + 'Z'
  const sep = 60 // 1/2 wave drawn
  return (
    <>
      <Diagram w={640} h={300} title={`${two ? 'Two stacked Yagis' : 'A single Yagi'}: the main lobe is ${two ? 'narrower' : 'wider'} in elevation, and the same width in azimuth`}
        caption="Stacking squeezes the main lobe in elevation (side view). From above, the beam is no narrower. Two antennas at ½ λ give about 3 dB more.">
        <T x={ex} y={16} anchor="middle" size={13} bold color={C.muted}>Side view: elevation</T>
        <path d={epts} fill={C.signal} fillOpacity={0.22} stroke={C.signal} strokeWidth={3} strokeLinejoin="round" />
        {(two ? [-sep / 2, sep / 2] : [0]).map((dy, i) => (
          <Ln key={i} x1={ex - 6} y1={ey - dy} x2={ex + 6} y2={ey - dy} color={C.voltage} width={5} />
        ))}
        {two && <Ln x1={ex - 24} y1={ey - sep / 2} x2={ex - 24} y2={ey + sep / 2} color={C.muted} width={2} arrow="both" />}
        {two && <T x={ex - 30} y={ey} anchor="end" size={12} bold color={C.muted}>½ λ</T>}
        <T x={ex + 90} y={ey - (two ? 80 : 100)} anchor="middle" size={12} bold color={C.good}>{two ? 'narrower lobe' : 'broad lobe'}</T>
        <T x={ax} y={16} anchor="middle" size={13} bold color={C.muted}>From above: azimuth</T>
        <path d={apts} fill={C.signal} fillOpacity={0.22} stroke={C.signal} strokeWidth={3} strokeLinejoin="round" />
        <Ln x1={ax} y1={ay - 14} x2={ax} y2={ay + 14} color={C.voltage} width={5} />
        <T x={ax} y={ay + 124} anchor="middle" size={12} bold color={C.good}>azimuth width unchanged</T>
        <T x={ex} y={282} anchor="middle" size={14} bold color={C.power}>{two ? '2 × the power = 10 log 2 ≈ +3 dB' : 'reference: one Yagi'}</T>
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Antennas" value={two ? 'two' : 'one'} onChange={(v) => setTwo(v === 'two')} options={[{ value: 'one', label: 'One Yagi' }, { value: 'two', label: 'Two stacked ½ λ apart' }]} />
      </div>
    </>
  )
}
