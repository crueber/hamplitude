import { Antenna, C, Diagram, Ground, Ln, T } from '../kit'

/** Every protector and every cable bonds to one panel with one ground connection. */
export function SinglePoint() {
  const items = [
    { y: 40, label: 'Coax protector', sub: 'from antenna', col: C.signal },
    { y: 96, label: 'Rotator / control protector', sub: 'from tower', col: C.resist },
    { y: 152, label: 'AC surge protector', sub: 'from the mains', col: C.voltage },
  ]
  return (
    <Diagram w={640} h={262} title="A single point ground panel: the coax protector, control-line protector and AC surge protector are all mounted on one panel with one connection to the ground rods, and the station equipment connects through it."
      caption="Everything that enters the station passes through one panel, so every protector shares the same ground at the same moment.">
      <Antenna x={40} y={90} />
      <T x={40} y={110} anchor="middle" size={12} color={C.muted}>outside</T>
      <rect x={200} y={14} width={240} height={190} rx={12} fill={C.fill} stroke={C.power} strokeWidth={2.5} />
      <T x={320} y={32} anchor="middle" bold size={14} color={C.power}>Single point ground panel</T>
      {items.map((it) => (
        <g key={it.y}>
          <Ln x1={70} y1={it.y + 26} x2={218} y2={it.y + 26} color={it.col} width={3} arrow />
          <rect x={218} y={it.y + 8} width={168} height={40} rx={8} fill={C.bg} stroke={it.col} strokeWidth={2} />
          <T x={302} y={it.y + 22} anchor="middle" bold size={12}>{it.label}</T>
          <T x={302} y={it.y + 38} anchor="middle" size={11} color={C.muted}>{it.sub}</T>
          <Ln x1={386} y1={it.y + 28} x2={500} y2={it.y + 28} color={it.col} width={3} arrow />
        </g>
      ))}
      <rect x={504} y={50} width={122} height={130} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <T x={565} y={115} anchor="middle" bold size={14}>Station</T>
      <T x={565} y={135} anchor="middle" size={12} color={C.muted}>radio, amp, PSU</T>
      <Ln x1={320} y1={204} x2={320} y2={228} color={C.power} width={5} />
      <Ground x={320} y={228} color={C.power} />
      <T x={348} y={236} size={12} bold color={C.power}>one connection to ground rods</T>
    </Diagram>
  )
}
