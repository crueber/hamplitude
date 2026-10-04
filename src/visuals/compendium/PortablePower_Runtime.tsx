import { useState } from 'react'
import { C, Choice, Controls, Diagram, Readout, Slider, T } from '../kit'

// Illustrative radio classes (typical order of magnitude, not a specific product)
const RADIOS = {
  qrp: { label: '5 W', rx: 0.3, tx: 1.5 },
  mid: { label: '20 W', rx: 0.6, tx: 5 },
  hf: { label: '100 W', rx: 1.0, tx: 20 },
} as const
type Radio = keyof typeof RADIOS
// Illustrative usable fractions of rated capacity
const CHEM = { lead: { label: 'Lead-acid', use: 0.5 }, lfp: { label: 'Lithium iron phosphate', use: 0.8 } } as const
type Chem = keyof typeof CHEM

/** Runtime estimate: usable amp-hours divided by average current. Figures are illustrative, so the result is an estimate. */
export function PortablePower_Runtime() {
  const [radio, setRadio] = useState<Radio>('hf')
  const [chem, setChem] = useState<Chem>('lfp')
  const [ah, setAh] = useState(20)
  const [duty, setDuty] = useState(25)
  const R = RADIOS[radio]
  const use = CHEM[chem].use
  const avg = R.rx * (1 - duty / 100) + R.tx * (duty / 100)
  const usable = ah * use
  const hours = usable / avg
  const bw = 440
  return (
    <>
      <Diagram w={640} h={190}
        title={`A ${ah} amp-hour ${CHEM[chem].label} battery with about ${usable.toFixed(0)} usable amp-hours, feeding an average of ${avg.toFixed(1)} amperes, lasts about ${hours.toFixed(1)} hours`}
        caption="Estimate only. Currents are illustrative; check your own radio. Usable share depends on chemistry and battery condition.">
        <rect x={20} y={40} width={bw} height={60} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2.5} />
        <rect x={20 + bw} y={58} width={12} height={24} rx={3} fill={C.ink} />
        <rect x={24} y={44} width={(bw - 8) * use} height={52} rx={7} fill={C.good} opacity={0.85} />
        <rect x={24 + (bw - 8) * use} y={44} width={(bw - 8) * (1 - use)} height={52} rx={7} fill={C.muted} opacity={0.35} />
        <T x={24 + ((bw - 8) * use) / 2} y={70} anchor="middle" size={14} bold color={C.bg}>{`usable ${usable.toFixed(0)} Ah`}</T>
        <T x={24 + (bw - 8) * use + ((bw - 8) * (1 - use)) / 2} y={70} anchor="middle" size={12} bold>reserve</T>
        <T x={20} y={126} size={13} color={C.muted}>{`${ah} Ah rated`}</T>
        <T x={20} y={156} size={14} bold>{`${usable.toFixed(0)} Ah ÷ ${avg.toFixed(1)} A average = ${hours.toFixed(1)} hours (estimate)`}</T>
        <T x={500} y={64} size={13} bold color={C.current}>{`avg ${avg.toFixed(1)} A`}</T>
        <T x={500} y={84} size={12} color={C.muted}>{`RX ${R.rx} A, TX ${R.tx} A`}</T>
      </Diagram>
      <Controls>
        <Choice label="Radio output power" value={radio} onChange={setRadio} options={(Object.keys(RADIOS) as Radio[]).map((k) => ({ value: k, label: RADIOS[k].label }))} />
        <Choice label="Battery chemistry" value={chem} onChange={setChem} options={(Object.keys(CHEM) as Chem[]).map((k) => ({ value: k, label: CHEM[k].label }))} />
        <Slider label="Battery capacity" value={ah} min={5} max={100} step={5} onChange={setAh} format={(v) => `${v} Ah`} color="var(--d-current)" />
        <Slider label="Share of time transmitting" value={duty} min={5} max={50} step={5} onChange={setDuty} format={(v) => `${v} %`} color="var(--d-resist)" />
        <Readout label="Estimated runtime" value={hours.toFixed(1)} unit=" h" color="var(--d-good)" />
      </Controls>
    </>
  )
}
