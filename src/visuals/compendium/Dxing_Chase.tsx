import { C, Diagram, T } from '../kit'

const STEPS = [
  { h: 'Find', d: 'A spot or a quiet scan shows a station you need.', tag: 'DX cluster, RBN, tuning the band', c: C.signal },
  { h: 'Check the path', d: 'Is the band open toward them at this hour?', tag: 'Propagation, grey line', c: C.current },
  { h: 'Listen', d: 'Hear how they work: callers, split, who they pick.', tag: 'Patience before power', c: C.power },
  { h: 'Call', d: 'Short and clean, then listen for your own call.', tag: 'Full call sign, once or twice', c: C.resist },
  { h: 'Confirm', d: 'Log it exactly, then confirm for the award record.', tag: 'LoTW, QSL card', c: C.good },
]

/** The five steps of a DX chase, each with the tool or habit that goes with it. */
export function Dxing_Chase() {
  const rh = 62
  return (
    <Diagram w={640} h={STEPS.length * rh + 14}
      title="The five steps of chasing a DX station: find it, check the path, listen to how it works, call, then confirm the contact"
      caption="The same loop applies to a rare expedition and to a station you simply have not worked before.">
      {STEPS.map((s, i) => {
        const y = 8 + i * rh
        return (
          <g key={s.h}>
            <rect x={10} y={y} width={620} height={rh - 8} rx={10} fill={C.fill} stroke={s.c} strokeWidth={1.8} />
            <circle cx={38} cy={y + (rh - 8) / 2} r={14} fill={s.c} />
            <T x={38} y={y + (rh - 8) / 2} anchor="middle" size={14} bold color={C.bg}>{i + 1}</T>
            <T x={64} y={y + 17} size={14.5} bold color={s.c}>{s.h}</T>
            <T x={64} y={y + 38} size={12.5}>{s.d}</T>
            <T x={620} y={y + 17} anchor="end" size={12.5} color={C.muted}>{s.tag}</T>
          </g>
        )
      })}
    </Diagram>
  )
}
