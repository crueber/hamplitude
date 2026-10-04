import { C, Diagram, T } from '../kit'

/** Three housekeeping facts: why keep a log, what a contest requires, what QRP means. */
export function G2D_LogContestQrp() {
  const card = (x: number, head: string, col: string, lines: [string, boolean?][]) => (
    <g>
      <rect x={x} y={14} width={200} height={232} rx={12} fill={col} fillOpacity={0.1} stroke={col} strokeWidth={2} />
      <T x={x + 100} y={40} anchor="middle" size={18} bold color={col}>{head}</T>
      {lines.map(([l, b], i) => (
        <T key={i} x={x + 100} y={78 + i * 24} anchor="middle" size={13.5} bold={!!b} color={b ? C.ink : C.muted}>{l}</T>
      ))}
    </g>
  )
  return (
    <Diagram w={640} h={260} title="Station log: kept to help answer if the FCC asks about your station. Contest: you must still identify normally under FCC rules; sending logs or QSL cards is not an FCC requirement. QRP: low-power transmitting" caption="Three short facts, each with a hook.">
      {card(10, 'Station log', C.signal, [['Why keep one?', true], ['To help you reply if', false], ['the FCC asks about', false], ['your station.', false], ['Not a legal need for', false], ['renewal or DX contacts.', false]])}
      {card(220, 'Contest', C.resist, [['Required:', true], ['normal FCC station ID', false], ['', false], ['Not required by the FCC:', true], ['submitting a log,', false], ['sending QSL cards', false]])}
      {card(430, 'QRP', C.power, [['Low-power operation', true], ['', false], ['P = Power, kept low', false], ['', false], ['Not model control,', false], ['not a protocol,', false], ['not traffic relay', false]])}
    </Diagram>
  )
}
