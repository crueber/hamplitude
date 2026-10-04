import { useState } from 'react'
import { C, Choice, Diagram, Ln, Switch, T } from '../kit'

/** A power supply interlock opens the AC feed whenever the cabinet is opened. */
export function Interlock() {
  const [open, setOpen] = useState(false)
  const col = open ? C.good : C.bad
  const ly = open ? 34 : 84
  return (
    <>
      <Diagram w={640} h={300} title={open ? 'Cabinet open: the interlock switch opens, power is removed and no dangerous voltage is present' : 'Cabinet closed: the interlock switch is closed, the supply runs and produces dangerous voltage inside'}
        caption="The lid holds the interlock switch closed. Lift it and the AC feed is cut.">
        <rect x={120} y={96} width={440} height={164} rx={6} fill={C.fill} stroke={C.ink} strokeWidth={3} />
        <rect x={120} y={ly} width={440} height={14} rx={4} fill={C.fill2} stroke={C.ink} strokeWidth={2.5} strokeDasharray={open ? '6 4' : undefined} />
        <T x={540} y={ly - 14} anchor="end" size={13} bold color={C.muted}>{open ? 'lid lifted' : 'lid closed'}</T>
        <Ln x1={30} y1={190} x2={120} y2={190} color={C.voltage} width={4} />
        <T x={30} y={172} size={13} bold color={C.voltage}>AC in</T>
        <Ln x1={120} y1={190} x2={180} y2={190} color={open ? C.muted : C.voltage} width={4} />
        <Switch x={210} y={190} len={60} closed={!open} color={C.ink} />
        <Ln x1={240} y1={190} x2={300} y2={190} color={open ? C.muted : C.voltage} width={4} dash={open ? '8 6' : undefined} />
        <Ln x1={210} y1={ly + 14} x2={210} y2={open ? 166 : 176} color={C.muted} width={3} dash={open ? '4 4' : undefined} />
        <T x={210} y={226} anchor="middle" size={13} bold>interlock switch</T>
        <rect x={300} y={150} width={120} height={80} rx={8} fill={C.fill2} stroke={C.ink} strokeWidth={2} />
        <T x={360} y={190} anchor="middle" size={13} bold>Power supply</T>
        <Ln x1={420} y1={190} x2={470} y2={190} color={col} width={4} />
        <T x={514} y={176} anchor="middle" size={13} bold color={col}>{open ? '0 V' : 'dangerous'}</T>
        <T x={514} y={194} anchor="middle" size={13} bold color={col}>{open ? 'removed' : 'voltage'}</T>
        <T x={20} y={282} size={14} bold color={open ? C.good : C.ink}>{open ? 'Opened: dangerous voltages are removed' : 'Closed: normal operation'}</T>
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Cabinet" value={open ? 'open' : 'closed'} onChange={(v) => setOpen(v === 'open')} options={[{ value: 'closed', label: 'Lid closed' }, { value: 'open', label: 'Lid opened' }]} />
      </div>
    </>
  )
}
