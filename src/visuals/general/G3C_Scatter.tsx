import { C, Diagram, Ln, T, useTime } from '../kit'

/** HF scatter: a small part of the energy is scattered into the skip zone by many paths, so it is weak and fluttery. */
export function Scatter() {
  const { t, ref } = useTime(1)
  const gy = 250, tx = 60, ly = 110
  const rxs = [250, 305, 360]
  return (
    <Diagram w={640} h={310} svgRef={ref}
      title="Scatter: most of the energy skips over the skip zone to the far landing zone. A small part is scattered back into the skip zone by several paths, so it is weak and sounds fluttery or distorted"
      caption="Schematic. Few, weak, mixed-length paths: a flutter.">
      <rect x={20} y={ly - 16} width={600} height={32} rx={8} fill={C.power} fillOpacity={0.18} stroke={C.power} strokeDasharray="5 5" />
      <T x={608} y={ly - 30} anchor="end" size={13} bold color={C.power}>Ionosphere</T>
      <rect x={20} y={gy} width={600} height={30} rx={8} fill={C.fill} stroke={C.muted} strokeWidth={1.5} />
      <rect x={110} y={gy} width={260} height={30} rx={8} fill={C.bad} fillOpacity={0.14} />
      <T x={180} y={gy + 15} anchor="middle" size={13} bold color={C.bad}>skip zone</T>
      <rect x={440} y={gy} width={160} height={30} rx={8} fill={C.good} fillOpacity={0.22} />
      <T x={520} y={gy + 15} anchor="middle" size={13} bold color={C.good}>strong signal</T>
      <Ln x1={tx} y1={gy} x2={tx} y2={gy - 18} color={C.ink} width={3} />
      <T x={tx} y={gy + 15} anchor="middle" size={13} bold>TX</T>
      <polyline points={`${tx},${gy - 18} 285,${ly + 4} 520,${gy - 4}`} fill="none" stroke={C.good} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
      <T x={400} y={152} size={13} bold color={C.good}>most energy skips ahead</T>
      {rxs.map((x, i) => {
        const op = 0.4 + 0.5 * Math.abs(Math.sin(t * (2.1 + i * 0.9) + i))
        return <polyline key={x} points={`285,${ly + 8} ${x},${gy - 6}`} fill="none" stroke={C.signal} strokeWidth={2.5} strokeDasharray="2 6" strokeLinecap="round" opacity={op} />
      })}
      <Ln x1={305} y1={gy} x2={305} y2={gy - 20} color={C.ink} width={3} />
      <T x={305} y={gy + 15} anchor="middle" size={13} bold color={C.signal}>RX</T>
      <T x={236} y={222} anchor="end" size={13} bold color={C.signal}>small part scattered</T>
      <T x={236} y={238} anchor="end" size={13} color={C.muted}>back down: weak</T>
      <T x={330} y={300} anchor="middle" size={14} bold color={C.signal}>Many paths of different length = fluttering, distorted audio</T>
    </Diagram>
  )
}
