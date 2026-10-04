import { C, Diagram, Ln, T } from '../kit'

/** Three ways digital voice systems share spectrum: one call per channel, narrower channels, or time slots. */
export function P25AndNxdn_Access() {
  const cols = [
    { x: 14, head: 'P25 Phase 1', sub: 'FDMA, 12.5 kHz', note: 'One call fills the channel' },
    { x: 228, head: 'NXDN narrow option', sub: 'FDMA, 6.25 kHz each', note: 'Two calls, half width each' },
    { x: 442, head: 'P25 Phase 2', sub: 'TDMA, 12.5 kHz', note: 'Two calls take turns in time' },
  ]
  const w = 184, cx = 24, cy = 96, cw = 140, ch = 120
  const chart = (kind: number) => {
    if (kind === 0) return <rect x={0} y={0} width={cw} height={ch} fill={C.signal} fillOpacity={0.85} />
    if (kind === 1) return (
      <>
        <rect x={0} y={0} width={cw} height={ch / 2 - 2} fill={C.resist} fillOpacity={0.85} />
        <rect x={0} y={ch / 2 + 2} width={cw} height={ch / 2 - 2} fill={C.signal} fillOpacity={0.85} />
      </>
    )
    return (
      <>
        {Array.from({ length: 7 }, (_, i) => (
          <rect key={i} x={i * (cw / 7) + 1} y={0} width={cw / 7 - 2} height={ch} fill={i % 2 ? C.resist : C.signal} fillOpacity={0.85} />
        ))}
      </>
    )
  }
  return (
    <Diagram w={640} h={300}
      title="Three ways digital voice shares spectrum: one call per 12.5 kilohertz channel, two calls each in a 6.25 kilohertz channel, or two calls taking turns in time slots on a 12.5 kilohertz channel"
      caption="Frequency runs up, time runs right. Colours show different calls. NXDN also has a 12.5 kHz option.">
      {cols.map((c, i) => (
        <g key={c.head}>
          <rect x={c.x} y={14} width={w} height={278} rx={12} fill={C.fill} stroke={C.muted} strokeWidth={1.5} />
          <T x={c.x + w / 2} y={36} anchor="middle" size={15} bold>{c.head}</T>
          <T x={c.x + w / 2} y={58} anchor="middle" size={13} color={C.muted}>{c.sub}</T>
          <g transform={`translate(${c.x + cx},${cy})`}>
            {chart(i)}
            <Ln x1={-6} y1={ch} x2={-6} y2={0} color={C.muted} width={2} arrow />
            <Ln x1={0} y1={ch + 6} x2={cw} y2={ch + 6} color={C.muted} width={2} arrow />
          </g>
          <T x={c.x + w / 2} y={250} anchor="middle" size={12.5}>{c.note}</T>
        </g>
      ))}
    </Diagram>
  )
}
