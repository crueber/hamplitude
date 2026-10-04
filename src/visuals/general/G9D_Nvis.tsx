import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, fmt } from '../kit'

/** Horizontal dipole over ideal ground: strength straight up is |sin(2 pi h)|. Best between 1/10 and 1/4 wave. */
export function G9D_Nvis() {
  const [h, setH] = useState(0.2)
  const up = (hh: number) => Math.abs(Math.sin(2 * Math.PI * hh))
  const W = 640, H = 270
  const gx0 = 350, gx1 = 610, gy0 = 215, gy1 = 50
  const X = (v: number) => gx0 + (v / 0.75) * (gx1 - gx0)
  const Y = (v: number) => gy0 - v * (gy0 - gy1)
  const curve = Array.from({ length: 151 }, (_, i) => {
    const v = (i / 150) * 0.75
    return `${i ? 'L' : 'M'}${X(v).toFixed(1)},${Y(up(v)).toFixed(1)}`
  }).join('')
  // small elevation pattern, scaled to its own peak
  const cx = 130, cy = 215, R = 105
  let mx = 0
  for (let i = 0; i <= 90; i++) mx = Math.max(mx, Math.abs(Math.sin(2 * Math.PI * h * Math.sin((i / 90) * (Math.PI / 2)))))
  const ep = Array.from({ length: 181 }, (_, i) => {
    const th = ((i - 90) / 90) * (Math.PI / 2)
    const r = Math.abs(Math.sin(2 * Math.PI * h * Math.cos(th))) / Math.max(mx, 1e-6)
    return `${i ? 'L' : 'M'}${(cx + R * r * Math.sin(th)).toFixed(1)},${(cy - R * r * Math.cos(th)).toFixed(1)}`
  }).join('') + 'Z'
  const inZone = h >= 0.1 && h <= 0.25
  return (
    <>
      <Diagram w={W} h={H} title={`Horizontal dipole ${fmt(h, 2)} wavelength high: signal straight up is ${fmt(up(h) * 100, 2)} percent of its best case. Strongest overhead between 1/10 and 1/4 wavelength, a null overhead at 1/2 wavelength`}
        caption="NVIS wants energy sent nearly straight up. A low horizontal dipole does that; at ½ λ it fires almost nothing overhead.">
        <T x={cx} y={16} anchor="middle" size={13} bold color={C.muted}>Elevation pattern, end-on</T>
        <Ln x1={14} y1={cy} x2={cx + R + 10} y2={cy} color={C.muted} width={3} />
        <path d={ep} fill={C.signal} fillOpacity={0.22} stroke={C.signal} strokeWidth={3} strokeLinejoin="round" />
        <Ln x1={cx} y1={cy - R - 6} x2={cx} y2={cy - R - 22} color={C.good} width={3} arrow />
        <T x={cx + 10} y={cy - R - 14} size={12} bold color={C.good}>straight up</T>

        <T x={(gx0 + gx1) / 2} y={16} anchor="middle" size={13} bold color={C.muted}>Straight-up signal vs height</T>
        <rect x={X(0.1)} y={gy1} width={X(0.25) - X(0.1)} height={gy0 - gy1} fill={C.good} fillOpacity={0.15} />
        <T x={(X(0.1) + X(0.25)) / 2} y={gy0 - 14} anchor="middle" size={12} bold color={C.good}>NVIS</T>
        <Ln x1={gx0} y1={gy0} x2={gx1} y2={gy0} color={C.muted} width={2} />
        <Ln x1={gx0} y1={gy0} x2={gx0} y2={gy1 - 6} color={C.muted} width={2} />
        {[0, 0.25, 0.5, 0.75].map((v) => (
          <g key={v}>
            <Ln x1={X(v)} y1={gy0} x2={X(v)} y2={gy0 + 6} color={C.muted} width={2} />
            <T x={X(v)} y={gy0 + 20} anchor="middle" size={12} color={C.muted}>{v === 0.25 ? '¼' : v === 0.5 ? '½' : v === 0.75 ? '¾' : '0'} λ</T>
          </g>
        ))}
        <Ln x1={X(0.1)} y1={gy0} x2={X(0.1)} y2={gy0 + 6} color={C.muted} width={2} />
        <T x={X(0.1) + 2} y={gy0 + 36} anchor="middle" size={12} color={C.muted}>1/10 λ</T>
        <path d={curve} fill="none" stroke={C.signal} strokeWidth={3.5} strokeLinecap="round" />
        <circle cx={X(h)} cy={Y(up(h))} r={7} fill={C.resist} stroke={C.bg} strokeWidth={2.5} />
        <T x={X(0.5)} y={gy0 + 36} anchor="middle" size={12} bold color={C.bad}>null overhead</T>
      </Diagram>
      <Controls>
        <Slider label="Dipole height" value={h} min={0.03} max={0.75} step={0.01} onChange={setH} format={(v) => `${fmt(v, 2)} λ`} color="var(--d-resist)" />
        <Readout label="Straight-up signal" value={fmt(up(h) * 100, 2)} unit="% of best" color={inZone ? 'var(--d-good)' : 'var(--d-bad)'} />
      </Controls>
    </>
  )
}
