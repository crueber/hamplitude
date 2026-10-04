import { C, Diagram, Ln, T } from '../kit'

/** Voice energy that matters sits inside the SSB passband; a communications mic shapes its response to suit it. Curves are illustrative. */
export function MicrophonesAndHeadsets_Response() {
  const x0 = 60, x1 = 610, y0 = 220, ytop = 36
  const sx = (f: number) => x0 + (f / 4000) * (x1 - x0)
  const sy = (a: number) => y0 - a * (y0 - ytop)
  // illustrative response shapes (relative level 0..1)
  const comm = (f: number) => {
    const low = 1 / (1 + Math.pow(250 / Math.max(f, 1), 3))
    const high = 1 / (1 + Math.pow(Math.max(f, 1) / 3300, 6))
    const bump = 1 + 0.35 * Math.exp(-Math.pow((f - 2300) / 600, 2))
    return Math.min(1, 0.72 * low * high * bump)
  }
  const wide = (f: number) => {
    const low = 1 / (1 + Math.pow(60 / Math.max(f, 1), 3))
    return 0.72 * low
  }
  const path = (fn: (f: number) => number) => {
    const out: string[] = []
    for (let i = 0; i <= 100; i++) {
      const f = (4000 * i) / 100
      out.push(`${i ? 'L' : 'M'}${sx(f).toFixed(1)},${sy(fn(f)).toFixed(1)}`)
    }
    return out.join('')
  }
  return (
    <Diagram w={640} h={326}
      title="Microphone frequency response against the typical SSB passband of about 300 to 2700 hertz. A communications microphone rolls off lows and highs and lifts the upper voice range; a wideband microphone stays flat beyond the passband."
      caption="Illustrative curve shapes. The shaded band is a typical SSB passband.">
      <rect x={sx(300)} y={ytop - 6} width={sx(2700) - sx(300)} height={y0 - ytop + 6} rx={6} fill={C.fill2} opacity={0.7} />
      <T x={(sx(300) + sx(2700)) / 2} y={y0 - 14} anchor="middle" size={13} bold color={C.signal}>SSB passband (typical)</T>
      <Ln x1={x0} y1={y0} x2={x1} y2={y0} color={C.muted} width={1.5} />
      <Ln x1={x0} y1={y0} x2={x0} y2={ytop - 6} color={C.muted} width={1.5} />
      {[0, 1000, 2000, 3000, 4000].map((f) => (
        <g key={f}>
          <Ln x1={sx(f)} y1={y0} x2={sx(f)} y2={y0 + 6} color={C.muted} width={1.5} />
          <T x={sx(f)} y={y0 + 20} anchor="middle" size={12} color={C.muted}>{f === 0 ? '0' : `${f / 1000} kHz`}</T>
        </g>
      ))}
      <T x={x0 + 4} y={ytop - 20} size={13} bold color={C.muted}>Relative level</T>
      <path d={path(wide)} fill="none" stroke={C.muted} strokeWidth={3} strokeDasharray="7 5" />
      <path d={path(comm)} fill="none" stroke={C.power} strokeWidth={3.5} />
      <T x={sx(2000)} y={y0 + 38} anchor="middle" size={13} color={C.muted}>Audio frequency</T>
      <Ln x1={70} y1={288} x2={108} y2={288} color={C.power} width={3.5} />
      <T x={118} y={288} size={13} bold color={C.power}>communications mic: lows and highs rolled off, upper voice lifted</T>
      <Ln x1={70} y1={308} x2={108} y2={308} color={C.muted} width={3} dash="7 5" />
      <T x={118} y={308} size={13} bold color={C.muted}>wideband mic: flat, so it also passes rumble</T>
    </Diagram>
  )
}
