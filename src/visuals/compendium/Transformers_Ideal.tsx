import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, fmt, si } from '../kit'

const VP = 120

/** An ideal transformer: turns ratio sets voltage, current runs the other way, and the load impedance is reflected by the ratio squared. */
export function Transformers_Ideal() {
  const [np, setNp] = useState(100)
  const [ns, setNs] = useState(10)
  const [r, setR] = useState(4)
  const vs = (VP * ns) / np
  const is = vs / r
  const p = vs * is
  const ip = p / VP
  const zin = r * (np / ns) ** 2
  const stripes = (n: number) => Math.max(1, Math.round(n / 10))
  const coil = (cx: number, n: number, color: string) => {
    const k = stripes(n), top = 96, bot = 204, step = (bot - top) / Math.max(k, 6)
    return Array.from({ length: k }, (_, i) => <ellipse key={i} cx={cx} cy={top + step * (i + 0.5) + ((bot - top) - step * k) / 2} rx={22} ry={Math.min(5, step * 0.45)} fill="none" stroke={color} strokeWidth={2.5} />)
  }
  return (
    <>
      <Diagram w={640} h={300}
        title={`Ideal transformer with ${np} primary turns and ${ns} secondary turns on ${VP} volts. Secondary voltage ${fmt(vs, 3)} volts, secondary current ${fmt(is, 3)} amps into ${r} ohms, primary current ${fmt(ip, 3)} amps. The source sees ${si(zin, 'Ω', 3)}.`}
        caption="Illustrative, ideal transformer; coil drawings are schematic. Voltage goes with the turns ratio, current goes the opposite way, and power in equals power out.">
        <rect x={190} y={70} width={260} height={160} rx={6} fill="none" stroke={C.muted} strokeWidth={14} />
        <rect x={232} y={96} width={176} height={108} rx={4} fill="none" stroke={C.signal} strokeWidth={2.5} strokeDasharray="7 5" />
        <Ln x1={300} y1={96} x2={330} y2={96} color={C.signal} width={2.5} arrow />
        <Ln x1={340} y1={204} x2={310} y2={204} color={C.signal} width={2.5} arrow />
        <T x={320} y={150} anchor="middle" size={12} bold color={C.signal}>changing</T>
        <T x={320} y={168} anchor="middle" size={12} bold color={C.signal}>magnetic flux</T>
        {coil(190, np, C.voltage)}
        {coil(450, ns, C.current)}
        <T x={20} y={52} size={14} bold color={C.voltage}>Primary</T>
        <T x={20} y={82} size={13} mono>{VP} V (source)</T>
        <T x={20} y={106} size={13} mono>{np} turns</T>
        <T x={20} y={130} size={13} mono>{fmt(ip, 3)} A</T>
        <T x={620} y={52} anchor="end" size={14} bold color={C.current}>Secondary</T>
        <T x={620} y={82} anchor="end" size={13} mono>{fmt(vs, 3)} V</T>
        <T x={620} y={106} anchor="end" size={13} mono>{ns} turns</T>
        <T x={620} y={130} anchor="end" size={13} mono>{fmt(is, 3)} A into {r} Ω</T>
        <T x={320} y={262} anchor="middle" size={13} color={C.muted}>power in = power out = {fmt(p, 3)} W</T>
        <T x={320} y={284} anchor="middle" size={13} bold color={C.power}>the source sees {r} Ω × ({np}÷{ns})² = {si(zin, 'Ω', 3)}</T>
      </Diagram>
      <Controls>
        <Slider label="Primary turns (Np)" value={np} min={10} max={200} step={10} onChange={setNp} format={(v) => `${v}`} color="var(--d-voltage)" />
        <Slider label="Secondary turns (Ns)" value={ns} min={10} max={200} step={10} onChange={setNs} format={(v) => `${v}`} color="var(--d-current)" />
        <Slider label="Load resistance" value={r} min={1} max={100} onChange={setR} format={(v) => `${v} Ω`} color="var(--d-resist)" />
        <Readout label="Secondary voltage" value={fmt(vs, 3)} unit=" V" color="var(--d-voltage)" />
        <Readout label="Impedance the source sees" value={si(zin, 'Ω', 3)} color="var(--d-power)" />
      </Controls>
    </>
  )
}
