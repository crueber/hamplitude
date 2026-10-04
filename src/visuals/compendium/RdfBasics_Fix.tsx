import { useState } from 'react'
import { C, Controls, Diagram, Ln, Slider, T, fmt } from '../kit'

const RAD = Math.PI / 180
type P = { x: number; y: number }

/** Keep the part of a convex polygon where f(p) >= 0 (Sutherland-Hodgman, one half-plane). */
function clip(poly: P[], f: (p: P) => number): P[] {
  const out: P[] = []
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i], b = poly[(i + 1) % poly.length]
    const fa = f(a), fb = f(b)
    if (fa >= 0) out.push(a)
    if ((fa >= 0) !== (fb >= 0)) {
      const t = fa / (fa - fb)
      out.push({ x: a.x + t * (b.x - a.x), y: a.y + t * (b.y - a.y) })
    }
  }
  return out
}

const TX: P = { x: 410, y: 108 }
const DIST = 210
const A0 = 150 // direction from the transmitter to hunter A, in screen degrees

/** Two bearings, each with an error wedge. Where the wedges overlap is where the transmitter might be. */
export function RdfBasics_Fix() {
  const [err, setErr] = useState(5)
  const [ang, setAng] = useState(60)

  const hunt = (a: number): P => ({ x: TX.x + DIST * Math.cos(a * RAD), y: TX.y + DIST * Math.sin(a * RAD) })
  const A = hunt(A0)
  const B = hunt(A0 - ang)
  const dir = (h: P, off: number): P => {
    const base = Math.atan2(TX.y - h.y, TX.x - h.x)
    return { x: Math.cos(base + off * RAD), y: Math.sin(base + off * RAD) }
  }
  const aL = dir(A, -err), aR = dir(A, err), bL = dir(B, -err), bR = dir(B, err)
  const LEN = DIST * 1.3
  let quad: P[] = [A, { x: A.x + aL.x * LEN, y: A.y + aL.y * LEN }, { x: A.x + aR.x * LEN, y: A.y + aR.y * LEN }]
  // cross(dir, p - apex): positive on the right-hand side of the left edge, negative left of the right edge
  quad = clip(quad, (p) => bL.x * (p.y - B.y) - bL.y * (p.x - B.x))
  quad = clip(quad, (p) => -(bR.x * (p.y - B.y) - bR.y * (p.x - B.x)))
  let longest = 0
  for (let i = 0; i < quad.length; i++) for (let j = i + 1; j < quad.length; j++) longest = Math.max(longest, Math.hypot(quad[i].x - quad[j].x, quad[i].y - quad[j].y))
  const pct = (longest / DIST) * 100
  const wedge = (h: P, l: P, r: P) => {
    const L = LEN
    return `M${h.x},${h.y} L${h.x + l.x * L},${h.y + l.y * L} L${h.x + r.x * L},${h.y + r.y * L}Z`
  }
  const centre = (h: P) => ({ x: h.x + (TX.x - h.x) * 1.3, y: h.y + (TX.y - h.y) * 1.3 })
  const ca = centre(A), cb = centre(B)
  const qd = quad.length < 3 ? '' : quad.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join('') + 'Z'
  return (
    <>
      <Diagram w={640} h={362}
        title={`Two bearings, each with ${err} degrees of error, crossing at ${ang} degrees. The overlap of the two error wedges is about ${fmt(pct, 2)} percent of the distance to the transmitter across its longest dimension`}
        caption="Each bearing is a wedge, not a line. The transmitter could be anywhere in the overlap. Illustrative geometry.">
        <path d={wedge(A, aL, aR)} fill={C.signal} fillOpacity={0.14} stroke={C.signal} strokeWidth={1.2} />
        <path d={wedge(B, bL, bR)} fill={C.power} fillOpacity={0.14} stroke={C.power} strokeWidth={1.2} />
        <Ln x1={A.x} y1={A.y} x2={ca.x} y2={ca.y} color={C.signal} width={2} dash="7 6" />
        <Ln x1={B.x} y1={B.y} x2={cb.x} y2={cb.y} color={C.power} width={2} dash="7 6" />
        <path d={qd} fill={C.resist} fillOpacity={0.55} stroke={C.resist} strokeWidth={2} strokeLinejoin="round" />
        <circle cx={TX.x} cy={TX.y} r={6} fill={C.bad} stroke={C.bg} strokeWidth={2} />
        <T x={TX.x} y={TX.y - 28} anchor="middle" size={13} bold color={C.bad} stroke={C.bg} strokeWidth={4} paintOrder="stroke">true position</T>
        <circle cx={A.x} cy={A.y} r={9} fill={C.ink} stroke={C.bg} strokeWidth={3} />
        <T x={A.x} y={A.y + 24} anchor="middle" size={13} bold>Bearing A</T>
        <circle cx={B.x} cy={B.y} r={9} fill={C.ink} stroke={C.bg} strokeWidth={3} />
        <T x={B.x} y={B.y + 24} anchor="middle" size={13} bold>Bearing B</T>
        <rect x={14} y={14} width={236} height={90} rx={12} fill={C.fill} />
        <T x={28} y={34} size={12} color={C.muted}>Uncertain region, longest side</T>
        <T x={28} y={62} size={22} bold color={C.resist}>{fmt(pct, 2)}% of the distance</T>
        <T x={28} y={82} size={12} color={C.muted}>{pct > 40 ? 'Long thin smear: move to get a better angle.' : pct > 22 ? 'A usable fix.' : 'A tight fix.'}</T>
      </Diagram>
      <Controls>
        <Slider label="Bearing error (each reading)" value={err} min={0} max={15} step={1} onChange={setErr} format={(v) => `±${v}°`} color="var(--d-resist)" />
        <Slider label="Angle between the two bearings" value={ang} min={10} max={90} step={5} onChange={setAng} format={(v) => `${v}°`} color="var(--d-signal)" />
      </Controls>
    </>
  )
}
