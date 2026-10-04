import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T, fmt, si } from '../kit'

const E0 = 8.8541878128e-12 // F/m, permittivity of free space
const DIELECTRICS = [
  { value: 0, name: 'Air', er: 1 },
  { value: 1, name: 'PTFE', er: 2.1 },
  { value: 2, name: 'Mica', er: 6 },
  { value: 3, name: 'High-k ceramic', er: 2000 },
]

/** Parallel-plate capacitor: C = e0 x er x A / d. Area, gap and dielectric all set the capacitance. */
export function Capacitance_Plates() {
  const [area, setArea] = useState(50) // cm^2
  const [gap, setGap] = useState(1) // mm
  const [k, setK] = useState(0)
  const di = DIELECTRICS[k]
  const cap = (E0 * di.er * (area * 1e-4)) / (gap * 1e-3)
  const cx = 205, cy = 150
  const wpx = Math.round(36 * Math.sqrt(area))
  const gpx = Math.round(10 + gap * 14)
  const x0 = cx - wpx / 2
  const top = cy - gpx / 2, bot = cy + gpx / 2
  const nLines = Math.max(3, Math.floor(wpx / 36))
  const lineXs = Array.from({ length: nLines }, (_, i) => x0 + ((i + 0.5) * wpx) / nLines)
  return (
    <>
      <Diagram w={640} h={300}
        title={`Parallel-plate capacitor with ${area} square centimetre plates ${fmt(gap)} millimetres apart and ${di.name} between them: ${si(cap, 'F')}`}
        caption="Typical dielectric constants. Bigger plates, closer plates or a better dielectric all raise the capacitance.">
        {di.er > 1 && <rect x={x0} y={top} width={wpx} height={gpx} fill={C.fill2} opacity={0.8} />}
        <rect x={x0} y={top - 12} width={wpx} height={12} rx={2} fill={C.ink} />
        <rect x={x0} y={bot} width={wpx} height={12} rx={2} fill={C.ink} />
        {lineXs.map((x) => <Ln key={x} x1={x} y1={top + 5} x2={x} y2={bot - 5} color={C.voltage} width={2.5} arrow />)}
        {lineXs.map((x) => <T key={'p' + x} x={x} y={top - 26} anchor="middle" bold size={16} color={C.voltage}>+</T>)}
        {lineXs.map((x) => <T key={'m' + x} x={x} y={bot + 28} anchor="middle" bold size={18} color={C.muted}>−</T>)}
        <Ln x1={x0 - 10} y1={top} x2={x0 - 10} y2={bot} color={C.resist} width={2} arrow="both" />
        <T x={x0 - 20} y={cy} anchor="end" size={13} bold color={C.resist}>gap d</T>
        <Ln x1={x0} y1={cy + 98} x2={x0 + wpx} y2={cy + 98} color={C.power} width={2} arrow="both" />
        <T x={cx} y={cy + 116} anchor="middle" size={13} bold color={C.power}>plate area A</T>
        <T x={420} y={52} size={13} color={C.muted}>C = ε₀ × εr × A ÷ d</T>
        <T x={420} y={82} size={13} mono>ε₀ = 8.854 pF/m</T>
        <T x={420} y={106} size={13} mono>εr = {di.er} ({di.name.toLowerCase()})</T>
        <T x={420} y={130} size={13} mono>A = {area} cm²</T>
        <T x={420} y={154} size={13} mono>d = {fmt(gap)} mm</T>
        <T x={420} y={200} size={13} color={C.muted}>capacitance</T>
        <T x={420} y={230} size={26} bold color={C.voltage}>{si(cap, 'F', 3)}</T>
      </Diagram>
      <Controls>
        <Slider label="Plate area (A)" value={area} min={5} max={100} step={5} onChange={setArea} format={(v) => `${v} cm²`} color="var(--d-power)" />
        <Slider label="Gap between plates (d)" value={gap} min={0.2} max={5} step={0.1} onChange={setGap} format={(v) => `${fmt(v)} mm`} color="var(--d-resist)" />
        <Choice label="Dielectric" value={k} onChange={setK} options={DIELECTRICS.map((d) => ({ value: d.value, label: d.name }))} />
        <Readout label="Capacitance" value={si(cap, 'F', 3)} color="var(--d-voltage)" />
      </Controls>
    </>
  )
}
