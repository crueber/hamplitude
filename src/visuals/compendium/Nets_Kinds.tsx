import { C, Diagram, T } from '../kit'

interface Kind { t: string; who: string; what: string; where: string; c: string }
const KINDS: Kind[] = [
  { t: 'Social', who: 'Anyone', what: 'Friendly chat', where: 'Repeaters and HF', c: C.signal },
  { t: 'Club', who: 'Club members', what: 'Club news, notices', where: 'Local repeater', c: C.current },
  { t: 'Training', who: 'Newcomers', what: 'Practice procedure', where: 'Repeaters and HF', c: C.good },
  { t: 'Emergency', who: 'Volunteers', what: 'Drills and real events', where: 'Repeaters and HF', c: C.voltage },
  { t: 'Traffic', who: 'Message handlers', what: 'Formal messages', where: 'Mostly HF', c: C.resist },
  { t: 'Special interest', who: 'A mode or a band', what: 'DX, QRP, one mode', where: 'Mostly HF', c: C.power },
]

/** Six common kinds of net: who they are for, what happens, and where they usually run. */
export function Nets_Kinds() {
  const w = 200, h = 118, gx = 10, gy = 10, x0 = 5, y0 = 5
  return (
    <Diagram w={640} h={y0 * 2 + 2 * h + gy}
      title="Six common kinds of amateur radio net: social, club, training, emergency, traffic and special interest, each with who it is for, what happens on it, and whether it usually runs on repeaters or HF"
      caption="Typical examples. Every net sets its own purpose, schedule and rules.">
      {KINDS.map((k, i) => {
        const x = x0 + (i % 3) * (w + gx), y = y0 + Math.floor(i / 3) * (h + gy)
        return (
          <g key={k.t}>
            <rect x={x} y={y} width={w} height={h} rx={12} fill={C.fill} stroke={k.c} strokeWidth={2} />
            <rect x={x} y={y} width={w} height={30} rx={12} fill={k.c} fillOpacity={0.22} />
            <T x={x + 12} y={y + 16} size={15} bold color={k.c}>{k.t}</T>
            <T x={x + 12} y={y + 46} size={12} color={C.muted}>Who</T>
            <T x={x + 60} y={y + 46} size={12.5}>{k.who}</T>
            <T x={x + 12} y={y + 70} size={12} color={C.muted}>What</T>
            <T x={x + 60} y={y + 70} size={12.5}>{k.what}</T>
            <T x={x + 12} y={y + 94} size={12} color={C.muted}>Where</T>
            <T x={x + 60} y={y + 94} size={12.5}>{k.where}</T>
          </g>
        )
      })}
    </Diagram>
  )
}
