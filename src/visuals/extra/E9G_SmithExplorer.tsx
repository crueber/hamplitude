import { useRef, useState } from 'react'
import { C, Choice, Controls, Diagram, Lines, Readout, Slider, T, clamp, fmt } from '../kit'
import { SmithGrid, SwrCircle, cabs, gammaOf, rCircle, swrOf, xArcPath, zOf, halo, type Cx, type Geo } from './E9G_SmithBase'

const geo: Geo = { cx: 222, cy: 212, R: 178 }
const MAXG = 0.985

/** Interactive Smith chart: drag the point (or use the sliders) and read r, x, SWR and the circles through it. */
export function SmithExplorer({ normalize = false }: { normalize?: boolean }) {
  const [g, setG] = useState<Cx>(gammaOf(2, 1))
  const [z0, setZ0] = useState(50)
  const ref = useRef<SVGSVGElement | null>(null)
  const drag = useRef(false)
  const z = zOf(g)
  const m = cabs(g)
  const swr = swrOf(g)
  const near = (a: number, b: number) => Math.abs(a - b) < 0.02
  const fromEvent = (e: React.PointerEvent) => {
    const svg = ref.current!
    const pt = svg.createSVGPoint()
    pt.x = e.clientX; pt.y = e.clientY
    const p = pt.matrixTransform(svg.getScreenCTM()!.inverse())
    let re = (p.x - geo.cx) / geo.R, im = -(p.y - geo.cy) / geo.R
    const mm = Math.hypot(re, im)
    if (mm > MAXG) { re *= MAXG / mm; im *= MAXG / mm }
    setG({ re, im })
  }
  const set = (r: number, x: number) => {
    const gg = gammaOf(Math.max(r, 0), x)
    const mm = cabs(gg)
    setG(mm > MAXG ? { re: (gg.re * MAXG) / mm, im: (gg.im * MAXG) / mm } : gg)
  }
  const pt = { x: geo.cx + geo.R * g.re, y: geo.cy - geo.R * g.im }
  const open = z.r > 9.99
  const shorted = Math.hypot(z.r, z.x) < 0.02
  const rc = rCircle(geo, Math.max(z.r, 0))
  const rTxt = open ? '∞' : fmt(z.r, 2)
  const xTxt = `${z.x >= 0 ? '+' : '−'}j${fmt(Math.min(Math.abs(z.x), 99), 2)}`
  const ohm = (v: number) => (Math.abs(v) > 999 ? '∞' : fmt(v * z0, 3))
  return (
    <>
      <Diagram w={640} h={430} svgRef={ref}
        title={`Smith chart. The point is ${rTxt} ${xTxt} normalised, SWR ${fmt(swr, 3)}. Amber circles are constant resistance, teal arcs are constant reactance, the outer circle is the reactance axis, and the horizontal line is the resistance axis.`}
        caption={normalize ? 'The chart is normalised: its center is 1 + j0, which means "equals the line impedance". Change Z₀ and only the ohm labels change.' : 'Drag the point. Every position is one impedance: the circle through it gives r, the arc through it gives x.'}>
        <SmithGrid geo={geo} z0={normalize ? z0 : undefined}>
          {z.r < 40 && <circle cx={rc.cx} cy={rc.cy} r={rc.r} fill="none" stroke={C.resist} strokeWidth={3.5} />}
          {Math.abs(z.x) > 0.03 && <path d={xArcPath(geo, z.x)} fill="none" stroke={C.signal} strokeWidth={3.5} />}
        </SmithGrid>
        <SwrCircle geo={geo} g={g} />
        {/* landmarks */}
        <T x={geo.cx - geo.R + 10} y={geo.cy + 28} size={12} bold color={C.bad} {...halo}>short</T>
        <T x={geo.cx + geo.R - 10} y={geo.cy + 28} size={12} bold color={C.bad} anchor="end" {...halo}>open</T>
        <circle cx={geo.cx} cy={geo.cy} r={4} fill={C.good} stroke={C.bg} strokeWidth={1.5} />
        <T x={geo.cx} y={geo.cy + (normalize ? 30 : 12)} size={12} bold color={C.good} anchor="middle" {...halo}>match</T>
        {/* the point */}
        <circle cx={pt.x} cy={pt.y} r={9} fill={C.ink} stroke={C.bg} strokeWidth={3} />
        <circle cx={geo.cx} cy={geo.cy} r={geo.R} fill="transparent" style={{ cursor: 'grab', touchAction: 'none' }}
          onPointerDown={(e) => { drag.current = true; (e.target as Element).setPointerCapture(e.pointerId); fromEvent(e) }}
          onPointerMove={(e) => { if (drag.current) fromEvent(e) }}
          onPointerUp={() => { drag.current = false }} onPointerCancel={() => { drag.current = false }} />
        {/* legend */}
        <T x={448} y={30} size={13} bold color={C.muted}>Reading the chart</T>
        <circle cx={460} cy={58} r={7} fill="none" stroke={C.resist} strokeWidth={3} />
        <Lines x={476} y={52} lines={['circles:', 'constant r']} lh={15} size={12} bold color={C.resist} />
        <path d="M453,98 q8,-24 16,0" fill="none" stroke={C.signal} strokeWidth={3} />
        <Lines x={476} y={92} lines={['arcs:', 'constant x']} lh={15} size={12} bold color={C.signal} />
        <circle cx={460} cy={130} r={7} fill="none" stroke={C.power} strokeWidth={2.5} strokeDasharray="4 3" />
        <Lines x={476} y={124} lines={['dashed:', 'constant SWR']} lh={15} size={12} bold color={C.power} />
        <Lines x={448} y={176} lines={['straight axis:', 'resistance only', '(x = 0)']} lh={16} size={12} color={C.muted} />
        <Lines x={448} y={238} lines={['outer circle:', 'reactance only', '(r = 0)']} lh={16} size={12} color={C.muted} />
        <Lines x={448} y={300} lines={['upper half:', 'inductive, +jx', 'lower half:', 'capacitive, −jx']} lh={16} size={12} color={C.muted} />
      </Diagram>
      <Controls>
        <Slider label="Resistance r" value={clamp(z.r, 0, 10)} min={0} max={10} step={0.05} onChange={(v) => set(v, z.x)} format={() => rTxt} color="var(--d-resist)" />
        <Slider label="Reactance x" value={clamp(z.x, -10, 10)} min={-10} max={10} step={0.05} onChange={(v) => set(z.r, v)} format={() => xTxt} color="var(--d-signal)" />
        <Readout label={`Impedance on a ${z0} Ω line`} value={open ? 'open' : shorted ? '0 (short)' : `${ohm(z.r)} ${z.x >= 0 ? '+' : '−'} j${ohm(Math.abs(z.x))}`} unit={open || shorted ? '' : 'Ω'} color="var(--d-ink)" />
        <Readout label="SWR" value={swr > 99 ? '> 99' : `${fmt(swr, 3)} : 1`} color="var(--d-power)" />
        <Readout label="|Γ| reflection" value={m > 0.97 ? '≈ 1' : fmt(m, 2)} color="var(--d-bad)" />
      </Controls>
      <div style={{ margin: '-6px 0 14px', display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        <Choice label="Presets" value={near(z.r, 1) && Math.abs(z.x) < 0.02 ? 'match' : z.r < 0.02 && Math.abs(z.x) < 0.02 ? 'short' : open && Math.abs(z.x) < 0.5 ? 'open' : ''}
          onChange={(v) => (v === 'match' ? set(1, 0) : v === 'short' ? set(0, 0) : set(1e3, 0))}
          options={[{ value: 'match', label: 'Match' }, { value: 'short', label: 'Short' }, { value: 'open', label: 'Open' }]} />
        {normalize && <Choice label="Line impedance Z0" value={z0} onChange={setZ0} options={[{ value: 50, label: 'Z₀ = 50 Ω' }, { value: 75, label: 'Z₀ = 75 Ω' }, { value: 300, label: 'Z₀ = 300 Ω' }]} />}
      </div>
    </>
  )
}
