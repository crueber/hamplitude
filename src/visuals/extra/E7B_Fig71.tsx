import { useState } from 'react'
import { C, Capacitor, Choice, Diagram, Dot, Ground, Resistor, T, Transistor, Wire } from '../kit'

type Part = 'bias' | 'r3' | 'c3' | 'c1' | 'c2' | 'load' | 'q1'
const INFO: Record<Part, { title: string; lines: string[] }> = {
  bias: { title: 'R1 + R2', lines: ['A voltage divider', 'from the + supply.', 'Sets the base DC', 'voltage: divider bias.'] },
  r3: { title: 'R3', lines: ['In the emitter leg.', 'More current raises', 'its voltage, which', 'cuts base drive:', 'self bias.'] },
  c3: { title: 'C3', lines: ['Bypasses R3 for the', 'signal, so R3 sets', 'DC bias without', 'cutting gain.'] },
  c1: { title: 'C1', lines: ['Input coupling.', 'Passes the signal,', 'blocks DC so the', 'divider is not upset.'] },
  c2: { title: 'C2', lines: ['Output coupling.', 'Passes the amplified', 'signal, blocks the', 'collector DC.'] },
  load: { title: 'Collector resistor', lines: ['The load. Signal', 'current through it', 'makes the output', 'voltage swing.'] },
  q1: { title: 'Q1: common emitter', lines: ['Input to the base,', 'output from the', 'collector. The emitter', 'is the shared leg', '(grounded by C3).'] },
}
const OPTS: { value: Part; label: string }[] = [
  { value: 'bias', label: 'R1, R2' }, { value: 'r3', label: 'R3' }, { value: 'c3', label: 'C3' }, { value: 'c1', label: 'C1' },
  { value: 'c2', label: 'C2' }, { value: 'load', label: 'Collector R' }, { value: 'q1', label: 'Q1' },
]

/** Figure E7-1 redrawn: pick a part to see its job. */
export function Fig71() {
  const [p, setP] = useState<Part>('bias')
  const on = (...ps: Part[]) => (ps.includes(p) ? C.signal : C.ink)
  const info = INFO[p]
  const gy = 262
  return (
    <>
      <Diagram w={640} h={300} title={`Figure E7-1, a common-emitter transistor amplifier. Selected part: ${info.title}. ${info.lines.join(' ')}`}
        caption="Pick a part. Teal marks the part being explained.">
        {/* rails and wires */}
        <Wire pts={[[130, 44], [254, 44], [380, 44]]} />
        <T x={400} y={44} size={15} bold color={C.voltage}>+</T>
        <circle cx={388} cy={44} r={5} fill={C.bg} stroke={C.ink} strokeWidth={2} />
        <Wire pts={[[130, 150], [210, 150]]} />
        <Wire pts={[[254, 110], [295, 110]]} />
        <Wire pts={[[345, 110], [386, 110]]} />
        <circle cx={392} cy={110} r={5} fill={C.bg} stroke={C.ink} strokeWidth={2} />
        <T x={408} y={110} size={13} bold color={C.muted}>OUT</T>
        <circle cx={26} cy={150} r={5} fill={C.bg} stroke={C.ink} strokeWidth={2} />
        <T x={8} y={130} size={13} bold color={C.muted}>IN</T>
        <Wire pts={[[31, 150], [55, 150]]} />
        <Wire pts={[[105, 150], [130, 150]]} />
        <Wire pts={[[254, 190], [295, 190]]} />
        <Wire pts={[[345, 190], [370, 190], [370, gy]]} />
        {/* parts */}
        <Resistor x={130} y={97} rot={90} len={106} label="R1" color={on('bias')} />
        <Resistor x={130} y={206} rot={90} len={112} label="R2" color={on('bias')} />
        <Resistor x={254} y={77} rot={90} len={66} labelPos="below" color={on('load')} />
        <Resistor x={254} y={226} rot={90} len={72} label="R3" labelPos="below" color={on('r3')} />
        <Capacitor x={80} y={150} len={50} label="C1" color={on('c1')} />
        <Capacitor x={320} y={110} len={50} label="C2" color={on('c2')} />
        <Capacitor x={320} y={190} len={50} label="C3" color={on('c3')} />
        <Transistor x={240} y={150} kind="npn" label="Q1" color={on('q1')} />
        <Dot x={130} y={44} /><Dot x={254} y={44} /><Dot x={130} y={150} /><Dot x={254} y={110} /><Dot x={254} y={190} />
        <Ground x={130} y={gy} /><Ground x={254} y={gy} /><Ground x={370} y={gy} />
        {/* explanation panel */}
        <rect x={436} y={150} width={196} height={140} rx={10} fill={C.fill} stroke={C.signal} strokeWidth={2} />
        <T x={448} y={170} size={14} bold color={C.signal}>{info.title}</T>
        {info.lines.map((l, i) => <T key={i} x={448} y={193 + i * 18} size={13}>{l}</T>)}
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Part" value={p} onChange={setP} options={OPTS} />
      </div>
    </>
  )
}
