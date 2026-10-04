import { C, Diagram, Ln, T } from '../kit'

/** Side-view sketches of the three connectors named in the pool. */
export function Connectors() {
  const Plug = ({ x, bodyH, nutH, nutW, thread, bayonet, color }: { x: number; bodyH: number; nutH: number; nutW: number; thread: boolean; bayonet: boolean; color: string }) => {
    const cy = 66
    return (
      <g>
        <rect x={x - 62} y={cy - bodyH / 2 + 4} width={62} height={bodyH - 8} rx={4} fill={C.fill2} stroke={C.muted} strokeWidth={2} />
        <rect x={x} y={cy - nutH / 2} width={nutW} height={nutH} rx={5} fill={C.fill} stroke={color} strokeWidth={3} />
        {thread && Array.from({ length: Math.floor(nutW / 9) }, (_, i) => <Ln key={i} x1={x + 8 + i * 9} y1={cy - nutH / 2 + 4} x2={x + 8 + i * 9} y2={cy + nutH / 2 - 4} color={color} width={2} />)}
        {bayonet && <circle cx={x + nutW * 0.5} cy={cy - nutH / 2 - 1} r={4.5} fill={color} />}
        {bayonet && <circle cx={x + nutW * 0.5} cy={cy + nutH / 2 + 1} r={4.5} fill={color} />}
        <Ln x1={x + nutW} y1={cy} x2={x + nutW + 16} y2={cy} color={C.ink} width={5} />
      </g>
    )
  }
  const col = (x: number, name: string, l1: string, l2: string, color: string) => (
    <g>
      <T x={x} y={124} anchor="middle" size={16} bold color={color}>{name}</T>
      <T x={x} y={148} anchor="middle" size={13} bold>{l1}</T>
      <T x={x} y={168} anchor="middle" size={13} color={C.muted}>{l2}</T>
    </g>
  )
  return (
    <Diagram w={640} h={250} title="PL-259 for HF and VHF, BNC with a bayonet twist lock, Type N for higher frequencies above 400 megahertz. Outdoors, tape every connector"
      caption="Match the connector to the frequency. Weatherproof every outdoor connector with tape.">
      <Plug x={118} bodyH={46} nutH={46} nutW={40} thread bayonet={false} color={C.signal} />
      <Plug x={320} bodyH={34} nutH={34} nutW={36} thread={false} bayonet color={C.resist} />
      <Plug x={520} bodyH={40} nutH={40} nutW={36} thread bayonet={false} color={C.power} />
      {col(98, 'PL-259', 'HF and VHF', 'threaded, the common one', C.signal)}
      {col(304, 'BNC', 'bayonet', 'locks with a quarter turn', C.resist)}
      {col(500, 'Type N', 'above 400 MHz', 'threaded, for higher frequencies', C.power)}
      <rect x={110} y={196} width={420} height={34} rx={8} fill={C.fill} />
      <T x={320} y={213} anchor="middle" size={14} bold color={C.bad}>Outdoors, tape ALL of them: PL-259, BNC and N</T>
    </Diagram>
  )
}
