import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

/** Magnetic flux rises with current, then flattens: a saturated core can't add more flux, so inductance collapses. */
export function Saturation() {
  const [i, setI] = useState(30)
  const b = Math.tanh(i / 45) // flux, normalised
  const lRel = 1 / Math.cosh(i / 45) ** 2 // slope = effective inductance
  const sat = lRel < 0.4
  const x0 = 60, x1 = 340, y0 = 200, y1 = 40
  const px = (v: number) => x0 + (v / 100) * (x1 - x0)
  const py = (v: number) => y0 - v * (y0 - y1)
  const pts = Array.from({ length: 101 }, (_, k) => `${px(k).toFixed(1)},${py(Math.tanh(k / 45)).toFixed(1)}`).join(' ')
  return (
    <>
      <Diagram w={640} h={250}
        title={`Magnetic flux in a core versus winding current. At ${i} percent of full current the core is ${sat ? 'saturated: extra current adds almost no flux and the inductance collapses' : 'working normally: flux rises in step with current'}.`}
        caption="Saturation: too much magnetic flux. Flux stops rising, so inductance collapses.">
        <Ln x1={x0} y1={y0} x2={x1} y2={y0} width={1.5} />
        <Ln x1={x0} y1={y0} x2={x0} y2={y1 - 6} width={1.5} />
        <polyline points={pts} fill="none" stroke={C.power} strokeWidth={3} />
        <circle cx={px(i)} cy={py(b)} r={6} fill={sat ? C.bad : C.good} />
        <T x={(x0 + x1) / 2} y={y0 + 22} anchor="middle" size={12} color={C.muted}>current in the winding</T>
        <T x={x0 - 6} y={y1} anchor="end" size={12} color={C.muted}>flux</T>
        <T x={x1 - 6} y={py(1) - 14} anchor="end" size={12} bold color={C.muted}>core can't hold more</T>

        <T x={500} y={50} anchor="middle" bold size={14}>Effective inductance</T>
        <rect x={470} y={66} width={60} height={134} rx={6} fill={C.fill} />
        <rect x={470} y={200 - 134 * lRel} width={60} height={134 * lRel} rx={6} fill={sat ? C.bad : C.current} />
        <T x={500} y={222} anchor="middle" size={14} bold color={sat ? C.bad : C.good}>{sat ? 'saturated' : 'normal'}</T>
      </Diagram>
      <Controls>
        <Slider label="Winding current" value={i} min={0} max={100} step={5} onChange={setI} format={(v) => `${v} %`} color={C.current} />
        <Readout label="Inductance left" value={Math.round(lRel * 100)} unit=" %" color={sat ? C.bad : C.current} />
      </Controls>
    </>
  )
}
