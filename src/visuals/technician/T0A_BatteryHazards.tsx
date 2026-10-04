import { C, Diagram, Ln, T } from '../kit'

const Batt = ({ x, y }: { x: number; y: number }) => (
  <g>
    <rect x={x} y={y} width={150} height={80} rx={8} fill={C.fill2} stroke={C.ink} strokeWidth={3} />
    <rect x={x + 22} y={y - 12} width={26} height={12} rx={2} fill={C.voltage} />
    <rect x={x + 102} y={y - 12} width={26} height={12} rx={2} fill={C.ink} />
    <T x={x + 35} y={y + 40} anchor="middle" size={20} bold color={C.voltage}>+</T>
    <T x={x + 115} y={y + 40} anchor="middle" size={22} bold color={C.ink}>−</T>
  </g>
)

/** Two battery hazards: shorting the terminals, and charging/discharging too fast. */
export function BatteryHazards() {
  return (
    <Diagram w={640} h={282} title="Left: a tool across the terminals of a 12-volt battery shorts it, causing sparks, burns, fire or explosion. Right: charging or discharging a battery too fast makes it overheat and out-gas"
      caption="Batteries hold a lot of energy. Short circuits and rapid charge or discharge turn it into heat and gas.">
      <T x={150} y={22} anchor="middle" size={15} bold color={C.bad}>Shorted terminals</T>
      <Batt x={75} y={110} />
      <Ln x1={100} y1={104} x2={190} y2={104} color={C.muted} width={9} />
      <T x={88} y={104} anchor="end" size={12} color={C.muted}>metal tool</T>
      {[[100, 78], [150, 68], [200, 78]].map(([x, y], i) => (
        <path key={i} d={`M${x},${y + 14} l6,-10 l-8,-2 l8,-12`} fill="none" stroke={C.resist} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      ))}
      <T x={150} y={240} anchor="middle" size={14} bold color={C.bad}>burns, fire, explosion</T>
      <T x={150} y={260} anchor="middle" size={13} color={C.muted}>huge current, no limit</T>

      <T x={480} y={22} anchor="middle" size={15} bold color={C.bad}>Rapid charge or discharge</T>
      <Batt x={405} y={110} />
      <Ln x1={420} y1={218} x2={540} y2={218} color={C.current} width={3} arrow="both" />
      <T x={480} y={204} anchor="middle" size={12} color={C.current}>too much current, too fast</T>
      {[432, 480, 528].map((x) => <path key={x} d={`M${x},96 q-9,-12 0,-22 q9,-10 0,-22`} fill="none" stroke={C.bad} strokeWidth={3} strokeLinecap="round" />)}
      <T x={480} y={240} anchor="middle" size={14} bold color={C.bad}>overheating and out-gassing</T>
      <T x={480} y={260} anchor="middle" size={13} color={C.muted}>gas vents out of the cells</T>
    </Diagram>
  )
}
