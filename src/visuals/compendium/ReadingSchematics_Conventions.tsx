import { Battery, C, Diagram, Dot, Fuse, Ground, LED, Resistor, Switch, T, Wire } from '../kit'

function Badge({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={11} fill={C.signal} />
      <T x={x} y={y + 1} anchor="middle" size={13} bold color={C.bg}>{n}</T>
    </g>
  )
}

/** A small annotated circuit showing how to read a schematic: source, labels, ground, and junctions versus crossings. */
export function ReadingSchematics_Conventions() {
  const note = (n: number, y: number, a: string, b: string, c?: string) => (
    <g key={n}>
      <Badge x={430} y={y} n={n} />
      <T x={452} y={y - 7} size={12.5} bold>{a}</T>
      <T x={452} y={y + 10} size={12.5} color={C.muted}>{b}</T>
      {c && <T x={452} y={y + 27} size={12.5} color={C.muted}>{c}</T>}
    </g>
  )
  return (
    <Diagram w={640} h={300}
      title="A small circuit read in order: battery, fuse, switch, resistor and LED in a loop with a ground symbol. Numbered notes explain the power source, part labels, the ground symbol, and the difference between a dot junction and a plain crossing."
      caption="Follow the wires from the + side of the source, through each part, back to the − side.">
      <g transform="translate(24,0)">
      <Wire pts={[[60, 115], [60, 70], [100, 70]]} />
      <Wire pts={[[160, 70], [175, 70]]} />
      <Wire pts={[[245, 70], [260, 70]]} />
      <Wire pts={[[320, 70], [360, 70], [360, 115]]} />
      <Wire pts={[[360, 185], [360, 230], [60, 230], [60, 185]]} />
      <Battery x={60} y={150} rot={90} len={70} color={C.voltage} label="BT1" />
      <T x={96} y={192} anchor="middle" size={12} mono color={C.muted}>13.8 V</T>
      <Fuse x={130} y={70} len={60} label="F1" value="5 A" />
      <Switch x={210} y={70} len={70} closed label="S1" />
      <Resistor x={290} y={70} len={60} color={C.resist} label="R1" value="1 kΩ" />
      <LED x={360} y={150} rot={90} len={70} color={C.good} label="D1" />
      <Dot x={210} y={230} />
      <Ground x={210} y={230} />
      <Badge x={96} y={150} n={1} />
      <Badge x={332} y={44} n={2} />
      <Badge x={250} y={256} n={3} />
      </g>

      {note(1, 36, 'Source', 'long line is +, short is −')}
      {note(2, 92, 'Labels', 'letter = part type,', 'number = which one')}
      {note(3, 148, 'Ground', 'the shared return path')}
      {note(4, 204, 'Dot or no dot', 'a dot joins wires;', 'a plain crossing does not')}
      <Wire pts={[[440, 262], [500, 262]]} />
      <Wire pts={[[470, 244], [470, 280]]} />
      <Dot x={470} y={262} />
      <T x={470} y={292} anchor="middle" size={12} color={C.good} bold>joined</T>
      <Wire pts={[[540, 262], [600, 262]]} />
      <Wire pts={[[570, 244], [570, 280]]} />
      <T x={570} y={292} anchor="middle" size={12} color={C.bad} bold>not joined</T>
    </Diagram>
  )
}
