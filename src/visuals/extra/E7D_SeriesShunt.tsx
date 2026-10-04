import { C, Diagram, Ln, T, Wire, Dot, Ground, Resistor } from '../kit'

function Block({ x, y, w, h, label, sub, color }: { x: number; y: number; w: number; h: number; label: string; sub?: string; color: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8} fill={C.fill} stroke={color} strokeWidth={2.5} />
      <T x={x + w / 2} y={y + h / 2 - (sub ? 8 : 0)} anchor="middle" size={13} bold color={color}>{label}</T>
      {sub && <T x={x + w / 2} y={y + h / 2 + 10} anchor="middle" size={12} color={C.muted}>{sub}</T>}
    </g>
  )
}

/** Series regulator: control element in the path. Shunt regulator: control element across the supply, loading it. */
export function SeriesShunt() {
  return (
    <Diagram w={640} h={290} title="A series regulator has its control element in line with the output. A shunt regulator has a series resistor and a control element across the output that loads the unregulated source."
      caption="Series: control element in the path. Shunt: control element across the line, loading the source.">
      {/* series */}
      <T x={150} y={20} anchor="middle" size={15} bold color={C.signal}>Series regulator</T>
      <circle cx={24} cy={70} r={5} fill={C.bg} stroke={C.ink} strokeWidth={2} />
      <Wire pts={[[29, 70], [60, 70]]} /><Wire pts={[[160, 70], [262, 70]]} /><circle cx={268} cy={70} r={5} fill={C.bg} stroke={C.ink} strokeWidth={2} /><T x={282} y={70} size={12} color={C.muted}>out</T>
      <Block x={60} y={48} w={100} h={44} label="Control" sub="element" color={C.signal} />
      <Resistor x={240} y={150} rot={90} len={110} /><T x={256} y={150} size={13} bold>Load</T>
      <Wire pts={[[240, 70], [262, 70]]} /><Dot x={240} y={70} />
      <Wire pts={[[24, 205], [262, 205]]} /><Wire pts={[[240, 205], [240, 205]]} />
      <Ground x={150} y={205} />
      <Ln x1={110} y1={170} x2={110} y2={96} color={C.muted} width={2} arrow dash="5 4" />
      <Block x={60} y={170} w={100} h={30} label="senses output" color={C.muted} />
      <Wire pts={[[160, 185], [240, 185]]} color={C.muted} width={1.5} />
      <T x={150} y={250} anchor="middle" size={13} color={C.muted}>three-terminal IC regulators are this kind</T>
      {/* shunt */}
      <T x={490} y={20} anchor="middle" size={15} bold color={C.resist}>Shunt regulator</T>
      <circle cx={344} cy={70} r={5} fill={C.bg} stroke={C.ink} strokeWidth={2} />
      <Wire pts={[[349, 70], [370, 70]]} /><Wire pts={[[430, 70], [610, 70]]} /><circle cx={616} cy={70} r={5} fill={C.bg} stroke={C.ink} strokeWidth={2} />
      <Resistor x={400} y={70} len={60} label="series R" />
      <Wire pts={[[480, 70], [480, 100]]} /><Dot x={480} y={70} />
      <Block x={440} y={100} w={80} h={44} label="Control" sub="element" color={C.resist} />
      <Wire pts={[[480, 144], [480, 205]]} />
      <Wire pts={[[560, 70], [560, 94]]} /><Dot x={560} y={70} />
      <Resistor x={560} y={150} rot={90} len={110} /><T x={576} y={150} size={13} bold>Load</T>
      <Wire pts={[[344, 205], [610, 205]]} /><Dot x={480} y={205} /><Dot x={560} y={205} />
      <Ground x={420} y={205} />
      <T x={490} y={250} anchor="middle" size={13} color={C.muted}>loads the unregulated source</T>
    </Diagram>
  )
}
