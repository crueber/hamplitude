import { C, Diagram, Ln, T } from '../kit'

function Panel({ x0, storm }: { x0: number; storm: boolean }) {
  const X = (v: number) => x0 + v
  const col = storm ? C.good : C.ink
  return (
    <g>
      <rect x={x0} y={36} width={300} height={240} rx={10} fill="none" stroke={storm ? C.good : C.muted} strokeWidth={2} />
      <T x={X(150)} y={54} anchor="middle" size={14} bold color={storm ? C.good : C.ink}>{storm ? 'Storm approaching: disconnected' : 'Normal operation'}</T>
      {/* outside / inside */}
      <T x={X(84)} y={122} anchor="middle" size={12} color={C.muted}>outside</T>
      <T x={X(214)} y={122} anchor="middle" size={12} color={C.muted}>inside</T>
      <rect x={X(128)} y={96} width={8} height={136} fill={C.fill2} stroke={C.muted} strokeWidth={1.5} />
      <Ln x1={X(8)} y1={232} x2={X(292)} y2={232} color={C.muted} width={2} />
      {/* antenna on mast */}
      <Ln x1={X(36)} y1={96} x2={X(36)} y2={200} color={C.ink} width={3} />
      <Ln x1={X(14)} y1={96} x2={X(58)} y2={96} color={C.signal} width={4} />
      <T x={X(36)} y={80} anchor="middle" size={12.5} bold color={C.signal}>antenna</T>
      {/* coax outside to entry panel */}
      <Ln x1={X(36)} y1={200} x2={X(92)} y2={200} color={C.ink} width={3} />
      <rect x={X(92)} y={184} width={36} height={32} rx={4} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <T x={X(110)} y={172} anchor="middle" size={12.5} bold>arrester</T>
      <Ln x1={X(110)} y1={216} x2={X(110)} y2={258} color={C.ink} width={4} />
      <T x={X(100)} y={246} anchor="end" size={12.5} color={C.muted}>ground rod</T>
      {/* coax inside */}
      <Ln x1={X(128)} y1={200} x2={X(storm ? 150 : 180)} y2={200} color={col} width={3} />
      {storm && (
        <>
          <Ln x1={X(158)} y1={192} x2={X(168)} y2={208} color={C.bad} width={2.5} />
          <Ln x1={X(168)} y1={192} x2={X(158)} y2={208} color={C.bad} width={2.5} />
          <T x={X(206)} y={172} anchor="middle" size={12.5} bold color={C.good}>coax unplugged</T>
        </>
      )}
      {/* radio */}
      <rect x={X(180)} y={186} width={70} height={40} rx={5} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <T x={X(215)} y={206} anchor="middle" size={13} bold>radio</T>
      {/* power cord */}
      <Ln x1={X(215)} y1={226} x2={X(215)} y2={244} color={col} width={3} />
      <Ln x1={X(215)} y1={244} x2={X(storm ? 240 : 278)} y2={244} color={col} width={3} />
      <rect x={X(278)} y={232} width={14} height={24} rx={3} fill={C.fill2} stroke={C.ink} strokeWidth={2} />
      {storm && (
        <>
          <Ln x1={X(248)} y1={236} x2={X(258)} y2={252} color={C.bad} width={2.5} />
          <Ln x1={X(258)} y1={236} x2={X(248)} y2={252} color={C.bad} width={2.5} />
          <T x={X(214)} y={266} anchor="middle" size={12.5} bold color={C.good}>power unplugged</T>
        </>
      )}
      {storm && <path d={`M${X(268)},62 L${X(260)},82 L${X(270)},82 L${X(262)},100`} fill="none" stroke={C.resist} strokeWidth={3.5} strokeLinejoin="round" strokeLinecap="round" />}
    </g>
  )
}

/** The station in use, and the same station with the coax and power cord unplugged for a storm. */
export function LightningSafety_Disconnect() {
  return (
    <Diagram w={640} h={336}
      title="Two views of the same station. In normal operation the antenna coax runs through a grounded arrester to the radio, which is plugged in. When a storm approaches, the coax is unplugged from the radio and the power cord is pulled from the wall."
      caption="Disconnecting is the most dependable protection. An arrester and good grounding reduce the damage but cannot make a station lightning-proof.">
      <Panel x0={10} storm={false} />
      <Panel x0={330} storm />
      <T x={320} y={296} anchor="middle" size={13} color={C.muted}>Unplug before the storm arrives, never during it, and leave both ends clear of the equipment.</T>
      <T x={320} y={316} anchor="middle" size={13} color={C.muted}>Do not go outside or touch cables once thunder is audible.</T>
    </Diagram>
  )
}
