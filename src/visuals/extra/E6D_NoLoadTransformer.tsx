import { C, Diagram, Ln, T, Wire, Source } from '../kit'

/** Transformer with the secondary open: only a small magnetizing current flows in the primary. */
export function NoLoadTransformer() {
  const coil = (x: number) => Array.from({ length: 6 }).map((_, i) => <ellipse key={i} cx={x} cy={96 + i * 14} rx={22} ry={6} fill="none" stroke={C.current} strokeWidth={3} />)
  return (
    <Diagram w={640} h={250} title="A transformer with its secondary winding open. The primary draws only a small magnetizing current, which sets up the magnetic flux in the core. No current flows in the secondary."
      caption="No load: the primary draws just enough current to magnetize the core.">
      <rect x={230} y={60} width={190} height={150} fill="none" stroke={C.ink} strokeWidth={22} opacity={0.22} />
      <rect x={241} y={71} width={168} height={128} fill="none" stroke={C.power} strokeWidth={2.5} strokeDasharray="6 5" />
      {coil(241)}
      {coil(409)}
      <T x={325} y={134} anchor="middle" size={13} bold color={C.power}>flux in core</T>
      <Wire pts={[[100, 96], [219, 96]]} color={C.muted} width={2.5} />
      <Wire pts={[[100, 166], [219, 166]]} color={C.muted} width={2.5} />
      <Wire pts={[[100, 96], [100, 112]]} color={C.muted} width={2.5} />
      <Wire pts={[[100, 150], [100, 166]]} color={C.muted} width={2.5} />
      <Source x={100} y={131} rot={90} len={38} ac color={C.voltage} />
      <Ln x1={130} y1={80} x2={190} y2={80} color={C.current} width={2} arrow />
      <T x={160} y={64} anchor="middle" size={13} bold color={C.current}>small current</T>
      <T x={140} y={198} anchor="middle" size={13} bold color={C.current}>primary:</T>
      <T x={140} y={216} anchor="middle" size={13} bold color={C.current}>magnetizing current</T>
      <Wire pts={[[431, 96], [490, 96]]} color={C.muted} width={2.5} />
      <Wire pts={[[431, 166], [490, 166]]} color={C.muted} width={2.5} />
      <circle cx={490} cy={96} r={4} fill="none" stroke={C.ink} strokeWidth={2} />
      <circle cx={490} cy={166} r={4} fill="none" stroke={C.ink} strokeWidth={2} />
      <T x={540} y={131} anchor="middle" size={13} bold color={C.muted}>secondary open</T>
      <T x={540} y={150} anchor="middle" size={13} color={C.muted}>no load current</T>
    </Diagram>
  )
}
