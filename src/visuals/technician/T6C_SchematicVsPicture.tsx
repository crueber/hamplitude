import { C, Diagram, T, Wire, Battery, Switch } from '../kit'
import { LampDome } from '@/visuals/shared/SchematicSymbolGallery'

/** The same circuit drawn as a rough "photo" and as a schematic: only the connections carry over. */
export function SchematicVsPicture() {
  return (
    <Diagram w={640} h={290} title="The same battery, switch and lamp drawn twice. On the left as they physically look with long wandering wires; on the right as a schematic. Only the connections are the same."
      caption="A schematic keeps the connections and throws away looks, size and wire length.">
      <T x={160} y={22} anchor="middle" bold size={16}>What it looks like</T>
      <T x={480} y={22} anchor="middle" bold size={16}>Schematic</T>
      <line x1={320} y1={40} x2={320} y2={266} stroke={C.fill2} strokeWidth={2} strokeDasharray="4 5" />

      {/* pictorial */}
      <rect x={34} y={150} width={64} height={86} rx={8} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <T x={66} y={170} anchor="middle" bold size={14} color={C.voltage}>+</T>
      <T x={66} y={216} anchor="middle" bold size={14}>−</T>
      <rect x={52} y={140} width={28} height={10} fill={C.ink} />
      <circle cx={232} cy={92} r={26} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <path d="M222,112 L222,98 a10,10 0 0 1 20,0 L242,112" fill="none" stroke={C.resist} strokeWidth={2} />
      <rect x={220} y={116} width={24} height={14} fill={C.fill2} stroke={C.ink} strokeWidth={2} />
      <rect x={130} y={170} width={64} height={30} rx={6} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <line x1={162} y1={185} x2={176} y2={174} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
      <Wire pts={[[66, 140], [66, 60], [110, 60], [110, 185], [130, 185]]} color={C.muted} width={2.5} />
      <Wire pts={[[194, 185], [232, 185], [232, 130]]} color={C.muted} width={2.5} />
      <Wire pts={[[232, 66], [232, 44], [286, 44], [286, 262], [66, 262], [66, 236]]} color={C.muted} width={2.5} />
      <T x={160} y={243} anchor="middle" size={12} color={C.muted}>long, bent wires</T>

      {/* schematic */}
      <Wire pts={[[380, 90], [580, 90], [580, 220], [380, 220], [380, 90]]} color={C.muted} width={2.5} />
      <rect x={364} y={140} width={32} height={40} fill={C.bg} />
      <Battery x={380} y={160} rot={90} len={70} color={C.voltage} />
      <rect x={430} y={72} width={64} height={36} fill={C.bg} />
      <Switch x={462} y={90} len={64} />
      <g transform="translate(480,212)"><rect x={-36} y={-26} width={72} height={44} fill={C.bg} /><LampDome len={72} /></g>
      <T x={480} y={243} anchor="middle" size={12} color={C.muted}>neat lines, standard symbols</T>
    </Diagram>
  )
}
