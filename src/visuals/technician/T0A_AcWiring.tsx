import { C, Diagram, Fuse, Lamp, Ln, T } from '../kit'

/** 120 V AC: black = hot, white = neutral, green = equipment ground. The fuse/breaker goes in series with the hot wire only. */
export function AcWiring() {
  const yH = 80, yN = 190, yG = 262
  return (
    <Diagram w={640} h={300} title="120 volt AC wiring: black is hot with the fuse or breaker in series, white is neutral, green is the equipment ground. The fuse goes in the hot wire only"
      caption="Break the hot wire and the whole circuit is dead. The fuse protects the wire and the equipment.">
      <rect x={20} y={yH} width={70} height={yN - yH} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2.5} />
      <T x={55} y={(yH + yN) / 2} anchor="middle" size={14} bold>120 V</T>
      <T x={55} y={(yH + yN) / 2 + 20} anchor="middle" size={12} color={C.muted}>AC supply</T>

      <Ln x1={90} y1={yH} x2={200} y2={yH} color={C.ink} width={5} />
      <Fuse x={250} y={yH} len={100} color={C.bad} />
      <Ln x1={300} y1={yH} x2={500} y2={yH} color={C.ink} width={5} />
      <T x={250} y={yH - 34} anchor="middle" size={13} bold color={C.bad}>fuse or breaker</T>
      <T x={250} y={yH - 18} anchor="middle" size={12} color={C.muted}>in series</T>
      <T x={120} y={yH - 16} size={13} bold>HOT: black</T>

      <Ln x1={90} y1={yN} x2={500} y2={yN} color={C.muted} width={5} />
      <T x={120} y={yN + 18} size={13} bold color={C.muted}>NEUTRAL: white</T>

      <rect x={500} y={yH} width={110} height={yN - yH} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2.5} />
      <Lamp x={555} y={(yH + yN) / 2 - 8} len={28} />
      <T x={555} y={(yH + yN) / 2 + 28} anchor="middle" size={13} bold>Equipment</T>

      <Ln x1={90} y1={yG} x2={555} y2={yG} color={C.good} width={5} dash="10 6" />
      <Ln x1={555} y1={yG} x2={555} y2={yN} color={C.good} width={5} dash="10 6" />
      <T x={120} y={yG - 16} size={13} bold color={C.good}>GROUND: green (safety only, no current normally)</T>
    </Diagram>
  )
}
