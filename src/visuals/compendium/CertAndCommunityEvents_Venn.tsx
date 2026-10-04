import { C, Diagram, T } from '../kit'

/** What CERT teaches, what amateur radio brings, and what the two share. */
export function CertAndCommunityEvents_Venn() {
  return (
    <Diagram w={640} h={330}
      title="CERT and amateur radio overlap: CERT trains neighbours in first aid, fire safety and light search and rescue; amateur radio supplies communication; both are trained volunteers who work with local agencies"
      caption="Complementary skills. A CERT member who is also an amateur covers both circles.">
      <circle cx={240} cy={170} r={140} fill={C.current} fillOpacity={0.16} stroke={C.current} strokeWidth={2.5} />
      <circle cx={400} cy={170} r={140} fill={C.power} fillOpacity={0.16} stroke={C.power} strokeWidth={2.5} />
      <T x={170} y={22} anchor="middle" size={15} bold color={C.current}>CERT</T>
      <T x={470} y={22} anchor="middle" size={15} bold color={C.power}>Amateur radio</T>
      <T x={176} y={112} anchor="middle" size={13} bold>First aid</T>
      <T x={176} y={142} anchor="middle" size={13} bold>Fire safety</T>
      <T x={176} y={172} anchor="middle" size={13} bold>Light search</T>
      <T x={176} y={190} anchor="middle" size={13} bold>and rescue</T>
      <T x={176} y={220} anchor="middle" size={13} bold>Triage</T>
      <T x={464} y={112} anchor="middle" size={13} bold>Radio, antennas</T>
      <T x={464} y={142} anchor="middle" size={13} bold>Net procedure</T>
      <T x={464} y={172} anchor="middle" size={13} bold>Backup power</T>
      <T x={464} y={202} anchor="middle" size={13} bold>Long-range links</T>
      <T x={464} y={232} anchor="middle" size={13} bold>Message handling</T>
      <T x={320} y={112} anchor="middle" size={13} bold color={C.good}>Shared</T>
      <T x={320} y={142} anchor="middle" size={12}>Trained</T>
      <T x={320} y={160} anchor="middle" size={12}>volunteers</T>
      <T x={320} y={188} anchor="middle" size={12}>Work with</T>
      <T x={320} y={206} anchor="middle" size={12}>local agencies</T>
      <T x={320} y={234} anchor="middle" size={12}>Prepare first</T>
    </Diagram>
  )
}
