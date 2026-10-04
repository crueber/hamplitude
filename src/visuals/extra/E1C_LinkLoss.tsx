import { C, Diagram, Ln, T } from '../kit'

/** Remote control: if the control link fails, the station must be off the air within 3 minutes. */
export function E1C_LinkLoss() {
  const x0 = 40, x1 = 600, px = (m: number) => x0 + (m / 5) * (x1 - x0)
  return (
    <Diagram w={640} h={200} title="Timeline of a remotely controlled station. When the control link malfunctions, the station may keep transmitting for at most 3 minutes." caption="Link fails at 0. Transmissions must end within 3 minutes.">
      <rect x={x0} y={70} width={px(3) - x0} height={26} fill={C.resist} fillOpacity={0.35} stroke={C.resist} strokeWidth={2} />
      <rect x={px(3)} y={70} width={x1 - px(3)} height={26} fill={C.bad} fillOpacity={0.15} stroke={C.bad} strokeWidth={2} strokeDasharray="5 4" />
      <T x={(x0 + px(3)) / 2} y={83} anchor="middle" bold size={14}>may still transmit</T>
      <T x={(px(3) + x1) / 2} y={83} anchor="middle" bold size={14} color={C.bad}>must be off</T>
      <Ln x1={x0} y1={50} x2={x0} y2={112} color={C.bad} width={3} />
      <T x={x0} y={34} bold size={14} color={C.bad}>control link fails</T>
      <Ln x1={px(3)} y1={50} x2={px(3)} y2={112} color={C.ink} width={3} />
      <T x={px(3)} y={34} anchor="middle" bold size={14}>3 minutes</T>
      {[0, 1, 2, 3, 4, 5].map((m) => (
        <g key={m}>
          <Ln x1={px(m)} y1={124} x2={px(m)} y2={132} color={C.muted} width={2} />
          <T x={px(m)} y={148} anchor="middle" size={12} color={C.muted}>{m}</T>
        </g>
      ))}
      <T x={320} y={176} anchor="middle" size={13} color={C.muted}>minutes after the control link fails</T>
    </Diagram>
  )
}
