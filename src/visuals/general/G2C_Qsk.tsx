import { C, Diagram, Ln, T } from '../kit'

/** Full break-in (QSK): the receiver is live in the gaps between dits and dahs. */
export function G2C_Qsk() {
  const els: [number, number][] = [[150, 24], [196, 64], [282, 24], [328, 24], [374, 64]]
  const gaps: [number, number][] = [[174, 22], [260, 22], [306, 22], [352, 22]]
  const lane = (y: number, label: string, sub: string, col: string, full: boolean) => (
    <g>
      <T x={14} y={y - 8} size={15} bold color={col}>{label}</T>
      <T x={14} y={y + 12} size={12.5} color={C.muted}>{sub}</T>
      <Ln x1={150} y1={y + 20} x2={446} y2={y + 20} color={C.fill2} width={1.5} />
      {els.map(([x, w], i) => <rect key={i} x={x} y={y - 6} width={w} height={22} rx={4} fill={C.resist} fillOpacity={0.55} stroke={C.resist} strokeWidth={2} />)}
      {full
        ? gaps.map(([x, w], i) => (
            <g key={i}>
              <rect x={x + 1} y={y - 6} width={w - 2} height={22} rx={4} fill={C.signal} fillOpacity={0.3} stroke={C.signal} strokeWidth={2} />
              <T x={x + w / 2} y={y + 5} anchor="middle" size={12} bold color={C.signal}>RX</T>
            </g>
          ))
        : <Ln x1={150} y1={y - 16} x2={446} y2={y - 16} color={C.bad} width={3} />}
    </g>
  )
  return (
    <Diagram w={640} h={214} title="Full break-in, QSK: the transmitter keys on for each dit and dah, and the receiver listens in the tiny gaps between characters and elements. With a manual send and receive switch you hear nothing until you switch back" caption="QSK = you can hear the other station between your own dits and dahs.">
      {lane(40, 'Full break-in', 'QSK', C.signal, true)}
      <T x={462} y={34} size={13} bold color={C.signal}>hears</T>
      <T x={462} y={52} size={13} bold color={C.signal}>between</T>
      {lane(130, 'Manual switch', 'send / receive', C.muted, false)}
      <T x={462} y={124} size={13} bold color={C.bad}>deaf</T>
      <T x={462} y={142} size={13} bold color={C.bad}>until flipped</T>
      <T x={14} y={190} size={12.5} color={C.muted}>Amber blocks = key down (transmitting).</T>
    </Diagram>
  )
}
