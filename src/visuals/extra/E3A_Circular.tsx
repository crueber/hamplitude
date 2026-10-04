import { useState } from 'react'
import { C, Choice, Diagram, Ln, T, TAU, useTime } from '../kit'

/** Linear polarization: E swings along one line. Circular: E (and H) rotate as the wave moves. */
export function Circular() {
  const [mode, setMode] = useState<'lin' | 'circ'>('circ')
  const { t, ref } = useTime(0.5)
  const circ = mode === 'circ'
  // head-on view
  const cx = 130, cy = 130, R = 70
  const a = -t * TAU
  const ex = circ ? R * Math.cos(a) : 0
  const ey = circ ? R * Math.sin(a) : R * Math.sin(a)
  const hx = circ ? -ey : R * Math.sin(a)
  const hy = circ ? ex : 0
  // side view
  const x0 = 270, x1 = 560, sy = 130, A = 56
  const helix = (isE: boolean) => {
    const pts: string[] = []
    for (let i = 0; i <= 120; i++) {
      const x = x0 + ((x1 - x0) * i) / 120
      const ph = (TAU * 2 * (x - x0)) / (x1 - x0) + a
      // E along screen-vertical; H along the depth axis. Circular: the pair rotates (90° apart).
      const [y, z] = isE ? (circ ? [Math.sin(ph), Math.cos(ph)] : [Math.sin(ph), 0]) : (circ ? [Math.cos(ph), -Math.sin(ph)] : [0, Math.sin(ph)])
      pts.push(`${i ? 'L' : 'M'}${(x - 0.2 * A * z).toFixed(1)},${(sy - A * y + 0.45 * A * z).toFixed(1)}`)
    }
    return pts.join('')
  }
  return (
    <>
      <Diagram w={640} h={270} svgRef={ref}
        title={circ ? 'Circularly polarized wave: the electric and magnetic fields rotate as the wave travels, tracing a corkscrew' : 'Linearly polarized wave: the electric field stays on one line'}
        caption="Left: looking into the oncoming wave. Right: oblique side view of E (red) and H (blue).">
        <circle cx={cx} cy={cy} r={R} fill="none" stroke={C.muted} strokeWidth={1.2} strokeDasharray="3 5" />
        <Ln x1={cx - R - 10} y1={cy} x2={cx + R + 10} y2={cy} color={C.muted} width={1} />
        <Ln x1={cx} y1={cy - R - 10} x2={cx} y2={cy + R + 10} color={C.muted} width={1} />
        <Ln x1={cx} y1={cy} x2={cx + ex} y2={cy - ey} color={C.voltage} width={5} arrow />
        <Ln x1={cx} y1={cy} x2={cx + hx} y2={cy - hy} color={C.current} width={4} arrow />
        <T x={cx} y={228} anchor="middle" size={14} bold color={C.voltage}>E field</T>
        <T x={cx} y={248} anchor="middle" size={14} bold color={C.current}>H field (always 90° from E)</T>
        <Ln x1={x0 - 10} y1={sy} x2={x1 + 20} y2={sy} color={C.muted} width={2} arrow />
        <T x={x1 + 22} y={sy + 16} size={13} color={C.muted} bold>travel</T>
        <path d={helix(false)} fill="none" stroke={C.current} strokeWidth={3} strokeLinecap="round" opacity={0.85} />
        <path d={helix(true)} fill="none" stroke={C.voltage} strokeWidth={3.5} strokeLinecap="round" />
        <T x={x0} y={30} size={15} bold color={C.signal}>{circ ? 'Circular: fields rotate' : 'Linear: fields swing back and forth'}</T>
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Polarization" value={mode} onChange={setMode} options={[{ value: 'lin', label: 'Linear' }, { value: 'circ', label: 'Circular' }]} />
      </div>
    </>
  )
}
