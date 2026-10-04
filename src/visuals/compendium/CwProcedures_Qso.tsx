import { C, Diagram, T } from '../kit'

const A = C.signal, B = C.power
interface Line { who: 'A' | 'B'; text: string; note: string }
const LINES: Line[] = [
  { who: 'A', text: 'CQ CQ CQ DE N0CALL N0CALL K', note: 'Calling anyone. DE = "from". K = go ahead.' },
  { who: 'B', text: 'N0CALL DE N0DEMO N0DEMO K', note: 'Reply: their call, DE, your call. Not the whole CQ again.' },
  { who: 'A', text: 'N0DEMO DE N0CALL TNX FER CALL UR 579 = NAME ANN = QTH OHIO = HW? KN', note: 'Report, name, location. = is BT, a pause. KN: only you reply.' },
  { who: 'B', text: 'N0CALL DE N0DEMO R TNX ANN UR 599 = NAME BOB = QTH IOWA = BK', note: 'R = received. BK = break, back to you.' },
  { who: 'A', text: 'R FB BOB TNX FER QSO 73 DE N0CALL SK', note: '73 = best regards. SK = end of contact.' },
  { who: 'B', text: 'N0CALL DE N0DEMO TU 73 SK', note: 'TU = thank you. Contact over.' },
]

/** An annotated, illustrative CW QSO between two placeholder calls. */
export function CwProcedures_Qso() {
  const rowH = 74
  return (
    <Diagram w={640} h={LINES.length * rowH + 52} title="An annotated CW contact between two stations with placeholder call signs: a CQ call, a reply, an exchange of reports names and locations using BT and KN, a short back-and-forth with BK, then 73 and SK to sign off"
      caption="Illustrative. Real QSOs vary, and operators shorten or skip parts. N0CALL and N0DEMO are placeholders.">
      <T x={14} y={14} size={13} bold color={A}>Station A (N0CALL)</T>
      <T x={626} y={14} size={13} bold color={B} anchor="end">Station B (N0DEMO)</T>
      {LINES.map((l, i) => {
        const y = 32 + i * rowH
        const col = l.who === 'A' ? A : B
        return (
          <g key={i}>
            <rect x={14} y={y} width={612} height={rowH - 10} rx={10} fill={col} fillOpacity={0.12} stroke={col} strokeWidth={1.8} />
            <rect x={14} y={y} width={7} height={rowH - 10} rx={3} fill={col} />
            <T x={32} y={y + 20} size={12.5} mono bold>{l.text}</T>
            <T x={32} y={y + 44} size={13} color={C.muted}>{l.note}</T>
          </g>
        )
      })}
    </Diagram>
  )
}
