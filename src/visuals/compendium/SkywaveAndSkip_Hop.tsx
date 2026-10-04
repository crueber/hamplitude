import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

const RE = 6371 // km
const KM_PER_MI = 1.609344
const LAYERS = { E: { h: 110, y: 130 }, F: { h: 300, y: 70 } } as const
type LayerId = keyof typeof LAYERS

/** One-hop ground distance (km) for a ray leaving at elevation angle eps and turning back at height h (spherical Earth, mirror model). */
export function hopKm(epsDeg: number, h: number): number {
  const e = (epsDeg * Math.PI) / 180
  const theta = Math.PI / 2 - e - Math.asin((RE * Math.cos(e)) / (RE + h))
  return 2 * RE * theta
}

const X0 = 60, PX_PER_MI = 0.2, GY = 220

export function SkywaveAndSkip_Hop() {
  const [eps, setEps] = useState(15)
  const [layer, setLayer] = useState<LayerId>('F')
  const L = LAYERS[layer]
  const mi = hopKm(eps, L.h) / KM_PER_MI
  const hop = mi * PX_PER_MI
  const col = layer === 'F' ? C.power : C.current
  const hops = [0, 1].filter((k) => X0 + (k + 1) * hop <= 622)
  const miR = Math.round(mi / 10) * 10
  return (
    <>
      <Diagram w={640} h={290}
        title={`A signal leaving at ${eps} degrees and returning from the ${layer} layer lands about ${miR} miles away. No skywave signal arrives closer than that, which is the skip zone.`}
        caption="Schematic (model: mirror at a typical height, round Earth). Low takeoff angle, long hop; high angle, short hop.">
        <rect x={20} y={L.y - 14} width={600} height={30} rx={8} fill={col} fillOpacity={0.16} stroke={col} strokeDasharray="5 5" />
        <T x={610} y={L.y} anchor="end" size={13} bold color={col}>{layer} layer</T>
        <rect x={20} y={GY} width={600} height={28} rx={8} fill={C.fill} stroke={C.muted} strokeWidth={1.5} />
        <Ln x1={X0} y1={GY} x2={X0} y2={GY - 16} color={C.ink} width={4} />
        <T x={X0} y={GY + 14} anchor="middle" size={13} bold>You</T>
        {hops.map((k) => {
          const a = X0 + k * hop, b = X0 + (k + 1) * hop
          return (
            <g key={k}>
              <polyline points={`${a},${GY - 16} ${(a + b) / 2},${L.y} ${b},${GY - 16}`} fill="none" stroke={col} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 7" />
              <circle cx={b} cy={GY - 8} r={6} fill={C.good} stroke={C.bg} strokeWidth={2} />
            </g>
          )
        })}
        {hops.length > 0 && hop > 70 && (
          <g>
            <Ln x1={X0 + 22} y1={GY - 40} x2={X0 + hop - 6} y2={GY - 40} color={C.bad} width={3} arrow="both" />
            <T x={(X0 + 22 + X0 + hop - 6) / 2} y={GY - 56} anchor="middle" size={13} bold color={C.bad}>skip zone</T>
          </g>
        )}
        <T x={20} y={22} size={14} bold>{`Takeoff angle ${eps}°`}</T>
      </Diagram>
      <Controls>
        <Slider label="Takeoff angle above the horizon" value={eps} min={3} max={85} onChange={setEps} format={(v) => `${v}°`} color={col} />
        <div>
          <span className="ctl-label" style={{ display: 'block', marginBottom: 6 }}>Reflecting layer</span>
          <Choice label="Layer" value={layer} onChange={setLayer} options={[{ value: 'E', label: 'E (lower)' }, { value: 'F', label: 'F (higher)' }]} />
        </div>
        <Readout label="One hop lands about" value={miR.toLocaleString('en-US')} unit="miles away" color={col} />
      </Controls>
    </>
  )
}
