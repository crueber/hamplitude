import { useState } from 'react'
import { C, Controls, Diagram, Ln, Slider, T, fmt } from '../kit'

const sg = (n: number) => (n < 0 ? '−' : '+')

/** Impedance plane: R on the x axis, X on the y axis. Vector length is |Z|, angle is the phase angle. */
export function E5C_ImpedancePlane() {
  const [r, setR] = useState(300)
  const [x, setX] = useState(400)
  const S = 0.42, ox = 90, oy = 195
  const px = (v: number) => ox + v * S
  const py = (v: number) => oy - v * S
  const mag = Math.hypot(r, x)
  const th = (Math.atan2(x, r) * 180) / Math.PI
  const kind = x > 0 ? 'inductive' : x < 0 ? 'capacitive' : 'purely resistive'
  const xc = x >= 0 ? C.signal : C.power
  const arcR = 34
  const a1 = (th * Math.PI) / 180
  const arc = Math.abs(th) > 2 && mag > 40
  const lbl = (v: number) => (v === 0 ? '' : v > 0 ? `j${v}` : `−j${-v}`)
  return (
    <>
      <Diagram w={640} h={400} title={`Impedance plane: ${r} ohms resistance across and ${x} ohms reactance up gives magnitude ${fmt(mag)} ohms at ${fmt(th)} degrees`}
        caption="Across = resistance. Up = inductive reactance. Down = capacitive reactance.">
        <rect x={px(-100)} y={py(400)} width={500 * S} height={400 * S} fill={C.signal} opacity={0.07} />
        <rect x={px(-100)} y={oy} width={500 * S} height={400 * S} fill={C.power} opacity={0.07} />
        {[-100, 0, 100, 200, 300, 400].map((v) => <Ln key={'v' + v} x1={px(v)} y1={py(400)} x2={px(v)} y2={py(-400)} color={C.fill2} width={v === 0 ? 2.5 : 1} />)}
        {[-400, -300, -200, -100, 0, 100, 200, 300, 400].map((v) => <Ln key={'h' + v} x1={px(-100)} y1={py(v)} x2={px(400)} y2={py(v)} color={C.fill2} width={v === 0 ? 2.5 : 1} />)}
        {[100, 200, 300, 400].map((v) => <T key={'t' + v} x={px(v)} y={oy + 14} anchor="middle" size={12} color={C.muted}>{v}</T>)}
        {[-400, -300, -200, -100, 100, 200, 300, 400].map((v) => <T key={'y' + v} x={ox - 6} y={py(v)} anchor="end" size={12} color={C.muted}>{lbl(v)}</T>)}
        <T x={px(400)} y={oy - 14} anchor="end" size={13} bold color={C.resist}>R →</T>
        <T x={ox + 8} y={py(385)} size={13} bold color={C.signal}>+jX inductive</T>
        <T x={ox + 8} y={py(-385)} size={13} bold color={C.power}>−jX capacitive</T>
        <Ln x1={ox} y1={oy} x2={px(r)} y2={oy} color={C.resist} width={3.5} />
        <Ln x1={px(r)} y1={oy} x2={px(r)} y2={py(x)} color={xc} width={3.5} dash={x === 0 ? undefined : '6 4'} />
        {mag > 1 && <Ln x1={ox} y1={oy} x2={px(r)} y2={py(x)} color={C.ink} width={4} arrow />}
        {arc && <path d={`M${ox + arcR},${oy} A${arcR},${arcR} 0 0 ${th > 0 ? 0 : 1} ${ox + arcR * Math.cos(a1)},${oy - arcR * Math.sin(a1)}`} fill="none" stroke={C.ink} strokeWidth={2} />}
        <T x={350} y={34} size={13} color={C.muted}>Rectangular form (R, X)</T>
        <T x={350} y={60} size={18} bold mono>Z = {r} {sg(x)} j{Math.abs(x)} Ω</T>
        <T x={350} y={120} size={13} color={C.muted}>Polar form (magnitude, angle)</T>
        <T x={350} y={148} size={13.5} mono>|Z| = √({r}² + {Math.abs(x)}²)</T>
        <T x={350} y={170} size={13.5} mono>= {fmt(mag)} Ω</T>
        <T x={350} y={198} size={13.5} mono>θ = arctan({x} ÷ {r})</T>
        <T x={350} y={220} size={13.5} mono>= {fmt(th)}°</T>
        <T x={350} y={256} size={18} bold mono>Z = {fmt(mag)} Ω ∠{fmt(th)}°</T>
        <T x={350} y={300} size={14} color={xc} bold>{kind}</T>
        {r === 0 && x !== 0 && <T x={350} y={324} size={13} color={C.muted}>No resistance: the vector lies on the vertical axis.</T>}
        {x === 0 && <T x={350} y={324} size={13} color={C.muted}>Pure resistance sits on the horizontal axis.</T>}
      </Diagram>
      <Controls>
        <Slider label="Resistance (R), horizontal" value={r} min={0} max={400} step={10} onChange={setR} format={(v) => `${v} Ω`} color="var(--d-resist)" />
        <Slider label="Reactance (X), vertical" value={x} min={-400} max={400} step={10} onChange={setX} format={(v) => (v > 0 ? `+j${v} Ω` : v < 0 ? `−j${-v} Ω` : '0 Ω')} />
      </Controls>
    </>
  )
}
