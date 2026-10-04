import { C, Diagram, Ln, T } from '../kit'

// Schematic noise-versus-frequency picture. u = log10(frequency in MHz), 0 (1 MHz) to 3 (1000 MHz).
// Shapes follow the usual textbook trends: atmospheric falls steeply and fades out in the HF range,
// man-made (city) and galactic fall more slowly. Not measured data.
const X0 = 60, X1 = 610, Y0 = 232, Y1 = 40 // chart box
const LMAX = 90
const px = (u: number) => X0 + (u / 3) * (X1 - X0)
const py = (l: number) => Y0 - (l / LMAX) * (Y0 - Y1)

const CURVES = [
  { id: 'Atmospheric', col: C.voltage, f: (u: number) => 85 - 55 * u },
  { id: 'Man-made (city)', col: C.resist, f: (u: number) => 76.8 - 27.7 * u },
  { id: 'Galactic', col: C.power, f: (u: number) => 52 - 16 * u },
]
const FLOOR = 10

const path = (f: (u: number) => number) => {
  const pts: string[] = []
  for (let i = 0; i <= 120; i++) {
    const u = (3 * i) / 120
    const l = f(u)
    if (l < 0) break
    pts.push(`${pts.length ? 'L' : 'M'}${px(u).toFixed(1)},${py(l).toFixed(1)}`)
  }
  return pts.join('')
}

const TICKS: [string, number][] = [['1 MHz', 0], ['10 MHz', 1], ['100 MHz', 2], ['1 GHz', 3]]
const HAM: [string, number][] = [['80 m', 3.7], ['20 m', 14.2], ['6 m', 52], ['2 m', 146], ['70 cm', 446]]

export function NoiseAndSnr_Sources() {
  return (
    <Diagram w={640} h={304}
      title="Schematic of noise level against frequency: atmospheric noise is strongest at low frequencies and fades out through HF; man-made noise in a city and galactic noise fall more slowly; above a few hundred megahertz the receiver's own noise dominates"
      caption="Schematic, not measured data: real levels vary with time, place and weather.">
      <T x={X0} y={16} size={13} bold color={C.muted}>Noise level (higher is worse)</T>
      <Ln x1={X0} y1={Y0} x2={X1} y2={Y0} color={C.muted} width={1.5} />
      <Ln x1={X0} y1={Y0} x2={X0} y2={Y1 - 6} color={C.muted} width={1.5} arrow />
      <clipPath id="nss-clip"><rect x={X0} y={Y1 - 4} width={X1 - X0 + 4} height={Y0 - Y1 + 4} /></clipPath>
      <line x1={X0} y1={py(FLOOR)} x2={X1} y2={py(FLOOR)} stroke={C.good} strokeWidth={2.5} strokeDasharray="7 5" />
      <T x={X0 + 10} y={py(FLOOR) - 12} size={12.5} bold color={C.good}>receiver's own noise</T>
      <g clipPath="url(#nss-clip)">
        {CURVES.map((c) => <path key={c.id} d={path(c.f)} fill="none" stroke={c.col} strokeWidth={3.5} strokeLinecap="round" />)}
      </g>
      {CURVES.map((c, i) => (
        <g key={c.id}>
          <Ln x1={400} y1={50 + i * 24} x2={430} y2={50 + i * 24} color={c.col} width={4} />
          <T x={440} y={50 + i * 24} size={13} bold color={c.col}>{c.id}</T>
        </g>
      ))}
      {TICKS.map(([n, u]) => (
        <g key={n}>
          <Ln x1={px(u)} y1={Y0} x2={px(u)} y2={Y0 + 6} color={C.muted} width={1.5} />
          <T x={px(u)} y={Y0 + 20} anchor="middle" size={12} color={C.muted}>{n}</T>
        </g>
      ))}
      <T x={X0 - 8} y={Y0 + 37} anchor="end" size={12} bold color={C.good}>ham</T>
      {HAM.map(([n, f]) => (
        <g key={n}>
          <rect x={px(Math.log10(f)) - 2} y={Y0 + 32} width={4} height={10} fill={C.good} />
          <T x={px(Math.log10(f))} y={Y0 + 54} anchor="middle" size={12} bold>{n}</T>
        </g>
      ))}
    </Diagram>
  )
}
