import { C, Diagram, Ln, Lines, T } from '../kit'

/** Cross-sections: coax, open-wire (parallel conductor) and microstrip. */
export function LineTypes() {
  const cy = 80
  return (
    <Diagram w={640} h={268} title="Cross sections of three transmission lines: coaxial cable with a plastic dielectric, parallel-conductor open-wire line with air between the wires, and microstrip, a printed trace above a ground plane"
      caption="Same job, different trade-offs. Air makes a line faster and lower loss.">
      {/* coax */}
      <circle cx={107} cy={cy} r={58} fill={C.fill2} stroke={C.ink} strokeWidth={4} />
      <circle cx={107} cy={cy} r={46} fill={C.fill} stroke={C.muted} strokeWidth={1.5} />
      <circle cx={107} cy={cy} r={9} fill={C.resist} />
      <T x={107} y={cy - 28} anchor="middle" size={12} bold color={C.muted}>dielectric</T>
      <T x={107} y={170} anchor="middle" size={14} bold>Coax</T>
      <Lines x={107} y={192} lines={['shield keeps fields in', 'plastic or foam inside', 'higher loss, slower']} lh={17} anchor="middle" size={12} color={C.muted} />
      {/* open wire */}
      <circle cx={285} cy={cy} r={10} fill={C.resist} />
      <circle cx={375} cy={cy} r={10} fill={C.resist} />
      <Ln x1={299} y1={cy} x2={361} y2={cy} color={C.signal} width={2} arrow="both" />
      <T x={330} y={cy - 18} anchor="middle" size={12} bold color={C.signal}>air</T>
      <T x={330} y={170} anchor="middle" size={14} bold>Open wire</T>
      <Lines x={330} y={192} lines={['two parallel wires', 'air between them', 'lower loss, faster']} lh={17} anchor="middle" size={12} color={C.muted} />
      {/* microstrip */}
      <rect x={470} y={cy + 36} width={140} height={14} rx={2} fill={C.ink} />
      <rect x={470} y={cy} width={140} height={36} fill={C.fill2} stroke={C.muted} strokeWidth={1.5} />
      <rect x={520} y={cy - 8} width={40} height={8} rx={2} fill={C.resist} />
      <T x={580} y={cy - 6} size={12} bold color={C.resist}>trace</T>
      <T x={540} y={cy + 20} anchor="middle" size={12} bold color={C.muted}>insulator</T>
      <T x={540} y={cy + 68} anchor="middle" size={12} bold color={C.ink}>ground plane</T>
      <T x={540} y={170} anchor="middle" size={14} bold>Microstrip</T>
      <Lines x={540} y={192} lines={['printed trace over', 'a ground plane', 'constant impedance', 'at microwave']} lh={17} anchor="middle" size={12} color={C.muted} />
    </Diagram>
  )
}
