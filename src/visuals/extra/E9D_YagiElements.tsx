import { C, Diagram, Ln, T } from '../kit'

/** Yagi: one driven half-wave element and parasitic elements. Slightly longer/shorter than resonance sets the phase of their current. */
export function E9D_YagiElements() {
  const els = [
    { x: 120, h: 78, n: 'Reflector', s1: 'a bit longer', s2: 'than resonance', c: C.bad },
    { x: 250, h: 70, n: 'Driven', s1: 'about ½ wave', s2: 'fed by the coax', c: C.voltage },
    { x: 380, h: 62, n: 'Director', s1: 'a bit shorter', s2: 'than resonance', c: C.signal },
  ]
  const cy = 112
  return (
    <Diagram w={640} h={292} title="A three-element Yagi seen from above: reflector slightly longer than resonance, driven element about a half wavelength, director slightly shorter. The beam points from the reflector toward the director."
      caption="Only the driven element connects to the feed line. Reflector and director are excited by its field and re-radiate with a phase set by their length.">
      <Ln x1={90} y1={cy} x2={420} y2={cy} color={C.muted} width={4} />
      {els.map((e) => (
        <g key={e.n}>
          <Ln x1={e.x} y1={cy - e.h} x2={e.x} y2={cy + e.h} color={e.c} width={7} />
          <T x={e.x} y={cy + 100} anchor="middle" size={13} bold color={e.c}>{e.n}</T>
          <T x={e.x} y={cy + 118} anchor="middle" size={12} color={C.muted}>{e.s1}</T>
          <T x={e.x} y={cy + 134} anchor="middle" size={12} color={C.muted}>{e.s2}</T>
        </g>
      ))}
      <circle cx={250} cy={cy} r={6} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <Ln x1={450} y1={cy} x2={620} y2={cy} color={C.good} width={4} arrow />
      <T x={535} y={cy - 18} anchor="middle" size={14} bold color={C.good}>beam this way</T>
      <T x={535} y={cy + 24} anchor="middle" size={12} color={C.muted}>more gain in front</T>
      <rect x={470} y={170} width={160} height={92} rx={10} fill={C.fill} />
      <T x={482} y={190} size={12} bold color={C.bad}>Longer: current lags</T>
      <T x={482} y={212} size={12} bold color={C.signal}>Shorter: current leads</T>
      <T x={482} y={240} size={12} color={C.muted}>length controls phase</T>
    </Diagram>
  )
}
