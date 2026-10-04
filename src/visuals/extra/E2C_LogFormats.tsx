import { C, Diagram, T } from '../kit'

/** ADIF swaps logs between programs; Cabrillo submits a contest log; LoTW confirms; a QSL manager handles a DX station's cards. */
export function E2C_LogFormats() {
  const card = (x: number, y: number, head: string, l1: string, l2: string, col: string) => (
    <g>
      <rect x={x} y={y} width={290} height={74} rx={10} fill={col} fillOpacity={0.12} stroke={col} strokeWidth={2.5} />
      <T x={x + 14} y={y + 20} size={15} bold color={col}>{head}</T>
      <T x={x + 14} y={y + 42} size={13}>{l1}</T>
      <T x={x + 14} y={y + 60} size={13}>{l2}</T>
    </g>
  )
  return (
    <Diagram w={640} h={330} title="Log formats and confirmation. ADIF is the file format for exchanging log data between programs. Cabrillo is the format for submitting an electronic contest log. Logbook of The World confirms contacts, including special event, US to non-US, and Worked All States. A DX QSL manager handles sending and receiving confirmations for a DX station."
      caption="ADIF exchanges. Cabrillo submits. LoTW and QSL managers confirm.">
      <rect x={20} y={12} width={600} height={78} rx={10} fill={C.fill} stroke={C.fill2} strokeWidth={2} />
      <T x={34} y={32} size={12.5} bold color={C.muted}>One ADIF record (a log line any program can read)</T>
      <T x={34} y={58} size={14.5} mono><tspan fill="var(--d-signal)">&lt;CALL:5&gt;</tspan>K1ABC <tspan fill="var(--d-voltage)">&lt;BAND:3&gt;</tspan>20M <tspan fill="var(--d-power)">&lt;MODE:3&gt;</tspan>FT8 <tspan fill="var(--d-ink)">&lt;EOR&gt;</tspan></T>
      <T x={34} y={79} size={12.5} color={C.muted}>field name : length, then the value. Plain text, so it moves between programs.</T>
      {card(20, 108, 'ADIF', 'The file format for exchanging', 'amateur radio log data.', C.signal)}
      {card(320, 108, 'Cabrillo', 'Standard for submitting an', 'electronic contest log to the sponsor.', C.resist)}
      {card(20, 192, 'LoTW (Logbook of The World)', 'Confirms special event, US to non-US', 'and Worked All States contacts.', C.good)}
      {card(320, 192, 'DX QSL manager', 'Handles receiving and sending', 'confirmations for a DX station.', C.power)}
      <T x={320} y={290} anchor="middle" size={13} color={C.muted}>Cabrillo is not a contest exchange, a rule set, or a digital mode.</T>
    </Diagram>
  )
}
