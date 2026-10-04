import { C, Diagram, Lines, T } from '../kit'

const PURPOSES = [
  { n: 'Emergency communications', d: ['A voluntary, noncommercial', 'service the public can rely on'], c: C.bad },
  { n: 'Advance the radio art', d: ['Experimenting, building and', 'inventing new techniques'], c: C.signal },
  { n: 'Build communication and technical skills', d: ['Operating skill and', 'electronics know-how'], c: C.current },
  { n: 'Grow a pool of trained people', d: ['Operators, technicians and', 'electronics experts'], c: C.resist },
  { n: 'International goodwill', d: ['Friendly contact across', 'borders and cultures'], c: C.power },
]

/** The five purposes of the amateur service, as stated in the FCC rules (Part 97.1). */
export function WhatIsAmateurRadio_Purposes() {
  return (
    <Diagram w={640} h={330} title="The five purposes of the amateur radio service: emergency communications, advancing the radio art, building skills, growing a pool of trained people, and international goodwill"
      caption="The five purposes of the service, paraphrasing the FCC's “Basis and Purpose” rule (47 CFR 97.1).">
      <T x={320} y={22} anchor="middle" size={15} bold>Why the service exists</T>
      {PURPOSES.map((p, i) => {
        const col = i % 3, row = Math.floor(i / 3)
        const w = 196, x = row === 0 ? 14 + col * (w + 12) : 14 + w / 2 + 6 + col * (w + 12)
        const y = 44 + row * 140
        return (
          <g key={p.n}>
            <rect x={x} y={y} width={w} height={124} rx={14} fill={C.fill} stroke={p.c} strokeWidth={2.2} />
            <circle cx={x + 24} cy={y + 26} r={13} fill={p.c} />
            <T x={x + 24} y={y + 26} anchor="middle" size={14} bold color={C.bg}>{i + 1}</T>
            <foreignObject x={x + 44} y={y + 10} width={w - 54} height={46}>
              <div style={{ font: '700 13px var(--font-body)', color: 'var(--d-ink)', lineHeight: 1.2 }}>{p.n}</div>
            </foreignObject>
            <Lines x={x + 14} y={y + 76} lines={p.d} lh={19} size={12.5} color={C.muted} />
          </g>
        )
      })}
    </Diagram>
  )
}
