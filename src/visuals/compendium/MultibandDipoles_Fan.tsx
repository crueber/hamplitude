import { C, Diagram, Ln, T } from '../kit'

/** A fan dipole: one feed point, a separate pair of wires for each band, spread apart at the ends. Lengths are the 468/f figures. */
export function MultibandDipoles_Fan() {
  const cx = 320, cy = 96
  const bands = [
    { n: '40 m', ft: 65.5, f: '7.15 MHz', color: C.resist, dy: -54 },
    { n: '20 m', ft: 33.0, f: '14.2 MHz', color: C.current, dy: 0 },
    { n: '10 m', ft: 16.5, f: '28.4 MHz', color: C.power, dy: 54 },
  ]
  const px = 8.7 // px per foot of half-length
  return (
    <Diagram w={640} h={330}
      title="A fan dipole: three pairs of wires of different lengths share one feed point and are spread apart at their outer ends, one pair for each band"
      caption="Typical example lengths from 468 ÷ f. Each pair is resonant on its own band; the others interact slightly, so trimming is a patient, repeated job.">
      {bands.map((b) => {
        const half = (b.ft / 2) * px
        return (
          <g key={b.n}>
            <Ln x1={cx} y1={cy} x2={cx - half} y2={cy + b.dy} color={b.color} width={4} />
            <Ln x1={cx} y1={cy} x2={cx + half} y2={cy + b.dy} color={b.color} width={4} />
            <circle cx={cx - half} cy={cy + b.dy} r={4.5} fill={C.bg} stroke={b.color} strokeWidth={2.5} />
            <circle cx={cx + half} cy={cy + b.dy} r={4.5} fill={C.bg} stroke={b.color} strokeWidth={2.5} />
          </g>
        )
      })}
      <circle cx={cx} cy={cy} r={8} fill={C.bg} stroke={C.ink} strokeWidth={3} />
      <Ln x1={cx} y1={cy + 8} x2={cx} y2={cy + 122} color={C.signal} width={3.5} />
      <T x={cx + 12} y={cy + 100} size={13} bold color={C.signal}>coax to the radio</T>
      <T x={cx} y={46} anchor="middle" size={13} bold>shared feed point</T>
      <Ln x1={cx} y1={58} x2={cx} y2={84} color={C.ink} width={1.5} arrow />
      <T x={20} y={240} size={12} color={C.muted}>side view: the outer ends are held apart by spacers or separate supports</T>
      {bands.map((b, i) => (
        <g key={b.n}>
          <rect x={60 + i * 190} y={270} width={14} height={14} rx={3} fill={b.color} />
          <T x={82 + i * 190} y={277} size={13} bold>{`${b.n} pair`}</T>
          <T x={82 + i * 190} y={297} size={12} color={C.muted}>{`${b.ft.toFixed(1)} ft total at ${b.f}`}</T>
        </g>
      ))}
    </Diagram>
  )
}
