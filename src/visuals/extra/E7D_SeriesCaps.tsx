import { useState } from 'react'
import { C, Capacitor, Choice, Diagram, Dot, Ground, Resistor, T, Wire, fmt } from '../kit'

const VT = 400
const L1 = 100, L2 = 300 // example leakage resistances in kΩ (unequal, as real capacitors are)
const EQ = 20 // kΩ equalizing resistors

/** Two filter capacitors in series: leakage differences make the voltage split unevenly unless equal resistors force it. */
export function SeriesCaps() {
  const [eq, setEq] = useState(false)
  const r1 = eq ? (L1 * EQ) / (L1 + EQ) : L1
  const r2 = eq ? (L2 * EQ) / (L2 + EQ) : L2
  const v1 = (VT * r1) / (r1 + r2)
  const v2 = VT - v1
  const warn = (v: number) => v > 250
  return (
    <>
      <Diagram w={640} h={290} title={`Two series filter capacitors across ${VT} volts. ${eq ? 'With equal resistors across each' : 'Without equalizing resistors'} the top one sees ${fmt(v1, 3)} volts and the bottom one ${fmt(v2, 3)} volts.`}
        caption="Equal resistors across each capacitor force an even split. They also bleed the charge off and give a minimum load.">
        <circle cx={150} cy={34} r={5} fill={C.bg} stroke={C.ink} strokeWidth={2} />
        <T x={166} y={34} size={13} bold color={C.voltage}>{`+${VT} V`}</T>
        <Wire pts={[[150, 39], [150, 56]]} />
        {eq && <><Wire pts={[[150, 56], [250, 56]]} /><Wire pts={[[150, 143], [250, 143]]} /><Wire pts={[[150, 230], [250, 230]]} /></>}
        <Capacitor x={150} y={100} rot={90} len={80} label="C1" labelPos="above" />
        <Capacitor x={150} y={187} rot={90} len={80} label="C2" labelPos="above" />
        <Dot x={150} y={143} /><Dot x={150} y={56} />
        <Ground x={150} y={230} />
        {eq && (
          <g>
            <Wire pts={[[250, 56], [250, 70]]} /><Resistor x={250} y={100} rot={90} len={60} label="R" labelPos="below" /><Wire pts={[[250, 130], [250, 143]]} />
            <Wire pts={[[250, 143], [250, 157]]} /><Resistor x={250} y={187} rot={90} len={60} label="R" labelPos="below" /><Wire pts={[[250, 217], [250, 230]]} />
            <Dot x={250} y={143} />
          </g>
        )}
        <rect x={330} y={50} width={290} height={84} rx={10} fill={C.fill} stroke={warn(v1) ? C.bad : C.good} strokeWidth={2.5} />
        <T x={344} y={74} size={14} bold>C1 sees</T>
        <T x={606} y={74} anchor="end" size={20} bold mono color={warn(v1) ? C.bad : C.good}>{`${fmt(v1, 3)} V`}</T>
        <T x={344} y={106} size={12} color={C.muted}>{`leakage ${L1} kΩ${eq ? ` in parallel with ${EQ} kΩ` : ''}`}</T>
        <rect x={330} y={146} width={290} height={84} rx={10} fill={C.fill} stroke={warn(v2) ? C.bad : C.good} strokeWidth={2.5} />
        <T x={344} y={170} size={14} bold>C2 sees</T>
        <T x={606} y={170} anchor="end" size={20} bold mono color={warn(v2) ? C.bad : C.good}>{`${fmt(v2, 3)} V`}</T>
        <T x={344} y={202} size={12} color={C.muted}>{`leakage ${L2} kΩ${eq ? ` in parallel with ${EQ} kΩ` : ''}`}</T>
        <T x={475} y={254} anchor="middle" size={13} bold color={warn(v1) || warn(v2) ? C.bad : C.good}>{warn(v1) || warn(v2) ? 'one capacitor is over its 250 V rating' : 'split is nearly even: both are safe'}</T>
        <T x={20} y={276} size={12} color={C.muted}>example values: each capacitor rated 250 V; unequal leakage like real parts</T>
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Equalizing resistors" value={eq ? 'on' : 'off'} onChange={(v) => setEq(v === 'on')} options={[{ value: 'off', label: 'No resistors' }, { value: 'on', label: 'Equal resistors across each' }]} />
      </div>
    </>
  )
}
