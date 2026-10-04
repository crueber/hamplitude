import { useState } from 'react'
import { C, Capacitor, Choice, Controls, Diagram, Dot, Inductor, Readout, Resistor, Slider, Source, T, TAU, Wire, fmt, si } from '../kit'

const RS = 50

/** Low-pass L-network: a series inductor on the low-resistance side, a shunt capacitor on the high-resistance side. */
export function MatchingNetworks_LNetwork() {
  const [rl, setRl] = useState(200)
  const [fm, setFm] = useState(7.1)
  const same = Math.abs(rl - RS) < 1
  const hi = Math.max(rl, RS), lo = Math.min(rl, RS)
  const q = Math.sqrt(hi / lo - 1)
  const xs = q * lo
  const xp = hi / q
  const w = TAU * fm * 1e6
  const L = xs / w, Cf = 1 / (w * xp)
  const loadHigh = rl > RS // shunt capacitor goes on the load side when the load is the high-resistance side
  const capX = loadHigh ? 350 : 250

  const yT = 104, yB = 196, yM = 150
  return (
    <>
      <Diagram w={640} h={296}
        title={same ? 'The load equals 50 ohms, so no matching network is needed.' : `A low-pass L-network matching a ${rl} ohm load to a 50 ohm source at ${fm} megahertz: a series inductor of ${si(L, 'H', 3)} and a shunt capacitor of ${si(Cf, 'F', 3)}, placed ${loadHigh ? 'across the load' : 'across the source side'}.`}
        caption="Low-pass L-network. The shunt part always sits on the side with the higher resistance.">
        <rect x={206} y={68} width={188} height={146} rx={12} fill={C.signal} opacity={0.1} stroke={C.signal} strokeWidth={2} strokeDasharray="6 5" />
        <T x={300} y={54} anchor="middle" size={13} bold color={C.signal}>L network</T>
        <Wire pts={[[80, yT], [250, yT]]} />
        <Wire pts={[[350, yT], [500, yT]]} />
        <Wire pts={[[80, yB], [500, yB]]} />
        <Source x={80} y={yM} rot={90} len={92} ac />
        <T x={56} y={yM - 9} anchor="end" size={13} bold>Source</T>
        <T x={56} y={yM + 10} anchor="end" size={12} color={C.muted} mono>50 Ω</T>
        <Inductor x={300} y={yT} len={100} color={C.signal} />
        {!same && <T x={300} y={yT - 24} anchor="middle" size={13} bold color={C.signal}>{`L = ${si(L, 'H', 3)}`}</T>}
        <Capacitor x={capX} y={yM} rot={90} len={50} color={C.signal} />
        {!same && <T x={loadHigh ? capX - 24 : capX + 24} y={yM} anchor={loadHigh ? 'end' : 'start'} size={13} bold color={C.signal}>{`C = ${si(Cf, 'F', 3)}`}</T>}
        <Wire pts={[[capX, yT], [capX, yM - 25]]} />
        <Wire pts={[[capX, yM + 25], [capX, yB]]} />
        <Dot x={capX} y={yT} /><Dot x={capX} y={yB} />
        <Resistor x={500} y={yM} rot={90} len={92} color={C.resist} />
        <T x={524} y={yM - 9} size={13} bold color={C.resist}>Load</T>
        <T x={524} y={yM + 10} size={12} color={C.muted} mono>{`${rl} Ω`}</T>
        <T x={320} y={246} anchor="middle" size={14} bold>{same ? 'Already matched: leave the network out' : `Q = √(${hi} ÷ ${lo} − 1) = ${fmt(q, 3)}`}</T>
        <T x={320} y={268} anchor="middle" size={13} color={C.muted}>
          {same ? 'Source and load are both 50 Ω.' : `Series reactance Q × ${lo} = ${fmt(xs, 3)} Ω (the inductor). Shunt reactance ${hi} ÷ Q = ${fmt(xp, 3)} Ω (the capacitor).`}
        </T>
      </Diagram>
      <Controls>
        <Slider label="Load resistance" value={rl} min={10} max={400} step={5} onChange={setRl} format={(v) => `${v} Ω`} color={C.resist} />
        <Choice label="Frequency" value={fm} options={[{ value: 3.7, label: '3.7 MHz' }, { value: 7.1, label: '7.1 MHz' }, { value: 14.2, label: '14.2 MHz' }]} onChange={setFm} />
        <Readout label="Inductor" value={same ? '–' : si(L, 'H', 3)} color={C.signal} />
        <Readout label="Capacitor" value={same ? '–' : si(Cf, 'F', 3)} color={C.signal} />
      </Controls>
    </>
  )
}
