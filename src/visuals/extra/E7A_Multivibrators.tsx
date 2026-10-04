import { C, Diagram, Ln, T } from '../kit'

/** Bistable, monostable and astable: how each one behaves over time. */
export function Multivibrators() {
  const x0 = 200, x1 = 620
  const rows = [
    { name: 'Bistable', sub: 'flip-flop', col: C.signal, y: 80, pts: [[0, 0], [60, 0], [60, 1], [190, 1], [190, 0], [300, 0], [300, 1], [420, 1]], trig: [60, 190, 300], note: 'stays in either state until triggered' },
    { name: 'Monostable', sub: 'one-shot', col: C.power, y: 180, pts: [[0, 0], [90, 0], [90, 1], [160, 1], [160, 0], [280, 0], [280, 1], [350, 1], [350, 0], [420, 0]], trig: [90, 280], note: 'trigger gives a pulse of set length, then it returns' },
    { name: 'Astable', sub: 'oscillator', col: C.good, y: 280, pts: [[0, 0], [50, 0], [50, 1], [110, 1], [110, 0], [170, 0], [170, 1], [230, 1], [230, 0], [290, 0], [290, 1], [350, 1], [350, 0], [420, 0]], trig: [], note: 'no trigger: it keeps switching by itself' },
  ]
  return (
    <Diagram w={640} h={350} title="Timing of three multivibrators. A bistable flips state on each trigger and stays. A monostable makes one pulse of fixed length per trigger. An astable switches back and forth continuously with no trigger."
      caption="Bi = two stable states. Mono = one stable state. A = none: it free-runs.">
      {rows.map((r) => {
        const sx = (t: number) => x0 + (t * (x1 - x0)) / 420
        const lo = r.y + 18, hi = r.y - 18
        return (
          <g key={r.name}>
            <T x={14} y={r.y - 8} size={15} bold color={r.col}>{r.name}</T>
            <T x={14} y={r.y + 12} size={12} color={C.muted}>{r.sub}</T>
            <Ln x1={x0} y1={lo} x2={x1} y2={lo} color={C.fill2} width={1} dash="3 4" />
            {r.trig.map((t) => <Ln key={t} x1={sx(t)} y1={r.y - 38} x2={sx(t)} y2={r.y - 24} color={C.resist} width={3} arrow />)}
            <polyline points={r.pts.map(([t, v]) => `${sx(t)},${v ? hi : lo}`).join(' ')} fill="none" stroke={r.col} strokeWidth={3.5} strokeLinejoin="round" />
            <T x={x0} y={r.y + 44} size={13} color={C.muted}>{r.note}</T>
          </g>
        )
      })}
      <T x={x1} y={22} anchor="end" size={12} bold color={C.resist}>↓ trigger</T>
    </Diagram>
  )
}
