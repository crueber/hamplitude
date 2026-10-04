import { C, Diagram, Ln, T } from '../kit'

const Eye = ({ x, y }: { x: number; y: number }) => <circle cx={x} cy={y} r={14} fill="none" stroke={C.ink} strokeWidth={5} />

/** Safety wire through a guy-line turnbuckle: stops vibration from loosening it. */
export function Turnbuckle() {
  const y = 130
  return (
    <Diagram w={640} h={250} title="A turnbuckle that tensions a guy line has a safety wire through it. The safety wire stops vibration from loosening the turnbuckle"
      caption="Wind vibration can slowly turn a turnbuckle. The safety wire locks it.">
      <Ln x1={10} y1={y} x2={26} y2={y} color={C.muted} width={5} />
      <Eye x={40} y={y} />
      <Ln x1={54} y1={y} x2={230} y2={y} color={C.ink} width={5} />
      <rect x={230} y={y - 18} width={180} height={36} rx={6} fill={C.fill2} stroke={C.ink} strokeWidth={4} />
      <Ln x1={410} y1={y} x2={586} y2={y} color={C.ink} width={5} />
      <Eye x={600} y={y} />
      <Ln x1={614} y1={y} x2={630} y2={y} color={C.muted} width={5} />
      {Array.from({ length: 6 }, (_, i) => <Ln key={i} x1={246 + i * 13} y1={y - 10} x2={246 + i * 13 + 6} y2={y + 10} color={C.muted} width={2} />)}
      <circle cx={320} cy={y} r={5} fill={C.bg} stroke={C.ink} strokeWidth={2} />
      <path d={`M40,${y - 14} C40,${y - 76} 320,${y - 76} 320,${y}`} fill="none" stroke={C.power} strokeWidth={4} strokeLinecap="round" />
      <path d={`M600,${y - 14} C600,${y - 76} 320,${y - 76} 320,${y}`} fill="none" stroke={C.power} strokeWidth={4} strokeLinecap="round" />
      <T x={320} y={32} anchor="middle" size={15} bold color={C.power}>Safety wire</T>
      <T x={320} y={52} anchor="middle" size={13} color={C.muted}>stops vibration loosening the turnbuckle</T>
      <T x={320} y={y + 52} anchor="middle" size={14} bold>Turnbuckle: tensions the guy line</T>
      <T x={40} y={y + 36} anchor="middle" size={13} color={C.muted}>guy line</T>
      <T x={600} y={y + 36} anchor="middle" size={13} color={C.muted}>to anchor</T>
    </Diagram>
  )
}
