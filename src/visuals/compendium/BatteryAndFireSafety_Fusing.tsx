import { Box, C, Diagram, Fuse, Ln, T } from '../kit'

const FLAME = 'M0,0 C-10,-4 -12,-14 -4,-24 C-3,-17 2,-16 3,-22 C12,-14 10,-4 0,0Z'

function Row({ y0, good }: { y0: number; good: boolean }) {
  const yp = y0 + 56 // positive lead
  const ym = y0 + 100 // negative lead
  const fx = good ? 140 : 480
  const sx = 310 // where the short is
  const col = good ? C.good : C.bad
  return (
    <g>
      <T x={20} y={y0} size={14} bold color={col}>{good ? 'Right: fuse in the positive lead, right at the battery' : 'Wrong: fuse far from the battery, or no fuse at all'}</T>
      <Box x={20} y={yp - 14} w={70} h={ym - yp + 28} label="battery" sub="12 V" size={14} />
      <T x={100} y={yp - 14} size={14} bold color={C.voltage}>+</T>
      <T x={100} y={ym + 14} size={16} bold color={C.current}>−</T>
      {/* positive lead */}
      <Ln x1={90} y1={yp} x2={fx - 30} y2={yp} color={C.voltage} width={5} />
      <Fuse x={fx} y={yp} len={60} color={good ? C.good : C.ink} />
      <T x={fx} y={yp + 22} anchor="middle" size={12.5} bold>{good ? 'fuse opens' : 'fuse'}</T>
      <Ln x1={fx + 30} y1={yp} x2={540} y2={yp} color={good ? C.muted : C.voltage} width={5} dash={good ? '9 7' : undefined} />
      {/* negative lead */}
      <Ln x1={90} y1={ym} x2={540} y2={ym} color={C.current} width={5} />
      <Box x={540} y={yp - 14} w={80} h={ym - yp + 28} label="radio" size={14} />
      {/* short circuit */}
      <Ln x1={sx} y1={yp} x2={sx} y2={ym} color={C.bad} width={5} />
      <T x={sx + 10} y={(yp + ym) / 2} size={13} bold color={C.bad}>short</T>
      {good ? (
        <>
          <T x={450} y={yp + 22} anchor="middle" size={13} color={C.muted}>cable is dead, no heating</T>
        </>
      ) : (
        <>
          {[190, 235, 280].map((x) => <path key={x} transform={`translate(${x},${yp - 4}) scale(1.2)`} d={FLAME} fill={C.bad} />)}
          <T x={200} y={yp + 22} anchor="middle" size={13} color={C.muted}>whole cable carries the fault</T>
        </>
      )}
    </g>
  )
}

/** Fuse the wire, not the load: put the fuse at the source so no cable length is unprotected. */
export function BatteryAndFireSafety_Fusing() {
  return (
    <Diagram w={640} h={290}
      title="Two battery-to-radio power cables with a short circuit in the middle of the cable. When the fuse is at the radio end, the whole cable between battery and short carries the fault current and can overheat. When the fuse is in the positive lead right at the battery, it opens and the cable is dead."
      caption="A battery can push a huge current into a short. The fuse protects the wire, so it goes at the source and is rated for the wire.">
      <Row y0={14} good={false} />
      <Row y0={160} good />
    </Diagram>
  )
}
