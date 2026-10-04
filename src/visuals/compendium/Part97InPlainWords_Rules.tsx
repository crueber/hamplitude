import { C, Diagram, T } from '../kit'

const COLS = [
  { t: 'Always', s: 'every transmission', c: C.good, items: [
    'Have a control operator in charge',
    'Identify every 10 minutes and at the end',
    'Stay inside your privileges',
    'Use no more power than you need',
    'Let the FCC inspect station and records',
  ] },
  { t: 'Never', s: 'with very narrow exceptions', c: C.bad, items: [
    'Broadcast to the general public',
    'Be paid to operate, or use it for business',
    'Send messages with hidden meaning',
    'Use indecent or obscene language',
    'Interfere willfully or maliciously',
  ] },
  { t: 'Only if', s: 'conditions apply', c: C.resist, items: [
    'Third-party traffic abroad: only with an agreement',
    'Secondary band: yield to primary users',
    'Antenna over 200 ft: tell the FAA, register it',
    'Automatic control: only where the rules allow',
    'Ship at sea: a US vessel, with the master’s okay',
  ] },
]

/** Part 97 at a glance: always, never and only-if. */
export function Part97InPlainWords_Rules() {
  const w = 204, gap = 12
  return (
    <Diagram w={640} h={352} title="The amateur rules at a glance. Always: have a control operator, identify every 10 minutes and at the end, stay inside your privileges, use no more power than needed, allow FCC inspection. Never: broadcast, be paid, use hidden meanings, use indecent language, interfere willfully. Only if: third-party traffic abroad needs an agreement, secondary bands must yield, tall antennas need FAA notification, and automatic control is limited, and a ship needs its master's permission"
      caption="A summary, not the rule text: each line has detail and exceptions in Part 97.">
      {COLS.map((k, i) => {
        const x = 2 + i * (w + gap)
        return (
          <g key={k.t}>
            <rect x={x} y={4} width={w} height={344} rx={12} fill={C.fill} stroke={k.c} strokeWidth={2.4} />
            <path d={`M${x},${(4)+52} V${(4)+12} a12,12 0 0 1 12,-12 H${(x)+w-12} a12,12 0 0 1 12,12 V${(4)+52} Z`} fill={k.c} fillOpacity={0.22} />
            <T x={x + 14} y={24} size={17} bold color={k.c}>{k.t}</T>
            <T x={x + 14} y={44} size={12.5} color={C.muted}>{k.s}</T>
            {k.items.map((it, j) => (
              <g key={it}>
                <circle cx={x + 18} cy={77 + j * 54} r={4} fill={k.c} />
                <foreignObject x={x + 30} y={67 + j * 54} width={w - 40} height={46}>
                  <div style={{ font: '500 13px var(--font-body)', color: 'var(--d-ink)', lineHeight: 1.25 }}>{it}</div>
                </foreignObject>
              </g>
            ))}
          </g>
        )
      })}
    </Diagram>
  )
}
