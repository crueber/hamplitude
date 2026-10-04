import { C, Diagram, Ln, T } from '../kit'

// Illustrative chain: 100 W transmitter, 3 dB of coax loss, an antenna with 6 dB gain over a dipole.
const NODES = [
  { x: 120, dbm: 50, w: '100 W', who: 'Transmitter output' },
  { x: 320, dbm: 47, w: 'about 50 W', who: 'Reaching the antenna' },
  { x: 520, dbm: 53, w: 'about 200 W', who: 'Effective radiated power' },
]
const Y = (dbm: number) => 230 - (dbm - 44) * 18

export function Decibels_Budget() {
  return (
    <Diagram w={640} h={300}
      title="A power budget in decibels: a 100 watt transmitter is plus 50 dBm; 3 dB of cable loss leaves plus 47 dBm, about 50 watts; an antenna with 6 dB gain over a dipole gives an effective radiated power of plus 53 dBm, about 200 watts"
      caption="Illustrative numbers. Gains and losses simply add and subtract; the watts follow.">
      <T x={20} y={20} size={13} bold color={C.muted}>Power level, dBm (higher is stronger)</T>
      {[46, 50, 54].map((d) => (
        <g key={d}>
          <Ln x1={40} y1={Y(d)} x2={620} y2={Y(d)} color={C.fill2} width={1} dash="3 5" />
          <T x={36} y={Y(d)} anchor="end" size={12} mono color={C.muted}>{d}</T>
        </g>
      ))}
      <Ln x1={NODES[0].x} y1={Y(50)} x2={NODES[1].x} y2={Y(47)} color={C.bad} width={4} />
      <Ln x1={NODES[1].x} y1={Y(47)} x2={NODES[2].x} y2={Y(53)} color={C.good} width={4} />
      <T x={200} y={Y(48.5) - 42} anchor="middle" bold size={14} color={C.bad}>−3 dB</T>
      <T x={200} y={Y(48.5) - 24} anchor="middle" size={12.5} color={C.muted}>coax loss</T>
      <T x={430} y={Y(50) + 40} anchor="middle" bold size={14} color={C.good}>+6 dB</T>
      <T x={430} y={Y(50) + 58} anchor="middle" size={12.5} color={C.muted}>antenna gain (dBd)</T>
      {NODES.map((n) => (
        <g key={n.who}>
          <circle cx={n.x} cy={Y(n.dbm)} r={9} fill={C.power} stroke={C.bg} strokeWidth={3} />
          <T x={n.x} y={Y(n.dbm) - 40} anchor="middle" bold size={15} color={C.power}>{`+${n.dbm} dBm`}</T>
          <T x={n.x} y={Y(n.dbm) - 22} anchor="middle" size={13} color={C.ink}>{n.w}</T>
          <T x={n.x} y={274} anchor="middle" size={12.5} color={C.muted}>{n.who}</T>
        </g>
      ))}
    </Diagram>
  )
}
