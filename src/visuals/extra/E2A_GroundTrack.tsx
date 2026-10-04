import { C, Diagram, T, TAU } from '../kit'

const X0 = 30, X1 = 610, Y0 = 30, Y1 = 230, INC = 65
const mx = (lon: number) => X0 + ((lon + 180) / 360) * (X1 - X0)
const my = (lat: number) => (Y0 + Y1) / 2 - (lat / 90) * ((Y1 - Y0) / 2)
/** Ground track of one orbit starting at the southern extreme; Earth turns ~25° under the satellite per lap. */
const pt = (ph: number) => {
  const lat = INC * Math.sin(ph)
  const lon = -175 + ((ph + Math.PI / 2) / TAU) * 335
  return { x: mx(lon), y: my(lat) }
}
const seg = (a: number, b: number) =>
  Array.from({ length: 61 }, (_, i) => { const p = pt(a + ((b - a) * i) / 60); return `${i ? 'L' : 'M'}${p.x.toFixed(1)},${p.y.toFixed(1)}` }).join('')

/** Ascending pass = satellite moving south to north; descending = north to south. */
export function E2A_GroundTrack() {
  const asc = pt(0), desc = pt(Math.PI)
  return (
    <Diagram w={640} h={290} title="A flat world map with one orbit's ground track: the half of the track where the satellite moves from south to north is the ascending pass, and the half moving north to south is the descending pass" caption="Ascending = heading north. Descending = heading south. East and west do not matter.">
      <rect x={X0} y={Y0} width={X1 - X0} height={Y1 - Y0} rx={8} fill={C.fill} stroke={C.fill2} strokeWidth={2} />
      <line x1={X0} y1={my(0)} x2={X1} y2={my(0)} stroke={C.muted} strokeWidth={1.2} strokeDasharray="4 6" />
      <T x={X1 - 6} y={my(0) - 11} anchor="end" size={12} color={C.muted}>equator</T>
      <T x={X0 + 8} y={Y0 + 14} size={12} bold color={C.muted}>N</T>
      <T x={X0 + 8} y={Y1 - 14} size={12} bold color={C.muted}>S</T>
      <path d={seg(-Math.PI / 2, Math.PI / 2)} fill="none" stroke={C.signal} strokeWidth={4.5} strokeLinecap="round" />
      <path d={seg(Math.PI / 2, (3 * Math.PI) / 2)} fill="none" stroke={C.power} strokeWidth={4.5} strokeLinecap="round" />
      <g transform={`translate(${asc.x},${asc.y})`}>
        <path d="M0,-12 L8,2 L-8,2 z" fill={C.signal} stroke={C.bg} strokeWidth={2} transform="rotate(50)" />
      </g>
      <g transform={`translate(${desc.x},${desc.y})`}>
        <path d="M0,12 L8,-2 L-8,-2 z" fill={C.power} stroke={C.bg} strokeWidth={2} transform="rotate(-50)" />
      </g>
      <rect x={60} y={246} width={22} height={6} rx={3} fill={C.signal} />
      <T x={90} y={250} size={14} bold color={C.signal}>Ascending: south → north</T>
      <rect x={350} y={246} width={22} height={6} rx={3} fill={C.power} />
      <T x={380} y={250} size={14} bold color={C.power}>Descending: north → south</T>
      <T x={320} y={274} anchor="middle" size={13} color={C.muted}>Earth turns under the orbit, so each lap crosses the map further west.</T>
    </Diagram>
  )
}
