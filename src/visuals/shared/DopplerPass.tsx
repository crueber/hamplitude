import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T, useTime } from '../kit'

const ECX = 320, ECY = 350, ER = 215, OR = 265, TH = (36 * Math.PI) / 180
const SX = ECX, SY = ECY - ER // ground station
const sat = (th: number) => ({ x: ECX + OR * Math.sin(th), y: ECY - OR * Math.cos(th) })
const range = (th: number) => { const p = sat(th); return Math.hypot(p.x - SX, p.y - SY) }
/** +1 = fastest approach (frequency highest), -1 = fastest recession, 0 = closest approach. */
const shift = (pos: number) => {
  const th = -TH + 2 * TH * pos, e = 1e-4
  const d = (range(th + e) - range(th - e)) / (2 * e)
  const dmax = (range(TH + e) - range(TH - e)) / (2 * e)
  return -d / dmax
}

/** A satellite pass over your station: frequency is high while approaching, same at closest approach, low while receding. */
export function DopplerPass() {
  const { t, ref } = useTime(1)
  const [playing, setPlaying] = useState(true)
  const [manual, setManual] = useState(0.15)
  const pos = playing ? (t * 0.07 + 0.12) % 1 : manual
  const th = -TH + 2 * TH * pos
  const p = sat(th)
  const s = shift(pos)
  const state = s > 0.12 ? 'approaching: frequency higher' : s < -0.12 ? 'receding: frequency lower' : 'closest: frequency unchanged'
  const col = s > 0.12 ? C.voltage : s < -0.12 ? C.current : C.good
  const gx0 = 110, gx1 = 600, gy = 262, ga = 52
  const curve: string[] = []
  for (let i = 0; i <= 80; i++) curve.push(`${i ? 'L' : 'M'}${(gx0 + ((gx1 - gx0) * i) / 80).toFixed(1)},${(gy - ga * shift(i / 80)).toFixed(1)}`)
  const mx = gx0 + (gx1 - gx0) * pos
  const orbit = Array.from({ length: 41 }, (_, i) => { const q = sat(-TH + (2 * TH * i) / 40); return `${i ? 'L' : 'M'}${q.x.toFixed(1)},${q.y.toFixed(1)}` }).join('')
  return (
    <>
      <Diagram w={640} h={345} svgRef={ref} title="A satellite passes overhead. While it approaches, the received frequency is higher than transmitted; at closest approach it is unchanged; while it moves away it is lower."
        caption="Same transmitter all the way. Only the motion changes what you receive.">
        <defs><clipPath id="dp-clip"><rect x={0} y={0} width={640} height={180} /></clipPath></defs>
        <g clipPath="url(#dp-clip)">
          <circle cx={ECX} cy={ECY} r={ER} fill={C.fill} stroke={C.muted} strokeWidth={2} />
        </g>
        <path d={orbit} fill="none" stroke={C.muted} strokeWidth={1.5} strokeDasharray="3 6" />
        <T x={14} y={24} size={15} bold color={col}>Satellite {state}</T>
        {/* station */}
        <Ln x1={SX} y1={SY} x2={SX} y2={SY - 18} color={C.ink} width={3} />
        <Ln x1={SX - 9} y1={SY - 26} x2={SX} y2={SY - 18} color={C.ink} width={3} />
        <Ln x1={SX + 9} y1={SY - 26} x2={SX} y2={SY - 18} color={C.ink} width={3} />
        <T x={SX} y={SY + 20} anchor="middle" size={14} bold>You</T>
        <Ln x1={SX} y1={SY - 20} x2={p.x} y2={p.y} color={col} width={2} dash="5 5" />
        {/* satellite */}
        <g transform={`translate(${p.x},${p.y}) rotate(${(th * 180) / Math.PI})`}>
          <rect x={-8} y={-6} width={16} height={12} rx={3} fill={C.power} stroke={C.bg} strokeWidth={2} />
          <rect x={-26} y={-3} width={14} height={6} fill={C.signal} />
          <rect x={12} y={-3} width={14} height={6} fill={C.signal} />
        </g>
        <Ln x1={p.x - 4} y1={p.y - 26} x2={p.x + 36} y2={p.y - 26 + 36 * Math.sin(th)} color={C.muted} width={2.5} arrow />
        {/* graph */}
        <Ln x1={gx0} y1={gy} x2={gx1} y2={gy} color={C.muted} width={1.5} dash="4 5" />
        <Ln x1={gx0} y1={202} x2={gx0} y2={322} color={C.muted} width={2} />
        <T x={14} y={216} size={13} bold color={C.voltage}>Higher</T>
        <T x={14} y={gy} size={13} bold color={C.good}>Same</T>
        <T x={14} y={308} size={13} bold color={C.current}>Lower</T>
        <path d={curve.join('')} fill="none" stroke={C.signal} strokeWidth={3.5} strokeLinecap="round" />
        <Ln x1={mx} y1={202} x2={mx} y2={322} color={col} width={1.5} dash="3 4" />
        <circle cx={mx} cy={gy - ga * s} r={8} fill={col} stroke={C.bg} strokeWidth={3} />
        <T x={gx0 + 6} y={334} size={12} color={C.muted}>time during the pass →</T>
      </Diagram>
      <Controls>
        <Slider label="Satellite position" value={pos} min={0} max={1} step={0.005} onChange={(v) => { setPlaying(false); setManual(v) }} format={(v) => (v < 0.45 ? 'approaching' : v > 0.55 ? 'receding' : 'overhead')} color="var(--d-signal)" />
        <Readout label="You receive" value={s > 0.12 ? 'Higher' : s < -0.12 ? 'Lower' : 'Same'} color={col} />
      </Controls>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Animation" value={playing ? 'play' : 'pause'} onChange={(v) => { if (v === 'play') setPlaying(true); else { setManual(pos); setPlaying(false) } }} options={[{ value: 'play', label: 'Play' }, { value: 'pause', label: 'Pause' }]} />
      </div>
    </>
  )
}
