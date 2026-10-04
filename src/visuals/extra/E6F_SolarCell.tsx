import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, fmt } from '../kit'

/** Silicon photovoltaic cell: photons carry energy, electrons absorb it. Open-circuit voltage stays near 0.5 V; current follows the light. */
export function SolarCell() {
  const [light, setLight] = useState(100)
  const L = Math.max(light, 2) / 100
  const voc = 0.5 + 0.026 * Math.log(L) // volts, ideal-diode estimate, 0.5 V at full light
  const isc = light
  const rays = 1 + Math.round(light / 25)
  return (
    <>
      <Diagram w={640} h={262}
        title={`A silicon photovoltaic cell at ${light} percent illumination. Photons deliver the light energy and electrons absorb it. Open-circuit voltage is about ${fmt(voc, 2)} volts, almost constant, while current follows the light.`}
        caption="Photons carry the light; electrons absorb its energy. Fully lit, a silicon cell makes about 0.5 V open-circuit.">
        {Array.from({ length: rays }).map((_, i) => {
          const x = rays === 1 ? 190 : 100 + (i * 180) / (rays - 1)
          return <Ln key={i} x1={x} y1={20} x2={x + 20} y2={86} color={C.resist} width={3} arrow />
        })}
        <T x={20} y={40} size={13} bold color={C.resist}>photons</T>
        <rect x={40} y={90} width={260} height={50} fill={C.current} opacity={0.3} stroke={C.ink} strokeWidth={2.5} />
        <rect x={40} y={140} width={260} height={50} fill={C.resist} opacity={0.3} stroke={C.ink} strokeWidth={2.5} />
        <T x={170} y={115} anchor="middle" size={14} bold color={C.current}>N-type silicon</T>
        <T x={170} y={165} anchor="middle" size={14} bold color={C.resist}>P-type silicon</T>
        <circle cx={150} cy={138} r={6} fill={C.current} />
        <T x={170} y={218} anchor="middle" size={13} color={C.muted}>electrons absorb the light energy</T>
        <T x={170} y={238} anchor="middle" size={13} color={C.muted}>and are pushed across the junction</T>

        <T x={400} y={34} size={14} bold>Open-circuit voltage</T>
        <rect x={400} y={46} width={210} height={26} rx={5} fill={C.fill} />
        <rect x={400} y={46} width={(voc / 0.7) * 210} height={26} rx={5} fill={C.voltage} />
        <T x={400} y={86} size={13} bold color={C.voltage}>{fmt(voc, 2)} V</T>
        <T x={610} y={86} anchor="end" size={12} color={C.muted}>scale 0 to 0.7 V</T>
        <T x={400} y={126} size={14} bold>Short-circuit current</T>
        <rect x={400} y={138} width={210} height={26} rx={5} fill={C.fill} />
        <rect x={400} y={138} width={(isc / 100) * 210} height={26} rx={5} fill={C.current} />
        <T x={400} y={178} size={13} bold color={C.current}>{isc}% of full</T>
        <T x={400} y={212} size={13} color={C.muted}>Efficiency = fraction of the light</T>
        <T x={400} y={230} size={13} color={C.muted}>that is converted to electricity</T>
      </Diagram>
      <Controls>
        <Slider label="Illumination" value={light} min={10} max={100} step={10} onChange={setLight} format={(v) => `${v}%`} color={C.resist} />
        <Readout label="Open-circuit voltage" value={fmt(voc, 2)} unit=" V" color={C.voltage} />
      </Controls>
    </>
  )
}
