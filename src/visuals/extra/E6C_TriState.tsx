import { useState } from 'react'
import { C, Choice, Diagram, Resistor, T, Wire } from '../kit'

/** Tri-state output: 0, 1, or high-impedance (disconnected). A pull-up resistor gives a floating line a defined level. */
export function TriState() {
  const [en, setEn] = useState(1)
  const [d, setD] = useState(0)
  const [pull, setPull] = useState<'none' | 'up'>('none')
  const level: string = en ? String(d) : pull === 'up' ? '1' : '?'
  const color = level === '1' ? C.voltage : level === '0' ? C.muted : C.bad
  return (
    <>
      <Diagram w={640} h={270}
        title={`A tri-state output with enable ${en ? 'on' : 'off'} and data ${d}. ${en ? `The output drives the line to ${d}.` : pull === 'up' ? 'The output is disconnected (high impedance) and the pull-up resistor holds the line at 1.' : 'The output is disconnected (high impedance) and the line floats with no defined level.'}`}
        caption={en ? 'Enabled: the output drives the line to 0 or 1.' : pull === 'up' ? 'High-impedance: the output lets go, and the pull-up resistor sets the line high.' : 'High-impedance with no pull resistor: the line floats, its level is undefined.'}>
        <T x={60} y={124} anchor="middle" bold size={14} color={d ? C.voltage : C.muted}>data = {d}</T>
        <Wire pts={[[20, 150], [170, 150]]} color={d ? C.voltage : C.muted} width={3} />
        <polygon points="170,115 170,185 250,150" fill={C.fill} stroke={C.ink} strokeWidth={2.5} strokeLinejoin="round" />
        <T x={210} y={150} anchor="middle" size={12} bold color={C.muted}>driver</T>
        <Wire pts={[[212, 168], [212, 220]]} color={en ? C.good : C.muted} width={3} />
        <T x={212} y={238} anchor="middle" bold size={14} color={en ? C.good : C.muted}>enable = {en}</T>
        {en ? (
          <Wire pts={[[250, 150], [520, 150]]} color={d ? C.voltage : C.muted} width={3} />
        ) : (
          <>
            <Wire pts={[[250, 150], [290, 150]]} color={C.muted} width={3} />
            <Wire pts={[[330, 150], [520, 150]]} color={pull === 'up' ? C.voltage : C.muted} width={3} dash={pull === 'up' ? undefined : '5 5'} />
            <circle cx={290} cy={150} r={4} fill="none" stroke={C.ink} strokeWidth={2} />
            <circle cx={330} cy={150} r={4} fill="none" stroke={C.ink} strokeWidth={2} />
            <T x={310} y={130} anchor="middle" size={12} bold color={C.bad}>open: high-Z</T>
          </>
        )}
        {pull === 'up' && (
          <>
            <Wire pts={[[420, 150], [420, 130]]} color={C.voltage} width={2.5} />
            <Wire pts={[[420, 80], [420, 50]]} color={C.voltage} width={2.5} />
            <Resistor x={420} y={105} rot={90} len={50} color={C.resist} />
            <T x={440} y={105} size={13} bold color={C.resist}>pull-up</T>
            <line x1={400} y1={50} x2={440} y2={50} stroke={C.voltage} strokeWidth={3} />
            <T x={420} y={34} anchor="middle" size={13} bold color={C.voltage}>+V</T>
            <circle cx={420} cy={150} r={3.5} fill={C.ink} />
          </>
        )}
        <circle cx={560} cy={150} r={30} fill={C.fill} stroke={color} strokeWidth={3} />
        <T x={560} y={150} anchor="middle" bold size={24} color={color}>{level}</T>
        <T x={560} y={198} anchor="middle" size={13} color={C.muted}>line level</T>
      </Diagram>
      <Choice label="Enable" value={en} onChange={setEn} options={[{ value: 1, label: 'Enable on' }, { value: 0, label: 'Enable off (high-Z)' }]} />
      <Choice label="Data" value={d} onChange={setD} options={[{ value: 0, label: 'Data 0' }, { value: 1, label: 'Data 1' }]} />
      <Choice label="Pull resistor" value={pull} onChange={setPull} options={[{ value: 'none', label: 'No pull resistor' }, { value: 'up', label: 'Pull-up resistor' }]} />
    </>
  )
}
