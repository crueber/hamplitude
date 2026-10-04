import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T, TAU, fmt } from '../kit'

/** Ideal (tuned-load) efficiency for full conduction angle th (radians). Class A = 50%, class B = pi/4. */
const eff = (th: number) => (th - Math.sin(th)) / (4 * (Math.sin(th / 2) - (th / 2) * Math.cos(th / 2)))
const clsOf = (deg: number) => (deg >= 360 ? 'A' : deg > 180 ? 'AB' : deg === 180 ? 'B' : 'C')

/** Conduction angle trades efficiency against linearity: the output current pulse and the ideal efficiency. */
export function Amplifiers_Tradeoff() {
  const [deg, setDeg] = useState(180)
  const th = (deg * Math.PI) / 180
  const a = th / 2
  const eta = eff(th)
  const idc = (Math.sin(a) - a * Math.cos(a)) / (Math.PI * (1 - Math.cos(a)))
  const cls = clsOf(deg)

  // left panel: output current over two input cycles
  const lx0 = 36, lx1 = 300, yb = 196, yt = 74
  const pts: string[] = []
  for (let k = 0; k <= 240; k++) {
    const phi = -TAU + (2 * TAU * k) / 240
    const w = ((phi + Math.PI) % TAU + TAU) % TAU - Math.PI
    const i = Math.abs(w) < a ? (Math.cos(w) - Math.cos(a)) / (1 - Math.cos(a)) : 0
    pts.push(`${(lx0 + ((lx1 - lx0) * k) / 240).toFixed(1)},${(yb - i * (yb - yt)).toFixed(1)}`)
  }

  // right panel: efficiency against conduction angle
  const rx0 = 380, rx1 = 610, ry0 = 200, ry1 = 74
  const gx = (d: number) => rx0 + ((d - 60) / 300) * (rx1 - rx0)
  const gy = (e: number) => ry0 - e * (ry0 - ry1)
  const curve = Array.from({ length: 61 }, (_, k) => {
    const d = 60 + k * 5
    return `${gx(d).toFixed(1)},${gy(eff((d * Math.PI) / 180)).toFixed(1)}`
  }).join(' ')
  const dx = gx(deg), dy = gy(eta)
  const flip = dx > rx1 - 70

  return (
    <>
      <Diagram w={640} h={300}
        title={`Amplifier conduction angle ${deg} degrees, class ${cls}. The output current flows for ${deg} degrees of each 360 degree cycle and the ideal efficiency is ${fmt(eta * 100, 3)} percent. Less conduction gives higher efficiency but a pulse shape that no longer copies the input.`}
        caption="Illustrative ideal figures for a single device with a tuned load. Real amplifiers fall a little short.">
        <T x={lx0} y={26} size={14} bold color={C.current}>Output current</T>
        <T x={lx0} y={46} size={12} color={C.muted}>two cycles of the input signal</T>
        <Ln x1={lx0} y1={yb} x2={lx1} y2={yb} color={C.muted} width={1.5} />
        <T x={lx0 - 6} y={yb} anchor="end" size={12} color={C.muted}>0</T>
        <line x1={lx0} y1={yb - idc * (yb - yt)} x2={lx1} y2={yb - idc * (yb - yt)} stroke={C.resist} strokeWidth={2} strokeDasharray="5 4" />
        <polyline points={pts.join(' ')} fill="none" stroke={C.current} strokeWidth={3.2} strokeLinejoin="round" />
        <Ln x1={lx0 + 8} y1={222} x2={lx0 + 38} y2={222} color={C.resist} width={2} dash="5 4" />
        <T x={lx0 + 46} y={222} size={12} color={C.muted}>average current from the supply</T>

        <T x={rx0} y={26} size={14} bold color={C.power}>Ideal efficiency</T>
        <T x={rx0} y={46} size={12} color={C.muted}>against conduction angle</T>
        <Ln x1={rx0} y1={ry0} x2={rx1} y2={ry0} color={C.muted} width={1.5} />
        <Ln x1={rx0} y1={ry0} x2={rx0} y2={ry1 - 8} color={C.muted} width={1.5} />
        {[0, 0.5, 1].map((e) => <T key={e} x={rx0 - 6} y={gy(e)} anchor="end" size={12} color={C.muted}>{`${e * 100}%`}</T>)}
        <polyline points={curve} fill="none" stroke={C.power} strokeWidth={3} strokeLinejoin="round" />
        <line x1={dx} y1={dy} x2={dx} y2={ry0} stroke={C.power} strokeWidth={1.5} strokeDasharray="3 3" />
        <circle cx={dx} cy={dy} r={6} fill={C.bg} stroke={C.power} strokeWidth={3} />
        <T x={flip ? dx - 10 : dx + 10} y={dy - 12} anchor={flip ? 'end' : 'start'} size={13} bold color={C.power}>{`${fmt(eta * 100, 3)}%`}</T>
        {[60, 180, 360].map((d) => <T key={d} x={gx(d)} y={ry0 + 14} anchor="middle" size={12} color={C.muted}>{`${d}°`}</T>)}
        <T x={gx(120)} y={ry0 + 34} anchor="middle" size={13} bold color={cls === 'C' ? C.ink : C.muted}>C</T>
        <T x={gx(180)} y={ry0 + 34} anchor="middle" size={13} bold color={cls === 'B' ? C.ink : C.muted}>B</T>
        <T x={gx(270)} y={ry0 + 34} anchor="middle" size={13} bold color={cls === 'AB' ? C.ink : C.muted}>AB</T>
        <T x={gx(360)} y={ry0 + 34} anchor="end" size={13} bold color={cls === 'A' ? C.ink : C.muted}>A</T>

        <T x={320} y={266} anchor="middle" size={15} bold>{`Class ${cls}: conducts ${deg}° of every 360° cycle`}</T>
        <T x={320} y={286} anchor="middle" size={13} color={C.muted}>Less conduction wastes less heat, but the current pulse stops looking like the input.</T>
      </Diagram>
      <Controls>
        <Choice label="Class of operation" value={deg}
          options={[{ value: 360, label: 'A' }, { value: 270, label: 'AB' }, { value: 180, label: 'B' }, { value: 120, label: 'C' }]} onChange={setDeg} />
        <Slider label="Conduction angle" value={deg} min={60} max={360} step={5} onChange={setDeg} format={(v) => `${v}°`} color={C.current} />
        <Readout label="Heat per 100 W of output" value={fmt(100 / eta - 100, 3)} unit="W" color={C.resist} />
      </Controls>
    </>
  )
}
