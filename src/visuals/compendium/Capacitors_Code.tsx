import { useState } from 'react'
import { C, Controls, Diagram, Readout, Slider, T, si } from '../kit'

/** Decode the three-digit capacitor marking: two digits, then a multiplier digit, in picofarads. */
export function Capacitors_Code() {
  const [mant, setMant] = useState(10)
  const [exp, setExp] = useState(4)
  const pf = mant * 10 ** exp
  const code = `${mant}${exp}`
  return (
    <>
      <Diagram w={640} h={190}
        title={`A small capacitor marked ${code}: ${mant} followed by ${exp} zeros, which is ${pf} picofarads, or ${si(pf * 1e-12, 'F')}`}
        caption="Three digits: the first two are the value, the third is how many zeros to add. The answer is in picofarads.">
        <line x1={150} y1={150} x2={150} y2={118} stroke={C.muted} strokeWidth={4} strokeLinecap="round" />
        <line x1={210} y1={150} x2={210} y2={118} stroke={C.muted} strokeWidth={4} strokeLinecap="round" />
        <path d="M120,118 Q120,22 180,22 Q240,22 240,118 Z" fill={C.resist} fillOpacity={0.35} stroke={C.ink} strokeWidth={2} />
        <T x={180} y={80} anchor="middle" size={28} bold mono>{code}</T>
        <T x={290} y={50} size={14} bold>{mant}</T>
        <T x={320} y={50} size={13} color={C.muted}>+ {exp} zero{exp === 1 ? '' : 's'}</T>
        <T x={290} y={82} size={22} bold color={C.signal} mono>{pf.toLocaleString('en-US')} pF</T>
        <T x={290} y={116} size={20} bold color={C.power}>= {si(pf * 1e-12, 'F')}</T>
        <T x={290} y={150} size={12} color={C.muted}>1000 pF = 1 nF · 1000 nF = 1 µF</T>
      </Diagram>
      <Controls>
        <Slider label="First two digits" value={mant} min={10} max={99} onChange={setMant} color={C.signal} />
        <Slider label="Third digit (zeros)" value={exp} min={0} max={6} onChange={setExp} color={C.power} />
        <Readout label="Capacitance" value={si(pf * 1e-12, 'F')} color={C.power} />
      </Controls>
    </>
  )
}
