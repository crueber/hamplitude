import { Box, C, Diagram, Ln, T } from '../kit'

/** What each digital voice system asks of the user, the repeater and the network. Condensed; see the system articles for detail. */
const ROWS: { name: string; color: string; user: string[]; rep: string[]; net: string[] }[] = [
  { name: 'DMR', color: C.power, user: ['A talkgroup,', 'on a time slot'], rep: ['Color code and slot', 'must match'], net: ['Radio IDs from a', 'central registry'] },
  { name: 'D-STAR', color: C.current, user: ['Call signs in the', 'RPT1, RPT2, UR fields'], rep: ['Reads the call signs', 'in each header'], net: ['A gateway; call signs', 'registered with it'] },
  { name: 'Fusion', color: C.signal, user: ['A WIRES-X room', 'for linked calls'], rep: ['Digital C4FM or', 'analog FM'], net: ['A WIRES-X node', 'joins the rooms'] },
]
const COLS = [
  { x: 112, title: 'You select' },
  { x: 304, title: 'The repeater uses' },
  { x: 474, title: 'The network side' },
]
const WID = [170, 150, 152]

export function DigitalVoiceRepeaters_Systems() {
  return (
    <Diagram w={640} h={300}
      title="How the three digital voice systems differ at a repeater. DMR: you select a talkgroup on a time slot, the repeater requires a matching color code, and the network uses radio IDs from a central registry. D-STAR: you set call signs in the RPT1, RPT2 and UR fields, the repeater reads the call signs in each header, and a gateway with registered call signs forms the network. System Fusion: you select a WIRES-X room, the repeater works in digital C4FM or analog FM, and a WIRES-X node joins the rooms. On every system the radio side carries the same Part 97 duties as an FM repeater."
      caption="Different addressing, same license duties on the radio side. A simplified summary.">
      {COLS.map((c, i) => (
        <T key={c.title} x={c.x + WID[i] / 2} y={18} anchor="middle" size={13} bold color={C.muted}>{c.title}</T>
      ))}
      {ROWS.map((r, ri) => {
        const y = 36 + ri * 74
        return (
          <g key={r.name}>
            <Box x={10} y={y} w={92} h={62} label={r.name} color={r.color} size={15} />
            {[r.user, r.rep, r.net].map((lines, ci) => (
              <g key={ci}>
                <rect x={COLS[ci].x} y={y} width={WID[ci]} height={62} rx={8} fill={C.fill} stroke={C.fill2} strokeWidth={1.5} />
                <T x={COLS[ci].x + WID[ci] / 2} y={y + 22} anchor="middle" size={12.5}>{lines[0]}</T>
                <T x={COLS[ci].x + WID[ci] / 2} y={y + 42} anchor="middle" size={12.5}>{lines[1]}</T>
              </g>
            ))}
            {[0, 1].map((k) => (
              <Ln key={k} x1={COLS[k].x + WID[k] + 2} y1={y + 31} x2={COLS[k + 1].x - 2} y2={y + 31} color={C.muted} width={2} arrow />
            ))}
          </g>
        )
      })}
      <rect x={10} y={262} width={620} height={32} rx={8} fill={C.fill2} stroke={C.good} strokeWidth={2} />
      <T x={320} y={278} anchor="middle" size={13} bold>Radio side: the same Part 97 duties as an FM repeater</T>
    </Diagram>
  )
}
