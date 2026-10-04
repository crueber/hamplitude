import { C, Diagram, Ground, T, Wire } from '../kit'
import { OpAmpSymbol } from '../shared/OpAmpSymbol'

function Panel({ x0, vos }: { x0: number; vos: boolean }) {
  return (
    <g transform={`translate(${x0},0)`}>
      <OpAmpSymbol x={100} y={110} w={110} h={100} />
      <Wire pts={[[100, 85], [50, 85], [50, 180]]} />
      <Ground x={50} y={180} />
      {vos ? (
        <>
          <Wire pts={[[100, 135], [74, 135], [74, 146]]} />
          <rect x={60} y={146} width={28} height={24} rx={5} fill={C.fill} stroke={C.voltage} strokeWidth={2} />
          <T x={74} y={158} anchor="middle" size={12} bold color={C.voltage}>Vos</T>
          <Wire pts={[[74, 170], [74, 180]]} />
          <Ground x={74} y={180} />
        </>
      ) : (
        <Wire pts={[[100, 135], [50, 135]]} />
      )}
      <Wire pts={[[210, 110], [246, 110]]} />
      <T x={258} y={44} anchor="middle" size={12} color={C.muted}>output</T>
      <rect x={246} y={vos ? 108 : 62} width={24} height={vos ? 4 : 48} fill={vos ? C.good : C.bad} />
    </g>
  )
}

/** Input offset voltage: a small input difference that nulls the output. */
export function Offset() {
  return (
    <Diagram w={640} h={256} title="Input offset voltage. With both inputs at zero volts, a real op-amp's output is not zero. The small differential voltage you must apply across the inputs to bring the output to zero is the input offset voltage."
      caption="Offset voltage = the input difference needed to bring the output to zero.">
      <T x={150} y={26} anchor="middle" size={14} bold>Inputs both at 0 V</T>
      <T x={470} y={26} anchor="middle" size={14} bold>Add a small input difference</T>
      <Panel x0={30} vos={false} />
      <Panel x0={350} vos />
      <T x={150} y={228} anchor="middle" size={13} color={C.bad} bold>output is not zero</T>
      <T x={470} y={228} anchor="middle" size={13} color={C.good} bold>output is zero: Vos is the offset voltage</T>
    </Diagram>
  )
}
