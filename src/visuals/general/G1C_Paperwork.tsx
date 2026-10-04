import { C, Diagram, T } from '../kit'

/** Before a new digital protocol goes on the air: publish the technical details. That is all. */
export function G1C_Paperwork() {
  const no = ['Type certification', 'Experimental license', 'Rule-making proposal']
  return (
    <Diagram w={640} h={170} title="Before using a new digital protocol you must publicly document its technical characteristics; type certification, an experimental license or a rule-making proposal are not required" caption="Digital emission rule.">
      <rect x={6} y={6} width={300} height={158} rx={10} fill={C.good} fillOpacity={0.14} stroke={C.good} strokeWidth={2} />
      <T x={156} y={30} anchor="middle" bold size={16} color={C.good}>Required</T>
      <T x={156} y={76} anchor="middle" bold size={15}>Publicly document</T>
      <T x={156} y={98} anchor="middle" bold size={15}>the technical</T>
      <T x={156} y={120} anchor="middle" bold size={15}>characteristics</T>
      <rect x={324} y={6} width={310} height={158} rx={10} fill={C.bad} fillOpacity={0.12} stroke={C.bad} strokeWidth={2} />
      <T x={479} y={30} anchor="middle" bold size={16} color={C.bad}>Not required</T>
      {no.map((s, i) => <T key={s} x={479} y={72 + i * 30} anchor="middle" size={15}>{s}</T>)}
    </Diagram>
  )
}
