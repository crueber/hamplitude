import { Box, C, Diagram, Ln, T } from '../kit'

const COLS = [
  { x: 10, head: 'Safety (fault)', col: C.good, lines: ['A fault gets an easy path', 'back to the panel, so the', 'breaker trips and the case', 'never stays live.'] },
  { x: 224, head: 'Lightning', col: C.resist, lines: ['A path to earth for a surge.', 'Every ground is bonded, so', 'no point rises far above', 'the others.'] },
  { x: 438, head: 'RF', col: C.signal, lines: ['A short, low-impedance', 'return keeps RF off cases', 'and cables. Wire length', 'matters.'] },
]

/** The three jobs a ground connection does. */
export function GroundingAndBonding_Purposes() {
  return (
    <Diagram w={640} h={340}
      title="Three different jobs for grounding. Safety ground: a fault current path from the radio case back to the panel so the breaker trips. Lightning ground: a path from the antenna mast to bonded ground rods in the earth. RF ground: a short wide strap from the radio chassis to a ground bar."
      caption="Three jobs, three demands: a fault path, a surge path and a low-impedance RF return.">
      {COLS.map((c) => (
        <g key={c.head}>
          <rect x={c.x} y={12} width={192} height={256} rx={10} fill="none" stroke={c.col} strokeWidth={2} />
          <T x={c.x + 96} y={32} anchor="middle" size={15} bold color={c.col}>{c.head}</T>
          {c.lines.map((l, i) => (
            <T key={l} x={c.x + 96} y={206 + i * 16.5} anchor="middle" size={12.5}>{l}</T>
          ))}
        </g>
      ))}
      {/* 1: safety */}
      <Box x={22} y={96} w={74} h={46} label="radio" sub="metal case" size={13} />
      <Ln x1={34} y1={62} x2={54} y2={96} color={C.voltage} width={3.5} />
      <T x={20} y={52} size={12.5} bold color={C.voltage}>fault: hot wire on case</T>
      <Ln x1={96} y1={126} x2={140} y2={126} color={C.good} width={4} />
      <Box x={140} y={96} w={52} h={64} label="panel" sub="breaker" size={13} />
      <Ln x1={166} y1={160} x2={166} y2={176} color={C.bad} width={3} />
      <T x={150} y={170} anchor="end" size={12.5} bold color={C.bad}>trips</T>
      {/* 2: lightning */}
      <path d="M312,50 L304,66 L314,66 L306,82" fill="none" stroke={C.resist} strokeWidth={3.5} strokeLinejoin="round" strokeLinecap="round" />
      <Ln x1={306} y1={82} x2={306} y2={134} color={C.ink} width={4} />
      <Ln x1={290} y1={82} x2={322} y2={82} color={C.signal} width={4} />
      <Ln x1={256} y1={134} x2={374} y2={134} color={C.resist} width={4} />
      <Ln x1={262} y1={134} x2={262} y2={170} color={C.ink} width={5} />
      <Ln x1={368} y1={134} x2={368} y2={170} color={C.ink} width={5} />
      <T x={315} y={152} anchor="middle" size={12.5} color={C.muted}>bonded rods</T>
      {/* 3: RF */}
      <Box x={448} y={90} w={74} h={50} label="radio" sub="chassis" size={13} />
      <Ln x1={522} y1={106} x2={574} y2={106} color={C.signal} width={3} />
      <T x={574} y={96} anchor="end" size={12.5} color={C.muted}>coax</T>
      <rect x={470} y={140} width={30} height={20} rx={2} fill={C.signal} fillOpacity={0.4} stroke={C.signal} strokeWidth={2} />
      <T x={515} y={150} size={12.5} bold color={C.signal}>short strap</T>
      <Ln x1={440} y1={168} x2={580} y2={168} color={C.ink} width={5} />
      <T x={510} y={182} anchor="middle" size={12.5} color={C.muted}>ground bar</T>
      <T x={320} y={290} anchor="middle" size={14} bold>One bonded system serves all three jobs</T>
      <T x={320} y={314} anchor="middle" size={13} color={C.muted}>Bond separate grounds together, and follow your local electrical code.</T>
    </Diagram>
  )
}
