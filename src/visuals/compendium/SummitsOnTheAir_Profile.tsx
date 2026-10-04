import { C, Diagram, Ln, T } from '../kit'

/** A summit activation: a lightweight station on a peak reaches nearby chasers by line of sight and distant ones by HF skywave. */
export function SummitsOnTheAir_Profile() {
  return (
    <Diagram w={640} h={300}
      title="A summit activation in side view: a station with a light antenna on a mountain top. Nearby chasers on lower ground are reached by VHF line of sight, which height helps. Distant chasers are reached by HF signals refracted by the ionosphere. The hike up and down is part of the activity."
      caption="Illustrative. The altitude gives line-of-sight reach; the weather and daylight limit your time.">
      {/* ionosphere */}
      <path d="M20,56 Q320,26 620,56" fill="none" stroke={C.muted} strokeWidth={2} strokeDasharray="6 5" />
      <T x={320} y={14} anchor="middle" size={12.5} color={C.muted}>ionosphere</T>
      {/* ground / mountain */}
      <path d="M0,290 L0,262 L70,252 L150,236 L230,168 L290,108 L322,92 L356,112 L420,176 L500,236 L570,250 L640,258 L640,290 Z" fill={C.fill2} stroke={C.ink} strokeWidth={2} />
      {/* activator */}
      <Ln x1={322} y1={92} x2={322} y2={54} color={C.signal} width={3} />
      <Ln x1={322} y1={92} x2={288} y2={74} color={C.signal} width={2} />
      <Ln x1={322} y1={92} x2={356} y2={74} color={C.signal} width={2} />
      <circle cx={322} cy={96} r={4} fill={C.signal} />
      <T x={372} y={74} size={13.5} bold color={C.signal}>Activator</T>
      <T x={372} y={92} size={12.5} color={C.muted}>radio, battery,</T>
      <T x={372} y={108} size={12.5} color={C.muted}>light wire antenna</T>
      {/* HF skywave */}
      <Ln x1={310} y1={56} x2={104} y2={50} color={C.signal} width={2} arrow dash="4 4" />
      <Ln x1={334} y1={56} x2={538} y2={50} color={C.signal} width={2} arrow dash="4 4" />
      <T x={206} y={78} anchor="middle" size={12.5} bold color={C.signal}>HF: distant chasers</T>
      <Ln x1={104} y1={50} x2={74} y2={228} color={C.signal} width={2} arrow dash="4 4" />
      <Ln x1={538} y1={50} x2={578} y2={228} color={C.signal} width={2} arrow dash="4 4" />
      {/* VHF line of sight */}
      <Ln x1={312} y1={106} x2={180} y2={222} color={C.voltage} width={2.5} arrow />
      <Ln x1={332} y1={106} x2={470} y2={222} color={C.voltage} width={2.5} arrow />
      <T x={112} y={162} size={12.5} bold color={C.voltage}>VHF:</T>
      <T x={112} y={178} size={12.5} bold color={C.voltage}>line of sight</T>
      <T x={452} y={162} size={12.5} bold color={C.voltage}>VHF:</T>
      <T x={452} y={178} size={12.5} bold color={C.voltage}>line of sight</T>
      {[[74, 240], [178, 230], [470, 234], [578, 244]].map(([x, y], i) => (
        <g key={i}><circle cx={x} cy={y} r={7} fill={C.current} /></g>
      ))}
      <T x={34} y={276} size={12.5} bold color={C.current}>Chasers</T>
      <T x={606} y={276} size={12.5} bold color={C.current} anchor="end">Chasers</T>
    </Diagram>
  )
}
