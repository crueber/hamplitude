import { C, Diagram, Ln, T } from '../kit'

/** Three one-support wire antennas: a sloper, a half-sloper that uses a metal tower, and an inverted L over radials. */
export function SlopersAndInvertedL_Layouts() {
  const gy = 262
  const ground = (x: number, w: number) => <rect x={x} y={gy} width={w} height={5} fill={C.fill2} />
  const feed = (x: number, y: number) => <circle cx={x} cy={y} r={6} fill={C.bg} stroke={C.power} strokeWidth={3} />
  return (
    <Diagram w={640} h={360}
      title="Three wire antennas that need only one support. A sloper: a wire running diagonally down from the top of a mast, fed in the middle. A half-sloper: a quarter-wave wire fed at the top of a metal tower. An inverted L: a vertical wire that bends into a horizontal section, fed at the base over radials."
      caption="Illustrative layouts. Each has its own feed arrangement; the supports and ground shape the pattern.">
      {/* sloper */}
      <T x={105} y={20} anchor="middle" size={14} bold>Sloper</T>
      <Ln x1={32} y1={44} x2={32} y2={gy} color={C.muted} width={6} />
      <Ln x1={32} y1={52} x2={172} y2={228} color={C.resist} width={4.5} />
      {feed(102, 140)}
      <Ln x1={108} y1={146} x2={150} y2={gy - 12} color={C.signal} width={3} />
      <T x={116} y={128} size={13} bold color={C.power}>feed</T>
      <T x={12} y={gy + 28} size={12} color={C.muted}>dipole hung from one support;</T>
      <T x={12} y={gy + 46} size={12} color={C.muted}>lower end stays clear of people</T>
      {ground(0, 200)}
      {/* half sloper */}
      <T x={320} y={20} anchor="middle" size={14} bold>Half-sloper</T>
      <Ln x1={252} y1={44} x2={252} y2={gy} color={C.ink} width={8} />
      <Ln x1={258} y1={56} x2={378} y2={220} color={C.resist} width={4.5} />
      {feed(256, 56)}
      <Ln x1={264} y1={62} x2={264} y2={gy - 2} color={C.signal} width={3} />
      <Ln x1={264} y1={gy - 2} x2={310} y2={gy - 2} color={C.signal} width={3} />
      <T x={274} y={150} size={12} color={C.signal} bold>coax</T>
      <T x={268} y={42} size={13} bold color={C.power}>feed</T>
      <T x={274} y={196} size={12} color={C.muted}>metal tower</T>
      <T x={274} y={214} size={12} color={C.muted}>as other half</T>
      <T x={216} y={gy + 28} size={12} color={C.muted}>quarter-wave wire; shield to</T>
      <T x={216} y={gy + 46} size={12} color={C.muted}>the tower, center to the wire</T>
      {ground(210, 190)}
      {/* inverted L */}
      <T x={535} y={20} anchor="middle" size={14} bold>Inverted L</T>
      <Ln x1={470} y1={gy - 6} x2={470} y2={90} color={C.resist} width={4.5} />
      <Ln x1={470} y1={90} x2={610} y2={106} color={C.resist} width={4.5} />
      <circle cx={610} cy={106} r={4.5} fill={C.bg} stroke={C.muted} strokeWidth={2.5} />
      {feed(470, gy - 6)}
      <Ln x1={470} y1={gy} x2={418} y2={gy + 20} color={C.good} width={3} />
      <Ln x1={470} y1={gy} x2={470} y2={gy + 26} color={C.good} width={3} />
      <Ln x1={470} y1={gy} x2={530} y2={gy + 20} color={C.good} width={3} />
      <Ln x1={470} y1={gy} x2={594} y2={gy + 16} color={C.good} width={3} />
      <T x={484} y={170} size={13} bold color={C.resist}>vertical part</T>
      <T x={540} y={74} anchor="middle" size={13} bold color={C.resist}>horizontal part</T>
      <T x={470} y={gy + 40} anchor="middle" size={13} bold color={C.good}>radials</T>
      <T x={412} y={gy + 64} size={12} color={C.muted}>about ¼ λ of wire in all</T>
      {ground(410, 230)}
    </Diagram>
  )
}
