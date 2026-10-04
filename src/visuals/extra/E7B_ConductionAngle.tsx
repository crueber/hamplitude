import { useState } from 'react'
import { C, Controls, Choice, Diagram, Ln, Slider, T } from '../kit'

const RAD = Math.PI / 180
const cls = (b: number) => (b >= 100 ? 'A' : b > 0 ? 'AB' : b === 0 ? 'B' : 'C')
const angleOf = (b: number) => (b >= 100 ? 360 : Math.round(180 + 2 * Math.asin(b / 100) / RAD))
const out = (v: number) => Math.min(2, Math.max(0, v))

/** Bias sets where on the transfer curve a sine input rides. That sets how long the device conducts. */
export function ConductionAngle() {
  const [bias, setBias] = useState(50)
  const vb = bias / 100
  const ang = angleOf(bias)
  const k = cls(bias)
  // left panel: transfer curve
  const lx = (v: number) => 34 + (v + 1.6) * 63
  const ly = (i: number) => 230 - i * 80
  const curve = `${lx(-1.6)},${ly(0)} ${lx(0)},${ly(0)} ${lx(2)},${ly(2)} ${lx(2.4)},${ly(2)}`
  // swing bar: split into cutoff part and conducting part
  const s0 = vb - 1, s1 = vb + 1
  // right panel: output current over two cycles
  const rx = (deg: number) => 350 + (deg / 720) * 270
  const pts: string[] = []
  for (let d = 0; d <= 720; d += 4) pts.push(`${rx(d)},${ly(out(vb + Math.sin(d * RAD)))}`)
  const area = `${rx(0)},${ly(0)} ${pts.join(' ')} ${rx(720)},${ly(0)}`
  const eff = 0.08 + 0.92 * ((360 - ang) / 270)
  const lin = 1 - 0.9 * ((360 - ang) / 270)
  const col = k === 'C' ? C.bad : k === 'B' ? C.resist : k === 'AB' ? C.power : C.good
  return (
    <>
      <Diagram w={640} h={382} title={`Class ${k}: with bias ${vb.toFixed(2)} the device conducts for ${ang} of every 360 degrees. Smaller conduction angle means higher efficiency and lower linearity.`}
        caption="Slide the bias down: the device conducts for less of the cycle. Efficiency rises, linearity falls.">
        <T x={168} y={18} anchor="middle" bold size={13}>Input swings on the transfer curve</T>
        <T x={485} y={18} anchor="middle" bold size={13}>Output current, two cycles</T>
        <rect x={20} y={32} width={300} height={236} rx={10} fill={C.fill} />
        <rect x={334} y={32} width={290} height={236} rx={10} fill={C.fill} />
        {/* transfer curve */}
        <Ln x1={lx(-1.6)} y1={ly(0)} x2={lx(2.4)} y2={ly(0)} color={C.muted} width={1.5} />
        <Ln x1={lx(0)} y1={ly(0) + 4} x2={lx(0)} y2={ly(2.2)} color={C.fill2} width={1.5} dash="4 4" />
        <polyline points={curve} fill="none" stroke={C.ink} strokeWidth={3} strokeLinejoin="round" />
        <T x={lx(0) + 6} y={ly(0) + 13} size={12} color={C.muted}>cutoff</T>
        <T x={lx(2) - 4} y={ly(2) - 12} anchor="end" size={12} color={C.muted}>saturation</T>
        <circle cx={lx(vb)} cy={ly(out(vb))} r={7} fill={col} stroke={C.bg} strokeWidth={2} />
        <T x={lx(vb)} y={ly(out(vb)) - 18} anchor="middle" size={12} bold color={col}>bias point</T>
        {/* swing bar */}
        <Ln x1={lx(s0)} y1={256} x2={lx(Math.min(0, s1))} y2={256} color={C.muted} width={4} dash="2 6" opacity={s0 < 0 ? 1 : 0} />
        <Ln x1={lx(Math.max(0, s0))} y1={256} x2={lx(Math.min(2, s1))} y2={256} color={C.signal} width={4} />
        <T x={168} y={282} anchor="middle" size={12} color={C.muted}>input swing: solid = device on, dotted = cut off</T>
        {/* output waveform */}
        <Ln x1={rx(0)} y1={ly(0)} x2={rx(720)} y2={ly(0)} color={C.muted} width={1.5} />
        <polygon points={area} fill={col} opacity={0.2} />
        <polyline points={pts.join(' ')} fill="none" stroke={col} strokeWidth={3.5} strokeLinejoin="round" />
        <T x={rx(0)} y={ly(0) + 16} size={12} color={C.muted}>0 current</T>
        <T x={rx(720)} y={ly(0) + 16} anchor="end" size={12} color={C.muted}>2 cycles</T>
        <T x={485} y={282} anchor="middle" size={12} color={C.muted}>flat at zero = device not conducting</T>
        {/* readout */}
        <T x={320} y={308} anchor="middle" bold size={17} color={col}>{`Class ${k}: conducts ${ang}° of each 360°`}</T>
        <T x={22} y={342} size={13} bold>Efficiency</T>
        <rect x={110} y={333} width={200} height={18} rx={9} fill={C.fill2} />
        <rect x={110} y={333} width={200 * eff} height={18} rx={9} fill={C.power} />
        <T x={342} y={342} size={13} bold>Linearity</T>
        <rect x={420} y={333} width={200} height={18} rx={9} fill={C.fill2} />
        <rect x={420} y={333} width={200 * lin} height={18} rx={9} fill={C.signal} />
        <T x={320} y={368} anchor="middle" size={12} color={C.muted}>bars sketch the trend only, not measured values</T>
      </Diagram>
      <Controls>
        <Choice label="Class" value={k} onChange={(c) => setBias(c === 'A' ? 100 : c === 'AB' ? 50 : c === 'B' ? 0 : -50)}
          options={[{ value: 'A', label: 'Class A' }, { value: 'AB', label: 'Class AB' }, { value: 'B', label: 'Class B' }, { value: 'C', label: 'Class C' }]} />
        <Slider label="Bias (where the input rides)" value={bias} min={-60} max={100} step={5} onChange={setBias} format={(v) => (v >= 100 ? 'mid (A)' : v > 0 ? 'low' : v === 0 ? 'at cutoff' : 'below cutoff')} color={col} />
      </Controls>
    </>
  )
}
