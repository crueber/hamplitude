import { useState } from 'react'
import { C, Capacitor, Choice, Diagram, Dot, Ground, Resistor, T, Transistor, Wire } from '../kit'

type Part = 'q1' | 'd1' | 'r1' | 'c2' | 'c1' | 'c3' | 'r2'
const INFO: Record<Part, { title: string; lines: string[] }> = {
  q1: { title: 'Q1: pass transistor', lines: ['In series with the', 'output. Its conduction', 'is varied to hold', 'the output steady.', 'A linear regulator.'] },
  d1: { title: 'D1: Zener diode', lines: ['The stable voltage', 'reference. It holds', 'the base steady, and', 'the output sits one', 'base-emitter drop below.'] },
  r1: { title: 'R1', lines: ['Feeds current from the', 'input to the Zener', 'so it has current', 'to regulate with.'] },
  c2: { title: 'C2', lines: ['Bypasses rectifier', 'ripple around D1, so', 'the reference stays', 'clean.'] },
  c1: { title: 'C1', lines: ['Input filter: smooths', 'the rectified supply', 'before the regulator', 'sees it.'] },
  c3: { title: 'C3', lines: ['Small output bypass.', 'Shorts high-frequency', 'noise at the output.'] },
  r2: { title: 'R2: the load', lines: ['What the supply feeds.', 'Q1 supplies its', 'current.'] },
}
const OPTS: { value: Part; label: string }[] = [
  { value: 'q1', label: 'Q1' }, { value: 'd1', label: 'D1' }, { value: 'r1', label: 'R1' }, { value: 'c2', label: 'C2' },
  { value: 'c1', label: 'C1' }, { value: 'c3', label: 'C3' }, { value: 'r2', label: 'R2' },
]

function Zener({ x, y, len = 70, color = C.ink, label }: { x: number; y: number; len?: number; color?: string; label?: string }) {
  return (
    <g>
      <g transform={`translate(${x},${y})`} stroke={color} strokeWidth={2.2} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <line x1={0} y1={-len / 2} x2={0} y2={-9} />
        <line x1={0} y1={9} x2={0} y2={len / 2} />
        <polygon points="-12,9 12,9 0,-9" fill={color} fillOpacity={0.15} />
        <polyline points="-12,-5 -12,-9 12,-9 12,-13" />
      </g>
      {label && <T x={x + 26} y={y} size={13} bold color={color}>{label}</T>}
    </g>
  )
}

/** Figure E7-2 redrawn: a Zener-referenced series (pass transistor) linear regulator. */
export function Fig72() {
  const [p, setP] = useState<Part>('q1')
  const on = (q: Part) => (p === q ? C.signal : C.ink)
  const info = INFO[p]
  const rail = 70, node = 170, gnd = 240, qx = 210
  return (
    <>
      <Diagram w={640} h={300} title={`Figure E7-2, a linear voltage regulator with a pass transistor and Zener reference. Selected part: ${info.title}. ${info.lines.join(' ')}`}
        caption="Pick a part. Teal marks the part being explained.">
        <Wire pts={[[25, rail], [170, rail]]} />
        <Wire pts={[[250, rail], [380, rail]]} />
        <circle cx={20} cy={rail} r={5} fill={C.bg} stroke={C.ink} strokeWidth={2} />
        <circle cx={386} cy={rail} r={5} fill={C.bg} stroke={C.ink} strokeWidth={2} />
        <T x={8} y={rail - 18} size={13} bold color={C.voltage}>+25 V in</T>
        <T x={380} y={rail - 18} anchor="middle" size={13} bold color={C.voltage}>+12 V out</T>
        <Wire pts={[[108, node], [qx, node]]} />
        <Wire pts={[[qx, 114], [qx, node - 35]]} />
        <Wire pts={[[52, gnd], [350, gnd]]} />
        <Resistor x={108} y={120} rot={90} len={100} label="R1" color={on('r1')} />
        <Capacitor x={52} y={155} rot={90} len={170} label="C1" color={on('c1')} />
        <Capacitor x={108} y={205} rot={90} len={70} label="C2" color={on('c2')} />
        <Capacitor x={300} y={155} rot={90} len={170} label="C3" color={on('c3')} />
        <Resistor x={350} y={155} rot={90} len={170} label="R2" labelPos="below" color={on('r2')} />
        <Zener x={qx} y={205} color={on('d1')} label="D1" />
        <g transform={`rotate(-90 ${qx} 84)`}><Transistor x={qx} y={84} kind="npn" color={on('q1')} /></g>
        <T x={qx + 22} y={110} size={13} bold color={on('q1')}>Q1</T>
        <Dot x={52} y={rail} /><Dot x={108} y={rail} /><Dot x={300} y={rail} /><Dot x={350} y={rail} />
        <Dot x={108} y={node} /><Dot x={qx} y={node} />
        <Ground x={qx + 40} y={gnd} />
        <rect x={420} y={150} width={212} height={140} rx={10} fill={C.fill} stroke={C.signal} strokeWidth={2} />
        <T x={432} y={170} size={14} bold color={C.signal}>{info.title}</T>
        {info.lines.map((l, i) => <T key={i} x={432} y={193 + i * 18} size={13}>{l}</T>)}
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Part" value={p} onChange={setP} options={OPTS} />
      </div>
    </>
  )
}
