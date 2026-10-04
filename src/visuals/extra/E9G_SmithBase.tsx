import { C, T } from '../kit'

/** Shared Smith chart maths and grid drawing for the E9G lesson visuals. */
/** Not a Diagram itself: each Diagram that uses this grid sets its own title= and caption=. */

export interface Cx { re: number; im: number }
export interface Geo { cx: number; cy: number; R: number }

export const cabs = (g: Cx) => Math.hypot(g.re, g.im)
export const neg = (g: Cx): Cx => ({ re: -g.re, im: -g.im })

/** Normalised impedance r + jx to reflection coefficient. */
export function gammaOf(r: number, x: number): Cx {
  const d = (r + 1) * (r + 1) + x * x
  return { re: (r * r + x * x - 1) / d, im: (2 * x) / d }
}

/** Reflection coefficient to normalised impedance r + jx. */
export function zOf(g: Cx): { r: number; x: number } {
  const d = (1 - g.re) * (1 - g.re) + g.im * g.im
  return { r: (1 - g.re * g.re - g.im * g.im) / d, x: (2 * g.im) / d }
}

/** Walk d wavelengths toward the generator: Γ turns clockwise by 4πd. */
export function rotate(g: Cx, d: number): Cx {
  const a = -4 * Math.PI * d
  return { re: g.re * Math.cos(a) - g.im * Math.sin(a), im: g.re * Math.sin(a) + g.im * Math.cos(a) }
}

export const swrOf = (g: Cx) => {
  const m = cabs(g)
  return m >= 0.9995 ? Infinity : (1 + m) / (1 - m)
}

export const px = (geo: Geo, g: Cx) => ({ x: geo.cx + geo.R * g.re, y: geo.cy - geo.R * g.im })

/** Wavelengths-toward-generator reading (0 to 0.5) for a point at angle of Γ. */
export const wtgOf = (g: Cx) => {
  const th = Math.atan2(g.im, g.re)
  let w = (Math.PI - th) / (4 * Math.PI)
  w = ((w % 0.5) + 0.5) % 0.5
  return w
}

/** Polyline for a constant-reactance arc (any x), clipped naturally to the chart. */
export function xArcPath(geo: Geo, x: number): string {
  const N = 140
  let d = ''
  for (let i = 0; i <= N; i++) {
    const u = i / N
    const g = i === N ? { re: 1, im: 0 } : gammaOf(u / (1 - u), x)
    const p = px(geo, g)
    d += `${i ? 'L' : 'M'}${p.x.toFixed(1)},${p.y.toFixed(1)}`
  }
  return d
}

/** Constant-resistance circle as circle params. */
export const rCircle = (geo: Geo, r: number) => ({ cx: geo.cx + (geo.R * r) / (1 + r), cy: geo.cy, r: geo.R / (1 + r) })

const halo = { stroke: C.bg, strokeWidth: 3.5, style: { paintOrder: 'stroke' as const } }

const RS = [0.2, 0.5, 1, 2, 5]
const XS = [0.2, 0.5, 1, 2, 5]

export interface GridProps {
  geo: Geo
  /** Show ohm values for this Z0 under the normalised resistance labels. */
  z0?: number
  /** Label the outer circle with reactance values. */
  reactLabels?: boolean
  /** Show the wavelengths-toward-generator ring. */
  wtg?: boolean
  /** Read the chart as admittance (g and b instead of r and x). */
  admittance?: boolean
  /** Label the resistance values along the axis. */
  resLabels?: boolean
}

export function SmithGrid({ geo, z0, reactLabels = true, wtg, admittance, resLabels = true, children }: GridProps & { children?: React.ReactNode }) {
  const { cx, cy, R } = geo
  const rl = ''
  return (
    <g>
      {/* constant-resistance circles */}
      {RS.map((r) => {
        const c = rCircle(geo, r)
        return <circle key={r} cx={c.cx} cy={c.cy} r={c.r} fill="none" stroke={C.resist} strokeOpacity={0.5} strokeWidth={1.3} />
      })}
      {/* constant-reactance arcs */}
      {XS.flatMap((x) => [x, -x]).map((x) => (
        <path key={x} d={xArcPath(geo, x)} fill="none" stroke={C.signal} strokeOpacity={0.5} strokeWidth={1.3} />
      ))}
      {/* the one straight line: the resistance axis */}
      <line x1={cx - R} y1={cy} x2={cx + R} y2={cy} stroke={C.muted} strokeWidth={1.6} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={C.ink} strokeWidth={2} />
      {children}
      {/* resistance labels */}
      {resLabels && RS.map((r) => {
        const x = cx + (R * (r - 1)) / (r + 1)
        return (
          <g key={r}>
            <T x={x} y={cy - 9} anchor="middle" size={12} bold color={C.resist} {...halo}>{rl}{r}</T>
            {z0 != null && <T x={x} y={cy + 10} anchor="middle" size={12} color={C.muted} {...halo}>{Math.round(r * z0)} Ω</T>}
          </g>
        )
      })}
      {/* reactance labels around the outer circle */}
      {reactLabels && !wtg && XS.flatMap((x) => [x, -x]).map((x) => {
        const g = gammaOf(0, x)
        const a = Math.atan2(g.im, g.re)
        const rr = R + 17
        const tx = cx + rr * Math.cos(a), ty = cy - rr * Math.sin(a)
        const anchor = Math.cos(a) < -0.5 ? 'end' : Math.cos(a) > 0.5 ? 'start' : 'middle'
        return <T key={x} x={tx + (Math.cos(a) < -0.5 ? 6 : Math.cos(a) > 0.5 ? -6 : 0)} y={ty} anchor={anchor} size={12} bold color={C.signal}>{x > 0 ? '+' : '−'}{admittance ? 'j' : 'j'}{Math.abs(x)}</T>
      })}
      {/* wavelengths-toward-generator ring */}
      {wtg && (
        <g>
          {Array.from({ length: 50 }, (_, i) => {
            const w = i / 100
            const a = Math.PI - 4 * Math.PI * w
            const big = i % 5 === 0
            const r2 = R + (big ? 9 : 5)
            return <line key={i} x1={cx + R * Math.cos(a)} y1={cy - R * Math.sin(a)} x2={cx + r2 * Math.cos(a)} y2={cy - r2 * Math.sin(a)} stroke={C.muted} strokeWidth={big ? 1.6 : 1} />
          })}
          {Array.from({ length: 10 }, (_, i) => {
            const w = i / 20
            const a = Math.PI - 4 * Math.PI * w
            const rr = R + 24
            const label = w === 0 ? '0 / 0.5' : w.toFixed(2)
            const ca = Math.cos(a)
            const anchor = ca < -0.6 ? 'end' : ca > 0.6 ? 'start' : 'middle'
            return <T key={i} x={cx + rr * ca + (ca < -0.6 ? 14 : 0)} y={cy - rr * Math.sin(a)} anchor={anchor} size={12} bold color={C.power}>{label}</T>
          })}
        </g>
      )}
    </g>
  )
}

/** Dashed SWR circle for |Γ|, with a marker where it crosses the right half of the axis. */
export function SwrCircle({ geo, g, label = true }: { geo: Geo; g: Cx; label?: boolean }) {
  const m = Math.min(cabs(g), 0.999)
  const swr = swrOf(g)
  const x = geo.cx + geo.R * m
  return (
    <g>
      <circle cx={geo.cx} cy={geo.cy} r={geo.R * m} fill="none" stroke={C.power} strokeWidth={2.2} strokeDasharray="6 5" />
      {label && m > 0.02 && m < 0.97 && (
        <>
          <circle cx={x} cy={geo.cy} r={4.5} fill={C.power} stroke={C.bg} strokeWidth={1.5} />
          <T x={x} y={geo.cy + 27} anchor="middle" size={12} bold color={C.power} {...halo}>{`SWR ${swr.toFixed(swr < 10 ? 1 : 0)}`}</T>
        </>
      )}
    </g>
  )
}

export { halo }
