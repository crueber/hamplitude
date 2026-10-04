import { C, Diagram, Lines, T, useTime } from '../kit'

const XS = { cat: 150, g1: 270, g2: 390, pl: 510 }

/** A tetrode: cathode, control grid, screen grid, plate. Electrons are boiled off the cathode and pulled to the plate. */
export function TubeAnatomy() {
  const { t, ref } = useTime(1)
  const dots = Array.from({ length: 14 }, (_, k) => {
    const u = (((k / 14) * 1 + t * 0.25) % 1 + 1) % 1
    return { x: XS.cat + 8 + u * (XS.pl - XS.cat - 20), y: 72 + ((k * 5) % 7) * 12 }
  })
  const grid = (x: number, col: string) => (
    <g>
      <line x1={x} y1={50} x2={x} y2={158} stroke={col} strokeWidth={2.5} strokeDasharray="3 8" strokeLinecap="round" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => <circle key={i} cx={x} cy={56 + i * 11} r={2.6} fill={col} />)}
    </g>
  )
  return (
    <Diagram w={640} h={330} svgRef={ref} title="Vacuum tube with four parts. The heated cathode gives off electrons. The control grid regulates the flow of electrons. The screen grid shields the control grid from the plate. The positive plate collects the electrons."
      caption="A small voltage on the control grid regulates a large electron flow to the plate.">
      <rect x={90} y={30} width={480} height={150} rx={60} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <rect x={XS.cat - 6} y={60} width={12} height={90} rx={4} fill={C.resist} fillOpacity={0.5} stroke={C.resist} strokeWidth={2} />
      {grid(XS.g1, C.signal)}
      {grid(XS.g2, C.power)}
      <rect x={XS.pl - 5} y={46} width={10} height={118} rx={3} fill={C.voltage} fillOpacity={0.4} stroke={C.voltage} strokeWidth={2} />
      {dots.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r={3.5} fill={C.current} opacity={0.9} />)}
      {[XS.cat, XS.g1, XS.g2, XS.pl].map((x) => <line key={x} x1={x} y1={x === XS.cat ? 150 : x === XS.pl ? 164 : 158} x2={x} y2={196} stroke={C.muted} strokeWidth={2.5} />)}
      <T x={XS.cat} y={216} anchor="middle" bold size={15} color={C.resist}>Cathode</T>
      <Lines x={XS.cat} y={238} anchor="middle" size={12} color={C.muted} lines={['heated: boils off', 'electrons']} />
      <T x={XS.g1} y={216} anchor="middle" bold size={15} color={C.signal}>Control grid</T>
      <Lines x={XS.g1} y={238} anchor="middle" size={12} color={C.muted} lines={['regulates the flow', 'of electrons']} />
      <T x={XS.g2} y={216} anchor="middle" bold size={15} color={C.power}>Screen grid</T>
      <Lines x={XS.g2} y={238} anchor="middle" size={12} color={C.muted} lines={['shields grid from', 'plate: less capacitance']} />
      <T x={XS.pl} y={216} anchor="middle" bold size={15} color={C.voltage}>Plate</T>
      <Lines x={XS.pl} y={238} anchor="middle" size={12} color={C.muted} lines={['positive: collects', 'the electrons']} />
      <T x={320} y={306} anchor="middle" size={13} bold>electrons flow cathode → plate, steered by the control grid</T>
    </Diagram>
  )
}
