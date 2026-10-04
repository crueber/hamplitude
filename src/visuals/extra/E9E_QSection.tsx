import { useState } from 'react'
import { C, Box, Choice, Controls, Diagram, Ln, Readout, Slider, T, fmt } from '../kit'

const ZL = 100, Z0 = 50
const IDEAL = Math.sqrt(ZL * Z0)
const OPTS = [50, 62, 75, 90]

/** Quarter-wave Q-section: Zin = Zq² ÷ ZL. Choose the section impedance that makes Zin = 50 Ω. */
export function QSection() {
  const [zq, setZq] = useState(75)
  const zin = (zq * zq) / ZL
  const gamma = Math.abs(zin - Z0) / (zin + Z0)
  const swr = (1 + gamma) / (1 - gamma)
  const good = swr < 1.02
  const sx = (v: number) => 60 + ((v - 40) / 70) * 520
  return (
    <>
      <Diagram w={640} h={300} title={`A quarter-wave section of ${fmt(zq, 3)} ohm line between a 100 ohm antenna and a 50 ohm line presents ${fmt(zin, 3)} ohms to the feed line, an SWR of ${fmt(swr, 3)} to 1`}
        caption="Quarter-wave section: Zq = √(Z feed point × Z line). Between 100 Ω and 50 Ω that is √5000 ≈ 70.7 Ω.">
        <Box x={14} y={34} w={112} h={64} label="50 Ω line" sub={`sees ${fmt(zin, 3)} Ω`} color={good ? C.good : C.resist} />
        <Ln x1={126} y1={66} x2={206} y2={66} color={C.ink} width={5} />
        <rect x={206} y={46} width={220} height={40} rx={6} fill={C.fill2} stroke={C.power} strokeWidth={3} />
        <T x={316} y={66} anchor="middle" size={14} bold color={C.power}>¼ λ section, {fmt(zq, 3)} Ω</T>
        <Ln x1={426} y1={66} x2={506} y2={66} color={C.ink} width={5} />
        <Box x={506} y={34} w={120} h={64} label="Antenna" sub="100 Ω" color={C.ink} />
        <T x={316} y={116} anchor="middle" size={13} color={C.muted} mono>Zin = Zq² ÷ Z load = {fmt(zq, 3)}² ÷ 100 = {fmt(zin, 3)} Ω</T>
        {/* scale */}
        <Ln x1={sx(40)} y1={206} x2={sx(110)} y2={206} color={C.muted} width={3} />
        {OPTS.map((v) => (
          <g key={v}>
            <Ln x1={sx(v)} y1={198} x2={sx(v)} y2={214} color={C.muted} width={2} />
            <T x={sx(v)} y={232} anchor="middle" size={12} color={C.muted}>{v}</T>
          </g>
        ))}
        <T x={sx(75)} y={256} anchor="middle" size={12} color={C.muted}>section impedance Zq (Ω)</T>
        <Ln x1={sx(IDEAL)} y1={172} x2={sx(IDEAL)} y2={206} color={C.good} width={3} />
        <T x={sx(IDEAL)} y={158} anchor="middle" size={13} bold color={C.good}>ideal 70.7</T>
        <circle cx={sx(zq)} cy={206} r={9} fill={good ? C.good : C.resist} stroke={C.bg} strokeWidth={3} />
      </Diagram>
      <Controls>
        <Slider label="Section impedance Zq" value={zq} min={40} max={110} step={0.5} onChange={setZq} format={(v) => `${fmt(v, 3)} Ω`} color="var(--d-power)" />
        <Readout label="Feed line sees" value={fmt(zin, 3)} unit="Ω" color="var(--d-resist)" />
        <Readout label="Reflection coefficient Γ" value={fmt(gamma, 2)} color="var(--d-bad)" />
        <Readout label="SWR" value={`${fmt(swr, 3)} : 1`} color={good ? 'var(--d-good)' : 'var(--d-power)'} />
      </Controls>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Common line impedances" value={OPTS.find((v) => v === zq) ?? -1} onChange={setZq} options={OPTS.map((v) => ({ value: v, label: `${v} Ω` }))} />
      </div>
    </>
  )
}
