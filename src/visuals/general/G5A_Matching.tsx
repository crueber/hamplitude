import { C, Diagram, Ln, T, Box } from '../kit'

/** Impedance matching: any of three devices can make one impedance look like another. */
export function G5A_Matching() {
  const chip = (y: number, label: string, sub: string) => (
    <g>
      <Box x={230} y={y} w={180} h={50} label={label} sub={sub} color={C.signal} size={14} />
      <Ln x1={178} y1={y + 25} x2={230} y2={y + 25} color={C.muted} width={2} />
      <Ln x1={410} y1={y + 25} x2={462} y2={y + 25} color={C.muted} width={2} />
    </g>
  )
  return (
    <Diagram w={640} h={250} title="Impedance matching sits between a source and a load. A transformer, a Pi-network or a length of transmission line can each do the job."
      caption="Any of these three can transform one impedance into another.">
      <Box x={20} y={30} w={158} h={170} label="Source" sub="sees an impedance" color={C.voltage} />
      <Box x={462} y={30} w={158} h={170} label="Load" sub="has its own impedance" color={C.resist} />
      <T x={320} y={18} anchor="middle" size={13} color={C.muted}>matching device in between</T>
      {chip(36, 'Transformer', 'coils, turns ratio')}
      {chip(100, 'Pi-network', 'L and C parts')}
      {chip(164, 'Transmission line', 'a length of line')}
    </Diagram>
  )
}
