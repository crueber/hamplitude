import { C, Diagram, Ln, T } from '../kit'

/** U/V mode: the first letter is the uplink band, the second the downlink band. */
export function UVMode() {
  const sat = (x: number, y: number) => (
    <g transform={`translate(${x},${y})`}>
      <rect x={-18} y={-13} width={36} height={26} rx={5} fill={C.power} stroke={C.bg} strokeWidth={3} />
      <rect x={-62} y={-6} width={38} height={12} fill={C.signal} />
      <rect x={24} y={-6} width={38} height={12} fill={C.signal} />
    </g>
  )
  return (
    <Diagram w={640} h={290} title="U/V mode: you transmit up to the satellite on the 70 centimeter UHF band, and the satellite transmits down to you on the 2 meter VHF band" caption="Mode name = uplink band / downlink band.">
      {sat(320, 50)}
      <T x={320} y={90} anchor="middle" size={13} color={C.muted}>satellite</T>
      <Ln x1={190} y1={196} x2={282} y2={90} color={C.voltage} width={4} arrow />
      <Ln x1={358} y1={90} x2={450} y2={196} color={C.current} width={4} arrow />
      <T x={150} y={130} anchor="middle" size={14} bold color={C.voltage}>UPLINK</T>
      <T x={150} y={152} anchor="middle" size={13} color={C.muted}>you → satellite</T>
      <T x={150} y={172} anchor="middle" size={14} bold color={C.voltage}>70 cm (U)</T>
      <T x={490} y={130} anchor="middle" size={14} bold color={C.current}>DOWNLINK</T>
      <T x={490} y={152} anchor="middle" size={13} color={C.muted}>satellite → you</T>
      <T x={490} y={172} anchor="middle" size={14} bold color={C.current}>2 m (V)</T>
      <rect x={250} y={196} width={140} height={44} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <T x={320} y={218} anchor="middle" size={20} bold mono>U/V</T>
      <T x={320} y={262} anchor="middle" size={13} color={C.muted}>U = UHF (70 cm) · V = VHF (2 m)</T>
    </Diagram>
  )
}
