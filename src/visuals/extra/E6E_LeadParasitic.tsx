import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T, fmt } from '../kit'

/** Every millimetre of lead is a little inductor (rule of thumb: about 1 nH per mm). Its reactance X = 2πfL grows with frequency. */
export function LeadParasitic() {
  const [mm, setMm] = useState(10)
  const [mhz, setMhz] = useState(450)
  const nh = mm * 1 // rule of thumb: ~1 nH per mm
  const x = 2 * Math.PI * mhz * 1e6 * nh * 1e-9
  const w = Math.min(230, (x / 100) * 230)
  const bad = x > 10
  return (
    <>
      <Diagram w={640} h={250}
        title={`A component with ${mm} millimetre leads has about ${nh} nanohenries of stray inductance. At ${mhz} megahertz that is ${fmt(x, 3)} ohms of unwanted reactance.`}
        caption="Long leads add stray inductance. Its reactance grows with frequency, which is why leaded parts fail at UHF.">
        <rect x={110} y={84} width={70} height={36} rx={6} fill={C.fill2} stroke={C.ink} strokeWidth={2.5} />
        <T x={145} y={102} anchor="middle" size={12} bold>part</T>
        <Ln x1={110} y1={102} x2={110 - Math.min(90, mm * 6)} y2={102} width={3} color={C.ink} />
        <Ln x1={180} y1={102} x2={180 + Math.min(90, mm * 6)} y2={102} width={3} color={C.ink} />
        <Ln x1={110 - Math.min(90, mm * 6)} y1={140} x2={180 + Math.min(90, mm * 6)} y2={140} width={2} color={C.muted} arrow="both" />
        <T x={145} y={160} anchor="middle" size={13} bold color={C.muted}>lead length {mm} mm</T>
        <T x={145} y={198} anchor="middle" size={13} color={C.muted}>stray inductance ≈ {nh} nH</T>
        <T x={145} y={216} anchor="middle" size={12} color={C.muted}>(rule of thumb: about 1 nH per mm)</T>

        <T x={470} y={50} anchor="middle" bold size={14}>Unwanted reactance X = 2πfL</T>
        <rect x={360} y={80} width={230} height={26} rx={5} fill={C.fill} />
        <rect x={360} y={80} width={w} height={26} rx={5} fill={bad ? C.bad : C.good} opacity={0.85} />
        <T x={470} y={128} anchor="middle" size={16} bold color={bad ? C.bad : C.good}>{fmt(x, 3)} Ω</T>
        <T x={470} y={160} anchor="middle" size={12} color={C.muted}>bar full scale = 100 Ω</T>
        <T x={470} y={196} anchor="middle" size={13} color={C.muted}>at {mhz} MHz with {nh} nH</T>
      </Diagram>
      <Choice label="Package" value={mm <= 1.5 ? 'smd' : 'dip'} onChange={(v) => setMm(v === 'smd' ? 1 : 10)} options={[{ value: 'dip', label: 'Through-hole (10 mm leads)' }, { value: 'smd', label: 'Surface mount (1 mm)' }]} />
      <Controls>
        <Slider label="Lead length" value={mm} min={0.5} max={15} step={0.5} onChange={setMm} format={(v) => `${v} mm`} color={C.resist} />
        <Slider label="Frequency" value={mhz} min={10} max={1000} step={10} onChange={setMhz} format={(v) => `${v} MHz`} color={C.signal} />
        <Readout label="Reactance" value={fmt(x, 3)} unit=" Ω" color={bad ? C.bad : C.good} />
      </Controls>
    </>
  )
}
