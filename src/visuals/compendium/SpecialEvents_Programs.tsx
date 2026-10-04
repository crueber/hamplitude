import { C, Diagram, T } from '../kit'

interface Col { t: string; c: string; what: string[]; act: string[]; chase: string[] }
const COLS: Col[] = [
  { t: 'Special event', c: C.signal, what: ['A temporary station,', 'often with a special', 'call sign, marks an', 'occasion or place.'], act: ['Run the station for', 'a few days or weeks'], chase: ['Work it, then ask', 'for its certificate'] },
  { t: 'IOTA', c: C.current, what: ['Islands on the Air:', 'island groups, each', 'with a reference', 'code, are the targets.'], act: ['Operate from an', 'island in a group'], chase: ['Collect the groups', 'you have worked'] },
  { t: 'Lighthouses', c: C.power, what: ['Lighthouse and', 'similar programs list', 'structures to activate', 'or to contact.'], act: ['Operate near a', 'listed lighthouse'], chase: ['Collect listed', 'lighthouses'] },
]

/** Three temporary-operation programs compared: what each is, how to activate, how to chase. */
export function SpecialEvents_Programs() {
  const w = 200, gap = 10, x0 = 5
  return (
    <Diagram w={640} h={262}
      title="Three kinds of temporary-operation program compared: special event stations, Islands on the Air (IOTA) and lighthouse programs. For each, what it is, how you activate it, and how you chase it."
      caption="Each program publishes its own list, dates and rules. Check the current ones before planning.">
      {COLS.map((c, i) => {
        const x = x0 + i * (w + gap)
        return (
          <g key={c.t}>
            <rect x={x} y={6} width={w} height={248} rx={12} fill={C.fill} stroke={c.c} strokeWidth={2} />
            <rect x={x} y={6} width={w} height={30} rx={12} fill={c.c} fillOpacity={0.22} />
            <T x={x + 12} y={22} size={15} bold color={c.c}>{c.t}</T>
            {c.what.map((l, j) => <T key={j} x={x + 12} y={56 + j * 18} size={12.5}>{l}</T>)}
            <T x={x + 12} y={146} size={12.5} bold color={c.c}>Activate</T>
            {c.act.map((l, j) => <T key={j} x={x + 12} y={165 + j * 16} size={12.5} color={C.muted}>{l}</T>)}
            <T x={x + 12} y={208} size={12.5} bold color={c.c}>Chase</T>
            {c.chase.map((l, j) => <T key={j} x={x + 12} y={225 + j * 16} size={12.5} color={C.muted}>{l}</T>)}
          </g>
        )
      })}
    </Diagram>
  )
}
