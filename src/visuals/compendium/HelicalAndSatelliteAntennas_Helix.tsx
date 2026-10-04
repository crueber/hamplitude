import { C, Diagram, Ln, T, TAU } from '../kit'

/** Axial-mode helix over a reflector, right-hand and left-hand. A right-hand helix radiates right-hand circular polarization along its axis. */
export function HelicalAndSatelliteAntennas_Helix() {
  const r = 28 // radius: circumference = 2*pi*r = one wavelength
  const lam = TAU * r
  const S = 0.25 * lam // turn spacing = 1/4 wavelength
  const turns = 4
  const gy = 262
  const build = (cx: number, hand: 1 | -1) => {
    const front: string[] = [], back: string[] = []
    const steps = turns * 48
    const pts = Array.from({ length: steps + 1 }, (_, i) => {
      const t = (i / 48) * TAU // right-hand: viewer-facing strands (sin t < 0) rise toward the right
      const x = cx + hand * r * Math.cos(t)
      const y = gy - 14 - (S * t) / TAU
      return { x, y, near: Math.sin(t) < 0 }
    })
    let cur: typeof pts = []
    const flush = (near: boolean) => {
      if (cur.length > 1) (near ? front : back).push(cur.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(''))
      cur = []
    }
    let nearState = pts[0].near
    pts.forEach((p) => {
      if (p.near !== nearState) { cur.push(p); flush(nearState); nearState = p.near; cur.push(p) } else cur.push(p)
    })
    flush(nearState)
    return { front, back }
  }
  const panels = [
    { cx: 150, hand: 1 as const, title: 'Right-hand helix', sub: 'radiates right-hand circular (RHCP)', color: C.signal },
    { cx: 365, hand: -1 as const, title: 'Left-hand helix', sub: 'radiates left-hand circular (LHCP)', color: C.power },
  ]
  return (
    <Diagram w={640} h={330}
      title="Two axial-mode helical antennas on a reflector plate. The right-hand helix winds like a normal screw thread and radiates right-hand circular polarization along its axis; the left-hand helix is its mirror image and radiates left-hand circular polarization"
      caption="Axial mode: one wavelength round each turn, a quarter wavelength between turns. The beam points along the axis, away from the reflector.">
      {panels.map((p) => {
        const h = build(p.cx, p.hand)
        const top = gy - 14 - S * turns
        return (
          <g key={p.cx}>
            <rect x={p.cx - 66} y={gy - 8} width={132} height={8} rx={3} fill={C.fill2} stroke={C.muted} strokeWidth={1.5} />
            <T x={p.cx - 74} y={gy + 6} anchor="end" size={12} color={C.muted}>reflector</T>
            {h.back.map((d, i) => <path key={'b' + i} d={d} fill="none" stroke={p.color} strokeOpacity={0.4} strokeWidth={3} strokeDasharray="5 4" strokeLinecap="round" />)}
            {h.front.map((d, i) => <path key={'f' + i} d={d} fill="none" stroke={p.color} strokeWidth={4.5} strokeLinecap="round" />)}
            <Ln x1={p.cx} y1={top - 8} x2={p.cx} y2={top - 44} color={C.good} width={3} arrow />
            <T x={p.cx + 10} y={top - 26} size={12} bold color={C.good}>beam</T>
            <T x={p.cx} y={gy + 28} anchor="middle" size={13} bold color={p.color}>{p.title}</T>
            <T x={p.cx} y={gy + 46} anchor="middle" size={12} color={C.muted}>{p.sub}</T>
          </g>
        )
      })}
      <rect x={450} y={50} width={180} height={150} rx={10} fill={C.fill} />
      <T x={464} y={72} size={13} bold color={C.muted}>Axial mode</T>
      <T x={464} y={98} size={12.5}>Each turn: about 1 λ round</T>
      <T x={464} y={120} size={12.5}>Turn spacing: about ¼ λ</T>
      <T x={464} y={142} size={12.5}>More turns: more gain,</T>
      <T x={464} y={160} size={12.5}>narrower beam</T>
      <T x={464} y={186} size={12} color={C.muted}>Winding sets handedness</T>
    </Diagram>
  )
}
