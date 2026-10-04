import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, fmt } from '../kit'

const R0 = 73 // illustrative radiation resistance of a half-wave dipole, ohms
const Q = 6 // illustrative: gives roughly +/-88 ohm of reactance at +/-10 % off resonance
const Z0 = 50

/**
 * Impedance at a dipole's feed point as frequency moves through resonance (illustrative series-RLC model:
 * constant R = 73 ohms, reactance X = 2 Q R (f - f0) / f0). SWR is then computed on a 50 ohm line.
 */
export function ImpedanceAndRadiationResistance_Sweep() {
  const [p, setP] = useState(-4) // percent away from resonance
  const d = p / 100
  const X = 2 * Q * R0 * d
  // reflection coefficient magnitude for Z = R0 + jX on Z0
  const gn = Math.hypot(R0 - Z0, X)
  const gd = Math.hypot(R0 + Z0, X)
  const g = gn / gd
  const swr = (1 + g) / (1 - g)
  const x0 = 220, y0 = 150, kx = 16, ky = 0.8
  const xv = (pp: number) => x0 + pp * kx
  const yv = (ohm: number) => y0 - ohm * ky
  const xLine = `M${xv(-10)},${yv(2 * Q * R0 * -0.1)} L${xv(10)},${yv(2 * Q * R0 * 0.1)}`
  const state = Math.abs(p) < 0.25 ? 'resonant: X = 0' : p < 0 ? 'too short: capacitive' : 'too long: inductive'
  const sign = X < 0 ? '−' : '+'
  return (
    <>
      <Diagram w={640} h={300} title={`Feed point impedance of a half-wave dipole ${fmt(Math.abs(p), 2)} percent ${p < 0 ? 'below' : 'above'} resonance: about ${fmt(R0, 3)} ohms resistance and ${fmt(X, 3)} ohms reactance, an SWR of about ${fmt(swr, 3)} on a 50 ohm line`}
        caption="Resistance stays near 73 Ω; reactance swings from capacitive (negative) to inductive (positive) through zero at resonance. Illustrative model.">
        {/* plot */}
        <rect x={xv(-10)} y={yv(120)} width={xv(10) - xv(-10)} height={yv(-120) - yv(120)} fill="none" stroke={C.fill2} strokeWidth={1.5} />
        <Ln x1={xv(-10)} y1={yv(0)} x2={xv(10)} y2={yv(0)} color={C.muted} width={1.5} />
        <Ln x1={xv(0)} y1={yv(120)} x2={xv(0)} y2={yv(-120)} color={C.fill2} width={1.5} dash="4 4" />
        {[-100, 100].map((v) => <T key={v} x={xv(-10) - 8} y={yv(v)} size={12} anchor="end" color={C.muted}>{v > 0 ? '+' : '−'}100</T>)}
        <T x={xv(-10) - 8} y={yv(0)} size={12} anchor="end" color={C.muted}>0 Ω</T>
        <Ln x1={xv(-10)} y1={yv(R0)} x2={xv(10)} y2={yv(R0)} color={C.resist} width={3.5} />
        <path d={xLine} stroke={C.signal} strokeWidth={3.5} fill="none" strokeLinecap="round" />
        {/* cursor */}
        <Ln x1={xv(p)} y1={yv(120)} x2={xv(p)} y2={yv(-120)} color={C.power} width={2} />
        <circle cx={xv(p)} cy={yv(R0)} r={5.5} fill={C.resist} stroke={C.bg} strokeWidth={1.5} />
        <circle cx={xv(p)} cy={yv(X)} r={5.5} fill={C.signal} stroke={C.bg} strokeWidth={1.5} />
        <rect x={xv(-10) + 4} y={yv(R0) - 24} width={176} height={20} rx={4} fill={C.bg} fillOpacity={0.9} />
        <T x={xv(-10) + 10} y={yv(R0) - 14} size={13} bold color={C.resist}>R: radiation resistance</T>
        <rect x={xv(10) - 100} y={yv(-64) - 11} width={96} height={22} rx={4} fill={C.bg} fillOpacity={0.9} />
        <T x={xv(10) - 8} y={yv(-64)} size={13} bold color={C.signal} anchor="end">X: reactance</T>
        <T x={xv(0)} y={yv(-120) + 22} size={12.5} anchor="middle" color={C.muted}>resonance</T>
        <T x={xv(-10)} y={yv(-120) + 22} size={12.5} color={C.muted}>lower frequency</T>
        <T x={xv(10)} y={yv(-120) + 22} size={12.5} color={C.muted} anchor="end">higher</T>
        <T x={xv(-10)} y={26} size={14} bold>Feed point impedance vs frequency</T>

        {/* readout */}
        <T x={428} y={74} size={13} color={C.muted}>feed point impedance</T>
        <T x={428} y={100} size={20} bold>{fmt(R0, 3)} {sign} j{fmt(Math.abs(X), 3)} Ω</T>
        <T x={428} y={130} size={13.5} bold color={Math.abs(p) < 0.25 ? C.good : C.resist}>{state}</T>
        <T x={428} y={176} size={13} color={C.muted}>SWR on a 50 Ω line</T>
        <T x={428} y={202} size={20} bold color={swr < 2 ? C.good : swr < 3 ? C.resist : C.bad}>{fmt(swr, 2)} : 1</T>
        <T x={428} y={232} size={12.5} color={C.muted}>best case 1.46 : 1, since</T>
        <T x={428} y={250} size={12.5} color={C.muted}>73 Ω is not 50 Ω</T>
      </Diagram>
      <Controls>
        <Slider label="Frequency relative to resonance" value={p} min={-10} max={10} step={0.5} onChange={setP} format={(v) => `${v > 0 ? '+' : v < 0 ? '−' : ''}${fmt(Math.abs(v), 2)}%`} color="var(--d-power)" />
        <Readout label="Reactance" value={`${sign}${fmt(Math.abs(X), 3)}`} unit=" Ω" color="var(--d-signal)" />
      </Controls>
    </>
  )
}
