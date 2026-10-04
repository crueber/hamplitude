import { useState } from 'react'
import { C, Capacitor, Choice, Controls, Diagram, Inductor, Ln, Readout, Slider, T, TAU, Wire, si } from '../kit'

type Kind = 'ind' | 'cap'
const LN = 1e-6 // nominal inductor, 1 µH
const CN = 100e-12 // nominal capacitor, 100 pF

/** Real parts have parasitics: the nominal reactance and the parasitic one combine to a self-resonance. */
export function E5D_Parasitics() {
  const [kind, setKind] = useState<Kind>('ind')
  const [cp, setCp] = useState(2) // pF inter-turn
  const [lp, setLp] = useState(10) // nH lead
  const ind = kind === 'ind'
  const Cpar = cp * 1e-12, Lpar = lp * 1e-9
  const fsr = ind ? 1 / (TAU * Math.sqrt(LN * Cpar)) : 1 / (TAU * Math.sqrt(CN * Lpar))
  const z = (f: number) => {
    const w = TAU * f
    if (ind) {
      const r = 2 // winding resistance
      // (r + jwL) / (1 - w²LC + j w r C)
      const nr = r, ni = w * LN
      const dr = 1 - w * w * LN * Cpar, di = w * r * Cpar
      return Math.hypot(nr, ni) / Math.hypot(dr, di)
    }
    return Math.hypot(0.3, w * Lpar - 1 / (w * CN))
  }
  const ideal = (f: number) => (ind ? TAU * f * LN : 1 / (TAU * f * CN))
  const PX = 66, PW = 330, PT = 24, PH = 220, PB = PT + PH
  const lf0 = 6, lf1 = 9 // 1 MHz .. 1 GHz
  const xf = (f: number) => PX + ((Math.log10(f) - lf0) / (lf1 - lf0)) * PW
  const yz = (v: number) => PB - ((Math.log10(Math.min(Math.max(v, 0.1), 1e6)) + 1) / 7) * PH
  const mk = (fn: (f: number) => number) => {
    const p: string[] = []
    for (let i = 0; i <= 300; i++) { const f = 10 ** (lf0 + ((lf1 - lf0) * i) / 300); p.push(`${xf(f).toFixed(1)},${yz(fn(f)).toFixed(1)}`) }
    return p.join(' ')
  }
  const sx = xf(fsr)
  return (
    <>
      <Diagram w={640} h={310} title={ind ? `A real 1 microhenry inductor has a little capacitance between turns. Together they self-resonate at ${si(fsr, 'Hz')}, above which it behaves like a capacitor.` : `A real 100 picofarad capacitor has lead inductance. Together they self-resonate at ${si(fsr, 'Hz')}, above which it behaves like an inductor.`}
        caption="Dashed: the ideal part. Solid: the real part, parasitics included. Values are illustrative.">
        <Ln x1={PX} y1={PB} x2={PX + PW} y2={PB} color={C.muted} />
        <Ln x1={PX} y1={PT} x2={PX} y2={PB} color={C.muted} />
        {[0.1, 1, 10, 100, 1e3, 1e4, 1e5, 1e6].map((v) => <Ln key={v} x1={PX} y1={yz(v)} x2={PX + PW} y2={yz(v)} color={C.fill2} width={1} />)}
        {[['1 Ω', 1], ['100 Ω', 100], ['10 kΩ', 1e4], ['1 MΩ', 1e6]].map(([l, v]) => <T key={l as string} x={PX - 6} y={yz(v as number)} anchor="end" size={12} color={C.muted}>{l}</T>)}
        {[['1 MHz', 1e6], ['10 MHz', 1e7], ['100 MHz', 1e8], ['1 GHz', 1e9]].map(([l, f], i) => (
          <T key={l as string} x={xf(f as number)} y={PB + 16} anchor={i === 3 ? 'end' : i === 0 ? 'start' : 'middle'} size={12} color={C.muted}>{l}</T>
        ))}
        <Ln x1={sx} y1={PT} x2={sx} y2={PB} color={C.fill2} dash="5 5" width={1.5} />
        <polyline points={mk(ideal)} fill="none" stroke={C.muted} strokeWidth={2} strokeDasharray="6 5" />
        <polyline points={mk(z)} fill="none" stroke={ind ? C.signal : C.power} strokeWidth={3} strokeLinejoin="round" />
        <T x={PX + 4} y={PT - 10} size={12} color={C.muted}>|impedance|</T>
        <T x={PX + PW} y={PB + 38} anchor="end" size={12.5} bold>{ind ? 'Above self-resonance it acts like a capacitor' : 'Above self-resonance it acts like an inductor'}</T>

        {/* equivalent circuit */}
        <T x={520} y={30} anchor="middle" bold size={14}>Equivalent circuit</T>
        {ind ? (
          <g>
            <Wire pts={[[450, 120], [450, 80], [480, 80]]} /><Wire pts={[[560, 80], [590, 80], [590, 120]]} />
            <Wire pts={[[450, 120], [450, 170], [480, 170]]} /><Wire pts={[[560, 170], [590, 170], [590, 120]]} />
            <Inductor x={520} y={80} len={80} color={C.signal} label="L" labelPos="above" />
            <Capacitor x={520} y={170} len={80} color={C.power} label="parasitic C" labelPos="below" />
            <T x={520} y={125} anchor="middle" size={12.5} color={C.muted}>between turns</T>
          </g>
        ) : (
          <g>
            <Wire pts={[[440, 110], [460, 110]]} /><Wire pts={[[540, 110], [555, 110]]} /><Wire pts={[[615, 110], [630, 110]]} />
            <Capacitor x={500} y={110} len={80} color={C.power} label="C" labelPos="above" />
            <Inductor x={585} y={110} len={60} color={C.signal} label="lead L" labelPos="above" />
            <T x={520} y={160} anchor="middle" size={12.5} color={C.muted}>lead wire adds inductance</T>
          </g>
        )}
        <T x={520} y={230} anchor="middle" size={12.5} color={C.muted}>nominal + parasitic reactance</T>
        <T x={520} y={250} anchor="middle" size={12.5} color={C.muted}>→ self-resonance</T>
      </Diagram>
      <Controls>
        <Choice label="Part" value={kind} onChange={setKind} options={[{ value: 'ind', label: 'Inductor, 1 µH' }, { value: 'cap', label: 'Capacitor, 100 pF' }]} />
        {ind
          ? <Slider label="Capacitance between turns" value={cp} min={0.5} max={10} step={0.5} onChange={setCp} format={(v) => `${v} pF`} color="var(--d-power)" />
          : <Slider label="Lead inductance" value={lp} min={1} max={50} onChange={setLp} format={(v) => `${v} nH`} color="var(--d-signal)" />}
        <Readout label="Self-resonant frequency" value={si(fsr, 'Hz', 3)} />
      </Controls>
    </>
  )
}
