import { C, Diagram, T } from '../kit'

const CLS = [{ n: 'A', c: C.muted }, { n: 'B', c: C.signal }, { n: 'C', c: C.good }, { n: 'M', c: C.resist }, { n: 'X', c: C.bad }]

/** Flare classes: each letter is 10 times stronger than the one before. X is the greatest. */
export function FlareClass() {
  return (
    <Diagram w={640} h={220} title="Solar flare classes A, B, C, M and X. Each class is ten times stronger than the one before, so X is the greatest flare intensity"
      caption="X-ray flare strength on a scale where every step is ×10.">
      {CLS.map((k, i) => {
        const h = 24 + i * 28
        const x = 40 + i * 112
        return (
          <g key={k.n}>
            <rect x={x} y={170 - h} width={96} height={h} rx={6} fill={k.c} fillOpacity={0.25} stroke={k.c} strokeWidth={2.5} />
            <T x={x + 48} y={170 - h / 2} anchor="middle" size={22} bold color={k.c}>{k.n}</T>
            {i > 0 && <T x={x - 8} y={170 - h - 14} anchor="middle" size={13} bold color={C.muted}>×10</T>}
          </g>
        )
      })}
      <T x={40} y={196} size={13} color={C.muted}>weakest</T>
      <T x={600} y={196} anchor="end" size={13} bold color={C.bad}>greatest intensity</T>
    </Diagram>
  )
}
