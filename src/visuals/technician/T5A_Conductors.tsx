import { C, Diagram, Ln, T, useTime } from '../kit'

/** Same voltage across a metal rod and a glass rod: free electrons drift in metal, stay put in glass. */
export function Conductors() {
  const { t, ref } = useTime(1)
  const rw = 280, rh = 110, ry = 78
  const lanes = [92, 128, 164]
  const atoms = (x0: number) =>
    [0, 1, 2, 3].flatMap((c) => [112, 144].map((y) => ({ x: x0 + 42 + c * 64, y })))
  const panel = (x0: number, metal: boolean) => (
    <g>
      <T x={x0 + 20} y={34} bold size={18} color={C.voltage}>−</T>
      <T x={x0 + rw - 20} y={34} bold size={18} color={C.voltage} anchor="end">+</T>
      <Ln x1={x0 + 44} y1={34} x2={x0 + rw - 44} y2={34} color={C.voltage} width={2} arrow />
      <T x={x0 + rw / 2} y={54} anchor="middle" size={13} color={C.muted}>voltage across the rod</T>
      <rect x={x0} y={ry} width={rw} height={rh} rx={14} fill={C.fill} stroke={metal ? C.resist : C.signal} strokeWidth={2.5} />
      {atoms(x0).map((a, i) => (
        <g key={i}>
          <circle cx={a.x} cy={a.y} r={12} fill={C.fill2} stroke={C.muted} strokeWidth={1.5} />
          <T x={a.x} y={a.y} anchor="middle" size={13} bold color={C.muted}>+</T>
        </g>
      ))}
      {metal
        ? Array.from({ length: 12 }, (_, k) => {
            const lane = lanes[k % 3]
            const x = x0 + 14 + (((k * 61.7 + t * 38) % (rw - 28)) + (rw - 28)) % (rw - 28)
            return <circle key={k} cx={x} cy={lane} r={5} fill={C.current} />
          })
        : atoms(x0).map((a, i) => <circle key={i} cx={a.x + 15} cy={a.y - 4} r={4.5} fill={C.current} />)}
      <T x={x0 + rw / 2} y={216} anchor="middle" bold size={17} color={metal ? C.good : C.muted}>
        {metal ? 'Conductor: current flows' : 'Insulator: almost none'}
      </T>
      <T x={x0 + rw / 2} y={240} anchor="middle" size={14}>{metal ? 'Many free electrons drift' : 'Electrons stay bound to atoms'}</T>
      <T x={x0 + rw / 2} y={268} anchor="middle" size={13} color={C.muted}>
        {metal ? 'copper, stainless steel, graphite, sea water' : 'glass, plastic, air'}
      </T>
    </g>
  )
  return (
    <Diagram w={640} h={290} svgRef={ref} title="Same voltage across a metal rod and a glass rod. Free electrons drift through the metal. In glass the electrons stay bound to their atoms."
      caption="● electron  + atom. Free electrons are what let metal carry current.">
      {panel(15, true)}
      {panel(345, false)}
    </Diagram>
  )
}
