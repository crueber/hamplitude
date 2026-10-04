import { C, Diagram, Ln, T } from '../kit'

const Stn = ({ x, y, label }: { x: number; y: number; label: string }) => (
  <g>
    <circle cx={x} cy={y} r={20} fill={C.fill} stroke={C.ink} strokeWidth={2} />
    <T x={x} y={y} anchor="middle" bold>{label}</T>
  </g>
)

/** Simplex vs repeater, then where the national simplex calling frequencies sit. */
export function Simplex() {
  const x0 = 40, x1 = 600
  const band = (lo: number, hi: number, f: number) => x0 + ((f - lo) / (hi - lo)) * (x1 - x0)
  return (
    <Diagram w={640} h={330} title="Simplex uses one frequency directly between stations; a repeater uses two. National FM simplex calling frequencies: 146.520 megahertz on 2 meters and 446.000 on 70 centimeters." caption="Same frequency both ways = simplex. 146.520 MHz is the 2 m national FM simplex calling frequency.">
      {/* simplex */}
      <T x={150} y={18} anchor="middle" bold size={15} color={C.signal}>Simplex</T>
      <Stn x={40} y={70} label="A" />
      <Stn x={260} y={70} label="B" />
      <Ln x1={66} y1={64} x2={234} y2={64} color={C.signal} width={2.5} arrow="both" />
      <T x={150} y={46} anchor="middle" size={12} bold>same frequency both ways</T>
      <T x={150} y={100} anchor="middle" size={12} color={C.muted}>direct, no repeater</T>
      {/* repeater */}
      <T x={480} y={18} anchor="middle" bold size={15} color={C.resist}>Repeater</T>
      <Stn x={350} y={70} label="A" />
      <rect x={440} y={50} width={80} height={40} rx={8} fill={C.fill} stroke={C.power} strokeWidth={2} />
      <T x={480} y={70} anchor="middle" bold size={13} color={C.power}>repeater</T>
      <Stn x={610} y={70} label="B" />
      <Ln x1={374} y1={64} x2={438} y2={64} color={C.resist} width={2.5} arrow />
      <Ln x1={522} y1={64} x2={586} y2={64} color={C.signal} width={2.5} arrow />
      <T x={406} y={46} anchor="middle" size={12} bold color={C.resist}>input</T>
      <T x={554} y={46} anchor="middle" size={12} bold color={C.signal}>output</T>
      <T x={480} y={106} anchor="middle" size={12} color={C.muted}>two frequencies</T>
      {/* band strips */}
      <T x={x0} y={150} bold size={14}>2 meter band: 144 to 148 MHz</T>
      <rect x={x0} y={166} width={x1 - x0} height={22} rx={6} fill={C.fill2} />
      <Ln x1={band(144, 148, 146.52)} y1={160} x2={band(144, 148, 146.52)} y2={196} color={C.signal} width={4} />
      <T x={band(144, 148, 146.52) - 10} y={206} bold mono size={13} color={C.signal} anchor="end">146.520 FM simplex calling</T>
      <T x={x0} y={206} size={12} color={C.muted}>144</T>
      <T x={x1} y={206} size={12} color={C.muted} anchor="end">148</T>
      <T x={x0} y={250} bold size={14}>70 centimeter band: 420 to 450 MHz</T>
      <rect x={x0} y={266} width={x1 - x0} height={22} rx={6} fill={C.fill2} />
      <Ln x1={band(420, 450, 446)} y1={260} x2={band(420, 450, 446)} y2={296} color={C.signal} width={4} />
      <T x={band(420, 450, 446) - 10} y={306} bold mono size={13} color={C.signal} anchor="end">446.000 FM simplex calling</T>
      <T x={x0} y={306} size={12} color={C.muted}>420</T>
      <T x={x1} y={306} size={12} color={C.muted} anchor="end">450</T>
    </Diagram>
  )
}
