import { useState } from 'react'
import { C, Choice, Diagram, T, Wire, Battery, Resistor, Diode, LED, useTime } from '../kit'

/** A diode is a one-way valve for current. `led` swaps in an LED that lights when current flows. */
export function DiodeValve({ led = false }: { led?: boolean }) {
  const [dir, setDir] = useState<'fwd' | 'rev'>('fwd')
  const fwd = dir === 'fwd'
  const { t, ref } = useTime(1)
  const loop: [number, number][] = [[110, 70], [530, 70], [530, 220], [110, 220], [110, 70]]
  const perim = 420 + 150 + 420 + 150
  const n = 16
  const dots = !fwd ? [] : Array.from({ length: n }, (_, k) => {
    let d = (((k / n) * perim + t * 60) % perim + perim) % perim
    for (let s = 0; s < 4; s++) {
      const [ax, ay] = loop[s]
      const [bx, by] = loop[s + 1]
      const len = Math.hypot(bx - ax, by - ay)
      if (d <= len) return { x: ax + ((bx - ax) * d) / len, y: ay + ((by - ay) * d) / len }
      d -= len
    }
    return { x: 110, y: 70 }
  }).filter((d) => !(d.y === 70 && d.x > 280 && d.x < 360) && !(d.x === 110 && d.y > 106 && d.y < 194) && !(d.x === 530 && d.y > 106 && d.y < 184))
  const on = fwd
  return (
    <>
      <Diagram w={640} h={290} svgRef={ref}
        title={`${led ? 'An LED' : 'A diode'} in series with a battery and resistor. ${on ? 'Battery connected forward: current flows' + (led ? ' and the LED lights.' : '.') : 'Battery reversed: no current flows' + (led ? ' and the LED stays dark.' : '.')}`}
        caption={on ? 'Forward: the anode is on the + side, so current flows.' : 'Reverse: the diode blocks current.'}>
        <Wire pts={[[110, 70], [285, 70]]} color={C.muted} width={2.5} />
        <Wire pts={[[355, 70], [530, 70], [530, 110]]} color={C.muted} width={2.5} />
        <Wire pts={[[530, 180], [530, 220], [110, 220], [110, 190]]} color={C.muted} width={2.5} />
        <Wire pts={[[110, 70], [110, 110]]} color={C.muted} width={2.5} />
        <rect x={94} y={110} width={32} height={80} fill={C.bg} />
        <Battery x={110} y={150} rot={fwd ? 90 : 270} len={80} color={C.voltage} />
        <Resistor x={530} y={145} rot={90} len={70} color={C.resist} />
        {on && led && <circle cx={320} cy={58} r={34} fill={C.good} opacity={0.35} />}
        {led ? <LED x={320} y={70} len={70} color={on ? C.good : C.ink} /> : <Diode x={320} y={70} len={70} color={on ? C.good : C.ink} />}
        {!on && (
          <g stroke={C.bad} strokeWidth={4} strokeLinecap="round">
            <line x1={310} y1={22} x2={330} y2={42} /><line x1={330} y1={22} x2={310} y2={42} />
          </g>
        )}
        {dots.map((d, k) => <circle key={k} cx={d.x} cy={d.y} r={4.5} fill={C.current} opacity={0.9} />)}
        <T x={262} y={96} anchor="middle" size={13} bold color={C.muted}>anode</T>
        <T x={378} y={96} anchor="middle" size={13} bold color={C.muted}>cathode</T>

        {/* package with stripe */}
        <line x1={225} y1={165} x2={415} y2={165} stroke={C.muted} strokeWidth={2.5} strokeLinecap="round" />
        <rect x={270} y={150} width={100} height={30} rx={6} fill={C.fill2} stroke={C.ink} strokeWidth={2} />
        <rect x={348} y={150} width={12} height={30} fill={C.ink} />
        <T x={320} y={200} anchor="middle" size={13} color={C.muted}>the stripe marks the cathode</T>
      </Diagram>
      <Choice label="Battery direction" value={dir} onChange={setDir} options={[{ value: 'fwd', label: 'Forward' }, { value: 'rev', label: 'Reversed' }]} />
    </>
  )
}
