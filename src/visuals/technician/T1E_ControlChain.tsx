import { C, Box, Diagram, Ln, T } from '../kit'

/** The licensee designates a control operator; both answer for the station. */
export function ControlChain() {
  return (
    <Diagram w={640} h={250} title="The station licensee designates a control operator, who controls the station. Both are responsible for proper operation." caption="No control operator, no transmitting. Both of the first two boxes answer for what the station does.">
      <Box x={14} y={60} w={170} h={80} label="Station licensee" sub="holds the license" color={C.power} />
      <Box x={235} y={60} w={170} h={80} label="Control operator" sub="at the control point" color={C.signal} />
      <Box x={456} y={60} w={170} h={80} label="Station" sub="transmits" color={C.ink} />
      <Ln x1={186} y1={100} x2={233} y2={100} color={C.power} width={2.5} arrow />
      <Ln x1={407} y1={100} x2={454} y2={100} color={C.signal} width={2.5} arrow />
      <T x={210} y={42} anchor="middle" size={13} bold color={C.power}>designates</T>
      <T x={431} y={42} anchor="middle" size={13} bold color={C.signal}>controls</T>
      <g stroke={C.good} strokeWidth={2.5} fill="none" strokeLinecap="round">
        <polyline points="99,160 99,178 320,178 320,160" />
      </g>
      <T x={210} y={202} anchor="middle" bold size={14} color={C.good}>both responsible for proper operation</T>
      <T x={210} y={224} anchor="middle" size={13} color={C.muted}>(same person if you run your own station)</T>
    </Diagram>
  )
}
