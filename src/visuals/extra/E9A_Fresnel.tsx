import { C, Diagram, Ln, T } from '../kit'

const BANDS = [
  { f: '900 MHz', ghz: 0.9, c: C.bad },
  { f: '2.4 GHz', ghz: 2.4, c: C.resist },
  { f: '3.4 GHz', ghz: 3.4, c: C.power },
  { f: '5.8 GHz', ghz: 5.8, c: C.good },
]
const D = 1000 // path length, m
const r1 = (ghz: number) => 0.5 * Math.sqrt((0.2998 / ghz) * D) // midpoint radius: ½·√(λ·d)

/** First Fresnel zone: the football-shaped region around the line of sight that must stay clear. Higher frequency, thinner football. */
export function E9A_Fresnel() {
  const cx = 240, cy = 120, a = 185
  const k = 80 / r1(0.9)
  return (
    <Diagram w={640} h={236} title="First Fresnel zones for a one-kilometre link at 900 MHz, 2.4, 3.4 and 5.8 GHz. Higher frequency gives a thinner zone; 5.8 GHz is the smallest."
      caption="Fresnel zone radius at mid-path = ½ √(λ × distance). Shorter wavelength, thinner zone.">
      {BANDS.map((b) => {
        const rr = r1(b.ghz) * k
        return <ellipse key={b.f} cx={cx} cy={cy} rx={a} ry={rr} fill={b.c} fillOpacity={0.1} stroke={b.c} strokeWidth={b.ghz === 5.8 ? 3.5 : 2} />
      })}
      <Ln x1={cx - a} y1={cy} x2={cx + a} y2={cy} color={C.muted} width={1.5} dash="5 4" />
      <Ln x1={cx - a} y1={cy + 14} x2={cx - a} y2={cy - 14} color={C.ink} width={5} />
      <Ln x1={cx + a} y1={cy + 14} x2={cx + a} y2={cy - 14} color={C.ink} width={5} />
      <T x={cx - a} y={cy + 30} anchor="middle" size={12} color={C.muted}>antenna</T>
      <T x={cx + a} y={cy + 30} anchor="middle" size={12} color={C.muted}>antenna</T>
      <T x={cx} y={222} anchor="middle" size={12} color={C.muted}>side view, 1 km path (not to scale)</T>
      <T x={480} y={26} size={13} bold color={C.muted}>Radius at mid-path</T>
      {BANDS.map((b, i) => (
        <g key={b.f}>
          <rect x={480} y={46 + i * 44} width={16} height={16} rx={4} fill={b.c} fillOpacity={0.9} />
          <T x={504} y={54 + i * 44} size={14} bold color={b.c}>{b.f}</T>
          <T x={504} y={74 + i * 44} size={13} color={C.ink}>{r1(b.ghz).toFixed(1)} m{b.ghz === 5.8 ? '  smallest' : ''}</T>
        </g>
      ))}
    </Diagram>
  )
}
