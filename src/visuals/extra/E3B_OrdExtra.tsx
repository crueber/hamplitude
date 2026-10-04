import { C, Diagram, Ln, T, useTime } from '../kit'

function Ell({ x, y, rot, color }: { x: number; y: number; rot: number; color: string }) {
  return <ellipse cx={x} cy={y} rx={18} ry={8} transform={`rotate(${rot} ${x} ${y})`} fill="none" stroke={color} strokeWidth={3} />
}

/** The ionosphere splits one signal into two independent, elliptically polarized waves. */
export function OrdExtra() {
  const { t, ref } = useTime(0.3)
  const f = t % 1.2 > 1 ? 1 : t % 1.2
  const along = (pts: [number, number][]) => {
    const segs = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]))
    let d = f * segs.reduce((a, b) => a + b, 0)
    for (let i = 0; i < segs.length; i++) {
      if (d <= segs[i]) return [pts[i][0] + ((pts[i + 1][0] - pts[i][0]) * d) / segs[i], pts[i][1] + ((pts[i + 1][1] - pts[i][1]) * d) / segs[i]]
      d -= segs[i]
    }
    return pts[pts.length - 1]
  }
  const O: [number, number][] = [[110, 238], [275, 82], [440, 238]]
  const X: [number, number][] = [[110, 238], [275, 112], [440, 238]]
  const o = along(O), x = along(X)
  return (
    <Diagram w={640} h={310} svgRef={ref}
      title="One signal entering the ionosphere splits into two independently propagating, elliptically polarized waves, called the ordinary and extraordinary waves"
      caption="Schematic. Both waves are created in the ionosphere and travel independently.">
      <rect x={20} y={64} width={600} height={64} rx={10} fill={C.fill2} opacity={0.7} stroke={C.muted} strokeDasharray="5 5" />
      <T x={608} y={78} anchor="end" size={13} bold color={C.muted}>Ionosphere</T>
      <rect x={20} y={256} width={600} height={28} rx={8} fill={C.fill} stroke={C.muted} strokeWidth={1.5} />
      <Ln x1={110} y1={256} x2={110} y2={238} color={C.ink} width={3} />
      <Ln x1={440} y1={256} x2={440} y2={238} color={C.ink} width={3} />
      <T x={110} y={270} anchor="middle" size={13} bold>You</T>
      <T x={440} y={270} anchor="middle" size={13} bold>Receiver</T>
      <polyline points={X.map((p) => p.join(',')).join(' ')} fill="none" stroke={C.power} strokeWidth={3} strokeDasharray="2 7" strokeLinecap="round" />
      <polyline points={O.map((p) => p.join(',')).join(' ')} fill="none" stroke={C.signal} strokeWidth={3} strokeDasharray="2 7" strokeLinecap="round" />
      <circle cx={o[0]} cy={o[1]} r={6} fill={C.signal} stroke={C.bg} strokeWidth={2} />
      <circle cx={x[0]} cy={x[1]} r={6} fill={C.power} stroke={C.bg} strokeWidth={2} />
      <T x={30} y={24} size={15} bold>One signal in, two waves made</T>
      <g>
        <Ell x={550} y={150} rot={-25} color={C.signal} />
        <T x={550} y={176} anchor="middle" size={14} bold color={C.signal}>ordinary</T>
        <Ell x={550} y={204} rot={30} color={C.power} />
        <T x={550} y={230} anchor="middle" size={14} bold color={C.power}>extraordinary</T>
      </g>
      <T x={30} y={46} size={13} color={C.muted}>Earth's magnetic field splits the signal. Each wave is elliptically polarized.</T>
    </Diagram>
  )
}
