import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, T } from '../kit'

type Cx = { re: number; im: number }
const div = (a: Cx, b: Cx): Cx => { const d = b.re * b.re + b.im * b.im; return { re: (a.re * b.re + a.im * b.im) / d, im: (a.im * b.re - a.re * b.im) / d } }
const sqrt = (a: Cx): Cx => { const m = Math.hypot(a.re, a.im); return { re: Math.sqrt((m + a.re) / 2), im: Math.sign(a.im || 1) * Math.sqrt((m - a.re) / 2) } }
const SOILS = {
  sea: { name: 'Seawater', er: 80, sig: 5 },
  avg: { name: 'Average soil', er: 13, sig: 0.005 },
  poor: { name: 'Dry, poor soil', er: 4, sig: 0.001 },
} as const
type K = keyof typeof SOILS

// Vertical antenna at the ground surface, 14 MHz: field ∝ cos(elev) · |1 + Γ|, Γ = vertical-polarization reflection coefficient.
function field(deg: number, k: K) {
  const { er, sig } = SOILS[k], lam = 299.8 / 14
  const ec: Cx = { re: er, im: -60 * sig * lam }
  const s = Math.sin((deg * Math.PI) / 180), c = Math.cos((deg * Math.PI) / 180)
  const root = sqrt({ re: ec.re - c * c, im: ec.im })
  const g = div({ re: ec.re * s - root.re, im: ec.im * s - root.im }, { re: ec.re * s + root.re, im: ec.im * s + root.im })
  return (c * Math.hypot(1 + g.re, g.im)) / 2
}

/** Seawater is a better reflector: low-angle radiation from a vertical goes up over seawater, and drops over poor soil. */
export function E9C_SeaSoil() {
  const [k, setK] = useState<K>('avg')
  const cx = 200, cy = 222, R = 176
  const path = (kk: K) => Array.from({ length: 181 }, (_, i) => {
    const t = i / 2, r = R * field(t, kk) / 0.95
    return `${i ? 'L' : 'M'}${(cx + r * Math.cos((t * Math.PI) / 180)).toFixed(1)},${(cy - r * Math.sin((t * Math.PI) / 180)).toFixed(1)}`
  }).join('')
  const lowDb = 20 * Math.log10(field(5, k) / field(5, 'sea'))
  return (
    <>
      <Diagram w={640} h={262} title={`Elevation pattern of a vertical antenna over ${SOILS[k].name.toLowerCase()} compared with seawater. Seawater sends much more signal at low angles; poorer ground sends less near the horizon.`}
        caption="Vertical antenna, side view, 14 MHz. Seawater keeps strong radiation near the horizon; poorer ground loses it.">
        <path d={`M${cx + R},${cy} A${R},${R} 0 0 0 ${cx - R},${cy}`} fill="none" stroke={C.fill2} strokeWidth={2} />
        <path d={`M${cx + R / 2},${cy} A${R / 2},${R / 2} 0 0 0 ${cx - R / 2},${cy}`} fill="none" stroke={C.fill2} strokeWidth={1.5} />
        {[0, 30, 60, 90].map((a) => <Ln key={a} x1={cx} y1={cy} x2={cx + R * Math.cos((a * Math.PI) / 180)} y2={cy - R * Math.sin((a * Math.PI) / 180)} color={C.fill2} width={1} />)}
        {[0, 30, 60, 90].map((a) => <T key={a} x={cx + (R + 16) * Math.cos((a * Math.PI) / 180)} y={cy - (R + 12) * Math.sin((a * Math.PI) / 180) - (a === 0 ? 12 : 0)} anchor="middle" size={11} color={C.muted}>{a}°</T>)}
        <path d={path('sea')} fill="none" stroke={C.signal} strokeWidth={2.5} strokeDasharray={k === 'sea' ? undefined : '6 4'} />
        {k !== 'sea' && <path d={path(k)} fill={C.resist} fillOpacity={0.2} stroke={C.resist} strokeWidth={3} />}
        <Ln x1={cx} y1={cy} x2={cx} y2={cy - 20} color={C.ink} width={4} />
        <rect x={cx - R - 6} y={cy} width={2 * R + 12} height={10} fill={C.fill2} />
        <T x={cx - R} y={cy + 26} size={12} color={C.muted}>ground</T>
        <T x={430} y={40} size={13} bold color={C.muted}>Legend</T>
        <Ln x1={430} y1={64} x2={460} y2={64} color={C.signal} width={3} dash={k === 'sea' ? undefined : '6 4'} /><T x={470} y={64} size={13}>seawater</T>
        {k !== 'sea' && <><Ln x1={430} y1={90} x2={460} y2={90} color={C.resist} width={3} /><T x={470} y={90} size={13}>{SOILS[k].name.toLowerCase()}</T></>}
        <rect x={424} y={130} width={206} height={84} rx={10} fill={C.fill} stroke={C.resist} strokeWidth={2} />
        <T x={436} y={152} size={12} color={C.muted}>Signal at 5° above the horizon</T>
        <T x={436} y={180} size={20} bold color={k === 'sea' ? C.good : C.bad}>{k === 'sea' ? 'strongest' : `${lowDb.toFixed(0)} dB vs sea`}</T>
        <T x={436} y={200} size={11} color={C.muted}>typical values, simplified model</T>
      </Diagram>
      <Controls>
        <Choice label="Ground under the antenna" value={k} onChange={setK} options={(Object.keys(SOILS) as K[]).map((v) => ({ value: v, label: SOILS[v].name }))} />
      </Controls>
    </>
  )
}
