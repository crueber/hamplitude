import { useState } from 'react'
import { C, Choice, Diagram, Ln, T } from '../kit'

const N = 5
const bw = (f: number) => -10 * Math.log10(1 + f ** (2 * N))
const cosh = Math.cosh
const cheb = (f: number) => {
  const eps2 = 10 ** 0.1 - 1 // 1 dB ripple
  const t = f <= 1 ? Math.cos(N * Math.acos(f)) : cosh(N * Math.acosh(f))
  return -10 * Math.log10(1 + eps2 * t * t)
}
// Elliptic is a sketch: ripple in the passband, very steep skirt, notches (zeros) in the stop band.
const ell = (f: number) => {
  if (f <= 1) return cheb(f)
  const skirt = f < 1.25 ? -1 - 44 * ((f - 1) / 0.25) ** 0.8 : -45
  const notch = (z: number, d: number) => -22 * Math.exp(-(((f - z) / d) ** 2))
  return skirt + notch(1.5, 0.07) + notch(2.2, 0.14)
}
const SHAPES = {
  bw: { name: 'Butterworth', col: C.signal, f: bw, note: 'Flat passband, no ripple. Gentle skirt.' },
  ch: { name: 'Chebyshev', col: C.power, f: cheb, note: 'Ripple in the passband, sharper cutoff.' },
  el: { name: 'Elliptical', col: C.resist, f: ell, note: 'Sharpest cutoff, notches in the stop band.' },
}

/** Three classic low-pass shapes of the same order. Elliptical is drawn as a sketch. */
export function FilterShapes() {
  const [k, setK] = useState<keyof typeof SHAPES>('ch')
  const px0 = 70, px1 = 610, py0 = 40, py1 = 230, fmax = 3, dmax = 70
  const PX = (f: number) => px0 + (f / fmax) * (px1 - px0)
  const PY = (d: number) => py0 + (Math.min(dmax, Math.max(0, -d)) / dmax) * (py1 - py0)
  const path = (fn: (f: number) => number) => Array.from({ length: 301 }, (_, i) => { const f = (i / 300) * fmax; return `${PX(f)},${PY(fn(f))}` }).join(' ')
  const s = SHAPES[k]
  return (
    <>
      <Diagram w={640} h={310} title={`Low-pass filter shapes. ${s.name}: ${s.note}`} caption="Same cutoff, three shapes (elliptical is a sketch). Ripple buys a steeper skirt; notches the steepest.">
        <rect x={20} y={20} width={610} height={250} rx={10} fill={C.fill} />
        {[0, 20, 40, 60].map((d) => (
          <g key={d}>
            <Ln x1={px0} y1={PY(-d)} x2={px1} y2={PY(-d)} color={C.fill2} width={1} dash="3 4" />
            <T x={px0 - 8} y={PY(-d)} anchor="end" size={12} color={C.muted}>{d === 0 ? '0 dB' : `−${d}`}</T>
          </g>
        ))}
        <Ln x1={PX(1)} y1={py0 - 6} x2={PX(1)} y2={py1 + 4} color={C.muted} width={1.5} dash="3 3" />
        <T x={PX(1)} y={py1 + 18} anchor="middle" size={12} color={C.muted}>cutoff</T>
        <T x={px1} y={py1 + 18} anchor="end" size={12} color={C.muted}>frequency →</T>
        <T x={PX(0.5)} y={py0 - 12} anchor="middle" size={12} color={C.muted}>passband</T>
        <T x={PX(2)} y={py0 - 12} anchor="middle" size={12} color={C.muted}>stop band</T>
        {(Object.keys(SHAPES) as (keyof typeof SHAPES)[]).filter((x) => x !== k).map((x) => (
          <polyline key={x} points={path(SHAPES[x].f)} fill="none" stroke={SHAPES[x].col} strokeWidth={2} opacity={0.3} strokeLinejoin="round" />
        ))}
        <polyline points={path(s.f)} fill="none" stroke={s.col} strokeWidth={3.5} strokeLinejoin="round" />
        <T x={320} y={292} anchor="middle" bold size={14} color={s.col}>{`${s.name}: ${s.note}`}</T>
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Filter type" value={k} onChange={setK} options={(Object.keys(SHAPES) as (keyof typeof SHAPES)[]).map((x) => ({ value: x, label: SHAPES[x].name }))} />
      </div>
    </>
  )
}
