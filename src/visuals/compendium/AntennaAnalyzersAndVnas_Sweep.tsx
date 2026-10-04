import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

const R0 = 55 // feed-point resistance at resonance (ohms), illustrative
const XS = 4000 // reactance slope: sets the SWR bandwidth (illustrative)
const F_LO = 6.8, F_HI = 7.5

const swrAt = (f: number, f0: number) => {
  const x = XS * (f / f0 - f0 / f) * 0.5
  const g = Math.hypot(R0 - 50, x) / Math.hypot(R0 + 50, x)
  return (1 + g) / (1 - g)
}

/** What an antenna analyzer plots: SWR across frequency. Trim the wire and the whole dip slides along the band. */
export function AntennaAnalyzersAndVnas_Sweep() {
  const [f0, setF0] = useState(7.05)
  const x0 = 60, x1 = 616, yTop = 24, yBot = 224
  const X = (f: number) => x0 + ((f - F_LO) / (F_HI - F_LO)) * (x1 - x0)
  const Y = (s: number) => yBot - ((Math.min(s, 5) - 1) / 4) * (yBot - yTop)
  const pts: string[] = []
  let lo = Infinity, hi = -Infinity
  for (let i = 0; i <= 560; i++) {
    const f = F_LO + ((F_HI - F_LO) * i) / 560
    const s = swrAt(f, f0)
    if (s <= 2) { lo = Math.min(lo, f); hi = Math.max(hi, f) }
    pts.push(`${i ? 'L' : 'M'}${(x0 + ((x1 - x0) * i) / 560).toFixed(1)},${Y(s).toFixed(1)}`)
  }
  const bw = hi > lo ? (hi - lo) * 1000 : 0
  const s71 = swrAt(7.1, f0)
  const minSwr = swrAt(f0, f0)
  return (
    <>
      <Diagram w={640} h={290}
        title={`SWR plotted across 6.8 to 7.5 megahertz for a dipole that resonates at ${f0.toFixed(2)} megahertz. The lowest SWR is ${minSwr.toFixed(2)} at the resonant frequency, and the SWR is below 2 over about ${bw.toFixed(0)} kilohertz.`}
        caption="Illustrative 40 m dipole. Shorten the wire and the dip moves up in frequency; lengthen it and it moves down.">
        <rect x={X(7.0)} y={yTop} width={X(7.3) - X(7.0)} height={yBot - yTop} fill={C.signal} opacity={0.1} />
        <T x={(X(7.0) + X(7.3)) / 2} y={yTop + 12} anchor="middle" size={12.5} bold color={C.signal}>40 m band</T>
        {[1, 1.5, 2, 3, 5].map((s) => (
          <g key={s}>
            <Ln x1={x0} y1={Y(s)} x2={x1} y2={Y(s)} color={s === 2 ? C.resist : C.fill2} width={s === 2 ? 1.5 : 1} dash={s === 2 ? '5 4' : undefined} />
            <T x={x0 - 8} y={Y(s)} anchor="end" size={12} color={s === 2 ? C.resist : C.muted}>{s}:1</T>
          </g>
        ))}
        {[6.8, 7.0, 7.1, 7.2, 7.3, 7.5].map((f) => (
          <g key={f}>
            <Ln x1={X(f)} y1={yBot} x2={X(f)} y2={yBot + 5} color={C.muted} width={1.5} />
            <T x={X(f)} y={yBot + 17} anchor="middle" size={12} color={C.muted}>{f.toFixed(1)}</T>
          </g>
        ))}
        <path d={pts.join('')} fill="none" stroke={C.power} strokeWidth={3} strokeLinejoin="round" />
        <Ln x1={X(f0)} y1={Y(minSwr)} x2={X(f0)} y2={yBot} color={C.power} width={1.5} dash="3 3" />
        <circle cx={X(f0)} cy={Y(minSwr)} r={5} fill={C.power} stroke={C.bg} strokeWidth={2} />
        <T x={x1} y={yBot + 36} anchor="end" size={12.5} color={C.muted}>frequency (MHz) →</T>
        <T x={x0} y={yBot + 36} size={12.5} bold color={C.power}>{`resonance ${f0.toFixed(2)} MHz, SWR ${minSwr.toFixed(2)}`}</T>
        <T x={x0} y={12} size={12} color={C.muted}>SWR (capped at 5:1)</T>
      </Diagram>
      <Controls>
        <Slider label="Dipole resonant frequency (its length)" value={f0} min={6.9} max={7.4} step={0.01} onChange={setF0} format={(v) => `${v.toFixed(2)} MHz`} color="var(--d-power)" />
        <Readout label="SWR at 7.100 MHz" value={s71.toFixed(2)} unit=" : 1" color="var(--d-power)" />
        <Readout label="Below 2:1 over" value={bw.toFixed(0)} unit=" kHz" color="var(--d-good)" />
      </Controls>
    </>
  )
}
