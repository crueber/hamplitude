import { useState } from 'react'
import { C, Capacitor, Controls, Diagram, Dot, Ground, Ln, Resistor, Slider, T, Wire, si } from '../kit'
import { OpAmpSymbol } from '../shared/OpAmpSymbol'

const CAPS = [0, 100e-12, 220e-12, 470e-12, 1e-9, 2.2e-9, 4.7e-9]
const RF = 10000, R1 = 1000
const G0 = 20 * Math.log10(RF / R1) // 20 dB
const X0 = 90, X1 = 620, YTOP = 252, YBOT = 380 // plot box: 100 Hz .. 1 MHz, 0..24 dB shown as 0..28
const fx = (f: number) => X0 + ((Math.log10(f) - 2) / 4) * (X1 - X0)
const gy = (db: number) => YBOT - (db / 28) * (YBOT - YTOP)

/** A capacitor across RF: at high frequency it shorts RF out, so gain falls. Low-pass. */
export function LowPass() {
  const [k, setK] = useState(4)
  const cap = CAPS[k]
  const fc = cap ? 1 / (2 * Math.PI * RF * cap) : Infinity
  const curve = (f: number) => (cap ? G0 - 10 * Math.log10(1 + (f / fc) ** 2) : G0)
  const pts: string[] = []
  for (let i = 0; i <= 120; i++) {
    const f = 10 ** (2 + (4 * i) / 120)
    if (curve(f) < 0) break
    pts.push(`${pts.length ? 'L' : 'M'}${fx(f).toFixed(1)},${gy(curve(f)).toFixed(1)}`)
  }
  return (
    <>
      <Diagram w={640} h={430}
        title={cap ? `Capacitor of ${si(cap, 'F', 2)} across the feedback resistor: gain stays at 20 dB at low frequency and falls above about ${si(fc, 'Hz', 2)}, a low-pass filter` : 'No capacitor: gain is flat at all frequencies shown'}
        caption="Higher frequency, lower capacitor reactance, smaller feedback resistance, less gain.">
        {/* mini circuit: R1, RF with C in parallel */}
        <g transform="translate(60,12)">
          <circle cx={12} cy={120} r={7} fill={C.bg} stroke={C.ink} strokeWidth={2.2} />
          <Wire pts={[[19, 120], [150, 120]]} />
          <Resistor x={85} y={120} len={70} label="R1" />
          <Dot x={150} y={120} />
          <Wire pts={[[150, 120], [150, 80]]} />
          <Wire pts={[[360, 80], [360, 140]]} />
          {cap > 0 && (
            <>
              <Wire pts={[[150, 80], [150, 34], [225, 34]]} />
              <Wire pts={[[285, 34], [360, 34], [360, 80]]} />
              <Capacitor x={255} y={34} len={60} color={C.signal} />
              <T x={255} y={6} anchor="middle" size={14} bold color={C.signal}>C = {si(cap, 'F', 2)}</T>
            </>
          )}
          <Wire pts={[[150, 80], [215, 80]]} />
          <Wire pts={[[295, 80], [360, 80]]} />
          <Resistor x={255} y={80} len={80} label="RF" labelPos="below" />
          <Dot x={150} y={80} />
          <Dot x={360} y={80} />
          <OpAmpSymbol x={180} y={140} w={150} h={80} />
          <Wire pts={[[150, 120], [180, 120]]} />
          <Wire pts={[[180, 160], [150, 160], [150, 172]]} />
          <Ground x={150} y={172} />
          <Wire pts={[[330, 140], [420, 140]]} />
          <Dot x={360} y={140} />
          <circle cx={427} cy={140} r={7} fill={C.bg} stroke={C.ink} strokeWidth={2.2} />
        </g>
        {/* plot */}
        <Ln x1={X0} y1={YBOT} x2={X1} y2={YBOT} color={C.muted} width={2} />
        <Ln x1={X0} y1={YTOP} x2={X0} y2={YBOT} color={C.muted} width={2} />
        {[2, 3, 4, 5, 6].map((e) => (
          <g key={e}>
            <Ln x1={fx(10 ** e)} y1={YBOT} x2={fx(10 ** e)} y2={YBOT + 6} color={C.muted} width={1.5} />
            <T x={fx(10 ** e)} y={YBOT + 20} anchor="middle" size={12} color={C.muted}>{si(10 ** e, 'Hz', 1).replace(' Hz', '').replace(' ', '')}</T>
          </g>
        ))}
        <T x={X1} y={YBOT + 38} anchor="end" size={12} color={C.muted}>frequency (Hz)</T>
        <T x={X0 - 8} y={gy(G0)} anchor="end" size={12} color={C.muted}>20 dB</T>
        <T x={X0 - 8} y={gy(0)} anchor="end" size={12} color={C.muted}>0 dB</T>
        <T x={X0 - 8} y={YTOP - 14} anchor="end" size={13} bold>gain</T>
        <Ln x1={X0} y1={gy(G0)} x2={X1} y2={gy(G0)} color={C.muted} width={1.5} dash="4 4" />
        <path d={pts.join('')} fill="none" stroke={C.signal} strokeWidth={3.5} strokeLinejoin="round" />
        {cap > 0 && fc < 1e6 && (
          <g>
            <Ln x1={fx(fc)} y1={gy(G0 - 3)} x2={fx(fc)} y2={YBOT} color={C.resist} width={2} dash="4 4" />
            <circle cx={fx(fc)} cy={gy(G0 - 3)} r={5} fill={C.resist} />
            <T x={fx(fc)} y={YTOP - 12} anchor="middle" size={13} bold color={C.resist}>corner (−3 dB): {si(fc, 'Hz', 2)}</T>
          </g>
        )}
        <T x={X0 + 6} y={YBOT - 36} size={13} bold color={C.signal}>{cap ? 'Low-pass:' : 'No capacitor:'}</T>
        <T x={X0 + 6} y={YBOT - 16} size={13} color={C.ink}>{cap ? 'lows pass, highs are cut' : 'flat response'}</T>
      </Diagram>
      <Controls>
        <Slider label="Capacitor across RF" value={k} min={0} max={CAPS.length - 1} onChange={setK} format={(v) => (CAPS[v] ? si(CAPS[v], 'F', 2) : 'none')} color="var(--d-signal)" />
      </Controls>
    </>
  )
}
