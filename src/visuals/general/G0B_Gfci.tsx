import { useState } from 'react'
import { C, Choice, Diagram, Ground, Ln, T } from '../kit'

/** A GFCI compares current out on the hot wire with current back on the neutral. A leak to ground upsets the balance. */
export function Gfci() {
  const [fault, setFault] = useState(false)
  const hy = 66, ny = 166
  const col = fault ? C.bad : C.good
  return (
    <>
      <Diagram w={640} h={300} title={fault ? 'Current leaks from the hot wire to ground through a person. Less returns on the neutral than went out, so the GFCI trips and removes power.' : 'All the current that goes out on the hot wire returns on the neutral. The GFCI sees a balance and stays on, even though current flows from hot to neutral through the appliance.'}
        caption="Hot to neutral through the load is normal. Hot to ground is the fault a GFCI catches.">
        <Ln x1={30} y1={hy} x2={230} y2={hy} color={C.voltage} width={5} />
        <Ln x1={30} y1={ny} x2={230} y2={ny} color={C.muted} width={5} />
        <Ln x1={330} y1={hy} x2={540} y2={hy} color={fault ? C.muted : C.voltage} width={5} dash={fault ? '8 6' : undefined} />
        <Ln x1={330} y1={ny} x2={540} y2={ny} color={C.muted} width={5} dash={fault ? '8 6' : undefined} />
        <rect x={230} y={36} width={100} height={160} rx={10} fill={C.fill} stroke={col} strokeWidth={3} />
        <T x={280} y={100} anchor="middle" size={15} bold>GFCI</T>
        <T x={280} y={122} anchor="middle" size={12} color={C.muted}>compares</T>
        <T x={280} y={138} anchor="middle" size={12} color={C.muted}>out vs back</T>
        <T x={280} y={176} anchor="middle" size={13} bold color={col}>{fault ? 'TRIPPED' : 'on'}</T>
        <Ln x1={80} y1={hy - 16} x2={150} y2={hy - 16} color={C.voltage} width={2.5} arrow />
        <T x={115} y={hy - 30} anchor="middle" size={12} bold color={C.voltage}>out</T>
        <Ln x1={150} y1={ny + 16} x2={80} y2={ny + 16} color={C.muted} width={2.5} arrow />
        <T x={115} y={ny + 32} anchor="middle" size={12} bold color={C.muted}>back</T>
        <rect x={470} y={90} width={140} height={52} rx={8} fill={C.fill} stroke={C.ink} strokeWidth={2} />
        <T x={540} y={116} anchor="middle" size={13} bold>Appliance</T>
        <Ln x1={540} y1={hy} x2={540} y2={90} color={fault ? C.muted : C.voltage} width={4} dash={fault ? '8 6' : undefined} />
        <Ln x1={540} y1={142} x2={540} y2={ny} color={C.muted} width={4} />
        {fault && (
          <>
            <Ln x1={610} y1={116} x2={626} y2={116} color={C.bad} width={3} />
            <Ln x1={626} y1={116} x2={626} y2={226} color={C.bad} width={3} arrow />
            <Ground x={626} y={228} color={C.bad} />
            <T x={612} y={176} anchor="end" size={13} bold color={C.bad}>leaks to ground</T>
            <T x={612} y={194} anchor="end" size={13} bold color={C.bad}>through a person</T>
          </>
        )}
        <T x={30} y={262} size={14} bold color={col}>{fault ? 'Out is more than back: GFCI opens the circuit' : 'Out equals back: balanced, no trip'}</T>
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Condition" value={fault ? 'fault' : 'ok'} onChange={(v) => setFault(v === 'fault')} options={[{ value: 'ok', label: 'Normal use' }, { value: 'fault', label: 'Leak: hot to ground' }]} />
      </div>
    </>
  )
}
