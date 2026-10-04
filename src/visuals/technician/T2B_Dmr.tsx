import { C, Box, Diagram, Ln, T } from '../kit'

/** DMR: the color code gets you into the repeater; the talkgroup picks which conversation you hear. */
export function Dmr() {
  return (
    <Diagram w={640} h={300} title="On a DMR repeater, the color code in your radio must match the repeater's to access it; the talkgroup ID you program selects which traffic you hear." caption="Color code = access. Talkgroup = which conversation. Both are programmed into your radio.">
      <T x={14} y={20} bold size={15}>Your radio is programmed with</T>
      <Box x={14} y={40} w={200} h={64} label="Color code: 1" sub="must match the repeater" color={C.resist} />
      <Box x={14} y={124} w={200} h={64} label="Talkgroup ID: 2" sub="the group you want to hear" color={C.power} />
      <Ln x1={216} y1={72} x2={286} y2={72} color={C.resist} width={3} arrow />
      <rect x={290} y={34} width={336} height={208} rx={14} fill="none" stroke={C.ink} strokeWidth={2} />
      <T x={458} y={20} anchor="middle" bold size={15}>DMR repeater (color code 1)</T>
      {[1, 2, 3].map((n, i) => {
        const y = 52 + i * 62
        const on = n === 2
        return (
          <g key={n} opacity={on ? 1 : 0.5}>
            <rect x={310} y={y} width={296} height={48} rx={10} fill={on ? C.power : C.fill} fillOpacity={on ? 0.2 : 1} stroke={on ? C.power : C.muted} strokeWidth={on ? 2.5 : 1.5} />
            <T x={326} y={y + 24} bold size={14} color={on ? C.power : C.muted}>Talkgroup {n}</T>
            <T x={596} y={y + 24} anchor="end" size={13} bold={on} color={on ? C.power : C.muted}>{on ? 'you hear this' : 'not heard'}</T>
          </g>
        )
      })}
      <Ln x1={216} y1={156} x2={306} y2={114} color={C.power} width={3} arrow />
      <T x={14} y={228} size={13} color={C.muted}>Wrong color code: no access.</T>
      <T x={14} y={248} size={13} color={C.muted}>Other talkgroups don't bother you.</T>
    </Diagram>
  )
}
