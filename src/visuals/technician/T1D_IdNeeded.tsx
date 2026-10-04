import { C, Diagram, T } from '../kit'

/** Which transmissions must be identified. */
export function T1D_IdNeeded() {
  const rows = [
    { t: 'On-air test transmission', id: true },
    { t: 'Brief transmission to adjust the station', id: true },
    { t: 'Unmodulated carrier', id: true },
    { t: 'Low power, under 0.1 W', id: true },
    { t: 'Controlling a model craft', id: false },
  ]
  return (
    <Diagram w={640} h={250} title="Station identification is required for test transmissions, adjustment transmissions, unmodulated carriers and low power transmissions; the exception is signals that control model craft" caption="Testing is still transmitting.">
      <T x={10} y={14} size={12.5} bold color={C.muted}>TRANSMISSION</T>
      <T x={430} y={14} size={12.5} bold color={C.muted}>CALL SIGN?</T>
      {rows.map((r, i) => {
        const y = 30 + i * 44
        const col = r.id ? C.signal : C.power
        return (
          <g key={r.t}>
            <rect x={6} y={y} width={400} height={36} rx={8} fill={C.fill} stroke={C.fill2} strokeWidth={1.5} />
            <T x={18} y={y + 18} size={14} bold={!r.id}>{r.t}</T>
            <rect x={424} y={y} width={208} height={36} rx={8} fill={col} fillOpacity={0.18} stroke={col} strokeWidth={2} />
            <T x={528} y={y + 18} anchor="middle" bold size={14} color={col}>{r.id ? 'Identify' : 'No ID needed'}</T>
          </g>
        )
      })}
    </Diagram>
  )
}
