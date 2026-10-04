import { C, Diagram, Ln, T } from '../kit'

/** 200 ft above ground: the line where FAA notification and FCC registration start (not near an airport). */
export function G1B_AntennaHeight() {
  const gy = 196
  const ft = (h: number) => gy - h * 0.7
  const mast = (x: number, h: number, ok: boolean) => {
    const col = ok ? C.good : C.bad
    return (
      <g>
        <Ln x1={x} y1={gy} x2={x} y2={ft(h)} color={col} width={5} />
        <Ln x1={x - 16} y1={ft(h)} x2={x + 16} y2={ft(h)} color={col} width={4} />
        <T x={x} y={gy + 18} anchor="middle" bold size={14} color={col}>{h} ft</T>
      </g>
    )
  }
  return (
    <Diagram w={640} h={240} title="Antenna structures up to 200 feet above ground, away from a public use airport, need no FAA notification or FCC registration; taller structures do" caption="Not near a public use airport. Near one, lower limits apply.">
      <Ln x1={10} y1={gy} x2={630} y2={gy} color={C.muted} width={2} />
      <Ln x1={10} y1={ft(200)} x2={630} y2={ft(200)} color={C.resist} width={2} dash="7 5" />
      <T x={14} y={ft(200) - 13} anchor="start" bold size={14} color={C.resist}>200 ft</T>
      {mast(110, 60, true)}
      {mast(230, 150, true)}
      {mast(350, 250, false)}
      <rect x={430} y={84} width={200} height={50} rx={8} fill={C.good} fillOpacity={0.15} stroke={C.good} strokeWidth={2} />
      <T x={530} y={109} anchor="middle" size={13} bold>200 ft or less: no notice</T>
      <rect x={430} y={140} width={200} height={50} rx={8} fill={C.bad} fillOpacity={0.15} stroke={C.bad} strokeWidth={2} />
      <T x={530} y={158} anchor="middle" size={13} bold>Taller: notify FAA,</T>
      <T x={530} y={177} anchor="middle" size={13} bold>register with FCC</T>
    </Diagram>
  )
}
