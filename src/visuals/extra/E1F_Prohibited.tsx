import { C, Diagram, T } from '../kit'

/** Prohibited vs fine: money, business, and obscured meaning. */
export function E1F_Prohibited() {
  const col = (x: number, c: string, head: string, mark: string, items: string[][]) => (
    <g>
      <rect x={x} y={6} width={308} height={252} rx={12} fill={c} fillOpacity={0.1} stroke={c} strokeWidth={2} />
      <T x={x + 154} y={30} anchor="middle" bold size={16} color={c}>{head}</T>
      {items.map((lines, i) => (
        <g key={i}>
          <T x={x + 16} y={66 + i * 62} bold size={16} color={c}>{mark}</T>
          {lines.map((l, j) => <T key={l} x={x + 40} y={66 + i * 62 + j * 20} size={13.5}>{l}</T>)}
        </g>
      ))}
    </g>
  )
  return (
    <Diagram w={640} h={264} title="Prohibited: communications for hire or material compensation, messages to a business when you or your employer has a pecuniary interest, and messages encoded to obscure their meaning, even over a mesh network. Fine: messages to a business when neither you nor your employer has a pecuniary interest, email and third-party traffic on a mesh network, other languages and religious content." caption="Pecuniary interest = any money to be made. There is no small-amount exception.">
      {col(6, C.bad, 'Prohibited', '✗', [
        ['Communications for hire or', 'material compensation'],
        ['Message to a business if you or', 'your employer has a pecuniary interest'],
        ['Messages encoded to obscure', 'their meaning, even on a mesh network'],
      ])}
      {col(326, C.good, 'Not prohibited', '✓', [
        ['Message to a business when neither', 'you nor your employer has an interest'],
        ['Email and third-party traffic', 'on a mesh network'],
        ['Other languages than English,', 'religious content'],
      ])}
    </Diagram>
  )
}
