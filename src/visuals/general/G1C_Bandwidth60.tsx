import { C, Diagram, Ln, T } from '../kit'

/** 60 m USB signal: 2.8 kHz bandwidth maximum. */
export function G1C_Bandwidth60() {
  const x0 = 24
  const sc = 160 // px per kHz
  const x = (k: number) => x0 + k * sc
  return (
    <Diagram w={640} h={220} title="On 60 meters a USB signal may occupy at most 2.8 kilohertz of bandwidth; for non-dipole antennas you must keep a record of the antenna gain" caption="Occupied bandwidth of a USB voice signal on the 60 m band, kHz.">
      <rect x={x(0)} y={46} width={2.8 * sc} height={64} fill={C.signal} fillOpacity={0.25} stroke={C.signal} strokeWidth={2} />
      <T x={x(1.4)} y={78} anchor="middle" bold size={16}>USB signal</T>
      <Ln x1={x0} y1={124} x2={x(3.5)} y2={124} color={C.muted} width={2} />
      {[0, 1, 2, 3].map((k) => (
        <g key={k}>
          <Ln x1={x(k)} y1={118} x2={x(k)} y2={130} color={C.muted} width={2} />
          <T x={x(k)} y={144} anchor="middle" size={12} mono color={C.muted}>{k}</T>
        </g>
      ))}
      <Ln x1={x(2.8)} y1={34} x2={x(2.8)} y2={120} color={C.bad} width={3} dash="6 4" />
      <T x={x(2.8) + 10} y={46} bold size={15} color={C.bad}>2.8 kHz limit</T>
      <T x={x(2.8) + 10} y={66} size={13} color={C.muted}>3 kHz is too wide</T>
      <rect x={20} y={170} width={600} height={40} rx={8} fill={C.fill} stroke={C.resist} strokeWidth={2} />
      <T x={320} y={190} anchor="middle" size={14} bold>Antenna is not a dipole? Keep a record of its gain.</T>
    </Diagram>
  )
}
