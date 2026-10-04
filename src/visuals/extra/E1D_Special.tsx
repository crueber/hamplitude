import { C, Diagram, T } from '../kit'

/** Who may send one-way transmissions and who may encrypt. */
export function E1D_Special() {
  const col = (x: number, head: string, yes: string[], no: string[]) => (
    <g>
      <rect x={x} y={6} width={308} height={256} rx={12} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <T x={x + 154} y={30} anchor="middle" bold size={16}>{head}</T>
      {yes.map((t, i) => (
        <g key={t}>
          <T x={x + 16} y={66 + i * 28} bold size={16} color={C.good}>✓</T>
          <T x={x + 40} y={66 + i * 28} bold size={14} color={C.good}>{t}</T>
        </g>
      ))}
      {no.map((t, i) => (
        <g key={t}>
          <T x={x + 16} y={66 + (yes.length + 0.45) * 28 + i * 26} bold size={16} color={C.bad}>✗</T>
          <T x={x + 40} y={66 + (yes.length + 0.45) * 28 + i * 26} size={13.5} color={C.muted}>{t}</T>
        </g>
      ))}
    </g>
  )
  return (
    <Diagram w={640} h={268} title="Who may transmit one-way: space stations, beacon stations and telecommand stations, but not repeaters, linked repeaters, message forwarding stations or automatically controlled digital stations. Who may encrypt: telecommand signals from a space telecommand station, but not terrestrial repeater telecommand, auxiliary relay links or mesh backbone nodes." caption="Space links get two special permissions. Everything terrestrial does not.">
      {col(6, 'One-way transmissions', ['Space station', 'Beacon station', 'Telecommand station'], ['Repeater or linked repeater', 'Message forwarding station', 'Automatically controlled digital'])}
      {col(326, 'Encrypted messages', ['Space telecommand station signals'], ['Telecommand to terrestrial repeaters', 'Auxiliary links with repeater audio', 'Mesh network backbone nodes'])}
    </Diagram>
  )
}
