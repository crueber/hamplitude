import { useState } from 'react'
import { C, Controls, Diagram, Readout, Slider, T, Wire, Capacitor, Inductor, sinePath, si } from '../kit'

/** An LC tank sets the oscillator frequency: f = 1 / (2π√(LC)). */
export function LcTank() {
  const [lUh, setL] = useState(10)
  const [cPf, setC] = useState(100)
  const f = 1 / (2 * Math.PI * Math.sqrt(lUh * 1e-6 * cPf * 1e-12))
  const cycles = 1.5 + (4 * Math.log(f / 2.5e6)) / Math.log(20)
  const loop: [number, number][] = [[60, 60], [200, 60], [200, 190], [60, 190], [60, 60]]
  return (
    <>
      <Diagram w={640} h={250} title={`LC tank circuit with ${lUh} microhenries and ${cPf} picofarads. It sets an oscillator frequency of ${si(f, 'Hz')}.`}
        caption="The tank decides the frequency. More L or more C means a lower frequency.">
        <Wire pts={loop} color={C.muted} width={2.5} />
        <rect x={44} y={90} width={32} height={70} fill={C.bg} />
        <Capacitor x={60} y={125} rot={90} len={70} />
        <rect x={184} y={85} width={32} height={80} fill={C.bg} />
        <Inductor x={200} y={125} rot={90} len={80} />
        <T x={36} y={125} anchor="end" bold size={14}>C</T>
        <T x={228} y={125} bold size={14}>L</T>
        <T x={130} y={218} anchor="middle" size={13} color={C.muted}>tank circuit</T>
        <path d={sinePath(300, 610, 100, 38, cycles)} fill="none" stroke={C.signal} strokeWidth={3} />
        <T x={300} y={30} size={14} bold>Oscillator output (not to scale)</T>
        <T x={455} y={170} anchor="middle" size={20} bold color={C.signal}>{si(f, 'Hz')}</T>
        <T x={455} y={198} anchor="middle" size={13} mono color={C.muted}>f = 1 ÷ (2π√(L×C))</T>
      </Diagram>
      <Controls>
        <Slider label="Inductance L" value={lUh} min={1} max={20} step={1} onChange={setL} format={(v) => `${v} µH`} color={C.current} />
        <Slider label="Capacitance C" value={cPf} min={10} max={200} step={10} onChange={setC} format={(v) => `${v} pF`} color={C.voltage} />
        <Readout label="Frequency" value={(f / 1e6).toFixed(2)} unit="MHz" color={C.signal} />
      </Controls>
    </>
  )
}
