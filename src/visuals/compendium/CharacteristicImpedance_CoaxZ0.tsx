import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T, fmt } from '../kit'

const PRESETS = [
  { id: 'pe50', label: '50 Ω, solid plastic', ratio: 3.5, er: 2.25 },
  { id: 'pe75', label: '75 Ω, solid plastic', ratio: 6.53, er: 2.25 },
  { id: 'air50', label: '50 Ω, air', ratio: 2.3, er: 1 },
]

/** Coax Z0 and velocity factor from the conductor diameter ratio and the insulator's dielectric constant. */
export function CharacteristicImpedance_CoaxZ0() {
  const [ratio, setRatio] = useState(3.5)
  const [er, setEr] = useState(2.25)
  const z0 = (138 / Math.sqrt(er)) * Math.log10(ratio)
  const vf = 1 / Math.sqrt(er)
  const R = 92, cx = 150, cy = 118
  const r = R / ratio
  const shade = Math.min(0.55, (er - 1) / 3)
  const sel = PRESETS.find((p) => Math.abs(p.ratio - ratio) < 0.01 && p.er === er)?.id ?? ''
  return (
    <>
      <Diagram w={640} h={262}
        title={`A coax whose shield inside diameter is ${fmt(ratio, 3)} times the centre conductor diameter, with an insulator of dielectric constant ${fmt(er, 3)}, has a characteristic impedance of about ${fmt(z0, 3)} ohms and a velocity factor of about ${fmt(vf, 2)}`}
        caption="Fatter centre conductor (lower D ÷ d) means lower Z0. More plastic (higher εr) lowers Z0 and slows the wave. Idealised formula.">
        <circle cx={cx} cy={cy} r={R + 6} fill={C.fill2} stroke={C.ink} strokeWidth={2} />
        <circle cx={cx} cy={cy} r={R} fill={C.fill} stroke={C.ink} strokeWidth={2} />
        <circle cx={cx} cy={cy} r={R} fill={C.signal} opacity={shade} />
        <circle cx={cx} cy={cy} r={Math.max(r, 2)} fill={C.resist} stroke={C.ink} strokeWidth={1.5} />
        <Ln x1={cx - R} y1={cy + R + 22} x2={cx + R} y2={cy + R + 22} color={C.muted} width={1.5} arrow="both" />
        <T x={cx} y={cy + R + 38} anchor="middle" size={12.5} color={C.muted}>D, shield inside diameter</T>
        <T x={cx + r + 8} y={cy - 6} size={12.5} bold color={C.resist}>d</T>
        <T x={340} y={50} size={13} color={C.muted}>Z0 ≈ (138 ÷ √εr) × log10( D ÷ d )</T>
        <T x={340} y={90} size={13} color={C.muted} mono>D ÷ d = {fmt(ratio, 3)}   εr = {fmt(er, 3)}</T>
        <T x={340} y={132} size={30} bold color={C.power}>{fmt(z0, 3)} Ω</T>
        <T x={340} y={172} size={14} bold color={C.signal}>velocity factor ≈ {fmt(vf, 2)}</T>
        <T x={340} y={196} size={12.5} color={C.muted}>= 1 ÷ √εr</T>
      </Diagram>
      <Controls>
        <Slider label="Diameter ratio D ÷ d" value={ratio} min={1.5} max={8} step={0.05} onChange={setRatio} format={(v) => fmt(v, 3)} color="var(--d-resist)" />
        <Slider label="Dielectric constant εr" value={er} min={1} max={3} step={0.05} onChange={setEr} format={(v) => fmt(v, 3)} color="var(--d-signal)" />
        <Readout label="Z0" value={fmt(z0, 3)} unit=" Ω" color="var(--d-power)" />
      </Controls>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Presets" value={sel} onChange={(id) => { const p = PRESETS.find((q) => q.id === id)!; setRatio(p.ratio); setEr(p.er) }} options={PRESETS.map((p) => ({ value: p.id, label: p.label }))} />
      </div>
    </>
  )
}
