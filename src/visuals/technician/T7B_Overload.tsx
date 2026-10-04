import { useState } from 'react'
import { Antenna, C, Choice, Diagram, Ln, T } from '../kit'

const base = 170
const spike = (x: number, h: number, color: string, w = 10, dash?: string) => (
  <path d={`M${x - w},${base} Q${x - 3},${base} ${x},${base - h} Q${x + 3},${base} ${x + w},${base}`} fill={color} fillOpacity={0.25} stroke={color} strokeWidth={3} strokeLinejoin="round" strokeDasharray={dash} />
)

/** A strong out-of-band signal leaks into a receiver; a filter at the receiver's antenna input stops it. */
export function Overload() {
  const [filter, setFilter] = useState(false)
  const col = filter ? C.muted : C.bad
  return (
    <>
      <Diagram w={640} h={290} title="A strong signal outside a receiver's band leaks into its front end and overloads it. A band-reject filter at the receiver's antenna input blocks it."
        caption="Fix it at the receiver that is being overloaded: block the strong signal before it gets in.">
        <rect x={60} y={44} width={290} height={base - 44} rx={8} fill={C.signal} fillOpacity={0.1} stroke={C.signal} strokeWidth={2} strokeDasharray="6 4" />
        <T x={205} y={58} anchor="middle" bold size={13} color={C.signal}>band the receiver is built for</T>
        {spike(120, 40, C.signal)}
        {spike(205, 56, C.signal)}
        {spike(290, 32, C.signal)}
        <Ln x1={20} y1={base} x2={620} y2={base} color={C.ink} width={2} />
        <T x={20} y={base + 16} size={12} color={C.muted}>frequency →</T>

        {spike(500, filter ? 22 : 130, col, 12, filter ? '5 4' : undefined)}
        <T x={500} y={base - (filter ? 40 : 148)} anchor="middle" bold size={13} color={col}>{filter ? 'strong signal blocked' : 'strong signal'}</T>
        {!filter && <path d={`M488,${base - 6} C440,${base - 8} 400,${base - 28} 352,${base - 52}`} fill="none" stroke={C.bad} strokeWidth={3} strokeDasharray="6 5" strokeLinecap="round" markerEnd="url(#hx-arrow)" />}
        {!filter && <T x={420} y={base - 62} anchor="middle" size={13} bold color={C.bad}>leaks in</T>}

        <Antenna x={60} y={262} />
        <Ln x1={80} y1={240} x2={174} y2={240} color={C.ink} width={2.5} arrow />
        <rect x={178} y={218} width={120} height={44} rx={10} fill={filter ? C.fill : 'none'} stroke={filter ? C.power : C.muted} strokeWidth={2} strokeDasharray={filter ? undefined : '5 4'} />
        <T x={238} y={240} anchor="middle" bold size={13} color={filter ? C.power : C.muted}>{filter ? 'Band-reject filter' : 'no filter'}</T>
        <Ln x1={298} y1={240} x2={372} y2={240} color={C.ink} width={2.5} arrow />
        <rect x={376} y={218} width={130} height={44} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2} />
        <T x={441} y={240} anchor="middle" bold size={13}>Receiver</T>
        <T x={526} y={240} size={13} bold color={filter ? C.good : C.bad}>{filter ? 'clear' : 'interference'}</T>
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Filter" value={filter ? 'on' : 'off'} onChange={(v) => setFilter(v === 'on')} options={[{ value: 'off', label: 'No filter' }, { value: 'on', label: 'Filter at receiver antenna input' }]} />
      </div>
    </>
  )
}
