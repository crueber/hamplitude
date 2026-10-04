import { C, Box, Capacitor, Diagram, Ground, Ln, Meter, T } from '../kit'

const Chip = ({ x, w, text }: { x: number; w: number; text: string }) => (
  <g>
    <rect x={x} y={10} width={w} height={28} rx={14} fill={C.fill} stroke={C.bad} strokeWidth={2} />
    <T x={x + w / 2} y={25} anchor="middle" size={13} bold color={C.bad}>{text}</T>
  </g>
)

/** Shock hazards around a power supply: body current, grounding, stored charge, meter rating. */
export function PowerSupplyHazards() {
  return (
    <Diagram w={640} h={322} title="Shock hazards: current through the body heats tissue, disrupts cells and clenches muscles. Use three-wire cords and a common safety ground; a power supply's filter capacitor stays charged after power-off; use a voltmeter rated for the voltage"
      caption="Four ways to stay safe: three-wire cords, one common ground, discharged capacitors, rated meters.">
      <T x={20} y={25} size={14} bold>Body current can:</T>
      <Chip x={170} w={110} text="heat tissue" />
      <Chip x={290} w={128} text="disrupt cells" />
      <Chip x={428} w={150} text="clench muscles" />

      {/* mains cord into power supply */}
      <rect x={20} y={96} width={46} height={34} rx={6} fill={C.fill2} stroke={C.ink} strokeWidth={2.5} />
      <Ln x1={66} y1={113} x2={168} y2={113} color={C.ink} width={5} />
      <T x={43} y={148} anchor="middle" size={12} color={C.muted}>plug</T>
      <T x={118} y={92} anchor="middle" size={13} bold color={C.good}>1  3-wire cord</T>
      <Box x={168} y={62} w={196} h={150} label="" color={C.ink} />
      <T x={266} y={80} anchor="middle" size={13} bold>Power supply</T>
      <Capacitor x={222} y={118} rot={90} len={44} color={C.power} />
      <T x={246} y={118} size={12} bold color={C.power}>filter capacitor</T>
      <T x={266} y={172} anchor="middle" size={13} bold color={C.power}>3  Still charged</T>
      <T x={266} y={190} anchor="middle" size={13} color={C.power}>after power off</T>

      {/* common safety ground */}
      <Ln x1={266} y1={212} x2={266} y2={278} color={C.good} width={4} />
      <Ln x1={146} y1={278} x2={526} y2={278} color={C.good} width={5} />
      <Box x={90} y={252} w={52} h={26} label="Radio" size={12} />
      <Box x={450} y={252} w={64} h={26} label="Amp" size={12} />
      <Ground x={526} y={284} color={C.good} />
      <T x={330} y={304} size={13} bold color={C.good}>2  one common safety ground</T>

      {/* voltmeter across the supply */}
      <Meter x={540} y={150} letter="V" len={32} color={C.ink} />
      <path d="M524,150 L444,150 L444,128 L364,128" fill="none" stroke={C.voltage} strokeWidth={3} strokeLinejoin="round" />
      <path d="M556,150 L590,150 L590,190 L430,190 L430,172 L364,172" fill="none" stroke={C.ink} strokeWidth={3} strokeLinejoin="round" />
      <T x={540} y={84} anchor="middle" size={13} bold color={C.signal}>4  Meter and leads</T>
      <T x={540} y={102} anchor="middle" size={13} color={C.signal}>rated for the voltage</T>
    </Diagram>
  )
}
