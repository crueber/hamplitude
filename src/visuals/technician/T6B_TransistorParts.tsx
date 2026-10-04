import { C, Diagram, T, Transistor } from '../kit'

/** The two transistor families and their electrode names. */
export function TransistorParts() {
  const blocks: { x: number; w: number; n: string; col: string; part: string }[] = [
    { x: 30, w: 80, n: 'N', col: C.signal, part: 'emitter' },
    { x: 110, w: 40, n: 'P', col: C.power, part: 'base' },
    { x: 150, w: 80, n: 'N', col: C.signal, part: 'collector' },
  ]
  return (
    <Diagram w={640} h={330} title="Left: a bipolar junction transistor is a three-layer sandwich with emitter, base and collector. Right: a field-effect transistor has a gate, a drain and a source."
      caption="Both have three terminals, and one of them controls the current between the other two.">
      <line x1={320} y1={14} x2={320} y2={312} stroke={C.fill2} strokeWidth={2} strokeDasharray="4 5" />

      <T x={130} y={24} anchor="middle" bold size={16}>Bipolar junction (BJT)</T>
      {blocks.map((b) => (
        <g key={b.part}>
          <rect x={b.x} y={52} width={b.w} height={44} fill={b.col} fillOpacity={0.22} stroke={b.col} strokeWidth={2} />
          <T x={b.x + b.w / 2} y={74} anchor="middle" bold size={18} color={b.col}>{b.n}</T>
          <T x={b.x + b.w / 2} y={112} anchor="middle" size={13} bold>{b.part}</T>
        </g>
      ))}
      <T x={130} y={140} anchor="middle" size={13} color={C.muted}>three regions of semiconductor</T>
      <g transform="translate(140,238) scale(1.1)"><Transistor x={0} y={0} kind="npn" parts /></g>
      <T x={130} y={316} anchor="middle" size={13} bold color={C.muted}>B = base · C = collector · E = emitter</T>

      <T x={480} y={24} anchor="middle" bold size={16}>Field-effect (FET)</T>
      <T x={480} y={118} anchor="middle" size={14}>voltage on the gate controls</T>
      <T x={480} y={138} anchor="middle" size={14}>current from drain to source</T>
      <g transform="translate(480,238) scale(1.1)" stroke={C.ink} strokeWidth={2.2} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx={6} cy={0} r={34} strokeWidth={1.6} opacity={0.6} />
        <line x1={-36} y1={0} x2={-6} y2={0} markerEnd="url(#hx-arrow)" />
        <line x1={0} y1={-24} x2={0} y2={24} strokeWidth={3.5} />
        <polyline points="0,-20 20,-20 20,-40" />
        <polyline points="0,20 20,20 20,40" />
        <g stroke="none" fill={C.muted} fontSize={12} fontWeight={700} style={{ fontFamily: 'var(--font-body)' }}>
          <text x={-50} y={-6}>G</text>
          <text x={26} y={-34}>D</text>
          <text x={26} y={46}>S</text>
        </g>
      </g>
      <T x={480} y={316} anchor="middle" size={13} bold color={C.muted}>G = gate · D = drain · S = source</T>
    </Diagram>
  )
}
