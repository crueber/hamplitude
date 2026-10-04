import { useState } from 'react'
import { C, Choice, Controls, Diagram, Readout, Slider, T, fmt } from '../kit'

/** Approximate loss in dB per 100 ft at 100 MHz (typical published figures, rounded). */
const CABLES = [
  { n: 'RG-58', a100: 5.0 },
  { n: 'RG-8X', a100: 3.7 },
  { n: 'RG-213', a100: 2.0 },
  { n: 'LMR-400 / 9913 class', a100: 1.0 },
]
const FREQS = [7, 14, 28, 50, 146, 446]
const lossDb = (a100: number, f: number, ft: number) => a100 * Math.sqrt(f / 100) * (ft / 100)

/** Power delivered to the antenna from 100 W for four common 50 ohm coax types: loss grows roughly with the square root of frequency. */
export function CoaxComparison_Delivered() {
  const [f, setF] = useState(28)
  const [ft, setFt] = useState(100)
  const P = 100
  return (
    <>
      <Diagram w={640} h={250} title={`Power reaching the antenna from a 100 watt transmitter through ${ft} feet of coax at ${f} megahertz: ${CABLES.map((c) => `${c.n} ${fmt(P * 10 ** (-lossDb(c.a100, f, ft) / 10), 3)} watts`).join(', ')}. Estimates.`}
        caption="Estimated from rounded, typical loss figures and a square-root-of-frequency rule. Real cables vary: use the maker's data. Matched line (SWR 1:1) assumed.">
        <T x={14} y={18} size={13} bold color={C.muted}>100 W in, {ft} ft of cable, {f} MHz</T>
        {CABLES.map((c, i) => {
          const y = 36 + i * 50
          const dB = lossDb(c.a100, f, ft)
          const out = P * 10 ** (-dB / 10)
          const col = dB < 1 ? C.good : dB < 3 ? C.resist : C.bad
          const x0 = 190, W = 300
          return (
            <g key={c.n}>
              <T x={14} y={y + 18} size={13.5} bold>{c.n}</T>
              <rect x={x0} y={y + 4} width={W} height={28} rx={6} fill={C.fill} />
              <rect x={x0} y={y + 4} width={(W * out) / P} height={28} rx={6} fill={col} fillOpacity={0.85} />
              <T x={x0 + W + 12} y={y + 12} size={13.5} bold>{fmt(out, 3)} W</T>
              <T x={x0 + W + 12} y={y + 28} size={12} color={C.muted}>{fmt(dB, 2)} dB loss</T>
            </g>
          )
        })}
        <T x={14} y={238} size={12} color={C.muted}>Bar = power reaching the antenna. The empty part is lost as heat in the cable.</T>
      </Diagram>
      <Controls>
        <Choice label="Frequency" value={f} onChange={setF} options={FREQS.map((x) => ({ value: x, label: `${x} MHz` }))} />
        <Slider label="Cable length" value={ft} min={25} max={200} step={25} onChange={setFt} format={(v) => `${v} ft`} color="var(--d-signal)" />
        <Readout label="RG-213 loss" value={fmt(lossDb(2.0, f, ft), 2)} unit=" dB" />
      </Controls>
    </>
  )
}
