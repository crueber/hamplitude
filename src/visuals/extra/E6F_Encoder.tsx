import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

const SLOTS = 12

/** Optical shaft encoder: a patterned wheel interrupts a light beam; the detector output is a pulse train. */
export function Encoder() {
  const [deg, setDeg] = useState(20)
  const step = 360 / SLOTS
  const phase = ((deg % step) + step) % step
  const open = phase < step / 2
  const pulses = Math.floor(deg / step) + (open ? 1 : 0)
  const cx = 150, cy = 150, R = 100
  const x0 = 330, x1 = 620, yHi = 80, yLo = 130
  const wx = (d: number) => x0 + (d / 360) * (x1 - x0)
  let wave = `M${wx(0)},${yLo}`
  for (let k = 0; k < SLOTS; k++) {
    const a = k * step, b = a + step / 2, c = a + step
    wave += ` L${wx(a)},${yHi} L${wx(b)},${yHi} L${wx(b)},${yLo} L${wx(c)},${yLo}`
  }
  return (
    <>
      <Diagram w={640} h={280}
        title={`An optical shaft encoder: a wheel with ${SLOTS} slots rotates between a light source and a detector. At ${deg} degrees the beam is ${open ? 'passing through a slot, so the output is high' : 'blocked by the wheel, so the output is low'}. ${pulses} pulses counted.`}
        caption="Slots interrupt a light beam; counting the pulses measures rotation.">
        <circle cx={cx} cy={cy} r={R} fill={C.fill2} stroke={C.ink} strokeWidth={2.5} />
        {Array.from({ length: SLOTS }).map((_, k) => {
          const a0 = ((k * step - deg - 90) * Math.PI) / 180
          const a1 = (((k * step + step / 2) - deg - 90) * Math.PI) / 180
          const r0 = 62, r1 = 92
          const p = (r: number, a: number) => `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`
          return <path key={k} d={`M${p(r0, a0)} L${p(r1, a0)} A${r1},${r1} 0 0 1 ${p(r1, a1)} L${p(r0, a1)} A${r0},${r0} 0 0 0 ${p(r0, a0)} Z`} fill={C.bg} stroke={C.ink} strokeWidth={1.5} />
        })}
        <circle cx={cx} cy={cy} r={8} fill={C.ink} />
        <Ln x1={cx} y1={20} x2={cx} y2={open ? 92 : 54} color={C.resist} width={open ? 4 : 2} dash={open ? undefined : '3 4'} />
        <rect x={cx - 10} y={92} width={20} height={10} rx={2} fill={C.signal} stroke={C.ink} strokeWidth={1.5} />
        <T x={cx + 12} y={37} size={12} bold color={C.signal}>detector below</T>
        <rect x={cx - 14} y={6} width={28} height={14} rx={3} fill={C.resist} opacity={0.6} stroke={C.ink} strokeWidth={2} />
        <T x={cx + 22} y={13} size={12} bold color={C.resist}>light</T>
        <T x={cx} y={272} anchor="middle" size={13} bold color={C.muted}>patterned wheel on the shaft</T>

        <T x={475} y={34} anchor="middle" size={14} bold>Detector output</T>
        <path d={wave} fill="none" stroke={C.signal} strokeWidth={2.5} strokeLinejoin="round" />
        <Ln x1={wx(deg % 360)} y1={60} x2={wx(deg % 360)} y2={150} color={C.power} width={2} dash="4 3" />
        <circle cx={wx(deg % 360)} cy={open ? yHi : yLo} r={5} fill={C.power} />
        <T x={x0} y={170} size={12} color={C.muted}>0°</T>
        <T x={x1} y={170} anchor="end" size={12} color={C.muted}>360°</T>
        <T x={475} y={220} anchor="middle" size={15} bold color={open ? C.good : C.muted}>{open ? 'beam passes: output high' : 'beam blocked: output low'}</T>
        <T x={475} y={246} anchor="middle" size={13} color={C.muted}>counting pulses gives shaft rotation</T>
      </Diagram>
      <Controls>
        <Slider label="Shaft angle" value={deg} min={0} max={359} step={1} onChange={setDeg} format={(v) => `${v}°`} color={C.power} />
        <Readout label="Pulses counted" value={pulses} color={C.signal} />
      </Controls>
    </>
  )
}
