import { C, Box, Diagram, Ln, T } from '../kit'

/** Remote control and whose rules apply. */
export function G1D_Remote() {
  return (
    <Diagram w={640} h={226} title="Controlling a US station from outside the US requires a US operator license; controlling a station in South America from the US means only that country's regulations apply" caption="The station's location decides whose rules apply.">
      <T x={6} y={14} bold size={14} color={C.signal}>US station, operator abroad</T>
      <Box x={6} y={34} w={150} h={52} label="You abroad" sub="control operator" color={C.ink} />
      <Ln x1={156} y1={60} x2={270} y2={60} color={C.signal} width={2.5} arrow dash="6 4" />
      <Box x={270} y={34} w={150} h={52} label="US station" color={C.signal} />
      <rect x={440} y={34} width={194} height={52} rx={10} fill={C.good} fillOpacity={0.15} stroke={C.good} strokeWidth={2} />
      <T x={537} y={52} anchor="middle" size={13} bold>US operator license</T>
      <T x={537} y={72} anchor="middle" size={13}>no special permit</T>

      <T x={6} y={134} bold size={14} color={C.power}>Station in South America, operator in US</T>
      <Box x={6} y={154} w={150} h={52} label="You in the US" sub="control operator" color={C.ink} />
      <Ln x1={156} y1={180} x2={270} y2={180} color={C.power} width={2.5} arrow dash="6 4" />
      <Box x={270} y={154} w={150} h={52} label="Foreign station" color={C.power} />
      <rect x={440} y={154} width={194} height={52} rx={10} fill={C.good} fillOpacity={0.15} stroke={C.good} strokeWidth={2} />
      <T x={537} y={172} anchor="middle" size={13} bold>Only that country's</T>
      <T x={537} y={192} anchor="middle" size={13} bold>rules apply</T>
    </Diagram>
  )
}
