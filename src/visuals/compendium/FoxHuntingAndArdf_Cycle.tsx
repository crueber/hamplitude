import { C, Diagram, Ln, T } from '../kit'

const FOXES = ['Fox 1', 'Fox 2', 'Fox 3', 'Fox 4', 'Fox 5']

/** A typical classic-format ARDF transmit cycle: each fox sends for a minute in turn, then the cycle repeats. */
export function FoxHuntingAndArdf_Cycle() {
  const x0 = 100, x1 = 620, px = (m: number) => x0 + (m / 10) * (x1 - x0)
  const rowH = 34, y0 = 34
  return (
    <Diagram w={640} h={278}
      title="A typical ARDF transmit schedule: five foxes, each transmitting for one minute in turn during a five-minute cycle, repeating throughout the competition"
      caption="Typical classic-format schedule (rules vary): only one fox is on at a time, so you hunt each one in its own minute.">
      <T x={x0} y={14} size={12} color={C.muted}>minutes</T>
      {FOXES.map((f, i) => {
        const y = y0 + i * rowH
        return (
          <g key={f}>
            <T x={x0 - 10} y={y + 14} anchor="end" size={13} bold>{f}</T>
            <rect x={x0} y={y} width={x1 - x0} height={28} rx={6} fill={C.fill} />
            {[0, 5].map((c) => (
              <g key={c}>
                <rect x={px(c + i)} y={y} width={px(1) - x0} height={28} rx={6} fill={C.signal} fillOpacity={0.35} stroke={C.signal} strokeWidth={2} />
                <T x={px(c + i) + (px(1) - x0) / 2} y={y + 14} anchor="middle" size={12} bold>on</T>
              </g>
            ))}
          </g>
        )
      })}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((m) => (
        <g key={m}>
          <Ln x1={px(m)} y1={y0 + 5 * rowH + 2} x2={px(m)} y2={y0 + 5 * rowH + 9} color={C.muted} width={1.5} />
          <T x={px(m)} y={y0 + 5 * rowH + 22} anchor="middle" size={12} color={C.muted}>{m}</T>
        </g>
      ))}
      <Ln x1={px(5)} y1={y0 - 6} x2={px(5)} y2={y0 + 5 * rowH} color={C.ink} width={1.5} dash="4 4" />
      <T x={px(2.5)} y={y0 + 5 * rowH + 44} anchor="middle" size={13} bold color={C.muted}>one 5-minute cycle</T>
      <T x={px(7.5)} y={y0 + 5 * rowH + 44} anchor="middle" size={13} bold color={C.muted}>repeats</T>
    </Diagram>
  )
}
