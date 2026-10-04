import { useState } from 'react'
import { C, Choice, Diagram, Ln, T, si } from '../kit'

interface Row { name: string; note: string; ppm: number; color: string }
// Representative, illustrative figures only. Real parts vary widely.
const ROWS: Row[] = [
  { name: 'LC oscillator', note: 'coil and capacitor', ppm: 1000, color: C.resist },
  { name: 'Crystal oscillator', note: 'plain quartz crystal', ppm: 20, color: C.signal },
  { name: 'TCXO', note: 'temperature-compensated', ppm: 1, color: C.current },
  { name: 'OCXO', note: 'crystal kept in a heated oven', ppm: 0.05, color: C.power },
]

/** Representative frequency error of four oscillator types, converted to hertz at a chosen operating frequency. */
export function CrystalsAndResonators_Stability() {
  const [mhz, setMhz] = useState(14.2)
  const x0 = 230, x1 = 410, lo = -2, hi = 3.5
  const px = (ppm: number) => x0 + ((Math.log10(ppm) - lo) / (hi - lo)) * (x1 - x0)
  const y0 = 82, rh = 40
  const ticks = [0.01, 0.1, 1, 10, 100, 1000]
  return (
    <>
      <Diagram w={640} h={y0 + ROWS.length * rh + 30}
        title={`Representative frequency drift: about 1000 parts per million for an LC oscillator, 20 for a plain crystal oscillator, 1 for a TCXO and 0.05 for an OCXO. At ${mhz} megahertz that is ${si(1000 * mhz, 'Hz', 2)}, ${si(20 * mhz, 'Hz', 2)}, ${si(mhz, 'Hz', 2)} and ${si(0.05 * mhz, 'Hz', 2)}.`}
        caption="Representative figures for comparison, not specifications. Error in hertz = ppm × frequency in MHz.">
        <T x={20} y={22} size={14} bold>Oscillator type</T>
        <T x={x0} y={22} size={13} color={C.muted}>drift in parts per million (log scale)</T>
        <T x={470} y={22} size={14} bold>Error at {mhz} MHz</T>
        {ticks.map((t) => (
          <g key={t}>
            <Ln x1={px(t)} y1={y0 - 24} x2={px(t)} y2={y0 + ROWS.length * rh - 14} color={C.muted} width={1} dash="3 4" />
            <T x={px(t)} y={y0 + ROWS.length * rh + 4} anchor="middle" size={12} color={C.muted}>{t}</T>
          </g>
        ))}
        {ROWS.map((r, i) => {
          const y = y0 + i * rh
          return (
            <g key={r.name}>
              <T x={20} y={y} size={13} bold>{r.name}</T>
              <T x={20} y={y + 18} size={12} color={C.muted}>{r.note}</T>
              <circle cx={px(r.ppm)} cy={y + 6} r={9} fill={r.color} />
              <T x={470} y={y + 6} size={14} bold mono color={r.color}>{r.ppm * mhz < 1 ? `${(r.ppm * mhz).toFixed(2)} Hz` : si(r.ppm * mhz, "Hz", 2)}</T>
            </g>
          )
        })}
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Operating frequency" value={mhz} onChange={setMhz}
          options={[{ value: 7.1, label: '7.1 MHz' }, { value: 14.2, label: '14.2 MHz' }, { value: 50.1, label: '50.1 MHz' }, { value: 146, label: '146 MHz' }, { value: 446, label: '446 MHz' }]} />
      </div>
    </>
  )
}
