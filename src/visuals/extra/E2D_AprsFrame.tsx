import { C, Diagram, T } from '../kit'

const F = [
  { w: 92, k: 'Destination', s: '', col: C.muted },
  { w: 84, k: 'Source', s: 'your call', col: C.voltage },
  { w: 110, k: 'Path', s: 'digipeaters', col: C.resist },
  { w: 74, k: 'Control', s: 'UI', col: C.power },
  { w: 60, k: 'PID', s: '', col: C.muted },
  { w: 112, k: 'Information', s: 'position, text', col: C.signal },
  { w: 50, k: 'FCS', s: 'check', col: C.muted },
]

/** An APRS beacon is an AX.25 Unnumbered Information (UI) frame: sent once, no connection, no acknowledgment. */
export function E2D_AprsFrame() {
  let x = 20
  return (
    <Diagram w={640} h={260} title="An APRS beacon is an AX.25 frame of the Unnumbered Information type. The frame holds destination, source, digipeater path, a control field that marks it unnumbered information, a protocol field, the information such as a GPS position, and a check sequence. It is sent without a connection and without acknowledgment, which suits tracking things like balloons."
      caption="APRS = AX.25 UI frames: broadcast, no connect, no ACK.">
      <T x={20} y={20} size={14} bold color={C.muted}>One APRS packet (AX.25 frame)</T>
      {F.map((f) => {
        const cx = x
        x += f.w + 4
        const hot = f.k === 'Control'
        return (
          <g key={f.k}>
            <rect x={cx} y={36} width={f.w} height={66} rx={8} fill={f.col} fillOpacity={hot ? 0.28 : 0.13} stroke={f.col} strokeWidth={hot ? 3.5 : 2} />
            <T x={cx + f.w / 2} y={f.s ? 60 : 69} anchor="middle" size={f.w < 70 ? 12.5 : 13.5} bold color={f.col === C.muted ? C.ink : f.col}>{f.k}</T>
            {f.s && <T x={cx + f.w / 2} y={82} anchor="middle" size={12} color={C.muted}>{f.s}</T>}
          </g>
        )
      })}
      <path d="M355,106 L355,128" stroke={C.power} strokeWidth={2.5} markerEnd="url(#hx-arrow)" />
      <T x={355} y={142} size={14} bold color={C.power} anchor="middle">Unnumbered Information frame</T>
      <rect x={20} y={168} width={290} height={72} rx={10} fill={C.fill} stroke={C.fill2} strokeWidth={2} />
      <T x={34} y={190} size={14} bold color={C.good}>UI frame</T>
      <T x={34} y={212} size={13}>Just broadcast it. No connection,</T>
      <T x={34} y={229} size={13}>no ACK. Fits a moving balloon.</T>
      <rect x={330} y={168} width={290} height={72} rx={10} fill={C.fill} stroke={C.fill2} strokeWidth={2} />
      <T x={344} y={190} size={14} bold color={C.bad}>Connect frame</T>
      <T x={344} y={212} size={13}>Needs a link and acknowledgments:</T>
      <T x={344} y={229} size={13}>the wrong tool for a beacon.</T>
    </Diagram>
  )
}
