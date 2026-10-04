import { useState } from 'react'
import { C, Capacitor, Choice, Controls, Diagram, Dot, Ln, Readout, Resistor, Slider, T, Wire, si, TAU } from '../kit'

const R_VALS = [100, 220, 470, 1000, 2200, 4700, 10000]
const C_VALS = [10e-9, 22e-9, 47e-9, 100e-9, 220e-9, 470e-9, 1e-6]

/** The simplest filter: one resistor and one capacitor. Swap their places to swap low-pass for high-pass. */
export function Filters_RcSection() {
  const [kind, setKind] = useState<'lp' | 'hp'>('lp')
  const [ri, setRi] = useState(3)
  const [ci, setCi] = useState(3)
  const R = R_VALS[ri], Cv = C_VALS[ci]
  const fc = 1 / (TAU * R * Cv)
  const lp = kind === 'lp'

  const x0 = 366, x1 = 616, y0 = 70, y1 = 178
  const lo = 10, decades = 5
  const gx = (f: number) => x0 + ((Math.log10(f) - Math.log10(lo)) / decades) * (x1 - x0)
  const gy = (db: number) => y0 + (-db / 40) * (y1 - y0)
  const resp = (f: number) => {
    const r = f / fc
    const p = lp ? 1 / (1 + r * r) : (r * r) / (1 + r * r)
    return Math.max(-40, 10 * Math.log10(p))
  }
  const pts = Array.from({ length: 151 }, (_, k) => {
    const f = lo * Math.pow(10, (k / 150) * decades)
    return `${gx(f).toFixed(1)},${gy(resp(f)).toFixed(1)}`
  }).join(' ')
  const fcx = gx(fc)
  const ticks: [number, string][] = [[100, '100 Hz'], [1e3, '1 kHz'], [1e4, '10 kHz'], [1e5, '100 kHz']]
  const rLab = si(R, 'Ω', 2), cLab = si(Cv, 'F', 2)

  return (
    <>
      <Diagram w={640} h={262}
        title={`A first-order RC ${lp ? 'low-pass' : 'high-pass'} filter with ${rLab} and ${cLab}. Its cutoff frequency is ${si(fc, 'Hz', 3)}, where the output is 3 dB down. Beyond the cutoff it changes by 6 dB per octave.`}
        caption="Cutoff (the −3 dB point): fc = 1 ÷ (2π × R × C). One RC section changes 6 dB per octave.">
        <T x={20} y={26} size={14} bold>{lp ? 'Low-pass: R in line, C to ground' : 'High-pass: C in line, R to ground'}</T>
        <Wire pts={[[40, 80], [80, 80]]} />
        <Wire pts={[[160, 80], [316, 80]]} />
        <Wire pts={[[40, 186], [316, 186]]} />
        {lp ? (
          <>
            <Resistor x={120} y={80} len={80} label="R" value={rLab} color={C.resist} labelPos="below" />
            <Capacitor x={230} y={133} rot={90} len={58} label="C" value={cLab} color={C.signal} labelPos="below" />
          </>
        ) : (
          <>
            <Capacitor x={120} y={80} len={80} label="C" value={cLab} color={C.signal} labelPos="below" />
            <Resistor x={230} y={133} rot={90} len={70} label="R" value={rLab} color={C.resist} labelPos="below" />
          </>
        )}
        <Wire pts={[[230, 80], [230, lp ? 104 : 98]]} />
        <Wire pts={[[230, lp ? 162 : 168], [230, 186]]} />
        <Dot x={230} y={80} /><Dot x={230} y={186} />
        <circle cx={40} cy={80} r={4.5} fill={C.bg} stroke={C.ink} strokeWidth={2} />
        <circle cx={40} cy={186} r={4.5} fill={C.bg} stroke={C.ink} strokeWidth={2} />
        <circle cx={316} cy={80} r={4.5} fill={C.bg} stroke={C.ink} strokeWidth={2} />
        <circle cx={316} cy={186} r={4.5} fill={C.bg} stroke={C.ink} strokeWidth={2} />
        <T x={40} y={206} anchor="middle" size={12} bold color={C.muted}>in</T>
        <T x={316} y={206} anchor="middle" size={12} bold color={C.muted}>out</T>

        <T x={x0} y={50} size={14} bold color={C.signal}>Response</T>
        <Ln x1={x0} y1={y1} x2={x1} y2={y1} color={C.muted} width={1.5} />
        <Ln x1={x0} y1={y1} x2={x0} y2={y0 - 8} color={C.muted} width={1.5} />
        {[0, -20, -40].map((d) => <T key={d} x={x0 - 6} y={gy(d)} anchor="end" size={12} color={C.muted}>{d === 0 ? '0 dB' : `${d}`}</T>)}
        <line x1={x0} y1={gy(0)} x2={x1} y2={gy(0)} stroke={C.fill2} strokeWidth={2} strokeDasharray="4 5" />
        {ticks.map(([f, l]) => <g key={f}><line x1={gx(f)} y1={y1} x2={gx(f)} y2={y1 + 5} stroke={C.muted} strokeWidth={1.5} /><T x={gx(f)} y={y1 + 18} anchor="middle" size={12} color={C.muted}>{l}</T></g>)}
        <polyline points={pts} fill="none" stroke={C.signal} strokeWidth={3.2} strokeLinejoin="round" />
        <line x1={fcx} y1={gy(-3)} x2={fcx} y2={y1} stroke={C.power} strokeWidth={1.5} strokeDasharray="4 4" />
        <circle cx={fcx} cy={gy(-3)} r={6} fill={C.bg} stroke={C.power} strokeWidth={3} />
        <T x={Math.min(fcx + 10, x1 - 4)} y={gy(-3) - 16} anchor={fcx > x1 - 90 ? 'end' : 'start'} size={13} bold color={C.power}>{`fc ${si(fc, 'Hz', 3)}`}</T>
        <T x={320} y={242} anchor="middle" size={13} color={C.muted}>{lp ? 'Low frequencies pass; above fc the output falls 6 dB per octave.' : 'High frequencies pass; below fc the output falls 6 dB per octave.'}</T>
      </Diagram>
      <Controls>
        <Choice label="Filter type" value={kind} options={[{ value: 'lp', label: 'Low-pass' }, { value: 'hp', label: 'High-pass' }]} onChange={setKind} />
        <Slider label="Resistance" value={ri} min={0} max={R_VALS.length - 1} onChange={setRi} format={(i) => si(R_VALS[i], 'Ω', 2)} color={C.resist} />
        <Slider label="Capacitance" value={ci} min={0} max={C_VALS.length - 1} onChange={setCi} format={(i) => si(C_VALS[i], 'F', 2)} color={C.signal} />
        <Readout label="Cutoff frequency" value={si(fc, 'Hz', 3)} color={C.power} />
      </Controls>
    </>
  )
}
