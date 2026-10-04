import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T, TAU, si } from '../kit'

/** XL rises, XC falls; they cross at the resonant frequency f0 = 1 / (2π√(LC)). */
export function E5A_ResonantFreq() {
  const [L, setL] = useState(50) // µH
  const [Cp, setC] = useState(40) // pF
  const l = L * 1e-6, c = Cp * 1e-12
  const f0 = 1 / (TAU * Math.sqrt(l * c))
  const x0 = Math.sqrt(l / c)
  const preset = L === 50 && Cp === 40 ? 'a' : L === 50 && Cp === 10 ? 'b' : 'x'

  const PX = 70, PW = 540, PT = 24, PH = 220, PB = PT + PH
  const xr = (r: number) => PX + (r / 2) * PW
  const yv = (v: number) => PB - (Math.min(v, 2 * x0) / (2 * x0)) * PH
  const xlPts = [0, 2].map((r) => `${xr(r)},${yv(r * x0)}`).join(' ')
  const xc: string[] = []
  for (let r = 0.5; r <= 2.0001; r += 0.025) xc.push(`${xr(r).toFixed(1)},${yv(x0 / r).toFixed(1)}`)

  return (
    <>
      <Diagram w={640} h={296} title={`Inductive reactance rises and capacitive reactance falls with frequency. They are equal at the resonant frequency, ${si(f0, 'Hz')}, where each is ${si(x0, 'Ω')}.`}
        caption="Where the two lines cross, XL = XC. That frequency is the resonant frequency.">
        <Ln x1={PX} y1={PB} x2={PX + PW} y2={PB} color={C.muted} />
        <Ln x1={PX} y1={PT} x2={PX} y2={PB} color={C.muted} />
        <Ln x1={xr(1)} y1={PT} x2={xr(1)} y2={PB} color={C.fill2} dash="5 5" width={1.5} />
        <polyline points={xlPts} fill="none" stroke={C.signal} strokeWidth={3} strokeLinecap="round" />
        <polyline points={xc.join(' ')} fill="none" stroke={C.power} strokeWidth={3} strokeLinecap="round" />
        <circle cx={xr(1)} cy={yv(x0)} r={6} fill={C.bg} stroke={C.ink} strokeWidth={2.5} />
        <T x={xr(1.115)} y={yv(0.62 * x0)} anchor="middle" size={13} bold>XL = XC = {si(x0, 'Ω', 3)}</T>
        <T x={xr(1.7)} y={yv(1.7 * x0) - 22} anchor="end" bold color={C.signal} size={14}>XL = 2πfL</T>
        <T x={xr(0.6)} y={yv(1.93 * x0)} bold color={C.power} size={14}>XC = 1 ÷ 2πfC</T>
        {[0, 0.5, 1, 1.5, 2].map((r) => (
          <T key={r} x={xr(r)} y={PB + 18} anchor={r === 2 ? 'end' : r === 0 ? 'start' : 'middle'} size={12} color={r === 1 ? C.ink : C.muted} bold={r === 1}>{r === 0 ? '0' : si(f0 * r, 'Hz', 3)}</T>
        ))}
        <T x={PX - 8} y={PB} anchor="end" size={12} color={C.muted}>0</T>
        <T x={PX - 8} y={yv(x0)} anchor="end" size={12} color={C.muted}>{si(x0, 'Ω', 2)}</T>
        <T x={PX - 8} y={PT} anchor="end" size={12} color={C.muted}>{si(2 * x0, 'Ω', 2)}</T>
        <T x={PX} y={PB + 40} size={12} color={C.muted}>below f₀: capacitive (XC bigger)</T>
        <T x={PX + PW} y={PB + 40} anchor="end" size={12} color={C.muted}>above f₀: inductive (XL bigger)</T>
      </Diagram>
      <Controls>
        <Choice label="Examples" value={preset} onChange={(v) => { if (v === 'a') { setL(50); setC(40) } else if (v === 'b') { setL(50); setC(10) } }}
          options={[{ value: 'a', label: '50 µH, 40 pF' }, { value: 'b', label: '50 µH, 10 pF' }, { value: 'x', label: 'custom' }]} />
        <Slider label="Inductance (L)" value={L} min={1} max={100} onChange={setL} format={(v) => `${v} µH`} color="var(--d-signal)" />
        <Slider label="Capacitance (C)" value={Cp} min={5} max={200} onChange={setC} format={(v) => `${v} pF`} color="var(--d-power)" />
        <Readout label="f₀ = 1 ÷ (2π√(L×C))" value={si(f0, 'Hz', 3)} />
      </Controls>
    </>
  )
}
