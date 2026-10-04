import { C, Diagram, T } from '../kit'

const CARDS = [
  { t: 'Sequential', s: 'the default', c: C.signal,
    rows: [['Who', 'every new licensee'], ['How', 'the FCC assigns the next call in line'], ['Lasts', 'as long as you keep it']] },
  { t: 'Vanity', s: 'your choice', c: C.resist,
    rows: [['Who', 'any licensed amateur'], ['How', 'you apply to the FCC with a ranked list'], ['Lasts', 'as long as you keep it']] },
  { t: 'Special event', s: 'temporary', c: C.power,
    rows: [['Who', 'a group marking an event'], ['How', 'short 1×1 calls from a coordinated program'], ['Lasts', 'days, not years']] },
]

/** Three ways to hold a call sign: sequential, vanity and special event. */
export function VanityAndSpecialEventCalls_Routes() {
  const w = 204, gap = 12
  return (
    <Diagram w={640} h={268} title="Three ways to get a call sign. Sequential: the FCC assigns the next call to every new licensee. Vanity: any licensed amateur may request a call of their choice. Special event: a group applies for a short temporary call for an event"
      caption="Details such as fees and waiting periods are set by the FCC and can change.">
      {CARDS.map((k, i) => {
        const x = 2 + i * (w + gap)
        return (
          <g key={k.t}>
            <rect x={x} y={6} width={w} height={254} rx={12} fill={C.fill} stroke={k.c} strokeWidth={2.4} />
            <path d={`M${x},${(6)+54} V${(6)+12} a12,12 0 0 1 12,-12 H${(x)+w-12} a12,12 0 0 1 12,12 V${(6)+54} Z`} fill={k.c} fillOpacity={0.22} />
            <T x={x + 14} y={26} size={16} bold>{k.t}</T>
            <T x={x + 14} y={46} size={12.5} color={C.muted}>{k.s}</T>
            {k.rows.map(([a, b], j) => {
              const y = 82 + j * 62
              return (
                <g key={a}>
                  <T x={x + 14} y={y} size={12.5} bold color={k.c}>{a.toUpperCase()}</T>
                  <foreignObject x={x + 14} y={y + 8} width={w - 26} height={42}>
                    <div style={{ font: '500 13px var(--font-body)', color: 'var(--d-ink)', lineHeight: 1.25 }}>{b}</div>
                  </foreignObject>
                </g>
              )
            })}
          </g>
        )
      })}
    </Diagram>
  )
}
