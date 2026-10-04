import { C, Capacitor, Diagram, Dot, Inductor, Ln, T, Wire } from '../kit'

/** Three common oscillators differ in where the feedback comes from. */
export function OscTypes() {
  const tap = (x: number, y: number) => (
    <g>
      <Ln x1={x} y1={y} x2={x + 38} y2={y} color={C.resist} width={3} arrow />
      <Dot x={x} y={y} color={C.resist} />
    </g>
  )
  const head = (x0: number, name: string, how: string) => (
    <g>
      <T x={x0 + 100} y={22} anchor="middle" size={17} bold>{name}</T>
      <T x={x0 + 100} y={188} anchor="middle" size={13} bold color={C.resist}>{how}</T>
    </g>
  )
  return (
    <Diagram w={640} h={216}
      title="Three common oscillators and where their positive feedback comes from. Colpitts: a capacitive divider. Hartley: a tapped coil. Pierce: a quartz crystal."
      caption="Orange = where the feedback comes from: a capacitor divider, a tapped coil, or a crystal.">
      {/* Colpitts */}
      <g transform="translate(10,0)">
        {head(0, 'Colpitts', 'capacitive divider')}
        <Wire pts={[[36, 50], [140, 50]]} />
        <Wire pts={[[36, 140], [140, 140]]} />
        <Inductor x={36} y={95} rot={90} len={90} />
        <Wire pts={[[140, 50], [140, 62]]} />
        <Capacitor x={140} y={77} rot={90} len={30} />
        <Capacitor x={140} y={113} rot={90} len={30} />
        <Wire pts={[[140, 128], [140, 140]]} />
        {tap(140, 95)}
        <T x={58} y={95} size={12.5} color={C.muted}>L</T>
        <T x={116} y={77} anchor="end" size={12.5} color={C.muted}>C1</T>
        <T x={116} y={113} anchor="end" size={12.5} color={C.muted}>C2</T>
      </g>
      {/* Hartley */}
      <g transform="translate(220,0)">
        {head(0, 'Hartley', 'tapped coil')}
        <Wire pts={[[36, 50], [140, 50]]} />
        <Wire pts={[[36, 140], [140, 140]]} />
        <Capacitor x={36} y={95} rot={90} len={90} />
        <Wire pts={[[140, 50], [140, 65]]} />
        <Inductor x={140} y={80} rot={90} len={30} />
        <Inductor x={140} y={110} rot={90} len={30} />
        <Wire pts={[[140, 125], [140, 140]]} />
        {tap(140, 95)}
        <T x={60} y={95} size={12.5} color={C.muted}>C</T>
        <T x={116} y={95} anchor="end" size={12.5} color={C.muted}>tap</T>
      </g>
      {/* Pierce */}
      <g transform="translate(430,0)">
        {head(0, 'Pierce', 'quartz crystal')}
        <Wire pts={[[36, 62], [78, 62]]} />
        <Wire pts={[[118, 62], [160, 62]]} />
        <rect x={86} y={52} width={24} height={20} fill={C.fill} stroke={C.resist} strokeWidth={3} />
        <line x1={78} y1={46} x2={78} y2={78} stroke={C.resist} strokeWidth={2.4} strokeLinecap="round" />
        <line x1={118} y1={46} x2={118} y2={78} stroke={C.resist} strokeWidth={2.4} strokeLinecap="round" />
        <Wire pts={[[36, 62], [36, 80]]} />
        <Capacitor x={36} y={95} rot={90} len={30} />
        <Wire pts={[[36, 110], [36, 140]]} />
        <Wire pts={[[160, 62], [160, 80]]} />
        <Capacitor x={160} y={95} rot={90} len={30} />
        <Wire pts={[[160, 110], [160, 140]]} />
        <Wire pts={[[36, 140], [160, 140]]} />
        <Dot x={36} y={62} />
        <Dot x={160} y={62} />
                <T x={98} y={96} anchor="middle" size={12} color={C.muted}>crystal</T>
      </g>
    </Diagram>
  )
}
