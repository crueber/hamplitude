import { C, Diagram, T, Wire, Battery, Resistor, Dot, useTime } from '../kit'

/** Series: one path, same current everywhere. Parallel: branches, same voltage across each. */
export function SeriesParallel() {
  const { t, ref } = useTime(1)
  const W = 640, H = 300

  function flow(path: [number, number][], n: number, speed: number, color: string, offset = 0) {
    const segs = path.slice(0, -1).map((p, i) => ({ a: p, b: path[i + 1], len: Math.hypot(path[i + 1][0] - p[0], path[i + 1][1] - p[1]) }))
    const perim = segs.reduce((s, g) => s + g.len, 0)
    return Array.from({ length: n }, (_, k) => {
      let d = (((k / n) * perim + t * speed * 30 + offset) % perim + perim) % perim
      for (const g of segs) {
        if (d <= g.len) return <circle key={k} cx={g.a[0] + ((g.b[0] - g.a[0]) * d) / g.len} cy={g.a[1] + ((g.b[1] - g.a[1]) * d) / g.len} r={4} fill={color} />
        d -= g.len
      }
      return null
    })
  }

  return (
    <Diagram w={W} h={H} title="Series circuit: one path, same current everywhere. Parallel circuit: separate branches, same voltage across each." svgRef={ref}>
      {/* SERIES */}
      <T x={150} y={22} anchor="middle" bold size={18}>Series</T>
      <Wire pts={[[50, 70], [250, 70], [250, 240], [50, 240], [50, 70]]} color={C.muted} width={2.5} />
      {flow([[50, 70], [250, 70], [250, 240], [50, 240], [50, 70]], 12, 1, C.current)}
      <rect x={34} y={120} width={32} height={70} fill={C.bg} />
      <Battery x={50} y={155} rot={90} len={70} color={C.voltage} />
      <rect x={110} y={54} width={80} height={32} fill={C.bg} />
      <Resistor x={150} y={70} len={80} color={C.resist} label="R1" />
      <rect x={110} y={224} width={80} height={32} fill={C.bg} />
      <Resistor x={150} y={240} len={80} color={C.resist} label="R2" labelPos="below" />
      <T x={150} y={288} anchor="middle" size={14} color={C.current} bold>same current through every part</T>

      {/* PARALLEL */}
      <T x={490} y={22} anchor="middle" bold size={18}>Parallel</T>
      <Wire pts={[[380, 70], [600, 70]]} color={C.muted} width={2.5} />
      <Wire pts={[[380, 240], [600, 240]]} color={C.muted} width={2.5} />
      <Wire pts={[[380, 70], [380, 120]]} color={C.muted} width={2.5} />
      <Wire pts={[[380, 190], [380, 240]]} color={C.muted} width={2.5} />
      {flow([[380, 240], [380, 70], [470, 70], [470, 240], [380, 240]], 6, 1, C.current)}
      {flow([[470, 70], [560, 70], [560, 240], [470, 240], [470, 70]], 6, 1, C.current, 40)}
      <Battery x={380} y={155} rot={90} len={70} color={C.voltage} />
      {[470, 560].map((x, k) => (
        <g key={x}>
          <Wire pts={[[x, 70], [x, 110]]} color={C.muted} width={2.5} />
          <Wire pts={[[x, 200], [x, 240]]} color={C.muted} width={2.5} />
          <Resistor x={x} y={155} rot={90} len={90} color={C.resist} />
          <T x={x + 22} y={155} bold size={13} color={C.resist}>R{k + 1}</T>
          <Dot x={x} y={70} color={C.muted} /><Dot x={x} y={240} color={C.muted} />
        </g>
      ))}
      <T x={425} y={55} anchor="middle" size={13} color={C.voltage} bold>E</T>
      <T x={515} y={55} anchor="middle" size={13} color={C.voltage} bold>E</T>
      <T x={490} y={288} anchor="middle" size={14} color={C.voltage} bold>same voltage across every part</T>
    </Diagram>
  )
}
