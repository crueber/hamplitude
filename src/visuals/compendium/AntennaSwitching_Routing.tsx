import { C, Diagram, Ground, Ln, T } from '../kit'

/** Two ways to switch antennas: a rotary switch in the shack, or a remote relay switch at the antennas on one coax. */
export function AntennaSwitching_Routing() {
  return (
    <Diagram w={640} h={340}
      title="Left: a switch in the shack routes one radio to any of several feed lines, with a grounded position. Right: one coax runs to a remote relay switch near the antennas, controlled by a separate cable."
      caption="The shack switch needs one feed line per antenna. The remote switch needs one coax plus a control cable.">
      <T x={20} y={20} size={14} bold>Switch in the shack</T>
      <rect x={20} y={130} width={70} height={60} rx={10} fill={C.fill} stroke={C.signal} strokeWidth={2.5} />
      <T x={55} y={160} anchor="middle" size={14} bold>Radio</T>
      <Ln x1={90} y1={160} x2={130} y2={160} color={C.ink} width={3} />
      <circle cx={140} cy={160} r={9} fill={C.bg} stroke={C.ink} strokeWidth={2.5} />
      {[0, 1, 2, 3].map((i) => {
        const y = 50 + i * 60
        const labels = ['Dipole', 'Beam', 'Vertical', 'Dummy load']
        return (
          <g key={i}>
            <Ln x1={149} y1={160} x2={200} y2={y + 14} color={i === 0 ? C.signal : C.muted} width={i === 0 ? 3.5 : 2} />
            <circle cx={204} cy={y + 14} r={5} fill={C.ink} />
            <Ln x1={209} y1={y + 14} x2={230} y2={y + 14} color={C.muted} width={2} />
            <T x={236} y={y + 14} size={13} bold color={i === 0 ? C.ink : C.muted}>{labels[i]}</T>
          </g>
        )
      })}
      <Ln x1={149} y1={160} x2={200} y2={284} color={C.muted} width={2} />
      <circle cx={204} cy={284} r={5} fill={C.ink} />
      <Ln x1={209} y1={284} x2={222} y2={284} color={C.muted} width={2} />
      <Ground x={230} y={284} />
      <T x={254} y={296} size={13} bold color={C.muted}>Grounded</T>
      <T x={254} y={314} size={12} color={C.muted}>storm / off position</T>

      <Ln x1={400} y1={20} x2={400} y2={320} color={C.fill2} width={1.5} dash="5 5" />
      <T x={420} y={20} size={14} bold>Remote switch</T>
      <rect x={420} y={140} width={64} height={52} rx={10} fill={C.fill} stroke={C.signal} strokeWidth={2.5} />
      <T x={452} y={166} anchor="middle" size={14} bold>Radio</T>
      <Ln x1={484} y1={166} x2={522} y2={166} color={C.ink} width={3} />
      <T x={503} y={150} anchor="middle" size={12} color={C.muted}>coax</T>
      <rect x={522} y={118} width={92} height={98} rx={10} fill={C.fill} stroke={C.power} strokeWidth={2.5} />
      <T x={568} y={142} anchor="middle" size={13} bold>Relay box</T>
      <T x={568} y={162} anchor="middle" size={12} color={C.muted}>at the</T>
      <T x={568} y={178} anchor="middle" size={12} color={C.muted}>antennas</T>
      <T x={568} y={200} anchor="middle" size={12} color={C.power} bold>DC control</T>
      <Ln x1={568} y1={118} x2={568} y2={74} color={C.signal} width={2.5} />
      <T x={568} y={60} anchor="middle" size={12} bold color={C.muted}>Ant 1</T>
      <Ln x1={540} y1={118} x2={540} y2={90} color={C.muted} width={2} />
      <T x={540} y={78} anchor="middle" size={12} color={C.muted}>2</T>
      <Ln x1={596} y1={118} x2={596} y2={90} color={C.muted} width={2} />
      <T x={596} y={78} anchor="middle" size={12} color={C.muted}>3</T>
      <Ln x1={452} y1={192} x2={452} y2={240} color={C.power} width={2} dash="5 4" />
      <Ln x1={452} y1={240} x2={568} y2={240} color={C.power} width={2} dash="5 4" />
      <Ln x1={568} y1={240} x2={568} y2={216} color={C.power} width={2} dash="5 4" arrow />
      <T x={420} y={268} size={12} color={C.muted}>Control cable carries the DC that</T>
      <T x={420} y={286} size={12} color={C.muted}>moves the relays. Keep it away</T>
      <T x={420} y={304} size={12} color={C.muted}>from RF and never switch live.</T>
    </Diagram>
  )
}
