import { C, Diagram, T, Wire, Dot, Source, Transformer, Diode, Capacitor, Inductor, Resistor } from '../kit'

type Focus = 'filter' | 'bleeder'

/** A complete linear supply: transformer, rectifier, L-C filter, bleeder across the output. */
export function PsuSchematic({ focus }: { focus: Focus }) {
  const hi = (x: number, y: number, w: number, h: number, label: string, col: string) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={12} fill={col} opacity={0.1} stroke={col} strokeWidth={2} strokeDasharray="6 5" />
      <T x={x + w / 2} y={y - 12} anchor="middle" bold size={14} color={col}>{label}</T>
    </g>
  )
  return (
    <Diagram w={640} h={270} title={focus === 'filter'
      ? 'Power supply schematic: transformer, rectifier diode, then the filter network made of a series inductor and shunt capacitors, then the load.'
      : 'Power supply schematic: transformer, rectifier diode, filter, then a bleeder resistor connected across the filter capacitor and load.'}
      caption={focus === 'filter' ? 'The filter is capacitors and inductors: C holds the voltage up, L smooths the current.' : 'The bleeder sits across the output so the filter capacitors drain when power is off.'}>
      {focus === 'filter' ? hi(246, 66, 196, 116, 'Filter network', C.signal) : hi(456, 66, 80, 116, 'Bleeder', C.bad)}
      {/* wires */}
      <Wire pts={[[40, 100], [101, 100]]} color={C.muted} width={2.5} />
      <Wire pts={[[40, 160], [101, 160]]} color={C.muted} width={2.5} />
      <Wire pts={[[119, 100], [155, 100]]} color={C.muted} width={2.5} />
      <Wire pts={[[215, 100], [300, 100]]} color={C.muted} width={2.5} />
      <Wire pts={[[380, 100], [560, 100]]} color={C.muted} width={2.5} />
      <Wire pts={[[119, 160], [560, 160]]} color={C.muted} width={2.5} />
      <Wire pts={[[270, 100], [270, 108]]} color={C.muted} width={2.5} />
      <Wire pts={[[270, 152], [270, 160]]} color={C.muted} width={2.5} />
      <Wire pts={[[420, 100], [420, 108]]} color={C.muted} width={2.5} />
      <Wire pts={[[420, 152], [420, 160]]} color={C.muted} width={2.5} />
      <Source x={40} y={130} rot={90} len={60} ac color={C.ink} />
      <Transformer x={110} y={130} />
      <Diode x={185} y={100} len={60} color={C.power} />
      <Capacitor x={270} y={130} rot={90} len={44} color={C.signal} />
      <Inductor x={340} y={100} len={80} color={C.signal} />
      <Capacitor x={420} y={130} rot={90} len={44} color={C.signal} />
      <Resistor x={496} y={130} rot={90} len={60} color={C.resist} />
      <Resistor x={560} y={130} rot={90} len={60} color={C.resist} />
      <Dot x={270} y={100} /><Dot x={420} y={100} /><Dot x={496} y={100} /><Dot x={270} y={160} /><Dot x={420} y={160} /><Dot x={496} y={160} />
      {/* labels */}
      <T x={40} y={198} anchor="middle" size={13} bold color={C.muted}>AC in</T>
      <T x={110} y={198} anchor="middle" size={13} bold color={C.muted}>Transformer</T>
      <T x={185} y={76} anchor="middle" size={13} bold color={C.power}>Rectifier</T>
      <T x={270} y={190} anchor="middle" size={13} bold color={C.signal}>C</T>
      <T x={340} y={78} anchor="middle" size={13} bold color={C.signal}>L</T>
      <T x={420} y={190} anchor="middle" size={13} bold color={C.signal}>C</T>
      <T x={496} y={190} anchor="middle" size={13} bold color={C.resist}>Bleeder</T>
      <T x={560} y={190} anchor="middle" size={13} bold color={C.resist}>Load</T>
      <T x={320} y={236} anchor="middle" size={13} color={C.muted}>AC → lower AC → pulsating DC → smooth DC → used by the load</T>
    </Diagram>
  )
}
