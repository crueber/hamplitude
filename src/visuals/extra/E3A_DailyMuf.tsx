import { useState } from 'react'
import { C, Choice, Diagram, Ln, T } from '../kit'

// Schematic MUF over a day: lowest before dawn, peak early afternoon. Illustrative, not real data.
const muf = (h: number) => 21 + 9 * Math.cos(((h - 14) / 24) * 2 * Math.PI) - 1.5 * Math.cos(((h - 14) / 12) * 2 * Math.PI)
const BANDS = [{ n: '40 m', f: 7 }, { n: '20 m', f: 14 }, { n: '15 m', f: 21 }, { n: '10 m', f: 28 }]

/** The MUF falls after sunset; a band whose frequency is above it stops working, so move down. */
export function DailyMuf() {
  const [b, setB] = useState(14)
  const x0 = 60, x1 = 610, y0 = 250, y1 = 40
  const X = (h: number) => x0 + (h / 24) * (x1 - x0)
  const Y = (f: number) => y0 - ((f - 4) / 30) * (y0 - y1)
  const hrs = Array.from({ length: 97 }, (_, i) => i / 4)
  const curve = hrs.map((h, i) => `${i ? 'L' : 'M'}${X(h).toFixed(1)},${Y(muf(h)).toFixed(1)}`).join('')
  const open = hrs.map((h) => muf(h) >= b)
  const segs: [number, number][] = []
  const widest = () => segs.reduce((a, c) => (c[1] - c[0] > a[1] - a[0] ? c : a), segs[0])
  let s = -1
  open.forEach((o, i) => { if (!o && s < 0) s = i; if ((o || i === open.length - 1) && s >= 0) { segs.push([hrs[s], hrs[i]]); s = -1 } })
  return (
    <>
      <Diagram w={640} h={300} title="Schematic of how the maximum usable frequency changes over a day. After dark it falls. When it drops below your operating frequency, switch to a lower band"
        caption="Illustrative shape, not real data. MUF is lowest before dawn and peaks in the afternoon.">
        <Ln x1={x0} y1={y0} x2={x1 + 8} y2={y0} color={C.muted} width={2} arrow />
        <Ln x1={x0} y1={y0} x2={x0} y2={y1 - 12} color={C.muted} width={2} arrow />
        <T x={x0 + 8} y={y1 - 20} size={13} bold color={C.muted}>frequency (MHz)</T>
        {[0, 6, 12, 18, 24].map((h) => (
          <T key={h} x={X(h)} y={y0 + 18} anchor="middle" size={12} color={C.muted}>{`${String(h).padStart(2, '0')}:00`}</T>
        ))}
        <T x={x1} y={y0 + 38} anchor="end" size={12} color={C.muted}>local time at the path midpoint</T>
        {segs.map(([a, c], i) => (
          <rect key={i} x={X(a)} y={y1} width={X(c) - X(a)} height={y0 - y1} fill={C.bad} fillOpacity={0.12} />
        ))}
        <path d={curve} fill="none" stroke={C.signal} strokeWidth={4} strokeLinecap="round" />
        <T x={X(14)} y={Y(muf(14)) - 14} anchor="middle" size={13} bold color={C.signal}>MUF</T>
        <Ln x1={x0} y1={Y(b)} x2={x1} y2={Y(b)} color={C.power} width={2.5} dash="6 5" />
        <T x={b === 14 ? X(10) : x0 + 8} y={b === 14 ? Y(b) + 14 : Y(b) - 12} size={13} bold color={C.power}>{`your band: ${b} MHz`}</T>
        {segs.length > 0 && <T x={widest()[0] === 0 ? x0 + 8 : widest()[1] === 24 ? x1 - 4 : (X(widest()[0]) + X(widest()[1])) / 2} y={y0 - 20} anchor={widest()[0] === 0 ? 'start' : widest()[1] === 24 ? 'end' : 'middle'} size={13} bold color={C.bad}>closed: MUF too low</T>}
        {segs.length === 0 && <T x={(x0 + x1) / 2} y={y0 - 60} anchor="middle" size={13} bold color={C.good}>MUF stays above this band all day</T>}
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Operating band" value={b} onChange={setB} options={BANDS.map((x) => ({ value: x.f, label: x.n }))} />
      </div>
    </>
  )
}
