import { useState } from 'react'
import { C, Controls, Diagram, Readout, Slider, T } from '../kit'

const SPOTS: [number, number][] = [[-14, -8], [10, -16], [18, 6], [-6, 10], [-20, 14], [4, 22], [24, -6], [-24, -2], [0, 0], [14, 20]]
const BANDS = [
  { n: '20 m', f: 14.0, always: true },
  { n: '15 m', f: 21.0 },
  { n: '12 m', f: 24.9 },
  { n: '10 m', f: 28.0 },
]

/** Sunspots -> UV and X-ray -> F-region ionization -> MUF -> which bands are open by day. */
export function SunChain() {
  const [a, setA] = useState(70)
  const level = a < 33 ? 'low' : a < 66 ? 'medium' : 'high'
  const muf = 15 + (a / 100) * 20 // schematic daytime MUF, MHz
  const n = Math.round((a / 100) * 10)
  const boxes = [
    { x: 14, label: 'Sunspots', sub: level === 'low' ? 'few' : level === 'medium' ? 'some' : 'many' },
    { x: 178, label: 'UV + X-ray', sub: `${level} solar flux` },
    { x: 342, label: 'F region', sub: level === 'low' ? 'weakly ionized' : level === 'medium' ? 'ionized' : 'strongly ionized' },
    { x: 506, label: 'MUF', sub: `${level}` },
  ]
  return (
    <>
      <Diagram w={640} h={300} title={`Solar activity ${level}: more sunspots mean more ultraviolet and X-ray radiation, a denser F region, and a higher MUF, so higher bands open`}
        caption="Schematic daytime chain. The 20 m band stays open at any point in the solar cycle.">
        {boxes.map((b, i) => (
          <g key={b.label}>
            <rect x={b.x} y={26} width={120} height={92} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2} />
            {i === 0 ? (
              <>
                <circle cx={b.x + 60} cy={58} r={28} fill={C.resist} fillOpacity={0.35} stroke={C.resist} strokeWidth={2} />
                {SPOTS.slice(0, n).map(([dx, dy], k) => <circle key={k} cx={b.x + 60 + dx * 0.9} cy={58 + dy * 0.9} r={3.2} fill={C.ink} />)}
              </>
            ) : (
              <T x={b.x + 60} y={52} anchor="middle" bold size={15}>{b.label}</T>
            )}
            {i === 0 && <T x={b.x + 60} y={100} anchor="middle" bold size={14}>{b.label}</T>}
            {i > 0 && <T x={b.x + 60} y={78} anchor="middle" size={13} color={C.muted}>{b.sub}</T>}
            {i < 3 && <path d={`M${b.x + 126},72 L${b.x + 158},72`} stroke={C.ink} strokeWidth={3} markerEnd="url(#hx-arrow)" fill="none" />}
          </g>
        ))}
        <T x={14} y={152} bold size={14}>Daytime bands the F region can return</T>
        {BANDS.map((b, i) => {
          const open = b.f <= muf
          const x = 14 + i * 157
          return (
            <g key={b.n}>
              <rect x={x} y={170} width={142} height={64} rx={10} fill={open ? C.good : C.fill} fillOpacity={open ? 0.28 : 1} stroke={open ? C.good : C.muted} strokeWidth={2} strokeDasharray={open ? undefined : '5 4'} />
              <T x={x + 71} y={192} anchor="middle" bold size={16} color={open ? C.ink : C.muted}>{b.n}</T>
              <T x={x + 71} y={216} anchor="middle" size={13} bold color={open ? C.good : C.bad}>{open ? 'open' : 'above the MUF'}</T>
            </g>
          )
        })}
        <T x={14} y={262} size={14} bold>
          {muf >= 28 ? '10 m is open: best time for the high bands' : muf >= 21 ? '15 m opens; 12 and 10 m need more sunspots' : 'Low activity: 15, 12 and 10 m are unreliable'}
        </T>
        <T x={14} y={284} size={13} color={C.muted}>20 m works worldwide in daylight at any point in the cycle.</T>
      </Diagram>
      <Controls>
        <Slider label="Solar activity" value={a} min={0} max={100} step={5} onChange={setA} format={(v) => (v < 33 ? 'low' : v < 66 ? 'medium' : 'high')} color="var(--d-resist)" />
        <Readout label="Schematic daytime MUF" value={Math.round(muf)} unit=" MHz" color="var(--d-power)" />
      </Controls>
    </>
  )
}
